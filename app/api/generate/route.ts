import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateContent, generateContentBatch } from '@/lib/content-generator';

// POST /api/generate - Generate content from trend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trendId, profileId, contentType, platform, batch } = body;

    if (!trendId || !profileId) {
      return NextResponse.json(
        { error: 'trendId and profileId are required' },
        { status: 400 }
      );
    }

    // Get trend and profile
    const [trend, profile] = await Promise.all([
      prisma.trend.findUnique({ where: { id: trendId } }),
      prisma.userProfile.findUnique({ where: { id: profileId } })
    ]);

    if (!trend || !profile) {
      return NextResponse.json(
        { error: 'Trend or profile not found' },
        { status: 404 }
      );
    }

    // Get Claude API key
    const anthropicKey = await prisma.apiKey.findUnique({
      where: { service: 'anthropic' }
    });

    if (!anthropicKey) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    // Generate content
    let generatedContent;
    
    if (batch) {
      // Generate multiple content types
      const batchResults = await generateContentBatch(
        {
          topic: trend.topic,
          description: trend.description || undefined,
          source: trend.source
        },
        {
          businessName: profile.businessName,
          niche: profile.niche,
          targetAudience: profile.targetAudience,
          offerName: profile.offerName,
          offerUrl: profile.offerUrl || undefined
        },
        anthropicKey.key
      );

      // Save all generated content to database
      const savedContent = await Promise.all(
        Object.entries(batchResults).map(async ([type, content]) => {
          return prisma.content.create({
            data: {
              trendId,
              profileId,
              contentType: type,
              platform: platform || 'instagram_reels',
              title: content.title,
              body: content.body,
              hook: content.hook,
              cta: content.cta,
              hashtags: JSON.stringify(content.hashtags)
            }
          });
        })
      );

      return NextResponse.json({ content: savedContent });
    } else {
      // Generate single content type
      if (!contentType || !platform) {
        return NextResponse.json(
          { error: 'contentType and platform are required for single generation' },
          { status: 400 }
        );
      }

      generatedContent = await generateContent(
        {
          trend: {
            topic: trend.topic,
            description: trend.description || undefined,
            source: trend.source
          },
          userProfile: {
            businessName: profile.businessName,
            niche: profile.niche,
            targetAudience: profile.targetAudience,
            offerName: profile.offerName,
            offerUrl: profile.offerUrl || undefined
          },
          contentType,
          platform
        },
        anthropicKey.key
      );

      // Save to database
      const savedContent = await prisma.content.create({
        data: {
          trendId,
          profileId,
          contentType,
          platform,
          title: generatedContent.title,
          body: generatedContent.body,
          hook: generatedContent.hook,
          cta: generatedContent.cta,
          hashtags: JSON.stringify(generatedContent.hashtags)
        }
      });

      return NextResponse.json({ content: savedContent });
    }
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET /api/generate - Get generated content
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profileId');
    const trendId = searchParams.get('trendId');
    const contentId = searchParams.get('contentId');

    if (contentId) {
      // Get specific content
      const content = await prisma.content.findUnique({
        where: { id: contentId },
        include: { trend: true }
      });

      return NextResponse.json({ content });
    }

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    // Get all content for profile
    const where: any = { profileId };
    if (trendId) {
      where.trendId = trendId;
    }

    const content = await prisma.content.findMany({
      where,
      include: { trend: true },
      orderBy: { generatedAt: 'desc' }
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json(
      { error: 'Failed to get content' },
      { status: 500 }
    );
  }
}
