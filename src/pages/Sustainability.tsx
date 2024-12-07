import React from 'react';
import { Leaf, Recycle, Shield, Heart } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="bg-white">
      <div className="relative h-[60vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974"
          alt="Sustainable Practices"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4">Our Commitment to Sustainability</h1>
            <p className="text-xl font-light max-w-2xl mx-auto">Creating beauty responsibly for a better tomorrow</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-light mb-6">Responsible Sourcing</h2>
            <p className="text-gray-600 mb-6">We are committed to ensuring that every diamond and precious metal in our pieces is ethically sourced. Our partnerships with responsible miners and suppliers guarantee full traceability from mine to market.</p>
            <p className="text-gray-600">Through our membership in the Responsible Jewellery Council, we adhere to strict environmental and social standards throughout our supply chain.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070"
              alt="Ethical Mining"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070"
              alt="Sustainable Production"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="text-center p-8 bg-gray-50">
            <Leaf className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">100% renewable energy in our workshops</p>
          </div>
          <div className="text-center p-8 bg-gray-50">
            <Recycle className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Recycled Materials</h3>
            <p className="text-gray-600">Using recycled precious metals</p>
          </div>
          <div className="text-center p-8 bg-gray-50">
            <Shield className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Ethical Sourcing</h3>
            <p className="text-gray-600">Conflict-free diamonds</p>
          </div>
          <div className="text-center p-8 bg-gray-50">
            <Heart className="h-12 w-12 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-light mb-2">Community Support</h3>
            <p className="text-gray-600">Investing in mining communities</p>
          </div>
        </div>

        <div className="bg-gray-50 p-12 text-center">
          <h2 className="text-3xl font-light mb-6">Our Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div>
              <h3 className="text-4xl font-light mb-2">100%</h3>
              <p className="text-gray-600">Renewable Energy</p>
            </div>
            <div>
              <h3 className="text-4xl font-light mb-2">85%</h3>
              <p className="text-gray-600">Recycled Materials</p>
            </div>
            <div>
              <h3 className="text-4xl font-light mb-2">0%</h3>
              <p className="text-gray-600">Carbon Footprint by 2025</p>
            </div>
          </div>
          <button className="bg-black text-white px-8 py-4 text-sm tracking-wider hover:bg-black/90 transition-colors">
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
}