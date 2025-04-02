'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Placeholder feedback data structure
const feedbacks = [
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  },
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  },
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  },
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  },
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  },
  {
    name: "Student Name",
    role: "Role / Background",
    image: "/feedback/avatar-placeholder.jpg",
    text: "Student feedback will appear here",
    rating: 5
  }
];

const Feedback = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#9333EA_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            Student Success Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from our community of learners who have transformed their coding journey with DEV Genius
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gray-400/30 dark:bg-[#171717]/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800/30 hover:bg-[#1a1a1a]/40 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="dark:text-white font-medium">{feedback.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feedback.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">{feedback.text}</p>
                  <div className="mt-4 flex text-blue-400 dark:text-purple-500">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming Soon Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block"
            >
              <h3 className="text-5xl font-bold dark:text-white mb-4">Coming Soon</h3>
            </motion.div>
            <p className="text-gray-700 dark:text-gray-400 text-xl">
              We're collecting amazing success stories from our students
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
