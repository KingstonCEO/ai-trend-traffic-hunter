'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Setup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    whatYouSell: '',
    whoYouHelp: '',
    problemSolved: '',
    resultPromised: '',
    targetAudience: '',
    mainNiche: '',
    secondaryNiches: '',
    voiceTone: '',
    mainCTA: '',
    leadMagnet: '',
    platforms: [] as string[],
  });

  const platformOptions = ['TikTok', 'YouTube Shorts', 'Instagram Reels', 'Facebook Reels', 'LinkedIn', 'X (Twitter)'];

  useEffect(() => {
    const saved = localStorage.getItem('businessProfile');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData({
      ...formData,
      platforms: formData.platforms.includes(platform)
        ? formData.platforms.filter(p => p !== platform)
        : [...formData.platforms, platform],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('businessProfile', JSON.stringify(formData));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-green-400 mb-4">Business Profile Setup</h1>
        <p className="text-xl text-gray-300 mb-8">
          Tell the machine about your business once. It will use this to find the perfect trends for your offer.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="The Kingston Agency"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Website / Offer URL</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="https://thekingstonagency.io"
            />
          </div>

          {/* What You Sell */}
          <div>
            <label className="block text-green-400 font-bold mb-2">What do you sell?</label>
            <textarea
              name="whatYouSell"
              value={formData.whatYouSell}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="AI automation systems for local businesses"
            />
          </div>

          {/* Who You Help */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Who do you help?</label>
            <textarea
              name="whoYouHelp"
              value={formData.whoYouHelp}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Local business owners, agencies, service providers"
            />
          </div>

          {/* Problem Solved */}
          <div>
            <label className="block text-green-400 font-bold mb-2">What problem do you solve?</label>
            <textarea
              name="problemSolved"
              value={formData.problemSolved}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Too much manual work, not enough leads, can't scale"
            />
          </div>

          {/* Result Promised */}
          <div>
            <label className="block text-green-400 font-bold mb-2">What result do you promise?</label>
            <textarea
              name="resultPromised"
              value={formData.resultPromised}
              onChange={handleChange}
              required
              rows={3}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Automated lead generation, 10x productivity, predictable revenue"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Target Audience</label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Business owners making $100K-$500K/year"
            />
          </div>

          {/* Main Niche */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Main Niche</label>
            <input
              type="text"
              name="mainNiche"
              value={formData.mainNiche}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="AI automation, local business marketing"
            />
          </div>

          {/* Secondary Niches */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Secondary Niches (optional)</label>
            <input
              type="text"
              name="secondaryNiches"
              value={formData.secondaryNiches}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Real estate, healthcare, professional services"
            />
          </div>

          {/* Voice/Tone */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Voice / Tone</label>
            <input
              type="text"
              name="voiceTone"
              value={formData.voiceTone}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Direct, confident, no-nonsense, results-focused"
            />
          </div>

          {/* Main CTA Link */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Main CTA Link</label>
            <input
              type="url"
              name="mainCTA"
              value={formData.mainCTA}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="https://tidycal.com/fulcrumgroup/tka"
            />
          </div>

          {/* Lead Magnet Link */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Lead Magnet Link (optional)</label>
            <input
              type="url"
              name="leadMagnet"
              value={formData.leadMagnet}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="https://yourdomain.com/free-guide"
            />
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-green-400 font-bold mb-4">Platforms You Post On</label>
            <div className="grid md:grid-cols-3 gap-4">
              {platformOptions.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformToggle(platform)}
                  className={`border-2 rounded-lg px-4 py-3 font-bold transition-all ${
                    formData.platforms.includes(platform)
                      ? 'bg-green-500 border-green-500 text-black'
                      : 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-xl py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Save My Traffic Profile
          </button>
        </form>
      </div>
    </div>
  );
}
