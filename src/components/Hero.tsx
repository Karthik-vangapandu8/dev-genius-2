'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import IDEPreview from './IDEPreview';

const Hero = () => {
    return (
        <div className="relative z-10">
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold mb-8 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Are you <span className="text-gradient">smart</span>?
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Unleash your coding potential with our intelligent IDE and interactive challenges. Join the next generation of developers.
                    </motion.p>

                    <motion.div 
                        className="flex justify-center items-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link 
                            href="/ide"
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Try IDE Now
                        </Link>
                    </motion.div>

                    {/* IDE Preview */}
                    <IDEPreview />
                </div>
            </div>
        </div>
    );
};

export default Hero;
