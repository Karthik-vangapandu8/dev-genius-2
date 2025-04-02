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
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Supercharge Your Learning
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Experience a revolutionary way to master programming with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16">
          <motion.button 
            onClick={scrollToLanguages}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-all duration-200 shadow-lg"
          >
            Start Learning
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
