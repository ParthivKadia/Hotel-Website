import RoomCard from '../components/RoomCard';
import HotelFilterBar from '../components/HotelFilterBar';
import { rooms } from '../data/rooms';
import { Link } from 'react-router-dom';

const RoomList: React.FC = () => {
  return (
    <>
      <HotelFilterBar totalCount={rooms.length} />
      <div className="container pb-5 pb-lg-7">
        <div className="d-grid gap-3 mb-5">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} layout="list" />
          ))}
        </div>
        <nav aria-label="Room pagination">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled"><span className="page-link"><i className="bi-chevron-left"></i></span></li>
            {[1, 2, 3].map((page) => (
              <li key={page} className={`page-item ${page === 1 ? 'active' : ''}`}>
                <a className="page-link" href="#">{page}</a>
              </li>
            ))}
            <li className="page-item"><a className="page-link" href="#"><i className="bi-chevron-right"></i></a></li>
          </ul>
        </nav>
        <div className="text-center mt-3">
          <p className="text-muted small">Showing 1–{rooms.length} of {rooms.length} rooms</p>
          <Link to="/room-grid" className="btn btn-sm btn-outline-secondary">
            <i className="bi-grid me-1"></i> Switch to Grid view
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomList;
