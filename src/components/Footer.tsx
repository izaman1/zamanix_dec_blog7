import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Diamond } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show only newsletter section on blog routes
  if (location.pathname.includes('/blog')) {
    return (
      <footer className="bg-black text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center items-center">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-start justify-center "
              >
                <img src="/logo.png" alt="logo" className="md:w-48  w-36" />
              </Link>
            </div>
            <h3 className="text-white text-sm font-medium tracking-wide mb-4">
              NEWSLETTER
            </h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-sm"
              />
              <button className="w-full bg-white text-black px-4 py-2 text-sm tracking-wider hover:bg-white/90 transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Zamanix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="flex justify-center items-center">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-start justify-center "
            >
              <img src="/logo.png" alt="logo" className="md:w-48  w-36" />
            </Link>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="text-white text-sm font-medium tracking-wide mb-4">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Ring Size Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="text-white text-sm font-medium tracking-wide mb-4">
              ABOUT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/craftsmanship"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/stores"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-white transition-colors"
                >
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="text-white text-sm font-medium tracking-wide mb-4">
              NEWSLETTER
            </h3>
            <p className="text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-sm"
              />
              <button className="w-full bg-white text-black px-4 py-2 text-sm tracking-wider hover:bg-white/90 transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Zamanix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
