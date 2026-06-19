import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { featuredRooms } from '../data/rooms';

const typedPhrases = ['business travelers', 'leisure seekers', 'every guest'];

const heroImages = [
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&h=1000&fit=crop',
];

const Home: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState('');
  const [typing, setTyping] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phrase = typedPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayedPhrase.length < phrase.length) {
        timeout = setTimeout(() => setDisplayedPhrase(phrase.slice(0, displayedPhrase.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayedPhrase.length > 0) {
        timeout = setTimeout(() => setDisplayedPhrase(displayedPhrase.slice(0, -1)), 28);
      } else {
        setPhraseIndex((i) => (i + 1) % typedPhrases.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedPhrase, typing, phraseIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.55} }

        .nx-eyebrow {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #38bdf8;
        }
        .nx-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0a1628;
        }
        .nx-accent-text {
          background: linear-gradient(90deg, #2563eb, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Hero */
        .nx-hero {
          position: relative;
          min-height: 680px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #0a1628;
        }
        .nx-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }
        .nx-hero-bg.active {
          opacity: 0.55;
        }
        .nx-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(115deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.78) 45%, rgba(15,31,56,0.55) 100%);
        }
        .nx-hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%);
          top: -200px; right: -150px;
          pointer-events: none;
        }
        .nx-live-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.3);
          border-radius: 999px;
          padding: 0.4rem 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.74rem; font-weight: 600;
          color: #7dd3fc;
        }
        .nx-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #38bdf8;
          animation: pulse 1.6s ease-in-out infinite;
        }

        /* Booking bar */
        .nx-booking-bar {
          background: rgba(255,255,255,0.98);
          border-radius: 18px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          animation: fadeUp 0.8s 0.35s ease both;
        }
        .nx-booking-bar .form-control,
        .nx-booking-bar .form-select {
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #0a1628;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .nx-booking-bar .form-control:focus,
        .nx-booking-bar .form-select:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
          outline: none;
        }
        .nx-booking-bar label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748b;
        }

        /* Stats */
        .nx-stat-item { position: relative; padding: 1.75rem 1rem; }
        .nx-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 25%; bottom: 25%;
          width: 1px;
          background: #e2e8f0;
        }
        .nx-stat-value {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 2.1rem;
          letter-spacing: -0.02em;
          color: #0a1628;
          line-height: 1;
        }
        .nx-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #64748b;
          margin-top: 0.4rem;
        }

        /* Room section */
        .nx-rooms-section {
          background: linear-gradient(180deg, #f8fafc 0%, #f8fafc 24%, #0a1628 24%, #0f2342 100%);
          position: relative;
          overflow: hidden;
        }
        .nx-rooms-section::before {
          content: '';
          position: absolute;
          top: -100px; left: -100px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-rooms-section::after {
          content: '';
          position: absolute;
          top: 40px; right: -120px;
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-rooms-header-text { color: #0a1628 !important; }
        .nx-rooms-header-sub { color: #64748b !important; }
        .nx-amenities-section {
          background: linear-gradient(180deg, #f8fafc 0%, #f8fafc 32%, #0a1628 32%, #0f2342 100%);
          position: relative;
          overflow: hidden;
        }
        .nx-amenities-section::before {
          content: '';
          position: absolute;
          bottom: -120px; left: -100px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-amenities-section::after {
          content: '';
          position: absolute;
          top: 60px; right: -130px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-amenities-heading { color: #0a1628; }
        .nx-amenities-sub { color: #64748b; }

        /* Amenity card */
        .nx-amenity-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.85rem 1.1rem;
          text-align: center;
          transition: background 0.25s, transform 0.25s, border-color 0.25s;
          height: 100%;
        }
        .nx-amenity-card:hover {
          background: rgba(56,189,248,0.08);
          transform: translateY(-6px);
          border-color: rgba(56,189,248,0.35);
        }
        .nx-amenity-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, rgba(37,99,235,0.25), rgba(56,189,248,0.12));
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          border: 1px solid rgba(56,189,248,0.25);
        }

        /* CTA */
        .nx-cta {
          background: linear-gradient(135deg, #0a1628 0%, #0f2747 55%, #0a1628 100%);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .nx-cta::before {
          content: '';
          position: absolute; top: -100px; left: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-cta::after {
          content: '';
          position: absolute; bottom: -100px; right: -100px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-cta-badge {
          display: inline-block;
          background: rgba(56,189,248,0.12);
          border: 1px solid rgba(56,189,248,0.35);
          border-radius: 999px;
          padding: 0.4rem 1.2rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #7dd3fc;
          animation: floatUp 3s ease-in-out infinite;
        }

        /* Buttons */
        .nx-btn-primary {
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
          font-size: 0.88rem; letter-spacing: 0.01em;
          border: none; border-radius: 11px; padding: 0.85rem 2.1rem;
          transition: transform 0.18s, box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 8px 24px rgba(37,99,235,0.35);
        }
        .nx-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.45); filter: brightness(1.06); color: #fff; }

        .nx-btn-outline {
          background: transparent; color: #0a1628;
          border: 1.5px solid #cbd5e1;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
          font-size: 0.88rem;
          border-radius: 11px; padding: 0.85rem 2.1rem;
          transition: all 0.2s;
        }
        .nx-btn-outline:hover { border-color: #38bdf8; background: rgba(56,189,248,0.06); color: #0a1628; }

        .nx-btn-light {
          background: #fff; color: #0a1628;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
          font-size: 0.88rem;
          border: none; border-radius: 11px; padding: 0.85rem 2.1rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.18s, box-shadow 0.2s;
        }
        .nx-btn-light:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.28); color: #0a1628; }

        .nx-btn-outline-light {
          background: transparent; color: #7dd3fc;
          border: 1.5px solid rgba(125,211,252,0.4);
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700;
          font-size: 0.88rem;
          border-radius: 11px; padding: 0.85rem 2.1rem;
          transition: all 0.2s;
        }
        .nx-btn-outline-light:hover { border-color: #7dd3fc; background: rgba(125,211,252,0.1); color: #7dd3fc; }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <div className="nx-hero">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className={`nx-hero-bg ${i === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
        <div className="nx-hero-overlay" />
        <div className="nx-hero-glow" />

        <div className="container position-relative" style={{ zIndex: 3 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="nx-live-badge mb-4" style={{ animation: 'fadeUp 0.8s ease both' }}>
                <span className="nx-live-dot"></span> 47 rooms booked this week
              </span>

              <h1
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(2.3rem,4.6vw,3.6rem)', lineHeight: 1.12, letterSpacing: '-0.02em', animation: 'fadeUp 0.8s 0.12s ease both' }}
                className="text-white mb-4 mt-4"
              >
                The trusted stay for
                <span className="nx-accent-text d-block mt-1">
                  {displayedPhrase}
                  <span style={{ borderRight: '3px solid #38bdf8', marginLeft: '2px', animation: 'blink 0.7s infinite' }}>&nbsp;</span>
                </span>
              </h1>

              <p
                className="mb-5"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '1.05rem', maxWidth: '480px', animation: 'fadeUp 0.8s 0.24s ease both' }}
              >
                Premium rooms, seamless booking, and dependable service — built for travelers who expect more from every stay.
              </p>
            </div>
          </div>

          {/* Booking Bar */}
          <div className="nx-booking-bar p-3 p-md-4 mt-3">
            <div className="row gx-2 align-items-end">
              <div className="col-md-3 mb-2 mb-md-0 text-start">
                <label className="d-block mb-1"><i className="bi-calendar-check me-1" style={{ color: '#2563eb' }}></i>Check in</label>
                <input type="date" className="form-control" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div className="col-md-3 mb-2 mb-md-0 text-start">
                <label className="d-block mb-1"><i className="bi-calendar-x me-1" style={{ color: '#2563eb' }}></i>Check out</label>
                <input type="date" className="form-control" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </div>
              <div className="col-md-3 mb-2 mb-md-0 text-start">
                <label className="d-block mb-1"><i className="bi-people me-1" style={{ color: '#2563eb' }}></i>Guests</label>
                <select className="form-select" value={guests} onChange={e => setGuests(e.target.value)}>
                  {['1', '2', '3', '4', '5', '6+'].map(g => <option key={g} value={g}>{g} Guest{g !== '1' ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <Link to="/room-list" className="btn nx-btn-primary w-100">
                  <i className="bi-search me-2"></i>Search rooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="row justify-content-center text-center g-0">
            {[
              { value: '200+', label: 'Premium rooms', icon: 'bi-door-open' },
              { value: '50K+', label: 'Guests served', icon: 'bi-emoji-smile' },
              { value: '4.9', label: 'Average rating', icon: 'bi-star-fill' },
              { value: '15+', label: 'Years operating', icon: 'bi-shield-check' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="col-6 col-md-3 nx-stat-item">
                <i className={`${icon} d-block mb-2`} style={{ color: '#38bdf8', fontSize: '1.3rem' }}></i>
                <div className="nx-stat-value">{value}</div>
                <div className="nx-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED ROOMS ───────────────────── */}
      <div className="nx-rooms-section py-5 py-lg-6" style={{ paddingTop: '4rem' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-5 gap-3">
            <div>
              <p className="nx-eyebrow mb-2">Our rooms</p>
              <h2 className="nx-section-title nx-rooms-header-text" style={{ fontSize: '2rem' }}>Featured rooms &amp; suites</h2>
            </div>
            <p className="nx-rooms-header-sub mb-0" style={{ fontFamily: "'Inter', sans-serif", maxWidth: '320px' }}>
              Handpicked rooms, professionally photographed, ready to book in seconds.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-5">
            {featuredRooms.map((room) => (
              <div key={room.id} className="col mb-4">
                <RoomCard room={room} layout="grid" />
              </div>
            ))}
          </div>

          <div className="text-center d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/room-grid" className="btn nx-btn-outline-light">View grid</Link>
            <Link to="/room-list" className="btn nx-btn-primary">View all rooms</Link>
          </div>
        </div>
      </div>

      {/* ── AMENITIES ────────────────────────── */}
      <div className="py-5 py-lg-6 nx-amenities-section" style={{ paddingTop: '4rem' }}>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5">
            <p className="nx-eyebrow mb-2">What's included</p>
            <h2 className="nx-amenities-heading" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>Hotel amenities</h2>
            <p className="nx-amenities-sub mt-3 mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, maxWidth: '440px' }}>
              Everything guests need for a comfortable, productive, and relaxing stay.
            </p>
          </div>

          <div className="row row-cols-2 row-cols-md-4 g-4">
            {[
              { icon: 'bi-water', label: 'Swimming pool', desc: 'Heated infinity pool' },
              { icon: 'bi-heart-pulse', label: 'Spa & wellness', desc: 'Full-service spa center' },
              { icon: 'bi-cup-hot', label: 'Fine dining', desc: 'On-site restaurant' },
              { icon: 'bi-wifi', label: 'Free WiFi', desc: 'High-speed throughout' },
              { icon: 'bi-car-front', label: 'Valet parking', desc: 'Complimentary service' },
              { icon: 'bi-bicycle', label: 'Fitness center', desc: '24/7 gym access' },
              { icon: 'bi-building', label: 'Conference halls', desc: 'Modern event spaces' },
              { icon: 'bi-airplane', label: 'Airport transfer', desc: 'Private shuttle' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="col">
                <div className="nx-amenity-card">
                  <div className="nx-amenity-icon">
                    <i className={`${icon} fs-5`} style={{ color: '#7dd3fc' }}></i>
                  </div>
                  <h6 className="text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '0.9rem' }}>{label}</h6>
                  <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────── */}
      <div className="py-5 py-lg-6" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="nx-cta p-5 text-center">
            <span className="nx-cta-badge mb-4 d-inline-block">Limited time offer</span>
            <h2 className="text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', letterSpacing: '-0.02em' }}>
              Ready for your <span className="nx-accent-text">best stay yet</span>?
            </h2>
            <p className="mb-5 mx-auto" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif", fontWeight: 300, maxWidth: '460px' }}>
              Book today and unlock member pricing, early check-in, and a complimentary welcome amenity.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn nx-btn-light px-5">
                <i className="bi-calendar-check me-2"></i>Book your room
              </Link>
              <Link to="/room-list" className="btn nx-btn-outline-light px-5">
                Explore rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;