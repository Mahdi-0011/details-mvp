"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/describe");
      const data = await res.json();
      setText(data.describe);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Description (Swedish)</h1>

      {loading ? (
        <p>Generating description…</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {text}
        </pre>
      )}
    </div>
  );
}
