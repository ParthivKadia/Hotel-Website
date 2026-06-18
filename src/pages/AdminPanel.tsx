import { useState } from 'react';
import { rooms as initialRooms } from '../data/rooms';
import type { Room, RoomType } from '../types';

const AdminPanel: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>(initialRooms);
  const [showForm, setShowForm] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings'>('rooms');
  const [form, setForm] = useState({ title: '', location: '', pricePerNight: '', roomType: 'standard' as RoomType, beds: '1', baths: '1', maxGuests: '2', sqft: '', status: 'Available' as Room['status'] });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleEdit = (room: Room) => {
    setEditRoom(room);
    setForm({ title: room.title, location: room.location, pricePerNight: String(room.pricePerNight), roomType: room.roomType, beds: String(room.beds), baths: String(room.baths), maxGuests: String(room.maxGuests), sqft: room.sqft, status: room.status });
    setShowForm(true);
  };

  const handleDelete = (id: number) => { if (confirm('Delete this room?')) setRoomList(prev => prev.filter(r => r.id !== id)); };

  const handleSave = () => {
    if (editRoom) {
      setRoomList(prev => prev.map(r => r.id === editRoom.id ? { ...r, ...form, pricePerNight: Number(form.pricePerNight), beds: Number(form.beds), baths: Number(form.baths), maxGuests: Number(form.maxGuests) } : r));
    } else {
      const newRoom: Room = { id: Date.now(), ...form, pricePerNight: Number(form.pricePerNight), beds: Number(form.beds), baths: Number(form.baths), maxGuests: Number(form.maxGuests), rating: 4.5, reviews: 0, floor: 1, amenities: ['WiFi', 'AC'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=480&h=320&fit=crop' };
      setRoomList(prev => [...prev, newRoom]);
    }
    setShowForm(false); setEditRoom(null);
    setForm({ title: '', location: '', pricePerNight: '', roomType: 'standard', beds: '1', baths: '1', maxGuests: '2', sqft: '', status: 'Available' });
  };

  const stats = {
    total: roomList.length,
    available: roomList.filter(r => r.status === 'Available').length,
    booked: roomList.filter(r => r.status === 'Booked').length,
    revenue: roomList.filter(r => r.status === 'Booked').reduce((s, r) => s + r.pricePerNight, 0),
  };

  const mockBookings = [
    { id: 'BK001', guest: 'Priya Sharma', room: 'Junior Suite', checkIn: '2024-06-20', checkOut: '2024-06-23', nights: 3, total: 1040, status: 'Confirmed' },
    { id: 'BK002', guest: 'Rahul Mehta', room: 'Deluxe Room', checkIn: '2024-06-21', checkOut: '2024-06-24', nights: 3, total: 627, status: 'Confirmed' },
    { id: 'BK003', guest: 'Anita Kumar', room: 'Standard Room', checkIn: '2024-06-22', checkOut: '2024-06-25', nights: 3, total: 354, status: 'Pending' },
    { id: 'BK004', guest: 'Dev Patel', room: 'Presidential Suite', checkIn: '2024-06-25', checkOut: '2024-06-28', nights: 3, total: 4248, status: 'Confirmed' },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Admin Panel</h2>
          <p className="text-muted mb-0">Manage rooms and bookings</p>
        </div>
        {activeTab === 'rooms' && (
          <button className="btn text-white" style={{ background: '#b8860b' }} onClick={() => { setShowForm(true); setEditRoom(null); }}>
            <i className="bi-plus-circle me-2"></i>Add Room
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Rooms', value: stats.total, icon: 'bi-door-open', color: '#0d6efd' },
          { label: 'Available', value: stats.available, icon: 'bi-check-circle', color: '#198754' },
          { label: 'Booked', value: stats.booked, icon: 'bi-calendar-check', color: '#dc3545' },
          { label: 'Revenue Today', value: `$${stats.revenue}`, icon: 'bi-currency-dollar', color: '#b8860b' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm p-3 h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, background: color + '20' }}>
                  <i className={`${icon} fs-5`} style={{ color }}></i>
                </div>
                <div>
                  <div className="fw-bold fs-5">{value}</div>
                  <div className="small text-muted">{label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'rooms' ? 'active' : ''}`} onClick={() => setActiveTab('rooms')}>
            <i className="bi-door-open me-2"></i>Rooms
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <i className="bi-calendar-check me-2"></i>Bookings
          </button>
        </li>
      </ul>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card border p-4 mb-4">
          <h5 className="mb-4">{editRoom ? 'Edit Room' : 'Add New Room'}</h5>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <label className="form-label small fw-semibold">Room Title</label>
              <input type="text" className="form-control" placeholder="e.g. Ocean View Deluxe" value={form.title} onChange={set('title')} />
            </div>
            <div className="col-sm-6 mb-3">
              <label className="form-label small fw-semibold">Location</label>
              <input type="text" className="form-control" placeholder="e.g. Floor 3, Wing A" value={form.location} onChange={set('location')} />
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Price/Night ($)</label>
              <input type="number" className="form-control" placeholder="200" value={form.pricePerNight} onChange={set('pricePerNight')} />
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Room Type</label>
              <select className="form-select" value={form.roomType} onChange={set('roomType')}>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="presidential">Presidential</option>
              </select>
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Status</label>
              <select className="form-select" value={form.status} onChange={set('status')}>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Beds</label>
              <input type="number" className="form-control" min={1} value={form.beds} onChange={set('beds')} />
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Bathrooms</label>
              <input type="number" className="form-control" min={1} value={form.baths} onChange={set('baths')} />
            </div>
            <div className="col-sm-4 mb-3">
              <label className="form-label small fw-semibold">Max Guests</label>
              <input type="number" className="form-control" min={1} value={form.maxGuests} onChange={set('maxGuests')} />
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn text-white px-4" style={{ background: '#b8860b' }} onClick={handleSave}>
              {editRoom ? 'Save Changes' : 'Add Room'}
            </button>
            <button className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditRoom(null); }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Rooms Table */}
      {activeTab === 'rooms' && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Room</th><th>Type</th><th>Floor</th><th>Price</th><th>Guests</th><th>Status</th><th>Rating</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomList.map(room => (
                  <tr key={room.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img src={room.image} alt={room.title} width={48} height={36} style={{ objectFit: 'cover', borderRadius: 6 }} />
                        <div>
                          <div className="small fw-semibold">{room.title}</div>
                          <div className="small text-muted">{room.location}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-secondary">{room.roomType}</span></td>
                    <td><span className="small">Floor {room.floor}</span></td>
                    <td><span className="fw-semibold" style={{ color: '#b8860b' }}>${room.pricePerNight}</span></td>
                    <td><span className="small">{room.maxGuests} max</span></td>
                    <td>
                      <span className={`badge ${room.status === 'Available' ? 'bg-success' : room.status === 'Booked' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {room.status}
                      </span>
                    </td>
                    <td><span className="small">⭐ {room.rating}</span></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(room)}><i className="bi-pencil"></i></button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(room.id)}><i className="bi-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      {activeTab === 'bookings' && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr><th>Booking ID</th><th>Guest</th><th>Room</th><th>Check In</th><th>Check Out</th><th>Nights</th><th>Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                {mockBookings.map(b => (
                  <tr key={b.id}>
                    <td><span className="badge bg-light text-dark border">{b.id}</span></td>
                    <td><span className="fw-semibold">{b.guest}</span></td>
                    <td>{b.room}</td>
                    <td><span className="small">{b.checkIn}</span></td>
                    <td><span className="small">{b.checkOut}</span></td>
                    <td>{b.nights}</td>
                    <td><span className="fw-semibold" style={{ color: '#b8860b' }}>${b.total}</span></td>
                    <td><span className={`badge ${b.status === 'Confirmed' ? 'bg-success' : 'bg-warning text-dark'}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
