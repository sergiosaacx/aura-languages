/* ── Mobile swipe gesture for flashcard deck ── */
(function(){
  if(window.innerWidth>768) return;
  var dk=document.getElementById('deck');
  if(!dk) return;
  var sx=0,sy=0;
  dk.addEventListener('touchstart',function(e){
    sx=e.touches[0].clientX;
    sy=e.touches[0].clientY;
  },{passive:true});
  dk.addEventListener('touchend',function(e){
    var dx=e.changedTouches[0].clientX-sx;
    var dy=e.changedTouches[0].clientY-sy;
    if(Math.abs(dx)<Math.abs(dy)||Math.abs(dx)<40) return;
    e.preventDefault();
    document.getElementById(dx<0?'btnNo':'btnYes').click();
  },{passive:false});
})();
