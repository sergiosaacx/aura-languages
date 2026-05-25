/* ============================================================
   AURA LANGUAGES — PWA Install Flow
   Detecta dispositivo automáticamente y muestra el modal
   correcto: iOS (Safari), Android (Chrome), Desktop
   Se muestra automáticamente 4s después de cargar la página.
   ============================================================ */

(function () {
  'use strict';

  // ── Constantes ─────────────────────────────────────────────
  const LS_KEY        = '_aura_pwa';
  const DELAY_MS      = 4000;   // espera antes de mostrar
  const DISMISS_DAYS  = 7;      // días antes de volver a mostrar si cerró
  const MAX_DISMISSES = 3;      // si cerró 3 veces, no volver a mostrar

  // ── Detección de dispositivo ───────────────────────────────
  const ua  = navigator.userAgent || '';
  const isIOS        = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isAndroid    = /Android/.test(ua);
  const isSafari     = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  const isChrome     = /Chrome|CriOS/.test(ua) && !/Edg/.test(ua);
  const isEdge       = /Edg/.test(ua);
  const isFirefoxIOS = /FxiOS/.test(ua);
  const isSamsungInt = /SamsungBrowser/.test(ua);
  const isInAppBrowser = /Instagram|FBAN|FBAV|Twitter|Line|WhatsApp/.test(ua);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;
  const isDesktop    = !isIOS && !isAndroid;

  // ── Leer / escribir estado en localStorage ─────────────────
  function getState() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
  }
  function setState(patch) {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ ...getState(), ...patch })); } catch {}
  }

  // ── Decidir si mostrar ─────────────────────────────────────
  function shouldShow() {
    if (isStandalone)    return false;  // ya instalada
    if (isInAppBrowser)  return false;  // in-app browser (Instagram etc) — no puede instalar
    if (isFirefoxIOS)    return false;  // Firefox en iOS no puede instalar PWAs
    if (isIOS && !isSafari) return false; // iOS pero no Safari

    const st = getState();
    if (st.installed)    return false;

    // Si cerró demasiadas veces, parar
    if ((st.dismisses || 0) >= MAX_DISMISSES) return false;

    // Si cerró recientemente, respetar el intervalo
    if (st.lastDismiss) {
      const days = (Date.now() - st.lastDismiss) / 86400000;
      if (days < DISMISS_DAYS) return false;
    }

    return true;
  }

  // ── Registrar Service Worker ───────────────────────────────
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .catch(() => {});
    }
  }

  // ── Inyectar estilos ───────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('aura-pwa-styles')) return;
    const style = document.createElement('style');
    style.id = 'aura-pwa-styles';
    style.textContent = `
      /* ── Variables ── */
      :root {
        --pwa-bg: #0d0d12;
        --pwa-card: #16161f;
        --pwa-border: rgba(196,255,61,0.18);
        --pwa-accent: #c4ff3d;
        --pwa-accent-dim: rgba(196,255,61,0.12);
        --pwa-txt: #f0ede6;
        --pwa-txt-muted: rgba(240,237,230,0.55);
        --pwa-radius: 20px;
        --pwa-z: 99999;
      }

      /* ── Backdrop ── */
      #aura-pwa-backdrop {
        position: fixed; inset: 0; z-index: var(--pwa-z);
        background: rgba(0,0,0,0.72);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        opacity: 0;
        transition: opacity 0.35s ease;
        display: flex; align-items: flex-end; justify-content: center;
      }
      #aura-pwa-backdrop.visible { opacity: 1; }

      /* ── Modal ── */
      #aura-pwa-modal {
        background: var(--pwa-card);
        border: 1px solid var(--pwa-border);
        border-radius: var(--pwa-radius) var(--pwa-radius) 0 0;
        width: 100%; max-width: 480px;
        padding: 28px 24px 36px;
        box-sizing: border-box;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        position: relative;
        box-shadow: 0 -4px 40px rgba(0,0,0,0.5);
      }
      #aura-pwa-backdrop.visible #aura-pwa-modal {
        transform: translateY(0);
      }

      /* Desktop: centrado como card */
      @media (min-width: 600px) {
        #aura-pwa-backdrop {
          align-items: center;
        }
        #aura-pwa-modal {
          border-radius: var(--pwa-radius);
          max-width: 400px;
          transform: scale(0.88) translateY(20px);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease;
        }
        #aura-pwa-backdrop.visible #aura-pwa-modal {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      }

      /* ── Handle bar (móvil) ── */
      #aura-pwa-modal::before {
        content: '';
        display: block;
        width: 40px; height: 4px;
        background: rgba(255,255,255,0.15);
        border-radius: 2px;
        margin: 0 auto 22px;
      }

      /* ── Close button ── */
      #aura-pwa-close {
        position: absolute; top: 16px; right: 16px;
        width: 30px; height: 30px;
        background: rgba(255,255,255,0.07);
        border: none; border-radius: 50%;
        cursor: pointer; color: var(--pwa-txt-muted);
        font-size: 16px; line-height: 30px; text-align: center;
        transition: background 0.2s;
      }
      #aura-pwa-close:hover { background: rgba(255,255,255,0.13); }

      /* ── Header ── */
      .pwa-header {
        display: flex; align-items: center; gap: 14px;
        margin-bottom: 20px;
      }
      .pwa-icon {
        width: 56px; height: 56px;
        border-radius: 14px;
        box-shadow: 0 2px 16px rgba(196,255,61,0.2);
        flex-shrink: 0;
      }
      .pwa-header-text h2 {
        font-family: 'Inter', sans-serif;
        font-size: 18px; font-weight: 700;
        color: var(--pwa-txt); margin: 0 0 3px;
      }
      .pwa-header-text p {
        font-family: 'Inter', sans-serif;
        font-size: 13px; color: var(--pwa-txt-muted); margin: 0;
        line-height: 1.4;
      }

      /* ── Steps (iOS) ── */
      .pwa-steps {
        display: flex; flex-direction: column; gap: 14px;
        margin-bottom: 22px;
      }
      .pwa-step {
        display: flex; align-items: center; gap: 14px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px; padding: 12px 14px;
        animation: pwaStepIn 0.4s ease both;
      }
      .pwa-step:nth-child(1) { animation-delay: 0.1s; }
      .pwa-step:nth-child(2) { animation-delay: 0.2s; }
      .pwa-step:nth-child(3) { animation-delay: 0.3s; }

      @keyframes pwaStepIn {
        from { opacity:0; transform: translateX(-12px); }
        to   { opacity:1; transform: translateX(0); }
      }

      .pwa-step-num {
        width: 28px; height: 28px; border-radius: 50%;
        background: var(--pwa-accent-dim);
        border: 1px solid rgba(196,255,61,0.35);
        color: var(--pwa-accent);
        font-family: 'Inter', sans-serif;
        font-size: 13px; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .pwa-step-body { flex: 1; }
      .pwa-step-body strong {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: 14px; font-weight: 600;
        color: var(--pwa-txt); margin-bottom: 2px;
      }
      .pwa-step-body span {
        font-family: 'Inter', sans-serif;
        font-size: 12px; color: var(--pwa-txt-muted);
        line-height: 1.4;
      }
      .pwa-step-icon {
        font-size: 22px; flex-shrink: 0;
      }

      /* ── Arrow indicator (iOS Safari) ── */
      .pwa-ios-arrow {
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 12px; color: var(--pwa-txt-muted);
        margin-bottom: 8px;
        display: flex; align-items: center; justify-content: center; gap: 6px;
      }
      .pwa-ios-arrow svg {
        animation: pwaBounce 1.2s ease-in-out infinite;
      }
      @keyframes pwaBounce {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(5px); }
      }

      /* ── CTA button (Android / Desktop) ── */
      #aura-pwa-btn {
        width: 100%; padding: 16px;
        background: var(--pwa-accent);
        color: #0a0a0f;
        border: none; border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 15px; font-weight: 700;
        cursor: pointer; letter-spacing: 0.3px;
        transition: opacity 0.2s, transform 0.15s;
        display: flex; align-items: center; justify-content: center; gap: 8px;
      }
      #aura-pwa-btn:hover  { opacity: 0.88; }
      #aura-pwa-btn:active { transform: scale(0.98); }
      #aura-pwa-btn:disabled {
        opacity: 0.4; cursor: not-allowed;
      }

      /* ── Footer note ── */
      .pwa-note {
        text-align: center; margin-top: 14px;
        font-family: 'Inter', sans-serif;
        font-size: 11px; color: var(--pwa-txt-muted);
      }
    `;
    document.head.appendChild(style);
  }

  // ── Construir HTML del modal ───────────────────────────────
  function buildModal(type) {
    const backdrop = document.createElement('div');
    backdrop.id = 'aura-pwa-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Instalar Aura Languages');

    let inner = '';

    // Header común
    const header = `
      <button id="aura-pwa-close" aria-label="Cerrar">✕</button>
      <div class="pwa-header">
        <img class="pwa-icon" src="/apple-touch-icon.png?v=7" alt="Aura">
        <div class="pwa-header-text">
          <h2>Instala Aura</h2>
          <p>Aprende inglés desde tu pantalla de inicio</p>
        </div>
      </div>`;

    if (type === 'ios') {
      inner = `
        ${header}
        <div class="pwa-ios-arrow">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path d="M8 2v10M4 9l4 4 4-4" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Sigue estos 3 pasos en Safari
        </div>
        <div class="pwa-steps">
          <div class="pwa-step">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-body">
              <strong>Toca el botón Compartir</strong>
              <span>El ícono de cuadro con flecha en la barra inferior</span>
            </div>
            <div class="pwa-step-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 2v13M8 6l4-4 4 4" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 14v6h16v-6" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="pwa-step">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-body">
              <strong>Toca "Añadir a pantalla de inicio"</strong>
              <span>Desplázate hacia abajo en el menú si no lo ves</span>
            </div>
            <div class="pwa-step-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#c4ff3d" stroke-width="2"/>
                <path d="M12 8v8M8 12h8" stroke="#c4ff3d" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="pwa-step">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-body">
              <strong>Toca "Añadir"</strong>
              <span>Aura aparecerá en tu pantalla de inicio</span>
            </div>
            <div class="pwa-step-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="#c4ff3d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <p class="pwa-note">Sin app store. Sin descargas. Gratis.</p>`;

    } else if (type === 'android' || type === 'desktop') {
      const label = type === 'android'
        ? '📲 Instalar en tu celular'
        : '💻 Instalar en tu computador';
      const note = type === 'android'
        ? 'Se instala en segundos. Sin app store.'
        : 'Funciona sin internet una vez instalada.';

      inner = `
        ${header}
        <button id="aura-pwa-btn">${label}</button>
        <p class="pwa-note">${note}</p>`;

    } else if (type === 'samsung') {
      inner = `
        ${header}
        <div class="pwa-steps">
          <div class="pwa-step">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-body">
              <strong>Toca el ícono de instalación</strong>
              <span>Ícono de casa con "+" en la barra de URL</span>
            </div>
            <div class="pwa-step-icon">🏠</div>
          </div>
          <div class="pwa-step">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-body">
              <strong>Confirma tocando "Añadir"</strong>
              <span>Aura aparecerá en tu pantalla de inicio</span>
            </div>
            <div class="pwa-step-icon">✅</div>
          </div>
        </div>
        <p class="pwa-note">Sin Play Store. Gratis.</p>`;
    }

    backdrop.innerHTML = `<div id="aura-pwa-modal">${inner}</div>`;
    return backdrop;
  }

  // ── Mostrar modal ──────────────────────────────────────────
  function showModal(type) {
    injectStyles();
    const backdrop = buildModal(type);
    document.body.appendChild(backdrop);

    // Animar entrada
    requestAnimationFrame(() => {
      requestAnimationFrame(() => backdrop.classList.add('visible'));
    });

    // Cerrar al hacer clic en backdrop
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) dismiss(backdrop);
    });

    // Botón cerrar
    const closeBtn = backdrop.querySelector('#aura-pwa-close');
    if (closeBtn) closeBtn.addEventListener('click', () => dismiss(backdrop));

    // Botón instalar (Android / Desktop)
    const installBtn = backdrop.querySelector('#aura-pwa-btn');
    if (installBtn) {
      installBtn.addEventListener('click', () => {
        if (window._aura_pwa_prompt) {
          installBtn.disabled = true;
          installBtn.textContent = 'Instalando…';
          window._aura_pwa_prompt.prompt();
          window._aura_pwa_prompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
              setState({ installed: true });
              dismiss(backdrop);
            } else {
              installBtn.disabled = false;
              installBtn.innerHTML = type === 'android'
                ? '📲 Instalar en tu celular'
                : '💻 Instalar en tu computador';
            }
          });
        }
      });
    }

    return backdrop;
  }

  // ── Cerrar modal ───────────────────────────────────────────
  function dismiss(backdrop) {
    backdrop.classList.remove('visible');
    setTimeout(() => backdrop.remove(), 400);
    const st = getState();
    setState({ dismisses: (st.dismisses || 0) + 1, lastDismiss: Date.now() });
  }

  // ── Lógica principal ───────────────────────────────────────
  function init() {
    // Siempre registrar SW
    registerSW();

    // Capturar prompt de Android/Chrome/Edge antes de que se pierda
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      window._aura_pwa_prompt = e;
    });

    // Detectar si ya está instalada (appinstalled event)
    window.addEventListener('appinstalled', () => {
      setState({ installed: true });
    });

    if (!shouldShow()) return;

    // Determinar tipo de modal
    let type = null;
    if (isIOS && isSafari)                    type = 'ios';
    else if (isAndroid && isSamsungInt)        type = 'samsung';
    else if (isAndroid)                        type = 'android';
    else if (isDesktop && (isChrome || isEdge)) type = 'desktop';

    if (!type) return; // browser no compatible o no identificado

    // Mostrar con delay
    setTimeout(() => {
      // Para Android/Desktop necesitamos el prompt capturado
      if ((type === 'android' || type === 'desktop') && !window._aura_pwa_prompt) {
        // El browser no disparó beforeinstallprompt — posiblemente ya está instalada
        // o el browser no lo soporta. No mostrar.
        return;
      }
      showModal(type);
    }, DELAY_MS);
  }

  // ── Arrancar cuando el DOM esté listo ─────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
