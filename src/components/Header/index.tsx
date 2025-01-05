import React from 'react';
import { Hero } from './Hero';
import { HeroBackground } from './HeroBackground';

export function Header() {
  return (
    <header className="relative">
      <HeroBackground />
      <Hero />
    </header>
  );
}