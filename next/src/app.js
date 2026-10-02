(function () {
  'use strict';

  /* ------------------------------------------------------------------
     53 screens + design notes
     ------------------------------------------------------------------ */
  function S(id, group, title, headline, note, refs, points, extra) {
    var o = { id: id, group: group, title: title, headline: headline, note: note, refs: refs || [], points: points || [] };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  var D = { dark: true };
  var SCREENS = [
    S('welcome', 'Onboarding', 'Welcome', 'One face. Every <em>check-in.</em>', 'The first frame sells the promise. A live 3D face assembles out of light over the hotel at dusk, while two glass cards show the outcome.', ['CLEAR', 'Apple Face ID', 'Airbnb'], ['Point-cloud face renders live and rotates', 'Serif italic accent is the brand’s editorial signature', 'truepas.com blue on the primary action'], D),
    S('signin', 'Onboarding', 'Sign in', 'Welcome <em>back.</em>', 'Returning users see their own face first — one tap to continue. The number field is the fallback, not the default.', ['Apple ID', 'Revolut'], ['“Continue as Pradeep” card with face sign-in', 'Mobile / Email switch that actually switches', 'Forgot password one tap away']),
    S('create', 'Onboarding', 'Create account', 'Create your <em>Truepas.</em>', 'Three steps, one decision per row. The name label says “as on your ID” so the document scan matches later.', ['Royal Caribbean', 'Revolut'], ['Segmented progress shows what is left', 'Live focus ring on the active field']),
    S('otp', 'Onboarding', 'Verify mobile', 'Enter the <em>code.</em>', 'Six large cells, a live cursor and a built-in keypad. The code auto-fills like an SMS would — and the keypad works too.', ['iOS one-time code'], ['Auto-read from SMS, shown as a chip', 'Resend timer counts down instead of a disabled button']),
    S('email', 'Onboarding', 'Verify email', 'Check your <em>inbox.</em>', 'Result screens share one template: a glowing medallion, a short headline, one primary action.', [], ['The address is repeated so people know where to look', 'Spam-folder hint saves support tickets']),
    S('about', 'Onboarding', 'About you', 'A few <em>details.</em>', 'Fields mirror a government ID so the document scan can confirm them automatically.', ['Royal Caribbean'], ['Chips instead of a dropdown for gender', 'CTA names the next step: face setup']),
    S('forgot', 'Onboarding', 'Forgot password', 'Reset your <em>password.</em>', 'Email reset, with a faster path promoted underneath: recover with your face in two seconds.', ['CLEAR'], ['Biometric recovery turns a dead end into a product moment']),
    S('consent', 'Face setup', 'Biometric consent', 'Your face, <em>your control.</em>', 'Trust before the camera. Three plain promises, then a per-industry switchboard from truepas.com. The toggles work.', ['DigiYatra', 'Apple privacy labels'], ['Venues receive a yes or no, never the face', 'DPDP Act 2023 and GDPR named explicitly']),
    S('facescan', 'Face setup', 'Face scan', 'Verify your <em>face.</em>', 'A dark studio. The point-cloud head follows each liveness instruction — blink, turn left, smile — while the ring fills.', ['Apple Face ID', 'CLEAR'], ['Steps tick off on their own', 'The 3D head turns when you are asked to turn', 'Turns mint when the template is sealed'], D),
    S('born', 'Face setup', 'You’re verified', 'You’re <em>verified.</em>', 'The payoff: the identity card is born. It flips in, catches the light and stays tiltable.', ['Apple Wallet', 'Amex Centurion'], ['Holographic sheen and guilloché pattern', 'What was verified, in three lines'], D),
    S('home', 'Main', 'Home', 'Where are you going <em>today?</em>', 'Home is “my identity plus my journey”: the holographic card, today’s stay with the face check-in on it, then what’s next.', ['Airbnb', 'Hilton', 'Disney'], ['Today’s stay is the hero, with the action on it', 'Swipeable “Coming up”', 'Liquid-glass tab bar with a raised face button'], { tab: 'home' }),
    S('checkins', 'Main', 'Check-ins', 'Your year in <em>check-ins.</em>', 'History opens with the year in numbers, then every venue with a photo. The filters work.', ['Airbnb Trips', 'Spotify Wrapped'], ['Hours saved, made concrete', 'Photo thumbnails make venues recognisable'], { tab: 'checkins' }),
    S('wallet', 'Main', 'Wallet', 'Documents as <em>cards.</em>', 'Government IDs as a physical wallet. Tap a card to bring it forward; tap again to open it.', ['Apple Wallet', 'Revolut'], ['Identity strength score up top', 'Guilloché pattern on every card', 'In review in amber, never red'], { tab: 'wallet' }),
    S('key', 'Main', 'Hotel stay', 'Your room <em>key.</em>', 'The room number is the biggest thing on the page. Press and hold to unlock — a deliberate gesture for a door.', ['Hilton Digital Key', 'Apple Home Key'], ['Hold-to-unlock with a filling bar and haptic tap', 'NFC pulse shows the phone is ready'], D),
    S('park', 'Main', 'Theme park visit', 'Fast lane, <em>by face.</em>', 'The same stay template adapts per venue. For a theme park the pass becomes a fast-lane entry for the whole family.', ['Disney MagicBand'], ['Pass content changes by venue type', 'All four guests verified at a glance'], D),
    S('pass', 'Main', 'My Truepas', 'Show your <em>pass.</em>', 'A scannable pass for venues without a face camera. The code rotates every minute so screenshots can’t be reused — watch the timer.', ['CLEAR', 'Apple Wallet'], ['White pass on navy for scan contrast', 'Live countdown ring, then a new code'], D),
    S('notifications', 'Main', 'Notifications', 'Stay in the <em>loop.</em>', 'Grouped by day, colour-coded by kind, unread marked with a sky dot. Security alerts carry their own actions.', ['iOS Notification Center'], ['Check-in, family, trip, security and document events', '“Mark all read” works']),
    S('journey', 'Main', 'Trip journey', 'Curb to gate, <em>by face.</em>', 'A boarding pass without a barcode. The plane flies its arc while the timeline shows every face check.', ['DigiYatra', 'Apple Wallet boarding pass'], ['Live “now” step pulses', 'Each checkpoint shows its match time']),
    S('checkin', 'Face check-in', 'Live face check-in', 'Look at the <em>camera.</em>', 'The moment of truth, timed to the millisecond. Then the Dynamic Island blooms into a Live Activity.', ['iOS Live Activities', 'CLEAR'], ['Found → live → matching, with a running timer', 'Replay to watch it again'], D),
    S('welcomed', 'Face check-in', 'Checked in', 'Welcome, <em>Pradeep.</em>', 'The match lands with the room — plus a privacy receipt of exactly what the hotel received.', ['Hilton', 'Apple Pay receipt'], ['“Matched in 0.8 seconds” makes speed visible', 'Shared vs never-shared, side by side']),
    S('nomatch', 'Face check-in', 'Couldn’t match', 'We couldn’t <em>see you.</em>', 'Failure framed as a camera problem, not a person problem, with three concrete fixes.', [], ['Amber, never red, for recoverable errors', 'PIN fallback so nobody is stuck at the desk']),
    S('pin', 'Face check-in', 'Confirm with PIN', 'Enter your <em>PIN.</em>', 'A calm keypad-first screen. Type any four digits and it confirms, then lands you in your room.', [], ['Large dots that fill as you type', 'Face shortcut on the keypad']),
    S('doc-choose', 'Documents', 'Choose document', 'Which ID do you <em>have?</em>', 'Each document type is a miniature of the card itself, so people recognise theirs instantly. Tap to select.', [], ['Passport recommended for travel', '190+ countries via National ID']),
    S('doc-scan', 'Documents', 'Scan document', 'Fit it in the <em>frame.</em>', 'A dark viewfinder with corner brackets and a moving scan line. Quality checks tick off, then it captures by itself.', ['Royal Caribbean'], ['No glare · all corners · sharp', 'Gallery upload as a fallback'], D),
    S('doc-verifying', 'Documents', 'Verifying', 'Checking your <em>passport.</em>', 'Real steps instead of a spinner: photo, security features, face match, issuer check.', ['Royal Caribbean'], ['Each step says what was checked', 'Trust line: bank-grade encryption, ISO 27001']),
    S('doc-verified', 'Documents', 'Verified', 'Passport <em>verified.</em>', 'Success shows the finished card and exactly what was read from it.', [], ['Extracted fields for a quick sanity check']),
    S('doc-mismatch', 'Documents', 'Details mismatch', 'Details don’t <em>match.</em>', 'Instead of a generic error, field by field: what differs and what matches.', [], ['“Pradeep Mali” vs “Pradeep K. Mali” highlighted', 'Two fixes: use the passport name or retake']),
    S('doc-detail', 'Documents', 'Document detail', 'One card, <em>full detail.</em>', 'The card (tiltable), share/replace/remove, its data and where it was recently used.', [], ['“Venues never see this document” reassurance', 'Usage history builds trust']),
    S('family', 'Family', 'Family', 'Travel <em>together.</em>', 'Family members as portrait cards, each with its own status. Tap a card to open that person.', ['Disney', 'Apple Family Sharing'], ['Pending face scan flagged in amber', 'Guardian rule in one sentence']),
    S('member', 'Family', 'Member', 'Every member, <em>their own face.</em>', 'A member’s page leads with their portrait, then identity, permissions and activity.', ['Disney'], ['Independent check-in toggle for adults', 'Real-time alerts for every check-in'], D),
    S('member-pending', 'Family', 'Member · face pending', 'One step <em>left.</em>', 'When a member hasn’t scanned their face, the page leads with the action to finish it.', [], ['Status chip, step list and CTA all agree'], D),
    S('member-activity', 'Family', 'Member activity', 'Their <em>journey.</em>', 'A vertical timeline of a member’s check-ins with venue icons and match time.', [], ['Average check-in time in the header']),
    S('add-member', 'Family', 'Add member', 'Who’s joining <em>you?</em>', 'A four-step guided flow that starts with the relationship. The under-18 rule appears right at the date.', ['Royal Caribbean'], ['Selectable relationship chips', 'Guardian note in amber']),
    S('member-doc', 'Family', 'Member document', 'Scan Kiara’s <em>ID.</em>', 'Document options adapt to the member: birth certificate first for children.', [], ['Recommended vs other documents']),
    S('member-capture', 'Family', 'Capture document', 'Birth <em>certificate.</em>', 'The same viewfinder as the main flow, in a tall format for a paper certificate.', [], ['Consistent capture pattern everywhere'], D),
    S('member-face', 'Family', 'Member face scan', 'Now scan <em>Kiara.</em>', 'The scanner adapts to scanning someone else: instructions speak to the parent holding the phone.', ['Disney'], ['Two short liveness steps for children'], D),
    S('member-verifying', 'Family', 'Verifying member', 'Verifying <em>Kiara.</em>', 'Member verification mirrors document verification, ending with the link to the family.', [], ['Safe to leave; a notification follows']),
    S('turns18', 'Family', 'Turns 18', 'Meera is now <em>18.</em>', 'A milestone moment: when a child comes of age, they’re invited to own their identity and keep their history.', [], ['Warm framing for a compliance requirement', 'Clear list of what changes'], D),
    S('profile', 'Account', 'Profile', 'You, <em>verified.</em>', 'Person first: portrait, Truepas ID and three numbers, then calm grouped settings.', ['iOS Settings'], ['Every row leads somewhere', 'Sign out kept apart, in red'], { tab: 'me' }),
    S('edit-profile', 'Account', 'Edit profile', 'Edit <em>profile.</em>', 'Fields verified from a document are locked, with the reason shown. Contact details stay editable.', [], ['Lock icon plus “verified from your passport”']),
    S('settings', 'Account', 'Settings', 'Make it <em>yours.</em>', 'Grouped settings: check-in, appearance, preferences and privacy. Switches and the appearance control work.', ['iOS Settings'], ['Face check-in and Face ID unlock up front', 'Delete account kept in the privacy group']),
    S('security', 'Account', 'Security', 'Well <em>protected.</em>', 'A score ring turns abstract settings into one number with one suggestion to improve it.', ['Google Security Checkup'], ['Signed-in devices with sign-out']),
    S('change-password', 'Account', 'Change password', 'A new <em>password.</em>', 'A live strength meter with a checklist. Type in the field — rules turn green as they’re met.', [], ['Update button unlocks only at “Strong”']),
    S('new-pin', 'Account', 'New PIN', 'Create a new <em>PIN.</em>', 'Two-step PIN change with progress at the top. Type four digits to continue.', [], []),
    S('confirm-pin', 'Account', 'Confirm PIN', 'Confirm your <em>PIN.</em>', 'The mismatch state is shown inline under the dots, not in a popup. Type four digits to fix it.', [], ['The error says what to do next']),
    S('help', 'Account', 'Help', 'How can we <em>help?</em>', 'Search, topic chips, an FAQ with the most common question open, and two ways to reach a person.', [], ['Accordion works', '24 × 7 chat and phone']),
    S('about-tp', 'Account', 'About', 'Your face is your <em>pass.</em>', 'A brand moment: the mark glowing on navy with the guilloché pattern, then the legal links.', [], [], D),
    S('terms', 'Account', 'Terms', 'Terms of <em>service.</em>', 'Readable legal: numbered sections, generous line height and a plain-language summary at the top.', [], ['“The short version” on every legal page']),
    S('privacy-policy', 'Account', 'Privacy policy', 'Privacy, <em>plainly.</em>', 'Four short sections in plain language: what we collect, how we use it, who sees it, your rights.', [], ['DPDP Act rights named explicitly']),
    S('privacy', 'Account', 'Biometric data', 'Your data, <em>your rules.</em>', 'Every switch, every share and the delete button in one place — the truepas.com promise made operable.', ['Apple App Privacy Report'], ['Per-industry switches with real usage', 'Pause the face template entirely', 'Ledger of recent shares']),
    S('delete', 'Account', 'Delete account', 'Sorry to see you <em>go.</em>', 'Honest about consequences, with a deliberate typed confirmation. Type DELETE to unlock the button.', [], ['Lists exactly what gets erased', 'Optional reason chips']),
    S('deleting', 'Account', 'Deleting', 'Deleting your <em>data.</em>', 'Deletion progress uses the same step pattern as verification, in red.', [], ['Moves on by itself when finished']),
    S('deleted', 'Account', 'Deleted', 'Account <em>deleted.</em>', 'A graceful goodbye that confirms erasure, gives a reference and leaves the door open.', [], [])
  ];
  var order = SCREENS.map(function (s) { return s.id; });
  var byId = {};
  SCREENS.forEach(function (s, i) { s.n = i + 1; byId[s.id] = s; });

  var $ = function (id) { return document.getElementById(id); };
  var body = document.body;
  var current = null;
  var timers = [];
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function vibrate(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
  function vpOf(id) { return document.querySelector('.vp[data-id="' + id + '"]'); }

  /* photos: each stored once, shared by every <img> that uses it */
  if (window.IMAGES) document.querySelectorAll('img[data-img]').forEach(function (img) { img.src = window.IMAGES[img.dataset.img]; });

  /* ------------------------------------------------------------------
     Screen list
     ------------------------------------------------------------------ */
  var index = $('index');
  var lastGroup = null;
  SCREENS.forEach(function (s) {
    if (s.group !== lastGroup) {
      lastGroup = s.group;
      var count = SCREENS.filter(function (x) { return x.group === s.group; }).length;
      var t = document.createElement('div');
      t.className = 'ix-title';
      t.innerHTML = '<span>' + s.group + '</span><span>' + count + '</span>';
      index.appendChild(t);
    }
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ix-item';
    b.dataset.id = s.id;
    b.innerHTML = '<span class="ix-num">' + String(s.n).padStart(2, '0') + '</span>' + s.title;
    b.addEventListener('click', function () { go(s.id); closeDrawer(); });
    index.appendChild(b);
  });

  /* ------------------------------------------------------------------
     Router
     ------------------------------------------------------------------ */
  var pendingDir = null;
  function show(id, dir) {
    if (!byId[id]) id = order[0];
    if (id === current) return;
    var prevIdx = current ? order.indexOf(current) : -1;
    var idx = order.indexOf(id);
    if (!dir) dir = idx >= prevIdx ? 'next' : 'prev';
    clearTimers();
    closeIsland();
    document.querySelectorAll('.vp').forEach(function (vp) {
      var on = vp.dataset.id === id;
      vp.hidden = !on;
      vp.classList.remove('in-next', 'in-prev');
      if (on) {
        vp.scrollTop = 0;
        if (current) { void vp.offsetWidth; vp.classList.add(dir === 'next' ? 'in-next' : 'in-prev'); }
        vp.querySelectorAll('.rise, .born-in, .medal').forEach(function (el) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
      }
    });
    current = id;
    var s = byId[id];
    $('statusbar').classList.toggle('is-light', !!s.dark);
    $('homebar').classList.toggle('is-light', !!s.dark);
    setTab(s.tab);
    $('label').innerHTML = '<span class="mono">' + String(s.n).padStart(2, '0') + ' / ' + order.length + '</span><b>' + s.title + '</b>';
    $('prev').disabled = $('side-prev').disabled = idx === 0;
    $('next').disabled = $('side-next').disabled = idx === order.length - 1;
    document.querySelectorAll('.ix-item').forEach(function (b) {
      var on = b.dataset.id === id;
      b.classList.toggle('is-on', on);
      if (on) { b.setAttribute('aria-current', 'page'); if (b.scrollIntoView) b.scrollIntoView({ block: 'nearest' }); }
      else b.removeAttribute('aria-current');
    });
    $('n-eyebrow').textContent = s.group;
    $('n-title').innerHTML = s.headline;
    $('n-text').textContent = s.note;
    $('n-refs').innerHTML = s.refs.map(function (r) { return '<span class="n-ref">' + r + '</span>'; }).join('');
    $('n-list').innerHTML = s.points.map(function (p) { return '<li>' + p + '</li>'; }).join('');
    fields.forEach(function (f) { f.visible = !f.canvas.closest('.vp').hidden; if (f.visible && f.mode === 'welcome') f.assemble(); });
    var vp = vpOf(id), seq = vp.querySelector('[data-seq]');
    if (seq && SEQ[seq.dataset.seq]) SEQ[seq.dataset.seq](seq, vp);
    if (enter[id]) enter[id](vp);
  }
  function go(id, dir) {
    if (location.hash.slice(1) === id) { show(id, dir); return; }
    pendingDir = dir || null;
    location.hash = id;
  }
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), pendingDir); pendingDir = null; });
  function step(d) {
    var i = order.indexOf(current) + d;
    if (i < 0 || i >= order.length) return;
    go(order[i], d > 0 ? 'next' : 'prev');
  }
  ['prev', 'side-prev', 'drawer-prev'].forEach(function (k) { $(k).addEventListener('click', function () { step(-1); closeDrawer(); }); });
  ['next', 'side-next', 'drawer-next'].forEach(function (k) { $(k).addEventListener('click', function () { step(1); closeDrawer(); }); });
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'Escape') closeDrawer();
    if (/^[0-9]$/.test(e.key) && keyInput[current]) keyInput[current](e.key);
    if (e.key === 'Backspace' && keyInput[current]) keyInput[current]('del');
  });
  function openDrawer() { body.classList.add('drawer-open'); }
  function closeDrawer() { body.classList.remove('drawer-open'); }
  $('menu').addEventListener('click', openDrawer);
  $('edge').addEventListener('click', openDrawer);
  $('scrim').addEventListener('click', closeDrawer);

  /* ------------------------------------------------------------------
     Tab bar
     ------------------------------------------------------------------ */
  var tabbar = $('tabbar');
  function setTab(tab) {
    tabbar.hidden = !tab;
    if (!tab) return;
    var on = null;
    tabbar.querySelectorAll('.tb').forEach(function (t) {
      var is = t.dataset.t === tab;
      t.classList.toggle('is-on', is);
      if (is) { on = t; t.setAttribute('aria-current', 'page'); } else t.removeAttribute('aria-current');
    });
    if (on) requestAnimationFrame(function () { var blob = $('tb-blob'); blob.style.left = (on.offsetLeft + on.offsetWidth / 2 - 29) + 'px'; blob.style.opacity = 1; });
  }

  /* ------------------------------------------------------------------
     In-screen interactions (one delegated handler)
     ------------------------------------------------------------------ */
  var keyInput = {};
  $('area').addEventListener('click', function (e) {
    var t = e.target;
    var tg = t.closest('.tg');
    if (tg) { tg.setAttribute('aria-checked', tg.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); vibrate(8); return; }
    var pill = t.closest('.pill');
    if (pill) {
      var vp = pill.closest('.vp');
      vp.querySelectorAll('.pill').forEach(function (p) { p.setAttribute('aria-selected', p === pill ? 'true' : 'false'); });
      var f = pill.dataset.f;
      vp.querySelectorAll('.f-group').forEach(function (g) {
        var any = false;
        g.querySelectorAll('.f-row').forEach(function (r) { var v = f === 'all' || r.dataset.cat === f; r.hidden = !v; if (v) any = true; });
        g.hidden = !any;
      });
      return;
    }
    var segb = t.closest('.seg button');
    if (segb) {
      var seg = segb.parentElement, btns = Array.prototype.slice.call(seg.querySelectorAll('button')), i = btns.indexOf(segb);
      btns.forEach(function (b) { b.setAttribute('aria-pressed', b === segb ? 'true' : 'false'); });
      seg.querySelector('.thumb').style.transform = 'translateX(' + (i * 100) + '%)';
      if (seg.dataset.panes) seg.closest('.vp').querySelectorAll('[data-pane-id]').forEach(function (p) { p.hidden = p.dataset.paneId !== segb.dataset.pane; });
      vibrate(6);
      return;
    }
    var ch = t.closest('.choice');
    if (ch) {
      var grp = ch.parentElement;
      if (grp.dataset.multi) ch.setAttribute('aria-pressed', ch.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      else grp.querySelectorAll('.choice').forEach(function (c) { c.setAttribute('aria-pressed', c === ch ? 'true' : 'false'); });
      return;
    }
    var dc = t.closest('.dchoice');
    if (dc && dc.tagName === 'BUTTON') { dc.closest('.vp').querySelectorAll('.dchoice').forEach(function (d) { d.classList.toggle('sel', d === dc); }); vibrate(6); return; }
    var acc = t.closest('.acc-q');
    if (acc) { acc.parentElement.classList.toggle('open'); return; }
    var key = t.closest('.key[data-k]');
    if (key) { if (keyInput[current]) keyInput[current](key.dataset.k); vibrate(5); return; }
    var w = t.closest('.wcard[data-k]');
    if (w) { if (wOrder[wOrder.length - 1] === w.dataset.k) go('doc-detail'); else bringToFront(w.dataset.k); vibrate(6); return; }
    if (t.closest('#ci-replay')) { enter.checkin(); return; }
    if (t.closest('[data-role="markall"]')) { vpOf('notifications').querySelectorAll('.nrow.unread').forEach(function (n) { n.classList.remove('unread'); }); return; }
    var a = t.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href');
      if (h === '#') { e.preventDefault(); return; }
      if (h.charAt(0) === '#' && byId[h.slice(1)]) { e.preventDefault(); go(h.slice(1)); }
    }
  });
  document.querySelectorAll('.area form').forEach(function (f) { f.addEventListener('submit', function (e) { e.preventDefault(); }); });

  /* wallet stack */
  var wOrder = ['pan', 'dl', 'aadhaar', 'passport'];
  function layoutWallet() {
    wOrder.forEach(function (k, i) {
      var el = document.querySelector('#wallet-stack .wcard[data-k="' + k + '"]');
      el.style.top = (i * 66) + 'px';
      el.style.zIndex = i + 1;
      el.style.transform = i === wOrder.length - 1 ? 'none' : 'scale(' + (0.94 + i * 0.02) + ')';
    });
  }
  function bringToFront(k) { wOrder = wOrder.filter(function (x) { return x !== k; }).concat(k); layoutWallet(); }
  layoutWallet();

  /* holographic tilt */
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.classList.add('is-live');
      card.style.setProperty('--ry', ((px - 0.5) * 16).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - py) * 12).toFixed(2) + 'deg');
      card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', function () { card.classList.remove('is-live'); card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg'); });
  });

  /* guilloché security pattern */
  function guilloche(svg) {
    var vb = svg.getAttribute('viewBox').split(' ').map(Number), w = vb[2], h = vb[3];
    var d = '';
    var rows = Math.round(h / 10);
    for (var k = 0; k < rows; k++) {
      var y0 = (k / (rows - 1)) * h;
      for (var fam = 0; fam < 2; fam++) {
        d += 'M0 ' + y0.toFixed(1);
        for (var x = 6; x <= w; x += 6) {
          var y = y0 + 9 * Math.sin(x / 26 + k * 0.55 + fam * Math.PI) + 4 * Math.sin(x / 9 + k * 0.3);
          d += ' L' + x + ' ' + y.toFixed(1);
        }
      }
    }
    var cx = w * 0.86, cy = Math.min(h * 0.2, 60);
    for (var r = 0; r < 14; r++) {
      var R = 30 + r * 9;
      d += ' M' + (cx + R).toFixed(1) + ' ' + cy.toFixed(1);
      for (var t = 0.08; t <= Math.PI * 2 + 0.01; t += 0.08) {
        var rr = R + 5 * Math.sin(12 * t + r * 0.7);
        d += ' L' + (cx + rr * Math.cos(t)).toFixed(1) + ' ' + (cy + rr * Math.sin(t)).toFixed(1);
      }
    }
    svg.innerHTML = '<path d="' + d + '"></path>';
  }
  document.querySelectorAll('svg.guilloche').forEach(guilloche);

  /* hold to unlock */
  var hold = $('key-hold'), holdT = null, holdIdle = $('key-lbl').innerHTML;
  function holdReset() { clearTimeout(holdT); hold.classList.remove('is-holding', 'is-done'); $('key-lbl').innerHTML = holdIdle; }
  hold.addEventListener('pointerdown', function (e) {
    if (hold.classList.contains('is-done')) return;
    e.preventDefault();
    hold.classList.add('is-holding');
    vibrate(10);
    holdT = setTimeout(function () {
      hold.classList.remove('is-holding');
      hold.classList.add('is-done');
      $('key-lbl').innerHTML = CHECK + ' Door 1208 unlocked';
      vibrate([20, 40, 30]);
    }, 1100);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) {
    hold.addEventListener(ev, function () { if (!hold.classList.contains('is-done')) { clearTimeout(holdT); hold.classList.remove('is-holding'); } });
  });

  /* password strength */
  function pwCheck() {
    var v = $('pw-new').value;
    var rules = { len: v.length >= 8, up: /[A-Z]/.test(v), num: /[0-9]/.test(v), sym: /[^A-Za-z0-9]/.test(v) };
    var n = 0;
    $('pw-rules').querySelectorAll('li').forEach(function (li) { var ok = rules[li.dataset.r]; li.classList.toggle('ok', ok); if (ok) n++; });
    if (!v) n = 0;
    $('pw-meter').dataset.l = n;
    var words = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'], cols = ['#85949E', '#E5484D', '#C86E0A', '#0A8BFF', '#0B7A45'];
    $('pw-word').textContent = words[n];
    $('pw-word').style.color = cols[n];
    $('pw-cta').classList.toggle('is-off', n < 4);
  }
  $('pw-new').addEventListener('input', pwCheck);
  pwCheck();

  /* type DELETE */
  $('del-input').addEventListener('input', function () { $('del-cta').classList.toggle('is-off', this.value.trim().toUpperCase() !== 'DELETE'); });

  /* rotating QR */
  function qrSVG(seed) {
    var n = 29, s = seed >>> 0, cells = '';
    function rnd() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    function finder(x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="7" fill="#0A1E2A"></rect><rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#fff"></rect><rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" fill="#0A1E2A"></rect>'; }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
      var inF = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      var inLogo = x > 10 && x < 18 && y > 10 && y < 18;
      if (inF || inLogo) continue;
      var on = (y === 6 || x === 6) ? ((x + y) % 2 === 0) : rnd() > 0.52;
      if (on) cells += '<rect x="' + x + '" y="' + y + '" width="1" height="1"></rect>';
    }
    return '<g fill="#0A1E2A">' + cells + '</g>' + finder(0, 0) + finder(n - 7, 0) + finder(0, n - 7);
  }
  var qrSeed = 4821;
  document.querySelectorAll('svg.qr').forEach(function (q) { q.innerHTML = qrSVG(qrSeed); });

  /* ------------------------------------------------------------------
     Dynamic Island / Live Activity
     ------------------------------------------------------------------ */
  function openIsland() {
    if (body.classList.contains('native')) $('live-toast').classList.add('is-open');
    else $('island').classList.add('is-open');
    vibrate([15, 30, 25]);
  }
  function closeIsland() { $('island').classList.remove('is-open'); $('live-toast').classList.remove('is-open'); }

  /* ------------------------------------------------------------------
     Shared sequences, keyed by data-seq
     ------------------------------------------------------------------ */
  var C = 879.6;
  var SEQ = {};

  // labels for liveness chips
  document.querySelectorAll('.ls').forEach(function (c) { c.dataset.label = c.textContent.trim(); });

  SEQ.liveness = function (scr) {
    var chips = scr.querySelectorAll('.ls'), n = chips.length;
    var instr = scr.querySelector('[data-role="instr"]'), prog = scr.querySelector('[data-role="prog"]');
    var cta = scr.querySelector('[data-role="cta"]'), bar = scr.querySelector('[data-role="bar"]');
    var f = fieldIn(scr);
    cta.classList.add('is-hidden');
    prog.style.stroke = ''; prog.style.strokeDashoffset = C;
    if (bar) bar.style.opacity = '.45';
    chips.forEach(function (c) { c.className = 'ls'; c.innerHTML = '<span class="d"></span>' + c.dataset.label; });
    instr.textContent = chips[0].dataset.text;
    if (f) { f.done = false; f.targetYaw = 0; f.smile = 0; f.blink = false; f.assemble(); }
    var per = 1900;
    chips.forEach(function (c, i) {
      later(function () {
        c.className = 'ls on';
        instr.textContent = c.dataset.text;
        if (f) { f.targetYaw = +(c.dataset.yaw || 0); f.smile = c.dataset.smile ? 1 : 0; f.blink = !!c.dataset.blink; }
      }, 300 + i * per);
      later(function () {
        c.className = 'ls done';
        c.innerHTML = CHECK + ' ' + c.dataset.label;
        prog.style.strokeDashoffset = C * (1 - (i + 1) / n);
        vibrate(8);
      }, 300 + i * per + 1600);
    });
    later(function () {
      if (f) { f.targetYaw = 0; f.done = true; f.blink = false; f.smile = 0; }
      prog.style.stroke = '#4BE39A';
      if (bar) bar.style.opacity = '1';
      instr.textContent = scr.dataset.done || 'Done.';
      cta.classList.remove('is-hidden');
      vibrate([15, 30, 25]);
    }, 300 + n * per);
  };

  document.querySelectorAll('[data-role="title"]').forEach(function (t) { t.dataset.orig = t.innerHTML; });
  SEQ.process = function (scr) {
    var steps = scr.querySelectorAll('.pstep'), n = steps.length;
    var ring = scr.querySelector('[data-role="ring"] circle.p'), pct = scr.querySelector('[data-role="pct"]');
    var title = scr.querySelector('[data-role="title"]'), cta = scr.querySelector('[data-role="cta"]');
    steps.forEach(function (s) { s.className = 'pstep'; s.querySelector('.pm').innerHTML = ''; });
    if (ring) { ring.style.strokeDashoffset = 490; }
    if (pct) pct.textContent = '0%';
    title.innerHTML = title.dataset.orig;
    cta.classList.add('is-hidden');
    var per = 820;
    steps.forEach(function (s, i) {
      later(function () { s.classList.add('is-active'); }, 350 + i * per);
      later(function () {
        s.classList.remove('is-active'); s.classList.add('is-done'); s.querySelector('.pm').innerHTML = CHECK;
        var p = (i + 1) / n;
        if (ring) ring.style.strokeDashoffset = 490 * (1 - p);
        if (pct) pct.textContent = Math.round(p * 100) + '%';
        vibrate(6);
      }, 350 + i * per + 680);
    });
    later(function () {
      title.innerHTML = title.dataset.done;
      cta.classList.remove('is-hidden');
      vibrate([15, 30, 25]);
      if (scr.dataset.autoNext) later(function () { go(scr.dataset.autoNext); }, 1500);
    }, 350 + n * per + 200);
  };

  SEQ.capture = function (scr) {
    var vf = scr.querySelector('.vf'), bar = scr.querySelector('.capbar'), chip = scr.querySelector('[data-role="chip"]');
    var cta = scr.querySelector('[data-role="cta"]'), instr = scr.querySelector('[data-role="instr"]'), tips = scr.querySelectorAll('.tip');
    if (!instr.dataset.orig) instr.dataset.orig = instr.textContent;
    vf.classList.remove('is-captured');
    bar.className = 'capbar mt-16';
    chip.textContent = 'Hold steady · auto-capturing';
    instr.textContent = instr.dataset.orig;
    cta.classList.add('is-hidden');
    tips.forEach(function (tp) { var m = tp.querySelector('.ci-mark'); m.innerHTML = ''; m.style.background = ''; tp.style.color = ''; });
    later(function () { void bar.offsetWidth; bar.classList.add('go'); }, 300);
    tips.forEach(function (tp, i) {
      later(function () { var m = tp.querySelector('.ci-mark'); m.innerHTML = CHECK; m.style.background = '#14A866'; tp.style.color = '#EAF4FA'; vibrate(5); }, 800 + i * 600);
    });
    later(function () {
      vf.classList.add('is-captured');
      bar.className = 'capbar mt-16 done';
      chip.textContent = 'Captured · looks sharp';
      instr.textContent = 'Captured. Make sure every detail is readable.';
      cta.classList.remove('is-hidden');
      vibrate([10, 30, 20]);
    }, 2700);
  };

  SEQ.otp = function (scr, vp) {
    var box = scr.querySelector('.otp'), cells = box.querySelectorAll('i'), status = scr.querySelector('[data-role="status"]'), cta = scr.querySelector('[data-role="cta"]');
    var code = '';
    function paint() {
      cells.forEach(function (c, i) { c.textContent = code[i] || ''; c.classList.toggle('cur', i === code.length && code.length < 6); });
      if (code.length === 6) {
        box.classList.add('ok');
        status.className = 'status-line ok';
        status.textContent = 'Verified · +91 98200 41827';
        cta.classList.remove('is-hidden');
        vibrate([15, 30, 25]);
      }
    }
    box.classList.remove('ok');
    status.className = 'status-line';
    cta.classList.add('is-hidden');
    var sec = 24;
    (function tick() { if (code.length < 6) { status.textContent = 'Resend code in 0:' + String(sec).padStart(2, '0'); if (sec > 0) { sec--; later(tick, 1000); } else status.textContent = 'Didn’t get it? Resend code'; } })();
    keyInput[vp.dataset.id] = function (k) {
      if (code.length === 6) return;
      code = k === 'del' ? code.slice(0, -1) : code + k;
      paint();
    };
    paint();
    var auto = box.dataset.auto;
    for (var i = 0; i < 6; i++) (function (i) { later(function () { if (code.length === i) { code += auto[i]; paint(); } }, 1400 + i * 240); })(i);
  };

  SEQ.pin = function (scr, vp) {
    var dots = scr.querySelector('.dots'), d = dots.querySelectorAll('i'), status = scr.querySelector('[data-role="status"]');
    var pin = '';
    if (!status.dataset.orig) status.dataset.orig = status.textContent;
    function paint() { d.forEach(function (x, i) { x.classList.toggle('on', i < pin.length); }); }
    dots.className = 'dots mt-28';
    status.className = 'status-line mt-12';
    status.textContent = status.dataset.orig;
    if (scr.dataset.startBad) {
      later(function () { dots.classList.add('bad'); status.className = 'status-line mt-12 bad'; status.textContent = 'Those PINs didn’t match. Type it again.'; vibrate([30, 40, 30]); }, 450);
    }
    keyInput[vp.dataset.id] = function (k) {
      if (pin.length === 4) return;
      dots.classList.remove('bad');
      pin = k === 'del' ? pin.slice(0, -1) : pin + k;
      paint();
      if (pin.length === 4) {
        dots.classList.add('ok');
        status.className = 'status-line mt-12 ok';
        status.textContent = scr.dataset.next === 'confirm-pin' ? 'Got it. Now confirm.' : 'Confirmed';
        vibrate([15, 30, 25]);
        later(function () { go(scr.dataset.next); }, 750);
      }
    };
    paint();
  };

  /* ------------------------------------------------------------------
     Screen-specific entries
     ------------------------------------------------------------------ */
  var enter = {};
  enter.key = holdReset;
  enter['delete'] = function () { $('del-input').value = ''; $('del-cta').classList.add('is-off'); };
  enter.pass = function () {
    var sec = 60, ring = $('qr-ring');
    function tick() {
      $('qr-sec').textContent = '0:' + String(sec).padStart(2, '0');
      ring.style.strokeDashoffset = 50.3 * (1 - sec / 60);
      if (sec === 0) {
        qrSeed += 7919;
        document.querySelectorAll('svg.qr').forEach(function (q) { q.style.opacity = 0; setTimeout(function () { q.innerHTML = qrSVG(qrSeed); q.style.opacity = 1; }, 250); });
        sec = 60; vibrate(8);
      } else sec--;
      later(tick, 1000);
    }
    tick();
  };

  enter.checkin = function () {
    clearTimers(); closeIsland();
    var sc = $('ci-scanner'), steps = document.querySelectorAll('.ci-step');
    sc.classList.remove('is-matched');
    $('ci-prog').style.stroke = '#36C9FF';
    $('ci-prog').style.strokeDashoffset = C;
    $('ci-title').innerHTML = 'Look at the <em>camera.</em>';
    $('ci-sub').textContent = 'Hold still for a moment.';
    $('ci-timer').textContent = '0.00 s';
    $('ci-cta').classList.add('is-hidden');
    $('ci-replay').classList.add('is-hidden');
    steps.forEach(function (s) { s.className = 'row-x ci-step'; s.querySelector('.ci-mark').innerHTML = ''; });
    function act(i) { steps[i].classList.add('is-active'); }
    function done(i) { steps[i].classList.remove('is-active'); steps[i].classList.add('is-done'); steps[i].querySelector('.ci-mark').innerHTML = CHECK; vibrate(6); }
    later(function () { act(0); $('ci-prog').style.strokeDashoffset = C * 0.72; }, 350);
    later(function () { done(0); act(1); $('ci-prog').style.strokeDashoffset = C * 0.42; }, 900);
    later(function () { done(1); act(2); $('ci-prog').style.strokeDashoffset = C * 0.12; startTimer(); }, 1500);
    function startTimer() {
      var t0 = performance.now();
      (function tick(now) {
        var el = Math.min(0.82, (now - t0) / 1000 * 0.82 / 0.9);
        $('ci-timer').textContent = el.toFixed(2) + ' s';
        if (el < 0.82 && current === 'checkin') requestAnimationFrame(tick);
      })(t0);
    }
    later(function () {
      done(2);
      $('ci-timer').textContent = '0.82 s';
      $('ci-prog').style.strokeDashoffset = 0;
      $('ci-prog').style.stroke = '#4BE39A';
      sc.classList.add('is-matched');
      $('ci-title').innerHTML = 'Matched in <em class="ok">0.8 s</em>';
      $('ci-sub').textContent = 'Welcome to Marine Bay Grand, Pradeep.';
      openIsland();
      $('ci-cta').classList.remove('is-hidden');
      $('ci-replay').classList.remove('is-hidden');
    }, 2450);
    later(closeIsland, 7200);
  };

  /* ------------------------------------------------------------------
     Point-cloud face (canvas)
     ------------------------------------------------------------------ */
  var HEAD = (function () {
    var pts = [];
    var N = 2300, ga = Math.PI * (3 - Math.sqrt(5));
    function g(x, y, sx, sy) { return Math.exp(-(x * x) / sx - (y * y) / sy); }
    function F(fx, fy) {
      var ax = Math.abs(fx);
      return 0.30 * g(fx, fy + 0.06, 0.010, 0.05)
        - 0.08 * g(ax - 0.29, fy - 0.17, 0.014, 0.006)
        + 0.05 * g(ax - 0.29, fy - 0.31, 0.03, 0.004)
        + 0.06 * g(fx, fy + 0.46, 0.035, 0.006)
        - 0.035 * g(fx, fy + 0.46, 0.04, 0.0006)
        + 0.045 * g(ax - 0.42, fy + 0.1, 0.03, 0.03);
    }
    for (var i = 0; i < N; i++) {
      var uy = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - uy * uy), th = ga * i;
      var ux = Math.cos(th) * rad, uz = Math.sin(th) * rad;
      var x = ux * 0.78, y = uy * 1.0, z = uz * 0.84;
      if (y < -0.15) { var k = Math.min(1, (-0.15 - y) / 0.85); x *= 1 - 0.38 * k * k; z *= 1 - 0.18 * k; }
      var fw = Math.max(0, uz); fw *= fw;
      var ep = 0.012;
      var gx = (F(x + ep, y) - F(x - ep, y)) / (2 * ep), gy = (F(x, y + ep) - F(x, y - ep)) / (2 * ep);
      z += fw * F(x, y);
      var nx = ux - fw * gx * 0.9, ny = uy - fw * gy * 0.9, nz = uz, nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var ax = Math.abs(x);
      pts.push({ x: x, y: y, z: z, nx: nx / nl, ny: ny / nl, nz: nz / nl, eye: g(ax - 0.29, y - 0.17, 0.006, 0.003) > 0.5 && uz > 0.3, mouth: g(x, y + 0.46, 0.02, 0.002) > 0.4 && uz > 0.3 });
    }
    for (var j = 0; j < 260; j++) {
      var a = Math.random() * Math.PI * 2, yy = -0.95 - Math.random() * 0.55;
      pts.push({ x: Math.cos(a) * 0.36, y: yy, z: Math.sin(a) * 0.36, nx: Math.cos(a), ny: 0, nz: Math.sin(a), neck: true });
    }
    pts.forEach(function (p) { p.sx = (Math.random() - 0.5) * 6; p.sy = (Math.random() - 0.5) * 6; p.sz = (Math.random() - 0.5) * 6; p.delay = (1 - p.y) * 0.25 + Math.random() * 0.25; });
    return pts;
  })();
  var LANDMARKS = [[0, 0.62, 0.62], [-0.29, 0.17, 0.62], [0.29, 0.17, 0.62], [0, -0.12, 1.06], [-0.2, -0.46, 0.8], [0.2, -0.46, 0.8], [0, -0.92, 0.48], [-0.6, -0.05, 0.42], [0.6, -0.05, 0.42]];
  var LINKS = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5], [4, 6], [5, 6], [1, 7], [2, 8], [7, 4], [8, 5]];

  var fields = [];
  function FaceField(canvas) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.mode = canvas.dataset.mode;
    this.yaw = 0; this.targetYaw = 0; this.smile = 0; this.done = false; this.blink = false;
    this.t0 = performance.now(); this.visible = false;
  }
  FaceField.prototype.assemble = function () { this.t0 = performance.now(); };
  FaceField.prototype.draw = function (now) {
    var c = this.canvas, ctx = this.ctx;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var t = (now - this.t0) / 1000, prog = Math.min(1, t / 2.2), yaw;
    if (this.mode === 'welcome') yaw = 0.32 + Math.sin(now / 2600) * 0.42;
    else { this.yaw += (this.targetYaw - this.yaw) * 0.06; yaw = this.yaw + 0.22 + Math.sin(now / 1800) * 0.12; }
    var pitch = Math.sin(now / 3400) * 0.08 - 0.05;
    var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    var R = Math.min(w, h) * (this.mode === 'welcome' ? 0.36 : 0.37);
    var ox = w / 2, oy = h / 2 + (this.mode === 'welcome' ? 6 : 14);
    var scanY = 1.05 - ((now / 1000) % 2.6) / 2.6 * 2.3;
    var col = this.done ? [75, 227, 154] : [110, 205, 255];
    var blinkK = this.blink ? Math.max(0, Math.sin(now / 160)) : 0;
    ctx.globalCompositeOperation = 'lighter';
    function proj(x, y, z) {
      var x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      var y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      var s = 3.2 / (3.2 - z2);
      return [ox + x1 * s * R, oy - y1 * s * R, z2];
    }
    for (var i = 0; i < HEAD.length; i++) {
      var p = HEAD[i];
      var e = Math.max(0, Math.min(1, (prog - p.delay * 0.6) / 0.55));
      e = 1 - Math.pow(1 - e, 3);
      var py = p.y, px = p.x;
      if (p.mouth && this.smile) py += 0.03 * this.smile * (Math.abs(px) / 0.2);
      if (p.eye && blinkK > 0.6) continue;
      var x = p.sx + (px - p.sx) * e, y = p.sy + (py - p.sy) * e, z = p.sz + (p.z - p.sz) * e;
      var q = proj(x, y, z);
      var nx1 = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy;
      var ny1 = p.ny * cp - nz1 * sp, nz2 = p.ny * sp + nz1 * cp;
      if (nz2 < -0.15 && e > 0.9) continue;
      var lam = Math.max(0, nx1 * -0.5 + ny1 * 0.45 + nz2 * 0.74);
      var depth = (q[2] + 0.9) / 1.9;
      var a = (p.neck ? 0.3 : 1) * (0.08 + 0.92 * Math.pow(lam, 1.5)) * (0.35 + 0.65 * depth) * (0.3 + 0.7 * e);
      var size = 0.55 + 1.35 * lam;
      if (Math.abs(y - scanY) < 0.05 && e > 0.95) { a = Math.min(1, a + 0.6); size *= 1.7; ctx.fillStyle = 'rgba(225,248,255,' + a.toFixed(3) + ')'; }
      else ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a.toFixed(3) + ')';
      ctx.fillRect(q[0] - size / 2, q[1] - size / 2, size, size);
    }
    if (prog > 0.85) {
      var la = (prog - 0.85) / 0.15;
      var P = LANDMARKS.map(function (l) { return proj(l[0], l[1], l[2]); });
      ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.22 * la).toFixed(3) + ')';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      LINKS.forEach(function (lk) { ctx.moveTo(P[lk[0]][0], P[lk[0]][1]); ctx.lineTo(P[lk[1]][0], P[lk[1]][1]); });
      ctx.stroke();
      P.forEach(function (q) {
        if (q[2] < -0.2) return;
        ctx.fillStyle = 'rgba(225,248,255,' + (0.9 * la).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(q[0], q[1], 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.18 * la).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, Math.PI * 2); ctx.fill();
      });
    }
    ctx.globalCompositeOperation = 'source-over';
  };
  document.querySelectorAll('canvas.facefield').forEach(function (c) { fields.push(new FaceField(c)); });
  function fieldIn(scr) { for (var i = 0; i < fields.length; i++) if (scr.contains(fields[i].canvas)) return fields[i]; return null; }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function loop(now) {
    fields.forEach(function (f) { if (f.visible) f.draw(reduce ? f.t0 + 5000 : now); });
    requestAnimationFrame(loop);
  })(performance.now());

  /* ------------------------------------------------------------------
     Desktop frame vs full-screen phone
     ------------------------------------------------------------------ */
  var mq = window.matchMedia('(max-width: 560px)');
  var stage = $('stage'), wrap = $('wrap'), device = $('device');
  function fit() {
    if (body.classList.contains('native')) return;
    var bar = document.querySelector('.bar');
    var availH = stage.clientHeight - bar.offsetHeight - 18 - 40;
    var availW = stage.clientWidth - 32 - 150;
    var s = Math.max(0.3, Math.min(1, availH / 878, availW / 419));
    device.style.transform = 'scale(' + s + ')';
    wrap.style.width = (419 * s) + 'px';
    wrap.style.height = (878 * s) + 'px';
  }
  function applyMode() {
    body.classList.toggle('native', mq.matches);
    if (mq.matches) { wrap.style.width = ''; wrap.style.height = ''; device.style.transform = ''; }
    fit();
    if (current && byId[current].tab) setTab(byId[current].tab);
  }
  if (mq.addEventListener) mq.addEventListener('change', applyMode); else mq.addListener(applyMode);
  window.addEventListener('resize', function () { fit(); if (current && byId[current].tab) setTab(byId[current].tab); });
  applyMode();

  /* swipe between screens */
  var sx = 0, sy = 0, st = 0, tracking = false;
  $('area').addEventListener('touchstart', function (e) {
    if (!body.classList.contains('native') || e.touches.length !== 1 || e.target.closest('.carousel, .pills, .hold, .keypad, .seg, input')) { tracking = false; return; }
    tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, { passive: true });
  $('area').addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - st < 700) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  var seen = false;
  try { seen = localStorage.getItem('tp-next-hint') === '1'; } catch (e) {}
  if (mq.matches && !seen) {
    setTimeout(function () { $('hint').classList.add('is-on'); }, 900);
    setTimeout(function () { $('hint').classList.remove('is-on'); }, 5600);
    try { localStorage.setItem('tp-next-hint', '1'); } catch (e) {}
  }

  show(location.hash.slice(1) || order[0]);
})();
