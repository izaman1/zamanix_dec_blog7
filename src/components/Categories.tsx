import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function Categories() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-light text-white mb-12 tracking-wide text-center">CATEGORIES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/collections/${category.id}`}
              className="relative overflow-hidden group cursor-pointer"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-lg font-light tracking-wide mb-2">{category.name}</h3>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}