import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import LoginForm from './LoginForm';

const categories = [
  { path: '/collections/rings', name: 'RINGS' },
  { path: '/collections/necklaces', name: 'NECKLACES' },
  { path: '/collections/earrings', name: 'EARRINGS' },
  { path: '/collections/bracelets', name: 'BRACELETS' },
  { path: '/collections/all', name: 'COLLECTIONS' },
  { path: '/blog', name: 'BLOG' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user } = useUser();

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
  };

  // Show only logo in navbar for blog routes
  if (location.pathname.includes('/blog')) {
    return (
      <nav className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-center h-16 sm:h-20 items-center">
            <Link to="/" className="flex-shrink-0 ">
              <img src="/logo.png" alt="hello" className="w-20" />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 ">
                <img src="/logo.png" alt="hello" className="w-20" />
              </Link>
              <div className="hidden md:block ml-4 sm:ml-10">
                <div className="flex items-center space-x-4 sm:space-x-8">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="text-white/70 hover:text-white text-sm tracking-wide"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
              <button className="text-white/70 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/wishlist"
                className="text-white/70 hover:text-white relative"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="text-white/70 hover:text-white relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link to="/profile" className="text-white/70 hover:text-white">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-white/70 hover:text-white"
                >
                  <User className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white/70"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Categories Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
            <div className="px-2 sm:px-4 py-2 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="block py-2 text-white/70 hover:text-white text-sm tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-xl mx-4">
            <LoginForm
              onClose={() => setIsLoginOpen(false)}
              onSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}
