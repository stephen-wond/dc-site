import type { Video } from './types';

/**
 * YouTube, without an API key.
 *
 * Latest videos come from the public RSS feed — no key, no quota, no expiry.
 * Subscriber counts are scraped from the channel's About page, which is the
 * only no-key source. If YOUTUBE_API_KEY is set we use the official API
 * instead, which is more robust; without it the scrape is a best effort and
 * failures fall back to whatever the sheet or fallback data says.
 */
const FEED = (channelId: string) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const REVALIDATE = 3600; // 1 hour

export async function getLatestVideos(channelId: string, limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(FEED(channelId), { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const xml = await res.text();

    const channel = xml.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    const entries = xml.split('<entry>').slice(1);

    return entries.slice(0, limit).map((entry) => ({
      id: entry.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1] ?? '',
      title: decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
      published: entry.match(/<published>([^<]*)<\/published>/)?.[1] ?? '',
      channel,
    }));
  } catch (err) {
    console.warn('[youtube] feed failed for', channelId, err);
    return [];
  }
}

/** Returns a display-ready count ("2.06M") or null if it can't be determined. */
export async function getSubscriberCount(channelId: string): Promise<string | null> {
  const key = process.env.YOUTUBE_API_KEY;

  if (key) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${key}`,
        { next: { revalidate: 86400 } },
      );
      if (res.ok) {
        const json = await res.json();
        const n = Number(json?.items?.[0]?.statistics?.subscriberCount);
        if (Number.isFinite(n)) return compact(n);
      }
    } catch (err) {
      console.warn('[youtube] API failed, falling back to scrape:', err);
    }
  }

  try {
    const res = await fetch(`https://www.youtube.com/channel/${channelId}/about`, {
      headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const raw = html.match(/"subscriberCountText":"([\d.,]+[KMB]?)\s*subscribers"/i)?.[1];
    return raw ? raw.toUpperCase() : null;
  } catch (err) {
    console.warn('[youtube] subscriber scrape failed for', channelId, err);
    return null;
  }
}

export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 2)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

export const thumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

function decodeXml(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
