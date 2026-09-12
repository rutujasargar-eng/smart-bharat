import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatBot from "../components/ChatBot";
import ComplaintGenerator from "../components/ComplaintGenerator";
import ComplaintHistory from "../components/ComplaintHistory";
import Footer from "../components/Footer";

function Home() {
  const [page, setPage] = useState("home");

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">

      <Navbar page={page} setPage={setPage} />

      <main className="main-container">

        {/* HOME */}
        {page === "home" && (
          <>
            <Hero setPage={setPage} />

            <section className="trust-section">
              <div className="trust-content">
                <span className="trust-icon">🇮🇳</span>

                <div>
                  <h3>Technology for Citizens</h3>
                  <p>
                    Making government services simpler, smarter and more
                    accessible with Artificial Intelligence.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* AI ASSISTANT */}
        {page === "assistant" && (
          <section className="feature-page">

            <div className="page-header">
              <div>
                <span className="page-badge">AI SERVICE</span>

                <h2>🤖 AI Government Assistant</h2>

                <p>
                  Ask questions about government schemes, services,
                  documents and citizen benefits.
                </p>
              </div>

              <button className="home-button" onClick={goHome}>
                ← Back Home
              </button>
            </div>

            <div className="feature-content">
              <ChatBot />
            </div>

          </section>
        )}

        {/* COMPLAINT GENERATOR */}
        {page === "complaint" && (
          <section className="feature-page">

            <div className="page-header">
              <div>
                <span className="page-badge complaint-badge">
                  AI CIVIC SERVICE
                </span>

                <h2>📷 AI Complaint Generator</h2>

                <p>
                  Upload a civic issue image and let AI analyze the problem
                  and generate a professional complaint.
                </p>
              </div>

              <button className="home-button" onClick={goHome}>
                ← Back Home
              </button>
            </div>

            <div className="feature-content">
              <ComplaintGenerator />
            </div>

          </section>
        )}

        {/* HISTORY */}
        {page === "history" && (
          <section className="feature-page">

            <div className="page-header">
              <div>
                <span className="page-badge history-badge">
                  CITIZEN RECORDS
                </span>

                <h2>📜 Complaint History</h2>

                <p>
                  View complaints generated and saved during your session.
                </p>
              </div>

              <button className="home-button" onClick={goHome}>
                ← Back Home
              </button>
            </div>

            <div className="feature-content">
              <ComplaintHistory />
            </div>

          </section>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <section className="feature-page">

            <div className="page-header">
              <div>
                <span className="page-badge about-badge">
                  ABOUT THE PROJECT
                </span>

                <h2>🇮🇳 About Smart Bharat</h2>

                <p>
                  An AI-powered civic platform designed to make citizen
                  services easier and more accessible.
                </p>
              </div>

              <button className="home-button" onClick={goHome}>
                ← Back Home
              </button>
            </div>

            <div className="about-grid">

              <div className="about-card">
                <div className="about-icon">🚀</div>

                <h3>Our Vision</h3>

                <p>
                  Smart Bharat combines Artificial Intelligence with
                  citizen-focused technology to simplify access to government
                  information and civic complaint services.
                </p>
              </div>

              <div className="about-card">
                <div className="about-icon">🧠</div>

                <h3>AI Powered</h3>

                <p>
                  Google Gemini AI is used to answer government-service
                  questions and analyze uploaded civic issue images.
                </p>
              </div>

              <div className="about-card">
                <div className="about-icon">📱</div>

                <h3>Citizen Friendly</h3>

                <p>
                  The platform is designed with a simple interface so that
                  citizens can quickly find information and report issues.
                </p>
              </div>

              <div className="about-card">
                <div className="about-icon">💻</div>

                <h3>Technology Stack</h3>

                <div className="tech-list">
                  <span>React</span>
                  <span>Vite</span>
                  <span>Google Gemini AI</span>
                  <span>JavaScript</span>
                  <span>CSS</span>
                  <span>Local Storage</span>
                </div>
              </div>

            </div>

          </section>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default Home;