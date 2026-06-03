/* admin-tab-speak.js -- datos del Hero Card de Speaking en el editor admin
   Para cambiar la tarjeta de Speaking: solo edita este archivo.
   Tocar este archivo NO afecta ninguna otra pestana. */

window.skillData = window.skillData || {};
window.skillData.speak = {
    word:'Frictionless',
    typo:'Speaking',
    ipa:'/ˈfrɪkʃ.ən.ləs ˈlɪv.ɪŋ/',
    pos:'lectura + libre · 90s',
    chip:'≡ 2 partes',
    rating:'C1',
    color:'#FF9A6C',
    qLabel:'lee y luego responde libre',
    opts:[
      {l:'A',t:'Parte A — lectura en voz alta.'},
      {l:'B',t:'Parte B — respuesta libre 90s.',sel:true},
      {l:'C',t:'Pronunciación + ritmo + fluidez.'},
      {l:'D',t:'Acento opcional.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(255,154,108,.22),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(255,115,201,.10),transparent 55%)'
  };
