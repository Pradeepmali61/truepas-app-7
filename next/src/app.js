(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Screens + design notes
     ------------------------------------------------------------------ */
  var SCREENS = [
    { id: 'welcome', group: 'Onboarding', title: 'Welcome', dark: true,
      headline: 'One face. Every <em>check-in.</em>',
      note: 'The first frame sells the promise. A live 3D face assembles out of light over the hotel at dusk, while two glass cards show the outcome: verified, checked in.',
      refs: ['CLEAR', 'Apple Face ID', 'Airbnb'],
      points: ['Point-cloud face renders live and rotates, so the hero is never a static picture', 'Serif italic accent is the brand’s editorial signature', 'truepas.com blue drives the primary action'] },
    { id: 'create', group: 'Onboarding', title: 'Create account',
      headline: 'Create your <em>Truepas.</em>',
      note: 'Three steps, one decision per row. The name label says “as on your ID” so the document scan matches later.',
      refs: ['Royal Caribbean', 'Revolut'],
      points: ['Segmented progress shows exactly what is left', 'Live focus ring on the active field', 'Returning users go straight to face sign-in'] },
    { id: 'consent', group: 'Onboarding', title: 'Biometric consent',
      headline: 'Your face, <em>your control.</em>',
      note: 'Trust before the camera. Three plain promises, then a per-industry switchboard taken from truepas.com. The toggles work.',
      refs: ['DigiYatra', 'Apple privacy labels'],
      points: ['Venues receive a yes or no, never the face', 'DPDP Act 2023 and GDPR named explicitly', 'Industries are opt-in, one switch each'] },
    { id: 'facescan', group: 'Onboarding', title: 'Face scan', dark: true,
      headline: 'Verify your <em>face.</em>',
      note: 'The biometric moment gets a dark studio. The point-cloud head follows each liveness instruction — blink, turn left, smile — while the ring fills.',
      refs: ['Apple Face ID', 'CLEAR'],
      points: ['Liveness steps tick off on their own', 'The 3D head turns when you are asked to turn', 'Turns mint when the template is sealed'] },
    { id: 'born', group: 'Onboarding', title: 'Identity sealed', dark: true,
      headline: 'You’re <em>verified.</em>',
      note: 'The payoff: the identity card is born. It flips in, catches the light and stays tiltable — move your pointer over it.',
      refs: ['Apple Wallet', 'Amex Centurion'],
      points: ['Holographic sheen and guilloché security pattern', 'Summary of what was verified, in three lines'] },
    { id: 'home', group: 'Everyday', title: 'Home', tab: 'home',
      headline: 'Where are you going <em>today?</em>',
      note: 'Home is “my identity plus my journey”. The holographic card, today’s stay as a full photo card with the face check-in on it, then what is coming up.',
      refs: ['Airbnb', 'Hilton', 'Disney'],
      points: ['Today’s stay is the hero, with the action on it', 'Swipeable “Coming up” across flight, park and cruise', 'Liquid-glass tab bar with a raised face button'] },
    { id: 'checkin', group: 'Everyday', title: 'Live check-in', dark: true,
      headline: 'Look at the <em>camera.</em>',
      note: 'The moment of truth, timed to the millisecond. Face found, liveness, match — then the Dynamic Island blooms into a Live Activity.',
      refs: ['iOS Live Activities', 'CLEAR'],
      points: ['Three-step live status with a running timer', 'Matched state turns the ring and mesh mint', 'Replay to watch it again'] },
    { id: 'welcomed', group: 'Everyday', title: 'Checked in',
      headline: 'Welcome, <em>Pradeep.</em>',
      note: 'The match lands with the room: photo, number, checkout time — plus a privacy receipt of exactly what the hotel received.',
      refs: ['Hilton', 'Apple Pay receipt'],
      points: ['“Matched in 0.8 seconds” makes speed visible', 'Shared vs never-shared, side by side'] },
    { id: 'key', group: 'Everyday', title: 'Digital key', dark: true,
      headline: 'Your room <em>key.</em>',
      note: 'The room number is the biggest thing on the page. Press and hold to unlock — a deliberate gesture for a door.',
      refs: ['Hilton Digital Key', 'Apple Home Key'],
      points: ['Hold-to-unlock with a filling bar and a haptic tap', 'NFC pulse shows the phone is ready', 'Stay services underneath'] },
    { id: 'journey', group: 'Everyday', title: 'Trip journey',
      headline: 'Curb to gate, <em>by face.</em>',
      note: 'A boarding pass without a barcode. The plane flies its arc while the timeline shows every face check from terminal entry to boarding.',
      refs: ['DigiYatra', 'Apple Wallet boarding pass'],
      points: ['Live “now” step pulses', 'Each checkpoint shows its match time'] },
    { id: 'checkins', group: 'Everyday', title: 'Check-ins', tab: 'checkins',
      headline: 'Your year in <em>check-ins.</em>',
      note: 'History opens with the year in numbers, then every venue with a photo. The filters work.',
      refs: ['Airbnb Trips', 'Spotify Wrapped'],
      points: ['Hours saved, made concrete', 'Photo thumbnails make venues recognisable'] },
    { id: 'wallet', group: 'Wallet & control', title: 'Wallet', tab: 'wallet',
      headline: 'Documents as <em>cards.</em>',
      note: 'Government IDs as a physical wallet. Tap any card and it springs to the front.',
      refs: ['Apple Wallet', 'Revolut'],
      points: ['Identity strength score up top', 'Guilloché security pattern on every card', 'In-review shown in amber, never red'] },
    { id: 'family', group: 'Wallet & control', title: 'Family',
      headline: 'Travel <em>together.</em>',
      note: 'Family members as portrait cards, each with its own status. A pending face scan is one tap from being finished.',
      refs: ['Disney MagicBand', 'Apple Family Sharing'],
      points: ['Guardian rule for children in one sentence', 'Amber for pending, green for verified'] },
    { id: 'privacy', group: 'Wallet & control', title: 'Privacy center',
      headline: 'Your data, <em>your rules.</em>',
      note: 'Every switch, every share and the delete button in one place — the truepas.com promise made operable.',
      refs: ['Apple App Privacy Report'],
      points: ['Per-industry switches with real usage', 'Ledger of recent shares', 'Delete biometric data, clearly marked'] },
    { id: 'profile', group: 'Wallet & control', title: 'Profile', tab: 'me',
      headline: 'You, <em>verified.</em>',
      note: 'Person first: portrait, Truepas ID and three numbers, then calm grouped settings.',
      refs: ['iOS Settings'],
      points: ['Security score shown as a chip', 'Sign out kept apart, in red'] }
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
  function vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
  var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';

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
        // restart entrance animations
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
    $('n-refs').innerHTML = (s.refs || []).map(function (r) { return '<span class="n-ref">' + r + '</span>'; }).join('');
    $('n-list').innerHTML = (s.points || []).map(function (p) { return '<li>' + p + '</li>'; }).join('');
    if (enter[id]) enter[id]();
    fields.forEach(function (f) { f.visible = !f.canvas.closest('.vp').hidden; if (f.visible && f.mode === 'welcome') f.assemble(); });
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
    var blob = $('tb-blob');
    if (on) {
      requestAnimationFrame(function () { blob.style.left = (on.offsetLeft + on.offsetWidth / 2 - 29) + 'px'; blob.style.opacity = 1; });
    }
  }

  /* ------------------------------------------------------------------
     In-screen interactions
     ------------------------------------------------------------------ */
  $('area').addEventListener('click', function (e) {
    var tg = e.target.closest('.tg');
    if (tg) { tg.setAttribute('aria-checked', tg.getAttribute('aria-checked') === 'true' ? 'false' : 'true'); vibrate(8); return; }
    var pill = e.target.closest('.pill');
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
    var w = e.target.closest('.wcard');
    if (w) { bringToFront(w.dataset.k); vibrate(6); return; }
    if (e.target.closest('#ci-replay')) { enter.checkin(); return; }
    var a = e.target.closest('a[href]');
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
      var el = document.querySelector('.wcard[data-k="' + k + '"]');
      el.style.top = (i * 66) + 'px';
      el.style.zIndex = i + 1;
      el.style.transform = i === wOrder.length - 1 ? 'none' : 'scale(' + (0.94 + i * 0.02) + ')';
    });
  }
  function bringToFront(k) {
    wOrder = wOrder.filter(function (x) { return x !== k; }).concat(k);
    layoutWallet();
  }
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
    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-live');
      card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg');
    });
  });

  /* guilloché security pattern */
  function guilloche(svg) {
    var vb = svg.getAttribute('viewBox').split(' ').map(Number), w = vb[2], h = vb[3];
    var d = '';
    for (var k = 0; k < 22; k++) {
      var y0 = (k / 21) * h;
      for (var fam = 0; fam < 2; fam++) {
        d += 'M0 ' + y0.toFixed(1);
        for (var x = 6; x <= w; x += 6) {
          var y = y0 + 9 * Math.sin(x / 26 + k * 0.55 + fam * Math.PI) + 4 * Math.sin(x / 9 + k * 0.3);
          d += ' L' + x + ' ' + y.toFixed(1);
        }
      }
    }
    var cx = w * 0.86, cy = h * 0.2;
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
  var hold = $('key-hold'), holdT = null;
  function holdReset() {
    clearTimeout(holdT);
    hold.classList.remove('is-holding', 'is-done');
    $('key-lbl').innerHTML = $('key-lbl').dataset.idle;
  }
  $('key-lbl').dataset.idle = $('key-lbl').innerHTML;
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
     Screen entry sequences
     ------------------------------------------------------------------ */
  var enter = {};
  var C = 879.6;
  enter.key = holdReset;

  enter.facescan = function () {
    var steps = [
      { el: 'fs-s1', text: 'Blink slowly, twice.', yaw: 0, prog: 0.33 },
      { el: 'fs-s2', text: 'Slowly turn your head to the left.', yaw: -0.62, prog: 0.66 },
      { el: 'fs-s3', text: 'Now give us a smile.', yaw: 0, prog: 1 }
    ];
    var f = fieldFor('fs-canvas');
    $('fs-cta').classList.add('is-hidden');
    $('fs-prog').style.stroke = '';
    $('fs-prog').style.strokeDashoffset = C;
    $('fs-bar3').style.opacity = '.45';
    steps.forEach(function (s) { $(s.el).className = 'ls'; });
    if (f) { f.done = false; f.targetYaw = 0; f.smile = 0; f.assemble(); }
    steps.forEach(function (s, i) {
      later(function () {
        $(s.el).className = 'ls on';
        $('fs-instr').textContent = s.text;
        if (f) { f.targetYaw = s.yaw; f.smile = i === 2 ? 1 : 0; f.blink = i === 0; }
      }, 300 + i * 1900);
      later(function () {
        $(s.el).className = 'ls done';
        $(s.el).innerHTML = CHECK + ' ' + $(s.el).textContent;
        $('fs-prog').style.strokeDashoffset = C * (1 - s.prog);
        vibrate(8);
      }, 300 + i * 1900 + 1600);
    });
    later(function () {
      if (f) { f.targetYaw = 0; f.done = true; f.blink = false; f.smile = 0; }
      $('fs-prog').style.stroke = '#4BE39A';
      $('fs-bar3').style.opacity = '1';
      $('fs-instr').textContent = 'Done. Your face template is sealed on this phone.';
      $('fs-cta').classList.remove('is-hidden');
      vibrate([15, 30, 25]);
    }, 300 + 3 * 1900);
  };
  // reset labels that got a check prepended
  ['fs-s1', 'fs-s2', 'fs-s3'].forEach(function (id) { $(id).dataset.label = $(id).textContent.trim(); });
  var _fs = enter.facescan;
  enter.facescan = function () { ['fs-s1', 'fs-s2', 'fs-s3'].forEach(function (id) { $(id).innerHTML = '<span class="d"></span>' + $(id).dataset.label; }); _fs(); };

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
    var raf = null, t0 = 0;
    function startTimer() {
      t0 = performance.now();
      (function tick(now) {
        var el = Math.min(0.82, (now - t0) / 1000 * 0.82 / 0.9);
        $('ci-timer').textContent = el.toFixed(2) + ' s';
        if (el < 0.82 && current === 'checkin') raf = requestAnimationFrame(tick);
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
    for (var i = 0; i < N; i++) {
      var uy = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - uy * uy), th = ga * i;
      var ux = Math.cos(th) * rad, uz = Math.sin(th) * rad;
      var x = ux * 0.78, y = uy * 1.0, z = uz * 0.84;
      if (y < -0.15) { var k = Math.min(1, (-0.15 - y) / 0.85); x *= 1 - 0.38 * k * k; z *= 1 - 0.18 * k; }
      var front = Math.max(0, uz);
      var fw = front * front;
      var F = function (fx, fy) {
        var ax = Math.abs(fx);
        return 0.30 * g(fx, fy + 0.06, 0.010, 0.05)
          - 0.08 * g(ax - 0.29, fy - 0.17, 0.014, 0.006)
          + 0.05 * g(ax - 0.29, fy - 0.31, 0.03, 0.004)
          + 0.06 * g(fx, fy + 0.46, 0.035, 0.006)
          - 0.035 * g(fx, fy + 0.46, 0.04, 0.0006)
          + 0.045 * g(ax - 0.42, fy + 0.1, 0.03, 0.03);
      };
      var ep = 0.012;
      var gx = (F(x + ep, y) - F(x - ep, y)) / (2 * ep), gy = (F(x, y + ep) - F(x, y - ep)) / (2 * ep);
      z += fw * F(x, y);
      var nx = ux - fw * gx * 0.9, ny = uy - fw * gy * 0.9, nz = uz, nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var axx = Math.abs(x);
      pts.push({ x: x, y: y, z: z, nx: nx / nl, ny: ny / nl, nz: nz / nl, eye: g(axx - 0.29, y - 0.17, 0.006, 0.003) > 0.5 && uz > 0.3, mouth: g(x, y + 0.46, 0.02, 0.002) > 0.4 && uz > 0.3 });
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
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = canvas.dataset.mode;
    this.yaw = 0; this.targetYaw = 0; this.smile = 0; this.done = false; this.blink = false;
    this.t0 = performance.now();
    this.visible = false;
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
    var t = (now - this.t0) / 1000;
    var prog = Math.min(1, t / 2.2);
    var yaw;
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
    var proj = function (x, y, z) {
      var x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      var y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      var s = 3.2 / (3.2 - z2);
      return [ox + x1 * s * R, oy - y1 * s * R, z2];
    };
    for (var i = 0; i < HEAD.length; i++) {
      var p = HEAD[i];
      var e = Math.max(0, Math.min(1, (prog - p.delay * 0.6) / 0.55));
      e = 1 - Math.pow(1 - e, 3);
      var py = p.y, px = p.x;
      if (p.mouth && this.smile) { py += 0.03 * this.smile * (Math.abs(px) / 0.2); }
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
      var band = Math.abs(y - scanY) < 0.05 && e > 0.95;
      if (band) { a = Math.min(1, a + 0.6); size *= 1.7; ctx.fillStyle = 'rgba(225,248,255,' + a.toFixed(3) + ')'; }
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
  function fieldFor(id) { for (var i = 0; i < fields.length; i++) if (fields[i].canvas.id === id) return fields[i]; return null; }
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
    if (!body.classList.contains('native') || e.touches.length !== 1 || e.target.closest('.carousel, .pills, .hold')) { tracking = false; return; }
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
