import { CreateSessionForm } from "./CreateSessionForm";

export default function NewSessionPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Session</h1>
      <CreateSessionForm />
    </div>
  );
}
