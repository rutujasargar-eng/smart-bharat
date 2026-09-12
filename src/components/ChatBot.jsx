import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { askGemini } from "../services/gemini";

export default function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  async function handleAsk() {
    if (!question.trim() || loading) return;

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

      if (result) {
        setAnswer(result);
      } else {
        setAnswer(
          "❌ No response was received. Please try again."
        );
      }
    } catch (error) {
      console.error("Chat Error:", error);

      setAnswer(
        "❌ Something went wrong. Please try again."
      );
    }

    setLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  }

  function clearChat() {
    setQuestion("");
    setAnswer("");
  }

  return (
    <div className="sb-chat-container">

      {/* =================================
          AI HEADER
      ================================= */}

      <div className="sb-chat-header">

        <div className="sb-chat-avatar">
          🤖
        </div>

        <div className="sb-chat-header-text">

          <div className="sb-chat-title">
            Smart Bharat AI
            <span className="sb-online-dot"></span>
          </div>

          <p>
            Your AI assistant for Indian government services
          </p>

        </div>

      </div>


      {/* =================================
          LANGUAGE
      ================================= */}

      <div className="sb-language-section">

        <label>
          🌐 Response Language
        </label>

        <select
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value)
          }
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
        </select>

      </div>


      {/* =================================
          QUESTION
      ================================= */}

      <div className="sb-question-section">

        <label>
          💬 Ask your question
        </label>

        <div className="sb-input-wrapper">

          <textarea
            rows={4}
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Example: How do I apply for a PAN Card?"
            disabled={loading}
          />

          <div className="sb-input-footer">

            <span>
              {question.length}/500
            </span>

            <span>
              Press Enter to ask
            </span>

          </div>

        </div>

        {/* Buttons */}

        <div className="sb-chat-actions">

          <button
            type="button"
            className="sb-clear-chat"
            onClick={clearChat}
            disabled={!question && !answer}
          >
            Clear
          </button>

          <button
            type="button"
            className="sb-ask-button"
            onClick={handleAsk}
            disabled={loading || !question.trim()}
          >

            {loading ? (
              <>
                <span className="sb-spinner"></span>
                Thinking...
              </>
            ) : (
              <>
                ✦ Ask Smart Bharat
                <span>→</span>
              </>
            )}

          </button>

        </div>

      </div>


      {/* =================================
          LOADING
      ================================= */}

      {loading && (

        <div className="sb-thinking-card">

          <div className="sb-thinking-icon">
            🤖
          </div>

          <div>
            <strong>
              Smart Bharat AI is thinking...
            </strong>

            <p>
              Finding the most useful information for you.
            </p>
          </div>

        </div>

      )}


      {/* =================================
          USER QUESTION
      ================================= */}

      {answer && !loading && (

        <div className="sb-conversation">

          <div className="sb-user-message">

            <div className="sb-message-label">
              <span>👤</span>
              You asked
            </div>

            <p>
              {question}
            </p>

          </div>


          {/* =================================
              AI RESPONSE
          ================================= */}

          <div className="sb-ai-response">

            <div className="sb-ai-response-header">

              <div className="sb-ai-icon">
                🤖
              </div>

              <div>
                <strong>
                  Smart Bharat AI
                </strong>

                <span>
                  AI Generated Response
                </span>
              </div>

            </div>


            <div className="sb-ai-content">

              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="sb-ai-heading">
                      {children}
                    </h2>
                  ),

                  h2: ({ children }) => (
                    <h2 className="sb-ai-heading">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="sb-ai-heading">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="sb-ai-text">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="sb-ai-list">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="sb-ai-list">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li>{children}</li>
                  ),

                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {answer}
              </ReactMarkdown>

            </div>

            <div className="sb-ai-footer">
              🇮🇳 Smart Bharat • Powered by Artificial Intelligence
            </div>

          </div>

        </div>

      )}

    </div>
  );
}