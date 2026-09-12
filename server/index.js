import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.8-flash";


// ==========================
// HELPER: RETRY GEMINI REQUEST
// ==========================

async function generateWithRetry(request, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(request);

    } catch (error) {

      const status = error?.status;

      console.log(
        `Gemini attempt ${attempt + 1} failed with status: ${status}`
      );

      // Retry only temporary errors
      if (
        (status === 503 || status === 429) &&
        attempt < maxRetries
      ) {
        const delay = 3000 * Math.pow(2, attempt);

        console.log(
          `Gemini temporarily unavailable. Retrying in ${delay / 1000} seconds...`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));

      } else {
        throw error;
      }
    }
  }
}


// ==========================
// AI CHAT
// ==========================

app.post("/api/chat", async (req, res) => {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await generateWithRetry({
      model: MODEL,
      contents: prompt,
    });

    res.json({
      response: response.text,
    });

  } catch (error) {

    console.error("Gemini Chat Error:", error);

    res.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});


// ==========================
// IMAGE COMPLAINT ANALYSIS
// ==========================

app.post("/api/analyze-image", async (req, res) => {
  try {

    const { image, mimeType } = req.body;

    if (!image || !mimeType) {
      return res.status(400).json({
        error: "Image and mimeType are required",
      });
    }

    const response = await generateWithRetry({

      model: MODEL,

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
                data: image,
              },
            },
          ],
        },
      ],
    });

    res.json({
      response: response.text,
    });

  } catch (error) {

    console.error("Gemini Image Error:", error);

    res.status(500).json({
      error: "Failed to analyze image",
    });
  }
});


// ==========================
// SERVER
// ==========================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Smart Bharat server running on http://localhost:${PORT}`
  );
});