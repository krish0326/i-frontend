import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

// Fallback image for loading errors - using a data URI instead of external service
const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221920%22%20height%3D%221080%22%20viewBox%3D%220%200%201920%201080%22%3E%3Crect%20fill%3D%22%23333333%22%20width%3D%221920%22%20height%3D%221080%22%2F%3E%3Ctext%20fill%3D%22%23ffffff%22%20font-family%3D%22Arial%2CVerdana%2CSans-serif%22%20font-size%3D%2240%22%20text-anchor%3D%22middle%22%20x%3D%22960%22%20y%3D%22540%22%3EInterior%20Design%3C%2Ftext%3E%3C%2Fsvg%3E';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const [bgImageError, setBgImageError] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${bgImageError ? FALLBACK_IMAGE : 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'})`,
            backgroundPosition: 'center',
            backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6', // Fallback background color
          }}
        >
          {/* Preload image to detect loading errors */}
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="" 
            className="hidden" 
            onError={(e) => {
              console.log(`Hero background image loading error: ${e.target.src}`);
              setBgImageError(true);
            }} 
            crossOrigin="anonymous" // Try to avoid CORS issues
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-30'}`}></div>
          
          {/* Animated overlay gradients */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="container-custom relative z-10 text-white"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          <motion.h1 
            className="heading-primary mb-6 text-white"
            variants={itemVariants}
          >
            <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transforming Spaces
            </span>
            <span className="block bg-gradient-to-r from-pink-200 via-purple-200 to-white bg-clip-text text-transparent">
              Into Beautiful Experiences
            </span>
          </motion.h1>
          <motion.p 
            className="paragraph mb-8 text-white text-opacity-90"
            variants={itemVariants}
          >
            We create elegant, functional interiors that reflect your unique style and personality. 
            From concept to completion, our expert team brings your vision to life.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="gallery" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="btn-primary text-center"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div 
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          <Link 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="text-white cursor-pointer"
          >
            <svg 
              className="h-6 w-6 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
            <span className="text-sm mt-2 block">Scroll Down</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;