'use client';

import { motion } from 'framer-motion';

const IDEPreview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative group"
        >
            {/* Animated border effect */}
            <div className="absolute -inset-[3px] rounded-lg animate-border blur-[1px]"></div>
            
            {/* IDE Window */}
            <div className="relative rounded-lg bg-white dark:bg-gray-900 shadow-2xl">
                {/* Window controls */}
                <div className="flex items-center gap-1.5 p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">DevGenius IDE</span>
                </div>

                {/* Menu Bar */}
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center px-2 space-x-4 text-sm">
                        {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((item) => (
                            <button
                                key={item}
                                className="px-2 py-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex h-[600px]">
                    {/* Activity Bar */}
                    <div className="w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-2 space-y-4">
                        <button className="p-2 text-purple-600 dark:text-pink-500 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-pink-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-pink-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-pink-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-pink-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-pink-500 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar */}
                    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                        {/* File Explorer Header */}
                        <div className="px-4 py-2 text-sm text-left font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            Explorer
                        </div>
                        {/* File Tree */}
                        <div className="p-2 text-sm overflow-y-auto">
                            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                <span className="font-medium">my-nextjs-app</span>
                            </div>
                            <div className="ml-4 space-y-2">
                                {/* Next.js file structure */}
                                <FileItem name="src" type="folder" isOpen={true}>
                                    <FileItem name="app" type="folder" isOpen={true}>
                                        <FileItem name="page.tsx" type="file" icon="react" />
                                        <FileItem name="layout.tsx" type="file" icon="react" />
                                        <FileItem name="globals.css" type="file" icon="css" />
                                    </FileItem>
                                    <FileItem name="components" type="folder" isOpen={true}>
                                        <FileItem name="Navbar.tsx" type="file" icon="react" />
                                        <FileItem name="Button.tsx" type="file" icon="react" />
                                        <FileItem name="Card.tsx" type="file" icon="react" />
                                    </FileItem>
                                    <FileItem name="lib" type="folder">
                                        <FileItem name="utils.ts" type="file" icon="typescript" />
                                        <FileItem name="api.ts" type="file" icon="typescript" />
                                    </FileItem>
                                </FileItem>
                                <FileItem name="public" type="folder">
                                    <FileItem name="images" type="folder" />
                                    <FileItem name="fonts" type="folder" />
                                </FileItem>
                                <FileItem name="package.json" type="file" icon="npm" />
                                <FileItem name="tsconfig.json" type="file" icon="typescript" />
                                <FileItem name="next.config.js" type="file" icon="next" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Tabs */}
                        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
                            <div className="px-4 py-2 bg-white dark:bg-gray-900 text-sm font-medium text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700 flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                </svg>
                                <span>page.tsx</span>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="flex-1 bg-white dark:bg-gray-900 relative group overflow-auto">
                            {/* Empty state with grid background */}
                            <div className="absolute inset-0 bg-grid opacity-5"></div>
                        </div>
                    </div>

                    {/* AI Panel */}
                    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-900 dark:text-gray-100 font-medium">AI</div>
                                </div>
                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ask AI anything..."
                                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500"
                                />
                            </div>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                No conversation yet. Start by asking a question!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1 flex justify-between items-center text-xs border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                        <span>TypeScript React</span>
                        <span>UTF-8</span>
                        <span>LF</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-md bg-purple-100 text-purple-600 dark:bg-pink-500/10 dark:text-pink-400">
                            AI Ready
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Helper component for file tree
const FileItem = ({ name, type, icon, isOpen, children }: { name: string; type: 'file' | 'folder'; icon?: string; isOpen?: boolean; children?: React.ReactNode }) => {
    const getIcon = () => {
        if (type === 'folder') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            );
        }
        
        switch (icon) {
            case 'react':
                return <span className="text-blue-500">⚛️</span>;
            case 'typescript':
                return <span className="text-blue-600">Ts</span>;
            case 'css':
                return <span className="text-purple-500">#</span>;
            case 'npm':
                return <span className="text-red-500">📦</span>;
            case 'next':
                return <span>▲</span>;
            default:
                return <span>📄</span>;
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer text-gray-700 dark:text-gray-300">
                {getIcon()}
                <span>{name}</span>
            </div>
            {isOpen && children && (
                <div className="ml-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default IDEPreview;
