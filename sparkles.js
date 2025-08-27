
const c = document.getElementById('sparkles');
if (c) {
  const ctx = c.getContext('2d');
  let w, h, particles;
  function init() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    particles = Array.from({length: 100}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.5+0.5,
      s: Math.random()*0.5+0.2,
      a: Math.random()*0.6+0.3
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y += p.s;
      if (p.y > h) p.y = -10, p.x = Math.random()*w;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(150,200,255,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', init);
  init(); draw();
}
