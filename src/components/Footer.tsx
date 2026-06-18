import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark" style={{ color: '#adb5bd', paddingTop: '3rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="row mb-7">
          <div className="col-lg-3 mb-5 mb-lg-0">
            <Link to="/" className="d-inline-block mb-3" style={{ textDecoration: 'none' }}>
              <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fff' }}>🏨 Grand Stay Hotel</span>
            </Link>
            <p className="small" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Experience luxury and comfort in every stay. Your perfect getaway awaits.
            </p>
            <div className="d-flex gap-2 mt-3">
              {['bi-facebook', 'bi-instagram', 'bi-twitter', 'bi-youtube'].map((icon) => (
                <a key={icon} href="#" className="btn btn-sm" style={{ color: '#adb5bd', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-sm-4 col-lg-2 offset-lg-1 mb-5 mb-sm-0">
            <h5 className="text-white mb-3 small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Rooms</h5>
            <ul className="list-unstyled mb-0">
              {[
                { label: 'Standard Rooms', to: '/room-list' },
                { label: 'Deluxe Rooms', to: '/room-list' },
                { label: 'Suites', to: '/room-list' },
                { label: 'Presidential Suite', to: '/room-overview' },
              ].map(({ label, to }) => (
                <li key={label} className="mb-2">
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-sm-4 col-lg-2 mb-5 mb-sm-0">
            <h5 className="text-white mb-3 small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Services</h5>
            <ul className="list-unstyled mb-0">
              {['Restaurant & Dining', 'Spa & Wellness', 'Concierge', 'Airport Transfer', 'Event Halls'].map((item) => (
                <li key={item} className="mb-2">
                  <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-sm-4 col-lg-2">
            <h5 className="text-white mb-3 small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>Contact</h5>
            <ul className="list-unstyled mb-0 small" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <li className="mb-2"><i className="bi-geo-alt me-2"></i>123 Luxury Ave, Mumbai</li>
              <li className="mb-2"><i className="bi-telephone me-2"></i>+91 98765 43210</li>
              <li className="mb-2"><i className="bi-envelope me-2"></i>info@grandstay.com</li>
              <li className="mb-2"><i className="bi-clock me-2"></i>24/7 Reception</li>
            </ul>
          </div>
        </div>

        <div className="border-top mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>

        <div className="row align-items-center">
          <div className="col-sm">
            <ul className="list-inline mb-0">
              {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((item) => (
                <li key={item} className="list-inline-item me-3">
                  <a href="#" className="small" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-auto mt-3 mt-sm-0">
            <p className="small mb-0" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &copy; Grand Stay Hotel. 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
