import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../components/ui/Section';

export function Consulting() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Strategic IT Consulting
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your business with expert guidance in digital transformation, AI integration, and technology strategy.
          </p>
        </motion.div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {consultingServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Consulting Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultingProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-6">Let's discuss how our consulting services can help you achieve your goals.</p>
          <a
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </Section>
    </div>
  );
}

const consultingServices = [
  {
    title: "Digital Transformation",
    description: "Navigate your digital transformation journey with expert guidance on modernizing systems, processes, and culture.",
  },
  {
    title: "AI Strategy",
    description: "Develop a comprehensive AI strategy to leverage artificial intelligence for competitive advantage.",
  },
  {
    title: "Technology Assessment",
    description: "Evaluate your current technology stack and receive recommendations for optimization and improvement.",
  },
  {
    title: "Innovation Consulting",
    description: "Identify opportunities for innovation and develop roadmaps for implementing new technologies.",
  },
  {
    title: "Process Optimization",
    description: "Streamline your business processes through technology-driven solutions and best practices.",
  },
  {
    title: "Change Management",
    description: "Successfully manage technological change with proven methodologies and expert support.",
  },
];

const consultingProcess = [
  {
    title: "Discovery & Assessment",
    description: "We begin by understanding your business objectives, challenges, and current technological landscape.",
  },
  {
    title: "Strategy Development",
    description: "Based on our findings, we create a tailored strategy that aligns with your goals and resources.",
  },
  {
    title: "Implementation Planning",
    description: "We develop a detailed roadmap for executing the strategy, including timelines and milestones.",
  },
  {
    title: "Execution Support",
    description: "Our team provides guidance and support throughout the implementation process.",
  },
];
