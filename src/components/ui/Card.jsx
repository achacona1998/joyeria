import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, boxShadow: "0 20px 40px -5px rgba(0,0,0,0.1)" } : {}}
      className={`
        glass p-6 rounded-2xl border border-white/60
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
