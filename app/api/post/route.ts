import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

const POSTSTREAM_API = 'https://api.poststream.io/v1';

// POST /api/post - Create and optionally schedule a post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, profileId, platform, scheduledFor } = body;

    if (!contentId || !profileId || !platform) {
      return NextResponse.json(
        { error: 'contentId, profileId, and platform are required' },
        { status: 400 }
      );
    }

    // Get content
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: { trend: true }
    });

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    // Get PostStream API key
    const poststreamKey = await prisma.apiKey.findUnique({
      where: { service: 'poststream' }
    });

    if (!poststreamKey) {
      return NextResponse.json(
        { error: 'PostStream API key not configured' },
        { status: 500 }
      );
    }

    // Create post record
    const post = await prisma.post.create({
      data: {
        contentId,
        profileId,
        platform,
        status: scheduledFor ? 'scheduled' : 'draft',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null
      }
    });

    // If scheduled or immediate, post via PostStream
    if (scheduledFor || body.postNow) {
      try {
        const postData = {
          platforms: [platform],
          content: {
            text: formatContentForPlatform(content, platform),
            media: [] // Would include media URLs if available
          },
          scheduledTime: scheduledFor ? new Date(scheduledFor).toISOString() : undefined
        };

        const response = await axios.post(
          `${POSTSTREAM_API}/posts`,
          postData,
          {
            headers: {
              'Authorization': `Bearer ${poststreamKey.key}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Update post with PostStream response
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: scheduledFor ? 'scheduled' : 'posted',
            postId: response.data.id,
            postedAt: scheduledFor ? null : new Date()
          }
        });

        return NextResponse.json({
          post,
          poststreamResponse: response.data
        });
      } catch (error: any) {
        // Update post with error
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'failed',
            error: error.message
          }
        });

        return NextResponse.json(
          { error: 'Failed to post via PostStream', details: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Post API error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

// GET /api/post - Get posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const profileId = searchParams.get('profileId');
    const status = searchParams.get('status');

    if (!profileId) {
      return NextResponse.json(
        { error: 'profileId is required' },
        { status: 400 }
      );
    }

    const where: any = { profileId };
    if (status) {
      where.status = status;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        content: {
          include: {
            trend: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Failed to get posts' },
      { status: 500 }
    );
  }
}

// Helper to format content for different platforms
function formatContentForPlatform(content: any, platform: string): string {
  const hashtags = JSON.parse(content.hashtags || '[]');
  const hashtagText = hashtags.join(' ');

  switch (platform) {
    case 'twitter':
    case 'x':
      // Twitter has 280 char limit
      const twitterText = content.cta || content.body.substring(0, 200);
      return `${twitterText}\n\n${hashtagText}`;

    case 'instagram':
    case 'instagram_reels':
      // Instagram allows longer captions
      return `${content.body}\n\n${content.cta || ''}\n\n${hashtagText}`;

    case 'tiktok':
      // TikTok captions are shorter, focus on hooks
      return `${content.hook || content.body.substring(0, 150)}\n\n${hashtagText}`;

    case 'linkedin':
      // LinkedIn prefers professional tone
      return `${content.body}\n\n${content.cta || ''}\n\n${hashtagText}`;

    case 'youtube':
    case 'youtube_shorts':
      // YouTube description
      return `${content.title || ''}\n\n${content.body}\n\n${content.cta || ''}\n\n${hashtagText}`;

    default:
      return `${content.body}\n\n${content.cta || ''}\n\n${hashtagText}`;
  }
}
