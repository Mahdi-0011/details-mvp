"use client";

import { useState } from "react";

export default function GeminiCaptionPage() {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setCaption("");

    const res = await fetch("/api/image", {
      method: "POST",
    });

    const data = await res.json();
    setCaption(data.caption || "No caption returned.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Gemini Image Caption Demo
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Click the button to ask Gemini to caption the image from the API route.
        </p>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>

        {caption && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h2 className="font-semibold mb-2">Caption:</h2>
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
