'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What is DEV Genius?",
    answer: "DEV Genius is an AI-powered coding education platform that helps you learn any programming language through interactive lessons, real-time code completion, and personalized guidance."
  },
  {
    question: "How does the AI assistance work?",
    answer: "Our AI system provides intelligent code suggestions, real-time error detection, and context-aware completions as you code. It adapts to your coding style and helps you write better code faster."
  },
  {
    question: "Which programming languages are supported?",
    answer: "We support all major programming languages including Python, JavaScript, Java, C++, Ruby, Go, and many more. New languages are regularly added to our platform."
  },
  {
    question: "Is the subscription really lifetime?",
    answer: "Yes! Your one-time payment of ₹1,000 gives you lifetime access to all current and future features of DEV Genius, including all programming languages and AI assistance."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Absolutely! We offer a 30-day money-back guarantee. If you're not completely satisfied with DEV Genius, we'll refund your payment, no questions asked."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border-b border-gray-800"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium dark:text-white dark:group-hover:text-purple-400 group-hover:text-blue-400 transition-colors">{question}</span>
        <span className="ml-4">
          {isOpen ? (
            <Minus className="w-5 h-5 text-blue-500 dark:text-purple-500" />
          ) : (
            <Plus className="w-5 h-5 text-blue-500 dark:text-purple-500" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            <span className="text-gradient">Frequently</span> Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to know about DEV Genius
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="divide-y divide-gray-800"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
