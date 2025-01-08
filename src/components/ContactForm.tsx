import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const contactReasons = [
  { value: 'software', label: 'Software Development' },
  { value: 'ai', label: 'AI Solutions' },
  { value: 'security', label: 'Cybersecurity' },
  { value: 'consulting', label: 'General Consulting' },
  { value: 'other', label: 'Other' }
] as const;

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  reason: Yup.string().required('Please select a reason for contact'),
  message: Yup.string()
});

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      reason: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha('contact_form');

        // Send form data along with the reCAPTCHA token to the backend
        const response = await fetch('/.netlify/functions/form-handler', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            'g-recaptcha-response': token
          }),
        });

        const result = await response.json();
        console.log(result);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...formik.getFieldProps('phone')}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium mb-2">
          Reason for Contact *
        </label>
        <select
          id="reason"
          {...formik.getFieldProps('reason')}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a reason</option>
          {contactReasons.map(reason => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
        {formik.touched.reason && formik.errors.reason && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.reason}</div>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          {...formik.getFieldProps('message')}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
