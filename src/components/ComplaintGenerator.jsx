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
    if (!image) return;

    setLoading(true);

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
        setResult("❌ Failed to analyze image.");
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

    window.dispatchEvent(new Event("complaintsUpdated"));

    alert("✅ Complaint Saved!");
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* Upload Box */}

      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-green-300 bg-green-50 p-8 text-center transition hover:bg-green-100">

        <div className="mb-3 text-5xl">📷</div>

        <p className="text-lg font-semibold text-green-700">
          Click to Upload Image
        </p>

        <p className="mt-2 text-sm text-gray-500">
          JPG, PNG or JPEG
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />

      </label>

      {/* Preview */}

      {preview && (
        <div className="mt-8 flex justify-center">

          <img
            src={preview}
            alt="Preview"
            className="max-h-80 rounded-3xl border-4 border-white shadow-xl"
          />

        </div>
      )}

      {/* Analyze Button */}

      <button
        onClick={analyzeImage}
        disabled={!image || loading}
        className="mt-8 w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "🤖 Analyzing Image..." : "🔍 Analyze Image"}
      </button>

      {/* Result */}

      {result && (
        <div className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8 shadow-lg">

          <h3 className="mb-6 text-2xl font-bold text-green-700">
            📋 AI Analysis
          </h3>

          <div className="max-h-[450px] overflow-y-auto rounded-2xl border border-green-200 bg-white p-6 shadow-inner">

            <div className="prose max-w-none prose-headings:text-green-700 prose-headings:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:my-2 prose-p:my-2">

              <ReactMarkdown>
                {result}
              </ReactMarkdown>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

            <button
              onClick={copyComplaint}
              className="rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700"
            >
              📋 Copy Complaint
            </button>

            <button
              onClick={downloadComplaint}
              className="rounded-xl bg-green-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-green-700"
            >
              ⬇ Download
            </button>

            <button
              onClick={saveComplaint}
              className="rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-purple-700"
            >
              💾 Save
            </button>

          </div>

        </div>
      )}

    </div>
  );
}