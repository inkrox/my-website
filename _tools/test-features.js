/* 新功能回归：2048/贪吃蛇卡片 + 最高分标签 + 搜索框 + 快捷键挂载 */
const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/Desktop/coding/my-website/index.html', 'utf8');
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => { /* ignore media/canvas errors */ });
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://cralk.top/', virtualConsole: vc });
const doc = dom.window.document;
const out = [];

function check(sel, label) {
  const els = doc.querySelectorAll(sel);
  const texts = Array.from(els).map(e => (e.textContent || '').trim().slice(0, 60));
  return `${label} [${sel}] -> ${els.length} match(es): ${JSON.stringify(texts)}`;
}

out.push('--- 作品卡片数量（应为 17） ---');
out.push(check('#works-default .grid .card', 'default-cards'));
out.push(check('#works-cyberpunk .grid .card', 'cyber-cards'));
out.push(check('#works-classical .grid .card', 'classical-cards'));
out.push(check('#works-starry .grid .card', 'starry-cards'));
out.push(check('.term-body .works .wline', 'term-wlines'));

out.push('--- data-best 标记 ---');
out.push(check('[data-best="2048"]', 'data-best-2048'));
out.push(check('[data-best="snake"]', 'data-best-snake'));

out.push('--- 语录应已移除 ---');
out.push(check('.heroQuote', 'heroQuote'));

out.push('--- 搜索框 ---');
out.push('searchModal: ' + !!doc.getElementById('searchModal'));
out.push('searchInput placeholder: ' + doc.getElementById('searchInput').getAttribute('placeholder'));
out.push('searchHint: ' + doc.getElementById('searchHint').textContent);

out.push('--- 新功能挂载 ---');
out.push('bxrRefresh: ' + typeof doc.defaultView.bxrRefresh);

out.push('--- 切英文验证新条目 ---');
doc.getElementById('langBtn').click();
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(15)', 'en-2048'));
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(16)', 'en-snake'));
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(17)', 'en-download'));
out.push('searchInput placeholder EN: ' + doc.getElementById('searchInput').getAttribute('placeholder'));
out.push('classical sec-title: ' + doc.querySelector('#works-classical .sec-title').textContent.trim());

out.push('--- 切回中文恢复 ---');
doc.getElementById('langBtn').click();
out.push(check('.skin-view[data-skin="default"] #works-default .grid .card:nth-of-type(15)', 'zh-2048'));

console.log(out.join('\n'));
dom.window.close();
process.exit(0);
