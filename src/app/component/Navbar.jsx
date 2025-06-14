'use client';

import Link from 'next/link';

export default function Navbar() {
  const siteName = 'Design.com';

  return (
    <header>
      <nav className="navbar navbar-light bg-dark nav-color">
        <div className="container d-flex justify-content-between align-items-center">
          <h2>
            <Link href="/" className="navLogo text-white text-decoration-none">
              {siteName}
            </Link>
          </h2>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-primary nav-btn">
              Save progress
            </button>
            <a
              href="/path-to-downloadable-file" // change this to your actual file path
              className="btn btn-primary nav-btn"
              download
            >
              Download
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
