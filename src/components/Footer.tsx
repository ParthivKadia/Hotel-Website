import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500&display=swap');

        .nx-footer {
          background: linear-gradient(180deg, #0a1628 0%, #071120 100%);
          color: rgba(255,255,255,0.55);
          padding-top: 4rem;
          padding-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }
        .nx-footer::before {
          content: '';
          position: absolute;
          top: -160px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 320px;
          background: radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .nx-footer-brand {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: #fff !important;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .nx-footer-mark {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(37,99,235,0.4);
        }
        .nx-footer-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.1rem;
        }
        .nx-footer-link {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.18s, padding-left 0.18s;
          display: inline-block;
        }
        .nx-footer-link:hover { color: #7dd3fc; padding-left: 3px; }
        .nx-footer-social {
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .nx-footer-social:hover {
          background: rgba(56,189,248,0.12);
          border-color: rgba(56,189,248,0.4);
          color: #7dd3fc;
          transform: translateY(-2px);
        }
        .nx-footer-divider { border-top: 1px solid rgba(255,255,255,0.08); }
        .nx-footer-bottom-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          font-size: 0.82rem;
          transition: color 0.18s;
        }
        .nx-footer-bottom-link:hover { color: #7dd3fc; }
        .nx-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.65rem;
        }
        .nx-footer-contact-item i { color: #38bdf8; margin-top: 0.15rem; }
      `}</style>

      <footer className="nx-footer">
        <div className="container position-relative">
          <div className="row mb-5">
            <div className="col-lg-3 mb-5 mb-lg-0">
              <Link to="/" className="nx-footer-brand mb-3">
                <span className="nx-footer-mark"><i className="bi-building" style={{ color: '#fff', fontSize: '1rem' }}></i></span>
                Nexus Hotels
              </Link>
              <p className="small mt-3" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '230px' }}>
                Premium rooms, seamless booking, and dependable service for every kind of traveler.
              </p>
              <div className="d-flex gap-2 mt-4">
                {[
                  { icon: 'bi-facebook', label: 'Facebook' },
                  { icon: 'bi-instagram', label: 'Instagram' },
                  { icon: 'bi-twitter-x', label: 'Twitter' },
                  { icon: 'bi-linkedin', label: 'LinkedIn' },
                ].map(({ icon, label }) => (
                  <a key={icon} href="#" className="nx-footer-social" aria-label={label}>
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-sm-4 col-lg-2 offset-lg-1 mb-5 mb-sm-0">
              <h5 className="nx-footer-heading">Rooms</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {[
                  { label: 'Standard rooms', to: '/room-list' },
                  { label: 'Deluxe rooms', to: '/room-list' },
                  { label: 'Suites', to: '/room-list' },
                  { label: 'Presidential suite', to: '/room-overview' },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="nx-footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-sm-4 col-lg-2 mb-5 mb-sm-0">
              <h5 className="nx-footer-heading">Services</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {['Restaurant & dining', 'Spa & wellness', 'Concierge', 'Airport transfer', 'Event halls'].map((item) => (
                  <li key={item}>
                    <a href="#" className="nx-footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-sm-4 col-lg-3">
              <h5 className="nx-footer-heading">Contact</h5>
              <div className="nx-footer-contact-item">
                <i className="bi-geo-alt"></i>
                <span>123 Business Avenue, Mumbai, India</span>
              </div>
              <div className="nx-footer-contact-item">
                <i className="bi-telephone"></i>
                <span>+91 98765 43210</span>
              </div>
              <div className="nx-footer-contact-item">
                <i className="bi-envelope"></i>
                <span>info@nexushotels.com</span>
              </div>
              <div className="nx-footer-contact-item">
                <i className="bi-clock"></i>
                <span>24/7 front desk &amp; support</span>
              </div>
            </div>
          </div>

          <div className="nx-footer-divider mb-4"></div>

          <div className="row align-items-center">
            <div className="col-sm">
              <ul className="list-inline mb-0">
                {['Privacy policy', 'Terms of service', 'Cancellation policy'].map((item) => (
                  <li key={item} className="list-inline-item me-4">
                    <a href="#" className="nx-footer-bottom-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-sm-auto mt-3 mt-sm-0">
              <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
                &copy; Nexus Hotels {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;