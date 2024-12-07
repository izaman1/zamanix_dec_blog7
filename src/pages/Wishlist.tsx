import React from 'react';
import { X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-light mb-4">Your Wishlist</h1>
          <p className="text-gray-600">Your wishlist is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light mb-12">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden">
                <a href={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </a>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-black hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-light">
                  <a href={`/product/${product.id}`} className="hover:text-gray-600">
                    {product.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 mt-1">{product.material}</p>
                <p className="text-lg mt-2 font-light">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}