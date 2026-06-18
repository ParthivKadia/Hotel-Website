export type RoomType = 'standard' | 'deluxe' | 'suite' | 'presidential';

export interface Room {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
  status: 'Available' | 'Booked' | 'Maintenance';
  roomType: RoomType;
  beds: number;
  baths: number;
  maxGuests: number;
  sqft: string;
  isNew?: boolean;
  image: string;
  rating: number;
  reviews: number;
  amenities: string[];
  floor: number;
}

export interface Booking {
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: number;
  specialRequests?: string;
}
