import React, { useContext } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { darkMode } = useContext(ThemeContext);
  
  const footerLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Gallery', to: 'gallery' },
    { name: 'Services', to: 'services' },
    { name: 'Testimonials', to: 'testimonials' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Pinterest', icon: 'pinterest', url: '#' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#' },
  ];

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const socialVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.footer 
      className={`pt-16 pb-8 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-beige-light text-gray-700'}`}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12"
          variants={childVariants}
        >
          <motion.div 
            className="col-span-1 md:col-span-1 lg:col-span-1"
            variants={childVariants}
          >
            <motion.h2 
              className={`font-serif text-2xl font-bold mb-4 ${darkMode ? 'text-beige-light' : 'text-earth-DEFAULT'}`}
              variants={childVariants}
            >
              ELEGANCE<span className={darkMode ? 'text-earth-light' : 'text-beige-dark'}>INTERIORS</span>
            </motion.h2>
            <motion.p 
              className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={childVariants}
            >
              Creating beautiful, functional spaces that reflect your unique style and personality.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={childVariants}
            >
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  className={`${darkMode ? 'text-beige-light hover:text-earth-light' : 'text-earth-DEFAULT hover:text-earth-dark'} transition-colors`}
                  aria-label={link.name}
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <SocialIcon icon={link.icon} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="col-span-1"
            variants={childVariants}
          >
            <motion.h3 
              className={`font-serif text-xl font-semibold mb-4 ${darkMode ? 'text-beige-light' : 'text-earth-DEFAULT'}`}
              variants={childVariants}
            >
              Quick Links
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={childVariants}
            >
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={childVariants}
                  custom={index}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={link.to}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`${darkMode ? 'text-gray-300 hover:text-beige-light' : 'text-gray-700 hover:text-earth-DEFAULT'} transition-colors cursor-pointer`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            className="col-span-1"
            variants={childVariants}
          >
            <motion.h3 
              className={`font-serif text-xl font-semibold mb-4 ${darkMode ? 'text-beige-light' : 'text-earth-DEFAULT'}`}
              variants={childVariants}
            >
              Services
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={childVariants}
            >
              {[
                'Residential Design',
                'Commercial Design',
                'Space Planning',
                'Furniture Selection',
                'Color Consultation'
              ].map((service, index) => (
                <motion.li 
                  key={service}
                  variants={childVariants}
                  custom={index}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="services"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`${darkMode ? 'text-gray-300 hover:text-beige-light' : 'text-gray-700 hover:text-earth-DEFAULT'} transition-colors cursor-pointer`}
                    >
                      {service}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            className="col-span-1"
            variants={childVariants}
          >
            <motion.h3 
              className={`font-serif text-xl font-semibold mb-4 ${darkMode ? 'text-beige-light' : 'text-earth-DEFAULT'}`}
              variants={childVariants}
            >
              Contact Us
            </motion.h3>
            <motion.address 
              className={`not-italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={childVariants}
            >
              <motion.p 
                className="mb-2"
                variants={childVariants}
                whileHover={{ x: 5 }}
              >
                123 Design Street
              </motion.p>
              <motion.p 
                className="mb-2"
                variants={childVariants}
                whileHover={{ x: 5 }}
              >
                New York, NY 10001
              </motion.p>
              <motion.p 
                className="mb-2"
                variants={childVariants}
                whileHover={{ x: 5 }}
              >
                Email: info@eleganceinteriors.com
              </motion.p>
              <motion.p 
                className="mb-2"
                variants={childVariants}
                whileHover={{ x: 5 }}
              >
                Phone: (123) 456-7890
              </motion.p>
            </motion.address>
          </motion.div>
        </motion.div>

        <motion.div 
          className={`border-t ${darkMode ? 'border-gray-700' : 'border-beige-dark'} pt-8`}
          variants={childVariants}
        >
          <motion.p 
            className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}
            variants={childVariants}
          >
            &copy; {currentYear} Elegance Interiors. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Social Icon Component
const SocialIcon = ({ icon }) => {
  switch (icon) {
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Footer;