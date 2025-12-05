"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.text);
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <textarea
        className="border w-full p-2"
        placeholder="Skriv din prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white"
        onClick={generate}
      >
        Generera
      </button>

      <div className="mt-6 whitespace-pre-wrap">{result}</div>
    </main>
  );
}
