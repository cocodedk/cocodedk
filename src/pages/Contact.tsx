import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ContactForm } from '../components/ContactForm';
import { CompanyInfo } from '../components/CompanyInfo';
import { GoogleMap } from '../components/GoogleMap';
import { Section } from '../components/ui/Section';

export function Contact() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="YOUR_RECAPTCHA_SITE_KEY">
      <div className="py-16">
        <Section>
          <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Company Information */}
            <div>
              <CompanyInfo />
              <div className="mt-8 h-[400px]">
                <GoogleMap />
              </div>
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
