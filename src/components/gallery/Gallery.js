import React, { useState, useContext, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import BeforeAfterGallery from './BeforeAfterGallery';

// Fallback image for loading errors - using a data URI instead of external service
const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20fill%3D%22%23e9e9e9%22%20width%3D%22800%22%20height%3D%22600%22%2F%3E%3Ctext%20fill%3D%22%23666666%22%20font-family%3D%22Arial%2CVerdana%2CSans-serif%22%20font-size%3D%2224%22%20text-anchor%3D%22middle%22%20x%3D%22400%22%20y%3D%22300%22%3EImage%20Not%20Available%3C%2Ftext%3E%3C%2Fsvg%3E';

const Gallery = () => {
  const { theme } = useContext(ThemeContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
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
  
  const filterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        delay: 0.3, 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const filterItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        delay: 0.4, 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const projectVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 }
    }
  };
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'living', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'office', name: 'Office' },
  ];
  
  const projects = [
    {
      id: 1,
      title: 'Modern Minimalist Living Room',
      category: 'living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Contemporary Bedroom Design',
      category: 'bedroom',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Luxury Kitchen Renovation',
      category: 'kitchen',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Elegant Bathroom Design',
      category: 'bathroom',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Modern Home Office',
      category: 'office',
      image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'Scandinavian Living Room',
      category: 'living',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      title: 'Cozy Master Bedroom',
      category: 'bedroom',
      // Using a different image URL to avoid the ERR_BLOCKED_BY_ORB error
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      title: 'Industrial Kitchen Design',
      category: 'kitchen',
      image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className={`heading-secondary mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
            Our Project Gallery
          </h2>
          <p className={`paragraph max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore our portfolio of stunning interior design projects. Each space tells a unique story and showcases our commitment to exceptional design.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-2"
          variants={filterVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${activeFilter === filter.id 
                ? (theme === 'dark' ? 'bg-amber-600 text-white' : 'bg-amber-700 text-white') 
                : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-amber-50 text-gray-700 hover:bg-amber-200')}`}
              variants={filterItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          layout
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
              variants={projectVariants}
              layout
              whileHover={{ y: -5 }}
            >
              <motion.img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-80 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  console.log(`Image loading error for ${project.title}: ${e.target.src}`);
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = FALLBACK_IMAGE;
                }}
                loading="lazy" // Add lazy loading for better performance
                crossOrigin="anonymous" // Try to avoid CORS issues
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div 
                  className="text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h3 className="text-white font-serif text-xl font-semibold mb-2">{project.title}</h3>
                  <motion.button 
                    className={`text-white border border-white px-4 py-2 rounded hover:bg-white ${theme === 'dark' ? 'hover:text-amber-600' : 'hover:text-amber-700'} transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button 
            className={`btn-secondary ${theme === 'dark' ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900' : ''} flex items-center justify-center mx-auto space-x-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBeforeAfter(true)}
          >
            <span>View Before/After Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* Before/After Gallery Modal */}
        <BeforeAfterGallery 
          isOpen={showBeforeAfter} 
          onClose={() => setShowBeforeAfter(false)} 
        />
      </div>
    </section>
  );
};

export default Gallery;