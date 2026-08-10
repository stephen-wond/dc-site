# Daniel Cutting

Next.js 16 (App Router) marketing site. Content comes from a Google Sheet and
the public YouTube feeds; the site regenerates itself hourly.

## Run it

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to wire up the sheet. With no env vars set,
the site renders the sample rows in `data/fallback.ts` — it always builds.

## The Google Sheet (the CMS)

Share the sheet **"Anyone with the link can view"**, then put its ID in
`SHEET_ID`. That's the long string between `/d/` and `/edit` in the sheet URL.

No API key and no OAuth token, so **there is nothing to rotate or expire.**
Reads use the public `gviz` CSV endpoint. Tabs must be named exactly:

### `people`
| column | notes |
|---|---|
| `id` | short slug, e.g. `daniel` |
| `name`, `role`, `tier`, `blurb` | text |
| `photo` | `/assets/x.jpg` or a Drive share link |
| `lead` | `yes` for the wide card — exactly one person |
| `youtube_channel_id` | `UC…` — drives subscriber count *and* the video rail |
| `instagram`, `tiktok`, `x`, `threads`, `snapchat` | handles, no `@`. Blank = no icon |
| `tiktok_followers`, `instagram_followers` | manual; blank renders `—` |
| `show_on_site` | `no` hides the person without a redeploy |

### `events`
`date` (YYYY-MM-DD) · `title` · `blurb` · `brand` · `image` · `link` · `featured`
Newest first automatically. The top row becomes the large card.

### `work`
`brand` · `logo` · `year` · `what_we_made` · `result` · `link` · `featured`
Feeds the scrolling brand bar.

### `stats` (optional)
`value` · `suffix` · `label` — overrides the hero stats entirely. Leave the tab
empty and it uses live YouTube counts plus the constants in `lib/config.ts`.

Google Drive share links are rewritten to direct image URLs automatically, so
he can paste whatever Drive gives him.

## YouTube

- **Videos** — public RSS feed. No key, no quota.
- **Subscribers** — scraped from the public channel page by default. Set
  `YOUTUBE_API_KEY` to use the official API instead, which is more reliable.
  The channel page is ~3MB so it exceeds Next's data cache limit; that's the
  build warning, and it's harmless (it refetches hourly rather than caching).

## What still needs real data

- Instagram and TikTok follower counts (both platforms block scraping). Fill
  `tiktok_followers` / `instagram_followers` in the sheet from his analytics.
  Anything unverified renders greyed with a `?` rather than as fact.
- Real brand logo files for the marquee — it's text today.
- An SVG logo, and a black-on-transparent variant for light backgrounds.

## Structure

- `/` — version picker (`app/page.tsx`)
- `/v1` — the current design (`app/v1/`)

To add a version: copy `app/v1` to `app/v2`, tweak it, then add a row to the
`versions` array in `app/page.tsx`.

## Publishing (GitHub Pages)

Pages serves `docs/` on `main`. There is no CI — you publish by building
locally and pushing:

```bash
npm run build:pages
git add -A && git commit -m "update" && git push
```

Live at https://stephen-wond.github.io/dc-site/

Because it is a static export, **content is a snapshot from build time**.
New videos or sheet edits appear the next time you run `build:pages`.

For the real site (not this mock-up), deploy to Vercel instead: drop
`output: 'export'` from `next.config.mjs` and restore `export const revalidate
= 3600`, and it updates itself hourly with no rebuild.
