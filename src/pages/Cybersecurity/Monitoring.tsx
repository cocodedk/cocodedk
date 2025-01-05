import React from 'react';
import { Shield, Eye, AlertTriangle } from 'lucide-react';

export function Monitoring() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Proactive Threat Management</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          With CoCode.dk at your side, you can confidently navigate the evolving threat landscape and maintain the trust of your stakeholders.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-green-400/10 to-transparent p-8 rounded-xl border border-green-400/20">
          <Eye className="w-12 h-12 text-green-400 mb-6" />
          <h3 className="text-xl font-bold mb-4">Dark Web Monitoring</h3>
          <p className="text-gray-300">
            Continuous monitoring of dark web activities to detect potential data leaks and threats.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-400/10 to-transparent p-8 rounded-xl border border-green-400/20">
          <AlertTriangle className="w-12 h-12 text-green-400 mb-6" />
          <h3 className="text-xl font-bold mb-4">Threat Detection</h3>
          <p className="text-gray-300">
            Advanced threat detection and analysis to identify potential security risks.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-400/10 to-transparent p-8 rounded-xl border border-green-400/20">
          <Shield className="w-12 h-12 text-green-400 mb-6" />
          <h3 className="text-xl font-bold mb-4">Incident Response</h3>
          <p className="text-gray-300">
            Rapid response and mitigation strategies for security incidents.
          </p>
        </div>
      </div>
    </section>
  );
}