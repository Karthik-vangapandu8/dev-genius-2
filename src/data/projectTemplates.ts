export interface ProjectFile {
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  files: ProjectFile[];
}

export const templates: Template[] = [
  {
    id: 'chat-system',
    name: 'Real-time Chat System',
    description: 'Build a production-ready chat application with WebSocket, user management, typing indicators, and message history.',
    tags: ['WebSocket', 'Real-time', 'React', 'FastAPI', 'System Design'],
    files: [
      {
        name: 'ChatApp.tsx',
        path: '/components/ChatApp.tsx',
        language: 'typescript',
        content: `import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserPlus, Settings, Image as ImageIcon } from 'lucide-react';

interface Message {
  id: string;
  type: 'message' | 'system' | 'image';
  content: string;
  sender?: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  const [users, setUsers] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // WebSocket Connection
  useEffect(() => {
    const websocket = new WebSocket(\`ws://localhost:8000/ws/\${userId}\`);
    
    websocket.onopen = () => {
      console.log('Connected to chat');
      // Request initial chat history
      websocket.send(JSON.stringify({
        type: 'request_history'
      }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch(data.type) {
        case 'message':
        case 'system':
          setMessages(prev => [...prev, {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            status: 'delivered'
          }]);
          break;
        case 'typing':
          handleUserTyping(data.sender);
          break;
        case 'user_list':
          setUsers(data.users);
          break;
        case 'history':
          setMessages(data.messages);
          break;
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from chat');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [userId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typing indicator
  const handleTyping = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'typing',
        sender: userId
      }));
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'stop_typing',
          sender: userId
        }));
      }
    }, 1000);
  };

  const handleUserTyping = (senderId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === senderId 
        ? { ...user, status: 'typing' }
        : user
    ));
  };

  // Send message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && ws?.readyState === WebSocket.OPEN) {
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'message',
        content: inputMessage,
        sender: userId,
        timestamp: new Date().toISOString(),
        status: 'sending'
      };

      setMessages(prev => [...prev, newMessage]);
      
      ws.send(JSON.stringify({
        type: 'message',
        content: inputMessage
      }));

      setInputMessage('');
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ws?.readyState === WebSocket.OPEN) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        ws.send(JSON.stringify({
          type: 'image',
          content: base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* User List Sidebar */}
      <AnimatePresence>
        {showUserList && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-gray-800 border-r border-gray-700"
          >
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Online Users</h2>
            </div>
            <div className="p-4 space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className={\`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 \${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'typing' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }\`} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">
                      {user.status === 'typing' ? 'typing...' : user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
          <button
            onClick={() => setShowUserList(!showUserList)}
            className="text-gray-400 hover:text-white"
          >
            <UserPlus size={20} />
          </button>
          <h1 className="text-white font-semibold">Chat Room</h1>
          <button className="text-gray-400 hover:text-white">
            <Settings size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={\`flex \${
                message.type === 'system' 
                  ? 'justify-center' 
                  : message.sender === userId 
                  ? 'justify-end' 
                  : 'justify-start'
              }\`}
            >
              <div
                className={\`rounded-lg px-4 py-2 max-w-[70%] \${
                  message.type === 'system'
                    ? 'bg-gray-700 text-gray-300 text-sm'
                    : message.sender === userId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-white'
                }\`}
              >
                {message.type === 'image' ? (
                  <img 
                    src={message.content} 
                    alt="Shared image" 
                    className="max-w-full rounded"
                  />
                ) : (
                  message.content
                )}
                <div className="mt-1 text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                  {message.sender === userId && (
                    <span className="ml-2">
                      {message.status === 'sending' ? '⋯' :
                       message.status === 'sent' ? '✓' :
                       message.status === 'delivered' ? '✓✓' :
                       '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <label className="text-gray-400 hover:text-white cursor-pointer">
              <ImageIcon size={20} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}`
      },
      {
        name: 'ChatSystemDesign.md',
        path: '/docs/ChatSystemDesign.md',
        language: 'markdown',
        content: `# Chat System Design Guide

## System Architecture

### 1. Frontend Components
- WebSocket connection management
- Real-time message handling
- User presence tracking
- Typing indicators
- Message status (sending, sent, delivered, read)
- File sharing capabilities

### 2. Backend Services
- WebSocket server
- Message broker (Redis/RabbitMQ)
- Database (MongoDB/PostgreSQL)
- Authentication service
- File storage service

### 3. Scalability Considerations
- Horizontal scaling of WebSocket servers
- Message persistence and history
- Load balancing
- Connection pooling

## Implementation Steps

### 1. Basic Setup
- Initialize WebSocket connection
- Implement message sending/receiving
- Set up basic UI components

### 2. Advanced Features
- User presence detection
- Typing indicators
- Message status tracking
- File sharing
- Message history

### 3. Performance Optimization
- Message batching
- Connection heartbeat
- Reconnection handling
- Offline message queueing

## Interview Topics

### 1. System Design Questions
- How would you scale this system to millions of users?
- How to handle message persistence?
- Approach to implementing real-time features?

### 2. Technical Considerations
- WebSocket vs Long Polling
- Message delivery guarantees
- Handling network failures
- Security considerations

### 3. Performance Optimization
- Message compression
- Connection pooling
- Caching strategies
- Database indexing

## Best Practices

1. Error Handling
- Connection failures
- Message delivery failures
- Rate limiting

2. Security
- Authentication
- Message encryption
- Input validation

3. Performance
- Message queuing
- Batch processing
- Optimistic UI updates`
      }
    ]
  }
];
