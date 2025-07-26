import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Services', to: 'services' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Contact', to: 'contact' },
  ];

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 } 
    }
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled 
        ? `${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md py-2` 
        : `${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-gray-800'} py-4`}`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container-custom flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          variants={linkVariants}
        >
          <Link to="home" className="cursor-pointer">
            <h1 className="font-serif text-2xl font-bold text-amber-700 dark:text-amber-500">ELEGANCE<span className={`${theme === 'dark' ? 'text-amber-300' : 'text-amber-900'}`}>INTERIORS</span></h1>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={linkVariants}>
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`cursor-pointer font-medium hover:text-amber-700 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={linkVariants}>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`btn-primary ${theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
            >
              Get Quote
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`hover:text-amber-700 focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.9 }}
            variants={linkVariants}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div 
        className="md:hidden absolute top-full left-0 right-0 z-20 overflow-hidden"
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div 
          className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg p-6`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={`hover:text-amber-700 transition-colors block`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + navLinks.length * 0.1 }}
            >
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`btn-primary text-center block ${theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;