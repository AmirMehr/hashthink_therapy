import axios from "axios";
import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { TranscribeForm } from "./TranscribeForm";
import { ActionButtons } from "./ActionButtons";
import { Session } from "@/lib/types";

const API_URL = "http://localhost:1919";

async function getSession(id: string): Promise<Session> {
  try {
    const res = await axios.get(`${API_URL}/sessions/${id}`);

    if ("error" in res.data) {
      notFound();
    }

    return {
      ...res.data,
      sessionId: res.data.id,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    notFound();
  }
}

function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "PPpp");
  } catch {
    return "Invalid date";
  }
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params in Next.js 15+
  const { id } = await params;
  const session = await getSession(id);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Session Details</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>ID:</strong> {session.sessionId}
          </div>
          <div>
            <strong>Therapist:</strong> {session.therapistId}
          </div>
          <div>
            <strong>Client:</strong> {session.clientId}
          </div>
          <div>
            <strong>Started:</strong> {formatDate(session.startTime)}
          </div>
          <div>
            <strong>Entries:</strong> {session.entries?.length || 0}
          </div>
        </div>
      </div>

      <TranscribeForm sessionId={session.sessionId} />
      <ActionButtons
        sessionId={session.sessionId}
        hasSummary={!!session.summary}
      />

      {session.summary && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-bold mb-3">Summary</h2>
          <p className="whitespace-pre-wrap">{session.summary}</p>
        </div>
      )}

      {session.entries && session.entries.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-bold mb-3">Transcript</h2>
          <div className="space-y-2">
            {session.entries.map((entry, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded">
                <strong className="text-blue-600">{entry.speaker}:</strong>{" "}
                {entry.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
