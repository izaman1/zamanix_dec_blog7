import React from 'react';

export default function Craftsmanship() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-light mb-8">The Art of Craftsmanship</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Each piece is meticulously crafted by our master artisans, combining centuries-old techniques with modern innovation. We select only the finest materials and stones, ensuring every creation meets our exceptional standards.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to excellence extends beyond the final product - it's embedded in every step of our process, from design to delivery.
            </p>
            <button className="bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors">
              LEARN MORE
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1974"
                alt="Craftsmanship"
                className="w-full h-[300px] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1925"
                alt="Jewelry Making"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1974"
                alt="Diamond Selection"
                className="w-full h-[200px] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1633810542706-90e5ff7557be?q=80&w=1974"
                alt="Final Touch"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}