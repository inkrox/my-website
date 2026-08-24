  /* ============ 星空皮肤：原版繁星 + 流星（#sky） ============ */
  (function () {
    var canvas = document.getElementById('sky');
    if (!canvas) { return; }
    var ctx = canvas.getContext('2d');
    var W, H, stars = [], meteors = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.06 + 0.02
      });
    }
    function spawnMeteor() {
      meteors.push({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: Math.random() * H * 0.3,
        vx: -(Math.random() * 6 + 5),
        vy: Math.random() * 2.4 + 1.6,
        life: 1
      });
    }
    setInterval(spawnMeteor, 2600);
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.tw += s.sp;
        var a = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (var j = meteors.length - 1; j >= 0; j--) {
        var m = meteors[j];
        m.x += m.vx; m.y += m.vy; m.life -= 0.016;
        if (m.life <= 0) { meteors.splice(j, 1); continue; }
        var tail = 6;
        var grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        grad.addColorStop(0, 'rgba(255,255,255,' + (0.9 * m.life) + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    })();
  })();