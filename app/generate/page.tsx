'use client';

import { Suspense } from 'react';
import Link from 'next/link';

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Content Generator</h1>
          <Link href="/trends" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Back to Trends
          </Link>
        </div>

        <div className="border-2 border-green-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Content Generation Coming Soon</h2>
          <p className="text-xl text-gray-300 mb-6">
            Full content generation system with hooks, scripts, captions, and export features.
          </p>
          <Link href="/trends" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg transition-all">
            Find Trends
          </Link>
        </div>
      </div>
    </div>
  );
}
