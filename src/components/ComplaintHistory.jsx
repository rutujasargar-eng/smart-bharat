import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ComplaintHistory() {
  const [history, setHistory] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    loadHistory();

    const handleUpdate = () => {
      loadHistory();
    };

    window.addEventListener("complaintsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("complaintsUpdated", handleUpdate);
    };
  }, []);

  function loadHistory() {
    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setHistory(complaints);
  }

  function clearHistory() {
    if (!window.confirm("Clear all complaint history?")) {
      return;
    }

    localStorage.removeItem("complaints");
    setHistory([]);
    setSelectedComplaint(null);

    window.dispatchEvent(new Event("complaintsUpdated"));
  }

  function openComplaint(item, index) {
    setSelectedComplaint({
      ...item,
      number: history.length - index,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function backToHistory() {
    setSelectedComplaint(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================
     FULL COMPLAINT
  ========================================= */

  if (selectedComplaint) {
    return (
      <div className="sb-detail-page">

        <button
          type="button"
          className="sb-back-button"
          onClick={backToHistory}
        >
          ← Back to History
        </button>

        <div className="sb-detail-card">

          <div className="sb-detail-top">

            <div>
              <div className="sb-detail-label">
                🚨 SAVED COMPLAINT
              </div>

              <h2>
                Complaint #{selectedComplaint.number}
              </h2>
            </div>

            <div className="sb-detail-date">
              📅 {selectedComplaint.date}
            </div>

          </div>

          <div className="sb-detail-body">

            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="sb-detail-heading">
                    {children}
                  </h2>
                ),

                h2: ({ children }) => (
                  <h2 className="sb-detail-heading">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="sb-detail-heading">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="sb-detail-text">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="sb-detail-list">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="sb-detail-list">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),
              }}
            >
              {selectedComplaint.complaint}
            </ReactMarkdown>

          </div>

          <div className="sb-detail-footer">
            ✓ Saved in your Smart Bharat session history
          </div>

        </div>

      </div>
    );
  }

  /* =========================================
     HISTORY LIST
  ========================================= */

  return (
    <div className="sb-history-container">

      {/* HEADER */}

      <div className="sb-history-header">

        <div>
          <h3>
            📋 Saved Complaints
          </h3>

          <p>
            {history.length}{" "}
            {history.length === 1
              ? "complaint"
              : "complaints"}{" "}
            saved during this session.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            className="sb-clear-button"
            onClick={clearHistory}
          >
            🗑 Clear History
          </button>
        )}

      </div>


      {/* EMPTY */}

      {history.length === 0 ? (

        <div className="sb-empty">

          <div className="sb-empty-icon">
            📭
          </div>

          <h3>
            No Complaints Saved
          </h3>

          <p>
            Generate and save a complaint from the AI
            Complaint Generator and it will appear here.
          </p>

        </div>

      ) : (

        <div className="sb-complaint-list">

          {history.map((item, index) => {

            const number = history.length - index;

            return (
              <div
                className="sb-complaint-card"
                key={item.id || index}
              >

                {/* TOP */}

                <div className="sb-card-header">

                  <div className="sb-card-title">
                    🚨 Complaint #{number}
                  </div>

                  <div className="sb-card-date">
                    📅 {item.date}
                  </div>

                </div>


                {/* PREVIEW */}

                <div className="sb-card-preview">

                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h3 className="sb-preview-heading">
                          {children}
                        </h3>
                      ),

                      h2: ({ children }) => (
                        <h3 className="sb-preview-heading">
                          {children}
                        </h3>
                      ),

                      h3: ({ children }) => (
                        <h3 className="sb-preview-heading">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="sb-preview-text">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {item.complaint}
                  </ReactMarkdown>

                </div>


                {/* BOTTOM */}

                <div className="sb-card-footer">

                  <span className="sb-saved">
                    ✓ Saved
                  </span>

                  <button
                    type="button"
                    className="sb-read-more"
                    onClick={() => openComplaint(item, index)}
                  >
                    Read More →
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}