import React from 'react';
import { Section } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';

export function Process() {
  return (
    <Section background>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Development Process</h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Leveraging our 25+ years of IT experience and deep expertise in Python, web frameworks, and Android development, we deliver products that don't just meet your needs—they redefine what's possible.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We streamline our processes to ensure rapid turnaround times without sacrificing attention to detail. From planning and coding to testing and deployment, each stage is managed with precision and care.
          </p>
        </div>
        <Card>
          <h3 className="text-xl font-bold mb-4">Quality-Driven Development</h3>
          <p className="text-gray-300 leading-relaxed">
            Our agile development methodologies and industry best practices ensure your custom solution is both scalable and easy to maintain, freeing you to focus on what matters most—growing your business. When you partner with CoCode.dk, you gain a trusted ally who is as committed to your success as you are.
          </p>
        </Card>
      </div>
    </Section>
  );
}