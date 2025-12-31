"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://localhost:1919";

export function TranscribeForm({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = { audioPath: formData.get("audioPath") };

    try {
      await axios.post(`${API_URL}/sessions/${sessionId}/transcribe`, data);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to transcribe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Upload Audio</h2>
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      <div className="flex gap-2">
        <input
          name="audioPath"
          required
          placeholder="/path/to/audio.mp3"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Transcribe"}
        </button>
      </div>
    </form>
  );
}
