function Hero({ setPage }) {
  return (
    <section className="py-8">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-extrabold text-slate-800">
          AI Powered Government Services
          <br />
          & Civic Complaint Platform
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Choose any feature below to get started.
        </p>

      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-8">

        <button
          onClick={() => setPage("assistant")}
          className="w-72 rounded-2xl bg-blue-600 px-6 py-8 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-blue-700"
        >
          <div className="text-5xl">🤖</div>

          <h2 className="mt-4 text-2xl font-bold">
            AI Assistant
          </h2>

          <p className="mt-3 text-blue-100">
            Government Schemes & Services
          </p>
        </button>

        <button
          onClick={() => setPage("complaint")}
          className="w-72 rounded-2xl bg-green-600 px-6 py-8 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-green-700"
        >
          <div className="text-5xl">📷</div>

          <h2 className="mt-4 text-2xl font-bold">
            Complaint
          </h2>

          <p className="mt-3 text-green-100">
            Upload Image & Generate
          </p>
        </button>

        <button
          onClick={() => setPage("history")}
          className="w-72 rounded-2xl bg-purple-600 px-6 py-8 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-purple-700"
        >
          <div className="text-5xl">📜</div>

          <h2 className="mt-4 text-2xl font-bold">
            History
          </h2>

          <p className="mt-3 text-purple-100">
            Saved Complaints
          </p>
        </button>

        <button
          onClick={() => setPage("about")}
          className="w-72 rounded-2xl bg-orange-500 px-6 py-8 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-orange-600"
        >
          <div className="text-5xl">ℹ️</div>

          <h2 className="mt-4 text-2xl font-bold">
            About
          </h2>

          <p className="mt-3 text-orange-100">
            Project Details
          </p>
        </button>

      </div>

    </section>
  );
}

export default Hero;