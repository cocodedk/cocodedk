import React from 'react';
import { Brain, Workflow, Database, Bot } from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: 'Seamless Integration',
    description: 'Connect AI capabilities to your existing systems without disrupting workflows'
  },
  {
    icon: Database,
    title: 'Data-Driven Insights',
    description: 'Transform raw data into actionable intelligence with advanced AI analysis'
  },
  {
    icon: Bot,
    title: 'Intelligent Automation',
    description: 'Automate complex tasks with AI-powered decision making and processing'
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
            Integrating AI into Your Current Ecosystem
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto text-center leading-relaxed mb-12">
            Transform your existing business tools into intelligent, data-driven powerhouses with seamless AI integration. At CoCode.dk, we leverage top-tier AI providers—like OpenAI, Anthropic, or Hugging Face—to enhance your current applications without disrupting your workflow.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Expert AI Integration</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Our expert team connects your systems to cutting-edge AI through robust APIs, enabling advanced data analysis, natural language understanding, and intelligent automation. The result? Smarter decisions, streamlined operations, and a more innovative way to engage with both your data and your customers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Let us help you unlock new possibilities and stay ahead in the AI era.
            </p>
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
      </section>
    </div>
  );
}