import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Team = () => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Lead Interior Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'With over 10 years of experience, Sarah specializes in creating luxurious and functional spaces that reflect her clients\' unique personalities.',
      expertise: ['Residential Design', 'Luxury Interiors', 'Space Planning', 'Color Theory'],
      experience: '10+ Years',
      projects: '150+ Projects',
      social: {
        linkedin: '#',
        instagram: '#',
        pinterest: '#'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Senior Designer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'Michael brings a modern perspective to interior design, focusing on sustainable materials and innovative solutions.',
      expertise: ['Commercial Design', 'Sustainable Design', 'Modern Aesthetics', 'Project Management'],
      experience: '8+ Years',
      projects: '120+ Projects',
      social: {
        linkedin: '#',
        instagram: '#',
        pinterest: '#'
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Kitchen & Bath Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'Emily is passionate about creating beautiful and functional kitchens and bathrooms that enhance daily living.',
      expertise: ['Kitchen Design', 'Bathroom Design', 'Cabinetry', 'Fixtures & Appliances'],
      experience: '6+ Years',
      projects: '90+ Projects',
      social: {
        linkedin: '#',
        instagram: '#',
        pinterest: '#'
      }
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'David ensures every project runs smoothly from concept to completion, managing timelines and coordinating with contractors.',
      expertise: ['Project Management', 'Contractor Coordination', 'Timeline Management', 'Quality Control'],
      experience: '12+ Years',
      projects: '200+ Projects',
      social: {
        linkedin: '#',
        instagram: '#',
        pinterest: '#'
      }
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
    <section className={`relative py-20 overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
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
        
        {/* Particle grid */}
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
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
                delay: i * 0.3,
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
              <span className="text-3xl">👥</span>
            </div>
          </motion.div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our talented team of designers and project managers work together to bring your vision to life with creativity and precision
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                className={`relative p-6 rounded-3xl ${
                  theme === 'dark' 
                    ? 'bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50' 
                    : 'bg-white/50 backdrop-blur-sm hover:bg-white/70'
                } shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
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
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  {/* Profile Image */}
                  <motion.div
                    className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                  
                  {/* Member Info */}
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {member.name}
                    </h3>
                    <p className={`text-sm font-medium mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                      {member.position}
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {member.description}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-center space-x-6 mb-6">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {member.experience}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Experience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {member.projects}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Projects
                      </div>
                    </div>
                  </div>
                  
                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 text-center ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Expertise
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-2 py-1 text-xs rounded-full ${
                            theme === 'dark' 
                              ? 'bg-gray-600/50 text-gray-300' 
                              : 'bg-gray-100/50 text-gray-600'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gray-600/50 text-gray-300' 
                            : 'bg-gray-100/50 text-gray-600'
                        }`}>
                          +{member.expertise.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        href={url}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-gray-600/50 text-gray-300 hover:bg-gray-500/50' 
                            : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
                        } transition-colors`}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-sm">
                          {platform === 'linkedin' ? '💼' : platform === 'instagram' ? '📷' : '📌'}
                        </span>
                      </motion.a>
                    ))}
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
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className={`text-xl mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to work with our expert team?
          </p>
          <motion.button
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team; 