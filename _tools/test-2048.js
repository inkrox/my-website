const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
const dom = new JSDOM(fs.readFileSync('C:/Users/Administrator/Desktop/coding/my-website/2048/index.html', 'utf8'), { runScripts: 'dangerously', url: 'https://cralk.top/2048/', virtualConsole: vc });
const d = dom.window.document;
const ev = (k) => d.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: k, bubbles: true }));
console.log('theme initial:', d.body.dataset.theme);
d.querySelector('#themeBar button[data-theme="terminal"]').click();
console.log('theme after click:', d.body.dataset.theme, '| saved:', dom.window.localStorage.getItem('bxr_2048_theme'));
console.log('backBtn href:', d.getElementById('backBtn').getAttribute('href'));
const dirs = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
for (let i = 0; i < 300; i++) { ev(dirs[i % 4]); }
setTimeout(() => {
  const tiles = Array.from(d.querySelectorAll('.tile'));
  const seen = new Set();
  let dup = 0, bad = 0;
  for (const t of tiles) {
    if (t.classList.contains('gone')) { continue; }
    const m = t.style.transform.match(/calc\((\d+) \* \(100% \+ 10px\)\)/g);
    if (!m || m.length < 2) { bad++; continue; }
    const col = parseInt(m[0].match(/\d+/)[0], 10);
    const row = parseInt(m[1].match(/\d+/)[0], 10);
    if (row < 0 || row > 3 || col < 0 || col > 3) { bad++; }
    const key = row + ',' + col;
    if (seen.has(key)) { dup++; }
    seen.add(key);
    const v = parseInt(t.dataset.v, 10);
    if (v < 2 || (v & (v - 1)) !== 0) { bad++; }
  }
  console.log('tiles:', tiles.length, '| duplicate positions:', dup, '| invalid:', bad);
  console.log('score:', d.getElementById('score').textContent, '| best saved:', dom.window.localStorage.getItem('bxr_2048_best'));
  dom.window.close();
  process.exit(0);
}, 400);
