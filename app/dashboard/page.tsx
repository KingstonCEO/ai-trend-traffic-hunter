'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BusinessProfile {
  businessName: string;
  website: string;
  whatYouSell: string;
  whoYouHelp: string;
  problemSolved: string;
  resultPromised: string;
  targetAudience: string;
  mainNiche: string;
  secondaryNiches: string;
  voiceTone: string;
  mainCTA: string;
  leadMagnet: string;
  platforms: string[];
}

export default function Dashboard() {
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('businessProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
      setHasProfile(true);
    }
  }, []);

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-green-400 mb-8">Welcome to AI Trend Traffic Hunter</h1>
          <p className="text-xl text-gray-300 mb-8">
            First, let's set up your business profile. This only takes 2 minutes and you'll never have to do it again.
          </p>
          <Link
            href="/setup"
            className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold text-xl px-12 py-4 rounded-lg transition-all"
          >
            Set Up My Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-green-400">Trend Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/setup" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
              Edit Profile
            </Link>
            <Link href="/settings" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
              Trend Settings
            </Link>
          </div>
        </div>

        {/* Business Profile Card */}
        <div className="border border-green-500 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Your Traffic Profile</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div><span className="text-green-400">Business:</span> {profile?.businessName}</div>
            <div><span className="text-green-400">Niche:</span> {profile?.mainNiche}</div>
            <div><span className="text-green-400">Target:</span> {profile?.targetAudience}</div>
            <div><span className="text-green-400">Platforms:</span> {profile?.platforms.join(', ')}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/trends" className="border-2 border-green-500 rounded-lg p-8 hover:bg-green-500 hover:text-black transition-all group">
            <h3 className="text-2xl font-bold text-green-400 group-hover:text-black mb-2">Find Today's Trends</h3>
            <p className="text-gray-300 group-hover:text-black">Scan for trending topics now</p>
          </Link>
          
          <Link href="/content" className="border-2 border-green-500 rounded-lg p-8 hover:bg-green-500 hover:text-black transition-all group">
            <h3 className="text-2xl font-bold text-green-400 group-hover:text-black mb-2">Content Library</h3>
            <p className="text-gray-300 group-hover:text-black">View saved trends & generated content</p>
          </Link>
          
          <Link href="/campaigns" className="border-2 border-green-500 rounded-lg p-8 hover:bg-green-500 hover:text-black transition-all group">
            <h3 className="text-2xl font-bold text-green-400 group-hover:text-black mb-2">Traffic Plans</h3>
            <p className="text-gray-300 group-hover:text-black">Build 7-day & 30-day plans</p>
          </Link>
        </div>

        {/* Agency Mode */}
        <div className="border border-green-500 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Agency Mode</h3>
              <p className="text-gray-300">Manage client trend campaigns</p>
            </div>
            <Link href="/agency" className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-lg transition-all">
              Launch Agency Mode
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
