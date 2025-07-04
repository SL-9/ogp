'use client';

import { useState } from 'react';
import PreviewCard from '@/components/PreviewCard';
import { OGPData } from '@/types';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [ogpData, setOgpData] = useState<OGPData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOgpData(null);

    try {
      const response = await fetch('/api/ogp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch OGP data');
      }

      setOgpData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        OGP Preview Tool
      </h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to preview"
            required
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Preview'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-8 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {ogpData && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Twitter Card</h3>
            <PreviewCard type="twitter" data={ogpData} />
            
            <h3 className="text-xl font-semibold mt-8">Facebook Post</h3>
            <PreviewCard type="facebook" data={ogpData} />
          </div>
        </div>
      )}
      </main>
  );
}
