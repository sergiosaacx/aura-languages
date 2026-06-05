# AURA LANGUAGES — Sistema de Temas (Light / Dark Mode)

## Archivos del sistema

| Archivo | Rol | Tocar para... |
|---|---|---|
| `aura-theme.css` | **Fuente de verdad** de todas las variables y overrides del modo claro | Cambiar colores, añadir overrides para nuevas páginas |
| `aura-shell.js` | Lógica del toggle + variables del shell (sidebars, trigger, dropdown) | Cambiar comportamiento del botón, ajustar colores del shell |
| `home.css` | CSS de home.html actualizado con variables | Referencia de cómo se migra un CSS de página |

---

## Cómo funciona el sistema

### Activación del tema
```javascript
// Activar modo claro:
document.documentElement.setAttribute('data-theme', 'light')
localStorage.setItem('aura_theme', 'light')

// Activar modo oscuro:
document.documentElement.removeAttribute('data-theme')
localStorage.setItem('aura_theme', 'dark')
```

### Especificidad CSS
- `:root { }` → variables del modo **oscuro** (default)
- `html[data-theme="light"] { }` → overrides del modo **claro**
- `html[data-theme="light"]` tiene especificidad (0,1,1) — **gana sobre cualquier `:root`** de otros archivos CSS

### Aplicar el tema al cargar la página (sin flash)
El `aura-shell.js` aplica el tema en el primer render antes de que se pinte nada:
```javascript
(function(){
  var _th = localStorage.getItem('aura_theme');
  if (_th === 'light') document.documentElement.setAttribute('data-theme','light');
})();
```

---

## Variables CSS — Paleta completa

### Modo oscuro `:root` (valores por defecto)

```css
/* Fondos */
--bg:     #0a0a0a;
--card:   #171717;
--card-2: #1f1f1f;
--card-3: #0e0e0e;

/* Tipografía */
--ink:    #f5f5f5;
--ink-2:  #c8c8c8;
--muted:  #7a7a7a;

/* Bordes */
--line:   #262626;
--line-2: #333333;

/* Accent splits (en oscuro = neón) */
--accent-tx:   #c4ff3d;   /* texto de énfasis → mismo que accent */
--accent-tx2:  #c4ff3d;   /* metadata labels → mismo que accent */
--accent-soft: rgba(196,255,61,.10);
--accent-bd:   rgba(196,255,61,.28);

/* Surfaces */
--soft:    rgba(255,255,255,.04);
--soft-2:  rgba(255,255,255,.06);
--track:   rgba(255,255,255,.06);
--elev:    none;

/* Glass / hero */
--glass:       rgba(15,15,15,.65);
--glass-bd:    rgba(196,255,61,.25);
--glass-line:  rgba(255,255,255,.15);
--mini-bg:     rgba(0,0,0,.35);
--mini-bd:     rgba(255,255,255,.06);
--dot:         rgba(255,255,255,.18);
--scan:        rgba(196,255,61,.018);
--img-fade:    #171717;

/* Hero overlay */
--hero-fade-0: rgba(10,10,10,.96);
--hero-fade-1: rgba(10,10,10,.88);
--hero-fade-2: rgba(10,10,10,.55);
--hero-fade-3: rgba(10,10,10,.85);
--hero-radial: rgba(196,255,61,.18);
--hero-text-shadow: 0 4px 30px rgba(0,0,0,.5);

/* Logo sidebar */
--logo:        #c4ff3d;
--logo-bg:     transparent;
--logo-shadow: 0 0 12px rgba(196,255,61,.55);

/* Shell — glassmorphism oscuro */
--shell-glass:         rgba(23,23,23,.55);
--shell-glass-solid:   rgba(10,10,10,.97);
--shell-border:        rgba(255,255,255,.07);
--shell-hover:         rgba(255,255,255,.04);
--shell-divider:       rgba(255,255,255,.08);
--shell-trigger:       rgba(23,23,23,.85);
--shell-langs:         #0e0e0e;
--shell-panel:         rgba(18,18,18,.75);
--shell-panel-border:  rgba(255,255,255,.09);
--shell-panel-border2: rgba(255,255,255,.06);
```

