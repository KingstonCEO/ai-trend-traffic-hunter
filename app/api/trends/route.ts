import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchAllTrends, type TrendData } from '@/lib/trend-fetcher';

// GET /api/trends - Fetch and score trends
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profileId');
    const refresh = searchParams.get('refresh') === 'true';

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    // Get user profile
    const profile = await prisma.userProfile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Check if we need to refresh trends
    const shouldRefresh = refresh || await shouldFetchNewTrends(profileId);

    if (shouldRefresh) {
      // Parse keywords from JSON string
      const keywords = JSON.parse(profile.keywords || '[]');

      // Fetch API key for Twitter if available
      const twitterKey = await prisma.apiKey.findUnique({
        where: { service: 'twitter' }
      });

      // Fetch trends from all sources
      const trends = await fetchAllTrends(keywords, {
        twitterApiKey: twitterKey?.key,
        subreddits: [profile.niche.toLowerCase().replace(/\s+/g, '')]
      });

      // Save trends to database
      await Promise.all(
        trends.map(trend =>
          prisma.trend.create({
            data: {
              source: trend.source,
              topic: trend.topic,
              description: trend.description,
              viralityScore: trend.viralityScore,
              relevanceScore: trend.relevanceScore || 0,
              totalScore: trend.totalScore || 0,
              url: trend.url,
              metadata: JSON.stringify(trend.metadata),
              profileId
            }
          })
        )
      );
    }

    // Get latest trends from database
    const trends = await prisma.trend.findMany({
      where: { profileId },
      orderBy: { totalScore: 'desc' },
      take: 50
    });

    return NextResponse.json({ trends });
  } catch (error) {
    console.error('Trends API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: 500 }
    );
  }
}

// Helper to determine if we should fetch new trends
async function shouldFetchNewTrends(profileId: string): Promise<boolean> {
  const latestTrend = await prisma.trend.findFirst({
    where: { profileId },
    orderBy: { fetchedAt: 'desc' }
  });

  if (!latestTrend) return true;

  // Refresh if latest trend is older than 1 hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return latestTrend.fetchedAt < oneHourAgo;
}

// DELETE /api/trends - Clear old trends
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    // Delete trends older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    await prisma.trend.deleteMany({
      where: {
        profileId,
        fetchedAt: {
          lt: oneDayAgo
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete trends error:', error);
    return NextResponse.json(
      { error: 'Failed to delete trends' },
      { status: 500 }
    );
  }
}
