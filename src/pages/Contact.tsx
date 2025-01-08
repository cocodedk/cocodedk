import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactForm } from '../components/ContactForm';
import { CompanyInfo } from '../components/CompanyInfo';
import { Section } from '../components/ui/Section';

export function Contact() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LebH7IqAAAAANGIypOF3e5rtgycU6M11ZCIDmLS">
      <div className="py-16">
        <Section>
          <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>

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
  );
}
