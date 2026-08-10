const offers = [
  {
    num: '01',
    title: 'Brand partnerships',
    body: 'Integrated content built for the platform it lives on. Concepted, filmed and edited in-house, so the product lands inside the trick — not bolted onto the end of it.',
    tags: ['YouTube', 'Shorts', 'TikTok', 'Reels'],
  },
  {
    num: '02',
    title: 'Live events & appearances',
    body: 'Half-time shows, product launches, corporate hospitality, festivals, barmitzvahs and school visits. A show that works for a stadium or a boardroom.',
    tags: ['Stage shows', 'Meet & greet', 'Workshops', 'Hosting'],
  },
  {
    num: '03',
    title: 'Family content',
    body: 'The most-watched videos on the channel are the ones made together. Genuinely family-safe, parent-managed, and a natural fit for brands that need to reach households.',
    tags: ['Multi-channel', 'Family-safe', 'Kids & parents'],
  },
];

export function Services() {
  return (
    <section id="services" style={{ paddingBottom: 'clamp(40px,5vw,64px)' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How to work with us</div>
          <h2>
            Three ways to
            <br />
            partner with us
          </h2>
          <p>
            Pick the one that fits, or tell us what you have in mind below. Every
            partnership is built around reach that already exists — not an audience we
            hope to find.
          </p>
        </div>

        <div className="offers">
          {offers.map((o) => (
            <div className="offer" key={o.num}>
              <div className="num">{o.num}</div>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
              <ul>
                {o.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
