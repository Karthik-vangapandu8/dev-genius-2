'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface AITooltipProps {
  message: string;
  isVisible: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const AITooltip = ({ message, isVisible, position, className = '' }: AITooltipProps) => {
  const positionClasses = {
    top: '-top-16 left-1/2 -translate-x-1/2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 -mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute z-50 ${positionClasses[position]} ${className}`}
        >
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
