import React from 'react';
import { CheckCircle } from 'lucide-react';

const standards = [
  'ISO 27000',
  'NIS2',
  'DORA',
  'CIS18'
];

export function Standards() {
  return (
    <section className="bg-gray-800/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Industry Standards Compliance</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Our end-to-end cybersecurity services help you identify, understand, and address emerging threats before they escalate. We ensure your systems meet the highest security standards and compliance requirements.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {standards.map((standard) => (
                <div key={standard} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">{standard}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Beyond Compliance</h3>
            <p className="text-gray-300 leading-relaxed">
              We combine deep OSINT capabilities, dark web leak monitoring, and advanced web application scans to ensure nothing slips through the cracks. Beyond detection and analysis, we lead mitigation efforts, guide remediation projects, and run impactful cybersecurity awareness campaigns tailored to your team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}