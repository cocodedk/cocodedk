import React from 'react';
import { Brain, MessageSquare, Shield, LineChart, Clock } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Chatbot Integration',
    description: 'Multilingual chatbots handling queries in Danish, Chinese, English and more, providing instant answers for customer service and company policies.'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'AI-powered analysis for policy compliance evaluation and security camera monitoring for incidents like fire, flooding, or break-ins.'
  },
  {
    icon: LineChart,
    title: 'Diagnostics & Insights',
    description: 'Perform system diagnostics and predict outcomes to improve efficiency and reduce downtime across your operations.'
  },
  {
    icon: Clock,
    title: 'Resource Optimization',
    description: 'Automate routine tasks and free up your workforce for strategic decision-making and high-impact initiatives.'
  }
];

export function AISolutions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
            alt="AI Technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="flex items-center justify-center mb-8">
            <Brain className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            Intelligent AI Integration for Your Business
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-12">
            <ul className="list-disc list-inside text-left">
              <li>Transform your business tools with intelligent AI integration tailored to your needs.</li>
              <li>At CoCode.dk, we specialize in adding AI capabilities to your existing applications.</li>
              <li>Enable data-driven efficiency without disrupting your workflow.</li>
            </ul>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Here's what we can do:</h2>

            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Chatbot Integration</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Answer customer queries with precision and speed</li>
                <li>Provide instant answers to company policy questions without relying on traditional search engines</li>
                <li>Support multilingual interactions—for example, queries in Danish, text in Chinese, and responses in English</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Security and Safety Analysis</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Evaluate security camera footage for incidents like fire, flooding, or break-ins</li>
                <li>Provide real-time situation analysis to improve response times</li>
                <li>Use AI to assess results and identify non-compliance with your company's policies</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-gray-800/50 p-6 rounded-xl flex gap-4 items-start">
                  <Icon className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let us help you unlock the full potential of AI in your business. With seamless integration and top-tier providers like OpenAI, Anthropic, or Hugging Face, your tools will evolve into intelligent, time-saving assets.
          </p>
        </div>
      </section>
    </div>
  );
}
