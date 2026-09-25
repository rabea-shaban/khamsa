import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

  // If no valid publisher ID is provided, return a safe comment without fake IDs
  if (!publisherId || publisherId.includes('XXXXX') || !publisherId.startsWith('pub-')) {
    return new NextResponse('# Google AdSense ads.txt - Pending Real Publisher ID configuration\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // Standard verified Google AdSense ads.txt record
  const content = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
