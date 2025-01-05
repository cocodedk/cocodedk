import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { SoftwareDevelopment } from './pages/SoftwareDevelopment';
import { AISolutions } from './pages/AISolutions';
import { Cybersecurity } from './pages/Cybersecurity';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/software-development" element={<SoftwareDevelopment />} />
          <Route path="/ai-solutions" element={<AISolutions />} />
          <Route path="/cybersecurity" element={<Cybersecurity />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}