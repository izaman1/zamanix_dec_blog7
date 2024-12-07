import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-white/50" />
          <h2 className="mt-4 text-2xl font-light text-white">Your wishlist is empty</h2>
          <p className="mt-2 text-white/70">Browse our collections to add items to your wishlist</p>
          <Link
            to="/collections/all"
            className="mt-8 inline-block bg-white text-black px-8 py-3 text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-light text-white mb-12 tracking-wide">MY WISHLIST</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="group">
            <div className="relative overflow-hidden">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white transition-colors rounded-full"
              >
                <Heart className="h-5 w-5 fill-black" />
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link to={`/product/${item.id}`}>
                <h3 className="text-lg font-light tracking-wide text-white">{item.name}</h3>
                <p className="text-sm text-white/70 mt-1">{item.description}</p>
                <p className="text-lg mt-2 font-light text-white">{item.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}