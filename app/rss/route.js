import { getWallpapers } from '@/lib/wallpapers-server';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let wallpapers = [];
    try {
        wallpapers = await getWallpapers();
    } catch (error) {
        console.error('Error fetching wallpapers for RSS:', error);
    }

    // Sort by date, newest first
    const sortedWallpapers = [...wallpapers].sort((a, b) => {
        const dateA = new Date(a.addedOn || '').getTime() || 0;
        const dateB = new Date(b.addedOn || '').getTime() || 0;
        return dateB - dateA;
    });

    // Take latest 20 wallpapers
    const latestWallpapers = sortedWallpapers.slice(0, 20);

    const rssItems = latestWallpapers.map((wallpaper, index) => {
        const wallpaperId = wallpapers.findIndex(w => w.image === wallpaper.image);
        const pubDate = wallpaper.addedOn
            ? new Date(wallpaper.addedOn).toUTCString()
            : new Date().toUTCString();

        return `
    <item>
      <title><![CDATA[${wallpaper.anime} - ${wallpaper.artist}]]></title>
      <link>${baseUrl}/wallpaper/${wallpaperId}</link>
      <guid isPermaLink="true">${baseUrl}/wallpaper/${wallpaperId}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[
        <img src="${wallpaper.image}" alt="${wallpaper.anime} wallpaper" />
        <p>New ${wallpaper.anime} wallpaper by ${wallpaper.artist}.</p>
        <p>Source: ${wallpaper.source}</p>
      ]]></description>
      <enclosure url="${wallpaper.image}" type="image/jpeg" />
    </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FrameZero Wallpapers</title>
    <link>${baseUrl}</link>
    <description>Latest anime wallpapers from FrameZero</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rss, {
        status: 200,
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
