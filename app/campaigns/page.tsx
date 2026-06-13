'use client';

import Link from 'next/link';

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Traffic Plans</h1>
          <Link href="/dashboard" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-green-500 rounded-lg p-8 hover:bg-gray-900 transition-all">
            <h2 className="text-3xl font-bold text-green-400 mb-4">7-Day Traffic Plan</h2>
            <p className="text-gray-300 mb-6">Generate a complete 7-day content calendar from your best trends</p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg transition-all">
              Build 7-Day Plan
            </button>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-8 hover:bg-gray-900 transition-all">
            <h2 className="text-3xl font-bold text-green-400 mb-4">30-Day Traffic Plan</h2>
            <p className="text-gray-300 mb-6">Generate a full month of trend-based content ready to post</p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg transition-all">
              Build 30-Day Plan
            </button>
          </div>
        </div>

        <div className="mt-12 border-2 border-green-500 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Recent Campaigns</h2>
          <p className="text-gray-400">No campaigns created yet. Build your first traffic plan above.</p>
        </div>
      </div>
    </div>
  );
}
