'use client';

import { motion } from 'framer-motion';

const ComingSoon = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Coming Soon!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're working hard to bring you an amazing IDE experience. Stay tuned!
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon;
