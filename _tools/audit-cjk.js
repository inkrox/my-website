const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/Desktop/coding/my-website/index.html', 'utf8');
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://cralk.top/', virtualConsole: vc });
const doc = dom.window.document;

// 切到英文
const btn = doc.getElementById('langBtn');
if (btn) { btn.click(); }

const CJK = /[\u4e00-\u9fff]/;
const hits = [];
const walker = doc.createTreeWalker(doc.body, dom.window.NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  const t = node.textContent;
  if (!t || !CJK.test(t)) { continue; }
  let el = node.parentElement;
  if (!el) { continue; }
  /* 白名单：脚本/样式内容、UPDATES 历史记录面板（刻意保留中文原文） */
  if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') { continue; }
  if (el.closest('#updatesPanel')) { continue; }
  const path = [];
  let cur = el;
  while (cur && cur !== doc.body) {
    let id = cur.id ? '#' + cur.id : cur.tagName.toLowerCase();
    if (cur.className && typeof cur.className === 'string') {
      id += '.' + cur.className.trim().split(/\s+/).slice(0, 3).join('.');
    }
    path.unshift(id);
    cur = cur.parentElement;
  }
  hits.push(path.join(' > ') + ' :: ' + JSON.stringify(t.trim().slice(0, 80)));
}
console.log('=== 英文模式下含中文的文本节点（' + hits.length + ' 处）===');
hits.forEach(h => console.log(h));
dom.window.close();
process.exit(0);
