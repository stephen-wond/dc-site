import { asset, socialsFor, site } from '@/lib/config';
import type { Person } from '@/lib/types';

export function Footer({ people }: { people: Person[] }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <a href="#" className="logo">
            <img src={asset("/assets/logo.avif")} alt="" />
            <span className="wordmark">
              Daniel<em>Cutting</em>
            </span>
          </a>

          <div className="foot-cols">
            {people.map((p) => (
              <div key={p.id}>
                <h4>{p.name.split(' ')[0]}</h4>
                {socialsFor(p).map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener">
                    {l.platform[0].toUpperCase() + l.platform.slice(1)}
                  </a>
                ))}
              </div>
            ))}
            <div>
              <h4>Business</h4>
              <a href="#book">Bookings</a>
              <a href="#work">Selected work</a>
              <a href="#services">Work with us</a>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <div className="safeguard">
            All content featuring the children is created and managed by their parents.
            Enquiries involving them are handled directly by Daniel.
          </div>
          <div>© 2009–{new Date().getFullYear()} {site.name}</div>
        </div>
      </div>
    </footer>
  );
}
