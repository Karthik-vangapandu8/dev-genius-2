"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Terminal, Code2, Play, CheckCircle2, AlertCircle, MessageSquare, Braces, GitBranch, Settings } from "lucide-react";
import Editor from "@monaco-editor/react";

interface AIFeedback {
  type: 'success' | 'warning' | 'error';
  message: string;
  suggestions?: string[];
  codeSnippet?: string;
}

const IDEPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [activeLine, setActiveLine] = useState(1);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const editorRef = useRef(null);
  const [output, setOutput] = useState<string>('');
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const codeSteps = [
    {
      code: `from flask import Flask
from typing import Dict

app = Flask(__name__)

@app.route('/')
def hello() -> Dict[str, str]:
    """Return a welcome message.
    
    Returns:
        Dict containing welcome message
    """
    return {'message': 'Hello, World!'}`,
      explanation: "Setting up a typed Flask application with docstrings",
      aiSuggestion: {
        type: "warning" as const,
        message: "Good start with type hints! Consider adding error handling.",
        suggestions: [
          "Add request validation",
          "Include error handlers",
          "Consider adding logging"
        ]
      }
    },
    {
      code: `from flask import Flask, jsonify, request
from typing import Dict, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.errorhandler(400)
def bad_request(error) -> Dict:
    """Handle bad request errors.
    
    Args:
        error: The error object
        
    Returns:
        Dict containing error message
    """
    return jsonify({'error': str(error)}), 400

@app.route('/api/data', methods=['POST'])
def process_data() -> Dict:
    """Process incoming JSON data with validation.
    
    Returns:
        Dict containing processed result
    """
    try:
        data = request.get_json()
        logger.info(f"Received request with data: {data}")
        
        if not isinstance(data.get('value'), (int, float)):
            raise ValueError("Value must be a number")
            
        result = data['value'] * 2
        return jsonify({'result': result})
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 400`,
      explanation: "Implementing proper error handling and logging",
      aiSuggestion: {
        type: "success" as const,
        message: "Excellent implementation! Here's what you did well:",
        suggestions: [
          "Added comprehensive error handling",
          "Implemented logging for debugging",
          "Used type hints consistently",
          "Added docstrings for documentation"
        ],
        codeSnippet: `@app.errorhandler(400)
def bad_request(error) -> Dict:
    return jsonify({'error': str(error)}), 400`
      }
    }
  ];

  const features = [
    { icon: <Terminal className="w-5 h-5" />, label: "Integrated Terminal" },
    { icon: <Code2 className="w-5 h-5" />, label: "Smart Autocomplete" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "AI Assistant" },
    { icon: <Play className="w-5 h-5" />, label: "Live Preview" },
    { icon: <Braces className="w-5 h-5" />, label: "Code Analysis" },
    { icon: <GitBranch className="w-5 h-5" />, label: "Version Control" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % codeSteps.length);
      setIsTyping(true);
      setShowAIFeedback(false);
      setOutput('');
      
      // Show AI feedback after typing animation
      setTimeout(() => {
        setIsTyping(false);
        setShowAIFeedback(true);
        setAiFeedback(codeSteps[currentStep].aiSuggestion);
        
        // Simulate output
        if (currentStep === 1) {
          setOutput('INFO:root:Server started\nINFO:werkzeug:Running on http://127.0.0.1:5000');
        }
      }, 2000);
      
      // Animate through lines
      let line = 1;
      const lineInterval = setInterval(() => {
        setActiveLine(line++);
        if (line > 10) clearInterval(lineInterval);
      }, 200);
      
    }, 8000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Add custom completions
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: '@app.route',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '@app.route("${1:/}")\ndef ${2:function_name}():\n    return ${3:response}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Flask route decorator'
          },
          {
            label: 'try-except',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'try:\n    ${1:pass}\nexcept ${2:Exception} as e:\n    ${3:pass}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Try-except block'
          }
        ];
        return { suggestions };
      }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* IDE Header */}
      <div className="bg-[#1e1e1e] rounded-t-xl p-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setShowTooltip(index)}
              onHoverEnd={() => setShowTooltip(null)}
            >
              {feature.icon}
              <AnimatePresence>
                {showTooltip === index && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute mt-8 px-2 py-1 bg-gray-800 text-xs rounded shadow-lg"
                  >
                    {feature.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main IDE Content */}
      <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-b-xl grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Code Editor */}
        <div className="lg:col-span-2 font-mono text-sm">
          <Editor
            height={isMobile ? "300px" : "400px"}
            defaultLanguage="python"
            theme={theme}
            value={isTyping ? '' : codeSteps[currentStep].code}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true
            }}
            onMount={handleEditorDidMount}
          />
          
          {/* Terminal Output */}
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-black rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400 overflow-x-auto"
            >
              <div className="flex items-center mb-2">
                <Terminal className="w-4 h-4 mr-2" />
                <span className="text-gray-400">Terminal</span>
              </div>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </motion.div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Explanation */}
          <motion.div
            key={`explanation-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 rounded-lg p-4"
          >
            <h3 className="text-blue-400 font-semibold mb-2">Step {currentStep + 1}</h3>
            <p className="text-gray-300 text-sm">{codeSteps[currentStep].explanation}</p>
          </motion.div>

          {/* AI Feedback */}
          <AnimatePresence>
            {showAIFeedback && aiFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {aiFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-purple-400 font-medium mb-1">AI Feedback</h4>
                      <p className="text-gray-300 text-sm">{aiFeedback.message}</p>
                    </div>
                    
                    {aiFeedback.suggestions && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-purple-300">Suggestions:</h5>
                        <ul className="space-y-1">
                          {aiFeedback.suggestions.map((suggestion, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-sm text-gray-400 flex items-center space-x-2"
                            >
                              <span className="w-1 h-1 bg-purple-400 rounded-full" />
                              <span>{suggestion}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {aiFeedback.codeSnippet && (
                      <div className="mt-2 bg-gray-900/50 rounded p-2">
                        <code className="text-sm text-gray-300 font-mono">
                          {aiFeedback.codeSnippet}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Elements */}
          <div className="space-y-2 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-3 sm:px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Run Code</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-3 sm:px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Code2 className="w-4 h-4" />
              <span>View Solution</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDEPreview;
