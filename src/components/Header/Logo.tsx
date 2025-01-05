import React from 'react';
import { Code2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Code2 className="w-12 h-12 text-blue-400" />
      <span className="text-3xl font-bold">cocode.dk</span>
    </div>
  );
}