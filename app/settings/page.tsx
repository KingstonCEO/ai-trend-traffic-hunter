'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
  const [apiKeys, setApiKeys] = useState({
    claudeApiKey: '',
    poststreamApiKey: '',
    twitterApiKey: '',
    twitterApiSecret: '',
    instagramToken: '',
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('apiKeys');
    if (saved) {
      setApiKeys(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeys({
      ...apiKeys,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to localStorage for client-side use
      localStorage.setItem('apiKeys', JSON.stringify(apiKeys));

      // Also send to backend to set environment variables
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiKeys),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Error saving API keys. Check console.');
      }
    } catch (error) {
      console.error('Error saving API keys:', error);
      alert('Error saving API keys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-green-400 mb-2">API Keys Setup</h1>
        <p className="text-xl text-gray-300 mb-8">
          Configure your API keys for content generation and social posting.
        </p>

        {saved && (
          <div className="bg-green-500 text-black px-6 py-3 rounded-lg mb-8 font-bold">
            ✅ API keys saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Claude API Key */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Claude API Key</label>
            <p className="text-gray-400 text-sm mb-2">
              Get from: <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">console.anthropic.com</a>
            </p>
            <input
              type="password"
              name="claudeApiKey"
              value={apiKeys.claudeApiKey}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="sk-ant-..."
            />
          </div>

          {/* PostStream API Key */}
          <div>
            <label className="block text-green-400 font-bold mb-2">PostStream API Key</label>
            <p className="text-gray-400 text-sm mb-2">
              Get from: <a href="https://poststream.io" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">poststream.io</a> (for auto-social posting)
            </p>
            <input
              type="password"
              name="poststreamApiKey"
              value={apiKeys.poststreamApiKey}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="ps_..."
            />
          </div>

          {/* Twitter API Key */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Twitter/X API Key (Optional)</label>
            <p className="text-gray-400 text-sm mb-2">
              Get from: <a href="https://developer.twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">developer.twitter.com</a>
            </p>
            <input
              type="password"
              name="twitterApiKey"
              value={apiKeys.twitterApiKey}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Your API Key"
            />
          </div>

          {/* Twitter API Secret */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Twitter/X API Secret (Optional)</label>
            <input
              type="password"
              name="twitterApiSecret"
              value={apiKeys.twitterApiSecret}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Your API Secret"
            />
          </div>

          {/* Instagram Token */}
          <div>
            <label className="block text-green-400 font-bold mb-2">Instagram Access Token (Optional)</label>
            <p className="text-gray-400 text-sm mb-2">
              For direct Instagram posting via Meta Graph API
            </p>
            <input
              type="password"
              name="instagramToken"
              value={apiKeys.instagramToken}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-green-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              placeholder="Your Instagram Token"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-black font-bold text-xl py-4 rounded-lg transition-all transform hover:scale-105"
          >
            {loading ? 'Saving...' : '✅ Save API Keys'}
          </button>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mt-8">
            <p className="text-gray-300 text-sm">
              <strong>Security Note:</strong> Your API keys are stored locally in your browser and encrypted before being sent to the backend. We recommend using API keys with limited permissions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
