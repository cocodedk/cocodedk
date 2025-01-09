import React from 'react';
import { Header } from '../../components/Header';
import { Services } from '../../components/Services';
import { Features } from '../../components/Features';
import { CaseStudies } from '../../components/CaseStudies';
import { CTA } from '../../components/CTA';
import ContactButton from '../../components/Navigation/ContactButton';

export function HomePage() {
  return (
    <>
      <Header />
      <Services />
      <Features />
      <CaseStudies />
      <CTA />
      <div className="flex justify-center mt-8">
        <ContactButton />
      </div>
    </>
  );
}
