import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'The team at Elegance Interiors transformed our outdated living room into a stunning, modern space. Their attention to detail and creative vision exceeded our expectations. The project was completed on time and within budget.',
      project: 'Living Room Renovation',
      location: 'New York, NY'
    },
    {
      id: 2,
      name: 'Robert Chen',
      role: 'Restaurant Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'Working with Elegance Interiors for our restaurant redesign was an absolute pleasure. They understood our vision perfectly and created a space that not only looks beautiful but also enhances the dining experience for our customers.',
      project: 'Restaurant Interior Design',
      location: 'Los Angeles, CA'
    },
    {
      id: 3,
      name: 'Amanda Thompson',
      role: 'Real Estate Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'We\'ve worked with many interior designers, but Elegance Interiors stands out for their professionalism, creativity, and ability to deliver exceptional results consistently. They\'ve become our go-to partner for all our projects.',
      project: 'Luxury Condo Development',
      location: 'Miami, FL'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Tech CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'The office redesign project was a huge success. Our team productivity has increased significantly, and the modern, collaborative space perfectly reflects our company culture. Highly recommended!',
      project: 'Office Space Design',
      location: 'San Francisco, CA'
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      rating: 5,
      text: 'As a fellow designer, I can appreciate the level of craftsmanship and attention to detail that Elegance Interiors brings to every project. Their work is truly inspiring and sets the standard for excellence.',
      project: 'Kitchen & Bath Renovation',
      location: 'Chicago, IL'
    }
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection > 0) {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      }
    });
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
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
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-2xl"
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
          {[...Array(12)].map((_, i) => (
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
              <span className="text-3xl">💬</span>
            </div>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Hear from our satisfied clients about their experience working with our team
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className={`absolute w-full ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm p-8 md:p-12 border border-white/20`}
              >
                <div className="text-center">
                  {/* Rating Stars */}
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl text-yellow-400"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.blockquote
                    variants={itemVariants}
                    className={`text-lg md:text-xl italic mb-8 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.blockquote>

                  {/* Client Info */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center space-x-4 mb-6"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="text-left">
                      <h4 className={`font-bold text-lg ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </motion.div>

                  {/* Project Info */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center"
                  >
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                    }`}>
                      {testimonials[currentIndex].project}
                    </p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {testimonials[currentIndex].location}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            variants={itemVariants}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">‹</span>
          </motion.button>
          <motion.button
            variants={itemVariants}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">›</span>
          </motion.button>

          {/* Dots Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8 space-x-2"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : theme === 'dark'
                      ? 'bg-gray-600'
                      : 'bg-gray-300'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
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
            Join our satisfied clients and transform your space today
          </p>
          <motion.button
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;