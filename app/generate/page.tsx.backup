'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function GenerateContent() {
  const searchParams = useSearchParams();
  const trendId = searchParams.get('trendId');
  
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const generateContent = () => {
    setGenerating(true);
    setTimeout(() => {
      const generatedContent = {
        hooks: [
          "Nobody's talking about this yet, but AI just killed $60K/year positions...",
          "Your competitor just replaced their entire customer service team with a $300/month AI agent",
          "The $60K employee vs the $300 AI agent: I tested both for 30 days",
          "If you're still hiring for these 5 positions, you're burning money",
          "This AI agent does what 3 full-time employees used to do (and it never calls in sick)"
        ],
        script30: `HOOK: Nobody's talking about this yet, but AI just killed $60K/year positions...

REVEAL: Companies are replacing full-time employees with AI agents that cost $300/month.

PROOF: A local business I work with fired their $55K/year customer service manager and replaced them with an AI agent. It handles 200+ conversations a day, never sleeps, never complains.

BRIDGE: If you're a business owner still paying $60K for work a machine can do better... you're bleeding cash.

CTA: Link in bio. Let's talk about which positions you can replace tomorrow.`,
        
        script60: `HOOK: Your competitor just replaced their entire customer service team with a $300/month AI agent. You're about to lose.

PROBLEM: While you're paying $60K per employee, plus benefits, plus training time, plus sick days... they're running 24/7 with zero complaints.

PROOF: Real case: Local shop with 3 customer service reps. $180K/year in payroll. Replaced all 3 with AI. Now paying $900/month. Same quality. Better speed. Zero drama.

THE MATH: That's $171K/year saved. On autopilot.

THE TRUTH: Every business owner I talk to says "I need to hire more people." Wrong. You need to replace people with systems.

BRIDGE: If you're still thinking "people over automation," you're thinking like it's 2019. This is 2026. The game changed.

CTA: Link in bio. Book a call. Let's audit which positions you can replace this month.`,

        script90: `HOOK: The $60K employee vs the $300 AI agent: I tested both for 30 days. The results will piss you off.

SETUP: I run an agency. We help local businesses scale with AI. One client came to me drowning in payroll. Customer service team: 3 people, $180K/year total cost.

THE TEST: I built them an AI agent. Trained it on their FAQs, their tone, their processes. Put it live alongside the human team for 30 days.

WEEK 1: The humans handled 60% of inquiries. The AI handled 40%. Response time: humans averaged 8 minutes. AI averaged 12 seconds.

WEEK 2: Customers started asking for the AI by name. Why? Instant answers. No hold time. Available at 2 AM.

WEEK 3: The AI was handling 80% of volume. The humans were mad because they had nothing to do.

WEEK 4: The owner let 2 of the 3 reps go. Kept one for escalations. Payroll dropped from $180K to $60K. The AI cost? $300/month.

THE TRUTH: This isn't the future. This is right now. If you're not doing this, your competitor is.

THE WARNING: Every business owner I talk to says "my customers need the human touch." Cool. Your competitor's customers are getting instant responses while yours are on hold.

BRIDGE: You can fight this, or you can use it. Your call.

CTA: Link in bio. Let's audit your business and find what you can automate this week. Free strategy call. No pitch. Just show you what's possible.`,

        caption: `The $60K employee vs the $300 AI agent.

I tested both for 30 days.

The AI won. And it's not even close.

If you're still hiring for positions a machine can do better, you're bleeding money.

Here's what we're seeing in 2026:
→ Customer service: fully automated
→ Lead qualification: fully automated  
→ Appointment booking: fully automated
→ Follow-up sequences: fully automated

The businesses that survive the next 3 years are the ones that automate first.

Your competitor already started.

Link in bio. Let's talk about which positions you can replace this month. 👇`,

        title: 'The $60K Employee vs The $300 AI Agent: 30-Day Test Results',
        
        hashtags: '#AIAutomation #BusinessAutomation #SmallBusiness #AIAgent #Entrepreneurship #BusinessGrowth #ScaleYourBusiness #AIForBusiness #FutureOfWork #AutomationStrategy',
        
        cta: 'Book your free AI audit at [YOUR_LINK] - Let\'s find what you can automate this week',
        
        commentBait: 'Drop a 🤖 if you\'ve already replaced a position with AI',
        
        dmCTA: 'DM me "AUDIT" and I\'ll send you the 5 positions most businesses can replace with AI this month',
        
        thumbnailText: '$60K Employee\nvs\n$300 AI Agent\n\n30-Day Test',
        
        onScreenText: [
          'Day 1: Set up AI agent',
          'Day 7: AI handling 40% of volume',
          'Day 14: Customers asking for AI by name',
          'Day 21: AI handling 80% of volume',
          'Day 30: Saved $120K/year in payroll'
        ],
        
        brollSuggestions: [
          'Screen recording of AI agent dashboard',
          'Split screen: human response time vs AI response time',
          'Customer satisfaction scores before/after',
          'Calculator showing cost savings',
          'Business owner testimonial clip'
        ],
        
        presenterStyle: 'Direct to camera, confident energy, showing real dashboards and data',
        
        voiceoverStyle: 'Authoritative but conversational - like revealing a secret that will save them money'
      };
      
      setContent(generatedContent);
      setGenerated(true);
      setGenerating(false);
    }, 3000);
  };

  useEffect(() => {
    if (trendId && !generated && !generating) {
      generateContent();
    }
  }, [trendId]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const exportAll = () => {
    if (!content) return;
    
    const fullExport = `
==============================================
AI TREND TRAFFIC HUNTER - CONTENT EXPORT
==============================================

--- HOOKS (Choose One) ---

${content.hooks.map((hook: string, i: number) => `${i + 1}. ${hook}`).join('\n\n')}

--- 30-SECOND SCRIPT ---

${content.script30}

--- 60-SECOND SCRIPT ---

${content.script60}

--- 90-SECOND SCRIPT ---

${content.script90}

--- CAPTION ---

${content.caption}

--- TITLE ---

${content.title}

--- HASHTAGS ---

${content.hashtags}

--- CTA ---

${content.cta}

--- COMMENT BAIT ---

${content.commentBait}

--- DM CTA ---

${content.dmCTA}

--- THUMBNAIL TEXT ---

${content.thumbnailText}

--- ON-SCREEN TEXT BEATS ---

${content.onScreenText.map((text: string, i: number) => `${i + 1}. ${text}`).join('\n')}

--- B-ROLL SUGGESTIONS ---

${content.brollSuggestions.map((text: string, i: number) => `${i + 1}. ${text}`).join('\n')}

--- PRESENTER STYLE ---

${content.presenterStyle}

--- VOICEOVER STYLE ---

${content.voiceoverStyle}

==============================================
Generated by AI Trend Traffic Hunter
==============================================
    `.trim();
    
    copyToClipboard(fullExport, 'Full Campaign');
  };

  if (!generated && !generating) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">No Trend Selected</h1>
          <Link href="/trends" className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-lg inline-block">
            Find Trends
          </Link>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🤖</div>
          <h1 className="text-4xl font-bold text-green-400 mb-2">Generating Your Content...</h1>
          <p className="text-xl text-gray-300">Creating hooks, scripts, captions, and CTAs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Generated Traffic Content</h1>
          <div className="flex gap-4">
            <button
              onClick={exportAll}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-lg transition-all"
            >
              {copySuccess === 'Full Campaign' ? '✓ Copied!' : 'Export Full Campaign'}
            </button>
            <Link href="/trends" className="border border-green-500 text-green-400 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-black transition-all">
              ← Back to Trends
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hooks */}
          <div className="border-2 border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">5 Hook Options (Pick One)</h2>
            <div className="space-y-4">
              {content.hooks.map((hook: string, i: number) => (
                <div key={i} className="border border-gray-700 rounded p-4 flex justify-between items-start gap-4">
                  <p className="text-gray-300 flex-1">{hook}</p>
                  <button
                    onClick={() => copyToClipboard(hook, `Hook ${i + 1}`)}
                    className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm whitespace-nowrap"
                  >
                    {copySuccess === `Hook ${i + 1}` ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scripts */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: '30-Second Script', content: content.script30 },
              { label: '60-Second Script', content: content.script60 },
              { label: '90-Second Script', content: content.script90 },
            ].map((script) => (
              <div key={script.label} className="border-2 border-green-500 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-green-400">{script.label}</h3>
                  <button
                    onClick={() => copyToClipboard(script.content, script.label)}
                    className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                  >
                    {copySuccess === script.label ? '✓' : 'Copy'}
                  </button>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap text-sm">{script.content}</pre>
              </div>
            ))}
          </div>

          {/* Caption & Supporting Content */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">Caption</h3>
                <button
                  onClick={() => copyToClipboard(content.caption, 'Caption')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                >
                  {copySuccess === 'Caption' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{content.caption}</p>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">Title</h3>
                <button
                  onClick={() => copyToClipboard(content.title, 'Title')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                >
                  {copySuccess === 'Title' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300">{content.title}</p>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">Hashtags</h3>
                <button
                  onClick={() => copyToClipboard(content.hashtags, 'Hashtags')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded-lg transition-all text-sm"
                >
                  {copySuccess === 'Hashtags' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 text-sm">{content.hashtags}</p>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">CTA</h3>
                <button
                  onClick={() => copyToClipboard(content.cta, 'CTA')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                >
                  {copySuccess === 'CTA' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300">{content.cta}</p>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">Comment Bait</h3>
                <button
                  onClick={() => copyToClipboard(content.commentBait, 'Comment Bait')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                >
                  {copySuccess === 'Comment Bait' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300">{content.commentBait}</p>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">DM Call-to-Action</h3>
                <button
                  onClick={() => copyToClipboard(content.dmCTA, 'DM CTA')}
                  className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded transition-all text-sm"
                >
                  {copySuccess === 'DM CTA' ? '✓' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300">{content.dmCTA}</p>
            </div>
          </div>

          {/* Production Elements */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">Thumbnail Text</h3>
              <pre className="text-gray-300 text-lg font-bold whitespace-pre-wrap">{content.thumbnailText}</pre>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">On-Screen Text Beats</h3>
              <ul className="space-y-2">
                {content.onScreenText.map((text: string, i: number) => (
                  <li key={i} className="text-gray-300">{i + 1}. {text}</li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">B-Roll Suggestions</h3>
              <ul className="space-y-2">
                {content.brollSuggestions.map((text: string, i: number) => (
                  <li key={i} className="text-gray-300">{i + 1}. {text}</li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">Presenter & Voiceover Style</h3>
              <p className="text-gray-300 mb-4"><span className="text-green-400 font-bold">Presenter:</span> {content.presenterStyle}</p>
              <p className="text-gray-300"><span className="text-green-400 font-bold">Voiceover:</span> {content.voiceoverStyle}</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={exportAll}
              className="bg-green-500 hover:bg-green-600 text-black font-bold text-xl px-16 py-4 rounded-lg transition-all"
            >
              {copySuccess === 'Full Campaign' ? '✓ Copied Full Campaign!' : 'Copy Full Campaign'}
            </button>
            <Link
              href="/trends"
              className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold text-xl px-16 py-4 rounded-lg transition-all"
            >
              Generate Another
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🤖</div>
            <h1 className="text-4xl font-bold text-green-400">Loading...</h1>
          </div>
        </div>
      }>
        <GenerateContent />
      </Suspense>
    </div>
  );
}
