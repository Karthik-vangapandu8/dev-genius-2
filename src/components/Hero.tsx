'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ComingSoon from './ComingSoon';
import IDEPreview from './IDEPreview';

interface EnrollmentStatus {
  remaining: number;
  total: number;
  isFull: boolean;
  verifiedRegistrations: number;
}

const Hero = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [spotlightStyle, setSpotlightStyle] = useState<{ [key: string]: string }>({ '--x': '50%', '--y': '50%' });
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>({
    remaining: 50,
    total: 50,
    isFull: false,
    verifiedRegistrations: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpotlightStyle({ '--x': `${x}%`, '--y': `${y}%` });
      setIsSpotlightActive(true);
    };

    const handleMouseLeave = () => {
      setIsSpotlightActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial fetch
    fetchEnrollmentStatus();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchEnrollmentStatus, 30000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  const fetchEnrollmentStatus = async () => {
    try {
      const response = await fetch('/api/stats/registrations');
      const data = await response.json();
      setEnrollmentStatus({
        remaining: 50 - data.verifiedRegistrations,
        total: 50,
        isFull: data.verifiedRegistrations >= 50,
        verifiedRegistrations: data.verifiedRegistrations
      });
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

  const handleTryIDE = () => {
    const modal = document.getElementById('ide-modal');
    if (modal) {
      modal.classList.remove('hidden');
      // Prevent scrolling on the main content
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <div className="relative z-10 overflow-hidden">
      {showComingSoon && <ComingSoon onClose={() => setShowComingSoon(false)} />}
      <div className="relative min-h-screen">
        <div className="particles-background">
          <div className="code-grid" />
          <div 
            className={`spotlight ${isSpotlightActive ? 'active' : ''}`} 
            style={spotlightStyle} 
          />
        </div>
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
                <h1 className="relative font-outfit font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight dark:text-white">
                  {!enrollmentStatus.isFull ? (
                    <>
                      <motion.div 
                        className="overflow-hidden"
                        variants={textReveal}
                      >
                        <motion.span 
                          className="block"
                          key={enrollmentStatus.remaining}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {enrollmentStatus.remaining} Spots.
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
                        <span className="block">
                          1 Game-Changing Opportunity!
                        </span>
                      </motion.div>
                      <motion.div 
                        className="overflow-hidden mt-2"
                        variants={textReveal}
                      >
                        <span className="block font-bold text-blue-600">{enrollmentStatus.verifiedRegistrations} verified registrations</span>
                      </motion.div>
                      {enrollmentStatus.remaining < 10 && (
                        <motion.div 
                          className="overflow-hidden mt-2"
                          variants={textReveal}
                        >
                          <span className="block text-sm text-red-500 font-semibold animate-pulse">
                            Hurry! Spots are filling up fast
                          </span>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <span className="block">
                        See You Soon!
                      </span>
                      <span className="block text-2xl md:text-4xl text-gray-600 dark:text-gray-300">
                        First batch is now closed.
                      </span>
                      <span className="block text-xl md:text-2xl">
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
                  className="font-bold"
                  animate={{
                    color: ['#3b82f6', '#8b5cf6', '#3b82f6'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
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
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                >
                  Join Now
                </button>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 border-2 border-black dark:border-white rounded-lg font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 transform hover:scale-105"
                >
                  Learn More
                </a>
                <button
                  onClick={handleTryIDE}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg font-medium text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                >
                  Try IDE
                </button>
              </motion.div>
            </motion.div>

            {/* Right side: IDE Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl floating"
            >
              <IDEPreview />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
