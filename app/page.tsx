import Link from 'next/link';
import { basePath } from '@/lib/config';

export const dynamic = 'force-static';

/**
 * Version picker. Each entry is a self-contained design under app/<slug>/.
 * To add one: copy app/v1 to app/v2, then add a row here.
 */
const versions = [
  {
    slug: 'v1',
    name: 'V1 — Red / dark',
    date: 'August 2026',
    status: 'Current',
    notes:
      'Dark base with a signal-red accent. Full-bleed cut-out hero, vertical stats, live YouTube rails and a Google Sheet driving events, people and brands.',
  },
];

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
              <Link href={`/${v.slug}`} className="vcard">
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
              </Link>
            </li>
          ))}
        </ul>

        <footer className="vindex-foot">
          Rebuilt daily from the Google Sheet and the YouTube feeds.
        </footer>
      </div>
    </main>
  );
}
