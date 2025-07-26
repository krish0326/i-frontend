import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactCompareImage from 'react-compare-image';
import { ThemeContext } from '../../context/ThemeContext';

// Sample before/after project data
const beforeAfterProjects = [
  {
    id: 1,
    title: 'Living Room Transformation',
    category: 'living',
    beforeImage: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Complete transformation of an outdated living room into a modern, bright space.'
  },
  {
    id: 2,
    title: 'Kitchen Renovation',
    category: 'kitchen',
    beforeImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A dated kitchen remodeled with modern appliances and an open concept design.'
  },
  {
    id: 3,
    title: 'Bedroom Makeover',
    category: 'bedroom',
    beforeImage: 'https://images.unsplash.com/photo-1536349788264-1b816db3cc13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Transforming a basic bedroom into a luxurious retreat with custom details.'
  },
  {
    id: 4,
    title: 'Bathroom Remodel',
    category: 'bathroom',
    beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Complete bathroom renovation with luxury fixtures and modern design.'
  }
];

const BeforeAfterGallery = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [activeProject, setActiveProject] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Preload images when component mounts or active project changes
  useEffect(() => {
    if (isOpen) {
      console.log('BeforeAfterGallery opened');
      setImagesLoaded(false);
      setImageLoadError(false);
      
      const preloadImages = () => {
        const beforeImg = new Image();
        const afterImg = new Image();
        let beforeLoaded = false;
        let afterLoaded = false;
        let hasError = false;

        const checkAllLoaded = () => {
          if ((beforeLoaded && afterLoaded) || hasError) {
            setImagesLoaded(true);
            setImageLoadError(hasError);
          }
        };

        beforeImg.onload = () => {
          console.log('Before image loaded successfully');
          beforeLoaded = true;
          checkAllLoaded();
        };

        afterImg.onload = () => {
          console.log('After image loaded successfully');
          afterLoaded = true;
          checkAllLoaded();
        };

        beforeImg.onerror = (error) => {
          console.error('Error loading before image:', error);
          hasError = true;
          checkAllLoaded();
        };

        afterImg.onerror = (error) => {
          console.error('Error loading after image:', error);
          hasError = true;
          checkAllLoaded();
        };

        beforeImg.src = beforeAfterProjects[activeProject].beforeImage;
        afterImg.src = beforeAfterProjects[activeProject].afterImage;
      };

      preloadImages();
    }
  }, [isOpen, activeProject]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleNext = () => {
    setActiveProject((prev) => (prev === beforeAfterProjects.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveProject((prev) => (prev === 0 ? beforeAfterProjects.length - 1 : prev - 1));
  };

  if (!isOpen) return null;

  const currentProject = beforeAfterProjects[activeProject];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      onClick={onClose}
    >
      <motion.div 
        className={`relative w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
          onClick={handlePrev}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
          onClick={handleNext}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="p-6 pb-0">
          <h2 className={`text-2xl font-serif font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {currentProject.title}
          </h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentProject.description}
          </p>
        </div>

        <div className="p-6">
          <div className="w-full h-[500px] rounded-lg overflow-hidden">
            {!imagesLoaded ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : imageLoadError ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500 mb-4">Error loading images</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <p className="mb-2 font-bold">Before</p>
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
                      <p>Image not available</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="mb-2 font-bold">After</p>
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
                      <p>Image not available</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ReactCompareImage
                leftImage={currentProject.beforeImage}
                rightImage={currentProject.afterImage}
                leftImageLabel="Before"
                rightImageLabel="After"
                sliderLineWidth={2}
                handleSize={40}
                sliderPositionPercentage={0.5}
                hover={false}
                onError={(e) => {
                  console.error('ReactCompareImage error:', e);
                  setImageLoadError(true);
                }}
              />
            )}
          </div>
        </div>

        <div className="p-6 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <span className={`font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
              {activeProject + 1}/{beforeAfterProjects.length}
            </span>
          </div>
          <div className="flex space-x-2">
            {beforeAfterProjects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeProject === index 
                  ? (theme === 'dark' ? 'bg-amber-400' : 'bg-amber-700') 
                  : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')}`}
                onClick={() => setActiveProject(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BeforeAfterGallery;