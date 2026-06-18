import { Link } from 'react-router-dom';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  layout?: 'grid' | 'list';
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="d-flex align-items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`bi-star${i < Math.floor(rating) ? '-fill' : i < rating ? '-half' : ''} text-warning`} style={{ fontSize: '0.7rem' }}></i>
    ))}
    <span className="small text-muted ms-1">{rating}</span>
  </div>
);

const roomTypeColors: Record<string, string> = {
  standard: '#6c757d',
  deluxe: '#0d6efd',
  suite: '#b8860b',
  presidential: '#6f42c1',
};

const roomTypeLabels: Record<string, string> = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Presidential',
};

const RoomCard: React.FC<RoomCardProps> = ({ room, layout = 'grid' }) => {
  const badgeColor = roomTypeColors[room.roomType];
  const badgeLabel = roomTypeLabels[room.roomType];

  if (layout === 'list') {
    return (
      <div className="card card-flush mb-4">
        <div className="row g-0">
          <div className="col-md-4 position-relative">
            <Link to="/room-overview" className="d-block h-100">
              <img
                src={room.image}
                alt={room.title}
                className="img-fluid rounded-start h-100 w-100"
                style={{ objectFit: 'cover', minHeight: '200px' }}
              />
            </Link>
            <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
              <span className="badge text-white" style={{ background: badgeColor }}>{badgeLabel}</span>
              {room.isNew && <span className="badge bg-success">New</span>}
            </div>
            <div className="position-absolute bottom-0 end-0 m-2">
              <span className={`badge ${room.status === 'Available' ? 'bg-success' : room.status === 'Booked' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                {room.status}
              </span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-md-7">
                  <span className="card-subtitle text-muted small"><i className="bi-geo-alt me-1"></i>{room.location}</span>
                  <h3 className="card-title h5 mt-1">
                    <Link className="text-dark text-decoration-none" to="/room-overview">{room.title}</Link>
                  </h3>
                  <StarRating rating={room.rating} />
                  <span className="small text-muted">({room.reviews} reviews)</span>
                </div>
                <div className="col-md-5 text-md-end">
                  <h4 className="text-warning mb-0" style={{ color: '#b8860b !important' }}>
                    <span style={{ color: '#b8860b' }}>${room.pricePerNight}</span>
                  </h4>
                  <small className="text-muted">per night</small>
                </div>
              </div>
              <ul className="list-inline list-separator text-body small mb-3">
                <li className="list-inline-item"><i className="bi-door-open text-muted me-1"></i>{room.beds} bed{room.beds > 1 ? 's' : ''}</li>
                <li className="list-inline-item"><i className="bi-droplet text-muted me-1"></i>{room.baths} bath</li>
                <li className="list-inline-item"><i className="bi-people text-muted me-1"></i>Up to {room.maxGuests} guests</li>
                <li className="list-inline-item"><i className="bi-rulers text-muted me-1"></i>{room.sqft} sqft</li>
              </ul>
              <div className="d-flex flex-wrap gap-1 mb-3">
                {room.amenities.slice(0, 4).map(a => (
                  <span key={a} className="badge bg-light text-dark border small">{a}</span>
                ))}
                {room.amenities.length > 4 && <span className="badge bg-light text-muted border small">+{room.amenities.length - 4} more</span>}
              </div>
              <div className="d-flex gap-2">
                <Link to="/room-overview" className="btn btn-sm btn-outline-primary">View Details</Link>
                <Link to="/booking" className="btn btn-sm text-white" style={{ background: '#b8860b' }}>Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-flush shadow-none h-100" style={{ border: '1px solid #e9ecef' }}>
      <div className="position-relative">
        <Link to="/room-overview" className="d-block">
          <img className="card-img-top" src={room.image} alt={room.title} style={{ height: '210px', objectFit: 'cover' }} />
        </Link>
        <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
          <span className="badge text-white" style={{ background: badgeColor }}>{badgeLabel}</span>
          {room.isNew && <span className="badge bg-success">New</span>}
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className={`badge ${room.status === 'Available' ? 'bg-success' : room.status === 'Booked' ? 'bg-danger' : 'bg-warning text-dark'}`}>
            {room.status}
          </span>
        </div>
        <div className="position-absolute bottom-0 end-0 m-2">
          <span className="btn btn-light btn-xs btn-icon btn-sm">
            <i className="bi-images"></i>
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <span className="small text-muted"><i className="bi-geo-alt me-1"></i>{room.location}</span>
          <div className="text-end">
            <span className="fw-bold" style={{ color: '#b8860b' }}>${room.pricePerNight}</span>
            <span className="small text-muted">/night</span>
          </div>
        </div>

        <h4 className="card-title h6 mb-2">
          <Link className="text-dark text-decoration-none" to="/room-overview">{room.title}</Link>
        </h4>

        <div className="mb-2">
          <StarRating rating={room.rating} />
        </div>

        <ul className="list-inline list-separator text-body small mb-3">
          <li className="list-inline-item"><i className="bi-door-open text-muted me-1"></i>{room.beds} bed</li>
          <li className="list-inline-item"><i className="bi-people text-muted me-1"></i>{room.maxGuests} guests</li>
          <li className="list-inline-item"><i className="bi-rulers text-muted me-1"></i>{room.sqft} sqft</li>
        </ul>

        <div className="d-flex gap-2">
          <Link to="/room-overview" className="btn btn-sm btn-outline-secondary flex-fill">Details</Link>
          <Link to="/booking" className="btn btn-sm flex-fill text-white" style={{ background: '#b8860b' }}>Book</Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
