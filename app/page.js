"use client";
import { useState } from "react";

export default function Home() {
  const [diff, setDiff] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState("");

  async function generate() {
    if (!diff.trim()) return;
    setLoading(true);
    setMessages([]);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diff }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setMessages(data.messages);
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  function copy(msg, i) {
    navigator.clipboard.writeText(msg);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">CommitMsg <span className="text-green-400">AI</span></h1>
          <p className="text-gray-400 text-sm">Paste your git diff → get 5 perfect commit messages instantly</p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Your git diff</label>
          <textarea
            className="w-full h-56 bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm font-mono text-gray-200 resize-none focus:outline-none focus:border-green-500 transition-colors placeholder-gray-700"
            placeholder={`paste your git diff here...\n\nexample:\ndiff --git a/auth.js b/auth.js\n- return null\n+ return user ?? null`}
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-600">{diff.length} chars</span>
            {diff && <button onClick={() => setDiff("")} className="text-xs text-gray-600 hover:text-gray-400">clear</button>}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generate}
          disabled={loading || !diff.trim()}
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 disabled:bg-gray-800 disabled:text-gray-600 text-black font-semibold transition-all text-sm"
        >
          {loading ? "Generating..." : "Generate Commit Messages →"}
        </button>

        {/* Error */}
        {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}

        {/* Results */}
        {messages.length > 0 && (
          <div className="mt-8">
            <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block">Pick one</label>
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 hover:border-green-500 transition-colors group">
                  <span className="text-sm font-mono text-gray-200 flex-1 pr-4">{msg}</span>
                  <button
                    onClick={() => copy(msg, i)}
                    className="text-xs text-gray-500 group-hover:text-green-400 transition-colors whitespace-nowrap"
                  >
                    {copied === i ? "✓ copied" : "copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        
      </div>
    </main>
  );
}