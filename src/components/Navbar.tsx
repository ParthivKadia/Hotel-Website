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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        #nx-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #0a1628;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: box-shadow 0.3s, background 0.3s, padding 0.25s;
          font-family: 'Inter', sans-serif;
        }
        #nx-navbar.scrolled {
          background: rgba(8,18,36,0.85);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
          border-bottom: 1px solid rgba(56,189,248,0.15);
        }

        .nx-brand {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff !important;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .nx-brand .mark {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(37,99,235,0.45);
          position: relative;
          overflow: hidden;
        }
        .nx-brand .mark::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent 60%);
        }
        .nx-brand .mark i {
          font-size: 1.05rem;
          color: #fff;
          position: relative;
          z-index: 1;
        }
        .nx-brand .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.05;
        }
        .nx-brand .brand-tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #38bdf8;
          text-transform: uppercase;
        }
        .nx-brand .brand-name {
          font-size: 1.32rem;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .nx-nav-link {
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.72) !important;
          text-decoration: none;
          padding: 0.5rem 0.85rem !important;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .nx-nav-link:hover { color: #fff !important; background: rgba(255,255,255,0.06); }
        .nx-nav-link.active { color: #38bdf8 !important; background: rgba(56,189,248,0.1); }

        .nx-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 190px;
          background: #0f1f38;
          border-radius: 12px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.45);
          overflow: hidden;
          animation: nxFade 0.16s ease;
          border: 1px solid rgba(56,189,248,0.18);
          padding: 0.4rem;
        }
        @keyframes nxFade {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nx-dropdown a {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 0.8rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .nx-dropdown a:hover,
        .nx-dropdown a.active {
          background: rgba(56,189,248,0.12);
          color: #38bdf8;
        }
        .nx-chevron {
          font-size: 0.6rem;
          transition: transform 0.2s;
          display: inline-block;
        }
        .nx-chevron.open { transform: rotate(180deg); }

        .nx-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          color: #fff !important;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.6rem 1.4rem;
          border-radius: 9px;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 4px 18px rgba(37,99,235,0.4);
        }
        .nx-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(37,99,235,0.55);
          filter: brightness(1.08);
          color: #fff !important;
        }

        .nx-toggler {
          display: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.4rem 0.65rem;
          cursor: pointer;
          color: #fff;
          font-size: 1.3rem;
          line-height: 1;
        }

        @media (max-width: 991px) {
          .nx-toggler { display: flex; align-items: center; }
          .nx-nav-wrap {
            position: absolute;
            top: 100%;
            left: 0; right: 0;
            background: #0a1628;
            border-top: 1px solid rgba(255,255,255,0.06);
            box-shadow: 0 16px 36px rgba(0,0,0,0.5);
            padding: 1rem 1.25rem 1.5rem;
            display: none;
            flex-direction: column;
            gap: 0.3rem;
          }
          .nx-nav-wrap.open { display: flex; }
          .nx-nav-link { width: 100%; padding: 0.75rem 0.85rem !important; font-size: 0.95rem; }
          .nx-dropdown { position: static; box-shadow: none; margin-top: 0.25rem; animation: none; }
          .nx-book-btn { width: 100%; justify-content: center; margin-top: 0.5rem; padding: 0.8rem; }
        }
      `}</style>

      <header id="nx-navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', position: 'relative' }}>

            <Link to="/" className="nx-brand">
              <span className="mark"><i className="bi-building"></i></span>
              <span className="brand-text">
                <span className="brand-tag">Hotels &amp; Resorts</span>
                <span className="brand-name">Nexus</span>
              </span>
            </Link>

            <button className="nx-toggler" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              <i className={menuOpen ? 'bi-x' : 'bi-list'}></i>
            </button>

            <div className={`nx-nav-wrap ${menuOpen ? 'open' : ''}`}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>

                <li>
                  <Link className={`nx-nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
                </li>

                <li style={{ position: 'relative' }} ref={dropdownRef}>
                  <button
                    className={`nx-nav-link ${isActive('/room-list') || isActive('/room-grid') ? 'active' : ''}`}
                    onClick={() => setRoomsOpen(o => !o)}
                  >
                    Rooms
                    <span className={`nx-chevron ${roomsOpen ? 'open' : ''}`}><i className="bi-chevron-down"></i></span>
                  </button>
                  {roomsOpen && (
                    <div className="nx-dropdown">
                      <Link className={isActive('/room-list') ? 'active' : ''} to="/room-list">
                        <i className="bi-list-ul"></i> Room List
                      </Link>
                      <Link className={isActive('/room-grid') ? 'active' : ''} to="/room-grid">
                        <i className="bi-grid-3x3-gap"></i> Room Grid
                      </Link>
                    </div>
                  )}
                </li>

                <li>
                  <Link className={`nx-nav-link ${isActive('/room-overview') ? 'active' : ''}`} to="/room-overview">
                    Room Details
                  </Link>
                </li>

                <li>
                  {/* <Link className={`nx-nav-link ${isActive('/admin') ? 'active' : ''}`} to="/admin">
                    Admin
                  </Link> */}
                </li>

                <li style={{ marginLeft: '0.5rem' }}>
                  <Link className="nx-book-btn" to="/booking">
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