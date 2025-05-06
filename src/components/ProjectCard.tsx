'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  reverse?: boolean;
  color?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  reverse = false,
  color = 'var(--accent)',
}: ProjectProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const imageContainer = imageRef.current;
    const card = cardRef.current; // Assuming cardRef is used for ScrollTrigger
    let hoverTl: gsap.core.Timeline | null = null;

    if (card) {
      // Main card animation
      gsap.fromTo(card,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate content elements with stagger
      const contentElements = card.querySelectorAll('.animate-item');
      gsap.fromTo(contentElements,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50px",
          }
        }
      );
    }
    
    // Image hover effect setup
    const handleMouseEnter = () => hoverTl?.play();
    const handleMouseLeave = () => hoverTl?.reverse();

    if (imageContainer) {
      const image = imageContainer.querySelector('img');
      
      if (image) {
        hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(image, { scale: 1.05, duration: 0.5, ease: "power1.out" });
        
        imageContainer.addEventListener('mouseenter', handleMouseEnter);
        imageContainer.addEventListener('mouseleave', handleMouseLeave);
      }
    }
    
    return () => {
      // Clean up event listeners
      if (imageContainer) {
        imageContainer.removeEventListener('mouseenter', handleMouseEnter);
        imageContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      // Kill GSAP tweens
      if (hoverTl) hoverTl.kill();
      if (card) {
          gsap.killTweensOf(card);
          const contentElements = card.querySelectorAll('.animate-item');
          gsap.killTweensOf(contentElements);
      }
      // Clean up ScrollTriggers associated with this card
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === card) {
          // st.kill(); // Consider killing specific triggers
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`grid grid-cols-1 ${reverse ? 'md:grid-cols-[5fr_7fr]' : 'md:grid-cols-[7fr_5fr]'} gap-8 md:gap-12 items-center my-20`}
    >
      <div className={reverse ? 'md:order-2' : ''}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold animate-item">{title}</h3>
          
          <p className="animate-item">{description}</p>
          
          <div className="flex flex-wrap gap-2 pt-2 animate-item">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="neo-box px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: color, borderColor: 'black' }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 pt-4 animate-item">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 neo-button bg-white text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="View source code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 neo-button bg-[var(--primary)] text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:brightness-110 active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                aria-label="View live demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <g fill="none" fillRule="evenodd">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </g>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className={reverse ? 'md:order-1' : ''}>
        <div ref={imageRef} className="neo-box neo-box-hover overflow-hidden animate-item" style={{ backgroundColor: color }}>
          {/* Image container */}
          <div className="neo-box m-2 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 