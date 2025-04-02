'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ComingSoon from './ComingSoon';
import IDEPreview from './IDEPreview';

interface EnrollmentStatus {
  remaining: number;
  total: number;
  isFull: boolean;
}

const Hero = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>({
    remaining: 50,
    total: 50,
    isFull: false
  });

  useEffect(() => {
    // Initial fetch
    fetchEnrollmentStatus();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchEnrollmentStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchEnrollmentStatus = async () => {
    try {
      const response = await fetch('/api/enrollment');
      const data = await response.json();
      setEnrollmentStatus(data);
    } catch (error) {
      console.error('Failed to fetch enrollment status:', error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textReveal = {
    hidden: { width: "0%" },
    show: { 
      width: "100%",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative z-10 overflow-hidden">
      {showComingSoon && <ComingSoon onClose={() => setShowComingSoon(false)} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
          {/* Left side: Hero content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left space-y-8"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
                animate="animate"
              />
              <motion.div
                className="absolute -bottom-8 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
                animate="animate"
              />
              <motion.div
                className="absolute -top-4 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                animate="animate"
              />
              <h1 className="relative font-outfit font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight dark:text-white">
                {!enrollmentStatus.isFull ? (
                  <>
                    <motion.div 
                      className="overflow-hidden"
                      variants={textReveal}
                    >
                      <motion.span 
                        className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                        key={enrollmentStatus.remaining}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {enrollmentStatus.remaining} Students.
                      </motion.span>
                    </motion.div>
                    <motion.div 
                      className="overflow-hidden mt-2"
                      variants={textReveal}
                    >
                      <span className="block font-space-grotesk">5 Companies.</span>
                    </motion.div>
                    <motion.div 
                      className="overflow-hidden mt-2"
                      variants={textReveal}
                    >
                      <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                        1 Game-Changing Opportunity!
                      </span>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                      See You Soon!
                    </span>
                    <span className="block text-2xl md:text-4xl text-gray-600 dark:text-gray-300">
                      First batch is now closed.
                    </span>
                    <span className="block text-xl md:text-2xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                      Join the waitlist for next batch!
                    </span>
                  </motion.div>
                )}
              </h1>
            </div>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-space-grotesk"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <motion.span
                className="text-gradient font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              >
                Limited spots
              </motion.span>{" "}
              for the first batch! Work on real industry projects & get hired without traditional job applications.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <button
                onClick={() => setShowComingSoon(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-200 transform hover:scale-105"
              >
                Join Now
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200 transform hover:scale-105"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Right side: IDE Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl"
          >
            <IDEPreview />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
