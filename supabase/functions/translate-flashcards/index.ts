import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LANGS = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese (Brazilian)" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // Verify admin user
    const auth = req.headers.get("Authorization");
    if (!auth) return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { ...CORS, "Content-Type": "application/json" } });

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: auth } } }
    );
    const { data: { user }, error: authErr } = await sb.auth.getUser();
    if (authErr || !user) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401, headers: { ...CORS, "Content-Type": "application/json" } });

    // Verify admin role
    const { data: profile } = await sb.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || profile.role !== "admin") {
      return new Response(JSON.stringify({ error: "Solo admins" }), { status: 403, headers: { ...CORS, "Content-Type": "application/json" } });
    }

    const body = await req.json().catch(() => ({}));
    const targetLang = body.lang; // optional: translate only one language

    // Load slangs.json from GitHub
    const slangsRes = await fetch("https://raw.githubusercontent.com/sergiosaacx/aura-languages/main/slangs.json");
    const slangs: Array<{ word: string; definition: string; distractor?: string }> = await slangsRes.json();

    const oaiKey = Deno.env.get("OPENAI_API_KEY");
    const sbAdmin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const langsToProcess = targetLang ? LANGS.filter(l => l.code === targetLang) : LANGS;
    const results: Record<string, number> = {};

    for (const lang of langsToProcess) {
      const BATCH = 50;
      let saved = 0;

      for (let i = 0; i < slangs.length; i += BATCH) {
        const batch = slangs.slice(i, i + BATCH).map(c => ({
          word: c.word,
          definition: c.definition,
          distractor: c.distractor || c.definition,
        }));

        const prompt = `Translate the following English slang card definitions and distractors from Spanish to ${lang.name}.
Return ONLY a valid JSON array. Each object must have exactly these keys: "word", "definition", "distractor".
Keep the word field unchanged (it is English slang, do not translate it).
Translate only "definition" and "distractor" fields. Be natural and concise.

Cards:
${JSON.stringify(batch)}`;

        const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${oaiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 4096,
            temperature: 0.3,
          }),
        });

        const oaiData = await oaiRes.json();
        const raw = oaiData.choices?.[0]?.message?.content || "[]";
        const cleaned = raw.replace(/```json|```/g, "").trim();

        let translated: Array<{ word: string; definition: string; distractor: string }> = [];
        try { translated = JSON.parse(cleaned); } catch { continue; }

        const rows = translated.map(t => ({
          word: t.word,
          lang: lang.code,
          definition: t.definition,
          distractor: t.distractor,
        }));

        await sbAdmin.from("flashcard_translations").upsert(rows, { onConflict: "word,lang" });
        saved += rows.length;
      }

      results[lang.code] = saved;
    }

    return new Response(JSON.stringify({ ok: true, translated: results }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
