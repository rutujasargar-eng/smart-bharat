function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <nav className="max-w-7xl mx-auto py-5 px-6">

        <div className="text-center">

          <h1 className="text-5xl font-extrabold text-blue-700">
            🇮🇳 Smart Bharat
          </h1>

          <p className="mt-2 text-xl font-medium text-gray-600">
            AI Powered Civic Companion
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-5">

            <button
              onClick={() => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-bold shadow hover:bg-blue-700 transition"
            >
              🤖 AI Assistant
            </button>

            <button
              onClick={() => document.getElementById("complaint")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-green-600 px-6 py-3 text-white font-bold shadow hover:bg-green-700 transition"
            >
              📷 Complaint Generator
            </button>

            <button
              onClick={() => document.getElementById("history")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-purple-600 px-6 py-3 text-white font-bold shadow hover:bg-purple-700 transition"
            >
              📜 History
            </button>

          </div>

        </div>

      </nav>

    </header>
  );
}

export default Navbar;