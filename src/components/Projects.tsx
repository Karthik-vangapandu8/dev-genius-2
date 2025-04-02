'use client';

import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Featured Projects
                </motion.h2>
                
                {/* Project grid will go here */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Add project cards here */}
                </div>
            </div>
        </section>
    );
};

export default Projects;
