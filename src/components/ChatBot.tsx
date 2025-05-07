'use client';

import { useState, useRef, useEffect } from 'react';

// Define the knowledge base for the chatbot
const KNOWLEDGE_BASE = {
  projects: [
    {
      name: 'Orfarm',
      description: 'E-commerce platform offering a wide range of products, including fresh food, snacks, and drinks, with a simple and user-friendly interface. Built with Laravel and integrated with Midtrans, it provides a secure and convenient shopping experience.',
      tech: ['Laravel', 'Bootstrap', 'MySQL'],
      highlights: [
        'User-friendly product browsing and filtering',
        'Secure payment processing with Midtrans integration',
        'Responsive design for mobile and desktop users',
        'Admin dashboard for inventory and order management'
      ],
      challenges: 'Optimizing the database queries for a smooth shopping experience with thousands of products was challenging but ultimately successful.'
    },
    {
      name: 'Dodobus',
      description: 'DodoBuss is a modern, user-friendly bus ticket booking platform built with Next.js. The application streamlines the process of searching, booking, and managing bus tickets for travelers while providing robust management tools for bus operators.',
      tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Redux/Context API', 'PostgreSQL', 'Prisma ORM'],
      highlights: [
        'Interactive seat selection interface',
        'Real-time availability updates',
        'Secure payment processing',
        'Automated email confirmation system',
        'Admin dashboard for route management'
      ],
      challenges: 'Implementing the real-time seat reservation system to prevent double bookings was complex but critical for the platform.'
    },
    {
      name: 'Tools Midwife',
      description: 'Tools Bidan is a comprehensive digital platform designed specifically for midwives. It provides various calculators, charts, checklists, and reference tools to assist midwives in their daily professional tasks.',
      tech: ['Next.js', 'Typescript', 'Tailwind CSS'],
      highlights: [
        'Pregnancy due date calculator',
        'Growth charts for infant development',
        'Medication dosage calculators',
        'Printable checklists and forms',
        'Evidence-based reference materials'
      ],
      challenges: 'Ensuring medical accuracy while maintaining an intuitive user interface was our primary focus throughout development.'
    }
  ],
  skills: {
    frontend: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'GSAP'],
    backend: ['PHP', 'Laravel', 'Node.js', 'Express', 'Prisma ORM', 'RESTful APIs', 'GraphQL'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB'],
    devops: ['Git', 'GitHub', 'CI/CD', 'Docker', 'Vercel', 'Netlify'],
    design: ['Figma', 'Adobe XD', 'Responsive Design', 'UI/UX Principles']
  },
  experience: [
    {
      title: 'Senior Fullstack Developer',
      company: 'Tech Innovations Inc.',
      period: '2020 - Present',
      responsibilities: [
        'Lead developer for e-commerce and SaaS projects',
        'Mentoring junior developers on best practices',
        'Implementing CI/CD pipelines for streamlined deployment',
        'Collaborating with design team on UI/UX improvements'
      ]
    },
    {
      title: 'Web Developer',
      company: 'Creative Digital Solutions',
      period: '2018 - 2020',
      responsibilities: [
        'Built responsive websites for small to medium businesses',
        'Implemented payment processing solutions',
        'Optimized existing websites for performance and SEO',
        'Created custom CMS solutions for clients'
      ]
    }
  ],
  education: {
    degree: 'Bachelor of Computer Science',
    institution: 'University of Technology',
    year: '2018',
    highlights: [
      'Graduated with honors',
      'Specialized in Web Development and Software Engineering',
      'Led student team projects for local businesses'
    ]
  },
  about: 'Billstein Maelgweyn Lelatobur is a Fullstack Web Developer passionate about crafting beautiful, functional websites with modern technologies. With over 5 years of professional experience, he specializes in creating interactive web applications with clean code and intuitive user experiences. He loves the challenge of solving complex problems and staying current with the latest web development trends and best practices.',
  contact: "You can get in touch with Billstein through the contact form on the website or via email at billstein@example.com. He's also active on GitHub and LinkedIn, where you can see more of his work and professional background.",
  faq: [
    {
      question: 'What is your development process?',
      answer: 'I follow an agile approach with iterative development cycles. I start with thorough requirements gathering, create wireframes and prototypes, implement the solution with regular client feedback, and finalize with thorough testing and deployment.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I always provide timeline estimates during the initial consultation.'
    },
    {
      question: 'Do you offer maintenance services?',
      answer: 'Yes, I offer ongoing maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. This includes regular updates, security patches, and minor feature enhancements.'
    }
  ],
  interests: [
    'Open-source contribution',
    'Web accessibility advocacy',
    'UI/UX design principles',
    'Performance optimization',
    'Emerging web technologies'
  ],
  webDevelopment: {
    neoBrutalism: 'Neo-brutalism in web design embraces bold colors, high contrast, thick borders, and an intentionally raw aesthetic. It prioritizes usability and functionality while making a strong visual statement.',
    trends: [
      'Micro-interactions for enhanced user experience',
      'WebGL and 3D elements in interfaces',
      'Dark mode as a standard feature',
      'Voice user interfaces and accessibility',
      'AI-powered personalization'
    ]
  }
};

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
          <div className="flex-1 overflow-y-auto p-1 sm:p-3 space-y-1 sm:space-y-3 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] p-0.5 sm:p-2.5 text-[8px] sm:text-sm ${
                    message.isUser
                      ? 'bg-[var(--tertiary)] border-[1px] sm:border-2 border-black text-black neo-box-chat-user'
                      : 'bg-white border-[1px] sm:border-2 border-black text-black neo-box-chat-ai'
                  } rounded-md shadow-md whitespace-pre-line`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[90%] p-0.5 sm:p-2.5 bg-white border-[1px] sm:border-2 border-black text-black neo-box-chat-ai rounded-md shadow-md">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
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