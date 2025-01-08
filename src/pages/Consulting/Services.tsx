import React from 'react';
import { Shield, Code2, Cog, Layout } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Cybersecurity Audits and Compliance',
    items: [
      'Conduct audits based on ISO 27000, CIS 18, and NIS2 frameworks',
      'Devise security policies for situations where standard requirements fall short',
      'Update, modernize, and operationalize security policies'
    ]
  },
  {
    icon: Code2,
    title: 'Modernization of Software Solutions',
    items: [
      'Upgrade outdated software to modern programming languages such as Python',
      'Transition to contemporary frameworks like Django and React'
    ]
  },
  {
    icon: Cog,
    title: 'Task Automation',
    items: [
      'Automate repetitive tasks',
      'Generate reports, create charts, and produce Excel files automatically'
    ]
  },
  {
    icon: Layout,
    title: 'Website Revamp',
    items: [
      'Redesign outdated homepage layouts',
      'Implement current design trends and technologies'
    ]
  }
];

export function Services() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Our Consulting Services</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="bg-gray-800/50 p-8 rounded-xl">
              <Icon className="w-12 h-12 text-orange-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <ul className="text-gray-300 space-y-2">
                {service.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
