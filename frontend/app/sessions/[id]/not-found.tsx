import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Session Not Found</h1>
      <p className="text-gray-600 mb-6">
        The session you&lsquo;re looking for doesn&apos;t exist or has been
        deleted.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block"
      >
        Back to Home
      </Link>
    </div>
  );
}
