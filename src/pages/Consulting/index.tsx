import React from 'react';
import { Hero } from './Hero';
import { Services } from './Services';

export function Consulting() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Hero />
      <Services />
    </div>
  );
}
