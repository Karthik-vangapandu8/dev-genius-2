'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import IDEPreview from './IDEPreview';
import ComingSoon from './ComingSoon';

const Hero = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

    return (
        <div className="relative z-10">
            {showComingSoon && <ComingSoon onClose={() => setShowComingSoon(false)} />}
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold mb-6 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        50 Students. 5 Companies.<br/>1 Game-Changing Opportunity!
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Limited spots for the first batch! Work on real industry projects & get hired without traditional job applications.
                    </motion.p>

                    <motion.h2
                        className="text-2xl md:text-4xl font-bold mb-4 dark:text-white mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Top Companies Are Hiring Problem-Solvers,<br/>Not Resume Writers!
                    </motion.h2>

                    <motion.p 
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Join DEV GENIUS and prove your skills through real-world challenges—No interviews, just results!
                    </motion.p>

                    <motion.div 
                        className="flex justify-center items-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button 
                            onClick={() => setShowComingSoon(true)}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Try IDE Now
                        </button>
                    </motion.div>

                    {/* IDE Preview */}
                    <IDEPreview />
                </div>
            </div>
        </div>
    );
};

export default Hero;
