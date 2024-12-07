import React from 'react';
import { useUser } from '../context/UserContext';
import MyCoins from '../components/MyCoins';
import MyCalendar from '../components/MyCalendar';
import { ShoppingBag, Heart, MapPin, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-light mb-4">Please login to view your profile</h2>
            <button className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-black/90 transition-colors">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: ShoppingBag, label: 'My Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: MapPin, label: 'Addresses', path: '/address' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-gray-600">{user.name[0]}</span>
                </div>
                <h2 className="text-xl font-light">Hi, {user.name}!</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-2xl font-light">{user.coins}</span>
                  <span className="text-gray-600">coins</span>
                </div>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <button 
                onClick={handleLogout}
                className="w-full bg-black text-white px-4 py-2 mt-4 text-sm tracking-wider hover:bg-black/90 transition-colors rounded-lg"
              >
                LOGOUT
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <MyCalendar />
            <MyCoins />
          </div>
        </div>
      </div>
    </div>
  );
}