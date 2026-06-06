(function(){

  /* ── CONSTANTES ──────────────────────────────────────────────────── */
  const RANK_COLOR = {
    Bronce:'#cd7f32', Plata:'#d1d5db', Oro:'#fbbf24',
    Platino:'#5eead4', Diamante:'#60a5fa', Challenger:'#c084fc',
  };
  const CEFR = {
    Bronce:'A1', Plata:'A2', Oro:'B1', Platino:'B2', Diamante:'C1', Challenger:'C2',
  };
  const LANG_NAME = { en:'Inglés', fr:'Francés', it:'Italiano', es:'Español', pt:'Portugués' };
  const TOOL_KEY  = {
    lyriclab:'lyriclab', movies:'play-movies',
    shadowlab:'shadowlab', flashcards:'flashcards', collocations:'collocations',
  };
  const GRADS = [
    ['#fb7185','#fbbf24'],['#60a5fa','#c084fc'],['#c084fc','#fb7185'],
    ['#5eead4','#60a5fa'],['#fbbf24','#fb7185'],['#a8e02f','#5eead4'],
    ['#c4ff3d','#a8e02f'],['#fb7185','#c084fc'],['#fbbf24','#a8e02f'],
    ['#60a5fa','#5eead4'],['#5eead4','#c084fc'],['#c084fc','#fbbf24'],
  ];

  /* ── HELPERS ─────────────────────────────────────────────────────── */
  function gradFor(id) {
    let h = 0; const s = String(id);
    for(let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return GRADS[h % GRADS.length];
  }
  function initials(name) {
    return (name || '?').split(' ').slice(0,2).map(p => p[0] || '').join('').toUpperCase();
  }
  function fmtXp(n) { return Math.round(n || 0).toLocaleString('es-CO'); }

  function avNode(u, cls) {
    const [g0,g1] = gradFor(u.id);
    const bg = `background:linear-gradient(135deg,${g0},${g1});overflow:hidden;display:flex;align-items:center;justify-content:center;`;
    if(u.foto) {
      return `<div class="${cls}" style="${bg}"><img src="${u.foto}" ` +
        `style="width:100%;height:100%;object-fit:cover;border-radius:50%;" ` +
        `onerror="this.style.display='none'"></div>`;
    }
    return `<div class="${cls}" style="${bg}">${initials(u.nombre)}</div>`;
  }

  function dateFrom(period) {
    const now = new Date();
    if(period === 'semana') {
      const day = now.getDay();
      const mon = new Date(now);
      mon.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
      mon.setHours(0,0,0,0);
      return mon.toISOString();
    }
    if(period === 'mes') {
      return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }
    return null;
  }

  function updateEyebrow() {
    const lang = localStorage.getItem('aura_lang') || 'en';
    const now  = new Date();
    const week = Math.ceil((now - new Date(now.getFullYear(),0,1)) / 604800000);
    document.querySelectorAll('.rk-eyebrow').forEach(el => {
      el.textContent = `Liga · ${LANG_NAME[lang] || 'Inglés'} · Semana ${week}`;
    });
  }

  function updateCountdown() {
    const now = new Date();
    const day = now.getDay();
    const dLeft = day === 1 ? 7 : (8 - day) % 7;
    const nextMon = new Date(now);
    nextMon.setDate(now.getDate() + dLeft);
    nextMon.setHours(0,0,0,0);
    const diff = nextMon - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const el = document.getElementById('rkCountdown');
    if(el) el.innerHTML = `<span>${d}d</span> <span>${h}h</span> <span>${m}m</span>`;
  }

  /* ── ESTADO ──────────────────────────────────────────────────────── */
  let state = { period: 'semana', scope: 'global', limit: 12 };
  let currentUserId = null;
  let cachedRanked  = [];

  /* ── CARGA SUPABASE ──────────────────────────────────────────────── */

  async function loadGlobal(lang) {
    const sb = window._aura.sb;
    const { data, error } = await sb
      .from('language_progress')
      .select('user_id, xp, rango, streak_actual, profiles(id, nombre, foto)')
      .eq('language', lang)
      .order('xp', { ascending: false })
      .limit(50);
    if(error || !data) return [];
    return data.filter(r => r.profiles).map(r => ({
      id:     r.user_id,
      nombre: r.profiles.nombre || 'Usuario',
      foto:   r.profiles.foto   || null,
      rank:   r.rango            || 'Bronce',
      streak: r.streak_actual    || 0,
      xp:     r.xp              || 0,
    }));
  }

  async function loadWithSessions(lang, tool, period) {
    const sb   = window._aura.sb;
    const from = dateFrom(period);
    let q = sb.from('session_history').select('user_id, xp_earned');
    if(tool) q = q.eq('tool', TOOL_KEY[tool]);
    if(from) q = q.gte('played_at', from);
    const { data: sessions, error } = await q.limit(1000);
    if(error || !sessions || !sessions.length) return [];

    const byUser = {};
    sessions.forEach(s => { byUser[s.user_id] = (byUser[s.user_id] || 0) + (s.xp_earned || 0); });
    const uids = Object.keys(byUser);
    if(!uids.length) return [];

    const [pr, lr] = await Promise.all([
      sb.from('profiles').select('id, nombre, foto').in('id', uids),
      sb.from('language_progress').select('user_id, rango, streak_actual')
        .eq('language', lang).in('user_id', uids),
    ]);

    const pm = Object.fromEntries((pr.data || []).map(p => [p.id, p]));
    const lm = Object.fromEntries((lr.data || []).map(p => [p.user_id, p]));

    return uids
      .filter(uid => pm[uid] && lm[uid])  // lm[uid] siempre requerido: filtra por idioma
      .map(uid => ({
        id:     uid,
        nombre: pm[uid].nombre   || 'Usuario',
        foto:   pm[uid].foto     || null,
        rank:   lm[uid]?.rango            || 'Bronce',
        streak: lm[uid]?.streak_actual    || 0,
        xp:     byUser[uid],
      }))
      .sort((a,b) => b.xp - a.xp).slice(0, 50);
  }

  async function fetchUsers() {
    const lang   = localStorage.getItem('aura_lang') || 'en';
    const {scope, period} = state;
    if(scope === 'global' && period === 'total') return loadGlobal(lang);
    if(scope === 'global') return loadWithSessions(lang, null, period);
    return loadWithSessions(lang, scope, period);
  }

  /* ── RENDER ──────────────────────────────────────────────────────── */
  function renderPodium(ranked) {
    const podium = document.getElementById('rkPodium');
    const top3   = ranked.slice(0, 3);
    const order  = [top3[1], top3[0], top3[2]];
    const medals = ['silver','gold','bronze'];
    const mClr   = { gold:'#fbbf24', silver:'#d1d5db', bronze:'#cd7f32' };
    const places  = ['2nd','1st','3rd'];
    const pLbl   = state.period==='semana'?'esta semana':state.period==='mes'?'este mes':'total';

    podium.innerHTML = order.map((u,i) => {
      if(!u) return '';
      const cls   = places[i].toLowerCase();
      const color = mClr[medals[i]];
      const [g0,g1] = gradFor(u.id);
      const crown = i===1
        ? `<svg viewBox="0 0 24 24"><path d="M5 16L3 7l5.5 5L12 4l3.5 8L21 7l-2 9H5zm0 2h14v3H5v-3z"/></svg>`
        : (i===0?'2':'3');
      const avIn = u.foto
        ? `<img src="${u.foto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'">`
        : initials(u.nombre);
      return `
        <div class="rk-podium-slot slot-${cls}" style="--medal-color:${color}">
          <div class="rk-medal">${crown}</div>
          <div class="rk-podium-card is-${cls}">
            <div class="rk-podium-av" style="background:linear-gradient(135deg,${g0},${g1});overflow:hidden;display:flex;align-items:center;justify-content:center;">${avIn}</div>
            <div class="rk-podium-name">${u.nombre}${u._me?' <span style="opacity:.45;font-size:.72em">(tú)</span>':''}</div>
            <div class="rk-podium-rank">
              <span class="rk-podium-rank-dot" style="background:${RANK_COLOR[u.rank]||'#cd7f32'}"></span>
              ${u.rank} · ${CEFR[u.rank]||'A1'}
            </div>
            <div class="rk-podium-xp" data-countup="${u.xp}">0</div>
            <div class="rk-podium-xp-lbl">XP ${pLbl}</div>
            <div class="rk-podium-streak">
              <svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
              ${u.streak} días de racha
            </div>
          </div>
        </div>`;
    }).join('');

    podium.querySelectorAll('[data-countup]').forEach(el => {
      const target = parseInt(el.dataset.countup), dur = 900, t0 = performance.now();
      const tick = t => {
        const p = Math.min(1,(t-t0)/dur);
        el.textContent = fmtXp(Math.round(target*(1-Math.pow(1-p,3))));
        if(p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function rowHtml(u, isMe) {
    const [g0,g1] = gradFor(u.id);
    const mc = u._pos===1?'#fbbf24':u._pos===2?'#d1d5db':u._pos===3?'#cd7f32':'';
    const avIn = u.foto
      ? `<img src="${u.foto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.style.display='none'">`
      : initials(u.nombre);
    return `
      <a class="rk-row ${isMe?'is-me':''}" href="#" style="${mc?`--medal-color:${mc}`:''}">
        <div class="rk-pos ${u._pos<=3?'top':''}">#${String(u._pos).padStart(2,'0')}</div>
        <div class="rk-av" style="background:linear-gradient(135deg,${g0},${g1});overflow:hidden;display:flex;align-items:center;justify-content:center;">${avIn}</div>
        <div class="rk-info">
          <div class="rk-name">${u.nombre}${isMe?' <span style="opacity:.5;font-weight:500">(tú)</span>':''}</div>
          <div class="rk-tagrow">
            <span class="rk-rank">
              <span class="rk-rank-dot" style="background:${RANK_COLOR[u.rank]||'#cd7f32'}"></span>
              ${u.rank} · ${CEFR[u.rank]||'A1'}
            </span>
            <span class="rk-streak">
              <svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
              ${u.streak}d
            </span>
          </div>
        </div>
        <div class="rk-change same">
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          —
        </div>
        <div class="rk-xp">${fmtXp(u.xp)}<small>XP</small></div>
        <div class="rk-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </a>`;
  }

  function renderList(ranked) {
    const me = ranked.find(u => u._me);
    document.getElementById('rkUserRow').innerHTML = me ? rowHtml(me, true) : '';
    const rest    = ranked.slice(3);
    const visible = rest.slice(0, state.limit);
    document.getElementById('rkList').innerHTML = visible.map(u => rowHtml(u, u._me)).join('');
    const SCOPE_LBL = {global:'Global',lyriclab:'LyricLab',movies:'Movies',shadowlab:'ShadowLab',flashcards:'Flashcards',collocations:'Collocations'};
    const PRD_LBL   = {semana:'Esta semana',mes:'Este mes',total:'Total'};
    document.getElementById('rkTopCount').textContent = `${ranked.length} en total`;
    document.getElementById('rkTopMeta').textContent  = `${SCOPE_LBL[state.scope]} · ${PRD_LBL[state.period]}`;
    document.getElementById('rkMoreBtn').style.display = visible.length < rest.length ? '' : 'none';
  }

  function showLoading() {
    document.getElementById('rkPodium').innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:#3a3a3a;font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;">CARGANDO RANKING...</div>';
    document.getElementById('rkList').innerHTML = '';
    document.getElementById('rkUserRow').innerHTML = '';
  }

  async function loadAndRender() {
    if(!window._aura?.sb) { setTimeout(loadAndRender, 300); return; }
    showLoading();
    const users  = await fetchUsers();
    cachedRanked = users.map((u,i) => ({...u, _pos:i+1, _me: u.id===currentUserId}));
    renderPodium(cachedRanked);
    renderList(cachedRanked);
  }

  /* ── EVENTOS ─────────────────────────────────────────────────────── */
  document.getElementById('periodSeg').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    document.querySelectorAll('#periodSeg button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.period = btn.dataset.period;
    state.limit  = 12;
    loadAndRender();
  });

  document.getElementById('scopePills').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if(!btn) return;
    document.querySelectorAll('#scopePills button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.scope = btn.dataset.scope;
    state.limit = 12;
    loadAndRender();
  });

  document.getElementById('rkMoreBtn').addEventListener('click', () => {
    state.limit += 12;
    renderList(cachedRanked);
  });

  /* ── INIT ────────────────────────────────────────────────────────── */
  updateEyebrow();
  updateCountdown();
  setInterval(updateCountdown, 60000);

  (async () => {
    try {
      let attempts = 0;
      while(!window._aura?.sb && attempts++ < 20) await new Promise(r => setTimeout(r, 200));
      if(!window._aura?.sb) return;
      const { data:{ session } } = await window._aura.sb.auth.getSession();
      if(session) {
        currentUserId = session.user.id;
        await window._aura.loadProfile(session.user.id);
      }
    } catch(e) { /* silent */ }
   