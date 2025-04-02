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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div 
          className="text-center space-y-16 md:space-y-20"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Main Heading */}
          <motion.div variants={item} className="space-y-6">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
              <h1 className="relative font-outfit font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight dark:text-white">
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
              className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-space-grotesk"
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
          </motion.div>

          {/* Secondary Heading */}
          <motion.div variants={item} className="space-y-6">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl"
                variants={glowVariants}
                initial="initial"
                animate="animate"
              />
              <h2 className="relative text-4xl md:text-6xl font-bold dark:text-white leading-tight font-outfit">
                <span className="block">Top Companies Are Hiring</span>
                <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Problem-Solvers,
                </span>
                <span className="block font-space-grotesk">Not Resume Writers!</span>
              </h2>
            </div>
            <motion.p 
              className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-space-grotesk"
            >
              Join{" "}
              <motion.span
                className="text-gradient font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              >
                DEV GENIUS
              </motion.span>{" "}
              and prove your skills through real-world challenges—
              <motion.span
                className="font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                No interviews, just results!
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item}>
            <motion.button
              onClick={() => setShowComingSoon(true)}
              className="relative px-10 py-5 text-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transform transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] font-space-grotesk"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Try IDE Now</span>
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: 'blur(8px)' }}
              />
            </motion.button>
          </motion.div>

          {/* IDE Preview */}
          <motion.div 
            variants={item}
            className="relative mt-16"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <IDEPreview />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
