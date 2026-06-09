import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI3_MODELS = ["gemini-3.1-flash-image", "gemini-3-pro-image"];

const HYPERREALISM_PROMPT = `. Photorealistic hyperrealistic photograph, not AI-generated look. Shot on Sony A7R V full-frame mirrorless, Zeiss Otus 85mm f/1.4 APO Planar lens, ISO 100, f/1.8 aperture, 1/400s shutter, RAW capture. Natural skin texture with clearly visible pores, individual fine hair strands and eyebrow hairs, realistic subsurface skin scattering, authentic micro-imperfections and slight asymmetries, genuine eye reflections with sharp catchlights, detailed iris texture and pupil. Physically accurate cinematic depth of field with organic out-of-focus bokeh. Professional natural lighting with accurate soft shadows, realistic specular highlights and gradient tones. True-to-life color science, authentic skin tone variation under ambient light. Detailed fabric weave texture, natural hair cuticle shimmer. Razor-sharp subject focus, 8K ultra-high resolution. Not CGI, not illustration, not digital painting, not anime, not cartoon, not 3D render. Real photography quality, photojournalism grade.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const { prompt, model, referenceImage, hyperrealism } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "prompt is required" }), {
        status: 200,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    let googleModel = model || "gemini-3-pro-image";
    if (referenceImage && referenceImage.data && !GEMINI3_MODELS.includes(googleModel)) {
      googleModel = "gemini-3.1-flash-image";
    }

    const googleKey = Deno.env.get("GOOGLE_AI_KEY");
    if (!googleKey) {
      return new Response(JSON.stringify({ error: "GOOGLE_AI_KEY no configurada" }), {
        status: 200,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const isGemini3 = GEMINI3_MODELS.includes(googleModel);
    const imageSize = isGemini3 ? "2K" : "1K";
    const finalPrompt = hyperrealism ? prompt + HYPERREALISM_PROMPT : prompt;

    const parts: any[] = [];
    if (referenceImage && referenceImage.data && referenceImage.mimeType) {
      parts.push({ inlineData: { mimeType: referenceImage.mimeType, data: referenceImage.data } });
    }
    parts.push({ text: finalPrompt });

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
              image: { aspectRatio: "1:1", imageSize },
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Retornar 200 con el error de Google para que el admin lo muestre
      return new Response(
        JSON.stringify({
          error: `Google API error [${response.status}]: ${data?.error?.message || JSON.stringify(data).slice(0, 300)}`
        }),
        { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const resParts = data?.candidates?.[0]?.content?.parts || [];
    const imgPart = resParts.find((p: any) => p.inlineData);

    if (!imgPart) {
      return new Response(
        JSON.stringify({ error: "Sin imagen en respuesta. Raw: " + JSON.stringify(data).slice(0, 400) }),
        { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ b64: imgPart.inlineData.data, mimeType: imgPart.inlineData.mimeType }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Exception: " + String(err) }),
      { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
