const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Genera un resumen educativo de un fragmento de texto
 */
const resumirChunk = async (chunk) => {
  try {
    const systemPrompt = "Eres un experto en educación. Resume el siguiente texto en los conceptos clave que un estudiante debe aprender. Enumera las ideas principales de forma clara.";
    console.log('Api key:', openai);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // o "gpt-4-turbo" si lo prefieres
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: chunk }
      ],
      temperature: 0.5
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('Error llamando a la API de OpenAI:', error.message);
    throw new Error('Fallo al generar resumen con GPT');
  }
};


/**
 * Genera un mapa conceptual unificado a partir de varios resúmenes
 */
const generarMapaConceptual = async (resumenes) => {
  try {
    const promptBase = `
Quiero que generes un mapa conceptual sobre los resumenes que te entiare, y que devuelvas la respuesta como un JSON válido con dos listas: "nodes" y "links".

Cada node debe tener: id y label.
Cada link debe tener: source, target y opcionalmente label.

Ejemplo:
{
  "nodes": [
    { "id": "seguridad", "label": "Seguridad" },
    { "id": "mfa", "label": "MFA" }
  ],
  "links": [
    { "source": "seguridad", "target": "mfa", "label": "Incluye" }
  ]
}

Por favor, responde solo con el objeto JSON.
- No repitas ideas si ya fueron mencionadas
- Agrupa ideas similares
    `;

    const input = resumenes.join('\n\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: promptBase },
        { role: "user", content: input }
      ],
      temperature: 0.5
    });

    
    const rawContent = completion.choices[0].message.content;
    const cleanedJsonString = rawContent
    .replace(/```json\s*/i, '')
    .replace(/```$/, '')
    .trim();

    let parsed;
    
    parsed = JSON.parse(cleanedJsonString);
    
    return parsed;

  } catch (error) {
    console.error('Error generando mapa conceptual:', error.message);
    throw new Error('Fallo al generar el mapa conceptual.');
  }
};

module.exports = {
  resumirChunk,
  generarMapaConceptual
};
