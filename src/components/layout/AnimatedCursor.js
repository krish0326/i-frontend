import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      // Add hover state for links and buttons
      const links = document.querySelectorAll('a, button, .cursor-hover');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setCursorVariant('hover'));
        link.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      return () => {
        links.forEach(link => {
          link.removeEventListener('mouseenter', () => setCursorVariant('hover'));
          link.removeEventListener('mouseleave', () => setCursorVariant('default'));
        });
      };
    };

    // Call the function after a short delay to ensure DOM is fully loaded
    const timer = setTimeout(handleLinkHoverEvents, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(171, 104, 94, 0.1)',
      border: '1px solid rgba(171, 104, 94, 0.6)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(171, 104, 94, 0.2)',
      border: '1px solid rgba(171, 104, 94, 0.8)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    }
  };

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="cursor-dot-outline hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          mass: 0.3
        }}
        style={{
          height: 16,
          width: 16,
          backgroundColor: 'rgba(171, 104, 94, 0.4)',
        }}
      />
    </>
  );
};

export default AnimatedCursor;