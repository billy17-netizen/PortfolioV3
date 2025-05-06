'use client';

import { useEffect, useRef } from 'react';
import { FiCode, FiServer, FiTool } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = {
  frontend: [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript',
    'React.js', 'Next.js', 'TailwindCSS', 'Framer Motion',
    'Redux', 'Styled Components', 'Material UI', 'Shadcn UI',
    'Bootstrap'
  ],
  backend: [
    'Express.js', 'Prisma ORM', 'PostgreSQL',
    'MySQL', 'Laravel', 'PHP'
  ],
  tools: [
    'Git', 'GitHub', 'VS Code', 'Figma',
    'CI/CD', 'Ngrok', 'Postman'
  ]
};

const SkillCategory = ({ title, icon, skills, color, pattern }: { 
  title: string; 
  icon: React.ReactNode; 
  skills: string[];
  color: string;
  pattern?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const skillsContainer = skillsRef.current;

    // Card animation
    if (card) {
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          scale: 0.9, 
          y: 20,
          rotationX: 8,
          transformPerspective: 800,
          transformOrigin: "center bottom"
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          rotationX: 0, 
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            end: "top center+=100px",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }
    
    // Title shake animation on hover
    const handleMouseEnter = () => {
      if (title) {
        gsap.to(title, {
          rotation: 2,
          duration: 0.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1
        });
      }
    };
    if (title) {
      title.addEventListener('mouseenter', handleMouseEnter);
    }
    
    // Skills tags animation
    if (skillsContainer) {
      const skillTags = skillsContainer.querySelectorAll('.skill-tag');
      gsap.fromTo(skillTags, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3,
          stagger: 0.05,
          scrollTrigger: {
            trigger: skillsContainer,
            start: "top bottom-=50px",
            end: "top center+=100px",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }
    
    return () => {
      if (title) {
        title.removeEventListener('mouseenter', handleMouseEnter);
      }
      // Kill GSAP tweens associated with elements in this component
      if (card) gsap.killTweensOf(card);
      if (title) gsap.killTweensOf(title);
      if (skillsContainer) {
          const skillTags = skillsContainer.querySelectorAll('.skill-tag');
          gsap.killTweensOf(skillTags);
      }
      // Consider more targeted ScrollTrigger cleanup if necessary
      ScrollTrigger.getAll().forEach(st => {
          if (st.vars.trigger === card || st.vars.trigger === skillsContainer) {
             // st.kill(); // Potentially kill related triggers
          }
      });
    };
  }, []); // Empty dependency array seems correct here

  // Function to vary skill tag colors
  const getSkillTagColor = (index: number) => {
    const colors = [
      'bg-blue-600',
      'bg-[var(--primary)]',
      'bg-[var(--secondary)]',
      'bg-[var(--tertiary)]',
      'bg-[var(--quaternary)]',
      'bg-[var(--accent)]'
    ];
    return colors[index % colors.length];
  };
  
  // Function to get rotation angles for skill tags
  const getSkillTagRotation = (index: number) => {
    const rotations = [-2, -1, 0, 1, 2];
    return rotations[index % rotations.length];
  };

  return (
    <div
      ref={cardRef}
      className={`border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] 
        hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${pattern}
        transform rotate-[-1deg] hover:rotate-[0deg]`}
      style={{ backgroundColor: color }}
    >
      <div className="border-4 border-black bg-white m-2">
        {/* Card header with title */}
        <div ref={titleRef} className="relative border-b-4 border-black p-5 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`, 
            backgroundSize: '15px 15px'
          }}></div>
          
          {/* Header content */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="border-4 border-black p-3 bg-blue-600 text-white rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {icon}
              </div>
              <h3 className="border-4 border-black py-2 px-4 bg-blue-600 text-white font-statement text-2xl rotate-[1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {title}
              </h3>
            </div>
            <div className="w-1/3 h-2 bg-black"></div>
          </div>
          
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-black border-r-transparent"></div>
        </div>
        
        {/* Card body with skills */}
        <div ref={skillsRef} className="flex flex-wrap gap-3 p-6 bg-[#f5f5f5]">
          {skills.map((skill, index) => {
            const rotation = getSkillTagRotation(index);
            return (
              <span 
                key={skill}
                className={`skill-tag inline-block px-3 py-2 ${getSkillTagColor(index)} text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1
                  text-sm font-statement font-bold mb-2 mr-2 transition-all duration-200`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {skill}
              </span>
            );
          })}
        </div>
        
        {/* Card footer with decorative elements */}
        <div className="bg-black h-6 relative">
          <div className="absolute -bottom-3 left-6 w-6 h-6 bg-white border-4 border-black rotate-45"></div>
          <div className="absolute -bottom-3 right-6 w-6 h-6 bg-white border-4 border-black rounded-full"></div>
          
          {/* Additional decorative element */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-[var(--primary)] border-2 border-black"></div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const decorRef1 = useRef<HTMLDivElement>(null);
  const decorRef2 = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const decor1 = decorRef1.current;
    const decor2 = decorRef2.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    // Title animation
    if (title) {
      gsap.fromTo(title,
        { 
          opacity: 0, 
          y: 20, 
          rotationX: 5, 
          transformPerspective: 800, 
          transformOrigin: "center bottom" 
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: title,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }
    
    // Grid items animation
    if (grid) {
      const gridItems = grid.querySelectorAll('.grid-item');
      gsap.fromTo(gridItems,
        { 
          opacity: 0, 
          y: 30, 
          rotationX: 10,
          scale: 0.95,
          transformPerspective: 1000,
          transformOrigin: "center bottom"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: grid,
            start: "top bottom-=50",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }
    
    // Decorative elements animations
    if (decor1) {
      gsap.to(decor1, {
        rotation: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (decor2) {
      gsap.to(decor2, {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Cleanup function
    return () => {
      if (decor1) gsap.killTweensOf(decor1);
      if (decor2) gsap.killTweensOf(decor2);
      // Kill other tweens if necessary
      if (title) gsap.killTweensOf(title);
      if (grid) {
          const gridItems = grid.querySelectorAll('.grid-item');
          gsap.killTweensOf(gridItems);
      }
      ScrollTrigger.getAll().forEach(st => st.kill()); // General cleanup
    };
  }, []); // Empty dependency array seems correct here

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Enhanced background pattern - Cross pattern */}
      <div className="absolute inset-0 cross-pattern z-0"></div>
      
      {/* Confetti pattern for visual interest */}
      <div className="absolute inset-0 confetti-pattern z-0"></div>
      
      {/* Colored gradient areas */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10 z-0" style={{ background: 'var(--gradient-2)' }}></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 opacity-10 z-0" style={{ background: 'var(--gradient-1)' }}></div>
      
      {/* Circle pattern background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circles */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full border-2 border-black/10 bg-[var(--accent)]/5"></div>
        <div className="absolute top-[60%] left-[70%] w-[45%] h-[45%] rounded-full border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        <div className="absolute top-[40%] left-[-15%] w-[35%] h-[35%] rounded-full border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
        
        {/* Medium circles */}
        <div className="absolute top-[10%] left-[65%] w-[25%] h-[25%] rounded-full border-2 border-black/10 bg-[var(--primary)]/5"></div>
        <div className="absolute top-[70%] left-[5%] w-[30%] h-[30%] rounded-full border-2 border-black/10 bg-[var(--secondary)]/5"></div>
        <div className="absolute top-[35%] left-[40%] w-[28%] h-[28%] rounded-full border-2 border-black/10 bg-[var(--accent)]/5"></div>
        
        {/* Small circles */}
        <div className="absolute top-[25%] left-[25%] w-[15%] h-[15%] rounded-full border-2 border-black/10 bg-[var(--tertiary)]/5"></div>
        <div className="absolute top-[55%] left-[55%] w-[12%] h-[12%] rounded-full border-2 border-black/10 bg-[var(--quaternary)]/5"></div>
        <div className="absolute top-[75%] left-[40%] w-[10%] h-[10%] rounded-full border-2 border-black/10 bg-[var(--primary)]/5"></div>
        <div className="absolute top-[15%] left-[45%] w-[8%] h-[8%] rounded-full border-2 border-black/10 bg-[var(--secondary)]/5"></div>
        <div className="absolute top-[45%] left-[75%] w-[10%] h-[10%] rounded-full border-2 border-black/10 bg-[var(--accent)]/5"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-[var(--background)] opacity-70 z-0"></div>
      
      {/* Background patterns */}
      <div className="absolute top-10 right-10 w-40 h-40 dotted-pattern z-0"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 zigzag-pattern opacity-30 z-0"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 wavy-pattern opacity-20 z-0 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="mb-16 relative"
        >
          {/* Decorative elements for the title */}
          <div className="absolute -top-6 -left-6 w-20 h-20 diagonal-stripes z-0" />
          <div className="absolute -right-6 top-10 w-12 h-12 bg-[var(--quaternary)] border-4 border-black z-0 rotate-12" />
          
          <h2 className="neo-title relative z-10">SKILLS</h2>
          <div className="w-40 h-2 bg-[var(--primary)] mt-4"></div>
          <p className="neo-statement mt-6 max-w-2xl text-base sm:text-lg md:text-xl">
            My technical toolkit spans the <span className="text-[var(--tertiary)]">entire development stack</span>, from <span className="text-[var(--quaternary)]">frontend interfaces</span> to <span className="text-[var(--secondary)]">backend systems</span>.
          </p>
        </div>

        {/* Skills grid with enhanced responsive layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        >
          <div className="grid-item transform md:translate-y-6">
            <SkillCategory 
              title="Frontend" 
              icon={<FiCode size={24} className="text-white" />} 
              skills={SKILLS.frontend}
              color="var(--accent)"
              pattern="dotted-pattern"
            />
          </div>
          
          <div className="grid-item">
            <SkillCategory 
              title="Backend" 
              icon={<FiServer size={24} className="text-white" />} 
              skills={SKILLS.backend}
              color="var(--tertiary)"
            />
          </div>
          
          <div className="grid-item transform md:translate-y-6">
            <SkillCategory 
              title="Tools & Others" 
              icon={<FiTool size={24} className="text-white" />} 
              skills={SKILLS.tools}
              color="var(--quaternary)"
            />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div 
          ref={decorRef1}
          className="absolute -bottom-6 right-10 w-24 h-24 border-4 border-black bg-[var(--primary)] z-0 hidden md:block"
        />
        
        <div 
          ref={decorRef2}
          className="absolute -top-10 right-1/3 w-16 h-16 border-4 border-black rounded-full bg-[var(--secondary)] z-0 hidden md:block"
        />
      </div>
    </section>
  );
};

export default Skills; 