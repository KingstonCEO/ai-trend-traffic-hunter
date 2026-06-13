import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/keys - Get API keys (masked)
export async function GET(request: NextRequest) {
  try {
    const keys = await prisma.apiKey.findMany();
    
    // Mask the keys for security
    const maskedKeys = keys.map(key => ({
      id: key.id,
      service: key.service,
      key: maskApiKey(key.key),
      createdAt: key.createdAt,
      updatedAt: key.updatedAt
    }));

    return NextResponse.json({ keys: maskedKeys });
  } catch (error) {
    console.error('Get keys error:', error);
    return NextResponse.json(
      { error: 'Failed to get API keys' },
      { status: 500 }
    );
  }
}

// POST /api/keys - Save API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, key } = body;

    if (!service || !key) {
      return NextResponse.json(
        { error: 'service and key are required' },
        { status: 400 }
      );
    }

    // Upsert the key
    const apiKey = await prisma.apiKey.upsert({
      where: { service },
      update: { key },
      create: { service, key }
    });

    return NextResponse.json({
      apiKey: {
        id: apiKey.id,
        service: apiKey.service,
        key: maskApiKey(apiKey.key)
      }
    });
  } catch (error) {
    console.error('Save key error:', error);
    return NextResponse.json(
      { error: 'Failed to save API key' },
      { status: 500 }
    );
  }
}

// DELETE /api/keys - Delete API key
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const service = searchParams.get('service');

    if (!service) {
      return NextResponse.json(
        { error: 'service is required' },
        { status: 400 }
      );
    }

    await prisma.apiKey.delete({
      where: { service }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete key error:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}

function maskApiKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.substring(0, 4) + '****' + key.substring(key.length - 4);
}
