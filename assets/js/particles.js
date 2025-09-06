(function(){
  const c=document.getElementById('particles');
  if(!c) return;
  const ctx=c.getContext('2d');
  function size(){
    const d=Math.max(1,window.devicePixelRatio||1);
    c.width=Math.floor(innerWidth*d);
    c.height=Math.floor(innerHeight*d);
    c.style.width=innerWidth+'px';
    c.style.height=innerHeight+'px';
    ctx.setTransform(d,0,0,d,0,0);
  }
  size(); addEventListener('resize',size,{passive:true});
  const COLORS=['#22d3ee','#8b5cf6','#f472b6'];
  const P=[]; const COUNT=70;
  function rnd(a,b){return Math.random()*(b-a)+a;}
  for(let i=0;i<COUNT;i++){
    P.push({x:rnd(0,innerWidth),y:rnd(0,innerHeight),r:rnd(1.0,2.8),
            vx:rnd(-0.25,-0.05),vy:rnd(0.05,0.22),a:rnd(0.25,0.9),
            hue:COLORS[(Math.random()*COLORS.length)|0],
            life:rnd(200,800),age:0});
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const s of P){
      s.x+=s.vx; s.y+=s.vy; s.age++;
      if(s.x<-10) s.x=innerWidth+10;
      if(s.y>innerHeight+10) s.y=-10;
      const fade=0.5+0.5*Math.sin((s.age/s.life)*Math.PI*2);
      const alpha=Math.max(0.12,Math.min(1,s.a*fade));
      ctx.save();
      ctx.globalAlpha=alpha;
      ctx.shadowBlur=12; ctx.shadowColor=s.hue;
      ctx.fillStyle=s.hue;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      ctx.restore();
      if(s.age>s.life){
        s.x=rnd(0,innerWidth); s.y=-10;
        s.vx=rnd(-0.25,-0.05); s.vy=rnd(0.05,0.22);
        s.r=rnd(1.0,2.8); s.a=rnd(0.25,0.9);
        s.hue=COLORS[(Math.random()*COLORS.length)|0];
        s.life=rnd(200,800); s.age=0;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

