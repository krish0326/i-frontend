import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, useInView } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

// Fallback image for loading errors - using a data URI instead of external service
const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20fill%3D%22%23e0e0e0%22%20width%3D%22800%22%20height%3D%22600%22%2F%3E%3Ctext%20fill%3D%22%23666666%22%20font-family%3D%22Arial%2CVerdana%2CSans-serif%22%20font-size%3D%2230%22%20text-anchor%3D%22middle%22%20x%3D%22400%22%20y%3D%22300%22%3EInterior%20Designer%3C%2Ftext%3E%3C%2Fsvg%3E';

const About = () => {
  const { theme } = useContext(ThemeContext);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [imageError, setImageError] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };
  
  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 }
    }
  };
  
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5 + (i * 0.1), duration: 0.6 }
    })
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-50'}`}
    >
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* Image */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <motion.img 
                src={imageError ? FALLBACK_IMAGE : "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                alt="Interior designer working" 
                className="w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  console.log(`Image loading error in About section: ${e.target.src}`);
                  e.target.onerror = null; // Prevent infinite loop
                  setImageError(true);
                }}
                loading="lazy" // Add lazy loading for better performance
                crossOrigin="anonymous" // Try to avoid CORS issues
              />
            </div>
            <motion.div 
              className={`absolute -bottom-6 -right-6 ${theme === 'dark' ? 'bg-amber-600' : 'bg-amber-700'} p-6 rounded-lg shadow-lg hidden md:block`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-white font-serif text-xl">15+ Years of Excellence</p>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <div>
            <motion.h2 
              className={`heading-secondary mb-6 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}
              variants={itemVariants}
            >
              Crafting Beautiful Spaces Since 2008
            </motion.h2>
            <motion.p 
              className={`paragraph mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              variants={itemVariants}
            >
              At Elegance Interiors, we believe that your home should be a reflection of your personality, lifestyle, and aspirations. Our passion lies in transforming ordinary spaces into extraordinary environments that inspire and delight.
            </motion.p>
            <motion.p 
              className={`paragraph mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              variants={itemVariants}
            >
              Founded by award-winning designer Jane Smith, our studio brings together a team of talented professionals who share a commitment to exceptional design, quality craftsmanship, and personalized service. We work closely with each client to understand their unique needs and preferences, ensuring that every project is tailored to their specific vision.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              variants={itemVariants}
            >
              {[
                { value: '250+', label: 'Projects Completed' },
                { value: '15+', label: 'Years Experience' },
                { value: '18', label: 'Design Awards' },
                { value: '200+', label: 'Happy Clients' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  custom={index}
                  variants={statsVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className={`font-serif text-3xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                    {stat.value}
                  </p>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="services" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className={`btn-primary ${theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;