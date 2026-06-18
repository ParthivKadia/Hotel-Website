import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { featuredRooms } from '../data/rooms';

const typedPhrases = ['unforgettable stays', 'luxury experiences', 'perfect comfort'];

const Home: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = typedPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayedPhrase.length < phrase.length) {
        timeout = setTimeout(() => setDisplayedPhrase(phrase.slice(0, displayedPhrase.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setTyping(false), 2500);
      }
    } else {
      if (displayedPhrase.length > 0) {
        timeout = setTimeout(() => setDisplayedPhrase(displayedPhrase.slice(0, -1)), 30);
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .gh-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #d4a017;
        }
        .gh-section-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #1a1209;
        }
        .gh-gold-shimmer {
          background: linear-gradient(90deg,#b8860b 0%,#f0c040 40%,#d4a017 60%,#b8860b 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .gh-divider {
          width: 50px; height: 3px;
          background: linear-gradient(90deg,#b8860b,#d4a017);
          border-radius: 2px;
          margin: 0.85rem auto 0;
        }

        /* Booking bar */
        .gh-booking-bar {
          background: rgba(255,255,255,0.98);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.28);
          animation: fadeUp 0.9s 0.4s ease both;
        }
        .gh-booking-bar .form-control,
        .gh-booking-bar .form-select {
          border: 1.5px solid #e8dcc8;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #1a1209;
          background: #fdfaf5;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .gh-booking-bar .form-control:focus,
        .gh-booking-bar .form-select:focus {
          border-color: #b8860b;
          box-shadow: 0 0 0 3px rgba(184,134,11,0.12);
        }
        .gh-booking-bar label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b5a3e;
        }

        /* Stats */
        .gh-stat-item { position: relative; padding: 1.5rem 1rem; transition: transform 0.2s; }
        .gh-stat-item:hover { transform: translateY(-3px); }
        .gh-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 25%; bottom: 25%;
          width: 1px;
          background: linear-gradient(to bottom,transparent,#e0cfa0,transparent);
        }
        .gh-stat-value {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 2rem;
          color: #b8860b;
          line-height: 1;
        }
        .gh-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: #8a7560;
          letter-spacing: 0.05em;
          margin-top: 0.3rem;
        }

        /* Amenity card */
        .gh-amenity-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(212,160,23,0.18);
          border-radius: 14px;
          padding: 1.75rem 1rem;
          text-align: center;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .gh-amenity-card:hover {
          background: rgba(212,160,23,0.12);
          transform: translateY(-5px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.22);
          border-color: rgba(212,160,23,0.5);
        }
        .gh-amenity-icon {
          width: 54px; height: 54px;
          background: linear-gradient(135deg,rgba(184,134,11,0.2),rgba(212,160,23,0.08));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          border: 1px solid rgba(212,160,23,0.28);
        }

        /* CTA */
        .gh-cta {
          background: linear-gradient(135deg,#0d0a05 0%,#1a1209 50%,#0d0a05 100%);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }
        .gh-cta::before {
          content: '';
          position: absolute; top:-80px; left:-80px;
          width:300px; height:300px;
          background: radial-gradient(circle,rgba(212,160,23,0.14) 0%,transparent 70%);
          pointer-events: none;
        }
        .gh-cta::after {
          content: '';
          position: absolute; bottom:-80px; right:-80px;
          width:300px; height:300px;
          background: radial-gradient(circle,rgba(184,134,11,0.10) 0%,transparent 70%);
          pointer-events: none;
        }
        .gh-cta-badge {
          display: inline-block;
          background: rgba(212,160,23,0.12);
          border: 1px solid rgba(212,160,23,0.35);
          border-radius: 999px;
          padding: 0.35rem 1.1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #d4a017;
          animation: floatUp 3s ease-in-out infinite;
        }

        /* Buttons */
        .gh-btn-gold {
          background: linear-gradient(135deg,#b8860b,#d4a017);
          color: #fff;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 0.85rem; letter-spacing: 0.06em;
          border: none; border-radius: 8px; padding: 0.75rem 2rem;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 15px rgba(184,134,11,0.35);
        }
        .gh-btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(184,134,11,0.45); opacity:0.92; color:#fff; }

        .gh-btn-outline-gold {
          background: transparent; color: #b8860b;
          border: 1.5px solid #b8860b;
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 0.85rem; letter-spacing: 0.06em;
          border-radius: 8px; padding: 0.75rem 2rem;
          transition: all 0.2s;
        }
        .gh-btn-outline-gold:hover { background:#b8860b; color:#fff; transform:translateY(-2px); }

        .gh-btn-light {
          background: #fff; color: #b8860b;
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 0.85rem; letter-spacing: 0.06em;
          border: none; border-radius: 8px; padding: 0.75rem 2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gh-btn-light:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.22); color:#b8860b; }

        .gh-btn-outline-light {
          background: transparent; color: #d4a017;
          border: 1.5px solid rgba(212,160,23,0.5);
          font-family: 'Inter', sans-serif; font-weight: 600;
          font-size: 0.85rem; letter-spacing: 0.06em;
          border-radius: 8px; padding: 0.75rem 2rem;
          transition: all 0.2s;
        }
        .gh-btn-outline-light:hover { border-color:#d4a017; background:rgba(212,160,23,0.1); color:#d4a017; }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <div className="position-relative overflow-hidden" style={{ minHeight: '640px', display: 'flex', alignItems: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&h=900&fit=crop"
          alt="The Grand Hotel"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.42) 60%,rgba(20,12,0,0.58) 100%)', zIndex:1 }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'200px', background:'linear-gradient(to top,rgba(0,0,0,0.45),transparent)', zIndex:2 }} />

        <div className="container position-relative" style={{ zIndex:3 }}>
          <div className="row justify-content-center text-center text-white">
            <div className="col-lg-8">
              <p className="gh-eyebrow mb-3" style={{ animation:'fadeUp 0.9s ease both' }}>✦ Welcome to The Grand Hotel ✦</p>

              <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:'clamp(2.2rem,5vw,3.8rem)', lineHeight:1.15, animation:'fadeUp 0.9s 0.15s ease both' }} className="text-white mb-3">
                Where Every Stay Becomes
                <span className="gh-gold-shimmer d-block mt-1">
                  {displayedPhrase}
                  <span style={{ borderRight:'3px solid #d4a017', marginLeft:'2px', animation:'blink 0.7s infinite' }}>&nbsp;</span>
                </span>
              </h1>

              <p className="lead mb-5" style={{ color:'rgba(255,255,255,0.75)', fontFamily:"'Inter',sans-serif", fontWeight:300, maxWidth:'520px', margin:'0 auto 2.5rem', animation:'fadeUp 0.9s 0.3s ease both' }}>
                Discover world-class rooms, suites, and amenities crafted for your ultimate comfort and indulgence.
              </p>

              {/* Booking Bar */}
              <div className="gh-booking-bar p-3 p-md-4">
                <div className="row gx-2 align-items-end">
                  <div className="col-md-3 mb-2 mb-md-0 text-start">
                    <label className="d-block mb-1"><i className="bi-calendar-check me-1" style={{ color:'#b8860b' }}></i>Check In</label>
                    <input type="date" className="form-control" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                  </div>
                  <div className="col-md-3 mb-2 mb-md-0 text-start">
                    <label className="d-block mb-1"><i className="bi-calendar-x me-1" style={{ color:'#b8860b' }}></i>Check Out</label>
                    <input type="date" className="form-control" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                  </div>
                  <div className="col-md-3 mb-2 mb-md-0 text-start">
                    <label className="d-block mb-1"><i className="bi-people me-1" style={{ color:'#b8860b' }}></i>Guests</label>
                    <select className="form-select" value={guests} onChange={e => setGuests(e.target.value)}>
                      {['1','2','3','4','5','6+'].map(g => <option key={g} value={g}>{g} Guest{g !== '1' ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <Link to="/room-list" className="btn gh-btn-gold btn-lg w-100">
                      <i className="bi-search me-2"></i>Search Rooms
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────── */}
      <div style={{ background:'#fff', borderBottom:'1px solid #f0e8d5' }}>
        <div className="container">
          <div className="row justify-content-center text-center g-0">
            {[
              { value:'200+', label:'Luxury Rooms',       icon:'bi-door-open' },
              { value:'50K+', label:'Happy Guests',       icon:'bi-emoji-smile' },
              { value:'4.9★', label:'Average Rating',     icon:'bi-star-fill' },
              { value:'15+',  label:'Years of Excellence',icon:'bi-award' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="col-6 col-md-3 gh-stat-item">
                <i className={`${icon} d-block mb-2`} style={{ color:'#d4a017', fontSize:'1.4rem' }}></i>
                <div className="gh-stat-value">{value}</div>
                <div className="gh-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED ROOMS ───────────────────── */}
      <div style={{ background:'linear-gradient(180deg,#fdfaf5 0%,#f5efe0 100%)' }} className="py-5 py-lg-6">
        <div className="container">
          <div className="text-center mb-5">
            <p className="gh-eyebrow mb-2">Our Rooms</p>
            <h2 className="gh-section-title" style={{ fontSize:'2.2rem' }}>Featured Rooms & Suites</h2>
            <div className="gh-divider"></div>
            <p className="text-muted mt-3" style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>Handpicked rooms for an extraordinary experience</p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-5">
            {featuredRooms.map((room) => (
              <div key={room.id} className="col mb-4">
                <RoomCard room={room} layout="grid" />
              </div>
            ))}
          </div>

          <div className="text-center d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/room-grid" className="btn gh-btn-outline-gold btn-lg">View Grid</Link>
            <Link to="/room-list" className="btn gh-btn-gold btn-lg">View All Rooms</Link>
          </div>
        </div>
      </div>

      {/* ── AMENITIES ────────────────────────── */}
      <div className="py-5 py-lg-6" style={{ background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p className="gh-eyebrow mb-2">World Class</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'2.2rem' }} className="text-white">Hotel Amenities</h2>
            <div className="gh-divider"></div>
            <p className="mt-3" style={{ color:'rgba(255,255,255,0.5)', fontFamily:"'Inter',sans-serif", fontWeight:300 }}>Everything you need for a perfect stay</p>
          </div>

          <div className="row row-cols-2 row-cols-md-4 g-4">
            {[
              { icon:'bi-water',       label:'Swimming Pool',   desc:'Heated infinity pool' },
              { icon:'bi-heart-pulse', label:'Spa & Wellness',  desc:'Full-service spa center' },
              { icon:'bi-cup-hot',     label:'Fine Dining',     desc:'5-star restaurant' },
              { icon:'bi-wifi',        label:'Free WiFi',       desc:'High-speed throughout' },
              { icon:'bi-car-front',   label:'Valet Parking',   desc:'Complimentary service' },
              { icon:'bi-dumbbell',    label:'Fitness Center',  desc:'24/7 gym access' },
              { icon:'bi-building',    label:'Conference Halls',desc:'Modern event spaces' },
              { icon:'bi-airplane',    label:'Airport Transfer',desc:'Private shuttle' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="col">
                <div className="gh-amenity-card">
                  <div className="gh-amenity-icon">
                    <i className={`${icon} fs-4`} style={{ color:'#d4a017' }}></i>
                  </div>
                  <h6 className="text-white mb-1" style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:'0.9rem' }}>{label}</h6>
                  <p className="small mb-0" style={{ color:'rgba(255,255,255,0.45)', fontFamily:"'Inter',sans-serif", fontWeight:300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────── */}
      <div className="py-5 py-lg-6" style={{ background:'#fdfaf5' }}>
        <div className="container">
          <div className="gh-cta p-5 text-center">
            <span className="gh-cta-badge mb-4 d-inline-block">Limited Offer</span>
            <h2 className="text-white mb-3" style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'clamp(1.6rem,3.5vw,2.5rem)' }}>
              Ready for an <span className="gh-gold-shimmer">Unforgettable</span> Stay?
            </h2>
            <p className="mb-5 mx-auto" style={{ color:'rgba(255,255,255,0.6)', fontFamily:"'Inter',sans-serif", fontWeight:300, maxWidth:'480px' }}>
              Book your room today and enjoy exclusive member discounts, early check-in, and complimentary welcome amenities.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn gh-btn-light btn-lg px-5">
                🏨 Book Your Room
              </Link>
              <Link to="/room-list" className="btn gh-btn-outline-light btn-lg px-5">
                Explore Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;