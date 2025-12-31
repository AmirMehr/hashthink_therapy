import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Therapy Session Manager</h1>
      <div className="grid gap-4">
        <Link
          href="/sessions/new"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">Create Session</h2>
          <p className="text-gray-600">Start a new therapy session</p>
        </Link>
        <Link
          href="/sessions"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">View Sessions</h2>
          <p className="text-gray-600">Browse all therapy sessions</p>
        </Link>
        <Link
          href="/search"
          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-semibold mb-2">Search Sessions</h2>
          <p className="text-gray-600">Search using semantic similarity</p>
        </Link>
      </div>
    </div>
  );
}
