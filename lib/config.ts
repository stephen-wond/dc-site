import type { Person, SocialLink } from './types';

/** GitHub Pages serves the site under /<repo>, so local asset paths need prefixing. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (p: string) => (p.startsWith('/') ? `${basePath}${p}` : p);

export const site = {
  name: 'Daniel Cutting',
  title: 'Daniel Cutting — Freestyler, YouTuber, Entertainer',
  description:
    'Football freestyler, YouTuber and entertainer. 10× Guinness World Record holder. Live events, brand partnerships and family content — worldwide.',
  email: 'danielcuttingenquiries@gmail.com',
  url: 'https://www.danielcutting.com',
  /** Shown when the `stats` sheet tab is empty. Keep these honest. */
  worldRecords: '10',
  yearsPerforming: '15',
  totalFollowing: '2.7M+',
};

export const socialUrl = (platform: string, handle: string) => {
  const h = handle.replace(/^@/, '');
  switch (platform) {
    case 'instagram':
      return `https://www.instagram.com/${h}/`;
    case 'tiktok':
      return `https://www.tiktok.com/@${h}`;
    case 'x':
      return `https://x.com/${h}`;
    case 'threads':
      return `https://www.threads.com/@${h}`;
    case 'snapchat':
      return `https://www.snapchat.com/add/${h}`;
    case 'youtube':
      return `https://www.youtube.com/channel/${h}`;
    default:
      return '#';
  }
};

/** Only platforms the person actually has produce a link — blanks disappear. */
export function socialsFor(p: Person): SocialLink[] {
  const out: SocialLink[] = [];
  if (p.youtubeChannelId)
    out.push({
      platform: 'youtube',
      href: socialUrl('youtube', p.youtubeChannelId),
      label: `${p.name} on YouTube`,
    });
  (['instagram', 'tiktok', 'x', 'threads', 'snapchat'] as const).forEach((k) => {
    const handle = p[k];
    if (handle)
      out.push({
        platform: k,
        href: socialUrl(k, handle),
        label: `${p.name} on ${k[0].toUpperCase()}${k.slice(1)}`,
      });
  });
  return out;
}
