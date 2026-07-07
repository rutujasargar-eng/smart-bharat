import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askGemini } from "../services/gemini";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    const prompt = `
You are Smart Bharat AI, an AI assistant for Indian citizens.

Answer ONLY in ${language}.

IMPORTANT RULES:

- Return ONLY GitHub Markdown.
- Use ## for headings.
- Never use **Heading**.
- Never write bullets on the same line.
- Never write long paragraphs.
- Every heading must start with ##.
- Every bullet must start with "-".
- Every bullet must be on a NEW LINE.
- Every numbered step must be on a NEW LINE.
- Keep answers under 100 words.
- Use simple language.
- Mention documents if required.
- Mention fees if applicable.
- Mention processing time if applicable.
- Mention the official website if available.
- End with one useful tip.

Use EXACTLY this format:

## 📋 Documents Required

- Document 1
- Document 2
- Document 3

## 📝 Steps

1. Step One

2. Step Two

3. Step Three

4. Step Four

## 💰 Fees

₹...

## ⏳ Processing Time

...

## 🌐 Official Website

https://...

## 💡 Tip

...

Question:

${question}
`;

    try {
      const result = await askGemini(prompt);
      setAnswer(result);
    } catch (error) {
      setAnswer("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Language */}

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          🌐 Select Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border-2 border-blue-200 p-3 outline-none focus:border-blue-500"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>
      </div>

      {/* Question */}

      <textarea
        rows={5}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: How do I apply for a PAN Card?"
        className="w-full rounded-xl border-2 border-blue-200 p-4 text-lg shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] disabled:bg-blue-400"
      >
        {loading ? "🤖 Thinking..." : "🚀 Ask Smart Bharat"}
      </button>

      {answer && (
        <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-lg">

          <h3 className="mb-6 text-2xl font-bold text-blue-700">
            🤖 Smart Bharat Response
          </h3>

          <div className="max-h-[450px] overflow-y-auto rounded-2xl border border-blue-200 bg-white p-6 shadow-inner">

            <div className="prose max-w-none prose-headings:text-blue-700 prose-headings:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:my-2 prose-p:my-2">

              <ReactMarkdown>
                {answer}
              </ReactMarkdown>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}