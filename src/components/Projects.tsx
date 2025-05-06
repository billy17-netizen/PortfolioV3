'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiColumns } from 'react-icons/fi';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiFirebase, SiMongodb, 
  SiStripe, SiTailwindcss, SiRedux, SiFramer, SiD3Dotjs, 
  SiExpress, SiGraphql, SiTypescript, SiVuedotjs, SiLaravel, 
  SiMysql, SiPostgresql, SiPrisma, SiOpenai, SiBootstrap
} from 'react-icons/si';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// You can add more projects here
const PROJECTS = [
  {
    title: 'Orfarm',
    description: 'Our e-commerce platform offers a wide range of products, including fresh food, snacks, and drinks, with a simple and user-friendly interface. Built with Laravel and integrated with Midtrans, it provides a secure and convenient shopping experience.',
    image: '/project-section/Orfarm.png',  
    tags: ['Laravel', 'Bootstrap', 'MySQL'],
    githubUrl: '-',
    liveUrl: '-',
    color: 'var(--accent)'
  },
  {
    title: 'Dodobus',
    description: 'DodoBuss is a modern, user-friendly bus ticket booking platform built with Next.js. The application streamlines the process of searching, booking, and managing bus tickets for travelers while providing robust management tools for bus operators.',
    image: '/project-section/Dodobus.png',
    tags: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Redux/Context API',  'PostgreSQL', 'Prisma ORM'],
    githubUrl: 'https://github.com/billy17-netizen/DodoBuss',
    liveUrl: '-',
    color: 'var(--tertiary)'
  },
  {
    title: 'Tools Midwife',
    description: 'Tools Bidan is a comprehensive digital platform designed specifically for midwives. It provides various calculators, charts, checklists, and reference tools to assist midwives in their daily professional tasks.',
    image: '/project-section/tools-midwife.png',
    tags: ['Next.js', 'Typescript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/billy17-netizen/tools-midwife',
    liveUrl: '-',
    color: 'var(--quaternary)'
  },
  // {
  //   title: 'AI Powered Chat Bot',
  //   description: 'An intelligent chatbot leveraging OpenAI GPT models to provide customer support, answer questions, and improve user engagement with conversational AI.',
  //   image: 'https://placehold.co/600x400/00D5C8/FFFFFF?text=AI+Chatbot',
  //   tags: ['OpenAI API', 'React', 'Node.js', 'WebSockets'],
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://example.com',
  //   category: 'Backend',
  //   color: 'var(--primary)'
  // },
  // {
  //   title: 'Fitness Tracking App',
  //   description: 'A mobile-first fitness application that helps users track workouts, set goals, and monitor progress with interactive charts and personalized insights.',
  //   image: 'https://placehold.co/600x400/FF3E3E/FFFFFF?text=Fitness+App',
  //   tags: ['React Native', 'GraphQL', 'TypeScript', 'Firebase'],
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://example.com',
  //   category: 'Mobile',
  //   color: 'var(--secondary)'
  // },
  // {
  //   title: 'Portfolio Website Builder',
  //   description: 'A drag-and-drop website builder specifically designed for creative professionals to showcase their portfolio with customizable templates and animations.',
  //   image: 'https://placehold.co/600x400/8A2BE2/FFFFFF?text=Portfolio+Builder',
  //   tags: ['Vue.js', 'TailwindCSS', 'Firebase', 'Animations'],
  //   githubUrl: 'https://github.com',
  //   liveUrl: 'https://example.com',
  //   category: 'UI/UX',
  //   color: 'var(--accent)'
  // }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLImageElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Function to get technology icon
  const getTechIcon = (tech: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'React': <SiReact />,
      'Next.js': <SiNextdotjs />,
      'Node.js': <SiNodedotjs />,
      'Firebase': <SiFirebase />,
      'MongoDB': <SiMongodb />,
      'Stripe': <SiStripe />,
      'TailwindCSS': <SiTailwindcss />,
      'Tailwind CSS': <SiTailwindcss />,
      'Redux': <SiRedux />,
      'Redux/Context API': <SiRedux />,
      'Framer Motion': <SiFramer />,
      'D3.js': <SiD3Dotjs />,
      'Express': <SiExpress />,
      'GraphQL': <SiGraphql />,
      'TypeScript': <SiTypescript />,
      'Typescript': <SiTypescript />,
      'Vue.js': <SiVuedotjs />,
      'Laravel': <SiLaravel />,
      'MySQL': <SiMysql />,
      'PostgreSQL': <SiPostgresql />,
      'Prisma ORM': <SiPrisma />,
      'OpenAI API': <SiOpenai />,
      'Bootstrap': <SiBootstrap />,
    };
    
    return iconMap[tech] || <FiColumns />;
  };
  
  // Get background color for tag
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      'React': '#61DAFB',
      'Next.js': '#FFA500',
      'Node.js': '#8CC84B',
      'Firebase': '#FFCA28',
      'MongoDB': '#47A248',
      'Stripe': '#635BFF',
      'TailwindCSS': '#38B2AC',
      'Tailwind CSS': '#38B2AC',
      'Redux': '#764ABC',
      'Redux/Context API': '#764ABC',
      'Framer Motion': '#0055FF',
      'D3.js': '#F9A03C',
      'Express': '#FFA500',
      'WebSockets': '#E05D50',
      'OpenAI API': '#10A37F',
      'React Native': '#61DAFB',
      'GraphQL': '#E535AB',
      'TypeScript': '#3178C6',
      'Typescript': '#3178C6',
      'Vue.js': '#4FC08D',
      'Animations': '#FF3E00',
      'Laravel': '#FF2D20',
      'Bootstrap': '#7952B3',
      'MySQL': '#4479A1',
      'React Hook Form': '#EC5990',
      'NextAuth.js': '#2F855A',
      'Next.js API ROUTES': '#111111',
      'PostgreSQL': '#336791',
      'Prisma ORM': '#5A67D8',
      'Shadcn UI': '#000000',
      'date-fns': '#F0DB4F',
      'Chart.js': '#FF6384'
    };
    
    return tagColors[tag] || '#CCCCCC';
  };
  
  // Handle image click
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // Add no-scroll class to body
    document.body.style.overflow = 'hidden';
    
    // Pre-load image for smoother animation
    const img = new Image();
    img.src = imageUrl;
  };

  // Handle close modal
  const handleCloseModal = (e?: React.MouseEvent) => {
    // Prevent event bubbling if this is from a button
    if (e) {
      e.stopPropagation();
    }
    
    // Set the closing flag
    setIsClosing(true);
    
    // After animation completes, remove the modal
    setTimeout(() => {
      setSelectedImage(null);
      document.body.style.overflow = '';
      setIsClosing(false);
    }, 500);
  };
  
  // Initialize animations for all projects
  const initProjectAnimations = () => {
    if (projectsRef.current) {
      // Get all project cards (direct children of projectsRef)
      const projectCards = projectsRef.current.children;
      
      // First, clear any existing ScrollTrigger instances for these elements
      Array.from(projectCards).forEach(card => {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === card) {
            trigger.kill();
          }
        });
      });

      // Masonry layout animations: cards appear with randomized delays
      Array.from(projectCards).forEach((card, index) => {
        const delay = (index % 3) * 0.15; // Randomize delay based on column position
        const animatable = card.querySelectorAll('.animate-item');
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 30 + (index % 2) * 20, // Varied starting positions
            rotationZ: (index % 2 === 0 ? -2 : 2), // Slight rotation for neo-brutalist feel
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationZ: 0,
            duration: 0.7,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=70px",
              end: "bottom top+=100px",
              toggleActions: "play reverse restart reverse", // Play when scrolling down, reverse when scrolling up
              scrub: 0.5, // Smooth animation tied to scroll position
            }
          }
        );
        
        // Animate content elements with stagger
        gsap.fromTo(animatable,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: delay + 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50px",
              end: "center center",
              toggleActions: "play reverse restart reverse", // Play when scrolling down, reverse when scrolling up
              scrub: 0.3, // Smooth animation tied to scroll position
            }
          }
        );
      });
    }
  };
  
  useEffect(() => {
    // Re-initialize animations
    initProjectAnimations();
  }, []);
  
  useEffect(() => {
    const shape1 = shape1Ref.current;
    const shape2 = shape2Ref.current;
    const section = sectionRef.current;
    const projectsContainer = projectsRef.current;
    const header = headerRef.current; // Store headerRef

    // Create an array of all animation elements for better control
    const animateElements = [
      {
        ref: headerRef.current,
        fromVars: { opacity: 0, y: 40 },
        toVars: { opacity: 1, y: 0, duration: 0.6 },
        trigger: { start: "top bottom-=100", end: "bottom top+=100" }
      },
      {
        ref: sectionRef.current ? sectionRef.current.querySelectorAll('.bg-rect') : null,
        fromVars: { opacity: 0, scale: 0.95 },
        toVars: { opacity: 1, scale: 1, stagger: 0.02, duration: 0.5 },
        trigger: { start: "top bottom", end: "center center", scrub: 1 }
      }
    ];

    // Apply animations with proper reverse settings
    animateElements.forEach(({ref, fromVars, toVars, trigger}) => {
      if (!ref) return;
      
      gsap.fromTo(ref, 
        fromVars,
        { 
          ...toVars,
          scrollTrigger: {
            trigger: ref,
            start: trigger.start,
            end: trigger.end,
            toggleActions: "play reverse restart reverse", // Controls animation in both directions
            scrub: trigger.scrub || false,
          }
        }
      );
    });
    
    // Initialize project animations
    initProjectAnimations();
    
    // Animated background shapes
    if (shape1 && section) {
      // Create parallax effect for shape1 when scrolling
      gsap.to(shape1, {
        rotation: 15,
        scale: 1.1,
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Smooth parallax effect
        }
      });
      
      // Also add the hover animation
      gsap.to(shape1, {
        rotation: 15,
        scale: 1.1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (shape2 && section) {
      // Create parallax effect for shape2 when scrolling
      gsap.to(shape2, {
        y: -80,
        rotation: -15,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2, // Smoother, delayed effect compared to shape1
        }
      });
      
      // Also add the hover animation
      gsap.to(shape2, {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Create scroll markers animation for debugging
    if (process.env.NODE_ENV === 'development') {
      ScrollTrigger.defaults({
        markers: false // Set to true to see ScrollTrigger markers (helpful for debugging)
      });
    }
    
    // Set up scroll-based animation for the entire section
    if (section) {
      gsap.fromTo(section, { backgroundColor: 'rgba(255, 255, 255, 0)' }, {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true,
          toggleActions: "play reverse play reverse"
        }
      });
    }
    
    // Apply header animation
    if (header) {
        gsap.fromTo(header, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            scrollTrigger: {
              trigger: header,
              start: "top bottom-=100",
              end: "bottom top+=100", 
              toggleActions: "play reverse restart reverse"
            }
          }
        );
    }
    
    return () => {
      // Cleanup animations
      if (shape1) gsap.killTweensOf(shape1);
      if (shape2) gsap.killTweensOf(shape2);
      if (section) gsap.killTweensOf(section);
      // Cleanup project card animations (more specific is better)
      if (projectsContainer) {
        const projectCards = projectsContainer.children;
        Array.from(projectCards).forEach(card => {
            gsap.killTweensOf(card);
            const animatable = card.querySelectorAll('.animate-item');
            gsap.killTweensOf(animatable);
        });
      }
      // Cleanup header animation
      if (header) gsap.killTweensOf(header); 
      
      ScrollTrigger.getAll().forEach(st => st.kill()); // General cleanup
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="projects" className="py-20 px-8 relative overflow-hidden">
      {/* Background pattern - Staggered rectangles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* First row */}
        <div className="bg-rect absolute top-[5%] left-[10%] w-[15%] h-[8%] border-2 border-black/10 bg-[var(--accent)]/5"></div>
        <div className="bg-rect absolute top-[5%] left-[30%] w-[25%] h-[12%] border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        <div className="bg-rect absolute top-[5%] left-[60%] w-[20%] h-[10%] border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
        
        {/* Second row */}
        <div className="bg-rect absolute top-[18%] left-[5%] w-[22%] h-[15%] border-2 border-black/10 bg-[var(--primary)]/5"></div>
        <div className="bg-rect absolute top-[18%] left-[32%] w-[18%] h-[10%] border-2 border-black/10 bg-[var(--secondary)]/5"></div>
        <div className="bg-rect absolute top-[18%] left-[55%] w-[30%] h-[12%] border-2 border-black/10 bg-[var(--accent)]/5"></div>
        
        {/* Third row */}
        <div className="bg-rect absolute top-[35%] left-[12%] w-[28%] h-[10%] border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        <div className="bg-rect absolute top-[35%] left-[45%] w-[15%] h-[14%] border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
        <div className="bg-rect absolute top-[35%] left-[65%] w-[22%] h-[8%] border-2 border-black/10 bg-[var(--primary)]/5"></div>
        
        {/* Fourth row */}
        <div className="bg-rect absolute top-[50%] left-[8%] w-[20%] h-[12%] border-2 border-black/10 bg-[var(--secondary)]/5"></div>
        <div className="bg-rect absolute top-[50%] left-[33%] w-[25%] h-[10%] border-2 border-black/10 bg-[var(--accent)]/5"></div>
        <div className="bg-rect absolute top-[50%] left-[63%] w-[18%] h-[15%] border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        
        {/* Fifth row */}
        <div className="bg-rect absolute top-[67%] left-[15%] w-[25%] h-[10%] border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
        <div className="bg-rect absolute top-[67%] left-[45%] w-[20%] h-[12%] border-2 border-black/10 bg-[var(--primary)]/5"></div>
        <div className="bg-rect absolute top-[67%] left-[70%] w-[15%] h-[8%] border-2 border-black/10 bg-[var(--secondary)]/5"></div>
        
        {/* Sixth row */}
        <div className="bg-rect absolute top-[82%] left-[5%] w-[22%] h-[12%] border-2 border-black/10 bg-[var(--accent)]/5"></div>
        <div className="bg-rect absolute top-[82%] left-[32%] w-[28%] h-[10%] border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        <div className="bg-rect absolute top-[82%] left-[65%] w-[20%] h-[14%] border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[var(--background)] opacity-80 z-0"></div>
      <div className="absolute top-20 right-20 w-32 h-32 dotted-pattern z-0 opacity-50"></div>
      <div className="absolute bottom-40 left-10 w-40 h-40 zigzag-pattern z-0 opacity-40"></div>
      
      {/* Animated shapes */}
      <div 
        ref={shape1Ref}
        className="absolute top-60 right-40 w-20 h-20 bg-[var(--tertiary)] border-4 border-black z-0"
      />
      
      <div 
        ref={shape2Ref}
        className="absolute bottom-20 right-1/4 w-16 h-16 rounded-full bg-[var(--quaternary)] border-4 border-black z-0"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className="mb-12 relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 diagonal-stripes z-0" />
          <h2 className="neo-title relative z-10">PROJECTS</h2>
          <div className="w-40 h-2 bg-[var(--primary)] mt-4"></div>
          <p className="neo-statement mt-6 text-xl max-w-2xl relative">
            A showcase of my <span className="text-[var(--secondary)]">recent work</span>, featuring web applications built with <span className="text-[var(--tertiary)]">modern technologies</span>.
          </p>
          
          {/* Decorative element */}
          <div className="absolute -right-5 top-10 w-10 h-10 bg-[var(--primary)] border-4 border-black transform rotate-12"></div>
        </div>

        {/* Projects section - grid layout for consistent sizing */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div 
              key={index} 
              className="mb-8 transform-gpu shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)]"
              style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
            >
              <div className="border-4 border-black overflow-hidden h-full flex flex-col bg-white">
                {/* Colored header with title */}
                <div 
                  className="px-4 py-2" 
                  style={{ backgroundColor: project.color }}
                >
                  <h3 className="text-xl font-bold text-center text-white uppercase tracking-wider"
                      style={{ color: 'white', textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
                    {project.title.toUpperCase()}
                  </h3>
                </div>
                
                {/* White content area */}
                <div className="p-4 flex-grow flex flex-col">
                  {/* Project Image */}
                  <div 
                    className="overflow-hidden border-2 border-black mb-4 cursor-pointer hover:opacity-90 transition-opacity relative group"
                    onClick={() => handleImageClick(project.image)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300">
                      <div className="transform scale-0 group-hover:scale-100 bg-[var(--accent)] text-black font-bold py-1 px-3 rounded-md border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] transition-transform duration-300">
                        Click to Zoom
                      </div>
                    </div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-[180px] object-cover"
                    />
                  </div>
                  
                  <div className="my-4 py-2 px-3 border-l-4 border-black bg-gray-100">
                    <p className="text-black font-medium text-sm md:text-base" style={{ color: 'black', lineHeight: '1.5' }}>{project.description}</p>
                  </div>
                  
                  {/* Tags displayed with icons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => {
                      const bgColor = getTagColor(tag);
                      const textColor = ['#000000', '#FFCA28', '#61DAFB', '#F9A03C', '#38B2AC', '#F0DB4F'].includes(bgColor) ? 'black' : 'white';
                      
                      return (
                        <span 
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-black"
                          style={{ backgroundColor: bgColor, color: textColor }}
                        >
                          <span className="text-[1em]">
                            {getTechIcon(tag)}
                          </span>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <div className="w-[36px] h-[36px] border-[1.5px] border-black bg-white flex items-center justify-center" 
                         onClick={() => window.open(project.githubUrl, '_blank')}
                         style={{ cursor: 'pointer' }}>
                      <GitHubIcon style={{ 
                        fontSize: 22,
                        color: "#000000", 
                        display: "block",
                        width: "22px", 
                        height: "22px"
                      }} />
                    </div>
                    <div className="w-[36px] h-[36px] border-[1.5px] border-black bg-[#E05D50] flex items-center justify-center" 
                         onClick={() => window.open(project.liveUrl, '_blank')}
                         style={{ cursor: 'pointer' }}>
                      <LaunchIcon style={{ 
                        fontSize: 20,
                        color: "#FFFFFF", 
                        display: "block",
                        width: "20px", 
                        height: "20px"
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen image modal */}
      {selectedImage && (
        <div 
          ref={modalRef}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 ${isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`}
          onClick={handleCloseModal}
          style={{
            transformOrigin: 'center'
          }}
        >
          <div 
            ref={modalContentRef}
            className={`max-w-5xl w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformOrigin: 'center'
            }}
          >
            <div className="bg-[var(--primary)] py-2 px-4 flex items-center justify-between border-b-4 border-black">
              <h3 className="text-xl font-bold text-white">PROJECT IMAGE</h3>
              <button 
                ref={closeButtonRef}
                onClick={handleCloseModal}
                className={`close-x-button w-8 h-8 bg-[var(--accent)] text-black font-bold flex items-center justify-center border-2 border-black hover:brightness-110 transform hover:scale-110 active:scale-95 ${isClosing ? 'animate-button-out' : ''}`}
              >
                ✕
              </button>
            </div>
            <div className="p-4 max-h-[80vh] overflow-hidden bg-gray-100">
              <img 
                ref={modalImageRef}
                src={selectedImage} 
                alt="Project full view"
                className={`w-full object-contain max-h-[70vh] border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)] ${isClosing ? 'animate-image-out' : 'animate-image-in'}`}
                style={{
                  transformOrigin: 'center'
                }}
              />
            </div>
            <div className="flex justify-center p-4 border-t-4 border-black bg-gray-100">
              <button 
                onClick={handleCloseModal}
                className={`neo-button bg-[var(--tertiary)] text-black cursor-pointer px-6 ${isClosing ? 'animate-button-out' : 'animate-button-in'}`}
                style={{
                  opacity: isClosing ? '' : '0',
                  transform: isClosing ? '' : 'translateY(20px)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects; 