### Modo claro `html[data-theme="light"]`

```css
/* Fondos — warm paper system */
--bg:     #eef0e8;   /* papel cálido con tinte verde suave */
--card:   #ffffff;
--card-2: #f6f7f1;
--card-3: #edeee6;

/* Tipografía */
--ink:    #16180f;   /* casi negro, tinte cálido */
--ink-2:  #4b4d40;
--muted:  #8a8c7d;

/* Bordes */
--line:   #e6e7de;
--line-2: #d6d8cd;

/* ⚠️ CLAVE: Accent splits en claro — NO el neón */
--accent-ink:  #1c2700;  /* texto oscuro SOBRE fondos con accent */
--accent-tx:   #191b10;  /* texto de énfasis → oliva oscuro (casi = ink) */
--accent-tx2:  #878979;  /* metadata labels → gris neutro */
--accent-soft: rgba(140,190,20,.16);
--accent-bd:   rgba(120,165,15,.45);

/* Surfaces */
--soft:    rgba(22,24,15,.035);
--soft-2:  rgba(22,24,15,.07);
--track:   rgba(22,24,15,.08);
--elev:    0 1px 2px rgba(30,40,12,.05), 0 10px 26px rgba(30,40,12,.07);

/* Glass / hero */
--glass:       rgba(255,255,255,.82);
--glass-bd:    rgba(120,165,15,.35);
--glass-line:  rgba(22,24,15,.12);
--mini-bg:     rgba(22,24,15,.04);
--mini-bd:     rgba(22,24,15,.08);
--dot:         rgba(22,24,15,.18);
--scan:        rgba(120,165,15,.03);
--img-fade:    #ffffff;

/* Hero overlay — cálido, texto oscuro legible */
--hero-fade-0: rgba(238,240,232,.97);
--hero-fade-1: rgba(238,240,232,.84);
--hero-fade-2: rgba(238,240,232,.45);
--hero-fade-3: rgba(238,240,232,.85);
--hero-radial: rgba(140,190,20,.16);
--hero-text-shadow: none;

/* Logo sidebar */
--logo:        #1c2700;
--logo-bg:     var(--accent);
--logo-shadow: none;

/* Shell — blanco con borde y elevación */
--shell-glass:         rgba(255,255,255,.92);
--shell-glass-solid:   rgba(255,255,255,.98);
--shell-border:        rgba(22,24,15,.10);
--shell-hover:         rgba(22,24,15,.035);
--shell-divider:       rgba(22,24,15,.08);
--shell-trigger:       rgba(255,255,255,.95);
--shell-langs:         #f6f7f1;
--shell-panel:         rgba(255,255,255,.96);
--shell-panel-border:  rgba(22,24,15,.10);
--shell-panel-border2: rgba(22,24,15,.06);
```

---

## Regla de oro: accent como fondo vs accent como texto

```
┌─────────────────────────────────────────────────────────────┐
│  FONDO con accent (botones, badges, íconos activos)         │
│  → background: var(--accent)  ← SE DEJA IGUAL (neón)       │
│  → color: var(--accent-ink)   ← texto sobre el fondo       │
├─────────────────────────────────────────────────────────────┤
│  TEXTO con accent (énfasis, h1 em, h2 em, labels)           │
│  → color: var(--accent-tx)    ← oliva oscuro en light       │
│  → color: var(--accent-tx2)   ← gris neutro (metadata)     │
└─────────────────────────────────────────────────────────────┘
```

**En modo oscuro**: `--accent-tx` y `--accent-tx2` = `#c4ff3d` (el neón, igual que accent)
**En modo claro**: `--accent-tx` = `#191b10` (oliva), `--accent-tx2` = `#878979` (gris)

---

## Páginas excluidas del modo claro (siempre oscuras)

Algunas páginas NUNCA aplican el modo claro por diseño. La lógica está en `aura-shell.js`:

