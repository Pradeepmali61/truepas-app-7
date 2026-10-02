const fs = require('fs');
const s = fs.readFileSync(__dirname + '/dist/index.html', 'utf8');
const js = s.slice(s.lastIndexOf('<script>') + 8, s.lastIndexOf('</script>'));
try { new Function(js); console.log('js parses ok'); } catch (e) { console.log('JS ERROR', e.message); }
const sections = [...s.matchAll(/<section class="vp" data-id="([^"]+)"/g)].map((m) => m[1]);
const meta = [...js.matchAll(/S\('([a-z0-9-]+)'/g)].map((m) => m[1]);
console.log('sections', sections.length, 'meta', meta.length);
console.log('meta without section', meta.filter((x) => !sections.includes(x)));
console.log('section without meta', sections.filter((x) => !meta.includes(x)));
const hrefs = [...new Set([...s.matchAll(/href="#([a-z0-9-]+)"/g)].map((m) => m[1]))];
console.log('dead links', hrefs.filter((h) => !sections.includes(h)));
const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
console.log('dup ids', ids.filter((x, i) => ids.indexOf(x) !== i));
const need = [...js.matchAll(/\$\('([a-z0-9-]+)'\)/g)].map((m) => m[1]);
console.log('missing ids', [...new Set(need)].filter((x) => !ids.includes(x)));
const imgs = [...s.matchAll(/data-img="([a-z0-9_]+)"/g)].length;
console.log('img refs', imgs, 'size KB', (s.length / 1024).toFixed(0));
const unreached = sections.filter((x) => x !== 'welcome' && !hrefs.includes(x));
console.log('screens no link points to (reachable via list/arrows only)', unreached);
