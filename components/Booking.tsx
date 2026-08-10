'use client';

import { useState } from 'react';
import { site } from '@/lib/config';

/**
 * Composes a structured enquiry into the user's mail client. No backend, no
 * inbox integration, nothing to maintain — and the qualifying fields (budget,
 * timeline, type) still do their job of filtering enquiries before they land.
 */
export function Booking() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();

    const body = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Company / brand: ${get('company')}`,
      `Enquiry type: ${get('type')}`,
      `Budget range: ${get('budget')}`,
      `Timeline: ${get('timeline')}`,
      '',
      get('message'),
    ].join('\n');

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${get('type')} enquiry — ${get('company') || get('name')}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section
      id="book"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}
    >
      <div className="wrap book">
        <aside>
          <div className="eyebrow">Get in touch</div>
          <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', marginTop: 20 }}>
            Let&apos;s build something worth watching.
          </h2>
          <p>
            Tell us who you are and what you have in mind. Enquiries are usually
            answered within two working days.
          </p>
          <a className="mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </aside>

        <form onSubmit={onSubmit}>
          <div className="row2">
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
          </div>

          <div className="row2">
            <div>
              <label htmlFor="company">Company / brand</label>
              <input id="company" name="company" />
            </div>
            <div>
              <label htmlFor="type">Enquiry type</label>
              <select id="type" name="type" defaultValue="Brand partnership">
                <option>Brand partnership</option>
                <option>Live event / appearance</option>
                <option>Family / multi-channel campaign</option>
                <option>Press</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row2">
            <div>
              <label htmlFor="budget">Budget range</label>
              <select id="budget" name="budget" defaultValue="Not sure yet">
                <option>Under £2,000</option>
                <option>£2,000 – £5,000</option>
                <option>£5,000 – £15,000</option>
                <option>£15,000+</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline">Timeline</label>
              <input id="timeline" name="timeline" placeholder="e.g. September 2026" />
            </div>
          </div>

          <div>
            <label htmlFor="message">Tell us about it</label>
            <textarea id="message" name="message" />
          </div>

          <div>
            <button className="btn" type="submit">
              {sent ? 'Opening your mail app…' : 'Send enquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
