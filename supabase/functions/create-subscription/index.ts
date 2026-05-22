// ============================================================
//  AURA LANGUAGES — Edge Function: create-subscription
//  Crea una suscripcion en MercadoPago (preapproval).
//  Incluye todos los campos recomendados por MP para
//  maximizar calidad de integracion y tasa de aprobacion.
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL    = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SRK   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')!
const MP_API          = 'https://api.mercadopago.com'
const WEBHOOK_URL     = 'https://vceuxruenbepzflopkbw.supabase.co/functions/v1/webhook-mp'

const PRICES_COP: Record<string, number> = {
  solo_monthly:      75600,
  solo_quarterly:   205800,
  solo_annual:      835800,
  combo_monthly:    100800,
  combo_quarterly:  289800,
  combo_annual:    1045800,
  maestro_monthly:  205800,
  maestro_quarterly:583800,
  maestro_annual:  2095800,
}

const FREQUENCY: Record<string, { frequency: number; frequency_type: string }> = {
  monthly:   { frequency: 1,  frequency_type: 'months' },
  quarterly: { frequency: 3,  frequency_type: 'months' },
  annual:    { frequency: 12, frequency_type: 'months' },
}

const LANG_COUNT: Record<string, number> = {
  solo: 1, combo: 3, maestro: 5,
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { ...corsHeaders, 'Access-Control-Allow-Headers': 'authorization, content-type' },
    })
  }

  try {
    const {
      token, plan, billingPeriod, trial,
      userEmail, userId, userName,
      selectedLanguages, deviceId, identification,
    } = await req.json()

    if (!token || !plan || !billingPeriod || !userId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Faltan campos requeridos' }),
        { headers: corsHeaders, status: 400 },
      )
    }

    const supabase  = createClient(SUPABASE_URL, SUPABASE_SRK)
    const key       = `${plan}_${billingPeriod}`
    const amountCOP = PRICES_COP[key]
    const freq      = FREQUENCY[billingPeriod]
    const langCount = LANG_COUNT[plan] ?? 1

    if (!amountCOP || !freq) {
      return new Response(
        JSON.stringify({ success: false, message: `Plan no reconocido: ${key}` }),
        { headers: corsHeaders, status: 400 },
      )
    }

    const langsToSave: string[] = Array.isArray(selectedLanguages) && selectedLanguages.length
      ? [...new Set(selectedLanguages)] as string[]
      : ['en']

    // Separar nombre y apellido
    const nameParts = (userName ?? '').trim().split(' ')
    const firstName = nameParts[0] ?? ''
    const lastName  = nameParts.slice(1).join(' ') || firstName

    // Crear suscripcion con todos los campos recomendados por MP
    const subBody: Record<string, unknown> = {
      reason:             `Aura Languages - Plan ${plan} (${billingPeriod})`,
      external_reference: userId,
      notification_url:   WEBHOOK_URL,
      auto_recurring: {
        ...freq,
        transaction_amount: amountCOP,
        currency_id:        'COP',
      },
      payer_email:      userEmail,
      payer_first_name: firstName,
      payer_last_name:  lastName,
      card_token_id:    token,
      back_url:         'https://auralanguage.app/dashboard.html',
      status:           'authorized',
    }

    // Identificacion del pagador (reduce rechazos por fraude)
    if (identification?.type && identification?.number) {
      subBody.payer_identification = {
        type:   identification.type,
        number: String(identification.number),
      }
    }

    // Trial de 7 dias solo para plan solo
    if (trial === true && plan === 'solo') {
      (subBody.auto_recurring as any).free_trial = {
        frequency:      7,
        frequency_type: 'days',
      }
    }

    console.log('Creating subscription:', userEmail, '| plan:', key, '| amount:', amountCOP, '| trial:', trial, '| deviceId:', deviceId ? 'YES' : 'NO', '| identification:', identification?.type || 'NO')

    const mpHeaders: Record<string, string> = {
      'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
      'Content-Type':  'application/json',
    }
    if (deviceId) mpHeaders['X-meli-session-id'] = deviceId

    const subRes = await fetch(`${MP_API}/preapproval`, {
      method:  'POST',
      headers: mpHeaders,
      body:    JSON.stringify(subBody),
    })
    const sub = await subRes.json()
    console.log('MP status:', subRes.status, '| sub.status:', sub.status, '| id:', sub.id, '| error:', sub.message)

    if (!sub.id) {
      return new Response(
        JSON.stringify({ success: false, message: sub.message ?? 'No se pudo crear la suscripcion' }),
        { headers: corsHeaders },
      )
    }

    const isTrial    = trial === true && plan === 'solo'
    const planStatus = isTrial ? 'trial' : 'active'
    const planExpiry = isTrial
      ? new Date(Date.now() + 7 * 86400000).toISOString()
      : new Date(Date.now() + (freq.frequency * 30) * 86400000).toISOString()

    const { error } = await supabase.from('profiles').update({
      plan,
      billing_period:     billingPeriod,
      plan_status:        planStatus,
      plan_expires_at:    planExpiry,
      mp_subscription_id: String(sub.id),
      languages_unlocked: langCount,
      selected_languages: langsToSave,
    }).eq('id', userId)

    if (error) throw error

    console.log('Profile upda