import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTA() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Let's work together to build secure, intelligent, and beautiful digital solutions.
          Book a free consultation today.
        </p>
        <button
          className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-8 py-3 rounded-full flex items-center gap-2 mx-auto"
          onClick={handleContactClick}
        >
          Contact Us <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
