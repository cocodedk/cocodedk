import React from 'react';
import { Code2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000"
          alt="Software Development"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="flex items-center justify-center mb-8">
          <Code2 className="w-16 h-16 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Custom Software Development: Fast, Flexible, and Future-Ready
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
          At CoCode.dk, we specialize in crafting custom software solutions that drive efficiency, reliability, and growth.
        </p>
      </div>
    </section>
  );
}