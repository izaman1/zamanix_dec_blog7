import React from 'react';
import { Diamond, Award, Users, Globe } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="bg-white">
      <div className="relative h-[60vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1581974944026-5d6ed762f617?q=80&w=2066"
          alt="Jewelry Workshop"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4">Our Story</h1>
            <p className="text-xl font-light max-w-2xl mx-auto">Since 1970, crafting timeless pieces that celebrate life's precious moments</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-light mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-600 mb-6">Founded in 1970 by master jeweler Alexander Zamanix, our journey began in a small workshop in New York's Diamond District. With an unwavering commitment to quality and craftsmanship, we've grown from a boutique atelier to a globally recognized name in luxury jewelry.</p>
            <p className="text-gray-600">Today, we continue to honor our founder's vision while embracing innovation and sustainable practices, ensuring each piece not only meets but exceeds the expectations of our discerning clientele.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1974"
              alt="Historical Workshop"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1925"
              alt="Modern Craftsmanship"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="text-center">
            <Diamond className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">50+ Years</h3>
            <p className="text-gray-600">Of excellence in fine jewelry craftsmanship</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Master Artisans</h3>
            <p className="text-gray-600">Dedicated to perfection in every detail</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">100,000+</h3>
            <p className="text-gray-600">Satisfied clients worldwide</p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Global Presence</h3>
            <p className="text-gray-600">Boutiques in 12 countries</p>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-light mb-6">Our Vision</h2>
          <p className="text-gray-600 mb-8">To create extraordinary pieces that transcend generations, combining traditional craftsmanship with contemporary design. Each Zamanix creation is more than jewelry – it's a story waiting to be told, a moment captured in precious metals and stones.</p>
          <button className="bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors">
            EXPLORE OUR COLLECTIONS
          </button>
        </div>
      </div>
    </div>
  );
}