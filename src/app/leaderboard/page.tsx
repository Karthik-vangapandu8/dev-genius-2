'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';

const podiumPositions = [
  { place: 2, icon: <Medal className="w-6 h-6" />, color: "from-gray-400 to-gray-300" },
  { place: 1, icon: <Crown className="w-6 h-6" />, color: "from-yellow-400 to-yellow-300" },
  { place: 3, icon: <Star className="w-6 h-6" />, color: "from-amber-600 to-amber-500" },
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.1)_0%,_transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="text-center">
          {/* Trophy Animation */}
          <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [-10, 10, -10], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-8 inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Main Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500"
          >
            Glory Awaits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-xl mx-auto"
          >
            Compete with the best developers worldwide. Climb the ranks, earn rewards, 
            and prove your coding prowess.
          </motion.p>

          {/* Podium Animation */}
          <div className="flex justify-center items-end gap-4 mb-12">
            {podiumPositions.map((pos, index) => (
              <motion.div
                key={pos.place}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`relative ${pos.place === 1 ? 'h-32' : 'h-24'}`}
              >
                <div className={`w-20 bg-gradient-to-br ${pos.color} rounded-t-lg h-full flex items-center justify-center`}>
                  <span className="absolute -top-8">{pos.icon}</span>
                  <span className="text-2xl font-bold text-white">#{pos.place}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
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

      {/* Animated Target Icons */}
      {[...Array(5)].map((_, i) => (
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
          className="absolute text-yellow-400/30"
        >
          <Target className="w-4 h-4" />
        </motion.div>
      ))}
    </div>
  );
}
