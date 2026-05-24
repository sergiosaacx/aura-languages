// ============================================================
//  AURA LANGUAGES — Edge Function: delete-unpaid-account
//  Si un correo ya existe pero sin plan activo, elimina la
//  cuenta para permitir un nuevo registro limpio.
//
//  Secrets requeridos:
//    SUPABASE_URL              (automático)
//    SUPABASE_SERVICE_ROLE_KEY
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SRK = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Estos estados protegen la cuenta — NO se elimina si tiene alguno de estos
const PROTECTED_STATUSES = ['active', 'trial', 'cancelled']

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, apikey, authorization',
  'Content-Type': 'application/json',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('OK', { headers: CORS })
  }

  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ deleted: false, reason: 'missing_email' }), { status: 400, headers: CORS })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const supabase = createClient(SUPABASE_URL, SUPABASE_SRK)

    // ── Buscar perfil por email ───────────────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, plan_status')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (profile) {
      // Tiene perfil — verificar plan
      if (PROTECTED_STATUSES.includes(profile.plan_status)) {
        console.log(`Cuenta protegida — no se elimina: ${normalizedEmail} | plan_status: ${profile.plan_status}`)
        return new Response(JSON.stringify({ deleted: false, reason: 'active_plan' }), { headers: CORS })
      }

      // Sin plan activo → eliminar perfil y cuenta auth
      await supabase.from('profiles').delete().eq('id', profile.id)
      const { error: delErr } = await supabase.auth.admin.deleteUser(profile.id)
      if (delErr) {
        console.error('Error eliminando auth user:', delErr)
        return new Response(JSON.stringify({ deleted: false, reason: 'delete_error' }), { headers: CORS })
      }

      console.log(`✅ Cuenta sin plan eliminada: ${normalizedEmail} | plan_status era: ${profile.plan_status ?? 'null'}`)
      return new Response(JSON.stringify({ deleted: true }), { headers: CORS })
    }

    // ── Sin perfil: buscar en auth.users directamente ─────────
    const res = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1000`,
      { headers: { 'Authorization': `Bearer ${SUPABASE_SRK}`, 'apikey': SUPABASE_SRK } }
    )
    const authData = await res.json()
    const authUser = (authData?.users ?? []).find(
      (u: any) => u.email?.toLowerCase() === normalizedEmail
    )

    if (!authUser) {
      // El correo no existe — no hay nada que eliminar
      return new Response(JSON.stringify({ deleted: false, reason: 'not_found' }), { headers: CORS })
    }

    // Existe en auth pero sin perfil → sin plan → eliminar
    await supabase.auth.admin.deleteUser(authUser.id)
    console.log(`✅ Auth user sin perfil eliminado: ${normalizedEmail}`)
    return new Response(JSON.stringify({ deleted: true }), { headers: CORS })

  } catch (e) {
    console.error('delete-unpaid-account error:', e)
    return new Response(JSON.stringify({ deleted: false, reason: 'internal_error' }), { status: 500, headers: CORS })
  }
})
