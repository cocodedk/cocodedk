import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTAButtons() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">
        Get Started <ChevronRight className="w-5 h-5" />
      </Button>
      <Button variant="outline">
        View Our Work
      </Button>
    </div>
  );
}