'use client';

import { motion } from 'framer-motion';
import { X, Rocket } from 'lucide-react';

const ComingSoon = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8"
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Rocket className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-blue-500" />
          </motion.div>

          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Coming Soon!
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8"
          >
            We're working hard to bring you an amazing learning experience. Sign up to be notified when we launch!
          </motion.p>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-200"
            >
              Notify Me
            </button>
          </motion.form>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            We'll notify you as soon as we launch. No spam, promise!
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon;
