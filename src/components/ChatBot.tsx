'use client';

import { useState, useRef, useEffect } from 'react';

// Remove or comment out the KNOWLEDGE_BASE definition since we're using Gemini API now
// const KNOWLEDGE_BASE = { ... };

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your AI assistant. Ask me anything about the projects, skills, experience, education, or other information on this portfolio!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to generate responses from Gemini API
  const generateResponse = async (query: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      return data.response;
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      setIsError(true);
      return "I'm having trouble connecting right now. Please try again later, or ask another question.";
    }
  };

  // Handle submitting a new message
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Store the current input before clearing the state
    const currentInput = input;

    // Add user message using the stored input
    const userMessage: Message = {
      text: currentInput, 
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput(''); // Clear the input field now
    setIsThinking(true);
    setIsError(false);

    try {
      // Get response from Gemini API
      const aiResponseText = await generateResponse(currentInput);
      
      const aiResponse: Message = {
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      
      // Add error message
      const errorResponse: Message = {
        text: "I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
      setIsError(true);
    } finally {
      setIsThinking(false);
    }
  };

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Chat button (only visible on small screens) */}
      <div className="sm:hidden fixed bottom-3 right-3 z-50 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-[var(--primary)] border-[1px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform"
          style={{ minWidth: "40px", maxWidth: "40px" }}
          aria-label="Toggle chat"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Chat button (only visible on desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--primary)] border-3 border-black items-center justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] z-50 hover:scale-105 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat window - Responsive for both mobile and desktop */}
      {isOpen && (
        <div className="fixed bottom-[4rem] right-2 sm:bottom-24 sm:right-6 w-[160px] sm:w-[300px] md:w-96 h-[60vh] max-h-[400px] bg-white border-[1px] sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.7)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] z-50 flex flex-col rounded-md overflow-hidden animate-modal-in">
          {/* Chat header */}
          <div className="bg-[var(--primary)] p-1 sm:p-3 text-white font-bold flex justify-between items-center border-b-[1px] sm:border-b-4 border-black">
            <div className="text-[10px] sm:text-base">AI Chat</div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center hover:opacity-80"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-1.5 md:p-3 space-y-1.5 md:space-y-3 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-1 md:p-2.5 text-[10px] md:text-sm ${
                    message.isUser
                      ? 'bg-[var(--tertiary)] border-1 md:border-2 border-black text-black neo-box-chat-user'
                      : 'bg-white border-1 md:border-2 border-black text-black neo-box-chat-ai'
                  } rounded-md shadow-md whitespace-pre-line`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-1 md:p-2.5 bg-white border-1 md:border-2 border-black text-black neo-box-chat-ai rounded-md shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            {isError && (
              <div className="flex justify-center py-1 md:py-2">
                <span className="text-[8px] md:text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded border border-red-300">
                  Connection error. Try again later.
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t-[1px] sm:border-t-4 border-black p-0.5 sm:p-2.5 bg-gray-100">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask..."
                className="flex-1 p-0.5 text-[8px] sm:text-sm border-[1px] sm:border-2 border-black focus:outline-none text-black"
                disabled={isThinking}
              />
              <button
                type="submit"
                className={`ml-0.5 sm:ml-1.5 p-0.5 sm:p-1.5 text-black border-[1px] sm:border-2 border-black transform transition-transform active:scale-95 ${
                  isThinking ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--tertiary)] hover:brightness-110'
                }`}
                aria-label="Send message"
                disabled={isThinking}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot; 