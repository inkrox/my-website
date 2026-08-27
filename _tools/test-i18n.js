const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/Desktop/coding/my-website/index.html', 'utf8');
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => { /* ignore missing media/canvas errors */ });
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://cralk.top/', virtualConsole: vc });
const doc = dom.window.document;

function check(sel, label) {
  const els = doc.querySelectorAll(sel);
  const texts = Array.from(els).map(e => (e.innerHTML || '').slice(0, 70).replace(/\s+/g, ' '));
  return `${label} [${sel}] -> ${els.length} match(es): ${JSON.stringify(texts)}`;
}

const out = [];
// 切到英文
const btn = doc.getElementById('langBtn');
out.push('langBtn found: ' + !!btn + ', text=' + (btn ? btn.textContent : '-'));
if (btn) { btn.click(); }
out.push('after click langBtn text=' + (btn ? btn.textContent : '-'));

// 终端皮肤
out.push(check('#term-about', 'divider-about'));
out.push(check('#term-about ~ .cmd-out .line:nth-of-type(1)', 'about-line-1'));
out.push(check('#term-about ~ .cmd-out .line:nth-of-type(2)', 'about-line-2'));
out.push(check('#term-about ~ .cmd-out .line:nth-of-type(3)', 'about-line-3'));
out.push(check('.skin-view[data-skin="terminal"] table.info tr:nth-of-type(3) td:nth-of-type(2)', 'table-city'));
out.push(check('.skin-view[data-skin="terminal"] #term-works ~ .cmd-out .wline:nth-of-type(1) .ds', 'wline-1'));
out.push(check('.skin-view[data-skin="terminal"] #term-works ~ .cmd-out .wline:nth-of-type(15) .ds', 'wline-15'));
out.push(check('.skin-view[data-skin="terminal"] #term-works ~ .cmd-out .wline:nth-of-type(16) .ds', 'wline-16'));
out.push(check('.skin-view[data-skin="terminal"] #term-works ~ .cmd-out .wline:nth-of-type(17) .ds', 'wline-17'));
out.push(check('#term-links ~ .cmd-out .line:nth-of-type(3)', 'links-3'));
out.push(check('#term-links ~ .cmd-out .line:nth-of-type(4)', 'links-4'));
out.push(check('#term-links ~ .cmd-out .line:nth-of-type(5)', 'links-5'));
out.push(check('#termVisitors', 'visitors'));
out.push(check('.skin-view[data-skin="terminal"] footer', 'term-footer'));
out.push('termCmd placeholder=' + doc.getElementById('termCmd').getAttribute('placeholder'));
// 其他皮肤抽查
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(15)', 'default-card-15'));
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(16)', 'default-card-16'));
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(17)', 'default-card-17'));
out.push(check('.skin-view[data-skin="cyberpunk"] #works-cyberpunk .grid .card:nth-of-type(15)', 'cyber-card-15'));
out.push(check('.skin-view[data-skin="cyberpunk"] #works-cyberpunk .grid .card:nth-of-type(16)', 'cyber-card-16'));
out.push(check('.skin-view[data-skin="classical"] #works-classical .grid .card:nth-of-type(17)', 'classical-card-17'));
out.push(check('.skin-view[data-skin="starry"] #works-starry .grid .card:nth-of-type(16)', 'starry-card-16'));
out.push(check('.skin-view[data-skin="default"] header nav a[href="#about-default"]', 'nav-default'));
out.push(check('.skin-view[data-skin="default"] #links-default .card:nth-of-type(2) .name', 'default-links-name2'));
out.push(check('.skin-view[data-skin="default"] #links-default .card:nth-of-type(3) .name', 'default-links-name3'));
out.push(check('.skin-view[data-skin="default"] #links-default .card:nth-of-type(4) .name', 'default-links-name4'));
out.push(check('.skin-view[data-skin="default"] #links-default .card:nth-of-type(5) .name', 'default-links-name5'));
out.push(check('.skin-view[data-skin="starry"] #links-starry .card:nth-of-type(2) .name', 'starry-links-name2'));
out.push(check('.skin-view[data-skin="classical"] #links-classical .card:nth-of-type(3) .name', 'classical-links-name3'));
out.push(check('.skin-view[data-skin="classical"] .hero .cta-row .cta.ghost', 'classical-ghost'));
out.push(check('.skin-view[data-skin="default"] footer', 'default-footer'));
// 切回中文，验证恢复
if (btn) { btn.click(); }
out.push('=== back to zh ===');
out.push(check('#term-about ~ .cmd-out .line:nth-of-type(1)', 'zh-about-line-1'));
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(2)', 'zh-card-2'));
out.push(check('.skin-view[data-skin="terminal"] #termVisitors', 'zh-visitors'));
console.log(out.join('\n'));
dom.window.close();
process.exit(0);
