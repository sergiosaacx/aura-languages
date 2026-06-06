(function(){
'use strict';

function boot(){
  renderList();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

window.addEventListener('aura:session', function(){
  if(STATE.view==='list') renderList();
}, {once:true});

try{
  if(window._aura&&window._aura.sb){
    window._aura.sb.auth.getSession().then(function(res){
      var session=res&&res.data&&res.data.session;
      if(session&&window._aura.loadProfile){
        window._aura.loadProfile(session.user.id);
      }
    });
  }
}catch(e){}

})();
