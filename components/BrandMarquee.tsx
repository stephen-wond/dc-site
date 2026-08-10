import type { WorkItem } from '@/lib/types';

/** Brand names scroll infinitely; the list is duplicated so the loop is seamless. */
export function BrandMarquee({ work }: { work: WorkItem[] }) {
  const brands = work.map((w) => w.brand).filter(Boolean);
  if (!brands.length) return null;
  const loop = [...brands, ...brands];

  return (
    <div className="marq">
      <div className="marq-in">
        {loop.map((b, i) => (
          <span key={`${b}-${i}`}>
            {b}
            <i aria-hidden="true"> ◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}
