import React from 'react';

export default function FeaturedCollection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[700px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070"
              alt="Luxury Diamond Collection"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-light mb-4">The Diamond Collection</h3>
              <p className="text-white/90 mb-6 font-light">Discover our finest selection of diamond jewelry, crafted to perfection.</p>
              <button className="bg-white text-black w-fit px-8 py-3 text-sm tracking-wider hover:bg-white/90 transition-colors">
                EXPLORE MORE
              </button>
            </div>
          </div>
          
          <div className="relative h-[700px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070"
              alt="Wedding Collection"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-8">
              <h3 className="text-white text-3xl font-light mb-4">The Wedding Edit</h3>
              <p className="text-white/90 mb-6 font-light">Timeless pieces for your special day, designed to last forever.</p>
              <button className="bg-white text-black w-fit px-8 py-3 text-sm tracking-wider hover:bg-white/90 transition-colors">
                DISCOVER NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}