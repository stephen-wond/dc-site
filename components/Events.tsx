import type { EventItem } from '@/lib/types';

const fmt = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

export function Events({ events }: { events: EventItem[] }) {
  if (!events.length) return null;
  const [lead, ...rest] = events;

  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Selected work</div>
          <h2>
            Recent events
            <br />
            &amp; campaigns
          </h2>
          <p>Driven by a shared spreadsheet — one new row and this section updates itself.</p>
        </div>

        <div className="event-grid">
          <article className="event feat">
            <div className="date">{fmt(lead.date)}</div>
            <h3>{lead.title}</h3>
            <p>{lead.blurb}</p>
            {lead.brand && <div className="brandtag">{lead.brand}</div>}
          </article>

          <div className="stack">
            {rest.slice(0, 2).map((e) => (
              <article className="event" key={e.title}>
                <div className="date">{fmt(e.date)}</div>
                <h3>{e.title}</h3>
                <p>{e.blurb}</p>
                {e.brand && <div className="brandtag">{e.brand}</div>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
