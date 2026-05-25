/* ============================================================
   AURA LANGUAGES — PWA Install Flow v2
   - iOS Safari: instrucciones paso a paso (4s delay)
   - Android/Desktop Chrome/Edge: prompt nativo cuando
     beforeinstallprompt esté disponible (sin timeout fijo)
   - Samsung Internet: instrucciones paso a paso
   - Post-install: modal de notificaciones push
   ============================================================ */

(function () {
  'use strict';

  // ── Constantes ─────────────────────────────────────────────
  const LS_KEY       = '_aura_pwa';
  const IOS_DELAY    = 4000;   // delay para iOS (ms)
  const DISMISS_DAYS = 7;      // días antes de volver a mostrar
  const MAX_DISMISS  = 3;      // máx veces que puede cerrar

  // ── Detección ──────────────────────────────────────────────
  const ua = navigator.userAgent || '';
  const isIOS        = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isAndroid    = /Android/.test(ua);
  const isSafari     = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  const isChrome     = /Chrome|CriOS/.test(ua) && !/Edg/.test(ua);
  const isEdge       = /Edg/.test(ua);
  const isSamsungInt = /SamsungBrowser/.test(ua);
  const isFirefoxIOS = /FxiOS/.test(ua);
  const isInApp      = /Instagram|FBAN|FBAV|Twitter|Line|WhatsApp/.test(ua);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;
  const isDesktop    = !isIOS && !isAndroid;

  // ── localStorage ───────────────────────────────────────────
  function getState() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
  }
  function setState(patch) {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ ...getState(), ...patch })); } catch {}
  }

  // ── ¿Mostrar install? ──────────────────────────────────────
  function canShow() {
    if (isStandalone)         return false;
    if (isInApp)              return false;
    if (isFirefoxIOS)         return false;
    if (isIOS && !isSafari)   return false;
    const st = getState();
    if (st.installed)         return false;
    if ((st.dismisses || 0) >= MAX_DISMISS) return false;
    if (st.lastDismiss) {
      const days = (Date.now() - st.lastDismiss) / 86400000;
      if (days < DISMISS_DAYS) return false;
    }
    return true;
  }

  // ── Service Worker ─────────────────────────────────────────
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    }
  }

  // ── Estilos ────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('aura-pwa-styles')) return;
    const s = document.createElement('style');
    s.id = 'aura-pwa-styles';
    s.textContent = `
      :root {
        --pwa-bg: #0d0d12; --pwa-card: #16161f;
        --pwa-border: rgba(196,255,61,0.18); --pwa-accent: #c4ff3d;
        --pwa-accent-dim: rgba(196,255,61,0.12); --pwa-txt: #f0ede6;
        --pwa-muted: rgba(240,237,230,0.55); --pwa-r: 20px; --pwa-z: 99999;
      }
      #aura-pwa-bd {
        position:fixed;inset:0;z-index:var(--pwa-z);
        background:rgba(0,0,0,0.72);
        backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
        opacity:0;transition:opacity .35s ease;
        display:flex;align-items:flex-end;justify-content:center;
      }
      #aura-pwa-bd.on { opacity:1; }
      #aura-pwa-m {
        background:var(--pwa-card);
        border:1px solid var(--pwa-border);
        border-radius:var(--pwa-r) var(--pwa-r) 0 0;
        width:100%;max-width:480px;
        padding:28px 24px 40px;box-sizing:border-box;
        transform:translateY(100%);
        transition:transform .4s cubic-bezier(.34,1.56,.64,1);
        position:relative;
        box-shadow:0 -4px 40px rgba(0,0,0,.5);
      }
      #aura-pwa-bd.on #aura-pwa-m { transform:translateY(0); }
      @media(min-width:600px){
        #aura-pwa-bd { align-items:center; }
        #aura-pwa-m {
          border-radius:var(--pwa-r);max-width:400px;
          transform:scale(.88) translateY(20px);opacity:0;
          transition:transform .35s cubic-bezier(.34,1.2,.64,1),opacity .3s ease;
        }
        #aura-pwa-bd.on #aura-pwa-m { transform:scale(1) translateY(0);opacity:1; }
      }
      #aura-pwa-m::before {
        content:'';display:block;width:40px;height:4px;
        background:rgba(255,255,255,.15);border-radius:2px;
        margin:0 auto 22px;
      }
      @media(min-width:600px){ #aura-pwa-m::before { display:none; } }
      .pwa-x {
        position:absolute;top:16px;right:16px;width:30px;height:30px;
        background:rgba(255,255,255,.07);border:none;border-radius:50%;
        cursor:pointer;color:var(--pwa-muted);font-size:16px;
        line-height:30px;text-align:center;transition:background .2s;
      }
      .pwa-x:hover { background:rgba(255,255,255,.13); }
      .pwa-hd {
        display:flex;align-items:center;gap:14px;margin-bottom:20px;
      }
      .pwa-ico {
        width:56px;height:56px;border-radius:14px;flex-shrink:0;
        box-shadow:0 2px 16px rgba(196,255,61,.2);
      }
      .pwa-hd h2 {
        font-family:'Inter',sans-serif;font-size:18px;font-weight:700;
        color:var(--pwa-txt);margin:0 0 3px;
      }
      .pwa-hd p {
        font-family:'Inter',sans-serif;font-size:13px;
        color:var(--pwa-muted);margin:0;line-height:1.4;
      }
      .pwa-steps { display:flex;flex-direction:column;gap:12px;margin-bottom:20px; }
      .pwa-step {
        display:flex;align-items:center;gap:14px;
        background:rgba(255,255,255,.04);
        border:1px solid rgba(255,255,255,.07);
        border-radius:12px;padding:12px 14px;
        animation:pwaIn .4s ease both;
      }
      .pwa-step:nth-child(1){animation-delay:.1s}
      .pwa-step:nth-child(2){animation-delay:.2s}
      .pwa-step:nth-child(3){animation-delay:.3s}
      @keyframes pwaIn {
        from{opacity:0;transform:translateX(-10px)}
        to{opacity:1;transform:translateX(0)}
      }
      .pwa-num {
        width:28px;height:28px;border-radius:50%;flex-shrink:0;
        background:var(--pwa-accent-dim);
        border:1px solid rgba(196,255,61,.35);
        color:var(--pwa-accent);
        font-family:'Inter',sans-serif;font-size:13px;font-weight:700;
        display:flex;align-items:center;justify-content:center;
      }
      .pwa-sb { flex:1; }
      .pwa-sb b {
        display:block;font-family:'Inter',sans-serif;
        font-size:14px;font-weight:600;color:var(--pwa-txt);margin-bottom:2px;
      }
      .pwa-sb span {
        font-family:'Inter',sans-serif;font-size:12px;
        color:var(--pwa-muted);line-height:1.4;
      }
      .pwa-si { font-size:22px;flex-shrink:0; }
      .pwa-hint {
        text-align:center;font-family:'Inter',sans-serif;
        font-size:12px;color:var(--pwa-muted);
        margin-bottom:14px;
        display:flex;align-items:center;justify-content:center;gap:6px;
      }
      .pwa-hint svg { animation:pwaBounce 1.2s ease-in-out infinite; }
      @keyframes pwaBounce {
        0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)}
      }
      .pwa-btn {
        width:100%;padding:16px;background:var(--pwa-accent);
        color:#0a0a0f;border:none;border-radius:12px;
        font-family:'Inter',sans-serif;font-size:15px;font-weight:700;
        cursor:pointer;letter-spacing:.3px;
        transition:opacity .2s,transform .15s;
        display:flex;align-items:center;justify-content:center;gap:8px;
      }
      .pwa-btn:hover{opacity:.88} .pwa-btn:active{transform:scale(.98)}
      .pwa-btn:disabled{opacity:.4;cursor:not-allowed}
      .pwa-note {
        text-align:center;margin-top:12px;
        font-family:'Inter',sans-serif;font-size:11px;color:var(--pwa-muted);
      }

      /* ── Notificaciones ── */
      #aura-notif-bd {
        position:fixed;inset:0;z-index:var(--pwa-z);
        background:rgba(0,0,0,0.72);
        backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
        opacity:0;transition:opacity .35s ease;
        display:flex;align-items:flex-end;justify-content:center;
      }
      #aura-notif-bd.on { opacity:1; }
      #aura-notif-m {
        background:var(--pwa-card);
        border:1px solid var(--pwa-border);
        border-radius:var(--pwa-r) var(--pwa-r) 0 0;
        width:100%;max-width:480px;
        padding:32px 24px 40px;box-sizing:border-box;
        transform:translateY(100%);
        transition:transform .4s cubic-bezier(.34,1.56,.64,1);
        position:relative;text-align:center;
        box-shadow:0 -4px 40px rgba(0,0,0,.5);
      }
      #aura-notif-bd.on #aura-notif-m { transform:translateY(0); }
      @media(min-width:600px){
        #aura-notif-bd { align-items:center; }
        #aura-notif-m {
          border-radius:var(--pwa-r);max-width:380px;
          transform:scale(.88) translateY(20px);opacity:0;
          transition:transform .35s cubic-bezier(.34,1.2,.64,1),opacity .3s ease;
        }
        #aura-notif-bd.on #aura-notif-m { transform:scale(1) translateY(0);opacity:1; }
      }
      .notif-bell {
        width:64px;height:64px;border-radius:50%;
        background:var(--pwa-accent-dim);
        border:1px solid rgba(196,255,61,.3);
        display:flex;align-items:center;justify-content:center;
        margin:0 auto 18px;font-size:28px;
        animation:notifPulse 2s ease-in-out infinite;
      }
      @keyframes notifPulse {
        0%,100%{box-shadow:0 0 0 0 rgba(196,255,61,.3)}
        50%{box-shadow:0 0 0 10px rgba(196,255,61,.0)}
      }
      #aura-notif-m h2 {
        font-family:'Inter',sans-serif;font-size:20px;font-weight:700;
        color:var(--pwa-txt);margin:0 0 10px;
      }
      #aura-notif-m p {
        font-family:'Inter',sans-serif;font-size:14px;
        color:var(--pwa-muted);margin:0 0 24px;line-height:1.5;
      }
      .notif-btns { display:flex;flex-direction:column;gap:10px; }
      .notif-yes {
        width:100%;padding:16px;background:var(--pwa-accent);
        color:#0a0a0f;border:none;border-radius:12px;
        font-family:'Inter',sans-serif;font-size:15px;font-weight:700;
        cursor:pointer;transition:opacity .2s;
      }
      .notif-yes:hover{opacity:.88}
      .notif-no {
        width:100%;padding:12px;background:transparent;
        color:var(--pwa-muted);border:1px solid rgba(255,255,255,.1);
        border-radius:12px;font-family:'Inter',sans-serif;
        font-size:14px;cursor:pointer;transition:background .2s;
      }
      .notif-no:hover{background:rgba(255,255,255,.05)}
    `;
    document.head.appendChild(s);
  }

  // ── Abrir / cerrar genérico ────────────────────────────────
  function openOverlay(bd) {
    requestAnimationFrame(() => requestAnimationFrame(() => bd.classList.add('on')));
  }
  function closeOverlay(bd, onDone) {
    bd.classList.remove('on');
    setTimeout(() => { bd.remove(); if (onDone) onDone(); }, 400);
  }
  function onDismiss() {
    const st = getState();
    setState({ dismisses: (st.dismisses || 0) + 1, lastDismiss: Date.now() });
  }

  // ── MODAL DE INSTALACIÓN ───────────────────────────────────
  function buildInstallModal(type) {
    const bd = document.createElement('div');
    bd.id = 'aura-pwa-bd';

    const header = `
      <button class="pwa-x" aria-label="Cerrar">✕</button>
      <div class="pwa-hd">
        <img class="pwa-ico" src="/apple-touch-icon.png?v=7" alt="Aura">
        <div>
          <h2>Instala Aura</h2>
          <p>Aprende inglés desde tu pantalla de inicio</p>
        </div>
      </div>`;

    let body = '';

    if (type === 'ios') {
      body = `
        <div class="pwa-hint">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path d="M8 2v10M4 9l4 4 4-4" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Sigue estos 3 pasos en Safari
        </div>
        <div class="pwa-steps">
          <div class="pwa-step">
            <div class="pwa-num">1</div>
            <div class="pwa-sb"><b>Toca el botón Compartir</b><span>El ícono de cuadro con flecha en la barra inferior</span></div>
            <div class="pwa-si">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 2v13M8 6l4-4 4 4" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 14v6h16v-6" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="pwa-step">
            <div class="pwa-num">2</div>
            <div class="pwa-sb"><b>Toca "Añadir a pantalla de inicio"</b><span>Desplázate hacia abajo en el menú si no lo ves</span></div>
            <div class="pwa-si">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#c4ff3d" stroke-width="2"/>
                <path d="M12 8v8M8 12h8" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="pwa-step">
            <div class="pwa-num">3</div>
            <div class="pwa-sb"><b>Toca "Añadir"</b><span>Aura aparecerá en tu pantalla de inicio</span></div>
            <div class="pwa-si">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="#c4ff3d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <p class="pwa-note">Sin App Store. Sin descargas. Gratis.</p>`;

    } else if (type === 'samsung') {
      body = `
        <div class="pwa-steps">
          <div class="pwa-step">
            <div class="pwa-num">1</div>
            <div class="pwa-sb"><b>Toca el ícono de instalación</b><span>Ícono de casa con "+" en la barra de URL</span></div>
            <div class="pwa-si">🏠</div>
          </div>
          <div class="pwa-step">
            <div class="pwa-num">2</div>
            <div class="pwa-sb"><b>Confirma tocando "Añadir"</b><span>Aura aparecerá en tu pantalla de inicio</span></div>
            <div class="pwa-si">✅</div>
          </div>
        </div>
        <p class="pwa-note">Sin Play Store. Gratis.</p>`;

    } else {
      // android / desktop
      const label = isAndroid ? '📲 Instalar en mi celular' : '💻 Instalar en mi computador';
      const note  = isAndroid ? 'Se instala en segundos. Sin app store.' : 'Funciona sin conexión una vez instalada.';
      body = `
        <button class="pwa-btn" id="aura-pwa-install-btn">${label}</button>
        <p class="pwa-note">${note}</p>`;
    }

    bd.innerHTML = `<div id="aura-pwa-m">${header}${body}</div>`;
    return bd;
  }

  function showInstallModal(type) {
    injectStyles();
    const bd = buildInstallModal(type);
    document.body.appendChild(bd);
    openOverlay(bd);

    // Cerrar al click en backdrop
    bd.addEventListener('click', e => { if (e.target === bd) { onDismiss(); closeOverlay(bd); } });
    bd.querySelector('.pwa-x').addEventListener('click', () => { onDismiss(); closeOverlay(bd); });

    // Botón instalar (Android/Desktop)
    const btn = bd.querySelector('#aura-pwa-install-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (!window._aura_pwa_prompt) return;
        btn.disabled = true;
        btn.textContent = 'Instalando…';
        window._aura_pwa_prompt.prompt();
        window._aura_pwa_prompt.userChoice.then(choice => {
          if (choice.outcome === 'accepted') {
            setState({ installed: true });
            closeOverlay(bd, () => setTimeout(showNotifModal, 800));
          } else {
            btn.disabled = false;
            btn.innerHTML = isAndroid ? '📲 Instalar en mi celular' : '💻 Instalar en mi computador';
          }
        });
      });
    }
  }

  // ── MODAL DE NOTIFICACIONES ────────────────────────────────
  function showNotifModal() {
    // No mostrar si ya tiene permiso o ya lo denegó definitivamente
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') return;
    if (Notification.permission === 'denied') return;
    if (getState().notifAsked) return;

    injectStyles();
    const bd = document.createElement('div');
    bd.id = 'aura-notif-bd';
    bd.innerHTML = `
      <div id="aura-notif-m">
        <div class="notif-bell">🔔</div>
        <h2>Activa las notificaciones</h2>
        <p>Recibe recordatorios de práctica diaria y novedades de Aura directamente en tu dispositivo.</p>
        <div class="notif-btns">
          <button class="notif-yes" id="aura-notif-yes">🔔 Activar notificaciones</button>
          <button class="notif-no"  id="aura-notif-no">Ahora no</button>
        </div>
      </div>`;
    document.body.appendChild(bd);
    openOverlay(bd);

    bd.querySelector('#aura-notif-yes').addEventListener('click', () => {
      setState({ notifAsked: true });
      closeOverlay(bd);
      Notification.requestPermission().then(pe