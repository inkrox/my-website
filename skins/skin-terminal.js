(function () {
'use strict';
  /* 终端皮肤：分区加载 —— 每个块区“看到时”加载，滚过即收起 */

  /* ============ 敲字工具（命令敲完 → 输出浮现） ============ */
  function typeCmd(el, speed, onDone) {
    if (el.getAttribute('data-done') === '1' || el.__typing) { return; }
    el.__typing = true;
    var full = el.getAttribute('data-full');
    if (full === null) { full = el.textContent; el.setAttribute('data-full', full); }
    el.textContent = '';
    var k = 0;
    (function t() {
      if (k <= full.length) {
        el.textContent = full.slice(0, k);
        k++;
        setTimeout(t, speed);
      } else {
        el.__typing = false;
        el.setAttribute('data-done', '1');
        var blk = el.closest ? el.closest('.tblk') : null;
        var outs = blk ? blk.querySelectorAll('.cmd-out') : null;
        if (!outs || !outs.length) {
          var nxt = el.nextElementSibling;
          outs = (nxt && nxt.classList && nxt.classList.contains('cmd-out')) ? [nxt] : [];
        }
        for (var o = 0; o < outs.length; o++) { outs[o].classList.add('show'); }
       
        if (onDone) { onDone(); }
      }
    })();
  }

  /* ============ 顶部导航打字 ============ */
  var navCmd = document.getElementById('navCmd');
  var navLinks = document.getElementById('navLinks');
  function bxrNav() {
    if (!navCmd) { return; }
    var navText = '$ ls /nav:';
    navCmd.textContent = '';
    if (navLinks) { navLinks.classList.remove('show'); }
    var ni = 0;
    (function tn() {
      if (ni <= navText.length) {
        navCmd.textContent = navText.slice(0, ni);
        ni++;
        setTimeout(tn, 24);
      } else if (navLinks) {
        navLinks.classList.add('show');
      }
    })();
  }

  /* ============ 开机打字 ============ */
  var bootEl = document.getElementById('boot');
  var asciiEl = document.getElementById('asciiArt');
  var bootLines = [
    '> BXR-OS v2.2.4 BOOTING ...',
    '> CPU: BRAIN(14y) 4 CORES ... OK',
    '> MEM: DREAMS 100% ... OK',
    '> LOADING PROFILE: BXR ... DONE',
    '> WELCOME, BXR! TYPE "help" IF LOST. (^_^)'
  ];
  function bxrBoot() {
    if (!bootEl) { return; }
    if (asciiEl) { asciiEl.style.display = 'none'; }
    bootEl.textContent = '';
    var li = 0, ci = 0;
    (function typeLine() {
      if (li >= bootLines.length) {
        if (asciiEl) { asciiEl.style.display = 'block'; }
        return;
      }
      var line = bootLines[li];
      bootEl.textContent += line[ci] || '';
      ci++;
      if (ci >= line.length) { bootEl.textContent += '\n'; li++; ci = 0; }
      setTimeout(typeLine, 16);
    })();
  }

  /* ============ 块区加载动作（每个块区首次看到时执行一次） ============ */
  function loadBlock(b) {
    if (b.getAttribute('data-loaded') === '1') { return; }
    b.setAttribute('data-loaded', '1');
    if (b.classList.contains('nav-blk')) {
      bxrNav();
    } else if (b.classList.contains('boot-blk')) {
      bxrBoot();
    } else {
      var cmd = b.querySelector('.cmd');
      if (cmd) { typeCmd(cmd, 10); }
    }
  }

  /* ============ 分区观察器：进入视口 → 显现并加载；离开 → 收起 ============ */
  var tblks = document.querySelectorAll('.term-body .tblk');
  var io = null;
  if (tblks.length && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          loadBlock(e.target);
        } else {
          e.target.classList.remove('in');
        }
      });
    }, { threshold: 0 });
    tblks.forEach(function (b) { io.observe(b); });
  } else {
    /* 无 IO 兜底：全部直接显现并加载 */
    tblks.forEach(function (b) {
      b.classList.add('in');
      loadBlock(b);
    });
  }

  /* ============ 切换进终端：清掉加载标记，视口内的块区重播 ============ */
  var termBody = document.getElementById('termBody');
  var termInput = document.getElementById('termCmd');
  window.bxrTerminalReplay = function () {
    tblks.forEach(function (b) {
      b.removeAttribute('data-loaded');
      var cmd = b.querySelector('.cmd');
      if (cmd) { cmd.removeAttribute('data-done'); cmd.__typing = false; }
      var outs = b.querySelectorAll('.cmd-out');
      for (var o = 0; o < outs.length; o++) { outs[o].classList.remove('show'); }
      /* 先收起，等观察器重新评估（容器显示后会自动回调） */
      b.classList.remove('in');
    });
    /* 清掉用户交互输出 */
    var tos = termBody.querySelectorAll('.term-out');
    for (var o2 = 0; o2 < tos.length; o2++) { tos[o2].remove(); }
  };

  /* ============ 交互命令行（输入 help 查看命令） ============ */
  var TERM_WORKS = [
    { k: 'shoot', n: 'shoot.cralk.top', h: 'templates/loader-terminal.html?to=https://shoot.cralk.top/', d: '射击游戏 [NEW]' },
    { k: 'code-rain', n: 'code-rain/', h: 'templates/loader-terminal.html?to=../code-rain/index.html', d: '代码雨' },
    { k: 'compass-clock', n: 'compass-clock/', h: 'templates/loader-terminal.html?to=../compass-clock/index.html', d: '罗盘时钟' },
    { k: 'aperture', n: 'aperture/', h: 'templates/loader-terminal.html?to=../aperture/index.html', d: '光圈' },
    { k: 'meteor-shower', n: 'meteor-shower/', h: 'templates/loader-terminal.html?to=../meteor-shower/index.html', d: '流星雨' },
    { k: 'firework', n: 'firework/', h: 'templates/loader-terminal.html?to=../firework/index.html', d: '烟花' },
    { k: '3d-firework', n: '3d-firework/', h: 'templates/loader-terminal.html?to=../3d-firework/index.html', d: '3D 烟花' },
    { k: 'click-firework', n: 'click-firework/', h: 'templates/loader-terminal.html?to=../click-firework/index.html', d: '可点击烟花' },
    { k: 'canvas-pixel-clock', n: 'canvas-pixel-clock/', h: 'templates/loader-terminal.html?to=../canvas-pixel-clock/index.html', d: '粒子时钟' },
    { k: 'circle-clock', n: 'circle-clock/', h: 'templates/loader-terminal.html?to=../circle-clock/index.html', d: '科技圆表' },
    { k: 'timer', n: 'timer/', h: 'templates/loader-terminal.html?to=../timer/index.html', d: '计时器' },
    { k: 'space-museum', n: 'space-museum/', h: 'templates/loader-terminal.html?to=../space-museum/index.html', d: '航天馆' },
    { k: 'father-day', n: 'father-day/', h: 'templates/loader-terminal.html?to=../father-day/index.html', d: '父亲节' },
    { k: 'qa', n: 'qa/', h: 'templates/loader-terminal.html?to=../qa/index.html', d: 'QA 问答' },
    { k: 'download', n: 'download.html', h: 'templates/loader-terminal.html?to=../download.html', d: '保密下载' }
  ];
  function escTxt(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function termOut(html) {
    var d = document.createElement('div');
    d.className = 'line term-out';
    d.innerHTML = html;
    termBody.insertBefore(d, termInput.closest('.term-input'));
    var bottom = termBody.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: Math.max(0, bottom - window.innerHeight + 90), behavior: 'smooth' });
  }
  function termEcho(cmd) {
    termOut('<span class="prompt"><span class="user">bxr</span>@<span class="user">home</span>:<span class="path">~</span>$</span> <span class="cmd">' + escTxt(cmd) + '</span>');
  }
  function runCmd(raw) {
    raw = raw.trim();
    termEcho(raw);
    if (!raw) { return; }
    var parts = raw.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var arg = parts.slice(1).join(' ');
    if (cmd === 'help') {
      termOut('可用命令：<br>' +
        '&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示本帮助<br>' +
        '&nbsp;&nbsp;ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;列出作品目录<br>' +
        '&nbsp;&nbsp;open &lt;名字&gt;&nbsp;&nbsp;&nbsp;&nbsp;打开作品（如 open firework）<br>' +
        '&nbsp;&nbsp;theme &lt;皮肤&gt;&nbsp;&nbsp;&nbsp;&nbsp;切换皮肤（default / cyberpunk / terminal / classical / starry）<br>' +
        '&nbsp;&nbsp;about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户信息<br>' +
        '&nbsp;&nbsp;links&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;友情链接<br>' +
        '&nbsp;&nbsp;whoami&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我是谁？<br>' +
        '&nbsp;&nbsp;date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前时间<br>' +
        '&nbsp;&nbsp;echo &lt;文字&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回显文字<br>' +
        '&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;清空输出');
    } else if (cmd === 'ls') {
      var h = '<div class="works">';
      for (var i = 0; i < TERM_WORKS.length; i++) {
        var num = (i + 1 < 10 ? '0' : '') + (i + 1);
        h += '<a class="wline" href="' + TERM_WORKS[i].h + '"><span class="idx">' + num + '</span><span class="nm">' + TERM_WORKS[i].n + '</span><span class="ds">' + TERM_WORKS[i].d + '</span></a>';
      }
      termOut(h + '</div>');
    } else if (cmd === 'open') {
      var key = arg.replace(/\/+$/, '').toLowerCase();
      var found = null;
      for (var j = 0; j < TERM_WORKS.length; j++) {
        if (TERM_WORKS[j].k === key || TERM_WORKS[j].n.replace(/\/+$/, '').toLowerCase() === key) { found = TERM_WORKS[j]; break; }
      }
      if (found) {
        termOut('launching ' + found.n + ' ...');
        setTimeout(function () { location.href = found.h; }, 450);
      } else {
        termOut('<span style="color:var(--red)">open: ' + escTxt(arg) + ': no such entry</span>');
      }
    } else if (cmd === 'theme') {
      var sk = arg.toLowerCase();
      if (['default', 'cyberpunk', 'terminal', 'classical', 'starry'].indexOf(sk) !== -1) {
        termOut('switching theme to <b>' + sk + '</b> ...');
        setTimeout(function () { if (window.bxrSwitchSkin) { window.bxrSwitchSkin(sk); } }, 400);
      } else {
        termOut('<span style="color:var(--red)">theme: unknown skin "' + escTxt(arg) + '"</span>');
      }
    } else if (cmd === 'about') {
      termOut('大家好，我是 BXR，一个 14 岁的阳光少年，生活在美丽的冰城哈尔滨，<br>就读于哈尔滨市第四十九中学校九年级（初四），九班，学号 01。<br>擅长 Python、C++，OIer，小提琴十级选手 🎻');
    } else if (cmd === 'links') {
      termOut('<div class="line">🐙 GitHub — <a href="https://github.com/inkrox" target="_blank" rel="noopener">https://github.com/inkrox</a></div>' +
        '<div class="line">📦 本站源码 — <a href="https://github.com/inkrox/my-website/" target="_blank" rel="noopener">https://github.com/inkrox/my-website/</a></div>' +
        '<div class="line">📮 邮箱 — <a href="mailto:inkrox@outlook.com">inkrox@outlook.com</a> · <a href="mailto:root@cralk.top">root@cralk.top</a></div>' +
        '<div class="line">💬 知乎 — <a href="https://www.zhihu.com/people/9wbhos" target="_blank" rel="noopener">https://www.zhihu.com/people/9wbhos</a></div>' +
        '<div class="line">🚩 洛谷 — <a href="https://www.luogu.com.cn/user/1766805" target="_blank" rel="noopener">https://www.luogu.com.cn/user/1766805</a></div>');
    } else if (cmd === 'whoami') {
      termOut('bxr — 14 岁 · 哈尔滨 · 九年级（初四）· OIer · 代码改变世界 💪✨🌈');
    } else if (cmd === 'date') {
      termOut(new Date().toLocaleString('zh-CN'));
    } else if (cmd === 'echo') {
      termOut(escTxt(arg));
    } else if (cmd === 'clear') {
      var outs = termBody.querySelectorAll('.term-out');
      for (var c = 0; c < outs.length; c++) { outs[c].remove(); }
    } else {
      termOut('<span style="color:var(--red)">bash: ' + escTxt(cmd) + ': command not found</span>（输入 help 查看可用命令）');
    }
  }
  var cmdHist = [];
  var histIdx = -1;
  if (termInput) {
    termInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = termInput.value;
        if (v.trim()) { cmdHist.push(v); }
        histIdx = cmdHist.length;
        runCmd(v);
        termInput.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHist.length) {
          histIdx = Math.max(0, histIdx - 1);
          termInput.value = cmdHist[histIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        histIdx = Math.min(cmdHist.length, histIdx + 1);
        termInput.value = histIdx < cmdHist.length ? cmdHist[histIdx] : '';
      }
    });
  }
})();
