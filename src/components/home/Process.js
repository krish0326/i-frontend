import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Process = () => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We begin with a comprehensive consultation to understand your vision, lifestyle, and specific requirements for your space transformation.',
      icon: '💬',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-400/20 to-cyan-400/20',
      features: ['Space assessment', 'Style preferences', 'Budget discussion', 'Timeline planning']
    },
    {
      number: '02',
      title: 'Design Concept & Planning',
      description: 'Our expert designers create detailed concepts, 3D visualizations, and comprehensive plans that bring your vision to life.',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-400/20 to-pink-400/20',
      features: ['3D renderings', 'Material selection', 'Color schemes', 'Furniture layout']
    },
    {
      number: '03',
      title: 'Implementation & Execution',
      description: 'Our skilled team carefully executes every detail with precision, ensuring quality craftsmanship and attention to every element.',
      icon: '🔨',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-400/20 to-red-400/20',
      features: ['Professional installation', 'Quality control', 'Project management', 'Timeline adherence']
    },
    {
      number: '04',
      title: 'Final Reveal & Support',
      description: 'Experience the magic as we reveal your transformed space, followed by ongoing support to ensure your complete satisfaction.',
      icon: '✨',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-400/20 to-emerald-400/20',
      features: ['Space reveal', 'Final walkthrough', 'Warranty support', 'Post-completion care']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <section className={`relative py-20 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🏠</span>
            </div>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Our Design Process
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A proven methodology that transforms your vision into reality with precision and creativity
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-0"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: index * 0.4 + 0.5, duration: 1 }}
                />
              )}
              
              <motion.div
                className={`relative p-8 rounded-3xl ${
                  theme === 'dark' 
                    ? 'bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50' 
                    : 'bg-white/50 backdrop-blur-sm hover:bg-white/70'
                } shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  {/* Step number with animation */}
                  <motion.div
                    className={`text-7xl font-bold mb-6 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: index * 0.4, type: "spring", stiffness: 200 }}
                  >
                    {step.number}
                  </motion.div>
                  
                  {/* Icon with floating animation */}
                  <motion.div
                    className="text-6xl mb-6 inline-block"
                    initial={{ scale: 0, y: 50 }}
                    animate={isInView ? { scale: 1, y: 0 } : { scale: 0, y: 50 }}
                    transition={{ delay: index * 0.4 + 0.2, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className={`flex items-center text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.4 + featureIndex * 0.1 }}
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3`}
                          whileHover={{ scale: 1.5 }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process; 