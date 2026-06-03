/* ============================================================
   progreso.js — Lógica de la página Tu Camino
   Requiere: progreso-data.js cargado antes
   ============================================================ */
(async function(){

  /* ── AUTH: leer rango sin duplicar llamadas de aura-supabase.js ─ */
  /* Hacemos una query directa y liviana a Supabase solo para el rango.
     NO llamamos loadProfile ni loadLanguageProgress (ya los ejecuta
     aura-supabase.js en su propia inicialización). */
  let userRank = 'Bronce';
  let userLvl  = 1;

  try {
    if (window._aura?.sb) {
      const { data: { session } } = await window._aura.sb.auth.getSession();
      if (session) {
        const lang = window._aura?.lang || localStorage.getItem('aura_lang') || 'en';

        /* Intentar language_progress primero (rango por idioma) */
        const { data: lp } = await window._aura.sb
          .from('language_progress')
          .select('rango')
          .eq('user_id', session.user.id)
          .eq('language', lang)
          .maybeSingle();

        if (lp?.rango && PT_RANK_LVL[lp.rango]) {
          userRank = lp.rango;
          userLvl  = PT_RANK_LVL[lp.rango];
        } else {
          /* Fallback: rango global en profiles */
          const { data: prof } = await window._aura.sb
            .from('profiles')
            .select('rango')
            .eq('id', session.user.id)
            .maybeSingle();
          if (prof?.rango && PT_RANK_LVL[prof.rango]) {
            userRank = prof.rango;
            userLvl  = PT_RANK_LVL[prof.rango];
          }
        }
      }
    }
  } catch(e) {
    console.warn('[Aura Progreso] Error al cargar rango, modo demo.', e);
  }

  /* ── PORTADAS personalizadas desde Supabase ─────────────────── */
  const topicCovers = {};
  try {
    if (window._aura?.sb) {
      const lang = window._aura?.lang || localStorage.getItem('aura_lang') || 'en';
      const { data: coverData } = await window._aura.sb
        .from('topic_covers')
        .select('topic_id, img_url')
        .eq('language', lang);
      (coverData || []).forEach(r => { topicCovers[r.topic_id] = r.img_url; });
    }
  } catch(e) {
    console.warn('[Aura Progreso] No se pudieron cargar portadas personalizadas.');
  }

  /* ── STATS ───────────────────────────────────────────────────── */
  const unlocked  = PT_TOPICS.filter(t => PT_RANK_LVL[t.rank] <= userLvl).length;
  const locked    = PT_TOPICS.length - unlocked;
  const completed = 0; /* TODO: leer de progreso real */
  const pct = Math.round((completed / PT_TOPICS.length) * 100);

  document.getElementById('statRank').textContent     = userRank;
  document.getElementById('statUnlocked').textContent = unlocked + ' de ' + PT_TOPICS.length;
  document.getElementById('statLocked').textContent   = locked + ' temas';
  document.getElementById('overallPct').textContent   = pct;
  document.getElementById('overallNum').textContent   = completed;
  setTimeout(() => {
    document.getElementById('overallFill').style.width = pct + '%';
  }, 150);

  /* ── BUILD CARDS ──────────────────────────────────────────────── */
  const container = document.getElementById('ptContent');

  PT_RANK_ORDER.forEach((rank, rankIdx) => {
    const topics  = PT_TOPICS.filter(t => t.rank === rank);
    if (!topics.length) return;

    const meta     = PT_RANK_META[rank];
    const rankLvl  = PT_RANK_LVL[rank];
    const isCurrent= rank === userRank;
    const isOpen   = rankLvl <= userLvl;
    const isLocked = !isOpen;

    const rankCompleted = 0;
    const rankPct = Math.round((rankCompleted / topics.length) * 100);

    const sec = document.createElement('div');
    sec.className = 'rank-section' + (isLocked ? ' is-locked' : '');
    sec.style.setProperty('--rank-color', meta.color);

    let statusHtml;
    if (isCurrent)   statusHtml = `<span class="rank-status rs-current">● Tu nivel</span>`;
    else if (isOpen) statusHtml = `<span class="rank-status rs-done">✓ Disponible</span>`;
    else             statusHtml = `<span class="rank-status rs-locked">◌ Bloqueado</span>`;

    const head = document.createElement('div');
    head.className = 'rank-head';
    head.innerHTML = `
      <div class="rank-badge">
        <span class="rank-num">CAP · ${String(rankIdx + 1).padStart(2, '0')}</span>
        <div class="rank-shield">${ptRankShieldSVG(meta.color, isLocked)}</div>
      </div>
      <div class="rank-info">
        <div class="rank-meta-row">
          ${statusHtml}
          <span class="rank-cefr" style="background:${meta.color}">${meta.cefr}</span>
        </div>
        <h2 class="rank-name">${rank}</h2>
        <p class="rank-desc">${meta.desc} · ${topics.length} temas</p>
      </div>
      <div class="rank-progress">
        <div class="rank-progress-num">${rankCompleted}<span> / ${topics.length}</span></div>
        <div class="rank-progress-label">Completados</div>
        <div class="rank-progress-bar"><div class="rank-progress-fill" style="width:${rankPct}%"></div></div>
      </div>
    `;

    const row = document.createElement('div');
    row.className = 'cards-row';

    topics.forEach(topic => {
      const lines      = topic.title.split('\n');
      const cardStatus = isLocked ? 'locked' : 'available';
      const typeGlyph  = PT_T_ICO[topic.type] || '◎';

      const card = document.createElement('div');
      card.className = `t-card ${cardStatus}`;
      card.dataset.id = topic.id;

      const statusLabel =
        cardStatus === 'available'  ? '● Disponible' :
        cardStatus === 'inprogress' ? '● En progreso' :
        cardStatus === 'completed'  ? '✓ Completado'  : '◌ Bloqueado';

      card.innerHTML = `
        <div class="t-bg">
          <div class="t-bg-fallback"></div>
          <img src="${topicCovers[topic.id] || topic.img}" alt="" loading="lazy" decoding="async" onerror="this.style.display='none'">
        </div>
        <div class="t-top">
          <div class="t-top-ico">${typeGlyph}</div>
          <div class="t-top-info">
            <div class="t-top-name">${topic.type}</div>
            <div class="t-top-sub">${topic.sub}</div>
          </div>
          <div class="t-top-cefr" style="background:${meta.color}">${meta.cefr}</div>
        </div>
        <div class="t-content">
          <div class="t-title">${lines.join('<br>')}</div>
          <div class="t-foot s-${cardStatus}">
            <span class="t-status">${statusLabel}</span>
            <span class="t-foot-dot"></span>
            <span class="t-num">#${String(topic.id).padStart(2, '0')}</span>
          </div>
        </div>
        ${isLocked ? `
        <div class="t-lock">
          <div class="lock-circle">
            <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <span class="lock-lbl">Requiere ${rank}</span>
        </div>` : ''}
      `;

      if (!isLocked) {
        card.addEventListener('click', () => {
          window.location.href = 'topic.html?id=' + topic.id;
        });
      }

      row.appendChild(card);
    });

    sec.appendChild(head);
    sec.appendChild(row);

    if (isLocked) {
      const hint = document.createElement('div');
      hint.className = 'rank-hint';
      hint.innerHTML = `
        <div class="rank-hint-ico">
          <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <span>Completa los temas anteriores y asciende al rango <strong>${rank}</strong> para desbloquear estos ${topics.length} temas.</span>
      `;
      sec.appendChild(hint);
    }

    container.appendChild(sec);
  });

})();
