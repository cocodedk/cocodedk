import React from 'react';
import { cn } from '../../utils/cn';
import { gradients } from '../../utils/styles';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: keyof typeof gradients;
  className?: string;
}

export function GradientText({ 
  children, 
  variant = 'primary',
  className 
}: GradientTextProps) {
  return (
    <span className={cn(
      'text-transparent bg-clip-text bg-gradient-to-r',
      gradients[variant],
      className
    )}>
      {children}
    </span>
  );
}