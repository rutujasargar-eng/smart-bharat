import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// --------------------
// Chatbot
// --------------------

export async function askGemini(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return "Something went wrong.";
  }
}

// --------------------
// Image Complaint Generator
// --------------------

export async function analyzeComplaintImage(base64Image, mimeType) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are Smart Bharat AI.

Analyze this uploaded civic issue image.

Return ONLY Markdown.

Use exactly this format:

# 🚨 Issue

...

# 🏢 Department

...

# 🔥 Priority

Low / Medium / High

# 📝 Complaint

Write a professional complaint in 60-80 words.

# 💡 Suggested Action

One short suggestion.
`,
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error(error);
    return "Unable to analyze image.";
  }
}