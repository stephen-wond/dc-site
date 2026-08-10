import type { StatItem } from '@/lib/types';

export function Hero({ stats, photo }: { stats: StatItem[]; photo: string }) {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        {/* LEFT — headline */}
        <div className="hero-left">
          <div className="eyebrow">Freestyler · YouTuber · Entertainer</div>
          <h1>
            Football
            <br />
            that stops
            <br />
            <em>the scroll.</em>
          </h1>
        </div>

        {/* CENTRE — Daniel */}
        <div className="hero-portrait has-img" id="heroPortrait">
          <img className="portrait-img" src={photo} alt="Daniel Cutting" />
        </div>

        {/* RIGHT — vertical stats */}
        <div className="stats-v">
          {stats.map((s) => (
            <div className="stat-v" key={s.label}>
              <div className="n">
                {s.value}
                <i>{s.suffix}</i>
              </div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
