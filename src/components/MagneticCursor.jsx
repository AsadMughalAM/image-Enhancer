import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { stiffness: 500, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const addMagnet = (e) => {
      if (e.target.closest('button, a, input, .magnetic')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };
    window.addEventListener('mouseover', addMagnet);
    return () => window.removeEventListener('mouseover', addMagnet);
  }, []);

  return createPortal(
    <motion.div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x,
        y,
        width: hovered ? 48 : 32,
        height: hovered ? 48 : 32,
        borderRadius: '50%',
        background: hovered
          ? 'radial-gradient(circle at 30% 30%, #60a5fa 60%, #1e3a8a 100%)'
          : 'radial-gradient(circle at 30% 30%, #a5b4fc 60%, #6366f1 100%)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'exclusion',
        boxShadow: hovered
          ? '0 0 24px 8px #60a5fa55, 0 0 0 2px #1e3a8a'
          : '0 0 12px 2px #6366f155',
        transition: 'width 0.2s, height 0.2s',
      }}
      animate={{ scale: hovered ? 1.2 : 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    />,
    document.body
  );
};

export default MagneticCursor; 