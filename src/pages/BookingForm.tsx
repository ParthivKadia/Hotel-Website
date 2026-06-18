import { useState } from 'react';
import { Link } from 'react-router-dom';

type RoomTypeOption = 'standard' | 'deluxe' | 'suite' | 'presidential';

interface FormData {
  guestName: string;
  email: string;
  phone: string;
  nationality: string;
  idType: string;
  idNumber: string;
  roomType: RoomTypeOption | '';
  checkIn: string;
  checkOut: string;
  guests: string;
  mealPlan: string;
  specialRequests: string;
  paymentMethod: 'card' | 'upi' | 'cash';
}

const roomTypeOptions = [
  { id: 'standard' as RoomTypeOption, label: 'Standard', emoji: '🛏️', price: 100 },
  { id: 'deluxe' as RoomTypeOption, label: 'Deluxe', emoji: '🌟', price: 200 },
  { id: 'suite' as RoomTypeOption, label: 'Suite', emoji: '👑', price: 400 },
  { id: 'presidential' as RoomTypeOption, label: 'Presidential', emoji: '💎', price: 1200 },
];

const BookingForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    guestName: '', email: '', phone: '', nationality: '', idType: '', idNumber: '',
    roomType: '', checkIn: '', checkOut: '', guests: '2', mealPlan: 'none',
    specialRequests: '', paymentMethod: 'card',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.round((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const selectedRoom = roomTypeOptions.find(r => r.id === form.roomType);
  const roomCost = nights * (selectedRoom?.price || 0);
  const mealCost = form.mealPlan === 'breakfast' ? nights * 20 : form.mealPlan === 'all-inclusive' ? nights * 80 : 0;
  const taxes = Math.round((roomCost + mealCost) * 0.18);
  const total = roomCost + mealCost + taxes;

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.guestName.trim()) e.guestName = 'Guest name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.roomType) e.roomType = 'Please select a room type';
    if (!form.checkIn) e.checkIn = 'Check-in date is required';
    if (!form.checkOut) e.checkOut = 'Check-out date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-7" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="mb-4" style={{ fontSize: '4rem' }}>🎉</div>
          <h2 className="mb-3">Booking Confirmed!</h2>
          <p className="text-muted mb-2">Thank you <strong>{form.guestName}</strong>! Your reservation has been received.</p>
          <p className="text-muted mb-4">A confirmation has been sent to <strong>{form.email}</strong>. Our team will contact you shortly.</p>
          <div className="card p-4 d-inline-block text-start mb-4 border" style={{ minWidth: '300px' }}>
            <p className="small mb-1"><strong>Room:</strong> {selectedRoom?.label} Room</p>
            <p className="small mb-1"><strong>Check-in:</strong> {form.checkIn}</p>
            <p className="small mb-1"><strong>Check-out:</strong> {form.checkOut}</p>
            <p className="small mb-1"><strong>Nights:</strong> {nights}</p>
            <p className="small mb-0"><strong>Total:</strong> <span style={{ color: '#b8860b' }}>${total}</span></p>
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-outline-secondary" onClick={() => { setSubmitted(false); setForm({ guestName: '', email: '', phone: '', nationality: '', idType: '', idNumber: '', roomType: '', checkIn: '', checkOut: '', guests: '2', mealPlan: 'none', specialRequests: '', paymentMethod: 'card' }); }}>
              New Booking
            </button>
            <Link to="/" className="btn text-white" style={{ background: '#b8860b' }}>Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 py-lg-7">
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div className="text-center mb-5">
          <p className="small fw-semibold text-uppercase mb-1" style={{ color: '#b8860b', letterSpacing: '2px' }}>Grand Stay Hotel</p>
          <h1 className="h2">Room Booking Form</h1>
          <p className="text-muted">Fill in your details to reserve your perfect room.</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Guest Info */}
              <h4 className="mb-4 pb-2 border-bottom">Guest Information</h4>
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Full Name <span className="text-danger">*</span></label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-person-fill"></i></span>
                    <input type="text" className={`form-control form-control-lg ${errors.guestName ? 'is-invalid' : ''}`} placeholder="Your full name" value={form.guestName} onChange={set('guestName')} />
                    {errors.guestName && <div className="invalid-feedback">{errors.guestName}</div>}
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-envelope-fill"></i></span>
                    <input type="email" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`} placeholder="your@email.com" value={form.email} onChange={set('email')} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Phone <span className="text-danger">*</span></label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-telephone-fill"></i></span>
                    <input type="tel" className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`} placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Nationality</label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-globe2"></i></span>
                    <input type="text" className="form-control form-control-lg" placeholder="e.g. Indian" value={form.nationality} onChange={set('nationality')} />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">ID Type</label>
                  <select className="form-select form-select-lg" value={form.idType} onChange={set('idType')}>
                    <option value="">Select ID type</option>
                    <option value="passport">Passport</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="driving">Driving License</option>
                    <option value="voter">Voter ID</option>
                  </select>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">ID Number</label>
                  <input type="text" className="form-control form-control-lg" placeholder="ID/Passport number" value={form.idNumber} onChange={set('idNumber')} />
                </div>
              </div>

              {/* Room Type */}
              <h4 className="mb-4 pb-2 border-bottom mt-3">Select Room Type <span className="text-danger">*</span></h4>
              {errors.roomType && <div className="alert alert-danger py-2 mb-3 small">{errors.roomType}</div>}
              <div className="row gx-3 mb-4">
                {roomTypeOptions.map(({ id, label, emoji, price }) => (
                  <div key={id} className="col-6 col-md-3 mb-3">
                    <div
                      className={`card text-center p-3 h-100 ${form.roomType === id ? 'border-warning bg-warning bg-opacity-10' : 'border'}`}
                      onClick={() => setForm(prev => ({ ...prev, roomType: id }))}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <div style={{ fontSize: '2rem' }}>{emoji}</div>
                      <span className="small fw-semibold mt-1">{label}</span>
                      <span className="small text-muted">${price}/night</span>
                      {form.roomType === id && <i className="bi-check-circle-fill mt-1" style={{ color: '#b8860b' }}></i>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Dates */}
              <h4 className="mb-4 pb-2 border-bottom mt-3">Stay Details</h4>
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Check-in Date <span className="text-danger">*</span></label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-calendar-check"></i></span>
                    <input type="date" className={`form-control form-control-lg ${errors.checkIn ? 'is-invalid' : ''}`} value={form.checkIn} onChange={set('checkIn')} />
                    {errors.checkIn && <div className="invalid-feedback">{errors.checkIn}</div>}
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Check-out Date <span className="text-danger">*</span></label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-calendar-x"></i></span>
                    <input type="date" className={`form-control form-control-lg ${errors.checkOut ? 'is-invalid' : ''}`} value={form.checkOut} onChange={set('checkOut')} />
                    {errors.checkOut && <div className="invalid-feedback">{errors.checkOut}</div>}
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Number of Guests</label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-prepend input-group-text"><i className="bi-people-fill"></i></span>
                    <select className="form-select form-select-lg" value={form.guests} onChange={set('guests')}>
                      {['1','2','3','4','5','6'].map(g => <option key={g} value={g}>{g} Guest{Number(g) > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <label className="form-label">Meal Plan</label>
                  <select className="form-select form-select-lg" value={form.mealPlan} onChange={set('mealPlan')}>
                    <option value="none">Room Only</option>
                    <option value="breakfast">Bed & Breakfast (+$20/night)</option>
                    <option value="all-inclusive">All Inclusive (+$80/night)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <h4 className="mb-4 pb-2 border-bottom mt-2">Special Requests</h4>
              <div className="mb-4">
                <textarea className="form-control" rows={4} placeholder="E.g. high floor, extra pillows, anniversary decoration, wheelchair access..." value={form.specialRequests} onChange={set('specialRequests')}></textarea>
                <div className="form-text">{form.specialRequests.length}/300 characters</div>
              </div>

              {/* Payment */}
              <h4 className="mb-4 pb-2 border-bottom mt-2">Payment Method</h4>
              <div className="d-flex gap-3 mb-5">
                {[
                  { id: 'card' as const, label: 'Credit/Debit Card', icon: 'bi-credit-card' },
                  { id: 'upi' as const, label: 'UPI', icon: 'bi-phone' },
                  { id: 'cash' as const, label: 'Pay at Hotel', icon: 'bi-cash' },
                ].map(({ id, label, icon }) => (
                  <div key={id}
                    className={`card p-3 flex-fill text-center ${form.paymentMethod === id ? 'border-warning bg-warning bg-opacity-10' : 'border'}`}
                    onClick={() => setForm(prev => ({ ...prev, paymentMethod: id }))}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={`${icon} fs-4 mb-1`} style={{ color: form.paymentMethod === id ? '#b8860b' : '#6c757d' }}></i>
                    <div className="small fw-semibold">{label}</div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="text-muted small mb-0"><span className="text-danger">*</span> Required fields</p>
                <button type="submit" className="btn btn-lg px-5 text-white fw-semibold" style={{ background: '#b8860b' }}>
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>

          {/* Price Summary */}
          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="card border p-4 sticky-top" style={{ top: '80px' }}>
              <h5 className="mb-4">Price Summary</h5>
              {!form.roomType ? (
                <p className="text-muted small">Select a room type and dates to see pricing.</p>
              ) : (
                <>
                  <div className="d-flex justify-content-between small mb-2">
                    <span>{selectedRoom?.label} Room</span>
                    <span>${selectedRoom?.price}/night</span>
                  </div>
                  {nights > 0 && (
                    <>
                      <div className="d-flex justify-content-between small mb-2">
                        <span>× {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>${roomCost}</span>
                      </div>
                      {mealCost > 0 && (
                        <div className="d-flex justify-content-between small mb-2">
                          <span>Meal Plan</span>
                          <span>${mealCost}</span>
                        </div>
                      )}
                      <div className="d-flex justify-content-between small mb-2">
                        <span>Taxes (18%)</span>
                        <span>${taxes}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span style={{ color: '#b8860b' }}>${total}</span>
                      </div>
                    </>
                  )}
                  {nights === 0 && <p className="text-muted small mt-2">Select check-in & check-out dates to see total.</p>}
                </>
              )}
              <hr />
              <div className="small text-muted">
                <div className="mb-1"><i className="bi-shield-check text-success me-2"></i>Free cancellation (48hrs)</div>
                <div className="mb-1"><i className="bi-award me-2" style={{ color: '#b8860b' }}></i>Best price guarantee</div>
                <div><i className="bi-headset text-primary me-2"></i>24/7 support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
