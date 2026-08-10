import type { EventItem, Person, StatItem, WorkItem } from './types';
import { fallback } from '@/data/fallback';

/**
 * Google Sheet as CMS.
 *
 * Uses the gviz CSV endpoint, which needs no API key and no OAuth token —
 * so there is nothing to rotate or expire. The only requirement is that the
 * sheet is shared as "Anyone with the link can view".
 *
 * Set SHEET_ID in .env.local. With it unset the site renders the sample data
 * in data/fallback.ts, so the build never breaks on a missing sheet.
 */
const SHEET_ID = process.env.SHEET_ID;

function csvUrl(tab: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

/** RFC-4180 enough: handles quoted fields, escaped quotes and embedded commas/newlines. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

/** Turns a sheet tab into objects keyed by its header row (lowercased, underscored). */
async function readTab(tab: string): Promise<Record<string, string>[]> {
  if (!SHEET_ID) return [];

  try {
    const res = await fetch(csvUrl(tab), { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn(`[sheets] "${tab}" returned ${res.status} — using fallback`);
      return [];
    }

    const rows = parseCsv(await res.text());
    if (rows.length < 2) return [];

    const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
    return rows.slice(1).map((cells) =>
      Object.fromEntries(headers.map((h, i) => [h, (cells[i] ?? '').trim()])),
    );
  } catch (err) {
    console.warn(`[sheets] "${tab}" failed — using fallback:`, err);
    return [];
  }
}

const truthy = (v?: string) => ['true', 'yes', 'y', '1', 'x'].includes((v ?? '').toLowerCase());

export async function getPeople(): Promise<Person[]> {
  const rows = await readTab('people');
  if (!rows.length) return fallback.people;

  return rows
    .map((r) => ({
      id: r.id || r.name,
      name: r.name,
      role: r.role,
      tier: r.tier,
      blurb: r.blurb,
      photo: r.photo,
      lead: truthy(r.lead),
      youtubeChannelId: r.youtube_channel_id || undefined,
      instagram: r.instagram || undefined,
      tiktok: r.tiktok || undefined,
      x: r.x || undefined,
      threads: r.threads || undefined,
      snapchat: r.snapchat || undefined,
      tiktokFollowers: r.tiktok_followers || undefined,
      instagramFollowers: r.instagram_followers || undefined,
      show: r.show_on_site === '' ? true : truthy(r.show_on_site),
    }))
    .filter((p) => p.show && p.name);
}

export async function getEvents(): Promise<EventItem[]> {
  const rows = await readTab('events');
  if (!rows.length) return fallback.events;

  return rows
    .map((r) => ({
      date: r.date,
      title: r.title,
      blurb: r.blurb,
      brand: r.brand,
      image: driveDirect(r.image),
      link: r.link || undefined,
      featured: truthy(r.featured),
    }))
    .filter((e) => e.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getWork(): Promise<WorkItem[]> {
  const rows = await readTab('work');
  if (!rows.length) return fallback.work;

  return rows
    .map((r) => ({
      brand: r.brand,
      logo: driveDirect(r.logo),
      year: r.year,
      what: r.what_we_made || r.what,
      result: r.result,
      link: r.link || undefined,
      featured: truthy(r.featured),
    }))
    .filter((w) => w.brand);
}

export async function getStats(): Promise<StatItem[] | null> {
  const rows = await readTab('stats');
  if (!rows.length) return null;
  return rows
    .map((r) => ({ value: r.value, suffix: r.suffix ?? '', label: r.label }))
    .filter((s) => s.value && s.label);
}

/**
 * Google Drive share links aren't image URLs. Rewrite them so he can paste
 * whatever Drive gives him into the sheet and it just works.
 */
export function driveDirect(url?: string): string | undefined {
  if (!url) return undefined;
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return m ? `https://drive.google.com/uc?export=view&id=${m[1]}` : url;
}
