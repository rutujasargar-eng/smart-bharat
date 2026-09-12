// ==========================
// AI CHAT
// ==========================

export async function askGemini(prompt) {
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    return data.response;

  } catch (error) {

    console.error("Gemini Chat Error:", error);

    return "Something went wrong. Please try again.";
  }
}


// ==========================
// IMAGE COMPLAINT ANALYSIS
// ==========================

export async function analyzeComplaintImage(
  base64Image,
  mimeType
) {
  try {

    const response = await fetch(
      "http://localhost:5000/api/analyze-image",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          image: base64Image,
          mimeType,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Image analysis failed"
      );
    }

    return data.response;

  } catch (error) {

    console.error(
      "Gemini Image Analysis Error:",
      error
    );

    return "Unable to analyze image.";
  }
}