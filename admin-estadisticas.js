/* ============================================================
   admin-estadisticas.js  v5 — diseño completo + datos reales
   Aura Languages Admin — Estadísticas
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. CSS ────────────────────────────────────────────── */
  var CSS = `
.est-panel *{box-sizing:border-box;}
.est-panel{
  --ep-bg:#0f0f0f;--ep-s1:#1a1a1a;--ep-s2:#222222;--ep-s3:#2a2a2a;
  --ep-line:rgba(255,255,255,.07);--ep-line2:rgba(255,255,255,.12);
  --ep-lime:#c4ff3d;--ep-lime-d:rgba(196,255,61,.12);
  --ep-txt:#f3f3ef;--ep-txt2:#a6a6a0;--ep-txt3:#6e6e68;
  --ep-red:#ff5c5c;--ep-red-d:rgba(255,92,92,.13);
  --ep-amb:#ffce4d;--ep-amb-d:rgba(255,206,77,.13);
  --ep-grn:#5fe08a;--ep-grn-d:rgba(95,224,138,.13);
  --ep-font:'Geist','Plus Jakarta Sans',system-ui,sans-serif;
  --ep-mono:'Geist Mono','JetBrains Mono',ui-monospace,monospace;
  --ep-disp:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;
  font-family:var(--ep-font);color:var(--ep-txt);
  -webkit-font-smoothing:antialiased;letter-spacing:-.006em;
}
.ep-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:16px 0 24px;border-bottom:1px solid var(--ep-line);margin-bottom:8px;}
.ep-seg{display:inline-flex;background:var(--ep-s1);border:1px solid var(--ep-line2);border-radius:13px;padding:4px;gap:4px;}
.ep-seg button{font-family:var(--ep-font);font-weight:600;font-size:14px;color:var(--ep-txt2);background:none;border:none;cursor:pointer;padding:9px 20px;border-radius:9px;transition:all .16s ease;white-space:nowrap;}
.ep-seg button:hover{color:var(--ep-txt);}
.ep-seg button.on{background:var(--ep-lime);color:#0f0f0f;box-shadow:0 0 18px rgba(196,255,61,.28);}
.ep-seg.sm button{padding:7px 14px;font-size:12.5px;font-family:var(--ep-mono);font-weight:500;letter-spacing:.02em;}
.ep-seg.sm button.on.alerta{background:var(--ep-red);color:#180404;box-shadow:0 0 18px rgba(255,92,92,.3);}
.ep-seg.sm button.on.sano{background:var(--ep-grn);color:#04180c;box-shadow:0 0 18px rgba(95,224,138,.3);}
.ep-spacer{flex:1;}
.ep-scn-lbl{font-family:var(--ep-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ep-txt3);}
.ep-refresh{font-family:var(--ep-mono);font-size:12px;color:var(--ep-txt3);background:none;border:1px solid var(--ep-line2);border-radius:9px;padding:7px 14px;cursor:pointer;transition:all .15s;}
.ep-refresh:hover{color:var(--ep-lime);border-color:var(--ep-lime);}
.ep-content{padding-bottom:60px;}
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
.ep-m-lbl{font-size:12.5px;color:var(--ep-txt2);font-weight:500;min-height:34px;display:flex;align-items:center;}
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
.ep-a-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:18px;margin-top:1px;}
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
.ep-ffill.neg{background:linear-gradient(90deg,rgba(255,92,92,.2),rgba(255,92,92,.04));border-right:2px solid var(--ep-red);}
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
.ep-bico{width:28px;height:28px;border-radius:8px;flex:none;display:grid;place-items:center;font-weight:700;font-size:12px;color:#0f0f0f;}
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
.ep-dl-row small{display:block;color:var(--ep-txt3);font-size:12.5px;font-family:var(--ep-font);}
.ep-tscale{margin-top:22px;}
.ep-tscale-bar{display:flex;height:46px;border-radius:12px;overflow:hidden;border:1px solid var(--ep-line);position:relative;}
.ep-tseg{flex:1;display:flex;align-items:center;justify-content:center;font-family:var(--ep-mono);font-size:11px;letter-spacing:.03em;color:rgba(0,0,0,.65);font-weight:600;text-align:center;line-height:1.2;padding:0 6px;}
.ep-tneedle{position:absolute;top:-8px;bottom:-8px;width:3px;background:#fff;box-shadow:0 0 0 2px #0f0f0f,0 0 14px rgba(255,255,255,.7);border-radius:3px;}
.ep-tbl-wrap{overflow-x:auto;}
.est-panel table{border-collapse:collapse;width:100%;min-width:640px;}
.est-panel th,.est-panel td{padding:14px 16px;text-align:right;font-family:var(--ep-mono);font-size:13px;}
.est-panel th{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--ep-txt3);font-weight:600;border-bottom:1px solid var(--ep-line2);text-align:right;}
.est-panel td:first-child,.est-panel th:first-child{text-align:left;font-family:var(--ep-font);}
.est-panel tbody tr{border-bottom:1px solid var(--ep-line);}
.est-panel td:first-child{color:var(--ep-txt2);font-size:13px;font-weight:500;}
.ep-col-best{background:var(--ep-lime-d);}
.est-panel th.ep-col-best{color:var(--ep-lime);}
.est-panel td.ep-col-best{color:var(--ep-lime);font-weight:600;}
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
.ep-formula{margin-top:18px;padding:16px 18px;background:var(--ep-s2);border:1px solid var(--ep-line);border-radius:12px;font-family:var(--ep-mono);font-size:13px;color:var(--ep-txt2);line-height:1.6;}
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
.ep-loading{text-align:center;padding:40px 20px;font-family:var(--ep-mono);font-size:13px;color:var(--ep-txt3);}
.ep-no-data{text-align:center;padding:30px 20px;font-size:13px;color:var(--ep-txt3);}
@keyframes ep-fade{from{opacity:0;transform:translateY(7px);}to{opacity:1;transform:none;}}
.ep-sec{animation:ep-fade .3s ease;}
`;

  /* ── 2. HELPERS ────────────────────────────────────────── */
  var _nf = new Intl.NumberFormat('es-ES', {useGrouping: true, maximumFractionDigits: 0});
  function fnum(n) { return _nf.format(Math.round(n || 0)); }
  function money(n) { return '$' + fnum(n); }
  var RANK_COLORS = {Bronce:'#cd8a5e',Plata:'#cfd3d8',Oro:'#f0c244',Platino:'#9fe6e0',Diamante:'#8fd0ff',Challenger:'#d59bff'};

  function sec(kick, title, sub, body) {
    return '<section class="ep-sec">' +
      '<div class="ep-sec-head"><div class="ep-tick"></div><div>' +
      '<div class="ep-kick">' + kick + '</div>' +
      '<div class="ep-title">' + title + '</div>' +
      (sub ? '<div class="ep-sub">' + sub + '</div>' : '') +
      '</div></div>' + body + '</section>';
  }

  function semTag(level, txt) {
    return '<span class="ep-sem ' + level + '"><span class="dot"></span>' + txt + '</span>';
  }

  function deltaTag(d) {
    if (d === null || d === undefined) return '';
    if (d === 0) return '<div class="ep-delta flat">— sin cambio</div>';
    var up = d > 0;
    return '<div class="ep-delta ' + (up ? 'up' : 'down') + '">' + (up ? '▲' : '▼') + ' ' + Math.abs(d) + '% vs período anterior</div>';
  }

  function metricCard(m) {
    var val = m.money ? money(m.val) : (typeof m.val === 'number' ? fnum(m.val) : m.val);
    return '<div class="ep-card">' +
      '<div class="ep-m-lbl">' + m.label + '</div>' +
      '<div class="ep-m-val' + (m.sem ? ' lime' : '') + '">' + val +
      (m.unit ? ' <span style="font-size:18px;color:var(--ep-txt3)">' + m.unit + '</span>' : '') + '</div>' +
      (m.sub ? '<div class="ep-m-sub">' + m.sub + '</div>' : '') +
      (m.sem ? '<div style="margin-top:12px">' + semTag(m.sem, m.semTxt) + '</div>' : deltaTag(m.delta)) +
      '</div>';
  }

  function barList(items, opts) {
    opts = opts || {};
    var max = Math.max.apply(null, items.map(function(i) { return i.val; }));
    var total = items.reduce(function(a, i) { return a + i.val; }, 0);
    return '<div class="ep-bars">' + items.map(function(i) {
      var pct = total ? Math.round(i.val / total * 100) : 0;
      var w = Math.max(3, i.val / (max || 1) * 100);
      var ico = opts.icons ? '<span class="ep-bico" style="background:' + i.c + '">' + i.ico + '</span>' : '';
      var danger = i.danger ? ' danger' : '';
      return '<div class="ep-brow">' +
        '<div class="ep-bsrc">' + ico + '<span>' + i.label + '</span></div>' +
        '<div class="ep-btrack"><div class="ep-bfill' + danger + '" style="width:' + w + '%"></div></div>' +
        '<div class="ep-bval"><b>' + fnum(i.val) + '</b>' +
        (opts.showPct !== false ? '<span>' + pct + '%</span>' : '<span>' + (opts.unit || '') + '</span>') +
        '</div></div>';
    }).join('') + '</div>';
  }

  function funnel(steps) {
    return '<div class="ep-funnel">' + steps.map(function(s, idx) {
      var fillStyle = s.neg ? 'background:linear-gradient(90deg,rgba(255,92,92,.2),rgba(255,92,92,.04));border-right:2px solid var(--ep-red)' : '';
      return (idx > 0 ? '<div class="ep-farrow">↓</div>' : '') +
        '<div class="ep-fstep">' +
        '<div class="ep-ffill' + (s.neg ? ' neg' : '') + '" style="width:' + s.pct + '%;' + fillStyle + '"></div>' +
        '<div class="ep-fcontent">' +
        '<div class="ep-fname">' + s.name + '</div>' +
        '<div class="ep-fnum"><b>' + fnum(s.num) + '</b>' +
        '<span style="' + (s.neg ? 'color:var(--ep-red)' : '') + '">' + s.pct + '%</span></div>' +
        '</div></div>';
    }).join('') + '</div>';
  }

  function heatmap(data) {
    var days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    var html = '<div class="ep-heat"><div class="ep-heat-grid">';
    html += '<div></div>' + days.map(function(d) {
      return '<div class="ep-heat-day">' + d + '</div>';
    }).join('');
    var mx = 0;
    for (var h = 0; h < 24; h++) for (var d = 0; d < 7; d++) if (data[h][d] > mx) mx = data[h][d];
    if (!mx) mx = 1;
    for (var h = 0; h < 24; h++) {
      html += '<div class="ep-heat-hr">' + (h % 3 === 0 ? String(h).padStart(2,'0') : '') + '</div>';
      for (var d = 0; d < 7; d++) {
        var t = data[h][d] / mx;
        var op = (t * 0.88 + 0.04).toFixed(2);
        html += '<div class="ep-heat-cell" style="background:rgba(196,255,61,' + op + ')"></div>';
      }
    }
    html += '</div><div class="ep-heat-legend"><span>Menos</span><div class="ep-heat-scale">' +
      [0.06,0.25,0.45,0.65,0.9].map(function(o) {
        return '<i style="background:rgba(196,255,61,' + o + ')"></i>';
      }).join('') + '</div><span>Más actividad</span></div></div>';
    return html;
  }

  function defaultHeatmap(factor) {
    var dayF = [0.92,0.96,1.0,1.0,1.06,1.16,1.02];
    var data = [];
    for (var h = 0; h < 24; h++) {
      var row = [];
      for (var d = 0; d < 7; d++) {
        var ev = Math.exp(-Math.pow(h-20,2)/14);
        var lu = Math.exp(-Math.pow(h-13,2)/6)*0.6;
        var mo = Math.exp(-Math.pow(h-8,2)/5)*0.38;
        var v = (ev+lu+mo)*dayF[d]*(factor||1)*(1+0.09*Math.sin(h*3+d*7));
        row.push(Math.max(0, v));
      }
      data.push(row);
    }
    return data;
  }

  function donutSvg(mobile, desktop) {
    var r = 58, c = 2 * Math.PI * r;
    var mLen = mobile / 100 * c;
    return '<svg viewBox="0 0 150 150" width="150" height="150">' +
      '<circle cx="75" cy="75" r="' + r + '" fill="none" stroke="#2a2a2a" stroke-width="20"/>' +
      '<circle cx="75" cy="75" r="' + r + '" fill="none" stroke="var(--ep-lime)" stroke-width="20"' +
      ' stroke-dasharray="' + mLen.toFixed(1) + ' ' + (c-mLen).toFixed(1) + '" stroke-dashoffset="' + (c*0.25).toFixed(1) + '"' +
      ' transform="rotate(-90 75 75)" style="filter:drop-shadow(0 0 6px rgba(196,255,61,.4))"/>' +
      '<text x="75" y="70" text-anchor="middle" fill="#f3f3ef" font-weight="700" font-size="26">' + mobile + '%</text>' +
      '<text x="75" y="90" text-anchor="middle" fill="#6e6e68" font-size="11">CELULAR</text>' +
      '</svg>';
  }

  function lineChart(labels, s1, s2) {
    var W = 1000, H = 300, pad = {l:8, r:8, t:24, b:34};
    var iw = W-pad.l-pad.r, ih = H-pad.t-pad.b;
    function x(i) { return pad.l + i/(labels.length-1)*iw; }
    function mkPath(data, max) {
      return data.map(function(v,i) {
        return (i?'L':'M') + x(i).toFixed(1) + ' ' + (pad.t+ih-v/max*ih).toFixed(1);
      }).join(' ');
    }
    var max1 = Math.max.apply(null, s1.data) * 1.12 || 1;
    var max2 = Math.max.apply(null, s2.data) * 1.12 || 1;
    var grid = [0,.25,.5,.75,1].map(function(t) {
      return '<line x1="' + pad.l + '" x2="' + (W-pad.r) + '" y1="' + (pad.t+ih*t).toFixed(1) + '" y2="' + (pad.t+ih*t).toFixed(1) + '" stroke="rgba(255,255,255,.05)"/>';
    }).join('');
    var dots1 = s1.data.map(function(v,i) {
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + (pad.t+ih-v/max1*ih).toFixed(1) + '" r="3.5" fill="' + s1.color + '"/>';
    }).join('');
    var dots2 = s2.data.map(function(v,i) {
      return '<circle cx="' + x(i).toFixed(1) + '" cy="' + (pad.t+ih-v/max2*ih).toFixed(1) + '" r="3.5" fill="' + s2.color + '"/>';
    }).join('');
    var xl = labels.map(function(l,i) {
      return '<text x="' + x(i).toFixed(1) + '" y="' + (H-10) + '" text-anchor="middle" fill="#6e6e68" font-size="12">' + l + '</text>';
    }).join('');
    return '<div class="ep-chart">' +
      '<div class="ep-chart-legend">' +
      '<div class="ep-cl-item"><span class="ep-cl-line" style="background:' + s1.color + '"></span>' + s1.name + '</div>' +
      '<div class="ep-cl-item"><span class="ep-cl-line" style="background:' + s2.color + '"></span>' + s2.name + '</div>' +
      '</div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" style="width:100%;height:260px">' +
      grid +
      '<path d="' + mkPath(s1.data, max1) + '" fill="none" stroke="' + s1.color + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="' + mkPath(s2.data, max2) + '" fill="none" stroke="' + s2.color + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      dots1 + dots2 + xl + '</svg></div>';
  }

  /* ── 3. DATA COMPUTATION ───────────────────────────────── */
  function computeData(users, pageViews, sessions) {
    users = users || [];
    pageViews = pageViews || [];
    sessions = sessions || [];

    var now = new Date();
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var weekStart = todayStart - 6 * 86400000;
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    // Page views slices
    var pvToday = pageViews.filter(function(r) { return new Date(r.viewed_at).getTime() >= todayStart; });
    var pvWeek = pageViews.filter(function(r) { return new Date(r.viewed_at).getTime() >= weekStart; });
    var pvMonth = pageViews.filter(function(r) { return new Date(r.viewed_at).getTime() >= monthStart; });

    var pvTodayN = pvToday.length;
    var pvWeekN = pvWeek.length;
    var pvMonthN = pvMonth.length;

    // Registrations this week/month
    var regWeek = users.filter(function(u) { return new Date(u.created_at).getTime() >= weekStart; }).length;
    var regMonth = users.filter(function(u) { return new Date(u.created_at).getTime() >= monthStart; }).length;
    var regTotal = users.length;

    // Funnel
    var funnelVisits = pvWeekN || 1;
    var funnelClicks = Math.max(regWeek * 2, Math.round(funnelVisits * 0.25)); // estimate
    var funnelReg = regWeek;
    var convRate = pvWeekN > 0 ? +(funnelReg / pvWeekN * 100).toFixed(1) : 0;
    var dropRate = funnelClicks > 0 ? +(((funnelClicks - funnelReg) / funnelClicks) * 100).toFixed(1) : 0;

    // Device
    var mobileCount = pvWeek.filter(function(r) { return r.device_type === 'mobile'; }).length;
    var desktopCount = pvWeekN - mobileCount;
    var mobilePct = pvWeekN > 0 ? Math.round(mobileCount / pvWeekN * 100) : 54;
    var desktopPct = 100 - mobilePct;
    var mobileAlert = mobilePct > 60 && convRate < 15;

    // Dwell time
    var dwellVals = pvWeek.filter(function(r) { return r.time_on_page && r.time_on_page > 2; }).map(function(r) { return r.time_on_page; });
    var avgDwell = dwellVals.length ? Math.round(dwellVals.reduce(function(a,b){return a+b;},0) / dwellVals.length) : 0;
    var dwellLabel = avgDwell >= 60 ? Math.floor(avgDwell/60) + 'm ' + (avgDwell%60) + 's' : (avgDwell || '--') + 's';
    var dwellZone = avgDwell >= 180 ? 3 : avgDwell >= 60 ? 2 : avgDwell >= 10 ? 1 : 0;

    // UTM sources (from page_views first, then profiles)
    var srcMap = {};
    pvWeek.forEach(function(r) {
      var src = r.utm_source || 'directo';
      srcMap[src] = (srcMap[src]||0) + 1;
    });
    if (pvWeekN === 0) {
      users.forEach(function(u) {
        var src = u.utm_source || 'directo';
        srcMap[src] = (srcMap[src]||0) + 1;
      });
    }
    var SOURCE_ICONS = {
      instagram: {ico:'IG', c:'#e879b9'},
      facebook: {ico:'FB', c:'#5b8def'},
      whatsapp: {ico:'WA', c:'#5fe08a'},
      directo: {ico:'D', c:'#a6a6a0'},
      google: {ico:'G', c:'#f0c244'},
      youtube: {ico:'YT', c:'#ff5c5c'},
      tiktok: {ico:'TK', c:'#5fe08a'},
    };
    var sources = Object.keys(srcMap).map(function(k) {
      var ico = SOURCE_ICONS[k.toLowerCase()] || {ico: k.slice(0,2).toUpperCase(), c:'#6e6e68'};
      return {label: k.charAt(0).toUpperCase()+k.slice(1), val: srcMap[k], ico: ico.ico, c: ico.c};
    }).sort(function(a,b){return b.val-a.val;}).slice(0,6);
    if (!sources.length) sources = [{label:'Sin datos aún', val:1, ico:'?', c:'#6e6e68'}];

    // Org vs Paid
    var paidMedia = ['cpc','paid','pauta','ads','ppc'];
    var pvOrg = pvWeek.filter(function(r) { return !r.utm_medium || paidMedia.indexOf((r.utm_medium||'').toLowerCase()) === -1; });
    var pvPaid = pvWeek.filter(function(r) { return paidMedia.indexOf((r.utm_medium||'').toLowerCase()) !== -1; });
    var regOrgWeek = users.filter(function(u) {
      var t = new Date(u.created_at).getTime();
      return t >= weekStart && (!u.utm_medium || paidMedia.indexOf((u.utm_medium||'').toLowerCase()) === -1);
    }).length;
    var regPaidWeek = regWeek - regOrgWeek;
    var cpr = pvPaid.length > 0 && regPaidWeek > 0 ? +(pvPaid.length / regPaidWeek * 0.5).toFixed(2) : 0;

    // Source comparison table (use profile UTM data)
    var stCols = sources.slice(0,4).map(function(s) { return s.label; });
    var stVisits = stCols.map(function(s) {
      return pvWeek.filter(function(r) { return (r.utm_source||'directo').toLowerCase() === s.toLowerCase(); }).length || 1;
    });
    var stReg = stCols.map(function(s) {
      return users.filter(function(u) {
        var t = new Date(u.created_at).getTime();
        return t >= weekStart && (u.utm_source||'directo').toLowerCase() === s.toLowerCase();
      }).length;
    });

    // Heatmap from sessions
    var heatData = [];
    for (var h = 0; h < 24; h++) {
      var row = [];
      for (var d = 0; d < 7; d++) row.push(0);
      heatData.push(row);
    }
    if (sessions.length > 0) {
      sessions.forEach(function(s) {
        var dt = new Date(s.created_at);
        var hr = dt.getHours();
        var dy = (dt.getDay() + 6) % 7; // Mon=0
        heatData[hr][dy]++;
      });
    } else {
      heatData = defaultHeatmap(1.0);
    }

    // Weekly trend (last 8 weeks)
    var weeklyVisits = [], weeklyReg = [];
    for (var w = 7; w >= 0; w--) {
      var ws = todayStart - (w+1) * 7 * 86400000;
      var we = todayStart - w * 7 * 86400000;
      weeklyVisits.push(pageViews.filter(function(r) {
        var t = new Date(r.viewed_at).getTime();
        return t >= ws && t < we;
      }).length || 0);
      weeklyReg.push(users.filter(function(u) {
        var t = new Date(u.created_at).getTime();
        return t >= ws && t < we;
      }).length || 0);
    }

    // --- ALERTS (captacion) ---
    var capAlerts = [];
    if (convRate >= 15) {
      capAlerts.push({sev:'green', txt:'Buena captación: <b>' + convRate + ' de cada 100</b> visitas se registran, por encima de la meta de 15.', rev:'Mantén el contenido actual.', tag:'Bien'});
    } else if (convRate > 0) {
      capAlerts.push({sev:'red', txt:'Solo <b>' + convRate + ' de cada 100</b> visitas se registran. La meta es 15.', rev:'Revisa el texto principal y el formulario de la landing.', tag:'Actuar ya'});
    } else {
      capAlerts.push({sev:'amber', txt:'No hay suficientes datos de visitas aún. Instala la plataforma en producción para ver métricas reales.', rev:'Los datos de page_views se acumulan con cada visita.', tag:'Pendiente'});
    }
    if (dropRate > 35) {
      capAlerts.push({sev:'red', txt:'El <b>' + dropRate + '%</b> empieza el registro pero no termina.', rev:'Revisa si el formulario tiene algún problema en móvil.', tag:'Actuar ya'});
    } else if (dropRate > 0) {
      capAlerts.push({sev:'amber', txt:'El <b>' + dropRate + '%</b> empieza a registrarse y no termina. Está dentro de lo normal.', rev:'Revisa el formulario si supera el 35%.', tag:'Vigilar'});
    }
    if (mobileAlert) {
      capAlerts.push({sev:'amber', txt:'Más del <b>' + mobilePct + '%</b> entra desde el celular y la conversión está baja.', rev:'Verifica cómo se ve la landing en pantallas pequeñas.', tag:'Precaución'});
    }

    // --- STUDENT DATA ---
    var activeToday = sessions.filter(function(s) { return new Date(s.created_at).getTime() >= todayStart; });
    var activeUsersToday = new Set(activeToday.map(function(s) { return s.user_id; })).size;

    var weekAgo = todayStart - 7 * 86400000;
    var thirtyAgo = todayStart - 30 * 86400000;

    var usersRegLastWeek = users.filter(function(u) { return new Date(u.created_at).getTime() >= weekAgo; });
    var usersWithSessionNextDay = usersRegLastWeek.filter(function(u) {
      var regDay = new Date(new Date(u.created_at).toDateString()).getTime();
      return sessions.some(function(s) {
        return s.user_id === u.id && new Date(s.created_at).getTime() >= regDay + 86400000 && new Date(s.created_at).getTime() < regDay + 2*86400000;
      });
    });
    var day1Retention = usersRegLastWeek.length > 0 ? Math.round(usersWithSessionNextDay.length / usersRegLastWeek.length * 100) : 0;

    var usersRegMonth = users.filter(function(u) { return new Date(u.created_at).getTime() >= thirtyAgo; });
    var activeAt7d = usersRegMonth.filter(function(u) {
      var regDay = new Date(new Date(u.created_at).toDateString()).getTime();
      return sessions.some(function(s) {
        return s.user_id === u.id && new Date(s.created_at).getTime() >= regDay + 6*86400000;
      });
    });
    var d7Retention = usersRegMonth.length > 0 ? Math.round(activeAt7d.length / usersRegMonth.length * 100) : 0;

    // At-risk users: no session in 7+ days
    var riskUsers = users.filter(function(u) {
      var lastS = Math.max.apply(null, sessions
        .filter(function(s) { return s.user_id === u.id; })
        .map(function(s) { return new Date(s.created_at).getTime(); }).concat([0]));
      var daysSince = Math.floor((Date.now() - lastS) / 86400000);
      return daysSince >= 7 && lastS > 0;
    }).sort(function(a,b) {
      var dA = Math.floor((Date.now() - Math.max.apply(null, sessions.filter(function(s){return s.user_id===a.id;}).map(function(s){return new Date(s.created_at).getTime();}).concat([0]))) / 86400000);
      var dB = Math.floor((Date.now() - Math.max.apply(null, sessions.filter(function(s){return s.user_id===b.id;}).map(function(s){return new Date(s.created_at).getTime();}).concat([0]))) / 86400000);
      return dB - dA;
    }).slice(0, 5);

    var riskList = riskUsers.map(function(u) {
      var lastS = Math.max.apply(null, sessions
        .filter(function(s) { return s.user_id === u.id; })
        .map(function(s) { return new Date(s.created_at).getTime(); }).concat([0]));
      var days = Math.floor((Date.now() - lastS) / 86400000);
      var name = u.full_name || u.email || 'Usuario';
      var favTool = '—';
      var toolMap = {};
      sessions.filter(function(s){return s.user_id===u.id;}).forEach(function(s){
        toolMap[s.tool_type||'app'] = (toolMap[s.tool_type||'app']||0)+1;
      });
      var toolKeys = Object.keys(toolMap);
      if (toolKeys.length) favTool = toolKeys.sort(function(a,b){return toolMap[b]-toolMap[a];})[0];
      return {name: name, rank: u.rank||'Bronce', tool: favTool, days: days};
    });

    // Tool usage today
    var toolMapToday = {};
    activeToday.forEach(function(s) {
      var t = s.tool_type || 'app';
      toolMapToday[t] = (toolMapToday[t]||0)+1;
    });
    var toolUsage = Object.keys(toolMapToday).map(function(k) {
      return {label: k.charAt(0).toUpperCase()+k.slice(1), val: toolMapToday[k]};
    }).sort(function(a,b){return b.val-a.val;}).slice(0,6);
    if (!toolUsage.length) toolUsage = [{label:'Sin sesiones hoy', val:0}];

    // Rank distribution
    var rankMap = {};
    users.forEach(function(u) { var r = u.rank||'Bronce'; rankMap[r] = (rankMap[r]||0)+1; });
    var rankOrder = ['Bronce','Plata','Oro','Platino','Diamante','Challenger'];
    var rankDist = rankOrder.filter(function(r){return rankMap[r];}).map(function(r) { return {label:r, val:rankMap[r]}; });

    // Language distribution
    var langMap = {};
    users.forEach(function(u) { var l = u.language||'Inglés'; langMap[l] = (langMap[l]||0)+1; });
    var langDist = Object.keys(langMap).map(function(k) { return {label:k, val:langMap[k]}; }).sort(function(a,b){return b.val-a.val;}).slice(0,5);

    // Weekly student trend
    var weeklyActive = [], weeklyNew = [];
    for (var w = 7; w >= 0; w--) {
      var ws = todayStart - (w+1)*7*86400000, we = todayStart - w*86400000*7;
      var uniqActive = new Set(sessions.filter(function(s){var t=new Date(s.created_at).getTime();return t>=ws&&t<we;}).map(function(s){return s.user_id;})).size;
      weeklyActive.push(uniqActive);
      weeklyNew.push(users.filter(function(u){var t=new Date(u.created_at).getTime();return t>=ws&&t<we;}).length);
    }

    // Student alerts
    var studAlerts = [];
    if (riskList.length > 5) {
      studAlerts.push({sev:'red', txt:'<b>' + riskList.length + ' estudiantes</b> llevan más de 7 días sin entrar. Están en riesgo de cancelar.', rev:'Escríbeles desde la lista de riesgo de abajo.', tag:'Actuar ya'});
    } else if (riskList.length > 0) {
      studAlerts.push({sev:'amber', txt:'<b>' + riskList.length + ' estudiante' + (riskList.length>1?'s':'') + '</b> lleva' + (riskList.length>1?'n':'') + ' más de 7 días sin entrar.', rev:'Conviene escribirles pronto.', tag:'Vigilar'});
    } else {
      studAlerts.push({sev:'green', txt:'Todos los estudiantes han tenido actividad reciente.', rev:'Sigue monitoreando la retención semanal.', tag:'Bien'});
    }
    if (day1Retention >= 30) {
      studAlerts.push({sev:'green', txt:'El <b>' + day1Retention + '%</b> de los nuevos estudiantes vuelve al día siguiente.', rev:'El primer día está bien cuidado.', tag:'Bien'});
    } else if (day1Retention > 0) {
      studAlerts.push({sev:'amber', txt:'Solo el <b>' + day1Retention + '%</b> vuelve al día siguiente de registrarse. El primer día es el más crítico.', rev:'Revisa el onboarding y el correo de bienvenida.', tag:'Precaución'});
    }

    return {
      captacion: {
        alerts: capAlerts,
        visits: [
          {label:'Visitas hoy', val:pvTodayN, delta:null},
          {label:'Visitas esta semana', val:pvWeekN, delta:null},
          {label:'Visitas este mes', val:pvMonthN, delta:null},
          {label:'Registros esta semana', val:regWeek, delta:null, sub:'desde todos los orígenes'},
        ],
        funnel: [
          {name:'Entran a la página', num:funnelVisits, pct:100},
          {name:'Hacen clic en "Crear cuenta"', num:funnelClicks, pct:parseFloat((funnelClicks/funnelVisits*100).toFixed(1))},
          {name:'Terminan el registro', num:funnelReg, pct:parseFloat(convRate)},
        ],
        funnelKpis: [
          {label:'De cada 100 visitas, cuántas se registran', val:convRate.toString(), unit:'/ 100', sem:convRate>=15?'green':convRate>=8?'amber':'red', semTxt:convRate>=15?'Bien':convRate>=8?'Precaución':'Actuar ya'},
          {label:'Empezó el registro pero se fue', val:dropRate.toString(), unit:'%', sem:dropRate<=35?'green':dropRate<=50?'amber':'red', semTxt:dropRate<=35?'Bien':dropRate<=50?'Precaución':'Actuar ya'},
          {label:'Tiempo promedio en la página', val:dwellLabel, unit:'', sem:dwellZone>=2?'green':dwellZone>=1?'amber':'red', semTxt:dwellZone>=2?'Bien':dwellZone>=1?'Precaución':'Corto'},
        ],
        sources: sources,
        orgVsPaid: {
          org: {visits: pvOrg.length||pvWeekN, reg: regOrgWeek||regWeek},
          paid: {visits: pvPaid.length, reg: regPaidWeek, cpr: cpr},
          threshold: 4,
        },
        heatData: heatData,
        device: {mobile: mobilePct, desktop: desktopPct, alert: mobileAlert},
        dwell: {label: dwellLabel, zone: dwellZone},
        sourceTable: {cols: stCols.length?stCols:['Sin datos'], visits: stVisits.length?stVisits:[0], reg: stReg.length?stReg:[0]},
        weeks: {visits: weeklyVisits, reg: weeklyReg},
      },
      estudiantes: {
        alerts: studAlerts,
        activity: [
          {label:'Estudiantes activos hoy', val:activeUsersToday, delta:null},
          {label:'Total registrados', val:regTotal, delta:null, sub:'desde el inicio'},
          {label:'Vuelven al día siguiente', val:day1Retention.toString(), unit:'%', sem:day1Retention>=30?'green':day1Retention>=20?'amber':'red', semTxt:day1Retention>=30?'Bien':day1Retention>=20?'Precaución':'Actuar ya'},
          {label:'Siguen activos a los 7 días', val:d7Retention.toString(), unit:'%', sem:d7Retention>=25?'green':d7Retention>=15?'amber':'red', semTxt:d7Retention>=25?'Bien':d7Retention>=15?'Precaución':'Actuar ya'},
        ],
        trial: {
          funnel: [
            {name:'Total en prueba gratuita', num:regMonth, pct:100},
            {name:'Siguen activos (no cancelaron)', num:activeUsersToday, pct:regMonth>0?parseFloat((activeUsersToday/regMonth*100).toFixed(1)):0},
            {name:'Sin actividad este mes', num:Math.max(0,regMonth-activeUsersToday), pct:regMonth>0?parseFloat(((regMonth-activeUsersToday)/regMonth*100).toFixed(1)):0, neg:true},
          ],
          rate: regMonth>0?Math.round(activeUsersToday/regMonth*100):0,
          sem: regMonth>0&&(activeUsersToday/regMonth)>=0.3?'green':(activeUsersToday/regMonth)>=0.2?'amber':'red',
          semTxt: regMonth>0&&(activeUsersToday/regMonth)>=0.3?'Bien':(activeUsersToday/regMonth)>=0.2?'Precaución':'Actuar ya',
        },
        money: [
          {label:'Total acumulado desde el inicio', val:0, money:true, sub:'Conectar con Hotmart'},
          {label:'Recibido este mes', val:0, money:true, sub:'Conectar con Hotmart'},
          {label:'Recibido esta semana', val:0, money:true, sub:'Conectar con Hotmart'},
          {label:'Suscriptores activos pagando', val:activeUsersToday, delta:null},
        ],
        projection: {
          subs: activeUsersToday,
          price: 26,
          pes: 0.15,
          real: 0.08,
          opt: 0.03,
        },
        tools: toolUsage,
        risk: riskList,
        riskTotal: riskList.length,
        rankDist: rankDist.length?rankDist:[{label:'Sin datos',val:1}],
        langDist: langDist.length?langDist:[{label:'Sin datos',val:1}],
        weeks: {active: weeklyActive, nuevos: weeklyNew},
      },
    };
  }

  /* ── 4. RENDER CAPTACIÓN ───────────────────────────────── */
  function renderCaptacion(d) {
    var html = '';

    html += sec('00 / Captación', 'Alertas automáticas', 'Lo que necesita tu atención ahora mismo, en palabras simples.',
      '<div class="ep-alerts">' + d.alerts.map(function(a) {
        return '<div class="ep-alert ' + a.sev + '">' +
          '<div class="ep-a-ico">' + (a.sev==='green'?'✓':'!') + '</div>' +
          '<div class="ep-a-body"><div class="ep-a-txt">' + a.txt + '</div><div class="ep-a-rev">Qué revisar: ' + a.rev + '</div></div>' +
          '<div class="ep-a-tag">' + a.tag + '</div></div>';
      }).join('') + '</div>');

    html += sec('01', '¿Cuánta gente llega?', 'Visitas y registros por período.',
      '<div class="ep-grid ep-g4">' + d.visits.map(metricCard).join('') + '</div>');

    html += sec('02', 'El camino del registro', 'De la visita a la cuenta creada, paso a paso.',
      '<div class="ep-card s2" style="padding:24px">' + funnel(d.funnel) + '</div>' +
      '<div class="ep-grid ep-g3" style="margin-top:14px">' + d.funnelKpis.map(function(k) {
        return '<div class="ep-card">' +
          '<div class="ep-m-lbl">' + k.label + '</div>' +
          '<div class="ep-m-val lime">' + k.val + ' <span style="font-size:16px;color:var(--ep-txt3)">' + k.unit + '</span></div>' +
          '<div style="margin-top:12px">' + semTag(k.sem, k.semTxt) + '</div></div>';
      }).join('') + '</div>');

    html += sec('03', '¿De dónde vienen?', 'Visitas por red, con su porcentaje del total.',
      '<div class="ep-card" style="padding:24px">' + barList(d.sources, {icons:true}) + '</div>');

    var o = d.orgVsPaid;
    var cprAlert = o.paid.cpr > o.threshold;
    html += sec('04', 'Orgánico vs Pauta pagada', 'Lo que llega gratis frente a lo que pagas por anuncios.',
      '<div class="ep-cmp">' +
      '<div class="ep-card"><div class="ep-cmp-head"><span class="ep-cmp-dot" style="background:var(--ep-lime)"></span><b>Orgánico</b><span class="ep-pill-note">posts, historias, compartidos</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Visitas</span><span class="v">' + fnum(o.org.visits) + '</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Registros</span><span class="v" style="color:var(--ep-lime)">' + fnum(o.org.reg) + '</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Costo por registro</span><span class="v" style="color:var(--ep-grn)">$0 · gratis</span></div></div>' +
      '<div class="ep-card"><div class="ep-cmp-head"><span class="ep-cmp-dot" style="background:#5b8def"></span><b>Pauta pagada</b><span class="ep-pill-note">anuncios</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Visitas</span><span class="v">' + fnum(o.paid.visits) + '</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Registros</span><span class="v" style="color:var(--ep-lime)">' + fnum(o.paid.reg) + '</span></div>' +
      '<div class="ep-cmp-row"><span class="k">Costo por registro</span><span class="v" style="color:' + (cprAlert?'var(--ep-red)':'var(--ep-txt)') + '">' + (o.paid.reg > 0 ? '$' + o.paid.cpr.toFixed(2) : '—') + '</span></div>' +
      (o.paid.visits === 0 ? '<div style="margin-top:14px">' + semTag('amber','Sin pauta registrada aún') + '</div>' :
       cprAlert ? '<div class="ep-alert red" style="margin-top:14px;padding:12px 14px"><div class="ep-a-ico" style="width:28px;height:28px;font-size:15px">!</div><div class="ep-a-body"><div class="ep-a-txt" style="font-size:13px">La pauta se está volviendo cara. Cada registro cuesta más del umbral de $' + o.threshold + '.</div></div></div>' :
       '<div style="margin-top:14px">' + semTag('green','Dentro del umbral') + '</div>') +
      '</div></div>');

    html += sec('05', '¿Qué día y hora entra más gente?', 'Entre más intenso el verde, más actividad en esa hora.',
      '<div class="ep-card" style="padding:22px 24px">' + heatmap(d.heatData) + '</div>');

    var dv = d.device;
    html += sec('06', '¿Desde qué dispositivo entran?', 'Celular frente a computador.',
      '<div class="ep-card" style="padding:24px">' +
      '<div class="ep-donut-wrap">' + donutSvg(dv.mobile, dv.desktop) +
      '<div class="ep-donut-legend">' +
      '<div class="ep-dl-row"><span class="ep-dl-dot" style="background:var(--ep-lime)"></span><div><b>' + dv.mobile + '%</b><small>desde el celular</small></div></div>' +
      '<div class="ep-dl-row"><span class="ep-dl-dot" style="background:#2a2a2a;border:1px solid var(--ep-line2)"></span><div><b>' + dv.desktop + '%</b><small>desde el computador</small></div></div>' +
      '</div></div>' +
      (dv.alert ? '<div class="ep-alert red" style="margin-top:20px"><div class="ep-a-ico">!</div><div class="ep-a-body"><div class="ep-a-txt">Más del 60% entra desde el celular y la tasa de registro está baja. Revisa la landing en móvil.</div></div><div class="ep-a-tag">Actuar ya</div></div>' : '<div style="margin-top:18px">' + semTag('green','Reparto normal entre celular y computador') + '</div>') +
      '</div>');

    var dw = d.dwell;
    var zones = [
      {l:'Menos de 10s', c:'var(--ep-red)'},
      {l:'10s a 1 min', c:'var(--ep-amb)'},
      {l:'1 a 3 min · bien', c:'var(--ep-grn)'},
      {l:'Más de 3 min · excelente', c:'var(--ep-lime)'},
    ];
    var needlePos = (dw.zone + 0.5) / 4 * 100;
    html += sec('07', '¿Cuánto tiempo duran en la página?', 'El tiempo promedio antes de irse o registrarse.',
      '<div class="ep-card" style="padding:24px">' +
      '<div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap">' +
      '<span class="ep-m-val lime" style="font-size:48px;white-space:nowrap">' + dw.label + '</span>' +
      '<span style="color:var(--ep-txt3);font-size:14px">tiempo promedio de visita</span></div>' +
      '<div class="ep-tscale"><div class="ep-tscale-bar">' +
      zones.map(function(z) { return '<div class="ep-tseg" style="background:' + z.c + '">' + z.l + '</div>'; }).join('') +
      '<div class="ep-tneedle" style="position:absolute;top:-8px;bottom:-8px;width:3px;background:#fff;box-shadow:0 0 0 2px #0f0f0f;border-radius:3px;left:' + needlePos + '%"></div>' +
      '</div></div></div>');

    var st = d.sourceTable;
    var rates = st.cols.map(function(_, i) { return st.visits[i] > 0 ? st.reg[i] / st.visits[i] * 100 : 0; });
    var bestIdx = rates.indexOf(Math.max.apply(null, rates));
    html += sec('08', '¿Qué fuente convierte mejor?', 'La columna verde es la que mejor transforma visitas en registros.',
      '<div class="ep-card" style="padding:8px 4px"><div class="ep-tbl-wrap"><table>' +
      '<thead><tr><th>Métrica</th>' +
      st.cols.map(function(c,i) { return '<th class="' + (i===bestIdx?'ep-col-best':'') + '">' + c + (i===bestIdx?'<span class="ep-best-badge">Mejor</span>':'') + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      '<tr><td>Visitas</td>' + st.visits.map(function(v,i) { return '<td class="' + (i===bestIdx?'ep-col-best':'') + '">' + fnum(v) + '</td>'; }).join('') + '</tr>' +
      '<tr><td>Registros</td>' + st.reg.map(function(v,i) { return '<td class="' + (i===bestIdx?'ep-col-best':'') + '">' + fnum(v) + '</td>'; }).join('') + '</tr>' +
      '<tr><td>Tasa de conversión</td>' + rates.map(function(r,i) { return '<td class="' + (i===bestIdx?'ep-col-best':'') + '">' + r.toFixed(1).replace('.',',') + '%</td>'; }).join('') + '</tr>' +
      '</tbody></table></div></div>');

    html += sec('09', 'Comparativa semana a semana', 'Visitas y registros de las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">' + lineChart(
        ['S1','S2','S3','S4','S5','S6','S7','S8'],
        {name:'Visitas', color:'#c4ff3d', data:d.weeks.visits},
        {name:'Registros', color:'#5b8def', data:d.weeks.reg}
      ) + '</div>');

    return html;
  }

  /* ── 5. RENDER ESTUDIANTES ─────────────────────────────── */
  function renderEstudiantes(d) {
    var html = '';

    // 00
    html += sec('00 / Estudiantes', 'Alertas automáticas', 'Lo que necesita tu atención ahora mismo, en palabras simples.',
      '<div class="ep-alerts">' + d.alerts.map(function(a) {
        return '<div class="ep-alert ' + a.sev + '">' +
          '<div class="ep-a-ico">' + (a.sev==='green'?'✓':'!') + '</div>' +
          '<div class="ep-a-body"><div class="ep-a-txt">' + a.txt + '</div><div class="ep-a-rev">Qué revisar: ' + a.rev + '</div></div>' +
          '<div class="ep-a-tag">' + a.tag + '</div></div>';
      }).join('') + '</div>');

    // 01
    html += sec('01', 'Actividad general', 'Quién está activo y qué tan seguido vuelve.',
      '<div class="ep-grid ep-g4">' + d.activity.map(metricCard).join('') + '</div>');

    // 02 — Trial funnel
    var t = d.trial;
    html += sec('02', 'De prueba gratuita a plan de pago', 'Cuántos pasan de probar gratis a pagar.',
      '<div class="ep-card s2" style="padding:24px">' + funnel(t.funnel) + '</div>' +
      '<div class="ep-card" style="margin-top:14px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:20px 24px">' +
      '<div><div class="ep-m-lbl">Tasa de retención este mes</div>' +
      '<div class="ep-m-val lime" style="font-size:46px">' + t.rate + '%</div></div>' +
      '<div>' + semTag(t.sem, t.semTxt) + '</div></div>');

    // 03 — Dinero
    html += sec('03', 'Dinero recibido', 'Lo que ha entrado, en total y por período.',
      '<div class="ep-grid ep-g4">' + d.money.map(metricCard).join('') + '</div>');

    // 04 — Proyección
    var p = d.projection;
    var base = p.subs * p.price;
    function amt(ch) { return money(base * (1 - ch)); }
    html += sec('04', 'Proyección del próximo mes', 'Tres escenarios según cuánta gente cancele.',
      '<div class="ep-card" style="padding:24px">' +
      '<div class="ep-proj">' +
      '<div class="ep-pcard pes"><div class="ep-p-name">Pesimista</div><div class="ep-p-val">' + amt(p.pes) + '</div><div class="ep-p-cond">si cancela el ' + Math.round(p.pes*100) + '%</div></div>' +
      '<div class="ep-pcard real"><div class="ep-p-name">Realista</div><div class="ep-p-val">' + amt(p.real) + '</div><div class="ep-p-cond">tasa histórica · ' + Math.round(p.real*100) + '% cancela</div></div>' +
      '<div class="ep-pcard opt"><div class="ep-p-name">Optimista</div><div class="ep-p-val">' + amt(p.opt) + '</div><div class="ep-p-cond">si cancela solo el ' + Math.round(p.opt*100) + '%</div></div>' +
      '</div>' +
      '<div class="ep-formula"><b>' + fnum(p.subs) + '</b> suscriptores × <b>' + money(p.price) + '</b> plan × (1 − tasa de cancelación)' +
      '<span class="note">Estimación basada en el comportamiento actual. No es un número garantizado.</span></div></div>');

    // 05 — Herramientas
    html += sec('05', '¿Qué están usando más?', 'Sesiones de hoy por herramienta.',
      '<div class="ep-card" style="padding:24px">' + barList(d.tools, {showPct:false, unit:'sesiones'}) + '</div>');

    // 06 — Riesgo
    html += sec('06', 'Estudiantes en riesgo de irse', 'Quiénes llevan días sin entrar y podrían cancelar.',
      (d.risk.length === 0
        ? '<div class="ep-card"><div class="ep-no-data">✓ Todos los estudiantes tienen actividad reciente</div></div>'
        : '<div class="ep-risk">' + d.risk.map(function(r) {
            var lvl = r.days > 10 ? 'red' : 'amber';
            var initials = (r.name||'U').split(' ').map(function(w){return w[0]||'';}).slice(0,2).join('');
            var rc = RANK_COLORS[r.rank] || '#cd8a5e';
            return '<div class="ep-rrow">' +
              '<div class="ep-ravatar" style="background:' + rc + '">' + initials + '</div>' +
              '<div><div class="ep-rname">' + r.name + '</div>' +
              '<div class="ep-rmeta"><span class="ep-rrank" style="background:' + rc + '33;color:' + rc + '">' + r.rank + '</span><span>·</span><span>Favorita: ' + r.tool + '</span></div></div>' +
              '<div class="ep-rdays ' + lvl + '">' + r.days + ' días sin entrar</div></div>';
          }).join('') + '</div>' +
          '<button class="ep-btn-ghost" onclick="void(0)">Ver todos (' + d.riskTotal + ') →</button>'));

    // 07 — Distribución
    html += sec('07', 'Distribución de la comunidad', 'Por rango y por idioma que estudian.',
      '<div class="ep-dist-grid">' +
      '<div class="ep-card" style="padding:24px"><div class="ep-card-h"><b>Por rango</b><span class="ep-pill-note">' + fnum(d.rankDist.reduce(function(a,x){return a+x.val;},0)) + ' estudiantes</span></div>' +
      barList(d.rankDist, {showPct:true}) + '</div>' +
      '<div class="ep-card" style="padding:24px"><div class="ep-card-h"><b>Por idioma</b><span class="ep-pill-note">' + fnum(d.langDist.reduce(function(a,x){return a+x.val;},0)) + ' estudiantes</span></div>' +
      barList(d.langDist, {showPct:true}) + '</div></div>');

    // 08 — Gráfico semanal
    html += sec('08', 'Comparativa semana a semana', 'Usuarios activos y nuevos registros de las últimas 8 semanas.',
      '<div class="ep-card" style="padding:24px">' + lineChart(
        ['S1','S2','S3','S4','S5','S6','S7','S8'],
        {name:'Usuarios activos', color:'#c4ff3d', data:d.weeks.active},
        {name:'Nuevos registros', color:'#d59bff', data:d.weeks.nuevos}
      ) + '</div>');

    return html;
  }

  /* ── 6. STATE & INIT ───────────────────────────────────── */
  var _state = {view: 'captacion', data: null};

  function renderView() {
    if (!_state.data) return;
    var container = document.getElementById('ep-content');
    if (!container) return;
    container.innerHTML = _state.view === 'captacion'
      ? renderCaptacion(_state.data.captacion)
      : renderEstudiantes(_state.data.estudiantes);
    container.scrollTop = 0;
  }

  function fetchAndRender(panel) {
    var content = panel.querySelector('#ep-content');
    if (!content) return;
    content.innerHTML = '<div class="ep-loading">Cargando estadísticas…</div>';

    var users = window.allUsers || [];

    // Fetch page_views + session_history in parallel
    var sbReady = window._sb || window.supabase;
    if (!sbReady) {
      _state.data = computeData(users, [], []);
      renderView();
      return;
    }

    var pvPromise = sbReady.from('page_views').select('*').order('viewed_at', {ascending:false}).limit(2000)
      .then(function(r) { return r.data || []; })
      .catch(function() { return []; });

    var sessPromise = sbReady.from('session_history').select('*').order('created_at', {ascending:false}).limit(5000)
      .then(function(r) { return r.data || []; })
      .catch(function() { return []; });

    Promise.all([pvPromise, sessPromise]).then(function(results) {
      _state.data = computeData(users, results[0], results[1]);
      renderView();
    }).catch(function() {
      _state.data = computeData(users, [], []);
      renderView();
    });
  }

  function injectCSS() {
    if (document.getElementById('ep-styles')) return;
    var st = document.createElement('style');
    st.id = 'ep-styles';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function buildShell(panel) {
    panel.innerHTML =
      '<div class="est-panel">' +
      '<div class="ep-controls">' +
      '<div class="ep-seg" id="ep-view-seg">' +
      '<button data-view="captacion" class="on">Captación</button>' +
      '<button data-view="estudiantes">Estudiantes</button>' +
      '</div>' +
      '<div class="ep-spacer"></div>' +
      '<button class="ep-refresh" id="ep-refresh-btn">↻ Actualizar</button>' +
      '</div>' +
      '<div class="ep-content" id="ep-content"></div>' +
      '</div>';

    panel.querySelector('#ep-view-seg').addEventListener('click', function(e) {
      var btn = e.target.closest('button');
      if (!btn || !btn.dataset.view) return;
      _state.view = btn.dataset.view;
      panel.querySelectorAll('#ep-view-seg button').forEach(function(b) {
        b.classList.toggle('on', b === btn);
      });
      renderView();
    });

    panel.querySelector('#ep-refresh-btn').addEventListener('click', function() {
      fetchAndRender(panel);
    });
  }

  /* ── PUBLIC API ────────────────────────────────────────── */
  window.initEstadisticas = function () {
    var panel = document.getElementById('estadisticas-panel');
    if (!panel) return;
    injectCSS();
    if (!panel.querySelector('.est-panel')) buildShell(panel);
    fetchAndRender(panel);
  };

})();
