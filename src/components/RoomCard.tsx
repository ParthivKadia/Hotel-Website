import { Link } from 'react-router-dom';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  layout?: 'grid' | 'list';
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="d-flex align-items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`bi-star${i < Math.floor(rating) ? '-fill' : i < rating ? '-half' : ''}`} style={{ fontSize: '0.7rem', color: '#f59e0b' }}></i>
    ))}
    <span className="small text-muted ms-1">{rating}</span>
  </div>
);

const roomTypeColors: Record<string, { bg: string; text: string }> = {
  standard: { bg: '#475569', text: '#fff' },
  deluxe: { bg: '#2563eb', text: '#fff' },
  suite: { bg: '#0ea5a4', text: '#fff' },
  presidential: { bg: '#7c3aed', text: '#fff' },
};

const roomTypeLabels: Record<string, string> = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Presidential',
};

const RoomCard: React.FC<RoomCardProps> = ({ room, layout = 'grid' }) => {
  const badge = roomTypeColors[room.roomType];
  const badgeLabel = roomTypeLabels[room.roomType];

  const styleTag = (
    <style>{`
      .nx-room-card {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        height: 100%;
      }
      .nx-room-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(10,22,40,0.12);
        border-color: #bfdbfe;
      }
      .nx-room-img-wrap { position: relative; overflow: hidden; }
      .nx-room-img { transition: transform 0.4s ease; display: block; width: 100%; }
      .nx-room-card:hover .nx-room-img { transform: scale(1.06); }
      .nx-room-badge {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        padding: 0.3rem 0.65rem;
        border-radius: 7px;
        text-transform: uppercase;
      }
      .nx-room-status {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.66rem;
        font-weight: 700;
        padding: 0.3rem 0.65rem;
        border-radius: 7px;
        background: rgba(16,185,129,0.95);
        color: #fff;
      }
      .nx-room-status.booked { background: rgba(220,38,38,0.95); }
      .nx-room-status.maintenance { background: rgba(245,158,11,0.95); color: #1c1c1c; }
      .nx-room-price {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800;
        color: #0a1628;
      }
      .nx-room-title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        color: #0a1628;
      }
      .nx-room-title a { color: inherit; text-decoration: none; }
      .nx-room-title a:hover { color: #2563eb; }
      .nx-btn-card-outline {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 600;
        font-size: 0.82rem;
        border: 1.5px solid #e2e8f0;
        background: #fff;
        color: #0a1628;
        border-radius: 9px;
        padding: 0.55rem 0.8rem;
        transition: all 0.18s;
      }
      .nx-btn-card-outline:hover { border-color: #2563eb; color: #2563eb; }
      .nx-btn-card-fill {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        font-size: 0.82rem;
        border: none;
        background: linear-gradient(135deg, #2563eb, #38bdf8);
        color: #fff;
        border-radius: 9px;
        padding: 0.55rem 0.8rem;
        text-decoration: none;
        transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
        box-shadow: 0 4px 14px rgba(37,99,235,0.3);
      }
      .nx-btn-card-fill:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,99,235,0.4); filter: brightness(1.05); color: #fff; }
      .nx-amenity-chip {
        font-size: 0.72rem;
        background: #f1f5f9;
        color: #475569;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 0.2rem 0.5rem;
      }
    `}</style>
  );

  if (layout === 'list') {
    return (
      <>
        {styleTag}
        <div className="nx-room-card mb-4">
          <div className="row g-0">
            <div className="col-md-4 nx-room-img-wrap">
              <Link to="/room-overview" className="d-block h-100">
                <img
                  src={room.image}
                  alt={room.title}
                  className="nx-room-img h-100"
                  style={{ objectFit: 'cover', minHeight: '210px' }}
                />
              </Link>
              <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
                <span className="nx-room-badge" style={{ background: badge.bg, color: badge.text }}>{badgeLabel}</span>
                {room.isNew && <span className="nx-room-badge" style={{ background: '#10b981', color: '#fff' }}>New</span>}
              </div>
              <div className="position-absolute bottom-0 end-0 m-2">
                <span className={`nx-room-status ${room.status === 'Booked' ? 'booked' : room.status === 'Maintenance' ? 'maintenance' : ''}`}>
                  {room.status}
                </span>
              </div>
            </div>
            <div className="col-md-8">
              <div className="p-4">
                <div className="row mb-2">
                  <div className="col-md-7">
                    <span className="small text-muted"><i className="bi-geo-alt me-1"></i>{room.location}</span>
                    <h3 className="nx-room-title h5 mt-1">
                      <Link to="/room-overview">{room.title}</Link>
                    </h3>
                    <StarRating rating={room.rating} />
                    <span className="small text-muted">({room.reviews} reviews)</span>
                  </div>
                  <div className="col-md-5 text-md-end">
                    <h4 className="nx-room-price mb-0">${room.pricePerNight}</h4>
                    <small className="text-muted">per night</small>
                  </div>
                </div>
                <ul className="list-inline text-body small mb-3 mt-2">
                  <li className="list-inline-item me-3"><i className="bi-door-open text-muted me-1"></i>{room.beds} bed{room.beds > 1 ? 's' : ''}</li>
                  <li className="list-inline-item me-3"><i className="bi-droplet text-muted me-1"></i>{room.baths} bath</li>
                  <li className="list-inline-item me-3"><i className="bi-people text-muted me-1"></i>Up to {room.maxGuests} guests</li>
                  <li className="list-inline-item"><i className="bi-rulers text-muted me-1"></i>{room.sqft} sqft</li>
                </ul>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {room.amenities.slice(0, 4).map(a => (
                    <span key={a} className="nx-amenity-chip">{a}</span>
                  ))}
                  {room.amenities.length > 4 && <span className="nx-amenity-chip">+{room.amenities.length - 4} more</span>}
                </div>
                <div className="d-flex gap-2">
                  <Link to="/room-overview" className="nx-btn-card-outline">Details</Link>
                  <Link to="/booking" className="nx-btn-card-fill">Book now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {styleTag}
      <div className="nx-room-card">
        <div className="nx-room-img-wrap">
          <Link to="/room-overview" className="d-block">
            <img className="nx-room-img" src={room.image} alt={room.title} style={{ height: '210px', objectFit: 'cover' }} />
          </Link>
          <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
            <span className="nx-room-badge" style={{ background: badge.bg, color: badge.text }}>{badgeLabel}</span>
            {room.isNew && <span className="nx-room-badge" style={{ background: '#10b981', color: '#fff' }}>New</span>}
          </div>
          <div className="position-absolute top-0 end-0 m-2">
            <span className={`nx-room-status ${room.status === 'Booked' ? 'booked' : room.status === 'Maintenance' ? 'maintenance' : ''}`}>
              {room.status}
            </span>
          </div>
        </div>

        <div className="p-3">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <span className="small text-muted"><i className="bi-geo-alt me-1"></i>{room.location}</span>
            <div className="text-end">
              <span className="nx-room-price">${room.pricePerNight}</span>
              <span className="small text-muted">/night</span>
            </div>
          </div>

          <h4 className="nx-room-title h6 mb-2">
            <Link to="/room-overview">{room.title}</Link>
          </h4>

          <div className="mb-2">
            <StarRating rating={room.rating} />
          </div>

          <ul className="list-inline text-body small mb-3">
            <li className="list-inline-item me-2"><i className="bi-door-open text-muted me-1"></i>{room.beds} bed</li>
            <li className="list-inline-item me-2"><i className="bi-people text-muted me-1"></i>{room.maxGuests} guests</li>
            <li className="list-inline-item"><i className="bi-rulers text-muted me-1"></i>{room.sqft} sqft</li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/room-overview" className="nx-btn-card-outline flex-fill text-center">Details</Link>
            <Link to="/booking" className="nx-btn-card-fill flex-fill text-center">Book</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;