// Year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});

// Sparkles (dense, white, medium-paced)
(() => {
  const canvas = document.getElementById('sparkles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = 250;
  const particles = Array.from({length:count}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2 + 1,
    a: Math.random()*Math.PI*2,
    s: Math.random()*0.7 + 0.4
  }));

  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.a += 0.003;
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;

      if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;

      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*12);
      g.addColorStop(0,'rgba(255,255,255,1)');
      g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*12,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
})();
