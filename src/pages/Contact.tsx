import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactForm } from '../components/ContactForm';
import { CompanyInfo } from '../components/CompanyInfo';
import { Section } from '../components/ui/Section';

export function Contact() {
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Modern office workspace with computers"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90" />
      </div>

      {/* Content */}
      <GoogleReCaptchaProvider reCaptchaKey="6LebH7IqAAAAANGIypOF3e5rtgycU6M11ZCIDmLS">
        <div className="relative z-10 container mx-auto px-6 py-16">
          <Section>
            <h1 className="text-4xl font-bold text-center mb-16 text-white">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Company Information */}
              <div>
                <CompanyInfo />
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </Section>
        </div>
      </GoogleReCaptchaProvider>
    </div>
  );
}
