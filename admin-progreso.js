/* ============================================================
   admin-progreso.js — Gestión de portadas de Tu Camino
   Depende de: window._aura.sb (aura-supabase.js)
   ============================================================ */
(function(){

  const RANKS = {
    Bronce:'#cd7f32', Plata:'#d1d5db', Oro:'#fbbf24',
    Platino:'#5eead4', Diamante:'#60a5fa', Challenger:'#c084fc'
  };

  const TOPICS_ADMIN = [
    {id:1, rank:'Bronce',    title:'The identity code'},
    {id:2, rank:'Bronce',    title:'Am is are'},
    {id:3, rank:'Bronce',    title:'A or the?'},
    {id:4, rank:'Bronce',    title:'Name everything'},
    {id:5, rank:'Bronce',    title:'Count the world'},
    {id:6, rank:'Bronce',    title:'Color your words'},
    {id:7, rank:'Bronce',    title:'Daily habits'},
    {id:8, rank:'Bronce',    title:'Here & there'},
    {id:9, rank:'Bronce',    title:'Ask away'},
    {id:10,rank:'Bronce',    title:'Not today'},
    {id:11,rank:'Plata',     title:'Happening now'},
    {id:12,rank:'Plata',     title:'What happened?'},
    {id:13,rank:'Plata',     title:'Rule breakers'},
    {id:14,rank:'Plata',     title:'The big plan'},
    {id:15,rank:'Plata',     title:'Future promise'},
    {id:16,rank:'Plata',     title:'Better & best'},
    {id:17,rank:'Plata',     title:'Power words'},
    {id:18,rank:'Plata',     title:'Mine yours ours'},
    {id:19,rank:'Plata',     title:'Count or not?'},
    {id:20,rank:'Plata',     title:'What if?'},
    {id:21,rank:'Oro',       title:'Been there'},
    {id:22,rank:'Oro',       title:'In the middle of'},
    {id:23,rank:'Oro',       title:'Even further back'},
    {id:24,rank:'Oro',       title:'In another world'},
    {id:25,rank:'Oro',       title:'He said she said'},
    {id:26,rank:'Oro',       title:'The passive turn'},
    {id:27,rank:'Oro',       title:'Doing or to do?'},
    {id:28,rank:'Oro',       title:'Verb combos'},
    {id:29,rank:'Oro',       title:'Must vs might'},
    {id:30,rank:'Oro',       title:'So very much'},
    {id:31,rank:'Platino',   title:'Still running'},
    {id:32,rank:'Platino',   title:'Way before'},
    {id:33,rank:'Platino',   title:'What could have been'},
    {id:34,rank:'Platino',   title:'Timelines collide'},
    {id:35,rank:'Platino',   title:'Passive master'},
    {id:36,rank:'Platino',   title:'The connector'},
    {id:37,rank:'Platino',   title:'Vision of the future'},
    {id:38,rank:'Platino',   title:'The full story'},
    {id:39,rank:'Diamante',  title:'Flip the script'},
    {id:40,rank:'Diamante',  title:'Sharp focus'},
    {id:41,rank:'Diamante',  title:'Modal elite'},
    {id:42,rank:'Diamante',  title:'Turn verbs to nouns'},
    {id:43,rank:'Diamante',  title:'Formal conditions'},
    {id:44,rank:'Diamante',  title:'Complex passive'},
    {id:45,rank:'Diamante',  title:'The glue'},
    {id:46,rank:'Challenger',title:'Shape shifter'},
    {id:47,rank:'Challenger',title:'Hidden language'},
    {id:48,rank:'Challenger',title:'Academic voice'},
    {id:49,rank:'Challenger',title:'Between the lines'},
    {id:50,rank:'Challenger',title:'The final form'},
  ];

  var currentFilter = 'all';
  var currentLang   = 'en';
  var covers        = {};
  var uploading     = {};

  /* ── INIT ──────────────────────────────────────────────────── */
  async function init() {
    currentLang = window.admLang || 'en';
    var el = document.getElementById('tucamino-content');
    if (el) el.innerHTML = '<p style="color:#666;font-size:13px;padding:20px 0">Cargando portadas...</p>';
    await loadCovers();
    render();
  }

  /* ── CARGAR portadas desde Supabase ────────────────────────── */
  async function loadCovers() {
    var sb = window._aura && window._aura.sb;
    if (!sb) return;
    try {
      var res = await sb.from('topic_covers')
        .select('topic_id, img_url')
        .eq('language', currentLang);
      covers = {};
      (res.data || []).forEach(function(r){ covers[r.topic_id] = r.img_url; });
    } catch(e) {
      console.warn('[admin-progreso] Error cargando portadas:', e);
    }
  }

  /* ── RENDER ────────────────────────────────────────────────── */
  function render() {
    var el = document.getElementById('tucamino-content');
    if (!el) return;

    var list = currentFilter === 'all'
      ? TOPICS_ADMIN
      : TOPICS_ADMIN.filter(function(t){ return t.rank === currentFilter; });

    var total = TOPICS_ADMIN.length;
    var done  = Object.keys(covers).length;

    var filterBtns = ['all'].concat(Object.keys(RANKS)).map(function(r) {
      var active = currentFilter === r;
      var dot = r !== 'all'
        ? '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:'+RANKS[r]+';margin-right:5px;vertical-align:middle"></span>'
        : '';
      return '<button onclick="admProgresoFilter(\''+r+'\')" style="font-size:11px;padding:4px 11px;border-radius:8px;cursor:pointer;'
        + 'border:1px solid '+(active?'#c4ff3d':'rgba(255,255,255,.1)')+';'
        + 'background:'+(active?'rgba(196,255,61,.12)':'rgba(255,255,255,.03)')+';'
        + 'color:'+(active?'#c4ff3d':'#888')+';font-weight:'+(active?'600':'400')+';">'
        + dot + (r==='all'?'Todos ('+total+')':r)
        + '</button>';
    }).join('');

    var cards = list.map(function(t) {
      var hasImg   = !!covers[t.id];
      var isUp     = !!uploading[t.id];
      var color    = RANKS[t.rank];
      return '<div style="border:1px solid '+(hasImg?'rgba(34,197,94,.35)':'rgba(255,255,255,.06)')+';border-radius:12px;overflow:hidden;background:#141414;">'
        + '<div style="height:72px;background:#0a0a0a;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;">'
        + (hasImg
          ? '<img src="'+covers[t.id]+'" style="width:100%;height:100%;object-fit:cover;display:block" alt="" onerror="this.style.display=\'none\'">'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
          )
        + (hasImg ? '<div style="position:absolute;top:4px;right:4px;width:14px;height:14px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg></div>' : '')
        + '<div style="position:absolute;bottom:0;left:0;right:0;height:2px;background:'+color+';opacity:.7;"></div>'
        + '</div>'
        + '<div style="padding:6px 8px 8px;">'
        + '<div style="font-size:9px;color:#444;font-family:monospace;margin-bottom:2px;">#'+String(t.id).padStart(2,'0')+'</div>'
        + '<div style="font-size:11px;color:#ccc;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px;letter-spacing:-.01em;">'+t.title+'</div>'
        + '<label style="display:flex;align-items:center;justify-content:center;gap:4px;font-size:11px;padding:4px 6px;border:1px solid rgba(255,255,255,.1);border-radius:6px;cursor:pointer;color:#777;background:rgba(255,255,255,.02);transition:all .15s;"'
        + ' onmouseover="this.style.color=\'#c4ff3d\';this.style.borderColor=\'rgba(196,255,61,.35)\'"'
        + ' onmouseout="this.style.color=\'#777\';this.style.borderColor=\'rgba(255,255,255,.1)\'">'
        + (isUp
          ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:admSpin .7s linear infinite"><circle cx="12" cy="12" r="9" stroke-dasharray="28" stroke-dashoffset="8"/></svg> Subiendo...'
          : '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg> '+(hasImg?'Cambiar':'Subir')
          )
        + '<input type="file" accept="image/jpeg,image/png,image/webp" style="display:none" onchange="admProgresoUpload(event,'+t.id+')">'
        + '</label>'
        + '</div>'
        + '</div>';
    }).join('');

    el.innerHTML = ''
      + '<style>@keyframes admSpin{to{transform:rotate(360deg)}}</style>'
      + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;flex-wrap:wrap;">'
      + filterBtns
      + '<span style="margin-left:auto;font-size:12px;color:#666;">'
      + '<span style="color:#c4ff3d;font-weight:700;">'+done+'</span> / '+total+' con portada'
      + '</span>'
      + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px;">'
      + cards
      + '</div>';
  }

  /* ── FILTER ────────────────────────────────────────────────── */
  function filter(rank) {
    currentFilter = rank;
    render();
  }

  /* ── UPLOAD ────────────────────────────────────────────────── */
  async function handleUpload(e, topicId) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var sb = window._aura && window._aura.sb;
    if (!sb) { ptToast('Sin conexión Supabase', 'error'); return; }

    uploading[topicId] = true;
    render();

    try {
      var ext  = file.name.split('.').pop().toLowerCase();
      if (ext === 'jpg') ext = 'jpeg';
      var path = 'topics/' + currentLang + '/' + topicId + '.' + ext;

      var upRes = await sb.storage.from('portadas').upload(path, file, {
        upsert: true,
        contentType: file.type
      });
      if (upRes.error) throw upRes.error;

      var urlRes = sb.storage.from('portadas').getPublicUrl(path);
      var publicUrl = urlRes.data.publicUrl;

      var dbRes = await sb.from('topic_covers').upsert(
        { topic_id: topicId, language: currentLang, img_url: publicUrl },
        { onConflict: 'topic_id,language' }
      );
      if (dbRes.error) throw dbRes.error;

      covers[topicId] = publicUrl;
      ptToast('Portada guardada', 'ok');
    } catch(err) {
      console.error('[admin-progreso] Upload error:', err);
      ptToast('Error al subir la imagen', 'error');
    } finally {
      uploading[topicId] = false;
      render();
    }
  }

  /* ── TOAST ────────────────────────────────────────────────── */
  function ptToast(msg, type) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:22px;right:22px;z-index:9999;padding:10px 18px;'
      + 'border-radius:10px;font-size:13px;font-weight:600;'
      + 'background:'+(type==='ok'?'#22c55e':'#ef4444')+';color:#fff;'
      + 'box-shadow:0 4px 20px rgba(0,0,0,.5);';
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function(){ d.remove(); }, 2500);
  }

  /* ── LANG CHANGE (llamado desde admSetLang) ───────────────── */
  function langChange(lang) {
    currentLang = lang;
    init();
  }

  /* ── EXPOSE ───────────────────────────────────────────────── */
  window.admProgresoInit       = init;
  window.admProgresoFilter     = filter;
  window.admProgresoUpload     = handleUpload;
  window.admProgresoLangChange = langChange;

})();
