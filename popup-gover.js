// ── GAME OVER / WIN POPUP — play-movies ─────────────────────────────────────
// Depends on globals: karaoState, errorCount, totalScore, player, isPlaying,
//                     currentVideoId, currentStart, updatePPIcon, loadAndInitKaraoke

// ── GAME OVER / WIN POPUP ────────────────────────────────────────────────────
var _goverActive=false,_P2GCX=110,_P2GCY=108,_P2GR=94,_P2GL=295;
function _p2Dot(t){var a=Math.PI*(1-t);return{x:(_P2GCX+_P2GR*Math.cos(a)).toFixed(2),y:(_P2GCY-_P2GR*Math.sin(a)).toFixed(2)};}
function _p2Up(el,v,s,d){setTimeout(function(){var t0=null;(function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/880,1);el.textContent='+'+Math.round(v*p)+s;if(p<1)requestAnimationFrame(f);})(performance.now());},d);}
function _p2Pct(el,v,c,d){setTimeout(function(){var t0=null;el.style.color=c;(function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/820,1);el.textContent=Math.round(v*p)+'%';if(p<1)requestAnimationFrame(f);})(performance.now());},d);}
function _p2GN(el,v,c,d){setTimeout(function(){var t0=null;el.setAttribute('fill',c);(function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1200,1);el.textContent=Math.round(v*p)+'%';if(p<1)requestAnimationFrame(f);})(performance.now());},d);}
function _p2BV(el,v,d){setTimeout(function(){var t0=null;(function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/820,1);el.textContent=Math.round(v*p);if(p<1)requestAnimationFrame(f);})(performance.now());},d);}
function _p2Bars(bars,bm){for(var i=0;i<3;i++){(function(ix){var bf=document.getElementById('p2bf'+ix),bv=document.getElementById('p2bv'+ix);bf.style.height='0%';void bf.offsetWidth;setTimeout(function(){bf.style.height=(bars[ix]/bm*100).toFixed(1)+'%';},60);_p2BV(bv,bars[ix],540+ix*100);})(i);}}
function _p2Lives(n){
  var box=document.getElementById('p2lives'),le=document.getElementById('p2lerr');
  box.innerHTML='';le.textContent='0';
  for(var i=0;i<15;i++){(function(ix){
    var lost=ix>=(15-n),d=(document.createElement('div')),dl=(0.4+ix*0.048).toFixed(3),pd=(0.4+ix*0.048+0.24).toFixed(3);
    d.style.cssText='width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;'+(lost?'background:rgba(248,113,113,.12);border:1.5px solid #f87171;animation:p2LiIn .22s ease '+dl+'s both,p2LiPop .3s ease '+pd+'s;':'background:rgba(52,211,153,.08);border:1.5px solid rgba(52,211,153,.4);animation:p2LiIn .22s ease '+dl+'s both;');
    d.innerHTML=lost?'<svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="2" x2="7" y2="7"/><line x1="7" y1="2" x2="2" y2="7"/></svg>':'<svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="#34d399" stroke-width="1.8" stroke-linecap="round"><polyline points="1.5,4.5 3.5,7 7.5,2"/></svg>';
    box.appendChild(d);
    if(lost)setTimeout(function(nn){return function(){le.textContent=nn;};}(ix-(15-n)+1),(0.4+ix*0.048)*1000+120);
  })(i);}
}
function _p2Parts(){
  var box=document.getElementById('p2pb');box.innerHTML='';
  var cols=['#c4ff3d','#fff','#38bdf8','#fbbf24','#34d399'];
  for(var i=0;i<28;i++){var el=document.createElement('div');el.className='p2prt';var a=Math.random()*360,dist=80+Math.random()*220;el.style.cssText='left:'+(80+Math.random()*200)+'px;top:'+(60+Math.random()*110)+'px;background:'+cols[~~(Math.random()*cols.length)]+';--fx:'+Math.cos(a*Math.PI/180)*dist+'px;--fy:'+(Math.random()*-280-20)+'px;--fr:'+(Math.random()*720-360)+'deg;--fd:'+(0.6+Math.random()*.8)+'s;animation-delay:'+(Math.random()*.35)+'s;';box.appendChild(el);}
}
function _p2Open(mode){
  var corr=karaoState.blanksFilled||0,errs=errorCount||0,tot=corr+errs||1;
  var prec=Math.round(corr/tot*100),xpG=Math.floor(totalScore/10),apG=Math.floor(totalScore/50),pmG=Math.floor(totalScore/20);
  var isLoss=mode==='loss',ac=isLoss?'#f87171':'#c4ff3d';
  var ov=document.getElementById('p2ov');if(!ov)return;
  ov.classList.add('p2on');
  var card=document.getElementById('p2card');
  card.style.borderColor=isLoss?'rgba(248,113,113,.18)':'rgba(255,255,255,.09)';
  card.style.animation='none';void card.offsetWidth;card.style.animation='p2In .38s cubic-bezier(.34,1.56,.64,1) both';
  if(isLoss)setTimeout(function(){card.style.animation='p2Shk .45s ease';},440);
  document.getElementById('p2tl').style.background='linear-gradient(90deg,transparent,'+ac+',transparent)';
  document.getElementById('p2glo').style.background='radial-gradient(circle,'+(isLoss?'rgba(248,113,113,.06)':'rgba(196,255,61,.07)')+' 0%,transparent 70%)';
  var ring=document.getElementById('p2ring');
  ring.style.transition='none';ring.style.strokeDashoffset='201';ring.style.stroke=ac;void ring.offsetWidth;
  ring.style.transition='stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1) .3s,stroke .35s';
  setTimeout(function(){ring.style.strokeDashoffset=String((201*(1-prec/100)).toFixed(2));},60);
  _p2Pct(document.getElementById('p2sc'),prec,ac,320);
  document.getElementById('p2em').textContent=isLoss?'💀':'🏆';
  var tt=document.getElementById('p2tt');tt.textContent=isLoss?'¡Juego terminado!':'¡Escena completada!';tt.style.color=isLoss?'#f87171':'#f0efed';
  var st=document.getElementById('p2st');st.textContent=isLoss?'Alcanzaste el límite de 15 errores':'Sigue así, vas perfecto';st.style.color=isLoss?'rgba(248,113,113,.42)':'#444';
  var xpv=document.getElementById('p2xpv');xpv.style.color=ac;xpv.textContent='+0 XP';
  document.getElementById('p2apv').textContent='+0 AP';document.getElementById('p2pmv').textContent='+0 PM';
  document.getElementById('p2lvv').textContent='Lv '+((window.AuraXP&&AuraXP.getLevel)?AuraXP.getLevel():1);
  _p2Up(xpv,xpG,' XP',420);_p2Up(document.getElementById('p2apv'),apG,' AP',520);_p2Up(document.getElementById('p2pmv'),pmG,' PM',620);
  var garc=document.getElementById('p2garc'),gnum=document.getElementById('p2gnum'),gdot=document.getElementById('p2gdot');
  garc.style.transition='none';garc.style.strokeDashoffset=String(_P2GL);garc.style.stroke=ac;gdot.setAttribute('fill',ac);void garc.offsetWidth;
  garc.style.transition='stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1) .5s,stroke .4s';
  setTimeout(function(){
    garc.style.strokeDashoffset=(_P2GL*(1-prec/100)).toFixed(2);
    var t0=performance.now();
    (function aD(ts){var p=Math.min((ts-t0)/1300,1),e=1-Math.pow(1-p,3),pos=_p2Dot(prec/100*e);gdot.setAttribute('cx',pos.x);gdot.setAttribute('cy',pos.y);if(p<1)requestAnimationFrame(aD);})(performance.now());
  },560);
  _p2GN(gnum,prec,ac,580);
  var bm=Math.max(corr,errs,Math.floor(totalScore/10),1);
  _p2Bars([corr,errs,Math.floor(totalScore/10)],bm);
  _p2Lives(errs);
  var xpb=document.getElementById('p2xpb');
  xpb.style.transition='none';xpb.style.width='0%';xpb.style.background=ac;void xpb.offsetWidth;
  xpb.style.transition='width 1.2s cubic-bezier(.4,0,.2,1) .9s';
  setTimeout(function(){xpb.style.width=Math.min(100,Math.floor((xpG%1000)/10))+'%';},60);
  document.getElementById('p2xpl').style.color=ac;document.getElementById('p2xpl').textContent=xpG+' / 1000 XP';
  document.getElementById('p2sw').style.display=isLoss?'none':'block';
  var rb=document.getElementById('p2rb');rb.style.background=ac;rb.style.color=isLoss?'#fff':'#0a1200';
  if(!isLoss)setTimeout(_p2Parts,200);else document.getElementById('p2pb').innerHTML='';
}
function _triggerGameOver(){
  if(_goverActive)return;_goverActive=true;
  if(player&&player.pauseVideo)player.pauseVideo();
  isPlaying=false;if(typeof updatePPIcon==='function')updatePPIcon();
  document.querySelectorAll('.blank-bubble,.kara-opt-btn').forEach(function(e){e.disabled=true;});
  _p2Open('loss');
}
function _triggerWin(){
  if(_goverActive)return;_goverActive=true;
  if(player&&player.pauseVideo)player.pauseVideo();
  isPlaying=false;if(typeof updatePPIcon==='function')updatePPIcon();
  _p2Open('win');
}
function _p2Retry(){
  _goverActive=false;
  document.getElementById('p2ov').classList.remove('p2on');
  errorCount=0;var se=document.getElementById('statErrors');if(se)se.textContent='0';
  if(typeof loadAndInitKaraoke==='function')loadAndInitKaraoke(currentVideoId);
  if(player){player.seekTo(currentStart,true);player.playVideo();isPlaying=true;if(typeof updatePPIcon==='function')updatePPIcon();}
}
function closeGover(){
  _goverActive=false;
  var ov=document.getElementById('p2ov');if(ov)ov.classList.remove('p2on');
}
