import React from 'react';
import { GradientText } from '../ui/GradientText';

export function HeroTitle() {
  return (
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Embrace the{' '}
      <GradientText>AI Future</GradientText>
      {' '}Now
    </h1>
  );
}