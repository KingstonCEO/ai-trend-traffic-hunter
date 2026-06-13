'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Trend {
  id: string;
  source: string;
  topic: string;
  description?: string;
  viralityScore: number;
  relevanceScore: number;
  totalScore: number;
  url?: string;
  fetchedAt: string;
}

interface UserProfile {
  id: string;
  businessName: string;
  niche: string;
}

export default function Dashboard() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      loadTrends();
    }
  }, [profile]);

  async function loadProfile() {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }

  async function loadTrends() {
    if (!profile) return;
    
    try {
      setLoading(true);
      const res = await fetch(`/api/trends?profileId=${profile.id}`);
      const data = await res.json();
      setTrends(data.trends || []);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setLoading(false);
    }
  }

  async function refreshTrends() {
    if (!profile) return;
    
    try {
      setRefreshing(true);
      const res = await fetch(`/api/trends?profileId=${profile.id}&refresh=true`);
      const data = await res.json();
      setTrends(data.trends || []);
    } catch (error) {
      console.error('Failed to refresh trends:', error);
    } finally {
      setRefreshing(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-orange-400';
  }

  function getSourceIcon(source: string) {
    switch (source) {
      case 'reddit': return '🔴';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'google_trends': return '🔍';
      default: return '📊';
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-8">Welcome to AI Trend Traffic Hunter</h1>
          <p className="text-xl text-gray-300 mb-8">
            Let's set up your business profile first.
          </p>
          <Link
            href="/setup"
            className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-xl px-12 py-4 rounded-lg"
          >
            Set Up Profile →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-2">📊 Trend Dashboard</h1>
            <p className="text-gray-400">
              {profile.businessName} • {profile.niche}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={refreshTrends}
              disabled={refreshing}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Trends'}
            </button>
            <Link
              href="/setup"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              ⚙️ Settings
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-400">Hunting for trends...</p>
          </div>
        ) : trends.length === 0 ? (
          <div className="text-center py-20 border-2 border-gray-700 rounded-lg">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-gray-300 mb-4">No trends found yet</p>
            <button
              onClick={refreshTrends}
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-lg"
            >
              Fetch Trends Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Score Legend */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <span className="font-semibold text-white">Scoring:</span> Total Score = (Virality + Relevance) / 2
              </div>
              <div className="flex gap-6 text-sm">
                <div><span className="text-green-400 font-bold">75+</span> Hot 🔥</div>
                <div><span className="text-yellow-400 font-bold">50-74</span> Warm ⚡</div>
                <div><span className="text-orange-400 font-bold">&lt;50</span> Cold ❄️</div>
              </div>
            </div>

            {/* Trends List */}
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="bg-gray-900 border-2 border-gray-700 hover:border-green-500 rounded-lg p-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getSourceIcon(trend.source)}</span>
                      <span className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                        {trend.source}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {trend.topic}
                    </h3>
                    
                    {trend.description && (
                      <p className="text-gray-400 mb-4">
                        {trend.description.substring(0, 200)}
                        {trend.description.length > 200 ? '...' : ''}
                      </p>
                    )}

                    {trend.url && (
                      <a
                        href={trend.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm"
                      >
                        View Source →
                      </a>
                    )}
                  </div>

                  {/* Scores */}
                  <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="bg-black border border-gray-700 rounded-lg p-4">
                      <div className={`text-4xl font-bold ${getScoreColor(trend.totalScore)} text-center mb-2`}>
                        {trend.totalScore}
                      </div>
                      <div className="text-xs text-gray-500 text-center">TOTAL SCORE</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{trend.viralityScore}</div>
                        <div className="text-xs text-gray-500">Virality</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{trend.relevanceScore}</div>
                        <div className="text-xs text-gray-500">Relevance</div>
                      </div>
                    </div>

                    <Link
                      href={`/generate?trendId=${trend.id}`}
                      className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-6 rounded-lg text-center transition-all"
                    >
                      Generate Content →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
