import { Icon } from './Icons';
import { socialsFor } from '@/lib/config';
import type { Person } from '@/lib/types';

/** Fixed to the left edge. Becomes a bottom bar on narrow screens. */
export function SocialRail({ people }: { people: Person[] }) {
  return (
    <aside className="rail-social" aria-label="Social profiles">
      {people.map((p) => {
        const links = socialsFor(p);
        if (!links.length) return null;
        return (
          <div className="rail-group" key={p.id}>
            <div className="rail-who">{p.name.split(' ')[0]}</div>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                data-label={l.label}
                aria-label={l.label}
              >
                <Icon platform={l.platform} size={17} />
              </a>
            ))}
          </div>
        );
      })}
    </aside>
  );
}
