import React, { useContext, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

const Services = () => {
  const { theme } = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const serviceVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 }
    }
  };
  
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.6, duration: 0.5 }
    }
  };
  
  const services = [
    {
      id: 1,
      title: 'Residential Design',
      description: 'Transform your home into a beautiful, functional space that reflects your unique style and personality. Our residential design services cover everything from single rooms to entire homes.',
      icon: 'home',
    },
    {
      id: 2,
      title: 'Commercial Design',
      description: 'Create inspiring workspaces that enhance productivity, impress clients, and reflect your brand identity. We specialize in offices, retail spaces, restaurants, and more.',
      icon: 'office',
    },
    {
      id: 3,
      title: 'Space Planning',
      description: 'Optimize your space for functionality and flow with our expert space planning services. We will help you make the most of every square foot while creating a beautiful environment.',
      icon: 'layout',
    },
    {
      id: 4,
      title: 'Furniture Selection',
      description: 'Find the perfect pieces to complement your space with our furniture selection services. We will help you choose items that balance style, comfort, and functionality.',
      icon: 'furniture',
    },
    {
      id: 5,
      title: 'Color Consultation',
      description: 'Create the perfect atmosphere with our color consultation services. We will help you select a palette that enhances your space and creates the desired mood and ambiance.',
      icon: 'palette',
    },
    {
      id: 6,
      title: 'Project Management',
      description: 'Leave the details to us with our comprehensive project management services. We will coordinate contractors, manage timelines, and ensure your project is completed to the highest standards.',
      icon: 'clipboard',
    },
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-amber-50'}`}
    >
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className={`heading-secondary mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
            Our Services
          </h2>
          <p className={`paragraph max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            We offer a comprehensive range of interior design services to meet your unique needs and bring your vision to life.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg transition-all duration-300`}
              variants={serviceVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <motion.div 
                className={`mb-6 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ServiceIcon icon={service.icon} />
              </motion.div>
              <h3 className={`font-serif text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>{service.title}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>{service.description}</p>
              <motion.a 
                href="#contact" 
                className={`${theme === 'dark' ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'} font-medium transition-colors inline-flex items-center`}
                whileHover={{ x: 5 }}
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className={`mt-16 ${theme === 'dark' ? 'bg-amber-800' : 'bg-amber-700'} rounded-lg p-8 md:p-12 text-center`}
          variants={ctaVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-white">Ready to Transform Your Space?</h3>
          <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation and take the first step toward creating the space of your dreams.
          </p>
          <motion.a 
            href="#contact" 
            className={`inline-block ${theme === 'dark' ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' : 'bg-white text-amber-700 hover:bg-amber-50'} px-8 py-3 rounded font-medium transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Service Icon Component
const ServiceIcon = ({ icon }) => {
  switch (icon) {
    case 'home':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'office':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'layout':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case 'furniture':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'palette':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    default:
      return null;
  }
};

export default Services;