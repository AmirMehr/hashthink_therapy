"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://localhost:1919";

export function ActionButtons({
  sessionId,
  hasSummary,
}: {
  sessionId: string;
  hasSummary: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState({ summary: false, embed: false });

  async function handleSummary() {
    setLoading({ ...loading, summary: true });
    try {
      await axios.get(`${API_URL}/sessions/${sessionId}/summary`);
      router.refresh();
    } finally {
      setLoading({ ...loading, summary: false });
    }
  }

  async function handleEmbed() {
    setLoading({ ...loading, embed: true });
    try {
      await axios.post(`${API_URL}/sessions/${sessionId}/embed`);
      router.refresh();
    } finally {
      setLoading({ ...loading, embed: false });
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={handleSummary}
        disabled={loading.summary || hasSummary}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading.summary ? "Generating..." : "Generate Summary"}
      </button>
      <button
        onClick={handleEmbed}
        disabled={loading.embed}
        className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 disabled:opacity-50"
      >
        {loading.embed ? "Embedding..." : "Generate Embedding"}
      </button>
    </div>
  );
}
