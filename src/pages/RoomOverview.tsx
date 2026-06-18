import { useState } from 'react';
import { Link } from 'react-router-dom';

type TabId = 'details' | 'amenities' | 'reviews' | 'policies';

const StarRating: React.FC<{ stars: number; max?: number }> = ({ stars, max = 5 }) => (
  <div className="d-flex gap-1">
    {Array.from({ length: max }, (_, i) => (
      <i key={i} className={`bi-star${i < Math.floor(stars) ? '-fill' : i < stars ? '-half' : ''} text-warning`} style={{ fontSize: '0.75rem' }}></i>
    ))}
  </div>
);

const RoomOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [saved, setSaved] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const pricePerNight = 320;
  const taxes = Math.round(nights * pricePerNight * 0.18);
  const total = nights * pricePerNight + taxes;

  const amenities = [
    'Free WiFi', 'Air Conditioning', 'Smart TV', 'Mini Bar', 'Jacuzzi',
    'Private Balcony', 'Lounge Area', '24/7 Room Service', 'Bathrobe & Slippers',
    'In-room Safe', 'Coffee Machine', 'Rainfall Shower',
  ];

  const reviews = [
    { name: 'Priya S.', rating: 5, comment: 'Absolutely stunning suite! The jacuzzi was amazing and staff were incredibly attentive.', date: 'May 2024' },
    { name: 'Rahul M.', rating: 5, comment: 'Best hotel stay of my life. The view from the balcony was breathtaking.', date: 'April 2024' },
    { name: 'Anita K.', rating: 4.5, comment: 'Luxurious room, great amenities. Will definitely come back.', date: 'March 2024' },
  ];

  return (
    <div style={{ paddingTop: '20px' }}>
      {/* Breadcrumb */}
      <div className="container pt-4 pb-3">
        <div className="row align-items-center">
          <div className="col-lg">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/room-list">Rooms</Link></li>
                <li className="breadcrumb-item active">Junior Suite with Jacuzzi</li>
              </ol>
            </nav>
          </div>
          <div className="col-lg-auto mt-2 mt-lg-0">
            <button className={`btn btn-sm ${saved ? 'btn-danger' : 'btn-ghost-secondary'} me-2`} onClick={() => setSaved(!saved)}>
              <i className={`${saved ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>{saved ? 'Saved' : 'Save'}
            </button>
            <button className="btn btn-sm btn-ghost-secondary"><i className="bi-share-fill me-1"></i> Share</button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mb-5">
        <div className="rounded-3 overflow-hidden">
          <div className="row gx-2">
            <div className="col-md-8">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&h=460&fit=crop" alt="Room main" className="img-fluid w-100" style={{ height: '380px', objectFit: 'cover', cursor: 'pointer' }} />
            </div>
            <div className="col-md-4 d-none d-md-block">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=450&h=228&fit=crop" alt="Room 2" className="img-fluid w-100 mb-2" style={{ height: '187px', objectFit: 'cover' }} />
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=450&h=228&fit=crop" alt="Room 3" className="img-fluid w-100" style={{ height: '187px', objectFit: 'cover' }} />
                <div className="position-absolute bottom-0 end-0 m-3">
                  <button className="btn btn-sm btn-light"><i className="bi-images me-1"></i> All Photos</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container pb-7">
        <div className="row">
          {/* Left */}
          <div className="col-lg-8 mb-5 mb-lg-0">
            <div className="row justify-content-between mb-4">
              <div className="col-sm-7">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge text-white" style={{ background: '#b8860b' }}>Suite</span>
                  <span className="badge bg-success">Available</span>
                </div>
                <h1 className="h3 mb-1">Junior Suite with Jacuzzi</h1>
                <span className="d-block text-muted mb-2"><i className="bi-geo-alt me-1"></i>Floor 7, Wing C</span>
                <div className="d-flex align-items-center gap-2">
                  <StarRating stars={4.8} />
                  <span className="fw-semibold">4.8</span>
                  <span className="text-muted small">(136 reviews)</span>
                </div>
              </div>
              <div className="col-sm-5 ps-sm-4 mt-3 mt-sm-0" style={{ borderLeft: '1px solid #e7eaf3' }}>
                <h2 className="mb-0" style={{ color: '#b8860b' }}>$320</h2>
                <span className="d-block text-muted mb-2">per night</span>
                <ul className="list-inline list-separator small text-muted">
                  <li className="list-inline-item"><i className="bi-door-open me-1"></i>2 Beds</li>
                  <li className="list-inline-item"><i className="bi-droplet me-1"></i>2 Baths</li>
                  <li className="list-inline-item"><i className="bi-people me-1"></i>4 Guests</li>
                  <li className="list-inline-item"><i className="bi-rulers me-1"></i>780 sqft</li>
                </ul>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-segment nav-fill mb-5">
              {([
                { id: 'details', label: 'Details' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'policies', label: 'Policies' },
              ] as { id: TabId; label: string }[]).map(({ id, label }) => (
                <li key={id} className="nav-item">
                  <button className={`nav-link ${activeTab === id ? 'active' : ''} border-0`} onClick={() => setActiveTab(id)} style={{ minWidth: '7rem' }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {activeTab === 'details' && (
              <div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <dl className="row">
                      <dt className="col-6 fw-semibold">Room ID:</dt><dd className="col-6 text-muted">RM-0704C</dd>
                      <dt className="col-6 fw-semibold">Room Type:</dt><dd className="col-6 text-muted">Junior Suite</dd>
                      <dt className="col-6 fw-semibold">Floor:</dt><dd className="col-6 text-muted">7th Floor</dd>
                    </dl>
                  </div>
                  <div className="col-md-6">
                    <dl className="row">
                      <dt className="col-6 fw-semibold">Max Guests:</dt><dd className="col-6 text-muted">4 guests</dd>
                      <dt className="col-6 fw-semibold">Bed Type:</dt><dd className="col-6 text-muted">King + Twin</dd>
                      <dt className="col-6 fw-semibold">Size:</dt><dd className="col-6 text-muted">780 sq.ft.</dd>
                    </dl>
                  </div>
                </div>
                <h4 className="mb-3">Description</h4>
                <p className="text-muted">
                  The Junior Suite with Jacuzzi is a spacious haven of luxury situated on the 7th floor, offering
                  panoramic views of the city skyline. The suite features a separate living area, a private jacuzzi,
                  and premium bedding for the ultimate relaxation experience.
                </p>
                <p className="text-muted">
                  Guests enjoy exclusive access to the executive lounge, complimentary minibar, and personalized
                  butler service. The suite has been meticulously designed with locally-inspired décor.
                </p>
                <hr className="my-4" />
                <h4 className="mb-4">Room Ratings</h4>
                <div className="row">
                  {[
                    { label: 'Cleanliness', stars: 5 },
                    { label: 'Comfort', stars: 4.8 },
                    { label: 'Location', stars: 4.5 },
                    { label: 'Facilities', stars: 4.8 },
                    { label: 'Staff Service', stars: 5 },
                    { label: 'Value for Money', stars: 4.5 },
                  ].map(({ label, stars }) => (
                    <div key={label} className="col-sm-6 mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="small fw-semibold">{label}</span>
                        <div className="d-flex align-items-center gap-2">
                          <StarRating stars={stars} />
                          <span className="small text-muted">{stars}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h4 className="mb-4">In-Room Amenities</h4>
                <div className="row row-cols-2 row-cols-md-3">
                  {amenities.map((a) => (
                    <div key={a} className="col mb-3">
                      <div className="d-flex align-items-center">
                        <i className="bi-check-circle-fill text-success me-2 small"></i>
                        <span className="small">{a}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="my-4" />
                <h4 className="mb-4">Hotel Facilities Access</h4>
                <div className="row row-cols-2 row-cols-md-3">
                  {['Infinity Pool', 'Fitness Center', 'Spa & Sauna', 'Business Center', 'Kids Club', 'Fine Dining'].map((f) => (
                    <div key={f} className="col mb-3">
                      <div className="d-flex align-items-center">
                        <i className="bi-star-fill me-2 small" style={{ color: '#b8860b' }}></i>
                        <span className="small">{f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="text-center p-3 rounded-3" style={{ background: '#b8860b', color: '#fff', minWidth: '80px' }}>
                    <div className="fs-2 fw-bold">4.8</div>
                    <div className="small">Excellent</div>
                  </div>
                  <div>
                    <StarRating stars={4.8} />
                    <div className="text-muted small mt-1">Based on 136 verified reviews</div>
                  </div>
                </div>
                <div className="d-grid gap-3">
                  {reviews.map((r) => (
                    <div key={r.name} className="card border p-3">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className="fw-semibold">{r.name}</span>
                          <StarRating stars={r.rating} />
                        </div>
                        <span className="small text-muted">{r.date}</span>
                      </div>
                      <p className="mb-0 text-muted small">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div>
                {[
                  { title: 'Check-in / Check-out', content: 'Check-in from 2:00 PM. Check-out by 12:00 PM. Early check-in and late check-out available on request (charges apply).' },
                  { title: 'Cancellation Policy', content: 'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours are charged one night\'s stay.' },
                  { title: 'Payment Policy', content: 'Full payment required at booking. We accept all major credit cards, debit cards, and UPI.' },
                  { title: 'House Rules', content: 'No smoking in rooms. Pets not allowed. Visitors must be registered at the front desk. Quiet hours 10PM–7AM.' },
                ].map(({ title, content }) => (
                  <div key={title} className="mb-4">
                    <h5 className="mb-2"><i className="bi-info-circle me-2" style={{ color: '#b8860b' }}></i>{title}</h5>
                    <p className="text-muted small">{content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="col-lg-4">
            <div className="card border rounded-3 p-4 sticky-top" style={{ top: '80px' }}>
              <div className="text-center mb-3">
                <h4 className="mb-0" style={{ color: '#b8860b' }}>$320 <span className="fs-6 fw-normal text-muted">/ night</span></h4>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Check In</label>
                <input type="date" className="form-control form-control-sm mb-2" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                <label className="form-label small fw-semibold">Check Out</label>
                <input type="date" className="form-control form-control-sm mb-2" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                <label className="form-label small fw-semibold">Guests</label>
                <select className="form-select form-select-sm mb-2" value={guests} onChange={e => setGuests(e.target.value)}>
                  {['1','2','3','4'].map(g => <option key={g} value={g}>{g} Guest{Number(g) > 1 ? 's' : ''}</option>)}
                </select>
              </div>

              {nights > 0 && (
                <div className="border rounded p-3 mb-3 bg-light">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>${pricePerNight} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${pricePerNight * nights}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Taxes & fees (18%)</span>
                    <span>${taxes}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span style={{ color: '#b8860b' }}>${total}</span>
                  </div>
                </div>
              )}

              <Link to="/booking" className="btn w-100 text-white fw-semibold mb-2" style={{ background: '#b8860b' }}>
                <i className="bi-calendar-check me-2"></i> Reserve Now
              </Link>
              <button className="btn btn-outline-secondary w-100 btn-sm">
                <i className="bi-telephone me-2"></i> Call for Booking
              </button>
              <hr />
              <div className="d-flex justify-content-between small text-muted">
                <div><i className="bi-shield-check text-success me-1"></i> Free cancellation</div>
                <div><i className="bi-eye me-1"></i> 1.2K views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms */}
        <div className="mt-7">
          <h3 className="mb-4">Similar Rooms</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {[
              { img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=480&h=320&fit=crop', title: 'Executive Suite', price: '$450', type: 'Suite' },
              { img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=480&h=320&fit=crop', title: 'Garden Deluxe Room', price: '$185', type: 'Deluxe' },
              { img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=480&h=320&fit=crop', title: 'Honeymoon Suite', price: '$580', type: 'Suite' },
            ].map(({ img, title, price, type }) => (
              <div key={title} className="col mb-4">
                <div className="card shadow-none border h-100">
                  <div className="position-relative">
                    <img src={img} alt={title} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                    <span className="position-absolute top-0 start-0 m-2 badge text-white" style={{ background: '#b8860b' }}>{type}</span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title mb-1">{title}</h6>
                    <div className="fw-semibold mb-2" style={{ color: '#b8860b' }}>{price}/night</div>
                    <Link to="/room-overview" className="btn btn-sm btn-outline-secondary w-100">View Room</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOverview;
