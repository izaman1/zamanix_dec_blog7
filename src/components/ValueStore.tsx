import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function ValueStore() {
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
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">VALUE STORE</h2>
          <p className="text-white/70 text-lg">Up to 70% Off on Selected Items</p>
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
          {products.slice(0, 8).map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="flex-none w-[80vw] md:w-1/4 scroll-snap-align-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm">
                  -70% OFF
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">{product.name}</h3>
                    <div className="space-y-1">
                      <p className="text-lg font-light text-white">₹{Math.floor(product.price * 0.3).toLocaleString()}</p>
                      <p className="text-base text-white/70 line-through">₹{product.price.toLocaleString()}</p>
                    </div>
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