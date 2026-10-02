const fs = require('fs');
const path = require('path');
const R = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

const P = (d) => d.split('|').map((s) => `<path d="${s.trim()}"></path>`).join('');
const ICONS = {
  'check': P('M20 6 9 17l-5-5'),
  'x': P('M18 6 6 18|m6 6 12 12'),
  'plus': P('M5 12h14|M12 5v14'),
  'arrow-right': P('M5 12h14|m12 5 7 7-7 7'),
  'chev-left': P('m15 18-6-6 6-6'),
  'chev-right': P('m9 18 6-6-6-6'),
  'bed': P('M2 4v16|M2 8h18a2 2 0 0 1 2 2v10|M2 17h20|M6 8v9'),
  'plane': P('M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z'),
  'ticket': P('M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z|M13 5v2|M13 17v2|M13 11v2'),
  'ship': P('M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1|M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76|M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6|M12 10v4|M12 2v3'),
  'car': P('M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2|M9 17h6') + '<circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle>',
  'heart': P('M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'),
  'scan-face': P('M3 7V5a2 2 0 0 1 2-2h2|M17 3h2a2 2 0 0 1 2 2v2|M21 17v2a2 2 0 0 1-2 2h-2|M7 21H5a2 2 0 0 1-2-2v-2|M8 14s1.5 2 4 2 4-2 4-2|M9 9h.01|M15 9h.01'),
  'lock': '<rect x="3" y="11" width="18" height="11" rx="2"></rect>' + P('M7 11V7a5 5 0 0 1 10 0v4'),
  'eye-off': P('M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68|M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61|M14.12 14.12a3 3 0 1 1-4.24-4.24|m2 2 20 20'),
  'trash': P('M3 6h18|M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6|M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'),
  'shield-check': P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z|m9 12 2 2 4-4'),
  'qr': '<rect x="3" y="3" width="5" height="5" rx="1"></rect><rect x="16" y="3" width="5" height="5" rx="1"></rect><rect x="3" y="16" width="5" height="5" rx="1"></rect>' + P('M21 16h-3a2 2 0 0 0-2 2v3|M21 21v.01|M12 7v3a2 2 0 0 1-2 2H7|M3 12h.01|M12 3h.01|M12 16v.01|M16 12h1|M21 12v.01|M12 21v-1'),
  'bell': P('M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9|M10.3 21a1.94 1.94 0 0 0 3.4 0'),
  'file-plus': P('M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z|M14 2v4a2 2 0 0 0 2 2h4|M9 15h6|M12 18v-6'),
  'user-plus': P('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M19 8v6|M22 11h-6') + '<circle cx="9" cy="7" r="4"></circle>',
  'key': '<circle cx="7.5" cy="15.5" r="5.5"></circle>' + P('m21 2-9.6 9.6|m15.5 7.5 3 3L22 7l-3-3'),
  'replay': P('M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8|M3 3v5h5'),
  'share': '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>' + P('m8.59 13.51 6.83 3.98|m15.41 6.51-6.82 3.98'),
  'wifi-key': P('M6 8.32a7.43 7.43 0 0 1 0 7.36|M9.46 6.21a11.76 11.76 0 0 1 0 11.58|M12.91 4.1a15.91 15.91 0 0 1 .01 15.8|M16.37 2a20.16 20.16 0 0 1 0 20'),
  'fingerprint': P('M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4|M14 13.12c0 2.38 0 6.38-1 8.88|M17.29 21.02c.12-.6.43-2.3.5-3.02|M2 12a10 10 0 0 1 18-6|M2 16h.01|M21.8 16c.2-2 .131-5.354 0-6|M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2|M8.65 22c.21-.66.45-1.32.57-2|M9 6.8a6 6 0 0 1 9 5.2v2'),
  'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"></rect>' + P('M16 2v4|M8 2v4|M3 10h18'),
  'calendar-check': '<rect x="3" y="4" width="18" height="18" rx="2"></rect>' + P('M16 2v4|M8 2v4|M3 10h18|m9 16 2 2 4-4'),
  'coffee': P('M10 2v2|M14 2v2|M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1|M6 2v2'),
  'sparkles': P('M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z'),
  'wifi': P('M12 20h.01|M2 8.82a15 15 0 0 1 20 0|M5 12.86a10 10 0 0 1 14 0|M8.5 16.43a5 5 0 0 1 7 0'),
  'info': '<circle cx="12" cy="12" r="10"></circle>' + P('M12 16v-4|M12 8h.01'),
  'search': '<circle cx="11" cy="11" r="8"></circle>' + P('m21 21-4.3-4.3'),
  'download': P('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|m7 10 5 5 5-5|M12 15V3'),
  'user': P('M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2') + '<circle cx="12" cy="7" r="4"></circle>',
  'help': '<circle cx="12" cy="12" r="10"></circle>' + P('M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3|M12 17h.01'),
  'logout': P('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|m16 17 5-5-5-5|M21 12H9'),
  'home': P('M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8|M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'),
  'wallet': P('M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1|M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4'),
  'grid': '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
  'delete': P('M10 5a2 2 0 0 0-1.34.52l-6.33 5.74a1 1 0 0 0 0 1.48l6.33 5.74A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z|m12 9 6 6|m18 9-6 6'),
  'mail': '<rect x="2" y="4" width="20" height="16" rx="2"></rect>' + P('m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'),
  'chev-down': P('m6 9 6 6 6-6'),
  'map-pin': P('M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0') + '<circle cx="12" cy="10" r="3"></circle>',
  'map': P('M14.1 5.55a2 2 0 0 0 1.8 0l3.66-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.55 2.27a2 2 0 0 1-1.8 0l-4.2-2.1a2 2 0 0 0-1.8 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.55-2.27a2 2 0 0 1 1.8 0z|M15 5.76v15|M9 3.24v15'),
  'utensils': P('M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2|M7 2v20|M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'),
  'shield-alert': P('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z|M12 8v4|M12 16h.01'),
  'sun': '<circle cx="12" cy="12" r="4"></circle>' + P('M12 2v2|M12 20v2|m4.93 4.93 1.41 1.41|m17.66 17.66 1.41 1.41|M2 12h2|M20 12h2|m6.34 17.66-1.41 1.41|m19.07 4.93-1.41 1.41'),
  'glasses': '<circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle>' + P('M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2|M2.5 13 5 7c.7-1.3 1.4-2 3-2|M21.5 13 19 7c-.7-1.3-1.5-2-3-2'),
  'smartphone': '<rect x="5" y="2" width="14" height="20" rx="2"></rect>' + P('M12 18h.01'),
  'tablet': '<rect x="4" y="2" width="16" height="20" rx="2"></rect>' + P('M12 18h.01'),
  'camera': P('M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z') + '<circle cx="12" cy="13" r="3"></circle>',
  'image': '<rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle>' + P('m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21'),
  'diff': '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle>' + P('M13 6h3a2 2 0 0 1 2 2v7|M11 18H8a2 2 0 0 1-2-2V9'),
  'more': '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
  'film': '<rect x="3" y="3" width="18" height="18" rx="2"></rect>' + P('M7 3v18|M3 7.5h4|M3 12h18|M3 16.5h4|M17 3v18|M17 7.5h4|M17 16.5h4'),
  'eye': P('M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0') + '<circle cx="12" cy="12" r="3"></circle>',
  'globe': '<circle cx="12" cy="12" r="10"></circle>' + P('M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20|M2 12h20'),
  'chat': P('M7.9 20A9 9 0 1 0 4 16.1L2 22Z'),
  'phone': P('M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'),
  'settings': P('M21 4h-7|M10 4H3|M21 12h-9|M8 12H3|M21 20h-5|M12 20H3|M14 2v4|M8 10v4|M16 18v4')
};

