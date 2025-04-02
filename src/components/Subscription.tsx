'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const features = [
  "Access to all programming languages",
  "AI-powered code completion",
  "Real-time error detection",
  "Smart code suggestions",
  "Personalized learning path",
  "24/7 AI assistance",
  "Project-based learning",
  "Interactive coding exercises"
];

const Subscription = () => {
  return (
    <div id="subscription" className="relative py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            Start Your Coding Journey Today
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Get unlimited access to our AI-powered IDE and learn any programming language
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-400/30 dark:bg-[#171717]/30 backdrop-blur-xl rounded-2xl border border-gray-800/30 p-8 md:p-12 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-gradient text-5xl font-bold">₹1,000</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">/ lifetime</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">One-time payment, lifetime access</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-blue-500 dark:text-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-center"
          >
            <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 cursor-pointer text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity">
              Get Started Now
            </button>
          </motion.div>

          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-6">
            Secure payment • Instant access
          </p>
          
          <h2 className="text-gradient font-bold text-2xl text-center mt-6">
            Experience risk-free confidence <br /> 100% money-back guarantee if you're not satisfied!
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
