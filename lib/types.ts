export type Platform = 'youtube' | 'instagram' | 'tiktok' | 'x' | 'threads' | 'snapchat';

/** One row of the `people` tab. */
export type Person = {
  id: string;
  name: string;
  role: string;
  tier: string;
  blurb: string;
  photo: string;
  /** Renders as the wide lead card when true — exactly one person should be. */
  lead: boolean;
  youtubeChannelId?: string;
  instagram?: string;
  tiktok?: string;
  x?: string;
  threads?: string;
  snapchat?: string;
  /** Follower counts we can't fetch. Blank renders as an em-dash, never a guess. */
  tiktokFollowers?: string;
  instagramFollowers?: string;
  show: boolean;
};

/** One row of the `events` tab. */
export type EventItem = {
  date: string;
  title: string;
  blurb: string;
  brand: string;
  image?: string;
  link?: string;
  featured: boolean;
};

/** One row of the `work` tab. */
export type WorkItem = {
  brand: string;
  logo?: string;
  year: string;
  what: string;
  result: string;
  link?: string;
  featured: boolean;
};

/** One row of the `stats` tab — free-form so he can change what the hero shouts about. */
export type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

export type Video = {
  id: string;
  title: string;
  published: string;
  channel: string;
};

export type SocialLink = { platform: Platform; href: string; label: string };
