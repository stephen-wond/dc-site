import { Icon } from './Icons';
import { asset, socialsFor } from '@/lib/config';
import type { Person } from '@/lib/types';

export type Reach = { key: string; value: string; verified: boolean };

export function Roster({
  people,
  reach,
}: {
  people: Person[];
  reach: Record<string, Reach[]>;
}) {
  return (
    <section
      id="roster"
      style={{
        background:
          'linear-gradient(180deg,transparent,rgba(255,255,255,.02),transparent)',
      }}
    >
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The roster</div>
          <h2>
            One family.
            <br />
            Three audiences.
          </h2>
          <p>
            Book Daniel on his own, or reach three distinct communities in a single
            campaign. Each channel has its own voice, its own following, and its own
            reason for a brand to be there.
          </p>
        </div>

        <div className="roster">
          {people.map((p) => {
            const links = socialsFor(p);
            return (
              <article
                className={`card ${p.lead ? 'card-lead' : 'card-sm'}`}
                key={p.id}
              >
                <div className="card-photo has-img">
                  <span className={`tier ${p.lead ? '' : 'alt'}`}>{p.tier}</span>
                  <img
                    className={`portrait-img pos-${p.id}`}
                    src={asset(p.photo)}
                    alt={p.name}
                  />
                </div>

                <div className="card-body">
                  <h3>{p.name}</h3>
                  <div className="role">{p.role}</div>
                  <p>{p.blurb}</p>

                  <div className="reach">
                    {(reach[p.id] ?? []).map((r) => (
                      <div key={r.key}>
                        <div className="v" {...(r.verified ? {} : { 'data-tbc': '' })}>
                          {r.value}
                        </div>
                        <div className="k">{r.key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="socials">
                    {links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        aria-label={l.label}
                      >
                        <Icon platform={l.platform} />
                      </a>
                    ))}
                  </div>

                  <div className="card-foot">
                    <a href="#book" className="link-arrow">
                      {p.lead ? `Enquire about ${p.name.split(' ')[0]}` : 'Enquire'}{' '}
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
