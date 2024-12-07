import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductList() {
  const { category } = useParams();

  const categoryProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-light text-white mb-12 tracking-wide uppercase">
        {category === 'all' ? 'All Collections' : category}
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {categoryProducts.map((product) => (
          <div key={product.id} className="relative group">
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </Link>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-light tracking-wide text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-white/70 mt-1">{product.material}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-light text-white">₹{product.price.toLocaleString()}</p>
                  <span className="text-sm text-white/90 bg-black/50 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add padding at the bottom for mobile navigation */}
      <div className="h-20 md:hidden" />
    </div>
  );
}