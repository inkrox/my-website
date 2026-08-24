(function () {
'use strict';
  /* ============ 背景星空粒子（极光 #bgCanvas；星空皮肤用 #sky 原版繁星脚本） ============ */
  function initStars(id, color, count, twinkle) {
    var canvas = document.getElementById(id);
    if (!canvas) { return; }
    var ctx = canvas.getContext('2d');
    var W, H, dots = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + 0.6,
        vy: -(Math.random() * 0.35 + 0.08),
        vx: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2
      });
    }
    return { ctx: ctx, dots: dots };
  }
  var starA = initStars('bgCanvas', '#9fb4ff', 60, true);
  (function tick() {
    function drawOne(s) {
      if (!s) { return; }
      s.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < s.dots.length; i++) {
        var d = s.dots[i];
        d.x += d.vx; d.y += d.vy; d.tw += 0.03;
        if (d.y < -10) { d.y = window.innerHeight + 10; d.x = Math.random() * window.innerWidth; }
        if (d.x < -10) { d.x = window.innerWidth + 10; } if (d.x > window.innerWidth + 10) { d.x = -10; }
        s.ctx.globalAlpha = d.a * (0.6 + 0.4 * Math.sin(d.tw));
        s.ctx.fillStyle = '#9fb4ff';
        s.ctx.beginPath();
        s.ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        s.ctx.fill();
      }
      s.ctx.globalAlpha = 1;
    }
    drawOne(starA);
    requestAnimationFrame(tick);
  })();
})();
