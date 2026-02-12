import React from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gold-400 text-white hover:bg-gold-500 shadow-lg hover:shadow-gold-400/30",
  secondary:
    "bg-transparent border-2 border-gold-400 text-gold-600 hover:bg-gold-50",
  ghost: "bg-transparent text-dark-700 hover:bg-light-200",
  glass:
    "bg-white/20 backdrop-blur-md border border-white/30 text-dark-800 hover:bg-white/40 shadow-glass",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex gap-2 justify-center items-center font-medium rounded-full transition-all duration-300  ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}>
      {children}
    </motion.button>
  );
}
