import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function NavLink({ to, isActive, children }: NavLinkProps) {
  const activeClass = isActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400';
  
  return (
    <Link to={to} className={`${activeClass} transition-colors`}>
      {children}
    </Link>
  );
}