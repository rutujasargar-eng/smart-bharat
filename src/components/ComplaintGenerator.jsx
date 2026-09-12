import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { analyzeComplaintImage } from "../services/gemini";

export default function ComplaintGenerator() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  }

  async function analyzeImage() {
    if (!image || loading) return;

    setLoading(true);
    setResult("");

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        const response = await analyzeComplaintImage(
          base64,
          image.type
        );

        setResult(response);
      } catch (err) {
        console.error(err);
        setResult("❌ Failed to analyze image. Please try again.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(image);
  }

  function copyComplaint() {
    navigator.clipboard.writeText(result);
    alert("✅ Complaint copied successfully!");
  }

  function downloadComplaint() {
    const blob = new Blob([result], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Smart_Bharat_Complaint.txt";

    a.click();

    URL.revokeObjectURL(url);
  }

  function saveComplaint() {
    if (!result) return;

    const history =
      JSON.parse(localStorage.getItem("complaints")) || [];

    history.unshift({
      id: Date.now(),
      date: new Date().toLocaleString(),
      complaint: result,
    });

    localStorage.setItem(
      "complaints",
      JSON.stringify(history)
    );

    window.dispatchEvent(
      new Event("complaintsUpdated")
    );

    alert("✅ Complaint Saved!");
  }

  function resetGenerator() {
    setImage(null);
    setPreview(null);
    setResult("");
  }

  return (
    <div className="sb-complaint-generator">

      {/* =========================================
          UPLOAD SECTION
      ========================================= */}

      {!preview && (

        <label className="sb-upload-box">

          <div className="sb-upload-icon">
            📷
          </div>

          <h3>
            Upload a Civic Issue
          </h3>

          <p>
            Upload a photo of a pothole, garbage,
            broken streetlight or other civic problem.
          </p>

          <span className="sb-upload-button">
            Choose Image
          </span>

          <small>
            JPG, PNG or JPEG • Max recommended size 10MB
          </small>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImage}
            hidden
          />

        </label>

      )}


      {/* =========================================
          IMAGE PREVIEW
      ========================================= */}

      {preview && (

        <div className="sb-image-section">

          <div className="sb-image-header">

            <div>
              <span className="sb-section-label">
                UPLOADED IMAGE
              </span>

              <h3>
                Civic Issue Photo
              </h3>
            </div>

            <button
              type="button"
              className="sb-change-image"
              onClick={resetGenerator}
              disabled={loading}
            >
              ↻ Change Image
            </button>

          </div>


          <div className="sb-image-preview">

            <img
              src={preview}
              alt="Uploaded civic issue"
            />

          </div>


          <div className="sb-file-info">

            <div>
              <strong>
                {image?.name}
              </strong>

              <span>
                {image
                  ? `${(image.size / 1024 / 1024).toFixed(2)} MB`
                  : ""}
              </span>
            </div>

            <span className="sb-file-ready">
              ✓ Ready for AI analysis
            </span>

          </div>


          {/* Analyze */}

          <button
            type="button"
            onClick={analyzeImage}
            disabled={loading}
            className="sb-analyze-button"
          >

            {loading ? (
              <>
                <span className="sb-analysis-spinner"></span>
                AI is analyzing the image...
              </>
            ) : (
              <>
                🔍 Analyze Civic Issue
                <span>→</span>
              </>
            )}

          </button>


          {/* Thinking */}

          {loading && (

            <div className="sb-analysis-status">

              <div className="sb-analysis-icon">
                🤖
              </div>

              <div>

                <strong>
                  Smart Bharat AI is analyzing
                </strong>

                <p>
                  Identifying the issue, department,
                  priority and recommended action...
                </p>

              </div>

            </div>

          )}

        </div>

      )}


      {/* =========================================
          AI RESULT
      ========================================= */}

      {result && !loading && (

        <div className="sb-analysis-result">

          {/* Result Header */}

          <div className="sb-result-header">

            <div className="sb-result-title">

              <div className="sb-result-icon">
                🤖
              </div>

              <div>
                <span>
                  AI ANALYSIS COMPLETE
                </span>

                <h3>
                  Civic Issue Report
                </h3>
              </div>

            </div>

            <div className="sb-result-status">
              ✓ Generated
            </div>

          </div>


          {/* Result Content */}

          <div className="sb-result-content">

            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="sb-result-heading">
                    {children}
                  </h2>
                ),

                h2: ({ children }) => (
                  <h2 className="sb-result-heading">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="sb-result-heading">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="sb-result-text">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="sb-result-list">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="sb-result-list">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),
              }}
            >
              {result}
            </ReactMarkdown>

          </div>


          {/* Actions */}

          <div className="sb-result-actions">

            <button
              type="button"
              className="sb-copy-button"
              onClick={copyComplaint}
            >
              📋 Copy Complaint
            </button>

            <button
              type="button"
              className="sb-download-button"
              onClick={downloadComplaint}
            >
              ⬇ Download
            </button>

            <button
              type="button"
              className="sb-save-button"
              onClick={saveComplaint}
            >
              💾 Save to History
            </button>

          </div>


          {/* New analysis */}

          <button
            type="button"
            className="sb-new-analysis"
            onClick={resetGenerator}
          >
            ↻ Analyze Another Image
          </button>

        </div>

      )}

    </div>
  );
}