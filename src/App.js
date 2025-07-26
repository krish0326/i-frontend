import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import Services from './components/services/Services';
import Stats from './components/home/Stats';
import Process from './components/home/Process';
import Features from './components/home/Features';
import PortfolioGallery from './components/gallery/PortfolioGallery';
import Testimonials from './components/testimonials/Testimonials';
import Pricing from './components/services/Pricing';
import FAQ from './components/home/FAQ';
import BeforeAfter from './components/home/BeforeAfter';
import Contact from './components/contact/Contact';
import AnimatedBackground from './components/layout/AnimatedBackground';
import ScrollProgress from './components/layout/ScrollProgress';
import Chatbot from './components/chatbot/Chatbot';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AnimatedBackground />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Stats />
          <Process />
          <Features />
          <PortfolioGallery />
          <Testimonials />
          <Pricing />
          <FAQ />
          <BeforeAfter />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;
