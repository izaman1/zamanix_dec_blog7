import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const stores = [
  {
    id: 1,
    city: 'New York',
    address: '123 Fifth Avenue, New York, NY 10010',
    phone: '+1 (212) 555-0123',
    hours: 'Mon-Sat: 10:00 AM - 7:00 PM\nSun: 12:00 PM - 6:00 PM',
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=2070'
  },
  {
    id: 2,
    city: 'London',
    address: '45 Bond Street, London W1S 1DB',
    phone: '+44 20 7123 4567',
    hours: 'Mon-Sat: 10:00 AM - 6:00 PM\nSun: Closed',
    image: 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=2070'
  },
  {
    id: 3,
    city: 'Paris',
    address: '12 Place Vendôme, 75001 Paris',
    phone: '+33 1 23 45 67 89',
    hours: 'Mon-Sat: 10:30 AM - 7:00 PM\nSun: Closed',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2070'
  },
  {
    id: 4,
    city: 'Tokyo',
    address: '4-1 Ginza, Chuo City, Tokyo 104-0061',
    phone: '+81 3-1234-5678',
    hours: 'Daily: 11:00 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1971'
  }
];

export default function StoreLocator() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="bg-white">
      <div className="relative h-[40vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=2070"
          alt="Zamanix Boutique"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4">Our Boutiques</h1>
            <p className="text-xl font-light">Visit us in person to experience the extraordinary</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light mb-8">Find a Boutique</h2>
            <div className="space-y-6">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`w-full text-left p-6 transition-colors ${
                    selectedStore.id === store.id
                      ? 'bg-black text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="text-xl font-light mb-2">{store.city}</h3>
                  <p className={selectedStore.id === store.id ? 'text-white/70' : 'text-gray-600'}>
                    {store.address}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <img
                src={selectedStore.image}
                alt={selectedStore.city}
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Address</h3>
                  <p className="text-gray-600">{selectedStore.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  <p className="text-gray-600">{selectedStore.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Hours</h3>
                  <p className="text-gray-600 whitespace-pre-line">{selectedStore.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors">
                BOOK AN APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}