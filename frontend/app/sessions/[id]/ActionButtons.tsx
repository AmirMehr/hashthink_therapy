'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export function ActionButtons({ 
  sessionId, 
  hasSummary 
}: { 
  sessionId: string; 
  hasSummary: boolean;
}) {
  const router = useRouter();
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingEmbedding, setLoadingEmbedding] = useState(false);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      await apiClient.post(`/sessions/${sessionId}/summary`);
      router.refresh();
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGenerateEmbedding = async () => {
    setLoadingEmbedding(true);
    try {
      await apiClient.post(`/sessions/${sessionId}/embedding`);
      alert('Embedding generated successfully');
      router.refresh();
    } catch (error) {
      console.error('Error generating embedding:', error);
      alert('Failed to generate embedding');
    } finally {
      setLoadingEmbedding(false);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={handleGenerateSummary}
        disabled={loadingSummary || hasSummary}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loadingSummary ? 'Generating...' : hasSummary ? 'Summary Generated' : 'Generate Summary'}
      </button>
      <button
        onClick={handleGenerateEmbedding}
        disabled={loadingEmbedding}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 disabled:bg-gray-400"
      >
        {loadingEmbedding ? 'Generating...' : 'Generate Embedding'}
      </button>
    </div>
  );
}
