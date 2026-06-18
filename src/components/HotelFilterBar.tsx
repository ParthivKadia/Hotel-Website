import { useState } from 'react';

interface HotelFilterBarProps {
  onSearch?: (value: string) => void;
  onSortChange?: (value: string) => void;
  totalCount?: number;
}

const HotelFilterBar: React.FC<HotelFilterBarProps> = ({ onSearch, onSortChange, totalCount = 9 }) => {
  const [search, setSearch] = useState('');
  const [guestFilter, setGuestFilter] = useState('Any');
  const [priceMin, setPriceMin] = useState('50');
  const [priceMax, setPriceMax] = useState('1200');
  const [showPrice, setShowPrice] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showType, setShowType] = useState(false);
  const [typeFilters, setTypeFilters] = useState({ standard: true, deluxe: true, suite: true, presidential: true });
  const [sort, setSort] = useState('mostPopular');

  const guestOptions = ['Any', '1', '2', '3', '4', '5+'];

  return (
    <>
      <div className="container pt-5 mt-3">
        <div className="row gx-2">
          <div className="col-lg mb-2 mb-lg-0">
            <div className="input-group input-group-merge">
              <span className="input-group-prepend input-group-text"><i className="bi-search"></i></span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search rooms..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); onSearch?.(e.target.value); }}
              />
            </div>
          </div>

          {/* Price */}
          <div className="col-auto mb-2 mb-lg-0 position-relative">
            <button className="btn btn-white btn-sm dropdown-toggle" onClick={() => { setShowPrice(!showPrice); setShowGuests(false); setShowType(false); }}>
              Price/Night
            </button>
            {showPrice && (
              <div className="dropdown-menu show p-3" style={{ minWidth: '22rem', top: '100%', left: 0 }}>
                <label className="form-label small">Price Range ($/night)</label>
                <div className="d-flex gap-2 mb-2">
                  <div className="col">
                    <small className="d-block mb-1">Min: ${priceMin}</small>
                    <input type="range" min={50} max={1200} value={priceMin} onChange={e => setPriceMin(e.target.value)} className="form-range" />
                  </div>
                  <div className="col">
                    <small className="d-block mb-1">Max: ${priceMax}</small>
                    <input type="range" min={50} max={1200} value={priceMax} onChange={e => setPriceMax(e.target.value)} className="form-range" />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button className="btn btn-white btn-sm" onClick={() => { setPriceMin('50'); setPriceMax('1200'); }}>Clear</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowPrice(false)}>Apply</button>
                </div>
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="col-auto mb-2 mb-lg-0 position-relative">
            <button className="btn btn-white btn-sm dropdown-toggle" onClick={() => { setShowGuests(!showGuests); setShowPrice(false); setShowType(false); }}>
              {guestFilter === 'Any' ? 'Guests' : `${guestFilter} Guests`}
            </button>
            {showGuests && (
              <div className="dropdown-menu show p-3" style={{ minWidth: '20rem', top: '100%', left: 0 }}>
                <div className="btn-group d-flex flex-wrap gap-1" role="group">
                  {guestOptions.map((opt) => (
                    <button key={opt} type="button" className={`btn btn-sm ${guestFilter === opt ? 'btn-primary' : 'btn-white'}`} onClick={() => { setGuestFilter(opt); setShowGuests(false); }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Room Type */}
          <div className="col-auto mb-2 mb-lg-0 position-relative">
            <button className="btn btn-white btn-sm dropdown-toggle" onClick={() => { setShowType(!showType); setShowPrice(false); setShowGuests(false); }}>
              Room Type
            </button>
            {showType && (
              <div className="dropdown-menu show p-3" style={{ minWidth: '18rem', top: '100%', left: 0 }}>
                {[
                  { key: 'standard', label: 'Standard', desc: 'Comfortable & affordable' },
                  { key: 'deluxe', label: 'Deluxe', desc: 'Enhanced comfort & views' },
                  { key: 'suite', label: 'Suite', desc: 'Spacious luxury living' },
                  { key: 'presidential', label: 'Presidential', desc: 'The ultimate experience' },
                ].map(({ key, label, desc }) => (
                  <div className="form-check mb-2" key={key}>
                    <input
                      className="form-check-input" type="checkbox" id={`type-${key}`}
                      checked={typeFilters[key as keyof typeof typeFilters]}
                      onChange={() => setTypeFilters(prev => ({ ...prev, [key]: !prev[key as keyof typeof typeFilters] }))}
                    />
                    <label className="form-check-label" htmlFor={`type-${key}`}>
                      {label}<span className="d-block small text-muted">{desc}</span>
                    </label>
                  </div>
                ))}
                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button className="btn btn-white btn-sm" onClick={() => setTypeFilters({ standard: false, deluxe: false, suite: false, presidential: false })}>Clear</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowType(false)}>Apply</button>
                </div>
              </div>
            )}
          </div>

          <div className="col-auto mb-2 mb-lg-0">
            <button className="btn btn-white btn-sm"><i className="bi-sliders me-2"></i> More Filters</button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center mb-4">
          <div className="col-sm mb-2 mb-sm-0">
            <span className="d-block text-muted small">{totalCount} rooms available</span>
            <h1 className="h3 mb-0">Guest Rooms & Suites</h1>
          </div>
          <div className="col-sm-auto">
            <select className="form-select form-select-sm" value={sort} onChange={(e) => { setSort(e.target.value); onSortChange?.(e.target.value); }}>
              <option value="mostPopular">Most Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="topRated">Top Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelFilterBar;
