  /* 古风皮肤：樱花飘落 */
  (function () {
    var canvas = document.getElementById('sakura');
    if (!canvas) { return; }
    var ctx = canvas.getContext('2d');
    var W, H, petals = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    function newPetal(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : -20,
        r: Math.random() * 7 + 5,
        vy: Math.random() * 1.1 + 0.5,
        vx: Math.random() * 0.6 - 0.3,
        sway: Math.random() * Math.PI * 2,
        swaySp: Math.random() * 0.03 + 0.015,
        rot: Math.random() * Math.PI * 2,
        rotSp: (Math.random() - 0.5) * 0.06,
        a: Math.random() * 0.4 + 0.45
      };
    }
    for (var i = 0; i < 26; i++) { petals.push(newPetal(true)); }
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.y += p.vy; p.sway += p.swaySp; p.rot += p.rotSp;
        p.x += p.vx + Math.sin(p.sway) * 0.7;
        if (p.y > H + 20) { petals[i] = newPetal(false); continue; }
        if (p.x < -20) { p.x = W + 20; } if (p.x > W + 20) { p.x = -20; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.a;
        var g = ctx.createLinearGradient(0, -p.r, 0, p.r);
        g.addColorStop(0, '#ffd9e3');
        g.addColorStop(1, '#ff9eb8');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(-p.r * 0.5, 0, p.r * 0.55, p.r * 0.9, 0, 0, Math.PI * 2);
        ctx.ellipse(p.r * 0.5, 0, p.r * 0.55, p.r * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    })();
  })();