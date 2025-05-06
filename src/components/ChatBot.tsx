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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to generate responses based on user input
  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();

    // Check for website creator questions
    if (
      lowercaseQuery.includes('who made') || 
      lowercaseQuery.includes('who created') || 
      lowercaseQuery.includes('who built') || 
      lowercaseQuery.includes('who designed') ||
      lowercaseQuery.includes('who make') ||
      (lowercaseQuery.includes('who') && lowercaseQuery.includes('website'))
    ) {
      return "This website was created by Billstein Maelgweyn Lelatobur, a Fullstack Web Developer with expertise in modern web technologies. He designed and built it using a neo-brutalist design approach, featuring interactive elements and clean code architecture. The site showcases his skills in Next.js, React, TypeScript, and various front-end technologies.";
    }

    // Check for greetings
    if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery === 'hey') {
      return "Hello! I'm your portfolio assistant. How can I help you today? Feel free to ask about projects, skills, experience, or anything else you'd like to know!";
    }

    // Information about projects
    if (lowercaseQuery.includes('project') || lowercaseQuery.includes('work') || lowercaseQuery.includes('portfolio')) {
      if (lowercaseQuery.includes('orfarm')) {
        const project = KNOWLEDGE_BASE.projects.find(p => p.name.toLowerCase() === 'orfarm');
        return `${project?.name}: ${project?.description}\n\nKey highlights:\n${project?.highlights.join('\n')}\n\nTechnologies: ${project?.tech.join(', ')}.\n\nChallenge: ${project?.challenges}`;
      } else if (lowercaseQuery.includes('dodobus')) {
        const project = KNOWLEDGE_BASE.projects.find(p => p.name.toLowerCase() === 'dodobus');
        return `${project?.name}: ${project?.description}\n\nKey highlights:\n${project?.highlights.join('\n')}\n\nTechnologies: ${project?.tech.join(', ')}.\n\nChallenge: ${project?.challenges}`;
      } else if (lowercaseQuery.includes('tools') || lowercaseQuery.includes('midwife') || lowercaseQuery.includes('bidan')) {
        const project = KNOWLEDGE_BASE.projects.find(p => p.name.toLowerCase() === 'tools midwife');
        return `${project?.name}: ${project?.description}\n\nKey highlights:\n${project?.highlights.join('\n')}\n\nTechnologies: ${project?.tech.join(', ')}.\n\nChallenge: ${project?.challenges}`;
      } else {
        return "I know about several projects: Orfarm (e-commerce), Dodobus (bus booking), and Tools Midwife. Which one would you like to learn more about?";
      }
    }

    // Information about skills
    if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('tech') || lowercaseQuery.includes('technology')) {
      if (lowercaseQuery.includes('frontend') || lowercaseQuery.includes('front-end') || lowercaseQuery.includes('front end')) {
        return `Frontend skills include: ${KNOWLEDGE_BASE.skills.frontend.join(', ')}.`;
      } else if (lowercaseQuery.includes('backend') || lowercaseQuery.includes('back-end') || lowercaseQuery.includes('back end')) {
        return `Backend skills include: ${KNOWLEDGE_BASE.skills.backend.join(', ')}.`;
      } else if (lowercaseQuery.includes('database') || lowercaseQuery.includes('db')) {
        return `Database skills include: ${KNOWLEDGE_BASE.skills.database.join(', ')}.`;
      } else if (lowercaseQuery.includes('devops')) {
        return `DevOps skills include: ${KNOWLEDGE_BASE.skills.devops.join(', ')}.`;
      } else if (lowercaseQuery.includes('design')) {
        return `Design skills include: ${KNOWLEDGE_BASE.skills.design.join(', ')}.`;
      } else {
        return `Frontend: ${KNOWLEDGE_BASE.skills.frontend.join(', ')}.\n\nBackend: ${KNOWLEDGE_BASE.skills.backend.join(', ')}.\n\nDatabase: ${KNOWLEDGE_BASE.skills.database.join(', ')}.\n\nDevOps: ${KNOWLEDGE_BASE.skills.devops.join(', ')}.\n\nDesign: ${KNOWLEDGE_BASE.skills.design.join(', ')}.`;
      }
    }

    // Information about experience
    if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('work history') || lowercaseQuery.includes('job')) {
      const experience = KNOWLEDGE_BASE.experience.map(job => 
        `${job.title} at ${job.company} (${job.period}):\n${job.responsibilities.join('\n')}`
      ).join('\n\n');
      
      return `Professional Experience:\n\n${experience}`;
    }

    // Information about education
    if (lowercaseQuery.includes('education') || lowercaseQuery.includes('university') || lowercaseQuery.includes('degree') || lowercaseQuery.includes('college')) {
      return `Education: ${KNOWLEDGE_BASE.education.degree} from ${KNOWLEDGE_BASE.education.institution}, graduated ${KNOWLEDGE_BASE.education.year}.\n\nHighlights:\n${KNOWLEDGE_BASE.education.highlights.join('\n')}`;
    }

    // Information about person
    if (lowercaseQuery.includes('about') || lowercaseQuery.includes('who') || lowercaseQuery.includes('developer') || 
        lowercaseQuery.includes('author') || lowercaseQuery.includes('person') || lowercaseQuery.includes('portfolio owner')) {
      return `${KNOWLEDGE_BASE.about}\n\nBillstein specializes in creating interactive, visually appealing websites with clean code and optimal performance. His skills include ${KNOWLEDGE_BASE.skills.frontend.slice(0, 5).join(', ')} and ${KNOWLEDGE_BASE.skills.backend.slice(0, 3).join(', ')}.`;
    }

    // Contact information
    if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('email') || lowercaseQuery.includes('reach')) {
      return KNOWLEDGE_BASE.contact;
    }

    // FAQ
    if (lowercaseQuery.includes('faq') || lowercaseQuery.includes('frequently asked') || lowercaseQuery.includes('common question')) {
      return KNOWLEDGE_BASE.faq.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');
    }

    // Specific FAQ matches
    if (lowercaseQuery.includes('development process') || lowercaseQuery.includes('how do you work')) {
      return KNOWLEDGE_BASE.faq[0].answer;
    }
    if (lowercaseQuery.includes('how long') || lowercaseQuery.includes('timeline') || lowercaseQuery.includes('timeframe')) {
      return KNOWLEDGE_BASE.faq[1].answer;
    }
    if (lowercaseQuery.includes('maintenance') || lowercaseQuery.includes('support')) {
      return KNOWLEDGE_BASE.faq[2].answer;
    }

    // Interests
    if (lowercaseQuery.includes('interest') || lowercaseQuery.includes('hobby') || lowercaseQuery.includes('passion')) {
      return `Professional interests include: ${KNOWLEDGE_BASE.interests.join(', ')}.`;
    }

    // Web development topics
    if (lowercaseQuery.includes('neo brutalism') || lowercaseQuery.includes('brutalist')) {
      return KNOWLEDGE_BASE.webDevelopment.neoBrutalism;
    }
    if (lowercaseQuery.includes('trend') || lowercaseQuery.includes('future') || lowercaseQuery.includes('modern web')) {
      return `Current web development trends include:\n${KNOWLEDGE_BASE.webDevelopment.trends.join('\n')}`;
    }

    // Commands or help
    if (lowercaseQuery.includes('help') || lowercaseQuery.includes('command') || lowercaseQuery.includes('what can you do')) {
      return "I can tell you about:\n- Projects (Orfarm, Dodobus, Tools Midwife)\n- Skills (frontend, backend, database, etc.)\n- Who created this website\n- Work experience\n- Education background\n- Contact information\n- Development process & FAQs\n- Professional interests\n- Web development topics including neo-brutalism\n\nJust ask me about any of these topics!";
    }

    // Default response
    return "I'm not sure about that. You can ask me about projects, skills, experience, education, or how to get in contact. Type 'help' to see what I can help with!";
  };

  // Handle submitting a new message
  const handleSubmit = (e: React.FormEvent) => {
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

    // Add "AI is thinking" message
    setTimeout(() => {
      // Generate AI response using the stored input
      const aiResponse: Message = {
        text: generateResponse(currentInput),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
    }, 800);
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
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--primary)] border-3 border-black flex items-center justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] z-50 hover:scale-105 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] z-50 flex flex-col rounded-md overflow-hidden animate-modal-in">
          {/* Chat header */}
          <div className="bg-[var(--primary)] p-3 text-white font-bold flex justify-between items-center border-b-4 border-black">
            <div>Portfolio AI Assistant</div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex items-center justify-center hover:opacity-80"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 ${
                    message.isUser
                      ? 'bg-[var(--tertiary)] border-2 border-black text-black neo-box-chat-user'
                      : 'bg-white border-2 border-black text-black neo-box-chat-ai'
                  } rounded-md shadow-md whitespace-pre-line`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 bg-white border-2 border-black text-black neo-box-chat-ai rounded-md shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t-4 border-black p-3 bg-gray-100">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 p-2 border-2 border-black focus:outline-none text-black"
                disabled={isThinking}
              />
              <button
                type="submit"
                className={`ml-2 p-2 text-black border-2 border-black transform transition-transform active:scale-95 ${
                  isThinking ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--tertiary)] hover:brightness-110'
                }`}
                aria-label="Send message"
                disabled={isThinking}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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