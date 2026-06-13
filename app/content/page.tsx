'use client';

import Link from 'next/link';

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Content Library</h1>
          <Link href="/dashboard" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-300">Saved Trends</div>
          </div>
          <div className="border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-300">Generated Content</div>
          </div>
          <div className="border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">0</div>
            <div className="text-gray-300">Active Campaigns</div>
          </div>
        </div>

        <div className="border-2 border-green-500 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-4">No Content Yet</h2>
          <p className="text-gray-300 mb-6">Find trends and generate content to see them here</p>
          <Link href="/trends" className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg transition-all">
            Find Trends Now
          </Link>
        </div>
      </div>
    </div>
  );
}
