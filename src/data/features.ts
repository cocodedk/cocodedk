import { Lock, Cpu, Clock, Users } from 'lucide-react';

export const features = [
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-grade security measures and continuous monitoring to keep your systems safe.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Solutions',
    description: 'Leverage the latest in artificial intelligence to give your business a competitive edge.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock technical support and monitoring for your peace of mind.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Seasoned professionals with decades of combined experience in tech.',
  }
] as const;