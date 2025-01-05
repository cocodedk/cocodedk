import { Code2, Brain, Shield } from 'lucide-react';

export const services = [
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software solutions that drive efficiency, reliability, and growth.',
    features: ['Python & Web Frameworks', 'Android Development', 'API Integration', 'Agile Development'],
    color: 'text-blue-400',
    path: '/software-development'
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Intelligent systems and AI integration to automate and enhance your digital presence.',
    features: ['ChatGPT Integration', 'Custom AI Models', 'Process Automation', 'Predictive Analytics'],
    color: 'text-purple-400',
    path: '/ai-solutions'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    features: ['Penetration Testing', 'Security Audits', 'Compliance Solutions', '24/7 Monitoring'],
    color: 'text-green-400',
    path: '/cybersecurity'
  }
] as const;