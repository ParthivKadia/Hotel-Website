import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomGrid from './pages/RoomGrid';
import RoomList from './pages/RoomList';
import RoomOverview from './pages/RoomOverview';
import BookingForm from './pages/BookingForm';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main id="content" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room-grid" element={<RoomGrid />} />
          <Route path="/room-list" element={<RoomList />} />
          <Route path="/room-overview" element={<RoomOverview />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
