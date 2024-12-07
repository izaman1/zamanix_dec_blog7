import React from 'react';
import Hero from '../components/Hero';
import TrendingNow from '../components/TrendingNow';
import ValueStore from '../components/ValueStore';
import Bestsellers from '../components/Bestsellers';
import ShopByPrice from '../components/ShopByPrice';
import GiftSection from '../components/GiftSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrendingNow />
      <ValueStore />
      <Bestsellers />
      <ShopByPrice />
      <GiftSection />
    </main>
  );
}