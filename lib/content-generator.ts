import Anthropic from '@anthropic-ai/sdk';

export interface ContentGenerationRequest {
  trend: {
    topic: string;
    description?: string;
    source: string;
  };
  userProfile: {
    businessName: string;
    niche: string;
    targetAudience: string;
    offerName: string;
    offerUrl?: string;
  };
  contentType: 'script' | 'meme' | 'caption' | 'hook' | 'cta';
  platform: 'youtube_shorts' | 'tiktok' | 'instagram_reels' | 'twitter' | 'linkedin';
}

export interface GeneratedContent {
  title?: string;
  body: string;
  hook?: string;
  cta?: string;
  hashtags: string[];
}

export async function generateContent(
  request: ContentGenerationRequest,
  apiKey: string
): Promise<GeneratedContent> {
  const anthropic = new Anthropic({ apiKey });

  const prompt = buildPrompt(request);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const response = message.content[0].type === 'text' ? message.content[0].text : '';

  return parseResponse(response, request.contentType, request.platform);
}

function buildPrompt(request: ContentGenerationRequest): string {
  const { trend, userProfile, contentType, platform } = request;

  const baseContext = `
BUSINESS CONTEXT:
- Business: ${userProfile.businessName}
- Niche: ${userProfile.niche}
- Target Audience: ${userProfile.targetAudience}
- Offer: ${userProfile.offerName}
${userProfile.offerUrl ? `- Offer URL: ${userProfile.offerUrl}` : ''}

TRENDING TOPIC:
- Topic: ${trend.topic}
- Description: ${trend.description || 'No description'}
- Source: ${trend.source}

TASK: Create ${contentType} for ${platform}
`;

  switch (contentType) {
    case 'script':
      return `${baseContext}

Generate a viral short-form video script (60-90 seconds) that:
1. Opens with a HOOK that connects the trending topic to the target audience's pain point
2. Bridges the trend to the business offer naturally
3. Delivers value or insight related to the trend
4. Ends with a clear CTA to check out the offer
5. Is formatted for ${platform} best practices

Format your response EXACTLY as:
TITLE: [Catchy title]
HOOK: [Opening hook - first 3 seconds]
SCRIPT: [Full script with timing cues]
CTA: [Call to action]
HASHTAGS: [List 5-8 relevant hashtags separated by spaces]`;

    case 'meme':
      return `${baseContext}

Generate a meme concept that:
1. Uses the trending topic as the meme format/template
2. Relates it to the target audience's experience in the ${userProfile.niche} niche
3. Subtly references the offer without being salesy
4. Includes caption text for the meme

Format your response EXACTLY as:
MEME_CONCEPT: [Description of visual/template]
TOP_TEXT: [Text for top of meme]
BOTTOM_TEXT: [Text for bottom of meme]
CAPTION: [Social media caption to accompany the meme]
HASHTAGS: [List 5-8 relevant hashtags separated by spaces]`;

    case 'caption':
      return `${baseContext}

Generate an engaging ${platform} caption that:
1. References the trending topic in the opening
2. Provides value or insight
3. Connects to the business offer
4. Includes a clear CTA
5. Uses platform-appropriate formatting and emojis

Format your response EXACTLY as:
CAPTION: [Full caption text]
CTA: [Call to action]
HASHTAGS: [List 5-8 relevant hashtags separated by spaces]`;

    case 'hook':
      return `${baseContext}

Generate 5 different viral hooks (opening lines) for ${platform} that:
1. Stop the scroll immediately
2. Connect the trending topic to audience pain/desire
3. Make them want to keep watching/reading
4. Are under 10 words each

Format your response EXACTLY as:
HOOK_1: [First hook]
HOOK_2: [Second hook]
HOOK_3: [Third hook]
HOOK_4: [Fourth hook]
HOOK_5: [Fifth hook]`;

    case 'cta':
      return `${baseContext}

Generate 3 different CTAs for ${platform} that:
1. Connect to the trending topic context
2. Drive action toward the offer
3. Create urgency or curiosity
4. Are platform-appropriate

Format your response EXACTLY as:
CTA_1: [First CTA]
CTA_2: [Second CTA]
CTA_3: [Third CTA]`;

    default:
      return baseContext;
  }
}

function parseResponse(
  response: string,
  contentType: string,
  platform: string
): GeneratedContent {
  const lines = response.split('\n');
  const result: GeneratedContent = {
    body: '',
    hashtags: []
  };

  let currentSection = '';
  let bodyLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('TITLE:')) {
      result.title = trimmed.replace('TITLE:', '').trim();
    } else if (trimmed.startsWith('HOOK:')) {
      result.hook = trimmed.replace('HOOK:', '').trim();
      currentSection = '';
    } else if (trimmed.startsWith('SCRIPT:')) {
      currentSection = 'script';
    } else if (trimmed.startsWith('CAPTION:')) {
      currentSection = 'caption';
    } else if (trimmed.startsWith('CTA:')) {
      result.cta = trimmed.replace('CTA:', '').trim();
      currentSection = '';
    } else if (trimmed.startsWith('HASHTAGS:')) {
      const hashtagText = trimmed.replace('HASHTAGS:', '').trim();
      result.hashtags = hashtagText.split(/\s+/).filter(h => h.startsWith('#') || h.length > 0)
        .map(h => h.startsWith('#') ? h : `#${h}`);
      currentSection = '';
    } else if (trimmed.startsWith('MEME_CONCEPT:')) {
      bodyLines.push(trimmed);
    } else if (trimmed.startsWith('TOP_TEXT:') || trimmed.startsWith('BOTTOM_TEXT:')) {
      bodyLines.push(trimmed);
    } else if (trimmed.startsWith('HOOK_')) {
      bodyLines.push(trimmed);
    } else if (trimmed.startsWith('CTA_')) {
      bodyLines.push(trimmed);
    } else if (currentSection && trimmed) {
      bodyLines.push(trimmed);
    }
  }

  result.body = bodyLines.join('\n').trim() || response.trim();

  // Ensure we have hashtags
  if (result.hashtags.length === 0) {
    result.hashtags = ['#trending', '#viral', `#${platform}`];
  }

  return result;
}

// Batch generation for multiple content types
export async function generateContentBatch(
  trend: ContentGenerationRequest['trend'],
  userProfile: ContentGenerationRequest['userProfile'],
  apiKey: string
): Promise<Record<string, GeneratedContent>> {
  const contentTypes: Array<ContentGenerationRequest['contentType']> = [
    'script',
    'caption',
    'hook',
    'cta'
  ];

  const results: Record<string, GeneratedContent> = {};

  // Generate in parallel
  await Promise.all(
    contentTypes.map(async (contentType) => {
      try {
        results[contentType] = await generateContent(
          {
            trend,
            userProfile,
            contentType,
            platform: 'instagram_reels' // Default platform
          },
          apiKey
        );
      } catch (error) {
        console.error(`Error generating ${contentType}:`, error);
        results[contentType] = {
          body: `Error generating ${contentType}`,
          hashtags: []
        };
      }
    })
  );

  return results;
}
