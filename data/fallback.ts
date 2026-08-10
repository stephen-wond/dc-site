import type { EventItem, Person, WorkItem } from '@/lib/types';

/**
 * Rendered when SHEET_ID is unset or the sheet can't be reached, so the site
 * always builds. Replace these rows in the sheet, not here.
 */
export const fallback: {
  people: Person[];
  events: EventItem[];
  work: WorkItem[];
} = {
  people: [
    {
      id: 'daniel',
      name: 'Daniel Cutting',
      role: 'Freestyler · 10× World Record Holder',
      tier: 'Headline talent',
      blurb:
        'The main event. Fifteen years of world-class freestyle, a global YouTube following and a track record with brands from Under Armour to Anthony Joshua. Live shows, campaign content and appearances worldwide.',
      photo: '/assets/daniel.avif',
      lead: true,
      youtubeChannelId: 'UCw5fGoKFgvzk9ZEegkScrtQ',
      instagram: 'dcfreestyle',
      tiktok: 'dcfreestyle',
      show: true,
    },
    {
      id: 'joshua',
      name: 'Joshua',
      role: 'Football · Lego · Challenges',
      tier: 'Rising talent',
      blurb:
        "Daniel's eldest. His own channel, his own audience — football challenges, Lego builds and everyday adventures that land squarely with kids and their parents.",
      photo: '/assets/joshua.jpg',
      lead: false,
      youtubeChannelId: 'UC4_nT1QyTMjoqV0cgE9zssg',
      instagram: 'joshuacutting',
      tiktok: 'joshuacutting',
      show: true,
    },
    {
      id: 'sofia',
      name: 'Sofia',
      role: 'Scene stealer',
      tier: 'Guest star',
      blurb:
        "The youngest of the family and a regular fixture in Daniel's most-loved videos. A growing Instagram following of her own, managed entirely by her parents.",
      photo: '/assets/sofia.jpg',
      lead: false,
      instagram: 'sofiaraecutting',
      show: true,
    },
  ],

  events: [
    {
      date: '2026-06-01',
      title: 'Under Armour × Anthony Joshua',
      blurb:
        'A TikTok collaboration built around a single freestyle sequence, filmed on location and cut for vertical. Delivered to both audiences simultaneously and became the highest-performing post on the channel that month.',
      brand: 'Under Armour — Social campaign',
      featured: true,
    },
    {
      date: '2026-04-12',
      title: 'Corporate hospitality tour',
      blurb:
        'Live freestyle performance and meet-and-greet across a season of matchday hospitality suites.',
      brand: 'Live events',
      featured: false,
    },
    {
      date: '2026-02-20',
      title: 'European content series',
      blurb: 'A multi-city shoot producing a month of short-form content in a single trip.',
      brand: 'Content production',
      featured: false,
    },
  ],

  work: [
    { brand: 'Under Armour', year: '2026', what: 'Social campaign', result: '', featured: true },
    { brand: 'Anthony Joshua', year: '2026', what: 'Collaboration', result: '', featured: true },
    { brand: 'Corporate Hospitality', year: '', what: 'Live events', result: '', featured: false },
    { brand: 'Product Launches', year: '', what: 'Appearances', result: '', featured: false },
    { brand: 'Live Entertainment', year: '', what: 'Stage shows', result: '', featured: false },
    { brand: 'Commercials', year: '', what: 'Broadcast', result: '', featured: false },
  ],
};
