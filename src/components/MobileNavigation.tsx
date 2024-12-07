import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Home } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import LoginForm from './LoginForm';

export default function MobileNavigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user } = useUser();
  const location = useLocation();

  // Hide navigation on blog-related routes
  if (location.pathname.includes('/blog')) {
    return null;
  }

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50"
        style={{ 
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="grid grid-cols-5 h-16">
          <Link 
            to="/"
            className="flex flex-col items-center justify-center"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link 
            to="/search"
            className="flex flex-col items-center justify-center"
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          
          <Link 
            to="/wishlist"
            className="flex flex-col items-center justify-center relative"
          >
            <Heart className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-6 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
            <span className="text-xs mt-1">Wishlist</span>
          </Link>
          
          <Link 
            to="/cart"
            className="flex flex-col items-center justify-center relative"
          >
            <ShoppingBag className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-6 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
          
          {user ? (
            <Link 
              to="/profile"
              className="flex flex-col items-center justify-center"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex flex-col items-center justify-center w-full"
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          )}
        </div>
      </div>

      {isLoginOpen && (
        <LoginForm 
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}