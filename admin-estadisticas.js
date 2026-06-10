/* ============================================================
   admin-estadisticas.js  v2 — datos reales de Supabase
   Panel de Estadísticas — Aura Languages Admin
   Dos vistas: Captación / Estudiantes
   Llamar: initEstadisticas()  cuando se abre el tab
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     1. CSS INJECTION (scoped to .est-panel)
  ────────────────────────────────────────────────────────── */
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
.est-spacer{flex:1;}
.ep-refresh-btn{
  font-family:var(--ep-mono);font-size:12px;color:var(--ep-txt3);
  background:none;border:1px solid var(--ep-line2);border-radius:9px;
  padding:7px 14px;cursor:pointer;transition:all .15s;
}
.ep-refresh-btn:hover{color:var(--ep-lime);border-color:var(--ep-lime);}
.est-content{padding-bottom:60px;}
.ep-sec{margin-top:46px;animation:ep-fade .3s ease;}
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
.ep-rrow{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:14px 18px;background:var(--ep-s1);}
.ep-ravatar{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-family:var(--ep-disp);font-weight:700;font-size:15px;color:#0f0f0f;}
.ep-rname{font-size:14.5px;font-weight:600;}
.ep-rmeta{font-size:12px;color:var(--ep-txt3);font-family:var(--ep-mono);margin-top:2px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
.ep-rrank{padding:1px 7px;border-radius:5px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;}
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
.ep-pending{background:rgba(255,206,77,.07);border:1px solid rgba(255,206,77,.25);border-left:3px solid var(--ep-amb);border-radius:14px;padding:20px 24px;display:flex;gap:16px;align-items:flex-start;}
.ep-pending-ico{width:36px;height:36px;background:var(--ep-amb-d);color:var(--ep-amb);border-radius:10px;display:grid;place-items:center;font-size:18px;flex:none;}
.ep-pending b{font-size:14.5px;color:var(--ep-txt);display:block;margin-bottom:6px;}
.ep-pending p{font-size:13px;color:var(--ep-txt3);margin:0;line-height:1.6;}
.ep-loading{padding:60px;text-align:center;color:var(--ep-txt3);font-family:var(--ep-mono);font-size:13px;}
.ep-spinner{width:32px;height:32px;border:2px solid var(--ep-line2);border-top-color:var(--ep-lime);border-radius:50%;margin:0 auto 16px;animation:ep-spin .8s linear infinite;}
@keyframes ep-fade{from{transform:translateY(7px);opacity:0;}to{transform:none;opacity:1;}}
@keyframes ep-spin{to{transform:rotate(360deg)}}
`;

  function injectCSS() {
    if (document.getElementById('ep-styles')) return;
    var s = document.createElement('style');
    s.id = 'ep-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ──────────────────────────────────────────────────────────
     2. CONSTANTS
  ────────────────────────────────────────────────────────── */
  var MRR_MAP = {
    solo:    { monthly:18,   quarterly:49/3,   annual:199/12 },
    combo:   { monthly:24,   quarterly:69/3,   annual:249/12 },
    maestro: { monthly:49,   quarterly:139/3,  annual:499/12 },
  };
  var LANG_NAMES  = { en:'Inglés', fr:'Francés', it:'Italiano', es:'Español', pt:'Portugués' };
  var RANK_ORDER  = ['Bronce','Plata','Oro','Platino','Diamante','Challenger'];
  var TOOL_NAMES  = {
    'play-movies':'Películas',
    'lyriclab':'LyricLab',
    'flashcards':'Flashcards',
    'speakmaster':'SpeakMaster',
    'shadowlab':'ShadowLab'
  };
  var rankColors  = { Bronce:'#cd8a5e', Plata:'#cfd3d8', Oro:'#f0c244', Platino:'#9fe6e0', Diamante:'#8fd0ff', Challenger:'#d59bff' };

  /* ──────────────────────────────────────────────────────────
     3. HELPERS
  ────────────────────────────────────────────────────────── */
  var _nf = new Intl.NumberFormat('es-ES',{useGrouping:'always',maximumFractionDigits:0});
  function f(n){ return _nf.format(Math.round(n)); }
  function money(n){ return '$'+f(n); }

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
    opts=opts||{};
    if(!items||!items.length) return '<div style="color:var(--ep-txt3);font-size:13px;padding:8px 0">Sin datos aún.</div>';
    var max=0;
    for(var i=0;i<items.length;i++){ if(items[i].val>max) max=items[i].val; }
    max=max||1;
    var total=0;
    for(var i=0;i<items.length;i++) total+=items[i].val;
    total=total||1;
    return '<div class="ep-bars">'+items.map(function(item){
      var pct=Math.round(item.val/total*100);
      var w=Math.max(3,item.val/max*100);
      var danger=item.danger?' danger':'';
      return '<div class="ep-brow">'+
        '<div class="ep-bsrc"><span>'+item.label+(item.danger?' <span style="color:var(--ep-red)">▲</span>':'')+'</span></div>'+
        '<div class="ep-btrack"><div class="ep-bfill'+danger+'" style="width:'+w+'%"></div></div>'+
        '<div class="ep-bval"><b>'+f(item.val)+'</b>'+(opts.showPct!==false?'<span>'+pct+'%</span>':'<span>'+(opts.unit||'')+'</span>')+'</div>'+
      '</div>';
    }).join('')+'</div>';
  }

  function funnelHtml(steps){
    return '<div class="ep-funnel">'+steps.map(function(s,idx){
      var w=Math.max(8,s.pct);
      var fillStyle=s.neg?'background:linear-gradient(90deg,rgba(255,92,92,.2),rgba(255,92,92,.04));border-right:2px solid var(--ep-red)':'';
      return (idx>0?'<div class="ep-farrow">↓</div>':'')+
        '<div class="ep-fstep">'+
          '<div class="ep-ffill" style="width:'+w+'%;'+fillStyle+'"></div>'+
          '<div class="ep-fcontent">'+
            '<div class="ep-fname">'+s.name+'</div>'+
            '<div class="ep-fnum"><b>'+f(s.num)+'</b><span style="'+(s.neg?'color:var(--ep-red)':'')+'">'+s.pct+'%</span></div>'+
          '</div>'+
        '</div>';
    }).join('')+'</div>';
  }

  function lineChart(labels,s1,s2){
    var W=1000,H=300,pad={l:8,r:8,t:24,b:34};
    var iw=W-pad.l-pad.r, ih=H-pad.t-pad.b;
    function x(i){return pad.l+i/(Math.max(labels.length-1,1))*iw;}
    var max1=Math.max.apply(null,s1.data)*1.12||1;
    var max2=Math.max.apply(null,s2.data)*1.12||1;
    function mkPath(data,max){
      return data.map(function(v,i){
        return (i?'L':'M')+x(i).toFixed(1)+' '+(pad.t+ih-(v/max)*ih).toFixed(1);
      }).join(' ');
    }
    function dots(data,max,col){
      return data.map(function(v,i){
        return '<circle cx="'+x(i).toFixed(1)+'" cy="'+(pad.t+ih-(v/max)*ih).toFixed(1)+'" r="3.5" fill="'+col+'"/>';
      }).join('');
    }
    var grid=[0,.25,.5,.75,1].map(function(t){
      return '<line x1="'+pad.l+'" x2="'+(W-pad.r)+'" y1="'+(pad.t+ih*t)+'" y2="'+(pad.t+ih*t)+'" stroke="rgba(255,255,255,.05)"/>';
    }).join('');
    var xl=labels.map(function(l,i){
      return '<text x="'+x(i).toFixed(1)+'" y="'+(H-10)+'" text-anchor="middle" fill="#6e6e68" font-family="JetBrains Mono" font-size="12">'+l+'</text>';
    }).join('');
    return '<div class="ep-chart">'+
      '<div class="ep-chart-legend">'+
        '<div class="ep-cl-item"><span class="ep-cl-line" style="background:'+s1.color+'"></span>'+s1.name+'</div>'+
        '<div class="ep-cl-item"><span class="ep-cl-line" style="background:'+s2.color+'"></span>'+s2.name+'</div>'+
      '</div>'+
      '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="width:100%;height:300px">'+
        grid+
        '<path d="'+mkPath(s1.data,max1)+'" fill="none" stroke="'+s1.color+'" stroke-width="2.5" stroke-linejoin="round" style="filter:drop-shadow(0 0 5px '+s1.color+'66)"/>'+
        '<path d="'+mkPath(s2.data,max2)+'" fill="none" stroke="'+s2.color+'" stroke-width="2.5" stroke-linejoin="round"/>'+
        dots(s1.data,max1,s1.color)+
        dots(s2.data,max2,s2.color)+
        xl+
      '</svg>'+
    '</div>';
  }

  function pendingBanner(title,desc){
    return '<div class="ep-pending">'+
      '<div class="ep-pending-ico">⚙</div>'+
      '<div><b>'+title+'</b><p>'+desc+'</p></div>'+
    '</div>';
  }

  /* ──────────────────────────────────────────────────────────
     4. LIVE DATA — COMPUTE FROM allUsers
  ────────────────────────────────────────────────────────── */
  function computeFromProfiles(users) {
    var now      = Date.now();
    var weekMs   = 7*86400000;
    var today    = new Date().toISOString().slice(0,10);

    // First-of-month boundaries
    var fom = new Date(); fom.setDate(1); fom.setHours(0,0,0,0);
    var fomStr = fom.toISOString();
    var fomPrev = new Date(fom); fomPrev.setMonth(fomPrev.getMonth()-1);
    var fomPrevStr = fomPrev.toISOString();

    var total = users.length;

    var activeToday = 0;
    for(var i=0;i<users.length;i++){
      if(users[i].last_session_date === today) activeToday++;
    }

    // New registrations
    var newThisMonth=0, newPrevMonth=0;
    for(var i=0;i<users.length;i++){
      var ca = users[i].created_at;
      if(!ca) continue;
      if(ca >= fomStr) newThisMonth++;
      else if(ca >= fomPrevStr) newPrevMonth++;
    }
    var monthDelta = newPrevMonth>0 ? Math.round((newThisMonth-newPrevMonth)/newPrevMonth*100) : null;

    // Weekly new registrations — last 8 weeks
    var weeklyRegs = [0,0,0,0,0,0,0,0];
    for(var i=0;i<users.length;i++){
      var ca = users[i].created_at;
      if(!ca) continue;
      var daysAgo = (now - new Date(ca).getTime()) / 86400000;
      var wk = Math.floor(daysAgo/7);
      if(wk>=0 && wk<8) weeklyRegs[7-wk]++;
    }
    var newThisWeek = weeklyRegs[7];
    var newPrevWeek = weeklyRegs[6];
    var weekDelta   = newPrevWeek>0 ? Math.round((newThisWeek-newPrevWeek)/newPrevWeek*100) : null;

    // Plan statuses
    var paying=0, trialCount=0, cancelledCount=0;
    var mrr=0;
    for(var i=0;i<users.length;i++){
      var u = users[i];
      if(u.plan_status==='active'){
        paying++;
        var pm = MRR_MAP[u.plan];
        if(pm) mrr += (pm[u.billing_period||'monthly'] || pm.monthly || 0);
      } else if(u.plan_status==='trial'){
        trialCount++;
      } else if(u.plan_status==='cancelled'){
        cancelledCount++;
      }
    }
    mrr = Math.round(mrr);

    // Conversion ratio: paying / (paying + trial + cancelled)
    var convBase = paying + trialCount + cancelledCount;
    var convRate = convBase>0 ? Math.round(paying/convBase*100) : 0;

    // Streak
    var streakMax=0, streakSum=0, streakCnt=0;
    for(var i=0;i<users.length;i++){
      var u = users[i];
      var sm = u.streak_max || u.streak_maximo || 0;
      if(sm > streakMax) streakMax = sm;
      if((u.streak_actual||0)>0){ streakSum+=u.streak_actual; streakCnt++; }
    }
    var streakAvg = streakCnt>0 ? Math.round(streakSum/streakCnt) : 0;

    // Rank distribution
    var rankMap = {};
    for(var i=0;i<users.length;i++){
      var r = users[i].rango||'Bronce';
      rankMap[r] = (rankMap[r]||0)+1;
    }
    var rankDist = [];
    for(var ri=0;ri<RANK_ORDER.length;ri++){
      if(rankMap[RANK_ORDER[ri]]>0) rankDist.push({label:RANK_ORDER[ri], val:rankMap[RANK_ORDER[ri]]});
    }

    // Language distribution
    var langMap = {};
    for(var i=0;i<users.length;i++){
      var l = LANG_NAMES[users[i].active_language||'en'] || users[i].active_language || 'Inglés';
      langMap[l] = (langMap[l]||0)+1;
    }
    var langKeys = Object.keys(langMap).sort(function(a,b){ return langMap[b]-langMap[a]; });
    var langDist = [];
    for(var li=0;li<langKeys.length;li++) langDist.push({label:langKeys[li], val:langMap[langKeys[li]]});

    // Risk users (inactive 7+ days)
    var riskAll = [];
    for(var i=0;i<users.length;i++){
      var u = users[i];
      if(!u.last_session_date) continue;
      var daysSince = (now - new Date(u.last_session_date).getTime()) / 86400000;
      if(daysSince >= 7){
        riskAll.push({ name:u.nombre||'Usuario', rank:u.rango||'Bronce', days:Math.round(daysSince) });
      }
    }
    riskAll.sort(function(a,b){ return b.days-a.days; });
    var riskTotal = riskAll.length;
    var riskUsers = riskAll.slice(0,5);

    /* ── Automatic alerts ── */
    var estudAlerts = [];
    if(riskTotal > 10){
      estudAlerts.push({sev:'red', txt:'<b>'+riskTotal+' estudiantes</b> llevan más de 7 días sin entrar. Están en riesgo de cancelar.', rev:'Escríbeles hoy. Los encuentras en la sección "En riesgo" más abajo.', tag:'Actuar ya'});
    } else if(riskTotal > 3){
      estudAlerts.push({sev:'amber', txt:'<b>'+riskTotal+' estudiantes</b> llevan más de 7 días sin entrar.', rev:'Considera escribirles un mensaje de reactivación.', tag:'Vigilar'});
    } else {
      estudAlerts.push({sev:'green', txt:'Retención saludable: solo <b>'+riskTotal+' estudiante'+(riskTotal===1?'':'s')+'</b> lleva'+(riskTotal===1?'':'n')+' más de 7 días sin entrar.', rev:'Continúa con la estrategia de engagement actual.', tag:'Bien'});
    }
    if(activeToday===0){
      estudAlerts.push({sev:'amber', txt:'Ningún estudiante ha tenido una sesión hoy.', rev:'Verifica si hay algún problema técnico en la plataforma.', tag:'Vigilar'});
    } else {
      estudAlerts.push({sev:'green', txt:'Hoy ya han entrado <b>'+activeToday+' estudiante'+(activeToday===1?'':'s')+'</b> a practicar.', rev:'La actividad diaria está activa.', tag:'Bien'});
    }
    if(mrr===0){
      estudAlerts.push({sev:'amber', txt:'Aún no hay suscriptores activos detectados.', rev:'Verifica que los campos <b>plan_status</b> y <b>plan</b> estén siendo guardados cuando alguien suscribe.', tag:'Pendiente'});
    }

    var capAlerts = [];
    if(newThisMonth===0){
      capAlerts.push({sev:'amber', txt:'Aún no hay registros este mes.', rev:'Verifica que el formulario de registro esté funcionando correctamente.', tag:'Vigilar'});
    } else if(monthDelta!==null && monthDelta < -15){
      capAlerts.push({sev:'red', txt:'Los registros bajaron un <b>'+Math.abs(monthDelta)+'%</b> este mes comparado con el anterior.', rev:'Revisa si pausaste alguna campaña o bajó el contenido orgánico en redes.', tag:'Actuar ya'});
    } else if(monthDelta!==null && monthDelta > 10){
      capAlerts.push({sev:'green', txt:'Los registros subieron un <b>'+monthDelta+'%</b> este mes vs el anterior.', rev:'Mantén la estrategia de contenido que está funcionando.', tag:'Bien'});
    } else {
      capAlerts.push({sev:'green', txt:'El ritmo de nuevos registros se mantiene estable.', rev:'Continúa con la estrategia actual.', tag:'Estable'});
    }
    capAlerts.push({sev:'amber', txt:'Las métricas de visitas a la página requieren configurar <b>Google Analytics 4</b> o <b>Facebook Pixel</b>.', rev:'Avísame cuando estés listo y te guío paso a paso para configurarlos.', tag:'Pendiente'});

    // UTM sources aggregation
    var srcMap = {};
    users.forEach(function(u) {
      var src = u.utm_source || 'directo';
      srcMap[src] = (srcMap[src] || 0) + 1;
    });
    var utmSources = Object.keys(srcMap).map(function(k) {
      return { name: k, count: srcMap[k] };
    }).sort(function(a,b){return b.count-a.count;}).slice(0,8);

    var campMap = {};
    users.forEach(function(u) {
      if (u.utm_campaign) { campMap[u.utm_campaign] = (campMap[u.utm_campaign]||0)+1; }
    });
    var utmCampaigns = Object.keys(campMap).map(function(k) {
      return { name: k, count: campMap[k] };
    }).sort(function(a,b){return b.count-a.count;}).slice(0,6);

    return {
      total, activeToday,
      newThisMonth, newPrevMonth, monthDelta,
      newThisWeek, weekDelta,
      weeklyRegs,
      paying, trial:trialCount, cancelled:cancelledCount,
      convRate, mrr,
      streakMax, streakAvg,
      rankDist, langDist,
      riskUsers, riskTotal,
      estudAlerts, capAlerts,
    };
  }

  /* ──────────────────────────────────────────────────────────
     5. LIVE DATA — FETCH session_history
  ────────────────────────────────────────────────────────── */
  function fetchSessionData(sb) {
    var today        = new Date().toISOString().slice(0,10);
    var eightWksAgo  = new Date(Date.now() - 56*86400000).toISOString();

    return Promise.all([
      sb.from('session_history')
        .select('tool, user_id')
        .gte('played_at', today+'T00:00:00')
        .lt('played_at',  today+'T23:59:59'),
      sb.from('session_history')
        .select('played_at, user_id')
        .gte('played_at', eightWksAgo)
        .limit(5000)
    ]).then(function(results){
      var todaySess  = results[0].data || [];
      var weeklySess = results[1].data || [];
      var now = Date.now();

      // Tool usage today
      var toolMap = {};
      for(var i=0;i<todaySess.length;i++){
        var t = todaySess[i].tool;
        toolMap[t] = (toolMap[t]||0)+1;
      }

      // Weekly unique active users (last 8 weeks)
      var buckets = [[],[],[],[],[],[],[],[]];
      for(var i=0;i<weeklySess.length;i++){
        var s = weeklySess[i];
        var daysAgo = (now - new Date(s.played_at).getTime()) / 86400000;
        var wk = Math.floor(daysAgo/7);
        if(wk>=0 && wk<8) buckets[7-wk].push(s.user_id);
      }
      var weeklyActive = buckets.map(function(bucket){
        var seen = {};
        for(var i=0;i<bucket.length;i++) seen[bucket[i]]=1;
        return Object.keys(seen).length;
      });

      return { toolMap:toolMap, weeklyActive:weeklyActive };
    });
  }

  /* ──────────────────────────────────────────────────────────
     6. RENDER — CAPTACIÓN
  ────────────────────────────────────────────────────────── */
  function renderCaptacion(live) {
    var html = '';

    // 00 — Alerts
    html += sec('00 / Captación','Alertas automáticas','Lo que necesita tu atención ahora mismo, en palabras simples.',
      '<div class="ep-alerts">'+live.capAlerts.map(function(a){
        var cls = a.sev==='red'?'red':a.sev==='amber'?'amber':'green';
        return '<div class="ep-alert '+cls+'">'+
          '<div class="ep-a-ico">'+(a.sev==='green'?'✓':'!')+'</div>'+
          '<div class="ep-a-body"><div class="ep-a-txt">'+a.txt+'</div><div class="ep-a-rev">Qué hacer: '+a.rev+'</div></div>'+
          '<div class="ep-a-tag">'+a.tag+'</div>'+
        '</div>';
      }).join('')+'</div>');

    // 01 — Real: registrations
    html += sec('01','¿Cuántas personas se están registrando?','Datos reales en vivo de tu base de datos.',
      '<div class="ep-grid ep-g4">'+
        metricCard({label:'Registros este mes', val:live.newThisMonth, delta:live.monthDelta})+
        metricCard({label:'Registros esta semana', val:live.newThisWeek, delta:live.weekDelta})+
        metricCard({label:'Total de cuentas creadas', val:live.total, sub:'desde el inicio'})+
        metricCard({label:'Registros el mes anterior', val:live.newPrevMonth, sub:'referencia comparativa'})+
      '</div>');

    // 02 — Real: weekly registration trend
    var weekLabels = ['S-7','S-6','S-5','S-4','S-3','S-2','S-1','Esta'];
    html += sec('02','Crecimiento semana a semana','Nuevas cuentas en las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">'+
        lineChart(weekLabels,
          {name:'Nuevos registros', color:'#c4ff3d', data:live.weeklyRegs},
          {name:'Semana anterior (referencia)', color:'rgba(255,255,255,.15)',
           data:live.weeklyRegs.slice(0,7).concat(live.weeklyRegs[6]||0)}
        )+
      '</div>');

    // 03 — Funnel: visits → registration (GA4 installed, data in GA4 dashboard)
    html += sec('03','Embudo: de visita a registro','Registros reales desde tu base de datos. Las visitas totales están en Google Analytics.',
      '<div class="ep-grid ep-g4">'+
        metricCard({label:'Registros este mes', val:live.newThisMonth, delta:live.monthDelta})+
        metricCard({label:'Registros esta semana', val:live.newThisWeek, delta:live.weekDelta})+
        metricCard({label:'Total cuentas', val:live.total, sub:'desde el inicio'})+
        metricCard({label:'De pago', val:live.paying, sub:'han comprado al menos una vez'})+
      '</div>'+
      '<div class="ep-alert amber" style="margin-top:12px"><div class="ep-a-ico">i</div><div class="ep-a-body"><div class="ep-a-txt">Google Analytics 4 ya está instalado en todas tus páginas. Las métricas de visitas, tasa de conversión y rebote las puedes ver en <a href="https://analytics.google.com" target="_blank" style="color:inherit">analytics.google.com</a>.</div></div></div>'
    );

    // 04 — Real: traffic sources from UTM data in profiles
    var totalWithUtm = live.utmSources.filter(function(s){return s.name!=='directo';}).reduce(function(a,b){return a+b.count;},0);
    var totalUsers = live.total || 1;
    html += sec('04','¿De dónde viene la gente?','Fuente de origen registrada en el momento del registro (UTM).',
      (live.utmSources.length === 0 || (live.utmSources.length === 1 && live.utmSources[0].name === 'directo') ?
        '<div class="ep-alert amber"><div class="ep-a-ico">i</div><div class="ep-a-body"><div class="ep-a-txt">Aún no hay registros con parámetros UTM. Agrega <strong>?utm_source=instagram</strong> al final de tus enlaces en redes sociales para empezar a ver datos aquí.</div></div></div>' :
        barList(live.utmSources.map(function(s){return {label:s.name, val:s.count, pct:Math.round(s.count/totalUsers*100)};}))
      )+
      (live.utmCampaigns.length > 0 ?
        '<div style="margin-top:16px"><div class="ep-section-sub">Campañas</div>'+
        barList(live.utmCampaigns.map(function(s){return {label:s.name, val:s.count, pct:Math.round(s.count/totalUsers*100));}}))+'</div>' : ''
      )
    );

    // 05 — Devices (GA4)
    html += sec('05','¿Desde qué dispositivo entran?','Celular vs computador.',
      '<div class="ep-alert green"><div class="ep-a-ico">✓</div><div class="ep-a-body"><div class="ep-a-txt">Google Analytics 4 ya está instalado y detecta dispositivos automáticamente. Ve los datos en <a href="https://analytics.google.com" target="_blank" style="color:inherit">analytics.google.com → Informes → Tecnología → Descripción general</a>.</div></div></div>'
    );

    // 06 — Time on page (GA4)
    html += sec('06','¿Cuánto tiempo duran en la landing?','Tiempo de sesión y tasa de rebote.',
      '<div class="ep-alert green"><div class="ep-a-ico">✓</div><div class="ep-a-body"><div class="ep-a-txt">Google Analytics 4 mide el tiempo en página automáticamente. Revisa <a href="https://analytics.google.com" target="_blank" style="color:inherit">analytics.google.com → Informes → Participación → Páginas y pantallas</a>.</div></div></div>'
    );

    // 07 — Rank + language distribution
    html += sec('07','Distribución de la comunidad','Por rango y por idioma que estudian.',
      '<div class="ep-dist-grid">'+
        '<div class="ep-card" style="padding:24px">'+
          '<div class="ep-card-h"><b>Por rango</b><span class="ep-pill-note">'+f(live.rankDist.reduce(function(a,x){return a+x.val;},0))+' estudiantes</span></div>'+
          barList(live.rankDist,{showPct:true})+
        '</div>'+
        '<div class="ep-card" style="padding:24px">'+
          '<div class="ep-card-h"><b>Por idioma que estudian</b></div>'+
          barList(live.langDist,{showPct:true})+
        '</div>'+
      '</div>');

    // 08 — Weekly trend
    var weekLabels = ['S-7','S-6','S-5','S-4','S-3','S-2','S-1','Esta'];
    var hasActivity = sessionData && sessionData.weeklyActive.some(function(v){return v>0;});
    html += sec('08','Actividad semana a semana','Usuarios activos y nuevos registros en las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">'+
        lineChart(weekLabels,
          hasActivity
            ? {name:'Usuarios activos', color:'#c4ff3d', data:sessionData.weeklyActive}
            : {name:'Nuevos registros', color:'#c4ff3d', data:live.weeklyRegs},
          {name:'Nuevos registros', color:'#d59bff', data:live.weeklyRegs}
        )+
      '</div>');

    return html;
  }

  /* ──────────────────────────────────────────────────────────
     8. STATE + LOADING
  ────────────────────────────────────────────────────────── */
  var state = { view:'captacion', live:null, sessionData:null };

  function renderLoading() {
    var root    = document.getElementById('stats-root');
    var content = root && root.querySelector('.est-content');
    if(content) content.innerHTML = '<div class="ep-loading"><div class="ep-spinner"></div>Cargando estadísticas en vivo…</div>';
  }

  function renderPanel() {
    var root    = document.getElementById('stats-root');
    if(!root) return;
    var content = root.querySelector('.est-content');
    if(!content) return;
    if(!state.live){ renderLoading(); return; }
    content.innerHTML = state.view==='captacion'
      ? renderCaptacion(state.live)
      : renderEstudiantes(state.live, state.sessionData);
  }

  function loadLiveData() {
    var sb    = window._aura && window._aura.sb;
    var users = window.allUsers;

    if(!sb || !users || !users.length){
      // Retry once after 1.5s in case allUsers hasn't loaded yet
      setTimeout(function(){
        sb    = window._aura && window._aura.sb;
        users = window.allUsers;
        if(!sb || !users || !users.length){
          var root    = document.getElementById('stats-root');
          var content = root && root.querySelector('.est-content');
          if(content) content.innerHTML = '<div style="padding:40px;text-align:center;color:var(--ep-txt3);font-size:14px">No hay datos disponibles aún. Intenta actualizar en unos segundos.</div>';
          return;
        }
        _doLoad(sb, users);
      }, 1500);
      renderLoading();
      return;
    }
    _doLoad(sb, users);
  }

  function _doLoad(sb, users) {
    // Compute from profiles synchronously → render immediately
    state.live = computeFromProfiles(users);
    renderPanel();

    // Then fetch session_history async → re-render with richer data
    fetchSessionData(sb).then(function(sessionData){
      state.sessionData = sessionData;
      renderPanel();
    }).catch(function(e){
      console.warn('[estadisticas] session_history fetch error:', e);
    });
  }

  /* ──────────────────────────────────────────────────────────
     9. SHELL
  ────────────────────────────────────────────────────────── */
  function buildShell() {
    var root = document.getElementById('stats-root');
    if(!root || root.dataset.built) return;
    root.dataset.built = '1';
    root.className     = 'est-panel';
    root.innerHTML =
      '<div class="est-controls">'+
        '<div class="est-seg" id="ep-viewSeg">'+
          '<button data-view="captacion" class="on">Captación</button>'+
          '<button data-view="estudiantes">Estudiantes</button>'+
        '</div>'+
        '<div class="est-spacer"></div>'+
        '<button class="ep-refresh-btn" id="ep-refreshBtn">↻ Actualizar</button>'+
      '</div>'+
      '<div class="est-content"></div>';

    document.getElementById('ep-viewSeg').addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b || !b.dataset.view) return;
      state.view = b.dataset.view;
      document.querySelectorAll('#ep-viewSeg button').forEach(function(x){ x.classList.toggle('on', x===b); });
      renderPanel();
    });

    document.getElementById('ep-refreshBtn').addEventListener('click', function(){
      state.live = null;
      state.sessionData = null;
      loadLiveData();
    });
  }

  /* ──────────────────────────────────────────────────────────
     10. PUBLIC INIT
  ────────────────────────────────────────────────────────── */
  window.initEstadisticas = function(){
    injectCSS();
    buildShell();
    loadLiveData();
  };

})();
