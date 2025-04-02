"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Code2, Brain, Zap } from 'lucide-react';

interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Interactive Learning",
    description:
      "Learn coding concepts through interactive exercises and real-time AI feedback on your code.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Code Analysis",
    description:
      "Our AI analyzes your code for best practices, suggests improvements, and helps you write better code.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Personalized Guidance",
    description:
      "Get tailored learning paths and recommendations based on your coding style and progress.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Practice & Projects",
    description:
      "Apply your skills to real-world projects with AI assistance and build your portfolio.",
  },
];

const HowItWorksSection = () => {
  const scrollToLanguages = () => {
    const languagesSection = document.getElementById('languages');
    if (languagesSection) {
      languagesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Supercharge</span> Your Learning
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Experience a revolutionary way to master programming with our AI-powered platform
          </p>
        </motion.div>

        <div className="flex gap-20">
          {/* Left Sticky Section */}
          <div className="w-1/3">
            <div className="sticky top-[100px] p-8 rounded-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center rounded-xl"
              >
                <h2 className="text-4xl font-bold dark:text-white mb-4">Learn with AI</h2>
                <p className="text-gray-600 dark:text-gray-400 text-md leading-5 mb-6">
                  Experience the future of coding education with our AI-powered learning platform. Get real-time feedback and guidance as you code.
                </p>
                <motion.button 
                  onClick={scrollToLanguages}
                  className="px-8 py-3 text-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white rounded-lg transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Section with Steps */}
          <div className="w-2/3 flex flex-col gap-24">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500 text-white">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
