import React from 'react';
import { Hero } from './Hero';
import { Services } from './Services';
import { Standards } from './Standards';
import { Monitoring } from './Monitoring';

export function Cybersecurity() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Hero />
      <Services />
      <Standards />
      <Monitoring />
    </div>
  );
}
