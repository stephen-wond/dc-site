import type { Metadata } from 'next';
import Link from 'next/link';
import { basePath } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Daniel Cutting — website concepts',
  description: 'Design concepts for review.',
};

export const dynamic = 'force-static';

/**
 * Version picker. Newest first.
 *
 * `external: true` means the version is a plain static folder copied into
 * docs/ at build time (not a Next route), so it needs a real <a>, not <Link>.
 */
const versions = [
  {
    slug: 'v2',
    name: 'V2 — Light / editorial',
    date: 'August 2026',
    status: 'Latest',
    external: true,
    notes:
      'Light editorial treatment on an off-white base with a deep red accent. Multi-page: events, camps, brands, about, contact and a Daniel & Joshua page, plus a video hero and a real client logo wall.',
  },
  {
    slug: 'v1',
    name: 'V1 — Dark / signal red',
    date: 'August 2026',
    status: 'Earlier concept',
    external: false,
    notes:
      'Dark base with a signal-red accent. Single page: full-bleed cut-out hero, vertical stats, live YouTube rails and a Google Sheet driving events, people and brands.',
  },
];

function VersionLink({
  slug,
  external,
  children,
}: {
  slug: string;
  external: boolean;
  children: React.ReactNode;
}) {
  if (external)
    return (
      <a href={`${basePath}/${slug}/`} className="vcard">
        {children}
      </a>
    );
  return (
    <Link href={`/${slug}`} className="vcard">
      {children}
    </Link>
  );
}

export default function Index() {
  return (
    <main className="vindex">
      <div className="vindex-in">
        <header className="vindex-head">
          <img src={`${basePath}/assets/logo.avif`} alt="" />
          <div className="eyebrow">Design versions</div>
          <h1>
            Daniel Cutting
            <br />
            <em>website concepts</em>
          </h1>
          <p>
            Concept designs for review. Each version below is a full, working build —
            live YouTube feeds and all. Pick one to view it.
          </p>
          <span className="vnote">Mock-up · not the live site</span>
        </header>

        <ul className="vlist">
          {versions.map((v) => (
            <li key={v.slug}>
              <VersionLink slug={v.slug} external={v.external}>
                <div className="vcard-top">
                  <span className="vslug">{v.slug}</span>
                  <span className="vstatus">{v.status}</span>
                </div>
                <h2>{v.name}</h2>
                <p>{v.notes}</p>
                <div className="vcard-foot">
                  <span className="vdate">{v.date}</span>
                  <span className="vgo">
                    View <span aria-hidden="true">→</span>
                  </span>
                </div>
              </VersionLink>
            </li>
          ))}
        </ul>

        <footer className="vindex-foot">
          Content comes from a Google Sheet and the YouTube feeds, baked in at build time. Push a new build to update.
        </footer>
      </div>
    </main>
  );
}
