import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const priceRanges = [
  {
    title: 'Under ₹50,000',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070',
    description: 'Beautiful pieces that don\'t break the bank'
  },
  {
    title: '₹50,000 - ₹1,00,000',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2070',
    description: 'Premium jewelry for special occasions'
  },
  {
    title: '₹1,00,000 - ₹2,00,000',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070',
    description: 'Luxury pieces for life\'s milestones'
  },
  {
    title: 'Above ₹2,00,000',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070',
    description: 'Exclusive high-end collections'
  }
];

export default function ShopByPrice() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">SHOP GIFTS BY PRICE</h2>
          <p className="text-white/70 text-lg">Find the perfect gift within your budget</p>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-8"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          style={{ 
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            scrollSnapType: 'x mandatory'
          }}
        >
          {priceRanges.map((range, index) => (
            <Link 
              key={index} 
              to="/collections/all"
              className="flex-none w-[80vw] md:w-1/4 scroll-snap-align-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={range.image}
                  alt={range.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">{range.title}</h3>
                    <p className="text-base md:text-lg text-white/70">{range.description}</p>
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