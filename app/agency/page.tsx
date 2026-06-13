'use client';

import Link from 'next/link';

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-2">Agency Mode</h1>
            <p className="text-gray-300">Manage trend campaigns for your clients</p>
          </div>
          <Link href="/dashboard" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Dashboard
          </Link>
        </div>

        <div className="border-2 border-green-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Agency Mode Coming Soon</h2>
          <p className="text-xl text-gray-300 mb-6">
            Manage multiple clients, generate custom trend reports, and build white-label traffic campaigns.
          </p>
          <div className="space-y-4 text-left max-w-2xl mx-auto text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span>Client profile management</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span>Trend discovery for each client niche</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span>7-day & 30-day plans per client</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span>Monthly retainer pricing calculator</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✓</span>
              <span>Client-facing reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
