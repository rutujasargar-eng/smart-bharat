import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ComplaintHistory() {
  const [history, setHistory] = useState([]);

  function loadHistory() {
    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setHistory(complaints);
  }

  useEffect(() => {
    loadHistory();

    function handleUpdate() {
      loadHistory();
    }

    window.addEventListener("complaintsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("complaintsUpdated", handleUpdate);
    };
  }, []);

  function clearHistory() {
    if (!window.confirm("Clear all complaint history?")) return;

    localStorage.removeItem("complaints");
    setHistory([]);

    window.dispatchEvent(new Event("complaintsUpdated"));
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-end mb-6">

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700"
          >
            🗑 Clear History
          </button>
        )}

      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50 py-12 text-center">

          <div className="text-6xl mb-4">📭</div>

          <h3 className="text-xl font-bold text-purple-700">
            No Complaints Saved
          </h3>

          <p className="mt-2 text-gray-500">
            Save a complaint and it will appear here.
          </p>

        </div>
      ) : (
        <div className="space-y-6 max-h-[650px] overflow-y-auto pr-2">

          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-md transition-all duration-300 hover:shadow-xl"
            >

              <div className="mb-4 flex items-center justify-between">

                <span className="rounded-full bg-purple-700 px-4 py-1 text-sm font-semibold text-white">
                  📅 {item.date}
                </span>

              </div>

              <div className="rounded-xl bg-white p-5 shadow-inner">

                <div className="prose max-w-none prose-headings:text-purple-700 prose-headings:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:my-2 prose-p:my-2">

                  <ReactMarkdown>
                    {item.complaint}
                  </ReactMarkdown>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}