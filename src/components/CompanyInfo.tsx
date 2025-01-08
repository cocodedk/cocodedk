import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export function CompanyInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Company Information</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Building2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-medium">cocode.dk</h3>
            <p className="text-gray-400">CVR: 12345678</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-400">+45 12 34 56 78</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-400">contact@cocode.dk</p>
          </div>
        </div>

        {/*
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Address</h3>
            <p className="text-gray-400">123 Main St, City, Country</p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
