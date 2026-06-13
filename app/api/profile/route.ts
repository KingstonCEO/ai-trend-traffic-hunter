import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const profile = await prisma.userProfile.findUnique({
        where: { id }
      });
      return NextResponse.json({ profile });
    }

    // Get first profile (simplified for single-user system)
    const profile = await prisma.userProfile.findFirst();
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create or update profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, businessName, niche, targetAudience, offerName, offerUrl, keywords } = body;

    if (!businessName || !niche || !targetAudience || !offerName) {
      return NextResponse.json(
        { error: 'businessName, niche, targetAudience, and offerName are required' },
        { status: 400 }
      );
    }

    // Convert keywords array to JSON string
    const keywordsJson = JSON.stringify(keywords || []);

    if (id) {
      // Update existing profile
      const profile = await prisma.userProfile.update({
        where: { id },
        data: {
          businessName,
          niche,
          targetAudience,
          offerName,
          offerUrl,
          keywords: keywordsJson
        }
      });
      return NextResponse.json({ profile });
    } else {
      // Create new profile
      const profile = await prisma.userProfile.create({
        data: {
          businessName,
          niche,
          targetAudience,
          offerName,
          offerUrl,
          keywords: keywordsJson
        }
      });
      return NextResponse.json({ profile });
    }
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}
