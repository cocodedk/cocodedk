import React from 'react';
import { Briefcase } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"
          alt="Business Consulting"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="flex items-center justify-center mb-8">
          <Briefcase className="w-16 h-16 text-orange-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Transform Your Business with Expert Consulting
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
          Cybersecurity, software modernization, task automation, and cutting-edge design solutions tailored for your success. Let's secure, streamline, and elevate your operations today.
        </p>
      </div>
    </section>
  );
}
