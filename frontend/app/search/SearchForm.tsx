"use client";

import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { Session } from "@/lib/types";

const API_URL = "http://localhost:1919";

export function SearchForm() {
  const [results, setResults] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");

    try {
      const res = await axios.get(`${API_URL}/search?q=${query}`);
      setResults(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <div className="flex gap-2">
          <input
            name="query"
            required
            placeholder="Search sessions..."
            className="flex-1 p-3 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((r) => (
            <Link
              key={r.sessionId}
              href={`/sessions/${r.sessionId}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">
                  Session {r.sessionId.slice(0, 8)}
                </h3>
              </div>
              <div className="text-gray-600 text-sm space-y-1">
                <div>
                  Therapist: {r.therapistId} | Client: {r.clientId}
                </div>
                <div>{format(new Date(r.startTime), "PPpp")}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
