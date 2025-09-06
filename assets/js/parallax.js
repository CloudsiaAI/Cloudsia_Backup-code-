(function(){
  const root = document.getElementById('parallax');
  if(!root) return;
  let rx=0, ry=0, tx=0, ty=0;
  function onMove(e){
    const {innerWidth:w, innerHeight:h}=window;
    tx=((e.clientX??(e.touches?.[0]?.clientX||0))/w-0.5)*10;
    ty=((e.clientY??(e.touches?.[0]?.clientY||0))/h-0.5)*10;
  }
  window.addEventListener('mousemove',onMove,{passive:true});
  window.addEventListener('touchmove',onMove,{passive:true});
  (function raf(){
    rx+=(tx-rx)*0.06; ry+=(ty-ry)*0.06;
    root.style.transform=`perspective(900px) rotateY(${rx/3}deg) rotateX(${-ry/3}deg)`;
    requestAnimationFrame(raf);
  })();
})();
