(function(){
'use strict';

window.I   = function(id){ return document.getElementById(id); };
window.IS  = function(s){ return document.querySelector(s); };
window.ISA = function(s){ return document.querySelectorAll(s); };

window.shuffle = function(a){
  var b=[].concat(a);
  for(var i=b.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=b[i];b[i]=b[j];b[j]=tmp;
  }
  return b;
};

window.IMG = function(p){
  return 'https://image.pollinations.ai/prompt/'+
    encodeURIComponent(p+', minimalist abstract concept art, dark moody cinematic, deep shadows')+
    '?width=1280&height=720&nologo=true&model=flux&seed=42';
};

window.RM={
  Bronce:'#cd7f32',Plata:'#d1d5db',Oro:'#fbbf24',
  Platino:'#5eead4',Diamante:'#60a5fa',Challenger:'#c084fc'
};

window.STATE={view:'list',topic:null,step:0,score:0,lives:5,correct:0,checked:false};

window._gameSeq=[];
window._mcSel=null;
window._mSel=null;
window._mDone=0;
window._efDone={};
window._mcCorrect=0;
window._orderSents=[];
window._fixSents=[];
window._scrWords=[];
window._trItems=[];
window._trSel={};
window._trPage=0;
window._tfSel={};
window._tfStmts=[];
window._TR_PAGE=3;

})();
