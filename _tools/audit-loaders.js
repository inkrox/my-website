const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const base = 'C:/Users/Administrator/Desktop/coding/my-website/';
const loaders = ['loader.html', 'templates/loader-cyberpunk.html', 'templates/loader-terminal.html', 'templates/loader-classical.html', 'templates/loader-starry.html'];
const CJK = /[\u4e00-\u9fff]/;

loaders.forEach(file => {
  const html = fs.readFileSync(base + file, 'utf8');
  const vc = new VirtualConsole();
  vc.on('jsdomError', () => {});
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'https://cralk.top/' + file,
    virtualConsole: vc,
    beforeParse(window) { window.localStorage.setItem('bxr_lang', 'en'); }
  });
  const doc = dom.window.document;
  const hits = [];
  const walker = doc.createTreeWalker(doc.body, dom.window.NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const t = node.textContent;
    if (!t || !CJK.test(t)) { continue; }
    const p = node.parentElement;
    if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE') { continue; }
    hits.push(p.tagName.toLowerCase() + (p.className ? '.' + String(p.className).trim().split(/\s+/)[0] : '') + ' :: ' + JSON.stringify(t.trim().slice(0, 60)));
  }
  console.log(file + ' => ' + (hits.length ? '中文残留 ' + hits.length + ' 处: ' + hits.join(' | ') : 'OK 无中文残留'));
  console.log('   title: ' + doc.title);
  dom.window.close();
});
process.exit(0);
