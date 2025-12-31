import { apiClient } from "@/lib/api";
import { Session } from "@/lib/types";
import Link from "next/link";

export async function getAllSessions(): Promise<Session[]> {
  try {
    const res = await apiClient.get("/sessions");
    console.log("📋 All sessions fetched:", res.data.length);
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching sessions:", error);
    throw error;
  }
}

export default async function SessionsPage() {
  const sessions = await getAllSessions();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Therapy Sessions</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            ← Back to Home
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg mb-4">No sessions found</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Create your first session
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Link
                key={session.id}
                href={`/sessions/${session.id}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">
                    Session {session.id!.slice(0, 8)}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(session.startTime).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Therapist: {session.therapistId}</p>
                  <p>Client: {session.clientId}</p>
                  {session.entries && session.entries.length > 0 && (
                    <p className="text-green-600 font-medium mt-2">
                      ✓ {session.entries.length} entries transcribed
                    </p>
                  )}
                  {session.summary && (
                    <p className="text-blue-600 font-medium">
                      ✓ Summary generated
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
