import { NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const options = { url };
    const { result } = await ogs(options);

    return NextResponse.json({
      title: result.ogTitle || result.twitterTitle || '',
      description: result.ogDescription || result.twitterDescription || '',
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
      siteName: result.ogSiteName || '',
      url: result.ogUrl || url,
    });
  } catch (error) {
    console.error('Error fetching OGP data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch OGP data' },
      { status: 500 }
    );
  }
} 