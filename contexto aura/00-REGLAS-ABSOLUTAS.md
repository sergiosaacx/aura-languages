# REGLAS ABSOLUTAS — Aura Languages

Estas dos reglas aplican en TODO momento, en TODO chat, sin excepción.

---

## REGLA 1 — Los cambios van directo al repo. Nunca local.

Cualquier modificación al proyecto se aplica directamente en el repositorio de GitHub:
- **Repo:** `sergiosaacx/aura-languages`
- **Rama:** `main`
- **Deploy:** GitHub Pages automático al hacer push

**NUNCA** se entrega un archivo para que el usuario lo copie y pegue manualmente.  
**NUNCA** se modifica solo la copia local del workspace.  
El flujo siempre es: editar en `/tmp/aura-languages` → commit → `git push origin main`.

---

## REGLA 2 — Toda modificación delicada necesita aprobación previa.

Antes de tocar cualquier archivo importante (HTML, JS, funciones de Supabase, webhooks, etc.):
1. Explicar qué se va a cambiar y por qué.
2. Esperar confirmación explícita del usuario ("dale", "sí", "hazlo", etc.).
3. Solo entonces ejecutar el cambio.

"Delicado" incluye: cualquier HTML de producción, archivos JS compartidos (`aura-supabase.js`, `aura-shell.js`), funciones de Supabase Edge, estructura de tablas, lógica de autenticación/pagos.

---

## Token GitHub (para el flujo de deploy)

```
TOKEN_GITHUB  ← pedirlo al usuario, no almacenar aquí
```

Usuario: `Sergiosaac`  
Email: `elparche.foodpopayan@gmail.com`
