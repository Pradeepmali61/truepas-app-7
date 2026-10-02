const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'project');
const OUT = path.join(__dirname, 'index.html');

const META = [
  ['Welcome', 'welcome', 'Welcome', 'First launch: the truepas.com promise and the face-scan visual.'],
  ['SignUp', 'signup', 'Create account', 'Step 1 of 4: name, email and phone, with a kiosk option.'],
  ['IdScan', 'idscan', 'Scan ID', 'Step 2: choose a document and capture it inside the frame.'],
  ['FaceScan', 'facescan', 'Face & liveness', 'Step 3: 3D liveness check with guided head turns.', true],
  ['Consent', 'consent', 'Consent', 'Step 4: choose which industries can verify you. Toggles work.'],
  ['Enrolled', 'enrolled', 'All set', 'Enrollment summary, then into the app.'],
  ['Home', 'home', 'Home', 'TruePas ID card, quick actions, next trip and recent checks.'],
  ['Pass', 'pass', 'My pass', 'Pass status and the nearest touchpoint. Nothing to show at the gate.'],
  ['Verified', 'verified', 'Verified', 'Confirmation after a gate scan, with exactly what was shared.'],
  ['Trip', 'trip', 'Trip', 'Flight details and every face check from curb to gate.'],
  ['Activity', 'activity', 'Activity', 'Every verification in one place. Filters work.'],
  ['Documents', 'documents', 'Wallet', 'Verified IDs and passes issued by venues.'],
  ['Family', 'family', 'Family', 'Group travel: members, a pending scan and an invite.'],
  ['Privacy', 'privacy', 'Privacy & control', 'Turn industries on or off; export or delete your data.'],
  ['Profile', 'profile', 'Profile', 'Account, security and app settings.']
];

const esc = (s) => s.replace(/&/g, '&amp;');

// icons from the consent screen
const consentSrc = fs.readFileSync(path.join(SRC, 'Consent.dc.html'), 'utf8');
const icons = {};
for (const m of consentSrc.matchAll(/<sc-if value="\{\{it\.is(\w+)\}\}"[^>]*>([\s\S]*?)<\/sc-if>/g)) icons[m[1].toLowerCase()] = m[2];

function toggleRow(icon, name, sub, on, last, notes) {
  const iconHtml = icon ? `<span style="width: 38px; height: 38px; flex-shrink: 0; border-radius: 12px; background: #f4fcff; box-shadow: inset 0 0 0 1px #d8f6ff; color: #007aff; display: flex; align-items: center; justify-content: center">${icons[icon]}</span>` : '';
  const subAttrs = notes ? ` class="tg-note" data-on="${esc(notes[0])}" data-off="${esc(notes[1])}"` : '';
  return `<div style="display: flex; align-items: center; gap: 12px; height: ${icon ? 62 : 56}px; border-bottom: ${last ? 'none' : '1px solid #f0f1f3'}">${iconHtml}<span style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0"><span style="font-size: 15px; font-weight: 600">${esc(name)}</span><span${subAttrs} style="font-size: 12px; color: #6b6f74; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${esc(sub)}</span></span><button type="button" class="tg" role="switch" aria-checked="${on}" aria-label="${esc(name)}"></button></div>`;
}

function replaceBlock(src, startMarker, html, lastClose) {
  const a = src.indexOf(startMarker);
  if (a < 0) throw new Error('marker not found: ' + startMarker);
  const b = lastClose ? src.lastIndexOf('</sc-for>') : src.indexOf('</sc-for>', a);
  return src.slice(0, a) + html + src.slice(b + '</sc-for>'.length);
}

