'use client';

import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { AITooltip } from './AITooltip';
import { useState } from 'react';

interface CodeEditorProps {
  currentStep: number;
}

export const CodeEditor = ({ currentStep }: CodeEditorProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const steps = [
    {
      code: `from flask import Flask\napp = Flask(__name__)\n`,
      tooltip: "First, we import Flask and create an application instance. This is always the starting point of a Flask app.",
      highlight: [1, 2]
    },
    {
      code: `from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, World!'`,
      tooltip: "Now we create our first route using the @app.route decorator. This handles requests to the root URL '/'.",
      highlight: [4, 5, 6]
    },
    {
      code: `from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, World!'\n\nif __name__ == '__main__':\n    app.run(debug=True)`,
      tooltip: "Finally, we add the main block to run our application. The debug=True flag enables development features.",
      highlight: [8, 9]
    }
  ];

  const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className="relative flex-1 bg-gray-900 text-white font-mono text-sm overflow-hidden">
      <div className="absolute top-0 right-0 m-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full"
        >
          app.py
        </motion.div>
      </div>
      
      <div className="relative z-20 p-6">
        <TypewriterText
          text={currentStepData.code}
          delay={30}
          className="block whitespace-pre"
          onComplete={() => setTooltipVisible(true)}
        />
      </div>

      <AITooltip
        message={currentStepData.tooltip}
        isVisible={tooltipVisible}
        position="right"
        className="mr-4"
      />

      {/* Line Numbers */}
      <div className="absolute left-0 top-0 p-6 select-none text-gray-500">
        {currentStepData.code.split('\n').map((_, i) => (
          <div
            key={i}
            className={`${
              currentStepData.highlight.includes(i + 1)
                ? 'text-blue-400'
                : ''
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
    </div>
  );
};
