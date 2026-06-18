import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoomsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setRoomsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        #gs-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(90deg, #0d0a05 0%, #1a1209 100%);
          border-bottom: 1px solid rgba(184,134,11,0.25);
          transition: box-shadow 0.3s, background 0.3s;
          font-family: 'Inter', sans-serif;
        }
        #gs-navbar.scrolled {
          background: rgba(13,10,5,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 28px rgba(0,0,0,0.5);
        }
        #gs-navbar:not(.scrolled) {
          box-shadow: none;
        }

        /* Brand */
        .gs-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff !important;
          text-decoration: none;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .gs-brand .crown {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #b8860b, #d4a017);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(184,134,11,0.45);
        }
        .gs-brand .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .gs-brand .brand-the {
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #d4a017;
          text-transform: uppercase;
        }
        .gs-brand .brand-name {
          font-size: 1.45rem;
          color: #fff;
        }
        .gs-brand .brand-name span { color: #d4a017; }

        /* Nav links */
        .gs-nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82) !important;
          text-decoration: none;
          padding: 0.45rem 0.15rem !important;
          letter-spacing: 0.03em;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .gs-nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #b8860b, #d4a017);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.22s ease;
        }
        .gs-nav-link:hover { color: #d4a017 !important; }
        .gs-nav-link:hover::after,
        .gs-nav-link.active::after { transform: scaleX(1); }
        .gs-nav-link.active { color: #d4a017 !important; }

        /* Separator */
        .gs-sep {
          width: 1px;
          height: 18px;
          background: rgba(184,134,11,0.3);
        }

        /* Dropdown */
        .gs-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 165px;
          background: #1a1209;
          border-radius: 10px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.45);
          overflow: hidden;
          animation: fadeDown 0.18s ease;
          border: 1px solid rgba(184,134,11,0.22);
        }
        @keyframes fadeDown {
          from { opacity:0; transform:translateX(-50%) translateY(-8px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        .gs-dropdown a {
          display: block;
          padding: 0.7rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .gs-dropdown a:hover,
        .gs-dropdown a.active {
          background: rgba(184,134,11,0.14);
          color: #d4a017;
        }
        .gs-dropdown-divider {
          height: 1px;
          background: rgba(184,134,11,0.15);
          margin: 0;
        }
        .gs-chevron {
          font-size: 0.58rem;
          transition: transform 0.2s;
          display: inline-block;
          margin-left: 2px;
          color: #d4a017;
        }
        .gs-chevron.open { transform: rotate(180deg); }

        /* Book Now button */
        .gs-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #b8860b, #d4a017);
          color: #fff !important;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 0.52rem 1.3rem;
          border-radius: 6px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 3px 12px rgba(184,134,11,0.4);
        }
        .gs-book-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(184,134,11,0.5);
          color: #fff !important;
        }

        /* Hamburger */
        .gs-toggler {
          display: none;
          background: none;
          border: 1.5px solid rgba(184,134,11,0.45);
          border-radius: 7px;
          padding: 0.35rem 0.6rem;
          cursor: pointer;
          color: #d4a017;
          font-size: 1.3rem;
          line-height: 1;
          transition: background 0.2s;
        }
        .gs-toggler:hover { background: rgba(212,160,23,0.1); }

        /* Mobile */
        @media (max-width: 991px) {
          .gs-toggler { display: flex; align-items: center; }
          .gs-nav-wrap {
            position: absolute;
            top: 100%;
            left: 0; right: 0;
            background: #120e06;
            border-top: 1px solid rgba(184,134,11,0.2);
            box-shadow: 0 12px 30px rgba(0,0,0,0.5);
            padding: 1rem 1.5rem 1.5rem;
            display: none;
            flex-direction: column;
            gap: 0.25rem;
          }
          .gs-nav-wrap.open { display: flex; }
          .gs-nav-link { padding: 0.65rem 0 !important; font-size: 0.95rem; color: rgba(255,255,255,0.85) !important; }
          .gs-nav-link::after { display: none; }
          .gs-dropdown {
            position: static;
            transform: none;
            box-shadow: none;
            border: 1px solid rgba(184,134,11,0.2);
            border-radius: 8px;
            margin-top: 0.25rem;
            animation: none;
            background: rgba(255,255,255,0.04);
          }
          .gs-dropdown a { color: rgba(255,255,255,0.72); }
          .gs-book-btn { width: 100%; justify-content: center; margin-top: 0.5rem; padding: 0.7rem; }
          .gs-sep { display: none; }
        }
      `}</style>

      <header id="gs-navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.7rem 0', position:'relative' }}>

            {/* Brand */}
            <Link to="/" className="gs-brand">
              <span className="crown">🏰</span>
              <span className="brand-text">
                <span className="brand-the">The</span>
                <span className="brand-name">Grand <span>Hotel</span></span>
              </span>
            </Link>

            {/* Hamburger */}
            <button className="gs-toggler" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <i className={menuOpen ? 'bi-x' : 'bi-list'}></i>
            </button>

            {/* Nav Links */}
            <div className={`gs-nav-wrap ${menuOpen ? 'open' : ''}`}>
              <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', alignItems:'center', gap:'1.75rem', flexWrap:'wrap' }}>

                <li>
                  <Link className={`gs-nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
                </li>

                <li style={{ position:'relative' }} ref={dropdownRef}>
                  <button
                    className={`gs-nav-link ${isActive('/room-list') || isActive('/room-grid') ? 'active' : ''}`}
                    onClick={() => setRoomsOpen(o => !o)}
                  >
                    Rooms
                    <span className={`gs-chevron ${roomsOpen ? 'open' : ''}`}>▼</span>
                  </button>
                  {roomsOpen && (
                    <div className="gs-dropdown">
                      <Link className={isActive('/room-list') ? 'active' : ''} to="/room-list">
                        🗒 Room List
                      </Link>
                      <div className="gs-dropdown-divider" />
                      <Link className={isActive('/room-grid') ? 'active' : ''} to="/room-grid">
                        ⊞ Room Grid
                      </Link>
                    </div>
                  )}
                </li>

                <li>
                  <Link className={`gs-nav-link ${isActive('/room-overview') ? 'active' : ''}`} to="/room-overview">
                    Room Details
                  </Link>
                </li>

                <li className="gs-sep" aria-hidden />

                <li>
                  <Link className="gs-book-btn" to="/booking">
                    <i className="bi-calendar-check"></i> Book Now
                  </Link>
                </li>

              </ul>
            </div>

          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;