import React from 'react';
import { Search, Clock, FileSearch } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Penetration Testing',
    description: 'Quick 24-hour pentests to identify vulnerabilities in your systems'
  },
  {
    icon: FileSearch,
    title: 'Gap Assessment',
    description: 'Comprehensive analysis aligned with ISO 27000, NIS2, DORA, and CIS18 standards'
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Continuous monitoring of your digital assets and potential threats'
  }
];

export function Services() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Security Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="bg-gray-800/50 p-8 rounded-xl">
              <Icon className="w-12 h-12 text-green-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}