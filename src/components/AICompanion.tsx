'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Lightbulb, Code2, CheckCircle2, ChevronRight } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  code?: string;
  completed: boolean;
}

interface AICompanionProps {
  currentFile: any;
  onSuggestionApply: (code: string) => void;
}

const AICompanion = ({ currentFile, onSuggestionApply }: AICompanionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const steps: Step[] = [
    {
      title: 'Project Setup',
      description: 'Let\'s start by setting up the basic structure of your React component.',
      code: `import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your code will go here */}
    </div>
  );
}`,
      completed: true
    },
    {
      title: 'Adding Animations',
      description: 'Now, let\'s add some smooth animations using Framer Motion.',
      code: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-4xl mx-auto pt-20"
>
  <h1 className="text-4xl font-bold text-center">
    Welcome to My App
  </h1>
</motion.div>`,
      completed: false
    },
    {
      title: 'Implementing Interactivity',
      description: 'Let\'s add some interactive elements to make your app more engaging.',
      code: `<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setIsOpen(!isOpen)}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
>
  Click me
</motion.button>`,
      completed: false
    }
  ];

  useEffect(() => {
    // Simulate AI typing
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setShowSuggestion(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="bg-gray-900 border-l border-gray-700 w-80 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-medium">AI Companion</h3>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border ${
              currentStep === index
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 bg-gray-800/50'
            } p-4`}
          >
            {/* Step Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                )}
                <h4 className="text-white font-medium">{step.title}</h4>
              </div>
              <span className="text-xs text-gray-400">Step {index + 1}</span>
            </div>

            {/* Step Content */}
            <p className="text-gray-300 text-sm mb-3">{step.description}</p>

            {/* Code Suggestion */}
            {currentStep === index && step.code && (
              <AnimatePresence>
                {showSuggestion && step.code && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="bg-gray-800 rounded-lg p-3">
                      <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                        {step.code}
                      </pre>
                      <button
                        onClick={() => step.code && onSuggestionApply(step.code)}
                        className="mt-2 w-full flex items-center justify-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Apply Suggestion</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-400"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">AI is thinking...</span>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
            setShowSuggestion(false);
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          disabled={isTyping}
        >
          <span>Next Step</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AICompanion;
