'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Files, Layout, Code2, Braces, Settings, Plus, RefreshCw, Save, Download, Terminal } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { templates, Template, ProjectFile } from '@/data/projectTemplates';
import TemplateSelector from './TemplateSelector';
import AICompanion from './AICompanion';
import Split from 'react-split';
import '@/styles/split-pane.css';

const CodingEnvironment = () => {
  const [currentTemplate, setCurrentTemplate] = useState<Template>(templates[0]);
  const [currentFile, setCurrentFile] = useState<ProjectFile>(templates[0].files[0]);
  const [files, setFiles] = useState<ProjectFile[]>(templates[0].files);
  const [showPreview, setShowPreview] = useState(true);
  const [showAICompanion, setShowAICompanion] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [activeRightPanel, setActiveRightPanel] = useState<'preview' | 'ai'>('preview');
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);

  const handleClose = () => {
    const modal = document.getElementById('ide-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  const refreshPreview = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleTemplateSelect = (template: Template) => {
    setCurrentTemplate(template);
    setFiles(template.files);
    setCurrentFile(template.files[0]);
    setShowTemplateSelector(false);
  };

  const handleAISuggestionApply = (code: string) => {
    const updatedFiles = files.map(f =>
      f.path === currentFile.path ? { ...f, content: code } : f
    );
    setFiles(updatedFiles);
  };

  return (
    <>
      {showTemplateSelector ? (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={handleClose}
        />
      ) : (
        <div className="fixed inset-0 bg-[#1e1e1e] flex flex-col">
          {/* Top Bar */}
          <div className="h-10 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-3">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">{currentFile.name}</span>
              <div className="flex items-center space-x-1">
                {currentTemplate.tags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 bg-gray-800 rounded text-xs text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveRightPanel('preview')}
                className={`p-1.5 rounded-md transition-colors ${
                  activeRightPanel === 'preview' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Layout size={16} />
              </button>
              <button
                onClick={() => setActiveRightPanel('ai')}
                className={`p-1.5 rounded-md transition-colors ${
                  activeRightPanel === 'ai' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <Braces size={16} />
              </button>
              <button
                onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <Split
            className="flex-1 flex"
            sizes={[20, 40, 40]}
            minSize={[200, 400, 300]}
            gutterSize={4}
            snapOffset={30}
          >
            {/* File Explorer */}
            <div className="h-full bg-gray-900 overflow-y-auto">
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-gray-400 text-sm font-medium">Files</h3>
                    <button className="text-gray-500 hover:text-gray-300">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  {files.map(file => (
                    <button
                      key={file.path}
                      onClick={() => setCurrentFile(file)}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-left ${
                        currentFile.path === file.path
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      <Code2 size={14} />
                      <span className="text-sm truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="h-full">
              <Editor
                height="100%"
                defaultLanguage={currentFile.language}
                language={currentFile.language}
                theme={theme}
                value={currentFile.content}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  padding: { top: 10 },
                }}
                onChange={(value) => {
                  if (value) {
                    const updatedFiles = files.map(f =>
                      f.path === currentFile.path ? { ...f, content: value } : f
                    );
                    setFiles(updatedFiles);
                  }
                }}
              />
            </div>

            {/* Right Panel (Preview/AI) */}
            <div className="h-full bg-gray-900">
              {activeRightPanel === 'preview' ? (
                <div className="h-full bg-white">
                  <div className="h-8 bg-gray-100 border-b flex items-center justify-between px-3">
                    <button
                      onClick={refreshPreview}
                      className={`text-gray-500 hover:text-gray-700 ${
                        isRefreshing ? 'animate-spin' : ''
                      }`}
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <iframe
                    title="preview"
                    className="w-full h-[calc(100%-2rem)] bg-white"
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
                          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
                          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>
                          <div id="root"></div>
                          <script type="text/babel">
                            ${currentFile.content}
                            ReactDOM.render(<App />, document.getElementById('root'));
                          </script>
                        </body>
                      </html>
                    `}
                  />
                </div>
              ) : (
                <AICompanion
                  currentFile={currentFile}
                  onSuggestionApply={handleAISuggestionApply}
                />
              )}
            </div>
          </Split>

          {/* Footer */}
          <div className="h-8 bg-gray-900 border-t border-gray-700 flex items-center justify-between px-3">
            <div className="flex items-center space-x-3 text-gray-400 text-xs">
              <button className="hover:text-white flex items-center space-x-1">
                <Terminal size={14} />
                <span>Terminal</span>
              </button>
            </div>
            <div className="flex items-center space-x-3 text-gray-400 text-xs">
              <button className="hover:text-white flex items-center space-x-1">
                <Save size={14} />
                <span>Save</span>
              </button>
              <button className="hover:text-white flex items-center space-x-1">
                <Download size={14} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodingEnvironment;
