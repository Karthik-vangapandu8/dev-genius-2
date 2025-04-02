'use client';

import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: <Code2 className="w-5 h-5" />, text: "Real-World Projects" },
  { icon: <Building2 className="w-5 h-5" />, text: "Top Companies" },
  { icon: <Users className="w-5 h-5" />, text: "Direct Hiring" },
];

export default function Hiring() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.1)_0%,_transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center">
          {/* Rocket Animation */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8 inline-block"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500 rounded-2xl flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white transform -rotate-45" />
            </div>
          </motion.div>

          {/* Main Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500"
          >
            Launching Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-xl mx-auto"
          >
            We're building a revolutionary hiring platform that connects talented developers 
            with innovative companies. Be the first to know when we launch.
          </motion.p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-gray-400/30 dark:bg-[#171717]/30 backdrop-blur-sm p-4 rounded-xl border border-gray-400/30 dark:border-gray-800/30"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-green-500/20 dark:from-purple-500/20 dark:to-pink-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  {feature.icon}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowRight className="w-4 h-4 transform rotate-180 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 1000 - 500,
            y: Math.random() * 1000 - 500
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: i * 0.8
          }}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
        />
      ))}
    </div>
  );
}
