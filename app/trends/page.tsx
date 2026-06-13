'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Trend {
  id: string;
  topic: string;
  whatsHappening: string;
  whyPeopleCare: string;
  mainEmotion: string;
  bestAudience: string;
  bestPlatform: string;
  trendStrength: number;
  offerMatch: number;
  trafficPotential: number;
  urgency: 'low' | 'medium' | 'high';
  contentAngle: string;
  saved: boolean;
  ignored: boolean;
}

export default function TrendsPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('businessProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const generateDemoTrends = () => {
    const niche = profile?.mainNiche || 'business';
    const audience = profile?.targetAudience || 'business owners';
    
    const demoTrends: Trend[] = [
      {
        id: '1',
        topic: 'AI Agent Workflows Replacing Full-Time Employees',
        whatsHappening: 'Companies are replacing $60K/year positions with $300/month AI agents',
        whyPeopleCare: 'Business owners want to cut costs and scale without hiring',
        mainEmotion: 'Curiosity + Fear of Missing Out',
        bestAudience: 'Small business owners',
        bestPlatform: 'LinkedIn',
        trendStrength: 92,
        offerMatch: 95,
        trafficPotential: 88,
        urgency: 'high',
        contentAngle: 'Show before/after of replacing a position with AI',
        saved: false,
        ignored: false,
      },
      {
        id: '2',
        topic: 'ChatGPT Search Destroying Google Traffic',
        whatsHappening: 'Businesses are losing 40% of organic search traffic to AI search engines',
        whyPeopleCare: 'Their SEO investments are becoming worthless',
        mainEmotion: 'Panic + Urgency',
        bestAudience: 'Marketing agencies, local businesses',
        bestPlatform: 'YouTube Shorts',
        trendStrength: 89,
        offerMatch: 87,
        trafficPotential: 91,
        urgency: 'high',
        contentAngle: 'Expose the traffic loss, offer AI-first solution',
        saved: false,
        ignored: false,
      },
      {
        id: '3',
        topic: 'Small Businesses Getting $100K+ From AI Lead Systems',
        whatsHappening: 'Local shops using AI to generate 50+ qualified leads per day',
        whyPeopleCare: 'Proof that AI marketing actually works for small budgets',
        mainEmotion: 'Hope + Envy',
        bestAudience: 'Local business owners',
        bestPlatform: 'TikTok',
        trendStrength: 86,
        offerMatch: 93,
        trafficPotential: 85,
        urgency: 'medium',
        contentAngle: 'Case study breakdown: how they did it',
        saved: false,
        ignored: false,
      },
      {
        id: '4',
        topic: 'Agencies Charging $5K/Month for AI Automation',
        whatsHappening: 'Marketing agencies pivoting to AI services at premium prices',
        whyPeopleCare: 'New high-margin business model anyone can start',
        mainEmotion: 'Opportunity + FOMO',
        bestAudience: 'Freelancers, consultants, agencies',
        bestPlatform: 'LinkedIn',
        trendStrength: 84,
        offerMatch: 90,
        trafficPotential: 82,
        urgency: 'medium',
        contentAngle: 'Break down the service stack and pricing model',
        saved: false,
        ignored: false,
      },
      {
        id: '5',
        topic: 'Voice AI Answering Every Phone Call',
        whatsHappening: 'Businesses using AI receptionists that sound completely human',
        whyPeopleCare: 'Never miss a lead again + save on staffing',
        mainEmotion: 'Amazement + Relief',
        bestAudience: 'Service businesses',
        bestPlatform: 'Instagram Reels',
        trendStrength: 81,
        offerMatch: 85,
        trafficPotential: 79,
        urgency: 'low',
        contentAngle: 'Demo the AI voice, show real conversation',
        saved: false,
        ignored: false,
      },
    ];

    return demoTrends;
  };

  const findTrends = () => {
    setLoading(true);
    setTimeout(() => {
      const demoTrends = generateDemoTrends();
      setTrends(demoTrends);
      setLoading(false);
    }, 2000);
  };

  const saveTrend = (id: string) => {
    setTrends(trends.map(t => t.id === id ? { ...t, saved: true } : t));
    const savedTrends = JSON.parse(localStorage.getItem('savedTrends') || '[]');
    const trend = trends.find(t => t.id === id);
    if (trend) {
      localStorage.setItem('savedTrends', JSON.stringify([...savedTrends, trend]));
    }
  };

  const ignoreTrend = (id: string) => {
    setTrends(trends.map(t => t.id === id ? { ...t, ignored: true } : t));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">Set Up Your Profile First</h1>
          <Link href="/setup" className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg inline-block">
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-2">AI Trend Hunter</h1>
            <p className="text-gray-300">Scanning for trends matching: <span className="text-green-400">{profile.mainNiche}</span></p>
          </div>
          <Link href="/dashboard" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Dashboard
          </Link>
        </div>

        {trends.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-green-400 mb-6">Ready to Find Today's Trending Opportunities?</h2>
            <p className="text-xl text-gray-300 mb-8">
              The AI will scan trending topics across platforms and score them against your offer.
            </p>
            <button
              onClick={findTrends}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-black font-bold text-2xl px-16 py-6 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Scanning Trends...' : 'Find Today\'s Trends'}
            </button>
            <p className="text-gray-500 mt-4 text-sm">(Demo Mode - Simulating real trend discovery)</p>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-xl text-green-400 font-bold">Found {trends.filter(t => !t.ignored).length} High-Match Trends</p>
            </div>

            <div className="space-y-6">
              {trends.filter(t => !t.ignored).map((trend) => (
                <div key={trend.id} className="border-2 border-green-500 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-green-400">{trend.topic}</h3>
                    <span className={`font-bold uppercase ${getUrgencyColor(trend.urgency)}`}>
                      {trend.urgency} urgency
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-gray-300">
                    <div>
                      <span className="text-green-400 font-bold">What's Happening:</span> {trend.whatsHappening}
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">Why People Care:</span> {trend.whyPeopleCare}
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">Main Emotion:</span> {trend.mainEmotion}
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">Best Audience:</span> {trend.bestAudience}
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">Best Platform:</span> {trend.bestPlatform}
                    </div>
                    <div>
                      <span className="text-green-400 font-bold">Content Angle:</span> {trend.contentAngle}
                    </div>
                  </div>

                  <div className="flex gap-6 mb-6">
                    <div>
                      <div className="text-sm text-gray-400">Trend Strength</div>
                      <div className={`text-3xl font-bold ${getScoreColor(trend.trendStrength)}`}>{trend.trendStrength}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Offer Match</div>
                      <div className={`text-3xl font-bold ${getScoreColor(trend.offerMatch)}`}>{trend.offerMatch}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Traffic Potential</div>
                      <div className={`text-3xl font-bold ${getScoreColor(trend.trafficPotential)}`}>{trend.trafficPotential}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={`/generate?trendId=${trend.id}`}
                      className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-lg transition-all flex-1 text-center"
                    >
                      Turn This Into Content
                    </Link>
                    {!trend.saved && (
                      <button
                        onClick={() => saveTrend(trend.id)}
                        className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold px-8 py-3 rounded-lg transition-all"
                      >
                        Save Trend
                      </button>
                    )}
                    {trend.saved && (
                      <span className="border-2 border-gray-600 text-gray-400 font-bold px-8 py-3 rounded-lg">
                        ✓ Saved
                      </span>
                    )}
                    <button
                      onClick={() => ignoreTrend(trend.id)}
                      className="border-2 border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white font-bold px-8 py-3 rounded-lg transition-all"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={findTrends}
                className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold px-12 py-4 rounded-lg transition-all"
              >
                Find More Trends
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
