import React from 'react';
import { Logo } from './Logo';
import { HeroTitle } from './HeroTitle';
import { HeroDescription } from './HeroDescription';
import { CTAButtons } from './CTAButtons';

export function Hero() {
  return (
    <div className="relative z-10 container mx-auto px-6 py-32 md:py-48">
      <div className="flex flex-col items-center text-center">
        <Logo />
        <HeroTitle />
        <HeroDescription />
        <CTAButtons />
      </div>
    </div>
  );
}