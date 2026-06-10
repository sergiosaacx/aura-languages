// ============================================================
//  AURA LANGUAGES — Edge Function: webhook-hotmart
//  Recibe notificaciones de Hotmart v2.0.0 y actualiza
//  el plan del usuario en Supabase.
//
//  Secrets requeridos:
//    SUPABASE_URL              (automático)
//    SUPABASE_SERVICE_ROLE_KEY
//    HOTMART_HOTTOK            (token de validación de Hotmart)
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SRK = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const HOTTOK       = Deno.env.get('HOTMART_HOTTOK')!

// ── Mapa de offer codes → datos del plan ────────────────────
const OFFER_MAP: Record<string, {
  plan: string; period: string; langCount: number; days: number
}> = {
  'os6d64xx': { plan: 'solo',    period: 'monthly',   langCount: 1, days: 30  },
  'jbinn2ef': { plan: 'solo',    period: 'quarterly', langCount: 1, days: 90  },
  'n4k4pl1v': { plan: 'solo',    period: 'annual',    langCount: 1, days: 365 },
  'm1p9is8d': { plan: 'combo',   period: 'monthly',   langCount: 3, days: 30  },
  'laqrx80v': { plan: 'combo',   period: 'quarterly', langCount: 3, days: 90  },
  'epvo6ara': { plan: 'combo',   period: 'annual',    langCount: 3, days: 365 },
  'lfowxgnl': { plan: 'maestro', period: 'monthly',   langCount: 5, days: 30  },
  '5foy890c': { plan: 'maestro', period: 'quarterly', langCount: 5, days: 90  },
  'd0exmmyy': { plan: 'maestro', period: 'annual',    langCount: 5, days: 365 },
}

// ── Buscar usuario por email usando Admin REST API ───────────
async function findUserByEmail(
  supabaseUrl: string,
  serviceRoleKey: string,
  email: string,
): Promise<string | null> {
  // Primero buscar en profiles (más rápido, tiene índice)
  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()

  if (profile?.id) return profile.id

  // Fallback: buscar en auth.users via Admin API
  const res = await fetch(
    `${supabaseUrl}/auth/v1/admin/users?page=1&per_page=1000`,
    {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
      },
    },
  )
  const data = await res.json()
  const user = (data?.users ?? []).find(
    (u: any) => u.email?.toLowerCase() === email.toLowerCase().trim(),
  )
  return user?.id ?? null
}