const dynamic = {
  consent(src) {
    const rows = [
      ['plane', 'Airports & airlines', 'Check-in, security, lounge, boarding', true],
      ['bed', 'Hotels', 'Front desk, room access, amenities', true],
      ['car', 'Car rentals', 'Counter-free pickup and return', false],
      ['ship', 'Cruise', 'Terminal, embarkation, onboard', true],
      ['ticket', 'Stadiums, venues & parks', 'Gates, VIP areas, season passes', true],
      ['heart', 'Healthcare', 'Patient check-in and records', false]
    ];
    return replaceBlock(src, '<sc-for list="{{industries}}"', rows.map((r, i) => toggleRow(r[0], r[1], r[2], r[3], i === rows.length - 1)).join('\n'));
  },
  privacy(src) {
    const rows = [
      ['Airports & airlines', true, '3 places this month', 'Off — use your documents'],
      ['Hotels', true, '1 place this month', 'Off — use your documents'],
      ['Car rentals', false, 'Counter-free pickup', 'Off · 1 blocked attempt'],
      ['Healthcare', false, 'Patient check-in', 'Off']
    ];
    return replaceBlock(src, '<sc-for list="{{rows}}"', rows.map((r, i) => toggleRow(null, r[0], r[1] ? r[2] : r[3], r[1], i === rows.length - 1, [r[2], r[3]])).join('\n'));
  },
  activity(src) {
    const filters = [['all', 'All'], ['travel', 'Travel'], ['stays', 'Stays'], ['venues', 'Venues']]
      .map(([id, l]) => `<button type="button" class="fchip" role="tab" aria-selected="${id === 'all'}" data-f="${id}">${l}</button>`).join('\n');
    src = replaceBlock(src, '<sc-for list="{{filters}}"', filters);
    const ok = ['Verified', '#e7f6ee', '#0e7a43', '#f4fcff', '#007aff'];
    const bad = ['Blocked', '#fff1e6', '#b45309', '#fff7f0', '#b45309'];
    const data = [
      ['TODAY', 'travel', 'plane', 'SFO Gate B12 · Boarding', '08:41 · 1.8s', ok],
      ['TODAY', 'travel', 'plane', 'SFO Security · Lane 4', '08:12 · 1.6s', ok],
      ['TODAY', 'stays', 'bed', 'Harbor Hotel · Check-out', '06:30 · 1.9s', ok],
      ['YESTERDAY', 'venues', 'ticket', 'Bay Arena · Gate C entry', '19:05 · 2.1s', ok],
      ['YESTERDAY', 'travel', 'car', 'Swift Car Rentals · Pickup', '10:02 · Car rentals is off', bad]
    ];
    const days = [];
    for (const r of data) {
      let g = days.find((d) => d.label === r[0]);
      if (!g) days.push(g = { label: r[0], rows: [] });
      g.rows.push(r);
    }
    const html = days.map((g) => `<div class="act-group" style="display: flex; flex-direction: column"><span style="margin-top: 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: #6b6f74">${g.label}</span>` +
      g.rows.map((r) => `<div class="act-row" data-cat="${r[1]}" style="display: flex; align-items: center; gap: 12px; height: 62px; border-bottom: 1px solid #f0f1f3"><span style="width: 40px; height: 40px; flex-shrink: 0; border-radius: 13px; background: ${r[5][3]}; color: ${r[5][4]}; display: flex; align-items: center; justify-content: center">${icons[r[2]]}</span><span style="flex-grow: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px"><span style="font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${r[3]}</span><span style="font-size: 12px; color: #6b6f74">${r[4]}</span></span><span style="flex-shrink: 0; padding: 4px 9px; border-radius: 999px; background: ${r[5][1]}; color: ${r[5][2]}; font-size: 12px; font-weight: 600">${r[5][0]}</span></div>`).join('') +
      `</div>`).join('\n');
    return replaceBlock(src, '<sc-for list="{{groups}}"', html, true);
  }
};

let keyframes = '';
const screens = [];

for (const [file, id, title, cap, dark] of META) {
  const raw = fs.readFileSync(path.join(SRC, file + '.dc.html'), 'utf8');
  let inner = raw.slice(raw.indexOf('<x-dc>') + 6, raw.indexOf('</x-dc>'));
  const helmet = inner.match(/<helmet>([\s\S]*?)<\/helmet>/);
  inner = inner.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  const css = helmet ? (helmet[1].match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1] : '';
  const kf = (css.match(/@keyframes[^{]+\{(?:[^{}]*\{[^}]*\})+[^}]*\}/g) || []).join('\n');
  const rename = (s) => s.replace(/\btp([A-Z][A-Za-z]*)\b/g, `tp$1_${id}`);
  keyframes += rename(kf) + '\n';
  inner = rename(inner);

  if (dynamic[id]) inner = dynamic[id](inner);

  const hasTab = inner.includes('aria-label="Primary"');
  inner = inner.replace('<div style="width: 390px; height: 844px; ', `<div class="scr-root${hasTab ? ' has-tab' : ''}" style="width: 100%; min-height: 100%; `);
  inner = inner.replace('<nav aria-label="Primary" style="', '<nav class="tabbar" aria-label="Primary" style="');
  inner = inner.replace(/href="([A-Za-z]+)\.dc\.html"/g, (_, s) => `href="#${s.toLowerCase()}"`);
  inner = inner.replace('left: 44px; top: 30px; width: 254px', 'left: calc(50% - 127px); top: 30px; width: 254px');

  if (/\{\{|<sc-|<dc-/.test(inner)) throw new Error('unconverted template syntax in ' + file);
  screens.push(`<div class="vp" data-id="${id}" hidden>\n${inner.trim()}\n</div>`);
}

const meta = JSON.stringify(META.map(([, id, title, cap, dark]) => ({ id, title, cap, dark: !!dark })));
let shell = fs.readFileSync(path.join(__dirname, 'shell.html'), 'utf8');
shell = shell.replace('/*KEYFRAMES*/', keyframes).replace('<!--SCREENS-->', screens.join('\n')).replace('/*META*/', meta);
fs.writeFileSync(OUT, shell);
console.log('wrote', OUT, (shell.length / 1024).toFixed(1) + ' KB', 'screens:', screens.length);
