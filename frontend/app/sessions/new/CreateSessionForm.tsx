"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://localhost:1919";

export function CreateSessionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      therapistId: formData.get("therapistId"),
      clientId: formData.get("clientId"),
      startTime: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${API_URL}/sessions`, data);
      router.push(`/sessions/${res.data.sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div>
        <label className="block font-medium mb-2">Therapist ID</label>
        <input
          name="therapistId"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">Client ID</label>
        <input name="clientId" required className="w-full p-2 border rounded" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Session"}
      </button>
    </form>
  );
}
