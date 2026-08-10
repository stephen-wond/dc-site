import { thumbnail, watchUrl } from '@/lib/youtube';
import type { Video } from '@/lib/types';

export type Rail = { name: string; channelUrl: string; videos: Video[] };

export function VideoRails({ rails }: { rails: Rail[] }) {
  const live = rails.filter((r) => r.videos.length);
  if (!live.length) return null;

  return (
    <section id="latest" className="latest-tight">
      <div className="wrap">
        <div className="latest-bar">
          <div className="eyebrow">Live from the channels · updates itself</div>
          <a
            href={live[0].channelUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            Subscribe on YouTube
          </a>
        </div>

        {live.map((rail) => (
          <div className="rail-block" key={rail.name}>
            <div className="rail-head">
              <h3>{rail.name}</h3>
              <a href={rail.channelUrl} target="_blank" rel="noopener">
                View channel →
              </a>
            </div>
            <div className="rail">
              {rail.videos.map((v) => (
                <a
                  className="vid"
                  key={v.id}
                  href={watchUrl(v.id)}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="thumb">
                    <img loading="lazy" src={thumbnail(v.id)} alt="" />
                  </div>
                  <div className="t">{v.title}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
