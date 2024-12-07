import React from 'react';
import { Link } from 'react-router-dom';

const giftCategories = [
  {
    title: 'For Him',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070',
    description: 'Timeless pieces for the modern gentleman'
  },
  {
    title: 'For Her',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070',
    description: 'Elegant designs for every occasion'
  },
  {
    title: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070',
    description: 'Celebrate your special moments'
  },
  {
    title: 'Wedding',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070',
    description: 'Begin your forever with us'
  },
  {
    title: 'For Yourself',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070',
    description: 'Treat yourself to something special'
  }
];

export default function GiftSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">GIFT YOUR LOVED ONES</h2>
          <p className="text-white/70 text-lg">Find the perfect gift for every special person in your life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {giftCategories.map((category, index) => (
            <Link key={index} to="/collections/all" className="block group">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">{category.title}</h3>
                    <p className="text-base md:text-lg text-white/70">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}