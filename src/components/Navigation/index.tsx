import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { ContactButton } from './ContactButton';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/software-development" isActive={isActive('/software-development')}>
              Software Development
            </NavLink>
            <NavLink to="/ai-solutions" isActive={isActive('/ai-solutions')}>
              AI Solutions
            </NavLink>
            <NavLink to="/cybersecurity" isActive={isActive('/cybersecurity')}>
              Cybersecurity
            </NavLink>
          </div>

          <ContactButton />
        </div>
      </div>
    </nav>
  );
}