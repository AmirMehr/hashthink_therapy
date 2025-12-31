import { SearchForm } from "./SearchForm";

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Search Sessions</h1>
      <SearchForm />
    </div>
  );
}
