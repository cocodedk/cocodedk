import React from 'react';
import { Code, Database, Smartphone, Workflow } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Code,
    title: 'Python & Web Development',
    description: 'Expert development using Python and modern web frameworks'
  },
  {
    icon: Smartphone,
    title: 'Android Development',
    description: 'Native Android applications that enhance mobility and accessibility'
  },
  {
    icon: Database,
    title: 'API Integration',
    description: 'Secure APIs that seamlessly connect your platforms'
  },
  {
    icon: Workflow,
    title: 'Agile Development',
    description: 'Flexible, iterative development process for optimal results'
  }
];

export function Expertise() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Our Technical Expertise</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {expertiseAreas.map((area) => {
          const Icon = area.icon;
          return (
            <div key={area.title} className="bg-gray-800/50 p-8 rounded-xl">
              <Icon className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">{area.title}</h3>
              <p className="text-gray-300">{area.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}