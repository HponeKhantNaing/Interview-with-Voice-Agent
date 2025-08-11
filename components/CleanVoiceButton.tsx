"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface CleanVoiceButtonProps {
  isActive?: boolean;
  isListening?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CleanVoiceButton = ({
  isActive = false,
  isListening = false,
  onClick,
  size = "md",
  className = "",
}: CleanVoiceButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const containerVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    active: { scale: 1.1 },
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.3, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const waveVariants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.4, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      whileTap="active"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"
        variants={pulseVariants}
        animate={isActive || isListening ? "animate" : "initial"}
      />

      {/* Main button container */}
      <motion.div
        className="relative bg-gradient-to-br from-white to-gray-100 rounded-full shadow-lg border border-gray-200"
        style={{
          boxShadow: isHovered
            ? "0 10px 30px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2)"
            : "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{
          boxShadow:
            "0 15px 40px rgba(59, 130, 246, 0.4), 0 0 30px rgba(147, 51, 234, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner glow when active */}
        {(isActive || isListening) && (
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30"
            variants={waveVariants}
            animate="animate"
          />
        )}

        {/* Voice icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              scale: isActive || isListening ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isActive || isListening ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            {/* Microphone icon */}
            <svg
              className={`${
                size === "lg"
                  ? "w-12 h-12"
                  : size === "sm"
                  ? "w-6 h-6"
                  : "w-8 h-8"
              } text-gray-700`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>

            {/* Animated dots when listening */}
            {isListening && (
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CleanVoiceButton;
