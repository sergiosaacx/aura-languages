import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { prompt, model, referenceImage } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "prompt is required" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const googleModel = model || "gemini-2.5-flash-image";
    const googleKey = Deno.env.get("GOOGLE_AI_KEY");

    if (!googleKey) {
      return new Response(JSON.stringify({ error: "GOOGLE_AI_KEY not configured" }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Build parts: when reference image present, instruct editing
    const parts: any[] = [];
    if (referenceImage && referenceImage.data && referenceImage.mimeType) {
      parts.push({ text: `Edita esta imagen siguiendo exactamente estas instrucciones: ${prompt}. Mantén todos los demás elementos iguales.` });
      parts.push({ inlineData: { mimeType: referenceImage.mimeType, data: referenceImage.data } });
    } else {
      parts.push({ text: prompt });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${googleModel}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": googleKey,
        },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error || "Google API error", details: data }), {
        status: response.status,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Extract image part from response
    const resParts = data?.candidates?.[0]?.content?.parts || [];
    const imgPart = resParts.find((p: any) => p.inlineData);

    if (!imgPart) {
      return new Response(JSON.stringify({ error: "No image in response", raw: data }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        b64: imgPart.inlineData.data,
        mimeType: imgPart.inlineData.mimeType,
      }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
