import { asset } from '@/lib/config';
import Link from 'next/link';

export function Nav() {
  return (
    <nav>
      <div className="wrap nav-in">
        <Link href="#" className="logo">
          <img src={asset("/assets/logo.avif")} alt="" />
          <span className="wordmark">
            Daniel<em>Cutting</em>
          </span>
        </Link>
        <div className="nav-links">
          <a href="#latest">Latest</a>
          <a href="#roster">The Family</a>
          <a href="#work">Events</a>
          <a href="#services">Work with us</a>
        </div>
        <a href="#book" className="btn">
          Book Daniel
        </a>
      </div>
    </nav>
  );
}
