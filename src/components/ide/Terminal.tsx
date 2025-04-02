'use client';

import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';

interface TerminalProps {
  currentStep: number;
}

export const Terminal = ({ currentStep }: TerminalProps) => {
  const steps = [
    {
      command: '> python app.py',
      output: ' * Serving Flask app\n * Debug mode: on\n * Running on http://127.0.0.1:5000/'
    },
    {
      command: '> curl http://127.0.0.1:5000/',
      output: 'Hello, World!'
    }
  ];

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white font-mono text-sm p-4 rounded-b-lg h-32 overflow-auto"
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      <TypewriterText
        text={currentStepData.command}
        className="text-green-400"
        delay={50}
      />
      
      {currentStep > 0 && (
        <TypewriterText
          text={currentStepData.output}
          className="block mt-2 text-gray-300"
          delay={20}
        />
      )}
    </motion.div>
  );
};