const images = JSON.parse(R('images.json'));
function macros(s) {
  return s
    .replace(/src="\{\{img:([a-z0-9_]+)\}\}"/g, (m, key) => {
      if (!images[key]) throw new Error('missing image ' + key);
      return `data-img="${key}"`;
    })
    .replace(/\{\{i:([a-z-]+)(?::(\d+))?\}\}/g, (m, name, size) => {
      if (!ICONS[name]) throw new Error('missing icon ' + name);
      const z = size || 20;
      return `<svg width="${z}" height="${z}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
    })
    .replace(/\{\{logo:(\d+)\}\}/g, (m, size) => {
      const w = +size, h = Math.round(w * 404 / 546);
      return `<svg width="${w}" height="${h}" viewBox="0 0 546 404" aria-hidden="true" style="flex: none"><path fill="currentColor" d="M0 0h263c44 0 77 30 77 72 0 14-4 29-11 42L177 404l-76-97 106-195H86L0 0Z"></path><path fill="currentColor" d="M420 0h93c18 0 33 15 33 32 0 6-2 12-5 18l-15 27c-12 21-39 35-66 35H360L420 0Z"></path></svg>`;
    })
    .replace(/\{\{img:([a-z0-9_]+)\}\}/g, (m, key) => {
      if (!images[key]) throw new Error('missing image ' + key);
      return images[key];
    });
}

const SCREEN_FILES = ['screens.html', 'screens-onb.html', 'screens-main.html', 'screens-docs.html', 'screens-family.html', 'screens-account.html'];
let out = R('src/shell.html')
  .replace('/*STYLES*/', () => R('src/styles.css') + '\n' + R('src/styles2.css'))
  .replace('<!--SCREENS-->', () => SCREEN_FILES.map((f) => R('src/' + f)).join('\n'));
out = macros(out);
out = out.replace('/*APP*/', () => 'window.IMAGES = ' + JSON.stringify(images) + ';\n' + R('src/app.js'));
const left = out.match(/\{\{[^}]*\}\}/g);
if (left) throw new Error('unexpanded: ' + left.slice(0, 5).join(', '));
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), out);
console.log('built dist/index.html', (out.length / 1024).toFixed(0) + ' KB');
