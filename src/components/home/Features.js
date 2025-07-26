import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Features = () => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const features = [
    {
      icon: '🏠',
      title: 'Custom Design Excellence',
      description: 'Every project is uniquely crafted to reflect your personal style, lifestyle, and vision. We create spaces that tell your story.',
      gradient: 'from-blue-500 to-cyan-500',
      benefits: ['Personalized approach', 'Style consultation', 'Custom solutions', 'Unique designs']
    },
    {
      icon: '🎯',
      title: 'Premium Quality Materials',
      description: 'We source only the finest materials and finishes from trusted suppliers, ensuring lasting beauty and durability.',
      gradient: 'from-purple-500 to-pink-500',
      benefits: ['High-end materials', 'Durable finishes', 'Quality assurance', 'Warranty backed']
    },
    {
      icon: '⚡',
      title: 'Efficient Project Management',
      description: 'Our streamlined process ensures timely completion without compromising on quality or attention to detail.',
      gradient: 'from-orange-500 to-red-500',
      benefits: ['Timeline adherence', 'Quality control', 'Regular updates', 'On-time delivery']
    },
    {
      icon: '💎',
      title: 'White-Glove Service',
      description: 'Experience luxury service from initial consultation to final reveal, with ongoing support and care.',
      gradient: 'from-green-500 to-emerald-500',
      benefits: ['Personal attention', 'Dedicated support', 'Post-completion care', 'Satisfaction guarantee']
    },
    {
      icon: '🔧',
      title: 'Expert Craftsmanship',
      description: 'Our team of experienced designers and skilled craftsmen bring decades of combined expertise to every project.',
      gradient: 'from-indigo-500 to-purple-500',
      benefits: ['Expert designers', 'Skilled craftsmen', 'Years of experience', 'Professional team']
    },
    {
      icon: '🌟',
      title: 'Comprehensive Warranty',
      description: 'We stand behind our work with comprehensive warranties on all materials and craftsmanship.',
      gradient: 'from-yellow-500 to-orange-500',
      benefits: ['Full warranty', 'Peace of mind', 'Quality guarantee', 'Long-term support']
    }
  ];

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
    hidden: { opacity: 0, y: 60, scale: 0.8 },
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
    <section className={`relative py-20 overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-2xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-orange-400/3 to-red-400/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Particle grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
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
              <span className="text-3xl">⭐</span>
            </div>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We combine creativity, expertise, and unwavering commitment to deliver exceptional results that exceed expectations
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className={`relative p-8 rounded-3xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50' 
                    : 'bg-white/50 backdrop-blur-sm hover:bg-white/70'
                } shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 15}%`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  {/* Icon with enhanced animation */}
                  <motion.div
                    className={`text-6xl mb-6 inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                  
                  {/* Benefits list */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        className={`flex items-center text-xs ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.2 + benefitIndex * 0.1 }}
                      >
                        <motion.div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} mr-2`}
                          whileHover={{ scale: 1.5 }}
                        />
                        {benefit}
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

export default Features; 