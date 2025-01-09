import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { SoftwareDevelopment } from './pages/SoftwareDevelopment';
import { Consulting } from './pages/Consulting';
import { AISolutions } from './pages/AISolutions.tsx';
import { Cybersecurity } from './pages/Cybersecurity';
import { Contact } from './pages/Contact';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    document.title = "Cocode.dk - AI First Strategies";
  }, []);

  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplitPath: true
    }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-solutions" element={<AISolutions />} />
          <Route path="/software-development" element={<SoftwareDevelopment />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/cybersecurity" element={<Cybersecurity />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
