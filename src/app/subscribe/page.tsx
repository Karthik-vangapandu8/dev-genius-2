'use client';

import { motion } from 'framer-motion';
import UPIPayment from '@/components/UPIPayment';

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Join the <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Elite</span> Batch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Be one of the 50 students to get direct access to top companies. No traditional applications, just pure skill.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 dark:text-white">Early Bird Access</h2>
                <p className="text-gray-600 dark:text-gray-300">Limited time offer for the first batch</p>
              </div>
              <div className="text-center mt-4 md:mt-0">
                <div className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">₹1,000</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 line-through">₹2,000</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold dark:text-white">What you get:</h3>
                <ul className="space-y-3">
                  {[
                    "Access to real industry projects",
                    "Direct connection with 5 top companies",
                    "Personalized mentorship",
                    "Project-based learning approach",
                    "Industry-standard code reviews",
                    "Certificate of completion",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    >
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <UPIPayment />
              </div>
            </div>
          </motion.div>

          {/* Money Back Guarantee */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              100% Money Back Guarantee if not placed within 6 months of course completion*
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
