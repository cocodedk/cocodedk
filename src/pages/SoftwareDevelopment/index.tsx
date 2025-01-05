import React from 'react';
import { Hero } from './Hero';
import { Expertise } from './Expertise';
import { Process } from './Process';

export function SoftwareDevelopment() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Hero />
      <Expertise />
      <Process />
    </div>
  );
}