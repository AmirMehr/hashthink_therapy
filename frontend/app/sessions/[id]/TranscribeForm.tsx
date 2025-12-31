'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export function TranscribeForm({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mp4'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|mp4)$/i)) {
        alert('Please select a valid audio file (MP3, WAV, M4A, or MP4)');
        return;
      }

      // Validate file size (max 100MB)
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 100MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleTranscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an audio file first');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('audio', selectedFile);

      const response = await apiClient.post(
        `/sessions/${sessionId}/transcribe`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      alert(response.data.message);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error transcribing:', error);
      const errorMsg = error.response?.data?.message || 'Failed to transcribe audio';
      alert(errorMsg);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleTranscribe} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Transcribe Audio</h2>
      
      <div className="space-y-4">
        {/* File Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Select Audio File (MP3, WAV, M4A, MP4 - Max 100MB)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a,.mp4,audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
            disabled={loading}
          />
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-700">
              <strong>Selected:</strong> {selectedFile.name}
            </p>
            <p className="text-sm text-gray-600">
              Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Upload Progress */}
        {loading && uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <p className="text-sm text-gray-600 mt-1 block">
              {uploadProgress < 100 ? `Uploading: ${uploadProgress}%` : 'Processing transcription...'}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {loading 
            ? (uploadProgress < 100 ? 'Uploading...' : 'Transcribing...') 
            : 'Upload & Transcribe'
          }
        </button>
      </div>
    </form>
  );
}