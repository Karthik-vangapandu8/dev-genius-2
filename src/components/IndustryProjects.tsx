'use client';

import { motion, useAnimation } from 'framer-motion';
import { Building2, Code2, Users, Briefcase, ArrowRight, MousePointer2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const features = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Partner Companies",
    description: "Work on real projects from leading tech companies and startups"
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Real-World Problems",
    description: "Solve actual coding challenges and contribute to production code"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Direct Hiring",
    description: "Get noticed by companies and fast-track your way to employment"
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Internship Opportunities",
    description: "Secure internships by demonstrating your practical skills"
  }
];

const IndustryProjects = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const controls = useAnimation();

  const handleReveal = () => {
    setIsRevealed(true);
    controls.start("visible");
  };

  return (
    <section className="relative py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#9333EA_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            <span className="text-gradient">Hiring</span> Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Bridge the gap between learning and employment. Work on real industry projects, 
            showcase your skills, and get hired by top companies.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Side - Features with Reveal Effect */}
          <div className="relative" onMouseEnter={handleReveal}>
            {/* Blur Overlay */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isRevealed ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 backdrop-blur-xl bg-gray-400/50 dark:bg-[#171717]/50 z-10 flex items-center justify-center rounded-xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isRevealed ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-center p-8"
              >
                <MousePointer2 className="w-8 h-8 dark:text-purple-400 text-blue-600 mx-auto mb-4 animate-bounce" />
                <p className="dark:text-white text-xl font-medium">See What Awaits You In The Future</p>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { 
                      opacity: 0,
                      y: 20,
                      filter: "blur(10px)",
                      scale: 0.95
                    },
                    visible: { 
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                  className="bg-gray-400/50 dark:bg-[#171717]/30 backdrop-blur-xl p-6 rounded-xl border border-gray-400/30 dark:border-gray-800/30 transform-gpu"
                >
                  <motion.div
                    variants={{
                      hidden: { scale: 0.8, opacity: 0 },
                      visible: { 
                        scale: 1, 
                        opacity: 1,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.4,
                          ease: "easeOut"
                        }
                      }
                    }}
                    className="w-12 h-12 text-white bg-gradient-to-br from-blue-500 to-green-500 dark:from-purple-500 dark:to-pink-500 rounded-lg flex items-center justify-center mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3
                    variants={{
                      hidden: { x: -20, opacity: 0, filter: "blur(5px)" },
                      visible: { 
                        x: 0, 
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                          delay: index * 0.15,
                          duration: 0.4
                        }
                      }
                    }}
                    className="text-xl font-semibold dark:text-white mb-2"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { x: -20, opacity: 0, filter: "blur(5px)" },
                      visible: { 
                        x: 0, 
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                          delay: index * 0.2,
                          duration: 0.4
                        }
                      }
                    }}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Project Preview */}
          <div className="relative">
            {/* Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bottom-[60px] backdrop-blur-xl bg-gray-400/50 dark:bg-[#171717]/50 z-10 flex items-center justify-center rounded-xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-8"
              >
                <p className="dark:text-white text-2xl font-medium mb-2">Coming Soon</p>
                <p className="text-gray-600 dark:text-gray-400">Exciting projects from top companies await</p>
              </motion.div>
            </motion.div>

            {/* Projects List */}
            <div className="space-y-4">
              {/* Project 1 */}
              <div className="bg-gray-400/50 dark:bg-[#171717]/30 backdrop-blur-xl p-4 rounded-xl border border-gray-400/30 dark:border-gray-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </span>
                  <h4 className="text-base font-medium dark:text-white">AI-Powered Analytics Dashboard</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  Implement new features in our analytics dashboard using React and TypeScript. 
                  Looking for clean, efficient code with comprehensive test coverage.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">React</span>
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">TypeScript</span>
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">D3.js</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">4 Positions</span>
                  <span className="text-blue-600 dark:text-purple-400">$2000-4000/month</span>
                </div>
              </div>

              {/* Project 2 */}
              <div className="bg-[#171717]/30 backdrop-blur-xl p-4 rounded-xl border border-gray-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </span>
                  <h4 className="text-base font-medium dark:text-white">E-Commerce Platform Optimization</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  Optimize the performance of our e-commerce platform. Focus on reducing load times 
                  and implementing efficient caching strategies.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">Next.js</span>
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">Redis</span>
                  <span className="px-2 py-0.5 text-xs bg-[#171717]/50 rounded-full text-gray-300">AWS</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">2 Positions</span>
                  <span className="text-blue-600 dark:text-purple-400">$2500-4500/month</span>
                </div>
              </div>

              {/* Project 3 */}
              <div className="bg-[#171717]/30 backdrop-blur-xl p-4 rounded-xl border border-gray-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </span>
                  <h4 className="text-base font-medium dark:text-white">AI Chat Integration</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  Develop an AI-powered chat system for customer support. Implement real-time 
                  messaging and smart response suggestions.
                </p>
              </div>
            </div>

            {/* View All Projects Button */}
            <Link 
              href="/hiring"
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group relative z-20"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 mb-8">Trusted by innovative companies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-800/30 rounded-lg"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryProjects;
