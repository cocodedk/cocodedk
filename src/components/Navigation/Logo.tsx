import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
      <Code2 className="w-6 h-6" />
      <span className="font-bold">cocode.dk</span>
    </Link>
  );
}