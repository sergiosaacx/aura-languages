/* ============================================================
   admin-estadisticas.js
   Panel de Estadísticas — Aura Languages Admin
   Dos vistas: Captación / Estudiantes
   Llamar: initEstadisticas()  cuando se abre el tab
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. CSS INJECTION (scoped to .est-panel)
  ---------------------------------------------------------- */
  var CSS = `
.est-panel *{box-sizing:border-box;}
.est-panel{
  --ep-bg:#0f0f0f;--ep-s1:#1a1a1a;--ep-s2:#222;--ep-s3:#2a2a2a;
  --ep-line:rgba(255,255,255,.07);--ep-line2:rgba(255,255,255,.12);
  --ep-lime:#c4ff3d;--ep-lime-d:rgba(196,255,61,.12);
  --ep-txt:#f3f3ef;--ep-txt2:#a6a6a0;--ep-txt3:#6e6e68;
  --ep-red:#ff5c5c;--ep-red-d:rgba(255,92,92,.13);
  --ep-amb:#ffce4d;--ep-amb-d:rgba(255,206,77,.13);
  --ep-grn:#5fe08a;--ep-grn-d:rgba(95,224,138,.13);
  --ep-font:'Geist','Plus Jakarta Sans',system-ui,sans-serif;
  --ep-mono:'Geist Mono','JetBrains Mono',ui-monospace,monospace;
  --ep-disp:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;
  font-family:var(--ep-font);
  color:var(--ep-txt);
  -webkit-font-smoothing:antialiased;
  letter-spacing:-.006em;
}

/* Controls bar */
.est-controls{
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;
  padding:16px 0 24px;border-bottom:1px solid var(--ep-line);
  margin-bottom:8px;
}
.est-seg{
  display:inline-flex;background:var(--ep-s1);
  border:1px solid var(--ep-line2);border-radius:13px;padding:4px;gap:4px;
}
.est-seg button{
  font-family:var(--ep-font);font-weight:600;font-size:14px;
  color:var(--ep-txt2);background:none;border:none;cursor:pointer;
  padding:9px 20px;border-radius:9px;transition:all .16s ease;white-space:nowrap;
}
.est-seg button:hover{color:var(--ep-txt);}
.est-seg button.on{background:var(--ep-lime);color:#0f0f0f;box-shadow:0 0 18px rgba(196,255,61,.28);}
.est-seg.small button{padding:7px 14px;font-size:12.5px;font-family:var(--ep-mono);font-weight:500;letter-spacing:.02em;}
.est-seg.small button.on.alerta{background:var(--ep-red);color:#180404;box-shadow:0 0 18px rgba(255,92,92,.3);}
.est-seg.small button.on.sano{background:var(--ep-grn);color:#04180c;box-shadow:0 0 18px rgba(95,224,138,.3);}
.est-scn-lbl{font-family:var(--ep-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ep-txt3);}
.est-spacer{flex:1;}

/* Content */
.est-content{padding-bottom:60px;}
.ep-sec{margin-top:46px;}
.ep-sec:first-child{margin-top:8px;}
.ep-sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:18px;}
.ep-tick{width:4px;align-self:stretch;min-height:34px;background:var(--ep-lime);border-radius:3px;box-shadow:0 0 12px rgba(196,255,61,.4);}
.ep-kick{font-family:var(--ep-mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ep-lime);margin-bottom:5px;}
.ep-title{font-family:var(--ep-disp);font-weight:700;font-size:22px;letter-spacing:-.02em;line-height:1.1;}
.ep-sub{font-size:13.5px;color:var(--ep-txt3);margin-top:5px;}

.ep-grid{display:grid;gap:14px;}
.ep-g4{grid-template-columns:repeat(4,1fr);}
.ep-g3{grid-template-columns:repeat(3,1fr);}
.ep-g2{grid-template-columns:repeat(2,1fr);}
@media(max-width:1080px){.ep-g4{grid-template-columns:repeat(2,1fr);}.ep-g3{grid-template-columns:repeat(2,1fr);}}
@media(max-width:680px){.ep-g4,.ep-g3,.ep-g2{grid-template-columns:1fr;}}

.ep-card{background:var(--ep-s1);border:1px solid var(--ep-line);border-radius:18px;padding:20px;position:relative;}
.ep-card.s2{background:var(--ep-s2);}

.ep-m-lbl{font-size:12.5px;color:var(--ep-txt2);font-weight:500;display:flex;align-items:center;gap:7px;min-height:34px;}
.ep-m-val{font-family:var(--ep-disp);font-weight:700;font-size:34px;letter-spacing:-.025em;margin-top:8px;line-height:1;}
.ep-m-val.lime{color:var(--ep-lime);}
.ep-m-sub{font-size:12px;color:var(--ep-txt3);margin-top:7px;font-family:var(--ep-mono);}
.ep-delta{display:inline-flex;align-items:center;gap:4px;font-family:var(--ep-mono);font-weight:600;font-size:12px;padding:3px 8px;border-radius:7px;margin-top:10px;}
.ep-delta.up{color:var(--ep-grn);background:var(--ep-grn-d);}
.ep-delta.down{color:var(--ep-red);background:var(--ep-red-d);}
.ep-delta.flat{color:var(--ep-txt2);background:rgba(255,255,255,.05);}

.ep-sem{display:inline-flex;align-items:center;gap:7px;font-family:var(--ep-mono);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:5px 10px;border-radius:999px;border:1px solid;}
.ep-sem .dot{width:8px;height:8px;border-radius:50%;}
.ep-sem.red{color:var(--ep-red);border-color:rgba(255,92,92,.35);background:var(--ep-red-d);}
.ep-sem.red .dot{background:var(--ep-red);box-shadow:0 0 9px var(--ep-red);}
.ep-sem.amber{color:var(--ep-amb);border-color:rgba(255,206,77,.35);background:var(--ep-amb-d);}
.ep-sem.amber .dot{background:var(--ep-amb);box-shadow:0 0 9px var(--ep-amb);}
.ep-sem.green{color:var(--ep-grn);border-color:rgba(95,224,138,.35);background:var(--ep-grn-d);}
.ep-sem.green .dot{background:var(--ep-grn);box-shadow:0 0 9px var(--ep-grn);}

.ep-alerts{display:flex;flex-direction:column;gap:11px;}
.ep-alert{display:flex;gap:14px;align-items:flex-start;background:var(--ep-s1);border:1px solid var(--ep-line);border-left-width:3px;border-radius:14px;padding:16px 18px;}
.ep-alert.red{border-left-color:var(--ep-red);}
.ep-alert.amber{border-left-color:var(--ep-amb);}
.ep-alert.green{border-left-color:var(--ep-grn);}
.ep-a-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-family:var(--ep-disp);font-weight:800;font-size:18px;margin-top:1px;}
.ep-alert.red .ep-a-ico{background:var(--ep-red-d);color:var(--ep-red);}
.ep-alert.amber .ep-a-ico{background:var(--ep-amb-d);color:var(--ep-amb);}
.ep-alert.green .ep-a-ico{background:var(--ep-grn-d);color:var(--ep-grn);}
.ep-a-body{flex:1;}
.ep-a-txt{font-size:14.5px;line-height:1.5;color:var(--ep-txt);}
.ep-a-rev{font-size:12.5px;color:var(--ep-txt3);margin-top:5px;}
.ep-a-rev b{color:var(--ep-txt2);font-weight:600;}
.ep-a-tag{font-family:var(--ep-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;padding:3px 8px;border-radius:6px;flex:none;margin-top:2px;}
.ep-alert.red .ep-a-tag{background:var(--ep-red-d);color:var(--ep-red);}
.ep-alert.amber .ep-a-tag{background:var(--ep-amb-d);color:var(--ep-amb);}
.ep-alert.green .ep-a-tag{background:var(--ep-grn-d);color:var(--ep-grn);}

.ep-funnel{display:flex;flex-direction:column;gap:10px;}
.ep-fstep{position:relative;background:var(--ep-s2);border:1px solid var(--ep-line);border-radius:12px;overflow:hidden;height:78px;display:flex;align-items:center;}
.ep-ffill{position:absolute;inset:0;background:linear-gradient(90deg,rgba(196,255,61,.22),rgba(196,255,61,.05));border-right:2px solid var(--ep-lime);}
.ep-fcontent{position:relative;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 22px;}
.ep-fname{font-size:14px;color:var(--ep-txt);font-weight:600;}
.ep-fname small{display:block;color:var(--ep-txt3);font-size:12px;font-weight:400;font-family:var(--ep-mono);margin-top:3px;}
.ep-fnum{text-align:right;}
.ep-fnum b{font-family:var(--ep-disp);font-weight:700;font-size:26px;letter-spacing:-.02em;}
.ep-fnum span{display:block;font-family:var(--ep-mono);font-size:12px;color:var(--ep-lime);margin-top:2px;}
.ep-farrow{text-align:center;color:var(--ep-txt3);font-size:13px;font-family:var(--ep-mono);}

.ep-bars{display:flex;flex-direction:column;gap:14px;}
.ep-brow{display:grid;grid-template-columns:150px 1fr auto;align-items:center;gap:14px;}
@media(max-width:560px){.ep-brow{grid-template-columns:120px 1fr;}.ep-brow .ep-bval{grid-column:2;text-align:left;}}
.ep-bsrc{display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:500;}
.ep-bico{width:28px;height:28px;border-radius:8px;flex:none;display:grid;place-items:center;font-family:var(--ep-disp);font-weight:700;font-size:13px;color:#0f0f0f;}
.ep-btrack{height:14px;background:var(--ep-s2);border-radius:999px;overflow:hidden;border:1px solid var(--ep-line);}
.ep-bfill{height:100%;border-radius:999px;background:linear-gradient(90deg,#9bd62a,var(--ep-lime));box-shadow:0 0 10px rgba(196,255,61,.3);}
.ep-bfill.danger{background:linear-gradient(90deg,#c23a3a,var(--ep-red));box-shadow:0 0 10px rgba(255,92,92,.3);}
.ep-bval{font-family:var(--ep-mono);font-size:13px;white-space:nowrap;text-align:right;}
.ep-bval b{color:var(--ep-txt);font-weight:600;}
.ep-bval span{color:var(--ep-txt3);margin-left:6px;}

.ep-cmp{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:680px){.ep-cmp{grid-template-columns:1fr;}}
.ep-cmp-head{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
.ep-cmp-dot{width:11px;height:11px;border-radius:50%;}
.ep-cmp-head b{font-family:var(--ep-disp);font-size:17px;font-weight:700;}
.ep-cmp-row{display:flex;justify-content:space-between;align-items:baseline;padding:13px 0;border-top:1px solid var(--ep-line);}
.ep-cmp-row .k{font-size:13px;color:var(--ep-txt2);}
.ep-cmp-row .v{font-family:var(--ep-disp);font-weight:700;font-size:20px;}

.ep-heat{overflow-x:auto;}
.ep-heat-grid{display:grid;grid-template-columns:40px repeat(7,1fr);gap:3px;min-width:520px;}
.ep-heat-cell{height:17px;border-radius:4px;}
.ep-heat-day{font-family:var(--ep-mono);font-size:11px;color:var(--ep-txt3);text-align:center;padding-bottom:4px;text-transform:uppercase;letter-spacing:.04em;}
.ep-heat-hr{font-family:var(--ep-mono);font-size:10px;color:var(--ep-txt3);display:flex;align-items:center;height:17px;}
.ep-heat-legend{display:flex;align-items:center;gap:8px;margin-top:16px;font-family:var(--ep-mono);font-size:11px;color:var(--ep-txt3);}
.ep-heat-scale{display:flex;gap:3px;}
.ep-heat-scale i{width:18px;height:11px;border-radius:3px;}

.ep-donut-wrap{display:flex;align-items:center;gap:30px;flex-wrap:wrap;}
.ep-donut-legend{display:flex;flex-direction:column;gap:14px;flex:1;min-width:180px;}
.ep-dl-row{display:flex;align-items:center;gap:12px;}
.ep-dl-dot{width:14px;height:14px;border-radius:4px;flex:none;}
.ep-dl-row b{font-family:var(--ep-disp);font-size:24px;font-weight:700;}
.ep-dl-row small{display:block;color:var(--ep-txt3);font-size:12.5px;font-weight:400;font-family:var(--ep-font);}

.ep-tscale{margin-top:22px;}
.ep-tscale-bar{display:flex;height:46px;border-radius:12px;overflow:hidden;border:1px solid var(--ep-line);position:relative;}
.ep-tseg{flex:1;display:flex;align-items:center;justify-content:center;font-family:var(--ep-mono);font-size:11px;letter-spacing:.03em;color:rgba(0,0,0,.6);font-weight:600;text-align:center;line-height:1.2;padding:0 6px;}
.ep-tneedle{position:absolute;top:-8px;bottom:-8px;width:3px;background:#fff;box-shadow:0 0 0 2px #0f0f0f,0 0 14px rgba(255,255,255,.7);border-radius:3px;}

.ep-tbl-wrap{overflow-x:auto;}
.ep-tbl-wrap table{border-collapse:collapse;width:100%;min-width:640px;}
.ep-tbl-wrap th,.ep-tbl-wrap td{padding:14px 16px;text-align:right;font-family:var(--ep-mono);font-size:13px;}
.ep-tbl-wrap th{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--ep-txt3);font-weight:600;border-bottom:1px solid var(--ep-line2);text-align:right;}
.ep-tbl-wrap td:first-child,.ep-tbl-wrap th:first-child{text-align:left;font-family:var(--ep-font);}
.ep-tbl-wrap tbody tr{border-bottom:1px solid var(--ep-line);}
.ep-tbl-wrap td:first-child{color:var(--ep-txt2);font-size:13px;font-weight:500;}
.ep-col-best{background:var(--ep-lime-d);}
.ep-tbl-wrap th.ep-col-best{color:var(--ep-lime);}
.ep-tbl-wrap td.ep-col-best{color:var(--ep-lime);font-weight:600;}
.ep-best-badge{font-family:var(--ep-mono);font-size:9px;letter-spacing:.08em;background:var(--ep-lime);color:#0f0f0f;padding:2px 6px;border-radius:5px;margin-left:6px;vertical-align:middle;}

.ep-proj{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
@media(max-width:680px){.ep-proj{grid-template-columns:1fr;}}
.ep-pcard{border-radius:14px;padding:20px;border:1px solid;}
.ep-pcard.pes{background:var(--ep-red-d);border-color:rgba(255,92,92,.25);}
.ep-pcard.real{background:var(--ep-amb-d);border-color:rgba(255,206,77,.25);}
.ep-pcard.opt{background:var(--ep-grn-d);border-color:rgba(95,224,138,.25);}
.ep-p-name{font-family:var(--ep-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;}
.ep-pcard.pes .ep-p-name{color:var(--ep-red);}
.ep-pcard.real .ep-p-name{color:var(--ep-amb);}
.ep-pcard.opt .ep-p-name{color:var(--ep-grn);}
.ep-p-val{font-family:var(--ep-disp);font-weight:700;font-size:28px;letter-spacing:-.02em;margin-top:10px;}
.ep-p-cond{font-size:12px;color:var(--ep-txt3);margin-top:6px;}
.ep-formula{margin-top:18px;padding:16px 18px;background:var(--ep-s2);border:1px solid var(--ep-line);border-radius:12px;font-family:var(--ep-mono);font-size:13.5px;color:var(--ep-txt2);line-height:1.6;}
.ep-formula b{color:var(--ep-lime);}
.ep-formula .note{display:block;margin-top:8px;font-size:12px;color:var(--ep-txt3);font-family:var(--ep-font);}

.ep-risk{display:flex;flex-direction:column;gap:1px;border-radius:14px;overflow:hidden;border:1px solid var(--ep-line);}
.ep-rrow{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:16px;padding:14px 18px;background:var(--ep-s1);}
@media(max-width:680px){.ep-rrow{grid-template-columns:auto 1fr auto;}.ep-rrow .ep-rtool{display:none;}}
.ep-ravatar{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-family:var(--ep-disp);font-weight:700;font-size:15px;color:#0f0f0f;}
.ep-rname{font-size:14.5px;font-weight:600;}
.ep-rmeta{font-size:12px;color:var(--ep-txt3);font-family:var(--ep-mono);margin-top:2px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
.ep-rrank{padding:1px 7px;border-radius:5px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;}
.ep-rtool{font-family:var(--ep-mono);font-size:12px;color:var(--ep-txt2);}
.ep-rdays{font-family:var(--ep-mono);font-weight:600;font-size:13px;padding:6px 11px;border-radius:9px;white-space:nowrap;}
.ep-rdays.red{color:var(--ep-red);background:var(--ep-red-d);}
.ep-rdays.amber{color:var(--ep-amb);background:var(--ep-amb-d);}
.ep-btn-ghost{margin-top:14px;font-family:var(--ep-font);font-weight:600;font-size:13.5px;color:var(--ep-txt);background:var(--ep-s2);border:1px solid var(--ep-line2);border-radius:11px;padding:11px 18px;cursor:pointer;transition:all .15s;}
.ep-btn-ghost:hover{border-color:var(--ep-lime);color:var(--ep-lime);}

.ep-dist-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:680px){.ep-dist-grid{grid-template-columns:1fr;}}

.ep-chart svg{width:100%;height:auto;display:block;}
.ep-chart-legend{display:flex;gap:22px;margin-bottom:8px;flex-wrap:wrap;}
.ep-cl-item{display:flex;align-items:center;gap:8px;font-family:var(--ep-mono);font-size:12px;color:var(--ep-txt2);}
.ep-cl-line{width:18px;height:3px;border-radius:2px;}
.ep-card-h{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;}
.ep-card-h b{font-family:var(--ep-disp);font-size:16px;font-weight:700;}
.ep-pill-note{font-family:var(--ep-mono);font-size:11px;color:var(--ep-txt3);}
@keyframes ep-fade{from{transform:translateY(7px);opacity:0;}to{transform:none;opacity:1;}}
.ep-sec{animation:ep-fade .3s ease;}
`;

  function injectCSS() {
    if (document.getElementById('ep-styles')) return;
    var s = document.createElement('style');
    s.id = 'ep-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ----------------------------------------------------------
     2. DATA
  ---------------------------------------------------------- */
  var DATA = {
    sano: {
      captacion: {
        alerts: [
          {sev:'green', txt:'Todo en orden: <b>22 de cada 100</b> visitas terminan registrándose, por encima de tu meta de 15.', rev:'Mantén el texto actual de la landing, está funcionando.', tag:'Bien'},
          {sev:'amber', txt:'El <b>28%</b> empieza a registrarse y no termina. Está dentro de lo normal, pero conviene vigilarlo.', rev:'Revisa el formulario si sube del 35%.', tag:'Vigilar'},
        ],
        visits:[
          {label:'Visitas hoy', val:1284, delta:12},
          {label:'Visitas esta semana', val:8640, delta:8},
          {label:'Visitas este mes', val:34210, delta:15},
          {label:'Personas nuevas (nunca habían entrado)', val:27880, delta:9, sub:'81% del total'},
        ],
        funnel:[
          {name:'Entran a la página', num:8640, pct:100},
          {name:'Hacen clic en "Crear cuenta"', num:2640, pct:30.6},
          {name:'Terminan el registro', num:1901, pct:22.0},
        ],
        funnelKpis:[
          {label:'De cada 100 visitas, cuántas se registran', val:'22', unit:'/ 100', sem:'green', semTxt:'Bien'},
          {label:'Empezó el registro pero se fue', val:'28', unit:'%', sem:'green', semTxt:'Bien'},
          {label:'Tiempo en la landing antes de actuar', val:'1m 24s', unit:'', sem:'green', semTxt:'Bien'},
        ],
        sources:[
          {label:'Instagram', val:3460, ico:'IG', c:'#e879b9'},
          {label:'Facebook', val:1730, ico:'FB', c:'#5b8def'},
          {label:'WhatsApp', val:1300, ico:'WA', c:'#5fe08a'},
          {label:'Directo', val:1470, ico:'D', c:'#a6a6a0'},
          {label:'Otros', val:680, ico:'·', c:'#6e6e68'},
        ],
        orgVsPaid:{org:{visits:5180, reg:1290}, paid:{visits:3460, reg:611, cpr:1.8}, threshold:4},
        heatFactor:1.0,
        device:{mobile:54, desktop:46, alert:false},
        dwell:{label:'1m 38s', zone:2},
        sourceTable:{
          cols:['Instagram orgánico','Instagram pauta','Facebook orgánico','Facebook pauta','WhatsApp','Directo'],
          visits:[2100,1360,1040,690,1300,1470],
          reg:[540,300,210,120,330,280],
        },
        weeks:{visits:[6200,6800,7100,7400,7900,8200,8400,8640], reg:[1180,1320,1410,1500,1640,1720,1810,1901]},
      },
      estudiantes: {
        alerts: [
          {sev:'green', txt:'Buen mes: el <b>34%</b> de los estudiantes vuelve al día siguiente de registrarse, por encima de la meta.', rev:'El primer día está bien cuidado, sigue así.', tag:'Bien'},
          {sev:'amber', txt:'<b>3 estudiantes</b> llevan más de 7 días sin entrar. Conviene escribirles pronto.', rev:'Revisa la lista de "en riesgo de irse".', tag:'Vigilar'},
        ],
        activity:[
          {label:'Estudiantes activos hoy', val:842, delta:6},
          {label:'Total registrados', val:14230, delta:null, sub:'desde el inicio'},
          {label:'Vuelven al día siguiente', val:'34', unit:'%', sem:'green', semTxt:'Bien'},
          {label:'Siguen activos a los 7 días', val:'28', unit:'%', sem:'green', semTxt:'Bien'},
          {label:'Siguen activos a los 30 días', val:'19', unit:'%', sub:'sin semáforo definido'},
          {label:'Racha promedio activa', val:'11', unit:'días'},
          {label:'Racha más larga histórica', val:'167', unit:'días'},
        ],
        trial:{
          funnel:[
            {name:'Total en prueba gratuita', num:1180, pct:100},
            {name:'No cancelaron (pasaron a pago)', num:460, pct:39.0},
            {name:'Cancelaron antes del débito', num:720, pct:61.0, neg:true},
          ],
          rate:39, sem:'green', semTxt:'Bien',
        },
        money:[
          {label:'Total acumulado desde el inicio', val:284500, money:true},
          {label:'Recibido este mes', val:32800, money:true},
          {label:'Recibido esta semana', val:8400, money:true},
          {label:'Suscriptores activos pagando', val:1260, delta:4},
        ],
        projection:{subs:1260, price:26, pes:0.15, real:0.08, opt:0.03},
        tools:[
          {label:'Películas', val:506},
          {label:'LyricLab', val:412},
          {label:'Flashcards', val:318},
          {label:'SpeakMaster', val:274},
          {label:'ShadowLab', val:96, danger:true},
        ],
        risk:[
          {name:'Mariana Ortiz', rank:'Oro', tool:'Películas', days:8},
          {name:'Diego Fuentes', rank:'Plata', tool:'Flashcards', days:7},
          {name:'Camila Rojas', rank:'Bronce', tool:'LyricLab', days:9},
        ],
        riskTotal:3,
        rankDist:[
          {label:'Bronce', val:4100},{label:'Plata', val:3600},{label:'Oro', val:2900},
          {label:'Platino', val:1900},{label:'Diamante', val:1200},{label:'Challenger', val:530},
        ],
        langDist:[
          {label:'Inglés', val:9800},{label:'Francés', val:1700},{label:'Italiano', val:1100},
          {label:'Español', val:980},{label:'Portugués', val:650},
        ],
        weeks:{active:[720,760,780,800,810,820,835,842], nuevos:[210,230,220,250,240,260,255,270]},
      },
    },
    alerta: {
      captacion: {
        alerts: [
          {sev:'red', txt:'Solo <b>6 de cada 100</b> personas que llegan se registran. La meta es 15.', rev:'Considera cambiar el <b>texto principal</b> de la landing.', tag:'Actuar ya'},
          {sev:'red', txt:'El <b>41%</b> empieza a registrarse pero no termina.', rev:'El <b>formulario</b> puede estar frenando a la gente.', tag:'Actuar ya'},
          {sev:'amber', txt:'Las visitas bajaron un <b>22%</b> esta semana comparado con la anterior.', rev:'Revisa si pausaste alguna pauta o bajó el alcance orgánico.', tag:'Precaución'},
        ],
        visits:[
          {label:'Visitas hoy', val:712, delta:-18},
          {label:'Visitas esta semana', val:5940, delta:-22},
          {label:'Visitas este mes', val:26100, delta:-11},
          {label:'Personas nuevas (nunca habían entrado)', val:19300, delta:-14, sub:'76% del total'},
        ],
        funnel:[
          {name:'Entran a la página', num:5940, pct:100},
          {name:'Hacen clic en "Crear cuenta"', num:612, pct:10.3},
          {name:'Terminan el registro', num:356, pct:6.0},
        ],
        funnelKpis:[
          {label:'De cada 100 visitas, cuántas se registran', val:'6', unit:'/ 100', sem:'red', semTxt:'Actuar ya'},
          {label:'Empezó el registro pero se fue', val:'41', unit:'%', sem:'red', semTxt:'Actuar ya'},
          {label:'Tiempo en la landing antes de actuar', val:'38s', unit:'', sem:'red', semTxt:'Actuar ya'},
        ],
        sources:[
          {label:'Instagram', val:2080, ico:'IG', c:'#e879b9'},
          {label:'Facebook', val:1190, ico:'FB', c:'#5b8def'},
          {label:'WhatsApp', val:1010, ico:'WA', c:'#5fe08a'},
          {label:'Directo', val:1070, ico:'D', c:'#a6a6a0'},
          {label:'Otros', val:590, ico:'·', c:'#6e6e68'},
        ],
        orgVsPaid:{org:{visits:4100, reg:240}, paid:{visits:1840, reg:116, cpr:5.4}, threshold:4},
        heatFactor:0.6,
        device:{mobile:68, desktop:32, alert:true},
        dwell:{label:'42s', zone:1},
        sourceTable:{
          cols:['Instagram orgánico','Instagram pauta','Facebook orgánico','Facebook pauta','WhatsApp','Directo'],
          visits:[1500,580,760,430,1010,1070],
          reg:[96,28,40,18,118,56],
        },
        weeks:{visits:[7800,7900,7700,7400,7000,6600,6200,5940], reg:[1200,1180,1010,820,640,520,420,356]},
      },
      estudiantes: {
        alerts: [
          {sev:'red', txt:'<b>12 estudiantes</b> llevan más de 7 días sin entrar. Están en riesgo de cancelar.', rev:'Escríbeles hoy desde la lista de "en riesgo".', tag:'Actuar ya'},
          {sev:'amber', txt:'Solo el <b>22%</b> vuelve al día siguiente de registrarse. El primer día es el más importante.', rev:'Revisa el onboarding y el primer correo de bienvenida.', tag:'Precaución'},
          {sev:'red', txt:'La conversión de prueba gratuita a pago bajó al <b>18%</b> este mes.', rev:'Revisa el recordatorio antes del cobro y el precio mostrado.', tag:'Actuar ya'},
        ],
        activity:[
          {label:'Estudiantes activos hoy', val:503, delta:-14},
          {label:'Total registrados', val:14230, delta:null, sub:'desde el inicio'},
          {label:'Vuelven al día siguiente', val:'22', unit:'%', sem:'amber', semTxt:'Precaución'},
          {label:'Siguen activos a los 7 días', val:'13', unit:'%', sem:'red', semTxt:'Actuar ya'},
          {label:'Siguen activos a los 30 días', val:'9', unit:'%', sub:'sin semáforo definido'},
          {label:'Racha promedio activa', val:'5', unit:'días'},
          {label:'Racha más larga histórica', val:'167', unit:'días'},
        ],
        trial:{
          funnel:[
            {name:'Total en prueba gratuita', num:1040, pct:100},
            {name:'No cancelaron (pasaron a pago)', num:187, pct:18.0},
            {name:'Cancelaron antes del débito', num:853, pct:82.0, neg:true},
          ],
          rate:18, sem:'red', semTxt:'Actuar ya',
        },
        money:[
          {label:'Total acumulado desde el inicio', val:284500, money:true},
          {label:'Recibido este mes', val:24100, money:true},
          {label:'Recibido esta semana', val:5200, money:true},
          {label:'Suscriptores activos pagando', val:1090, delta:-7},
        ],
        projection:{subs:1090, price:26, pes:0.15, real:0.12, opt:0.03},
        tools:[
          {label:'Películas', val:360},
          {label:'LyricLab', val:240},
          {label:'Flashcards', val:150},
          {label:'SpeakMaster', val:120},
          {label:'ShadowLab', val:38, danger:true},
        ],
        risk:[
          {name:'Mariana Ortiz', rank:'Oro', tool:'Películas', days:14},
          {name:'Sebastián Páez', rank:'Platino', tool:'SpeakMaster', days:12},
          {name:'Diego Fuentes', rank:'Plata', tool:'Flashcards', days:11},
          {name:'Camila Rojas', rank:'Bronce', tool:'LyricLab', days:9},
          {name:'Andrés Gómez', rank:'Oro', tool:'Películas', days:8},
        ],
        riskTotal:12,
        rankDist:[
          {label:'Bronce', val:4600},{label:'Plata', val:3700},{label:'Oro', val:2700},
          {label:'Platino', val:1700},{label:'Diamante', val:1050},{label:'Challenger', val:480},
        ],
        langDist:[
          {label:'Inglés', val:9600},{label:'Francés', val:1750},{label:'Italiano', val:1150},
          {label:'Español', val:1020},{label:'Portugués', val:710},
        ],
        weeks:{active:[820,815,790,740,690,620,560,503], nuevos:[260,250,230,200,180,150,130,118]},
      },
    },
  };

  /* ----------------------------------------------------------
     3. HELPERS
  ---------------------------------------------------------- */
  var _nf = new Intl.NumberFormat('es-ES',{useGrouping:'always',maximumFractionDigits:0});
  function f(n){ return _nf.format(Math.round(n)); }
  function money(n){ return '$'+f(n); }
  var rankColors = {Bronce:'#cd8a5e',Plata:'#cfd3d8',Oro:'#f0c244',Platino:'#9fe6e0',Diamante:'#8fd0ff',Challenger:'#d59bff'};

  function sec(kick,title,sub,body){
    return '<section class="ep-sec">'+
      '<div class="ep-sec-head">'+
        '<div class="ep-tick"></div>'+
        '<div>'+
          '<div class="ep-kick">'+kick+'</div>'+
          '<div class="ep-title">'+title+'</div>'+
          (sub?'<div class="ep-sub">'+sub+'</div>':'')+
        '</div>'+
      '</div>'+body+
    '</section>';
  }

  function sem(level,txt){
    return '<span class="ep-sem '+level+'"><span class="dot"></span>'+txt+'</span>';
  }

  function deltaTag(d){
    if(d===null||d===undefined) return '';
    if(d===0) return '<div class="ep-delta flat">— sin cambio</div>';
    var up=d>0;
    return '<div class="ep-delta '+(up?'up':'down')+'">'+(up?'▲':'▼')+' '+Math.abs(d)+'% vs período anterior</div>';
  }

  function metricCard(m){
    var val = m.money ? money(m.val) : (typeof m.val==='number' ? f(m.val) : m.val);
    return '<div class="ep-card">'+
      '<div class="ep-m-lbl">'+m.label+'</div>'+
      '<div class="ep-m-val'+(m.sem?' lime':'')+'">'+val+(m.unit?' <span style="font-size:18px;color:var(--ep-txt3)">'+m.unit+'</span>':'')+' </div>'+
      (m.sub?'<div class="ep-m-sub">'+m.sub+'</div>':'')+
      (m.sem?'<div style="margin-top:12px">'+sem(m.sem,m.semTxt)+'</div>':deltaTag(m.delta))+
    '</div>';
  }

  function barList(items,opts){
    opts = opts||{};
    var max = Math.max.apply(null,items.map(function(i){return i.val;}));
    var total = items.reduce(function(a,i){return a+i.val;},0);
    return '<div class="ep-bars">'+items.map(function(i){
      var pct = total?Math.round(i.val/total*100):0;
      var w = Math.max(3,i.val/max*100);
      var ico = opts.icons ? '<span class="ep-bico" style="background:'+i.c+'">'+i.ico+'</span>' : '';
      var danger = i.danger?' danger':'';
      return '<div class="ep-brow">'+
        '<div class="ep-bsrc">'+ico+'<span>'+i.label+(i.danger?' <span style="color:var(--ep-red)">▲</span>':'')+'</span></div>'+
        '<div class="ep-btrack"><div class="ep-bfill'+danger+'" style="width:'+w+'%"></div></div>'+
        '<div class="ep-bval"><b>'+f(i.val)+'</b>'+(opts.showPct!==false?'<span>'+pct+'%</span>':'<span>'+(opts.unit||'')+'</span>')+'</div>'+
      '</div>';
    }).join('')+'</div>';
  }

  function funnelHtml(steps){
    return '<div class="ep-funnel">'+steps.map(function(s,idx){
      var fillStyle = s.neg ? 'background:linear-gradient(90deg,rgba(255,92,92,.2),rgba(255,92,92,.04));border-right:2px solid var(--ep-red)' : '';
      return (idx>0?'<div class="ep-farrow">↓</div>':'')+
        '<div class="ep-fstep">'+
          '<div class="ep-ffill" style="width:'+s.pct+'%;'+fillStyle+'"></div>'+
          '<div class="ep-fcontent">'+
            '<div class="ep-fname">'+s.name+'</div>'+
            '<div class="ep-fnum"><b>'+f(s.num)+'</b><span style="'+(s.neg?'color:var(--ep-red)':'')+'">'+s.pct+'%</span></div>'+
          '</div>'+
        '</div>';
    }).join('')+'</div>';
  }

  function heatmap(factor){
    var days=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    var dayF=[0.92,0.96,1.0,1.0,1.06,1.16,1.02];
    function base(h){
      var ev=Math.exp(-Math.pow(h-20,2)/14);
      var lu=Math.exp(-Math.pow(h-13,2)/6)*0.6;
      var mo=Math.exp(-Math.pow(h-8,2)/5)*0.38;
      return ev+lu+mo;
    }
    var grid=[]; var mx=0;
    for(var h=0;h<24;h++){var row=[];for(var d=0;d<7;d++){
      var v=base(h)*dayF[d]*factor*(1+0.09*Math.sin(h*3+d*7));
      v=Math.max(0,v);row.push(v);if(v>mx)mx=v;}grid.push(row);}
    var html='<div class="ep-heat"><div class="ep-heat-grid">';
    html+='<div></div>'+days.map(function(d){return '<div class="ep-heat-day">'+d+'</div>';}).join('');
    for(var h=0;h<24;h++){
      html+='<div class="ep-heat-hr">'+(h%3===0?String(h).padStart(2,'0'):'')+'</div>';
      for(var d=0;d<7;d++){
        var t=grid[h][d]/mx;
        var op=(t*0.92+0.04).toFixed(2);
        html+='<div class="ep-heat-cell" style="background:rgba(196,255,61,'+op+')"></div>';
      }
    }
    html+='</div><div class="ep-heat-legend"><span>Menos</span><div class="ep-heat-scale">'+
      [0.06,0.25,0.45,0.65,0.9].map(function(o){return '<i style="background:rgba(196,255,61,'+o+')"></i>';}).join('')+
    '</div><span>Más visitas</span></div></div>';
    return html;
  }

  function donutHtml(mobile){
    var r=58, c=2*Math.PI*r, mLen=mobile/100*c;
    return '<svg viewBox="0 0 150 150" width="150" height="150">'+
      '<circle cx="75" cy="75" r="'+r+'" fill="none" stroke="#2a2a2a" stroke-width="20"/>'+
      '<circle cx="75" cy="75" r="'+r+'" fill="none" stroke="var(--ep-lime)" stroke-width="20"'+
        ' stroke-dasharray="'+mLen+' '+(c-mLen)+'" stroke-dashoffset="'+(c*0.25)+'" stroke-linecap="butt"'+
        ' transform="rotate(-90 75 75)" style="filter:drop-shadow(0 0 6px rgba(196,255,61,.4))"/>'+
      '<text x="75" y="70" text-anchor="middle" fill="#f3f3ef" font-family="Plus Jakarta Sans" font-weight="700" font-size="26">'+mobile+'%</text>'+
      '<text x="75" y="90" text-anchor="middle" fill="#6e6e68" font-family="JetBrains Mono" font-size="11">CELULAR</text>'+
    '</svg>';
  }

  function lineChart(labels,s1,s2){
    var W=1000,H=300,pad={l:8,r:8,t:24,b:34};
    var iw=W-pad.l-pad.r, ih=H-pad.t-pad.b;
    function x(i){return pad.l+i/(labels.length-1)*iw;}
    function mkPath(data,max){return data.map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+(pad.t+ih-v/max*ih).toFixed(1);}).join(' ');}
    var max1=Math.max.apply(null,s1.data)*1.12, max2=Math.max.apply(null,s2.data)*1.12;
    var grid=[0,.25,.5,.75,1].map(function(t){return '<line x1="'+pad.l+'" x2="'+(W-pad.r)+'" y1="'+(pad.t+ih*t)+'" y2="'+(pad.t+ih*t)+'" stroke="rgba(255,255,255,.05)"/>';}).join('');
    function dots(data,max,col){return data.map(function(v,i){return '<circle cx="'+x(i).toFixed(1)+'" cy="'+(pad.t+ih-v/max*ih).toFixed(1)+'" r="3.5" fill="'+col+'"/>';}).join('');}
    var xl=labels.map(function(l,i){return '<text x="'+x(i).toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" fill="#6e6e68" font-family="JetBrains Mono" font-size="12">'+l+'</text>';}).join('');
    return '<div class="ep-chart">'+
      '<div class="ep-chart-legend">'+
        '<div class="ep-cl-item"><span class="ep-cl-line" style="background:'+s1.color+'"></span>'+s1.name+'</div>'+
        '<div class="ep-cl-item"><span class="ep-cl-line" style="background:'+s2.color+'"></span>'+s2.name+'</div>'+
      '</div>'+
      '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="width:100%;height:300px">'+
        grid+
        '<path d="'+mkPath(s1.data,max1)+'" fill="none" stroke="'+s1.color+'" stroke-width="2.5" stroke-linejoin="round" style="filter:drop-shadow(0 0 5px '+s1.color+'66)"/>'+
        '<path d="'+mkPath(s2.data,max2)+'" fill="none" stroke="'+s2.color+'" stroke-width="2.5" stroke-linejoin="round"/>'+
        dots(s1.data,max1,s1.color)+dots(s2.data,max2,s2.color)+xl+
      '</svg>'+
    '</div>';
  }

  /* ----------------------------------------------------------
     4. RENDER — CAPTACIÓN
  ---------------------------------------------------------- */
  function renderCaptacion(d){
    var html='';

    html+=sec('00 / Captación','Alertas automáticas','Lo que necesita tu atención ahora mismo, en palabras simples.',
      '<div class="ep-alerts">'+d.alerts.map(function(a){
        return '<div class="ep-alert '+(a.sev==='red'?'red':a.sev==='amber'?'amber':'green')+'">'+
          '<div class="ep-a-ico">'+(a.sev==='green'?'✓':'!')+'</div>'+
          '<div class="ep-a-body"><div class="ep-a-txt">'+a.txt+'</div><div class="ep-a-rev">Qué revisar: '+a.rev+'</div></div>'+
          '<div class="ep-a-tag">'+a.tag+'</div>'+
        '</div>';
      }).join('')+'</div>');

    html+=sec('01','¿Cuánta gente llega?','Comparado con el período anterior.',
      '<div class="ep-grid ep-g4">'+d.visits.map(metricCard).join('')+'</div>');

    html+=sec('02','El camino del registro','De la visita a la cuenta creada, paso a paso.',
      '<div class="ep-card s2" style="padding:24px">'+funnelHtml(d.funnel)+'</div>'+
      '<div class="ep-grid ep-g3" style="margin-top:14px">'+d.funnelKpis.map(function(k){
        return '<div class="ep-card">'+
          '<div class="ep-m-lbl">'+k.label+'</div>'+
          '<div class="ep-m-val lime">'+k.val+' <span style="font-size:16px;color:var(--ep-txt3)">'+k.unit+'</span></div>'+
          '<div style="margin-top:12px">'+sem(k.sem,k.semTxt)+'</div>'+
        '</div>';
      }).join('')+'</div>');

    html+=sec('03','¿De dónde vienen?','Visitas por red, con su porcentaje del total.',
      '<div class="ep-card" style="padding:24px">'+barList(d.sources,{icons:true})+'</div>');

    var o=d.orgVsPaid, cprAlert=o.paid.cpr>o.threshold;
    html+=sec('04','Orgánico vs Pauta pagada','Lo que llega gratis frente a lo que pagas por anuncios.',
      '<div class="ep-cmp">'+
        '<div class="ep-card">'+
          '<div class="ep-cmp-head"><span class="ep-cmp-dot" style="background:var(--ep-lime)"></span><b>Orgánico</b><span class="ep-pill-note">posts, historias, compartidos</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Visitas</span><span class="v">'+f(o.org.visits)+'</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Registros generados</span><span class="v" style="color:var(--ep-lime)">'+f(o.org.reg)+'</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Costo por registro</span><span class="v" style="color:var(--ep-grn)">$0 · gratis</span></div>'+
        '</div>'+
        '<div class="ep-card">'+
          '<div class="ep-cmp-head"><span class="ep-cmp-dot" style="background:#5b8def"></span><b>Pauta pagada</b><span class="ep-pill-note">anuncios</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Visitas</span><span class="v">'+f(o.paid.visits)+'</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Registros generados</span><span class="v" style="color:var(--ep-lime)">'+f(o.paid.reg)+'</span></div>'+
          '<div class="ep-cmp-row"><span class="k">Costo por registro</span><span class="v" style="color:'+(cprAlert?'var(--ep-red)':'var(--ep-txt)')+'">$'+o.paid.cpr.toFixed(2).replace('.',',')+'</span></div>'+
          (cprAlert?
            '<div class="ep-alert red" style="margin-top:14px;padding:12px 14px"><div class="ep-a-ico" style="width:28px;height:28px;font-size:15px">!</div><div class="ep-a-body"><div class="ep-a-txt" style="font-size:13px">Cada registro pagado cuesta más del umbral de $'+o.threshold+' que definiste. La pauta se está volviendo cara.</div></div></div>':
            '<div style="margin-top:14px">'+sem('green','Dentro del umbral')+'</div>')+
        '</div>'+
      '</div>');

    html+=sec('05','¿Qué día y hora entra más gente?','Entre más intenso el verde, más visitas a esa hora.',
      '<div class="ep-card" style="padding:22px 24px">'+heatmap(d.heatFactor)+'</div>');

    var dv=d.device;
    html+=sec('06','¿Desde qué dispositivo entran?','Celular frente a computador.',
      '<div class="ep-card" style="padding:24px">'+
        '<div class="ep-donut-wrap">'+
          donutHtml(dv.mobile)+
          '<div class="ep-donut-legend">'+
            '<div class="ep-dl-row"><span class="ep-dl-dot" style="background:var(--ep-lime)"></span><div><b>'+dv.mobile+'%</b><small>desde el celular</small></div></div>'+
            '<div class="ep-dl-row"><span class="ep-dl-dot" style="background:#2a2a2a;border:1px solid var(--ep-line2)"></span><div><b>'+dv.desktop+'%</b><small>desde el computador</small></div></div>'+
          '</div>'+
        '</div>'+
        (dv.alert?
          '<div class="ep-alert red" style="margin-top:20px"><div class="ep-a-ico">!</div><div class="ep-a-body"><div class="ep-a-txt">Más del 60% entra desde el celular y la tasa de registro está baja. La landing en móvil puede estar costando registros.</div><div class="ep-a-rev">Qué revisar: <b>cómo se ve el formulario en pantallas pequeñas</b>.</div></div><div class="ep-a-tag">Actuar ya</div></div>':
          '<div style="margin-top:18px">'+sem('green','Reparto equilibrado entre celular y computador')+'</div>')+
      '</div>');

    var zones=[
      {l:'Menos de 10s',c:'var(--ep-red)'},
      {l:'10s a 1 min',c:'var(--ep-amb)'},
      {l:'1 a 3 min · bien',c:'var(--ep-grn)'},
      {l:'Más de 3 min · excelente',c:'var(--ep-lime)'},
    ];
    var needlePos=(d.dwell.zone+0.5)/4*100;
    html+=sec('07','¿Cuánto tiempo duran en la página?','El tiempo promedio antes de irse o registrarse.',
      '<div class="ep-card" style="padding:24px">'+
        '<div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap">'+
          '<span class="ep-m-val lime" style="font-size:48px;white-space:nowrap">'+d.dwell.label+'</span>'+
          '<span style="color:var(--ep-txt3);font-size:14px">tiempo promedio de visita</span>'+
        '</div>'+
        '<div class="ep-tscale"><div class="ep-tscale-bar">'+
          zones.map(function(z){return '<div class="ep-tseg" style="background:'+z.c+'">'+z.l+'</div>';}).join('')+
          '<div class="ep-tneedle" style="left:'+needlePos+'%"></div>'+
        '</div></div>'+
      '</div>');

    var st=d.sourceTable;
    var rates=st.cols.map(function(_,i){return st.reg[i]/st.visits[i]*100;});
    var bestIdx=rates.indexOf(Math.max.apply(null,rates));
    html+=sec('08','¿Qué fuente convierte mejor?','La columna verde es la que mejor transforma visitas en registros.',
      '<div class="ep-card" style="padding:8px 4px"><div class="ep-tbl-wrap"><table>'+
        '<thead><tr><th>Métrica</th>'+st.cols.map(function(c,i){return '<th class="'+(i===bestIdx?'ep-col-best':'')+'">'+c+(i===bestIdx?'<span class="ep-best-badge">Mejor</span>':'')+'</th>';}).join('')+'</tr></thead>'+
        '<tbody>'+
          '<tr><td>Visitas</td>'+st.visits.map(function(v,i){return '<td class="'+(i===bestIdx?'ep-col-best':'')+'">'+f(v)+'</td>';}).join('')+'</tr>'+
          '<tr><td>Registros</td>'+st.reg.map(function(v,i){return '<td class="'+(i===bestIdx?'ep-col-best':'')+'">'+f(v)+'</td>';}).join('')+'</tr>'+
          '<tr><td>Tasa de conversión</td>'+rates.map(function(r,i){return '<td class="'+(i===bestIdx?'ep-col-best':'')+'">'+r.toFixed(1).replace('.',',')+'%</td>';}).join('')+'</tr>'+
        '</tbody>'+
      '</table></div></div>');

    html+=sec('09','Comparativa semana a semana','Visitas y registros de las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">'+lineChart(
        ['S1','S2','S3','S4','S5','S6','S7','S8'],
        {name:'Visitas',color:'#c4ff3d',data:d.weeks.visits},
        {name:'Registros',color:'#5b8def',data:d.weeks.reg}
      )+'</div>');

    return html;
  }

  /* ----------------------------------------------------------
     5. RENDER — ESTUDIANTES
  ---------------------------------------------------------- */
  function renderEstudiantes(d){
    var html='';

    html+=sec('00 / Estudiantes','Alertas automáticas','Lo que necesita tu atención ahora mismo, en palabras simples.',
      '<div class="ep-alerts">'+d.alerts.map(function(a){
        return '<div class="ep-alert '+(a.sev==='red'?'red':a.sev==='amber'?'amber':'green')+'">'+
          '<div class="ep-a-ico">'+(a.sev==='green'?'✓':'!')+'</div>'+
          '<div class="ep-a-body"><div class="ep-a-txt">'+a.txt+'</div><div class="ep-a-rev">Qué revisar: '+a.rev+'</div></div>'+
          '<div class="ep-a-tag">'+a.tag+'</div>'+
        '</div>';
      }).join('')+'</div>');

    html+=sec('01','Actividad general','Quién está activo y qué tan seguido vuelve.',
      '<div class="ep-grid ep-g4">'+d.activity.map(metricCard).join('')+'</div>');

    var t=d.trial;
    html+=sec('02','De prueba gratuita a plan de pago','Cuántos pasan de probar gratis a pagar.',
      '<div class="ep-card s2" style="padding:24px">'+funnelHtml(t.funnel)+'</div>'+
      '<div class="ep-card" style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">'+
        '<div><div class="ep-m-lbl">Tasa de conversión de prueba a pago</div><div class="ep-m-val lime" style="font-size:46px">'+t.rate+'%</div></div>'+
        '<div>'+sem(t.sem,t.semTxt)+'</div>'+
      '</div>');

    html+=sec('03','Dinero recibido','Lo que ha entrado, en total y por período.',
      '<div class="ep-grid ep-g4">'+d.money.map(metricCard).join('')+'</div>');

    var p=d.projection;
    var base=p.subs*p.price;
    function amt(ch){return money(base*(1-ch));}
    html+=sec('04','Proyección del próximo mes','Tres escenarios según cuánta gente cancele.',
      '<div class="ep-card" style="padding:24px">'+
        '<div class="ep-proj">'+
          '<div class="ep-pcard pes"><div class="ep-p-name">Pesimista</div><div class="ep-p-val">'+amt(p.pes)+'</div><div class="ep-p-cond">si cancela el '+Math.round(p.pes*100)+'%</div></div>'+
          '<div class="ep-pcard real"><div class="ep-p-name">Realista</div><div class="ep-p-val">'+amt(p.real)+'</div><div class="ep-p-cond">tasa histórica · '+Math.round(p.real*100)+'% cancela</div></div>'+
          '<div class="ep-pcard opt"><div class="ep-p-name">Optimista</div><div class="ep-p-val">'+amt(p.opt)+'</div><div class="ep-p-cond">si cancela solo el '+Math.round(p.opt*100)+'%</div></div>'+
        '</div>'+
        '<div class="ep-formula">'+
          '<b>'+f(p.subs)+'</b> suscriptores actuales × <b>'+money(p.price)+'</b> precio del plan × (1 − tasa de cancelación)'+
          '<span class="note">Esta es una estimación basada en el comportamiento actual, no un número garantizado.</span>'+
        '</div>'+
      '</div>');

    html+=sec('05','¿Qué están usando más?','Sesiones de hoy por herramienta. La menos usada va marcada en rojo.',
      '<div class="ep-card" style="padding:24px">'+barList(d.tools,{showPct:false,unit:'sesiones'})+'</div>');

    html+=sec('06','Estudiantes en riesgo de irse','Quiénes llevan días sin entrar y podrían cancelar.',
      '<div class="ep-risk">'+d.risk.map(function(r){
        var lvl=r.days>10?'red':'amber';
        var initials=r.name.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
        return '<div class="ep-rrow">'+
          '<div class="ep-ravatar" style="background:'+rankColors[r.rank]+'">'+initials+'</div>'+
          '<div>'+
            '<div class="ep-rname">'+r.name+'</div>'+
            '<div class="ep-rmeta"><span class="ep-rrank" style="background:'+rankColors[r.rank]+'33;color:'+rankColors[r.rank]+'">'+r.rank+'</span><span>·</span><span>Favorita: '+r.tool+'</span></div>'+
          '</div>'+
          '<div class="ep-rtool">'+r.tool+'</div>'+
          '<div class="ep-rdays '+lvl+'">'+r.days+' días sin entrar</div>'+
        '</div>';
      }).join('')+'</div>'+
      '<button class="ep-btn-ghost">Ver todos ('+d.riskTotal+') →</button>');

    html+=sec('07','Distribución de la comunidad','Por rango y por idioma que estudian.',
      '<div class="ep-dist-grid">'+
        '<div class="ep-card" style="padding:24px">'+
          '<div class="ep-card-h"><b>Por rango</b><span class="ep-pill-note">'+f(d.rankDist.reduce(function(a,x){return a+x.val;},0))+' estudiantes</span></div>'+
          barList(d.rankDist,{showPct:true})+
        '</div>'+
        '<div class="ep-card" style="padding:24px">'+
          '<div class="ep-card-h"><b>Por idioma que estudian</b><span class="ep-pill-note">'+f(d.langDist.reduce(function(a,x){return a+x.val;},0))+' estudiantes</span></div>'+
          barList(d.langDist,{showPct:true})+
        '</div>'+
      '</div>');

    html+=sec('08','Comparativa semana a semana','Usuarios activos y nuevos registros de las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">'+lineChart(
        ['S1','S2','S3','S4','S5','S6','S7','S8'],
        {name:'Usuarios activos',color:'#c4ff3d',data:d.weeks.active},
        {name:'Nuevos registros',color:'#d59bff',data:d.weeks.nuevos}
      )+'</div>');

    return html;
  }

  /* ----------------------------------------------------------
     6. STATE + WIRING
  ---------------------------------------------------------- */
  var state = {view:'captacion', scn:'sano'};

  function renderPanel(){
    var root = document.getElementById('stats-root');
    if(!root) return;
    var d = DATA[state.scn][state.view];
    var content = root.querySelector('.est-content');
    if(!content) return;
    content.innerHTML = state.view==='captacion' ? renderCaptacion(d) : renderEstudiantes(d);
  }

  function buildShell(){
    var root = document.getElementById('stats-root');
    if(!root || root.dataset.built) return;
    root.dataset.built = '1';
    root.className = 'est-panel';
    root.innerHTML =
      '<div class="est-controls">'+
        '<div class="est-seg" id="ep-viewSeg">'+
          '<button data-view="captacion" class="on">Captación</button>'+
          '<button data-view="estudiantes">Estudiantes</button>'+
        '</div>'+
        '<div class="est-spacer"></div>'+
        '<span class="est-scn-lbl">Escenario demo</span>'+
        '<div class="est-seg small" id="ep-scnSeg">'+
          '<button data-scn="sano" class="on sano">Sano</button>'+
          '<button data-scn="alerta">Alerta</button>'+
        '</div>'+
      '</div>'+
      '<div class="est-content"></div>';

    document.getElementById('ep-viewSeg').addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      state.view=b.dataset.view;
      document.querySelectorAll('#ep-viewSeg button').forEach(function(x){x.classList.toggle('on',x===b);});
      renderPanel();
    });
    document.getElementById('ep-scnSeg').addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      state.scn=b.dataset.scn;
      document.querySelectorAll('#ep-scnSeg button').forEach(function(x){
        x.classList.remove('on','sano','alerta');
        if(x===b){x.classList.add('on',b.dataset.scn);}
      });
      renderPanel();
    });
  }

  /* ----------------------------------------------------------
     7. PUBLIC INIT
  ---------------------------------------------------------- */
  window.initEstadisticas = function(){
    injectCSS();
    buildShell();
    renderPanel();
  };

})();
