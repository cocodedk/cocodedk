import { Code2, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-blue-400" />
              <span className="font-bold">cocode.dk</span>
            </div>
            <p className="text-gray-400">
              Building the future of digital experiences with security and AI at its core.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:contact@cocode.dk" className="text-gray-400 hover:text-blue-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> contact@cocode.dk
              </a>
              <p className="text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4" /> +45 12 34 56 78
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Copenhagen, Denmark
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-400">AI Solutions</a></li>
              <li><a href="#" className="hover:text-blue-400">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-blue-400">Consulting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Case Studies</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2024 cocode.dk. All rights reserved.</p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}