import { GoogleGenAI, Type, Modality } from '@google/genai';

// Environment variable required: EXPO_PUBLIC_GEMINI_API_KEY
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""; 

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function summarizeContext(notes: string, links: string[]) {
  const prompt = `
You are an expert productivity assistant. A user is returning to a task after being away.
They left the following notes and links before they left.

Notes:
${notes}

Links:
${links.join('\n')}

Analyze this context and provide a crisp summary to help them re-orient immediately.
Return the result as a JSON object with the following structure:
{
  "leftOff": "A short paragraph summarizing exactly where they left off.",
  "nextSteps": ["Actionable step 1", "Actionable step 2", ...],
  "resources": ["Important resource mentioned or implied 1", ...]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            leftOff: {
              type: Type.STRING,
              description: 'Summary of where the user left off',
            },
            nextSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of actionable next steps',
            },
            resources: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of key resources or links',
            },
          },
          required: ['leftOff', 'nextSteps', 'resources'],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error('No response text');
  } catch (error) {
    console.error('Error summarizing context:', error);
    throw error;
  }
}

export async function generateTitle(notes: string) {
  const prompt = `Generate a short, concise title (max 5 words) for the following task notes:\n\n${notes}`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || 'Untitled Task';
  } catch (error) {
    console.error('Error generating title:', error);
    return 'Untitled Task';
  }
}

export async function processVoiceDump(transcript: string) {
  const prompt = `
    You are an expert productivity assistant. The user just recorded a voice ramble to dump their thoughts before leaving a task.
    Raw transcript:
    "${transcript}"

    Understand the context, fix any dictation errors, and structure this into a clean JSON object.
    Format:
    {
      "title": "Short punchy title (max 5 words)",
      "notes": "Cleaned up, well-formatted version of their notes. Fix grammar and make it readable, but keep all details.",
      "links": ["Extract any URLs or links mentioned. If none, empty array."],
      "summary": {
        "leftOff": "1-2 sentences on exactly where they left off",
        "nextSteps": ["Actionable step 1", "Actionable step 2"],
        "resources": ["Relevant resource 1"]
      }
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  });

  const text = response.text;
  if (!text) throw new Error('Failed to process voice dump');
  return JSON.parse(text);
}

export async function generateSpeech(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Zephyr' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error('Failed to generate speech');
  return base64Audio;
}
