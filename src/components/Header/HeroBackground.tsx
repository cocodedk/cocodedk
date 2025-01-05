import React from 'react';
import { cn } from '../../utils/cn';
import { transitions } from '../../utils/styles';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
        alt="Digital Technology Background"
        className={cn(
          "w-full h-full object-cover",
          transitions.slow,
          "hover:scale-105"
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900" />
    </div>
  );
}