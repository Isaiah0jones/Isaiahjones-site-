
const c = document.getElementById('sparkles');
if (c){
  const ctx = c.getContext('2d');
  let w,h,parts;
  function init(){
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    parts = Array.from({length:160},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,s:Math.random()*0.7+0.2,a:Math.random()*0.6+0.25}));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of parts){
      p.y += p.s; p.x += Math.sin(p.y*0.01)*0.2;
      if(p.y>h){p.y=-10;p.x=Math.random()*w;}
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(200,220,255,${p.a})`; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  addEventListener('resize', init);
  init(); draw();
}
