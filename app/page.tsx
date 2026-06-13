'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20"
      />
      
      {/* Top Navigation */}
      <div className="fixed top-0 right-0 z-50 p-6">
        <Link
          href="/settings"
          className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-2 rounded-lg transition-all"
        >
          ⚙️ API Keys
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-green-400 animate-pulse drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]">
            AI TREND TRAFFIC HUNTER
          </h1>
          
          <h2 className="text-3xl md:text-4xl text-green-300 max-w-4xl mx-auto font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            The AI That Finds Trends For Your Offer Before You Even Know What To Post
          </h2>
          
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Set up your business once. The machine hunts for trending topics, scores the best opportunities, and turns them into scripts, captions, CTAs, and traffic campaigns.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/setup"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-2xl px-16 py-6 rounded-lg transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] animate-bounce mr-4"
            >
              📝 CREATE PROFILE
            </Link>
            <Link 
              href="/dashboard"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-2xl px-16 py-6 rounded-lg transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] animate-bounce"
            >
              🚀 LAUNCH THE TREND HUNTER 🚀
            </Link>
          </div>
        </div>

        {/* Problem Section */}
        <div className="mt-24 border-2 border-green-500 rounded-lg p-10 bg-gradient-to-br from-green-950/40 to-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all">
          <h3 className="text-4xl font-bold text-green-400 mb-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">⚠️ The Problem</h3>
          <p className="text-2xl text-gray-200 leading-relaxed">
            Most business owners are not short on content ideas. They are short on <span className="text-green-400 font-bold">ATTENTION</span>.
          </p>
        </div>

        {/* Solution Section */}
        <div className="mt-8 border-2 border-green-500 rounded-lg p-10 bg-gradient-to-br from-green-950/40 to-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all">
          <h3 className="text-4xl font-bold text-green-400 mb-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">✅ The Solution</h3>
          <p className="text-2xl text-gray-200 leading-relaxed">
            AI Trend Traffic Hunter finds what people are already <span className="text-green-400 font-bold">watching, searching, and talking about</span> — then connects those trends to your offer.
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h3 className="text-5xl font-bold text-green-400 text-center mb-16 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">⚡ HOW IT WORKS ⚡</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: 1, text: 'Set your business profile', icon: '🎯' },
              { num: 2, text: "Let AI find today's trends", icon: '🔍' },
              { num: 3, text: 'Pick the best trend angles', icon: '🎲' },
              { num: 4, text: 'Generate scripts, captions, CTAs, and content plans', icon: '🤖' },
              { num: 5, text: 'Send the traffic to your offer', icon: '💰' },
            ].map((step) => (
              <div key={step.num} className="border-2 border-green-500 rounded-lg p-8 text-center bg-gradient-to-br from-green-950/30 to-black/30 backdrop-blur-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)]">
                <div className="text-7xl mb-4">{step.icon}</div>
                <div className="text-6xl font-bold text-green-400 mb-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">{step.num}</div>
                <p className="text-gray-200 text-lg font-semibold">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For */}
        <div className="mt-20">
          <h3 className="text-5xl font-bold text-green-400 text-center mb-16 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">👥 WHO IT'S FOR 👥</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Entrepreneurs', icon: '💼' },
              { name: 'Local Businesses', icon: '🏪' },
              { name: 'Agencies', icon: '🏢' },
              { name: 'Coaches', icon: '🎓' },
              { name: 'Consultants', icon: '💡' },
              { name: 'Affiliate Marketers', icon: '📈' },
              { name: 'Course Creators', icon: '📚' },
              { name: 'Service Providers', icon: '⚙️' },
            ].map((audience) => (
              <div key={audience.name} className="border-2 border-green-500 rounded-lg p-6 text-center bg-gradient-to-br from-green-950/30 to-black/30 backdrop-blur-sm hover:scale-105 transition-transform shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]">
                <div className="text-5xl mb-3">{audience.icon}</div>
                <p className="text-xl text-gray-200 font-bold">{audience.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center space-y-4">
          <div>
            <Link 
              href="/setup"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-2xl px-16 py-6 rounded-lg transition-all transform hover:scale-110 shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] mr-4"
            >
              📝 Setup Your Profile
            </Link>
            <Link 
              href="/settings"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl px-16 py-6 rounded-lg transition-all transform hover:scale-110 shadow-[0_0_40px_rgba(59,130,246,0.6)]"
            >
              🔑 Add API Keys
            </Link>
          </div>
          <div>
            <Link 
              href="/dashboard"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-3xl px-20 py-8 rounded-lg transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(34,197,94,0.7)] hover:shadow-[0_0_80px_rgba(34,197,94,1)] animate-pulse"
            >
              🎯 FIND MY TRAFFIC ANGLES NOW 🎯
            </Link>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center border-2 border-green-500 rounded-lg p-10 bg-gradient-to-br from-green-950/40 to-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(34,197,94,0.4)]">
          <p className="text-3xl text-green-400 font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
            ⚡ It Finds The Trends. It Builds The Traffic Angles. You Pick What To Post. ⚡
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 The Kingston Agency - All Rights Reserved Worldwide
          </p>
        </div>
      </div>
    </div>
  );
}
