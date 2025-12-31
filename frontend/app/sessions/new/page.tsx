'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function NewSessionPage() {
  const router = useRouter();
  const [therapistId, setTherapistId] = useState('T001');
  const [clientId, setClientId] = useState('C001');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post('/sessions', {
        therapistId,
        clientId,
        startTime: new Date().toISOString(),
      });

      const sessionId = response.data.sessionId;
      router.push(`/sessions/${sessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Session</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Therapist ID</label>
          <input
            type="text"
            value={therapistId}
            onChange={(e) => setTherapistId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Client ID</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Session'}
        </button>
      </form>
    </div>
  );
}
