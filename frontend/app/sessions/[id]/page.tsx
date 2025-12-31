import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import { TranscribeForm } from "./TranscribeForm";
import { ActionButtons } from "./ActionButtons";
import { Session } from "@/lib/types";
import { apiClient } from "@/lib/api";
async function getSession(id: string): Promise<Session> {
  try {
    console.log("🔍 Fetching session:", id);
    const res = await apiClient.get(`/sessions/${id}`);

    console.log("📦 Session response:", res.data);

    if ("error" in res.data) {
      console.error("❌ Session not found");
      notFound();
    }

    const session = {
      ...res.data,
      sessionId: res.data.id,
    };

    console.log("✅ Session loaded. Entries:", session.entries?.length || 0);

    return session;
  } catch (error) {
    console.error("❌ Error fetching session:", error);
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

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession(id);

  if (!session) {
    notFound();
  }

  console.log(
    "🎯 Rendering session page with entries:",
    session.entries?.length || 0
  );
  console.log("📋 Entries data:", session.entries);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Session Details</h1>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Session ID:</strong> {session.id}
            </p>
            <p>
              <strong>Therapist:</strong> {session.therapistId}
            </p>
            <p>
              <strong>Client:</strong> {session.clientId}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {format(parseISO(session.startTime), "PPpp")}
            </p>
          </div>
        </div>

        {/* Transcription Upload */}
        <TranscribeForm sessionId={session.sessionId} />

        {/* Entries Display */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Transcription Entries ({session.entries?.length || 0})
          </h2>

          {!session.entries || session.entries.length === 0 ? (
            <p className="text-gray-500 italic">
              No entries yet. Upload an audio file to transcribe.
            </p>
          ) : (
            <div className="space-y-4">
              {session.entries.map((entry, i) => (
                <div key={i} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-blue-600">
                      {entry.speaker}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(parseISO(entry.timestamp!), "PPpp")}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {entry.text}
                  </p>
                  {entry.metadata && (
                    <div className="mt-2 text-xs text-gray-500">
                      Duration: {entry.metadata.start}ms - {entry.metadata.end}
                      ms
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <ActionButtons
          sessionId={session.sessionId}
          hasSummary={!!session.summary}
        />
        {session.summary && (
          <div className="mt-2 text-gray-500 border border-gray-200 p-4 rounded-lg">
            <h6>Summary:</h6>
            <br /> {session.summary}
          </div>
        )}
      </div>
    </div>
  );
}
