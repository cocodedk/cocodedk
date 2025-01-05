import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400';
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <Code2 className="w-6 h-6" />
            <span className="font-bold">cocode.dk</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${isActive('/')} transition-colors`}>
              Home
            </Link>
            <Link to="/software-development" className={`${isActive('/software-development')} transition-colors`}>
              Software Development
            </Link>
            <Link to="/ai-solutions" className={`${isActive('/ai-solutions')} transition-colors`}>
              AI Solutions
            </Link>
            <Link to="/cybersecurity" className={`${isActive('/cybersecurity')} transition-colors`}>
              Cybersecurity
            </Link>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-full text-sm">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}