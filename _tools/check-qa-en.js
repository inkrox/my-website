const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const base = 'C:/Users/Administrator/Desktop/coding/my-website/qa/';
let html = fs.readFileSync(base + 'index.html', 'utf8');
const qaJs = fs.readFileSync(base + 'qa.js', 'utf8');
html = html.replace('<script src="qa.js"></script>', '<script>\n' + qaJs + '\n</script>');
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'https://cralk.top/qa/index.html',
  virtualConsole: vc,
  beforeParse(window) { window.localStorage.setItem('bxr_lang', 'en'); }
});
const doc = dom.window.document;
setTimeout(() => {
  console.log('title:', doc.title);
  console.log('h1:', doc.getElementById('qaTitle').textContent);
  console.log('scoreLabel:', doc.getElementById('scoreLabel').textContent);
  console.log('total:', doc.getElementById('total').textContent);
  console.log('question:', doc.getElementById('question-text').textContent);
  console.log('progress:', doc.getElementById('progress').textContent);
  console.log('restart:', doc.getElementById('restart').textContent);
  const opts = doc.querySelectorAll('.option-btn');
  console.log('options:', Array.from(opts).slice(0, 4).map(b => b.textContent).join(' | '));
  dom.window.close();
  process.exit(0);
}, 300);
