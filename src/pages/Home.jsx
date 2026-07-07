import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChatBot from "../components/ChatBot";
import ComplaintGenerator from "../components/ComplaintGenerator";
import ComplaintHistory from "../components/ComplaintHistory";
import Footer from "../components/Footer";

function Home() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-sky-100">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Dashboard */}
        <section className="bg-white rounded-3xl shadow-xl p-8 border">
          <Hero setPage={setPage} />
        </section>

        {/* AI Assistant */}
        {page === "assistant" && (
          <section
            id="assistant"
            className="bg-white rounded-3xl shadow-xl p-8 border"
          >

            <div className="flex justify-between items-center mb-5 border-b pb-3">

              <div>
                <h2 className="text-3xl font-bold text-blue-700">
                  🤖 AI Government Assistant
                </h2>

                <p className="text-gray-500">
                  Ask anything about Government Services, Schemes and Documents.
                </p>
              </div>

              <button
                onClick={() => setPage("home")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
              >
                🏠 Home
              </button>

            </div>

            <ChatBot />

          </section>
        )}

        {/* Complaint Generator */}
        {page === "complaint" && (
          <section
            id="complaint"
            className="bg-white rounded-3xl shadow-xl p-8 border"
          >

            <div className="flex justify-between items-center mb-5 border-b pb-3">

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  📷 AI Complaint Generator
                </h2>

                <p className="text-gray-500">
                  Upload an image and let AI generate a complaint automatically.
                </p>
              </div>

              <button
                onClick={() => setPage("home")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
              >
                🏠 Home
              </button>

            </div>

            <ComplaintGenerator />

          </section>
        )}

        {/* Complaint History */}
        {page === "history" && (
          <section
            id="history"
            className="bg-white rounded-3xl shadow-xl p-8 border"
          >

            <div className="flex justify-between items-center mb-5 border-b pb-3">

              <div>
                <h2 className="text-3xl font-bold text-purple-700">
                  📜 Complaint History
                </h2>

                <p className="text-gray-500">
                  View all complaints saved during this session.
                </p>
              </div>

              <button
                onClick={() => setPage("home")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
              >
                🏠 Home
              </button>

            </div>

            <ComplaintHistory />

          </section>
        )}

        {/* About */}
        {page === "about" && (
          <section className="bg-white rounded-3xl shadow-xl p-8 border">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-orange-600">
                ℹ️ About Smart Bharat
              </h2>

              <button
                onClick={() => setPage("home")}
                className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
              >
                🏠 Home
              </button>

            </div>

            <p className="text-lg text-gray-700 leading-8">
              Smart Bharat is an AI-powered platform that helps citizens access
              government services, generate complaints from images using AI,
              and maintain complaint history in one place.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  🚀 Tech Stack
                </h3>

                <ul className="list-disc ml-6 space-y-2">
                  <li>React + Vite</li>
                  <li>Tailwind CSS</li>
                  <li>Google Gemini AI</li>
                  <li>Local Storage</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-700 mb-3">
                  ⭐ Features
                </h3>

                <ul className="list-disc ml-6 space-y-2">
                  <li>AI Government Assistant</li>
                  <li>AI Complaint Generator</li>
                  <li>Complaint History</li>
                  <li>Multi-language Support</li>
                </ul>
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