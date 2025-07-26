import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const FAQ = () => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does a typical interior design project take?",
      answer: "Project timelines vary depending on scope and complexity. A single room refresh typically takes 2-4 weeks, while a full home renovation can take 3-6 months. We'll provide a detailed timeline during our initial consultation and keep you updated throughout the process.",
      category: "Timeline",
      icon: "⏰"
    },
    {
      question: "What is included in your comprehensive design services?",
      answer: "Our comprehensive design services include initial consultation, space planning, material selection, furniture sourcing, color schemes, lighting design, 3D visualizations, project management, and post-completion support. We handle every aspect of your transformation.",
      category: "Services",
      icon: "🎨"
    },
    {
      question: "Do you work with specific budgets and provide transparent pricing?",
      answer: "Yes, we work with various budgets and provide transparent pricing from the start. We'll help you maximize your investment while achieving your desired aesthetic. Our team is experienced in creating beautiful spaces at different price points.",
      category: "Pricing",
      icon: "💰"
    },
    {
      question: "Can you work with existing furniture and decor items?",
      answer: "Absolutely! We love incorporating existing pieces into new designs. We'll assess your current items and suggest how to integrate them with new additions for a cohesive look that reflects your personal style and saves you money.",
      category: "Furniture",
      icon: "🪑"
    },
    {
      question: "Do you handle the complete installation and construction process?",
      answer: "Yes, we offer full-service project management including coordination with contractors, installers, and vendors. We ensure quality control and timely completion of all aspects of your project, so you don't have to worry about managing multiple contractors.",
      category: "Installation",
      icon: "🔧"
    },
    {
      question: "What if I'm not completely satisfied with the final design?",
      answer: "Your satisfaction is our top priority. We include revision rounds in our packages and work closely with you to ensure the final design exceeds your expectations. We're committed to making sure you absolutely love your transformed space.",
      category: "Satisfaction",
      icon: "❤️"
    },
    {
      question: "Do you provide 3D visualizations and virtual walkthroughs?",
      answer: "Yes! We use advanced 3D rendering technology to create detailed visualizations of your space before any work begins. This allows you to see exactly how your space will look and make any adjustments before implementation.",
      category: "Technology",
      icon: "🖥️"
    },
    {
      question: "What warranty and post-completion support do you offer?",
      answer: "We provide comprehensive warranties on all our work and materials. Our post-completion support includes follow-up visits, maintenance guidance, and ongoing assistance to ensure your space continues to meet your needs and expectations.",
      category: "Support",
      icon: "🛡️"
    }
  ];

  const categories = ["All", "Timeline", "Services", "Pricing", "Furniture", "Installation", "Satisfaction", "Technology", "Support"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = activeCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={`relative py-20 overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 119, 198, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(120, 219, 255, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
        
        {/* Particle system */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 300 - 150],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">❓</span>
            </div>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to know about our interior design services and process
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
          className="max-w-4xl mx-auto"
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-6"
            >
              <motion.div
                className={`relative rounded-3xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50' 
                    : 'bg-white/50 backdrop-blur-sm hover:bg-white/70'
                } shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20 overflow-hidden`}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full px-8 py-6 text-left flex items-center justify-between ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="text-2xl"
                      animate={{ rotate: openIndex === index ? 360 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                      />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`px-8 pb-6 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className={`text-xl mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Still have questions? We're here to help!
          </p>
          <motion.button
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 