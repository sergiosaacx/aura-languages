import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// gemini-2.5-flash-image does NOT support reference images — must use Gemini 3 models
const GEMINI3_MODELS = ["gemini-3.1-flash-image", "gemini-3-pro-image"];

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

    // If reference image is present and model doesn't support it, upgrade to Nano Banana 2
    let googleModel = model || "gemini-3-pro-image";
    if (referenceImage && referenceImage.data && !GEMINI3_MODELS.includes(googleModel)) {
      googleModel = "gemini-3.1-flash-image";
    }

    const googleKey = Deno.env.get("GOOGLE_AI_KEY");
    if (!googleKey) {
      return new Response(JSON.stringify({ error: "GOOGLE_AI_KEY not configured" }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    // Build parts array
    const parts: any[] = [];
    if (referenceImage && referenceImage.data && referenceImage.mimeType) {
      parts.push({ text: `Edita esta imagen siguiendo exactamente estas instrucciones: ${prompt}. Mantén todos los demás elementos iguales.` });
      parts.push({ inlineData: { mimeType: referenceImage.mimeType, data: referenceImage.data } });
    } else {
      parts.push({ text: prompt });
    }

    // Resolution: Nano Banana Pro / Nano Banana 2 support 4K, basic only 1K
    const imageSize = GEMINI3_MODELS.includes(googleModel) ? "2K" : "1K";

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
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
            responseFormat: {
              image: {
                aspectRatio: "1:1",
                imageSize: imageSize,
              },
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Google API error", details: data?.error?.message || JSON.stringify(data) }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const resParts = data?.candidates?.[0]?.content?.parts || [];
    const imgPart = resParts.find((p: any) => p.inlineData);

    if (!imgPart) {
      return new Response(JSON.stringify({ error: "No image in response", raw: JSON.stringify(data).slice(0, 300) }), {
        status: 500,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ b64: imgPart.inlineData.data, mimeType: imgPart.inlineData.mimeType }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
