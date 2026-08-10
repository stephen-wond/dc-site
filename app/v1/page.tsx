import { Nav } from '@/components/Nav';
import { SocialRail } from '@/components/SocialRail';
import { Hero } from '@/components/Hero';
import { BrandMarquee } from '@/components/BrandMarquee';
import { VideoRails, type Rail } from '@/components/VideoRails';
import { Roster, type Reach } from '@/components/Roster';
import { Events } from '@/components/Events';
import { Services } from '@/components/Services';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

import { getEvents, getPeople, getStats, getWork } from '@/lib/sheets';
import { getLatestVideos, getSubscriberCount } from '@/lib/youtube';
import { asset, site } from '@/lib/config';
import type { StatItem } from '@/lib/types';

/**
 * Static export for GitHub Pages: data is fetched at BUILD time.
 * The scheduled GitHub Action rebuilds daily to keep it current.
 */
export const dynamic = 'force-static';

export default async function Page() {
  const [people, events, work, sheetStats] = await Promise.all([
    getPeople(),
    getEvents(),
    getWork(),
    getStats(),
  ]);

  const lead = people.find((p) => p.lead) ?? people[0];

  // Subscriber counts and latest videos, per person, in parallel.
  const channels = people.filter((p) => p.youtubeChannelId);
  const [subs, feeds] = await Promise.all([
    Promise.all(channels.map((p) => getSubscriberCount(p.youtubeChannelId!))),
    Promise.all(channels.map((p) => getLatestVideos(p.youtubeChannelId!, 6))),
  ]);

  const subsById = Object.fromEntries(channels.map((p, i) => [p.id, subs[i]]));

  const rails: Rail[] = channels.map((p, i) => ({
    name: p.name,
    channelUrl: `https://www.youtube.com/channel/${p.youtubeChannelId}`,
    videos: feeds[i],
  }));

  // Reach figures per person. Anything we can't verify is flagged, never invented.
  const reach: Record<string, Reach[]> = Object.fromEntries(
    people.map((p) => {
      const rows: Reach[] = [];
      if (p.youtubeChannelId)
        rows.push({ key: 'YouTube', value: subsById[p.id] ?? '—', verified: !!subsById[p.id] });
      if (p.tiktok)
        rows.push({ key: 'TikTok', value: p.tiktokFollowers || '—', verified: false });
      if (p.instagram)
        rows.push({ key: 'Instagram', value: p.instagramFollowers || '—', verified: false });
      return [p.id, rows];
    }),
  );

  const stats: StatItem[] = sheetStats ?? defaultStats(subsById, people);

  return (
    <>
      <Nav />
      <SocialRail people={people} />
      <Hero stats={stats} photo={asset('/assets/daniel-crop.avif')} />
      <BrandMarquee work={work} />
      <VideoRails rails={rails} />
      <Roster people={people} reach={reach} />
      <Events events={events} />
      <Services />
      <Booking />
      <Footer people={people} />
      <Reveal />
    </>
  );
}

/** Falls back to live YouTube numbers plus the constants in lib/config.ts. */
function defaultStats(
  subs: Record<string, string | null>,
  people: { id: string; name: string; lead: boolean }[],
): StatItem[] {
  const leadId = people.find((p) => p.lead)?.id ?? people[0]?.id;
  const second = people.find((p) => !p.lead && subs[p.id]);

  const out: StatItem[] = [];
  if (subs[leadId]) out.push(split(subs[leadId]!, 'YouTube subscribers'));
  if (second && subs[second.id])
    out.push(split(subs[second.id]!, `${second.name.split(' ')[0]}'s channel`));
  out.push(split(site.totalFollowing, 'Total following'));
  out.push({ value: site.worldRecords, suffix: '×', label: 'World records' });
  out.push({ value: site.yearsPerforming, suffix: 'yr', label: 'Performing worldwide' });
  return out;
}

/** "2.06M" -> { value: "2.06", suffix: "M" } so the suffix can be accented. */
function split(display: string, label: string): StatItem {
  const m = display.match(/^([\d.,]+)(.*)$/);
  return { value: m?.[1] ?? display, suffix: m?.[2] ?? '', label };
}