```javascript
var _DARK_ONLY_PAGES = ['play-movies.html'];
```

Para añadir más páginas a esta lista, agregar el nombre del archivo al array. El toggle no hace nada en esas páginas.

**Páginas excluidas actualmente:**
- `play-movies.html` — reproductor de video, siempre mejor en oscuro

---

## Checklist para migrar una página nueva al modo claro

### 1. Añadir el link a `aura-theme.css` (primero en `<head>`)
```html
<link rel="stylesheet" href="aura-theme.css">
```

### 2. En el CSS de la página, reemplazar valores hardcodeados por variables

| Valor hardcodeado | Variable a usar |
|---|---|
| `#0a0a0a`, `#171717`, `#0e0e0e` | `var(--bg)` / `var(--card)` / `var(--card-3)` |
| `#f5f5f5`, `#c8c8c8` | `var(--ink)` / `var(--ink-2)` |
| `#7a7a7a` | `var(--muted)` |
| `#262626`, `#333` | `var(--line)` / `var(--line-2)` |
| `rgba(255,255,255,.04)` hover | `var(--soft)` |
| `rgba(0,0,0,.35)` | `var(--mini-bg)` |
| `rgba(255,255,255,.06)` border | `var(--mini-bd)` |
| `rgba(15,15,15,.65)` glass oscuro | `var(--glass)` |
| `rgba(255,255,255,.1)` glass border | `var(--glass-line)` |
| `rgba(10,10,10,.96)` hero overlay | `var(--hero-fade-0)` |
| `#171717` al final de gradiente imagen | `var(--img-fade)` |
| Sombra de elevación | `var(--elev)` |

### 3. Para texto que usaba `color: var(--accent)` directamente

Si es texto de **énfasis** (títulos, highlights importantes):
```css
color: var(--accent-tx);  /* cambia solo en light */
```

Si son **labels de metadata** (categorías, fechas, tags mono):
```css
color: var(--accent-tx2); /* gris neutro en light */
```

Si es un **fondo** con accent encima → no cambiar nada.

### 4. Elementos con fondo oscuro hardcodeado dentro de secciones claras

Si un elemento tiene fondo oscuro porque SIEMPRE es oscuro (ej: imagen, banner con foto):
```css
/* Forzar texto blanco solo en modo claro */
html[data-theme="light"] .mi-elemento-siempre-oscuro {
  color: #ffffff !important;
}
```

### 5. Para gradientes de imagen (tool cards, banners)

```css
/* En lugar de: */
background: linear-gradient(180deg, transparent, rgba(23,23,23,1) 100%)

/* Usar: */
background: linear-gradient(180deg, transparent, var(--img-fade) 100%),
            radial-gradient(..., var(--hero-radial), transparent)
```

---

## Páginas ya migradas

| Página | Estado | Notas |
|---|---|---|
| `home.html` + `home.css` | ✅ Completo | Referencia principal — usar como modelo |
| `movies.html` | ⚠️ Parcial | Link añadido, faltan overrides de contenido |
| `lyriclab.html` | ⚠️ Parcial | Link añadido, faltan overrides de contenido |
| `settings.html` | ⚠️ Parcial | Link añadido, faltan overrides de contenido |
| `shadowlab.html` | ⚠️ Parcial | Link añadido, faltan overrides de contenido |
| `tienda.html` | ⚠️ Parcial | Link añadido, faltan overrides de contenido |
| `dashboard.html` | ⚠️ Parcial | Link añadido — tocar con máximo cuidado |
| `login.html` | ⚠️ Parcial | Link añadido |
| `play-movies.html` | ⚠️ Parcial | Link añadido |
| `admin.html` | ⚠️ Parcial | Link añadido |
| `renew.html` | ⚠️ Parcial | Link añadido |

---

## El botón toggle

Está en `aura-shell.js`. Se inyecta automáticamente en:
- **Desktop**: sidebar izquierdo, justo encima del botón de idioma
- **Mobile**: pane