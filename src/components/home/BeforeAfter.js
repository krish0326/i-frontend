import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import InteractiveSlider from './InteractiveSlider';

const BeforeAfter = () => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const transformations = [
    {
      id: 1,
      title: "Living Room Transformation",
      description: "From outdated to modern elegance",
      beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Living Room"
    },
    {
      id: 2,
      title: "Kitchen Makeover",
      description: "Complete kitchen renovation with modern appliances",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Kitchen"
    },
    {
      id: 3,
      title: "Bedroom Sanctuary",
      description: "Creating a peaceful retreat for relaxation",
      beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Bedroom"
    },
    {
      id: 4,
      title: "Bathroom Renovation",
      description: "Luxury bathroom with spa-like features",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Bathroom"
    }
  ];

  const categories = ["All", "Living Room", "Kitchen", "Bedroom", "Bathroom"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const filteredTransformations = activeIndex === 0 
    ? transformations 
    : transformations.filter(item => item.category === categories[activeIndex]);

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Before & After
            </span>
            <span className="block">Transformations</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            See the incredible transformations we've created for our clients
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredTransformations.map((transformation, index) => (
            <motion.div
              key={transformation.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className={`relative rounded-2xl overflow-hidden ${
                  theme === 'dark' 
                    ? 'bg-gray-800' 
                    : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                whileHover={{ scale: 1.02 }}
              >
                                 {/* Interactive Slider */}
                 <InteractiveSlider
                   beforeImage={transformation.beforeImage}
                   afterImage={transformation.afterImage}
                   title={transformation.title}
                 />
                
                                 {/* Description */}
                 <div className="p-6">
                   <p className={`text-sm mb-4 ${
                     theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                   }`}>
                     {transformation.description}
                   </p>
                   
                   {/* Stats */}
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                       <div className="text-center">
                         <div className={`text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                           85%
                         </div>
                         <div className={`text-xs ${
                           theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                         }`}>
                           Improvement
                         </div>
                       </div>
                       <div className="text-center">
                         <div className={`text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                           3 weeks
                         </div>
                         <div className={`text-xs ${
                           theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                         }`}>
                           Timeline
                         </div>
                       </div>
                     </div>
                     
                     <motion.button
                       className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       View Details
                     </motion.button>
                   </div>
                 </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Ready for Your Transformation?
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's create something extraordinary together. Start your journey to a beautiful, 
            functional space that reflects your unique style.
          </p>
          <motion.button
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter; 