// ── Handler principal ────────────────────────────────────────
Deno.serve(async (req) => {
  // Hotmart hace GET para validar el endpoint
  if (req.method === 'GET') {
    return new Response('OK', { status: 200 })
  }

  try {
    const body = await req.json()
    console.log('Webhook Hotmart recibido — event:', body.event, '| id:', body.id)

    // ── Validar hottok (body o header X-Hotmart-Hottok) ─────
    const hottokReceived = body.hottok
      ?? req.headers.get('X-Hotmart-Hottok')
      ?? req.headers.get('x-hotmart-hottok')
      ?? null
    if (hottokReceived !== HOTTOK) {
      console.error('HOTTOK inválido recibido:', hottokReceived)
      return new Response('Unauthorized', { status: 401 })
    }

    const event    = body.event as string
    const data     = body.data
    const buyer    = data?.buyer
    const purchase = data?.purchase

    // El email puede venir en distintas rutas según el tipo de evento de Hotmart
    const emailRaw = buyer?.email
      ?? data?.subscription?.subscriber?.email
      ?? data?.customer?.email
      ?? data?.subscriber?.email
      ?? null

    if (!emailRaw) {
      console.log('Payload incompleto — ignorando. Keys en data:', Object.keys(data ?? {}).join(', '))
      return new Response('OK', { status: 200 })
    }

    // Eventos de suscripción no siempre traen purchase — solo requerirlo para PURCHASE_*
    if (!purchase && event.startsWith('PURCHASE_')) {
      console.log('Payload incompleto (sin purchase) — ignorando')
      return new Response('OK', { status: 200 })
    }

    const email          = emailRaw.toLowerCase().trim()
    const offerCode      = purchase?.offer?.code ?? ''
    const transaction    = purchase?.transaction ?? body.id ?? ''
    const subscriberCode = purchase?.subscription?.subscriber?.code
      ?? data?.subscription?.subscriber?.code
      ?? null
    const paymentValue   = purchase?.price?.value ?? purchase?.payment?.value ?? -1

    console.log(`Event: ${event} | Email: ${email} | Offer: ${offerCode} | Tx: ${transaction}`)

    const supabase = createClient(SUPABASE_URL, SUPABASE_SRK)

    // ── Buscar usuario ───────────────────────────────────────
    const userId = await findUserByEmail(SUPABASE_URL, SUPABASE_SRK, email)

    if (!userId) {
      console.log('Usuario no encontrado para:', email, '— buscando en pending_registrations')

      // Buscar registro pendiente (usuario que completó el form pero aún no tenía cuenta)
      const { data: pending } = await supabase
        .from('pending_registrations')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      if (pending && event === 'PURCHASE_APPROVED') {
        const offerData = OFFER_MAP[offerCode]
        if (!offerData) {
          console.log('Offer code desconocido:', offerCode)
          return new Response('OK', { status: 200 })
        }

        // Crear cuenta auth con la contraseña guardada temporalmente
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email:          pending.email,
          password:       pending.password_temp,
          email_confirm:  true,
          user_metadata:  { full_name: pending.full_name },
        })

        if (createError || !newUser?.user?.id) {
          console.error('Error creando usuario auth:', createError)
          return new Response('OK', { status: 200 })
        }

        const newUserId  = newUser.user.id
        const isTrial    = paymentValue === 0 && offerData.plan === 'solo'
        const planStatus = isTrial ? 'trial' : 'active'
        const planExpiry = new Date(Date.now() + offerData.days * 86_400_000).toISOString()

        // Crear perfil completo con plan + idiomas seleccionados
        await supabase.from('profiles').upsert({
          id:                        newUserId,
          email:                     pending.email,
          nombre:                    pending.full_name,
          nivel:                     1,
          xp:                        0,
          aura_points:               0,
          streak_actual:             0,
          streak_maximo:             0,
          payment_provider:          'hotmart',
          plan:                      offerData.plan,
          billing_period:            offerData.period,
          plan_status:               planStatus,
          plan_expires_at:           planExpiry,
          languages_unlocked:        offerData.langCount,
          selected_languages:        pending.selected_languages ?? [],
          hotmart_subscription_code: subscriberCode,
        }, { onConflict: 'id' })

        // Borrar registro pendiente — contraseña temporal eliminada
        await supabase.from('pending_registrations').delete().eq('email', email)

        console.log(`✅ Cuenta creada desde pending_registrations: ${newUserId} | plan: ${offerData.plan} | idiomas: ${JSON.stringify(pending.selected_languages)}`)
      } else {
        console.log('Sin pending_registrations para:', email, '| event:', event, '— ignorando')
      }

      return new Response('OK', { status: 200 })
    }

    console.log('Usuario encontrado:', userId)

    // ────────────────────────────────────────────────────────
    // PURCHASE_APPROVED — activar o renovar plan
    // ────────────────────────────────────────────────────────
    if (event === 'PURCHASE_APPROVED') {
      const offerData = OFFER_MAP[offerCode]
      if (!offerData) {
        console.log('Offer code desconocido:', offerCode, '— ignorando')
        return new Response('OK', { status: 200 })
      }

      // Determinar si es trial (primer pago gratis del plan Solo)
      const isTrial   = paymentValue === 0 && offerData.plan === 'solo'
      const planStatus = isTrial ? 'trial' : 'active'
      const days       = isTrial ? 7 : offerData.days

      // Para renovaciones: extender desde la fecha de vencimiento actual si aún no venció
      const { data: current } = await supabase
        .from('profiles')
        .select('plan_expires_at')
        .eq('id', userId)
        .single()

      const baseDate = current?.plan_expires_at && new Date(current.plan_expires_at) > new Date()
        ? new Date(current.plan_expires_at)
        : new Date()

      const planExpiry = new Date(baseDate.getTime() + days * 86_400_000).toISOString()

      const { error } = await supabase.from('profiles').update({
        plan:                      offerData.plan,
        billing_period:            offerData.period,
        plan_status:               planStatus,
        plan_expires_at:           planExpiry,
        languages_unlocked:        offerData.langCount,
        payment_provider:          'hotmart',
        hotmart_subscription_code: subscriberCode,
      }).eq('id', userId)

      if (error) console.error('Error actualizando perfil:', error)
      else console.log(`Plan activado: ${offerData.plan} ${offerData.period} | status: ${planStatus} | expiry: ${planExpiry}`)

      // ── Registrar en payment_history ────────────────────
      await supabase.from('payment_history').upsert({
        user_id:        userId,
        email:          email,
        nombre:         buyer?.name ?? null,
        event:          event,
        plan:           offerData.plan,
        billing_period: offerData.period,
        amount_usd:     paymentValue >= 0 ? paymentValue : null,
        offer_code:     offerCode,
        transaction_id: transaction || null,
        subscriber_code: subscriberCode ?? null,
      }, { onConflict: 'transaction_id', ignoreDuplicates: true })
    }

    // ────────────────────────────────────────────────────────
    // PURCHASE_REFUNDED / PURCHASE_CHARGEBACK — revocar acceso
    // ────────────────────────────────────────────────────────
    else if (event === 'PURCHASE_REFUNDED' || event === 'PURCHASE_CHARGEBACK') {
      await supabase.from('profiles').update({
        plan_status:               'free',
        hotmart_subscription_code: null,
      }).eq('id', userId)
      console.log(`Acceso revocado para: ${email} | razón: ${event}`)

      // ── Registrar en payment_history ────────────────────
      await supabase.from('payment_history').upsert({
        user_id:        userId,
        email:          email,
        nombre:         buyer?.name ?? null,
        event:          event,
        plan:           null,
        billing_period: null,
        amount_usd:     paymentValue >= 0 ? -paymentValue : null,
        offer_code:     offerCode,
        transaction_id: transaction ? transaction + '_' + event : null,
        subscriber_code: subscriberCode ?? null,
      }, { onConflict: 'transaction_id', ignoreDuplicates: true })
    }

    // ────────────────────────────────────────────────────────
    // SUBSCRIPTION_CANCELLATION — cancelar al final del ciclo
    // ────────────────────────────────────────────────────────
    else if (event === 'SUBSCRIPTION_CANCELLATION') {
      // Mantener activo hasta plan_expires_at — solo marcar como cancelled
      await supabase.from('profiles').update({
        plan_status: 'cancelled',
      }).eq('id', userId)
      console.log(`Suscripción cancelada para: ${email} (activo hasta plan_expires_at)`)
    }

    // ────────────────────────────────────────────────────────
    // SUBSCRIPTION_REACTIVATED — reactivar plan cancelado
    // ────────────────────────────────────────────────────────
    else if (event === 'SUBSCRIPTION_REACTIVATED') {
      const offerData = OFFER_MAP[offerCode]
      if (offerData) {
        const planExpiry = new Date(Date.now() + offerData.days * 86_400_000).toISOString()
        await supabase.from('profiles').update({
          plan_status:     'active',
          plan_expires_at: planExpiry,
        }).eq('id', userId)
        console.log(`Suscripción reactivada para: ${email}`)
      }
    }

    // ────────────────────────────────────────────────────────
    // PURCHASE_EXPIRED / COMPRA_CON_PLAZO_VENCIDO — no activar
    // PURCHASE_EXPIRED / COMPRA_CON_PLAZO_VENCIDO — no activar
    else if (event === 'PURCHASE_EXPIRED' || event === 'PURCHASE_DELAYED') {
      console.log(`Evento ${event} para ${email} — sin acción`)
    }

    else {
      console.log(`Evento no manejado: ${event} — ignorando`)
    }


    return new Response('OK', { status: 200 })

  } catch (e) {
    console.error('webhook-hotmart error:', e)
    // Siempre responder 200 para evitar reintentos innecesarios de Hotmart
    return new Response('OK', { status: 200 })
  }
})
