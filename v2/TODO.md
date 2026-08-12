# v2 — outstanding

Fixed already: page titles, meta descriptions, canonical URLs, Open Graph /
Twitter share previews, favicon + apple-touch-icon, `lang` on index.html,
and the enquiry / camp buttons (they compose a pre-filled email via
`enquiry.js`).

Everything below is still open.

---

## 1. Verify the follower numbers — **do this first**

v2 claims **5M+ total · 2M+ YouTube · 1.6M+ TikTok · 500K+ Instagram**.

- YouTube is verified: **2.06M** (Daniel), **644K** (Joshua). Those are fine.
- The rest are unconfirmed, and **v1 says 2.7M+ total where v2 says 5M+** —
  nearly double. Both versions need to agree.
- TikTok and Instagram block scraping, so these can only come from Daniel's
  own analytics screens.

A brand's team will check. A smaller honest number costs less than an
inflated one that doesn't hold up.

## 2. Sofia is absent from v2

Zero mentions across all seven pages. She is on v1. Either deliberate
(she has Instagram only, and it avoids the safeguarding question) or an
oversight — worth an explicit decision with Daniel.

## 3. Homepage duplicates every sub-page

`index.html` is ~9,700px tall and contains events, camps, Daniel & Joshua,
brands, about and contact in full — all of which also exist as their own
pages. Two copies of the same copy will drift the moment one is edited, and
search engines treat it as duplicate content.

Pick one: homepage teasers that link out, **or** drop the sub-pages.

## 4. The pages don't render without JavaScript

- 84 unresolved `{{ … }}` placeholders in the HTML (`{{ railStyle }}`,
  `{{ nav }}`, `{{ heroStyle }}` …)
- 76 non-standard `style-hover` attributes
- Custom `<x-dc>` and `<helmet>` elements

All resolved at runtime by the 69KB `support.js`. Fine for a mock-up; before
launch this should be flattened to plain HTML + CSS so the site does not
depend on a design-tool runtime.

## 5. 47 requests to cdn.simpleicons.org

Every social icon is a separate third-party request. If that CDN is slow or
blocked, the icons vanish. They are tiny SVGs — inline them.

## 6. Replace mailto with a real form endpoint

`enquiry.js` composes a pre-filled email, which works everywhere and needs no
maintenance, but it does depend on the visitor having a mail client set up.
For launch use Formspree, Netlify Forms or an API route, and keep the
qualifying fields (who / enquiry type / budget / timeline).

## 7. Performance

- Homepage loads 66 images, ~1MB of assets
- `round-the-world.avif` is 198KB, `joshua.jpg` 159KB — both worth compressing
- Consider `loading="lazy"` on anything below the fold

## 8. Smaller things

- Nav collapses to a hamburger even at 1440px — wastes desktop space
- Strip the bracketed review notes before the client sees it:
  `[ figures are placeholders — … ]` and `[ draft copy — for Daniel to edit ]`
- Campaign view counts are marked "VIEWS · TBC" — needs real numbers or removal
- No `robots.txt` or `sitemap.xml`
