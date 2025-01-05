import React from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: boolean;
}

export function Section({ 
  children, 
  className, 
  containerClassName,
  background = false 
}: SectionProps) {
  return (
    <section className={cn(
      'py-16',
      background && 'bg-gray-800/30',
      className
    )}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}