import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-green-400">
            AI Trend Traffic Hunter
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto">
            The AI That Finds Trends For Your Offer Before You Even Know What To Post
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Set up your business once. The machine hunts for trending topics, scores the best opportunities, and turns them into scripts, captions, CTAs, and traffic campaigns.
          </p>
          
          <Link 
            href="/dashboard"
            className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold text-xl px-12 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            Launch The Trend Hunter
          </Link>
        </div>

        {/* Problem Section */}
        <div className="mt-24 border border-green-500 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-green-400 mb-4">The Problem</h3>
          <p className="text-xl text-gray-300">
            Most business owners are not short on content ideas. They are short on attention.
          </p>
        </div>

        {/* Solution Section */}
        <div className="mt-8 border border-green-500 rounded-lg p-8">
          <h3 className="text-3xl font-bold text-green-400 mb-4">The Solution</h3>
          <p className="text-xl text-gray-300">
            AI Trend Traffic Hunter finds what people are already watching, searching, and talking about — then connects those trends to your offer.
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-4xl font-bold text-green-400 text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: 1, text: 'Set your business profile' },
              { num: 2, text: "Let AI find today's trends" },
              { num: 3, text: 'Pick the best trend angles' },
              { num: 4, text: 'Generate scripts, captions, CTAs, and content plans' },
              { num: 5, text: 'Send the traffic to your offer' },
            ].map((step) => (
              <div key={step.num} className="border border-green-500 rounded-lg p-6 text-center">
                <div className="text-6xl font-bold text-green-400 mb-4">{step.num}</div>
                <p className="text-gray-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For */}
        <div className="mt-16">
          <h3 className="text-4xl font-bold text-green-400 text-center mb-12">Who It's For</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              'Entrepreneurs',
              'Local Businesses',
              'Agencies',
              'Coaches',
              'Consultants',
              'Affiliate Marketers',
              'Course Creators',
              'Service Providers',
            ].map((audience) => (
              <div key={audience} className="border border-green-500 rounded-lg p-4 text-center">
                <p className="text-lg text-gray-300">{audience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <Link 
            href="/dashboard"
            className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold text-2xl px-16 py-6 rounded-lg transition-all transform hover:scale-105"
          >
            Find My Traffic Angles
          </Link>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center">
          <p className="text-2xl text-green-400 font-bold">
            It Finds The Trends. It Builds The Traffic Angles. You Pick What To Post.
          </p>
        </div>
      </div>
    </div>
  );
}
