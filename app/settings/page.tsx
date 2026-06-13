'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    trendSources: [] as string[],
    country: '',
    state: '',
    city: '',
    nicheKeywords: '',
    topicsToAvoid: '',
    competitorsToWatch: '',
    influencersToWatch: '',
    minimumTrendScore: 70,
  });

  const trendSourceOptions = [
    'Broad Internet Trends',
    'Business Trends',
    'AI Trends',
    'Local Business Trends',
    'Health/Wellness Trends',
    'Finance Trends',
    'Real Estate Trends',
    'Auto Buyer Trends',
    'Affiliate Marketing Trends',
    'Side Hustle Trends',
    'Small Business Pain Points',
    'Consumer Complaint Trends',
    'Local City Trends',
  ];

  useEffect(() => {
    const saved = localStorage.getItem('trendSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const toggleTrendSource = (source: string) => {
    setSettings({
      ...settings,
      trendSources: settings.trendSources.includes(source)
        ? settings.trendSources.filter(s => s !== source)
        : [...settings.trendSources, source],
    });
  };

  const handleSave = () => {
    localStorage.setItem('trendSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Trend Source Settings</h1>
          <Link href="/dashboard" className="border border-green-500 text-green-400 px-6 py-2 rounded-lg hover:bg-green-500 hover:text-black transition-all">
            ← Dashboard
          </Link>
        </div>

        <div className="space-y-8">
          {/* Trend Sources */}
          <div className="border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">What Should the AI Scan?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {trendSourceOptions.map((source) => (
                <button
                  key={source}
                  onClick={() => toggleTrendSource(source)}
                  className={`border-2 rounded-lg px-4 py-3 font-bold transition-all ${
                    settings.trendSources.includes(source)
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Location Targeting</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-green-400 font-bold mb-2">Country</label>
                <input
                  type="text"
                  value={settings.country}
                  onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="United States"
                />
              </div>
              <div>
                <label className="block text-green-400 font-bold mb-2">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="Minnesota"
                />
              </div>
              <div>
                <label className="block text-green-400 font-bold mb-2">City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="Minneapolis"
                />
              </div>
            </div>
          </div>

          {/* Keywords & Filters */}
          <div className="border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Keywords & Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-green-400 font-bold mb-2">Niche Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={settings.nicheKeywords}
                  onChange={(e) => setSettings({ ...settings, nicheKeywords: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="AI automation, local business, marketing"
                />
              </div>
              <div>
                <label className="block text-green-400 font-bold mb-2">Topics to Avoid (comma-separated)</label>
                <input
                  type="text"
                  value={settings.topicsToAvoid}
                  onChange={(e) => setSettings({ ...settings, topicsToAvoid: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="politics, religion, controversial topics"
                />
              </div>
              <div>
                <label className="block text-green-400 font-bold mb-2">Competitors to Watch (comma-separated)</label>
                <input
                  type="text"
                  value={settings.competitorsToWatch}
                  onChange={(e) => setSettings({ ...settings, competitorsToWatch: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="CompanyA, CompanyB, CompanyC"
                />
              </div>
              <div>
                <label className="block text-green-400 font-bold mb-2">Influencers to Watch (comma-separated)</label>
                <input
                  type="text"
                  value={settings.influencersToWatch}
                  onChange={(e) => setSettings({ ...settings, influencersToWatch: e.target.value })}
                  className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  placeholder="@influencer1, @influencer2"
                />
              </div>
            </div>
          </div>

          {/* Minimum Score */}
          <div className="border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Minimum Trend Score</h2>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="100"
                value={settings.minimumTrendScore}
                onChange={(e) => setSettings({ ...settings, minimumTrendScore: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-3xl font-bold text-green-400">{settings.minimumTrendScore}</span>
            </div>
            <p className="text-gray-400 mt-2">Only show trends scoring {settings.minimumTrendScore}+ on Offer Match</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-xl py-4 rounded-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
