// ============================================================
//  AURA LANGUAGES — Edge Function: create-courtesy-user
//  Crea un usuario de cortesía desde el panel admin de Aura.
//  Solo puede ser llamada por usuarios con role = 'admin'.
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SRK = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const PLAN_LANGS: Record<string, number> = {
  solo:     1,
  combo:    3,
  maestro:  5,
  courtesy: 1,
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Headers': 'authorization, content-type',
    }})
  }

  try {
    // ── Verificar que el caller es admin ─────────────────────
    const authHeader = req.headers.get('Authorization') ?? ''
    const callerSb   = createClient(SUPABASE_URL, SUPABASE_SRK, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user: caller } } = await callerSb.auth.getUser()
    if (!caller) return json({ error: 'No autenticado' }, 401)

    const adminSb = createClient(SUPABASE_URL, SUPABASE_SRK)
    const { data: callerProfile } = await adminSb
      .from('profiles').select('role').eq('id', caller.id).single()

    if (callerProfile?.role !== 'admin') {
      return json({ error: 'Solo admins pueden crear usuarios' }, 403)
    }

    // ── Leer body ────────────────────────────────────────────
    const { nombre, email, password, plan, languages } = await req.json()

    if (!nombre || !email || !password || !plan) {
      return json({ error: 'Faltan campos requeridos' }, 400)
    }

    const langCount = PLAN_LANGS[plan] ?? 1
    const selectedLangs = (languages ?? []).slice(0, langCount)

    // ── Crear usuario en auth ────────────────────────────────
    const { data: newUser, error: createError } = await adminSb.auth.admin.createUser({
      email,
      password,
      email_confirm:  true,
      user_metadata:  { full_name: nombre },
    })

    if (createError || !newUser?.user?.id) {
      return json({ error: createError?.message ?? 'Error al crear usuario' }, 400)
    }

    const userId = newUser.user.id

    // ── Crear perfil ─────────────────────────────────────────
    const { error: profileError } = await adminSb.from('profiles').upsert({
      id:                 userId,
      email:              email.toLowerCase().trim(),
      nombre,
      nivel:              1,
      xp:                 0,
      aura_points:        0,
      streak_actual:      0,
      streak_maximo:      0,
      plan,
      billing_period:     'courtesy',
      plan_status:        'active',
      plan_expires_at:    null,
      languages_unlocked: langCount,
      selected_languages: selectedLangs,
      payment_provider:   'aura',
      role:               'user',
    }, { onConflict: 'id' })

    if (profileError) {
      return json({ error: profileError.message }, 400)
    }

    console.log(`✅ Usuario cortesía creado: ${userId} | ${email} | plan: ${plan}`)
    return json({ ok: true, userId, email })

  } catch (e) {
    console.error('create-courtesy-user error:', e)
    return json({ error: String(e) }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type':                 'application/json',
      'Access-Control-Allow-Origin':  '*',
    },
  })
}
