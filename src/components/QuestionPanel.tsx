'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ThumbsUp, MessageCircle, Bookmark, Share2, ChevronUp, ChevronDown } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  acceptance: number;
  likes: number;
  dislikes: number;
}

interface QuestionPanelProps {
  question: Question;
}

const QuestionPanel = ({ question }: QuestionPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
      {/* Question Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>{question.title}</span>
            <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
          <button className="flex items-center gap-1 hover:text-white">
            <ThumbsUp size={16} />
            <span>{question.likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-white">
            <MessageCircle size={16} />
            <span>Discussion</span>
          </button>
          <button className="flex items-center gap-1 hover:text-white">
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-1 hover:text-white">
            <Bookmark size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Question Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-6">
          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">{question.description}</p>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Examples:</h3>
            {question.examples.map((example, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="text-purple-400 font-medium">Input: </span>
                  <code className="text-gray-300 bg-gray-700/50 px-1 py-0.5 rounded">{example.input}</code>
                </div>
                <div>
                  <span className="text-purple-400 font-medium">Output: </span>
                  <code className="text-gray-300 bg-gray-700/50 px-1 py-0.5 rounded">{example.output}</code>
                </div>
                {example.explanation && (
                  <div>
                    <span className="text-purple-400 font-medium">Explanation: </span>
                    <span className="text-gray-300">{example.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">Constraints:</h3>
            <ul className="list-disc list-inside space-y-1">
              {question.constraints.map((constraint, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  {constraint}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-700 pt-4">
            <div>
              <span className="font-medium">Acceptance Rate: </span>
              <span className="text-green-500">{question.acceptance}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionPanel;
