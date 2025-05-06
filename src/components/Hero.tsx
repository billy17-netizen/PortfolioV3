'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDown } from 'react-icons/fi';
import { scrollTo } from '@/utils/smoothScroll';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define pattern colors based on indices, not random values
const getPatternColor = (index: number) => {
  const colors = [
    'bg-[var(--accent)]/10',
    'bg-[var(--tertiary)]/10',
    'bg-[var(--quaternary)]/10',
    'bg-[var(--primary)]/10',
    'bg-[var(--secondary)]/10',
    ''
  ];
  return colors[index % colors.length];
};

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const floatingBlock1Ref = useRef<HTMLDivElement>(null);
  const floatingBlock2Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Add fallback styles to ensure content is visible before JS loads
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Ensure text is visible before JS loads */
      .ensure-visible {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Add shadow for neo-brutalist elements */
      .shadow-neo {
        box-shadow: 4px 4px 0px rgba(0,0,0,0.8);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  useEffect(() => {
    // Main timeline for coordinated animations
    const mainTl = gsap.timeline({ defaults: { ease: "power2.out" }});
    
    // Text splitting and animation with fallback
    if (titleRef.current) {
      try {
        // Get the spans inside the h1 with HTMLElement casting
        const topLine = titleRef.current.querySelector('span:first-child') as HTMLElement;
        const bottomLine = titleRef.current.querySelector('span:last-child') as HTMLElement;
        
        if (topLine && bottomLine) {
          // Process the top line (FULLSTACK)
          const topChars = topLine.innerText.split('');
          topLine.innerHTML = '';
          
          topChars.forEach((char: string) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.display = 'inline-block';
            span.style.color = 'white'; // Explicitly set white color
            span.style.opacity = '1';
            topLine.appendChild(span);
          });
          
          // Process the bottom line (WEB DEVELOPER) - word by word instead of character by character
          bottomLine.innerHTML = '';
          
          // Split into words
          const words = ['WEB', 'DEVELOPER'];
          
          words.forEach((word, index) => {
            // Create word container
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.className = 'text-[var(--primary)]';
            
            // Add each character to the word
            word.split('').forEach(char => {
              const charSpan = document.createElement('span');
              charSpan.innerText = char;
              charSpan.style.display = 'inline-block';
              charSpan.style.opacity = '1';
              wordSpan.appendChild(charSpan);
            });
            
            // Add the word to the bottom line
            bottomLine.appendChild(wordSpan);
            
            // Add space between words (if not the last word)
            if (index < words.length - 1) {
              const spaceSpan = document.createElement('span');
              spaceSpan.innerHTML = '&nbsp;';
              spaceSpan.style.display = 'inline-block';
              spaceSpan.style.width = '0.5em';
              bottomLine.appendChild(spaceSpan);
            }
          });
          
          // Animate top line
          mainTl.fromTo(
            topLine.children, 
            { opacity: 0.3, y: 10 },
            { opacity: 1, y: 0, color: 'white', duration: 0.1, stagger: 0.05, ease: "power2.out" },
            0.3
          );
          
          // Select all spans within wordSpans for animation
          const bottomChars = bottomLine.querySelectorAll('span > span');
          
          // Animate bottom line with delay
          mainTl.fromTo(
            bottomChars, 
            { opacity: 0.3, y: 10 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.1, 
              stagger: 0.05, 
              ease: "power2.out",
              color: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
            },
            0.5
          );
        }
      } catch (error) {
        // Fallback if animation fails
        console.error('Title animation failed, using fallback', error);
        gsap.set(titleRef.current, { opacity: 1 });
      }
    }
    
    // Introduction section animation
    if (introRef.current) {
      // Create a reference to the greeting element
      const greetingEl = introRef.current.querySelector('.greeting-text');
      
      // Animate the greeting with a bounce-in effect
      if (greetingEl) {
        mainTl.fromTo(greetingEl,
          { opacity: 0, scale: 0.8, y: -15 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "back.out(1.7)"
          },
          0.1 // Start early in the timeline
        );
      }
      
      // Skip the first child (greeting) and animate the rest
      const introElements = Array.from(introRef.current.children).slice(1);
      
      // Animate the rest of the intro elements
      mainTl.fromTo(introElements, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        0.2
      );
    }
    
    // Code editor animation
    if (codeEditorRef.current) {
      mainTl.fromTo(codeEditorRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6 },
        0.5
      );
      
      // Animate decorative elements
      const decorElements = codeEditorRef.current.querySelectorAll('.decor-element');
      mainTl.fromTo(decorElements,
        { opacity: 0, scale: 0, rotate: 0 },
        { opacity: 1, scale: 1, rotate: (i) => i === 0 ? 12 : 0, duration: 0.4, stagger: 0.1 },
        0.8
      );

      // Add typing animation for code
      const codeElement = document.getElementById('code-text');
      if (codeElement) {
        const codeString = `<span class="text-blue-400">function</span> <span class="text-green-400">Developer</span>() {
  <span class="text-blue-400">const</span> skills = [
    <span class="text-orange-300">'PHP'</span>,
    <span class="text-orange-300">'Vue.js'</span>,
    <span class="text-orange-300">'JavaScript'</span>,
    <span class="text-orange-300">'React'</span>,
    <span class="text-orange-300">'TypeScript'</span>,
    <span class="text-orange-300">'Laravel'</span>,
    <span class="text-orange-300">'Next.js'</span>,
    <span class="text-orange-300">'Bootstrap'</span>,
    <span class="text-orange-300">'TailwindCSS'</span>
  ];
  
  <span class="text-blue-400">return</span> (
    &lt;<span class="text-yellow-300">Person</span> 
      <span class="text-pink-400">passionate</span>={<span class="text-cyan-300">true</span>}
      <span class="text-pink-400">creative</span>={<span class="text-cyan-300">true</span>}
      <span class="text-pink-400">problemSolver</span>={<span class="text-cyan-300">true</span>}
      <span class="text-pink-400">skills</span>={skills}
    /&gt;
  );
}`;

        // Split the string by HTML tags and text
        const htmlTagRegex = /(<[^>]+>)|([^<]+)/g;
        const parts = codeString.match(htmlTagRegex) || [];
        
        let currentText = '';
        let currentIndex = 0;
        
        // Type animation
        const typeNextChar = () => {
          if (currentIndex < parts.length) {
            const part = parts[currentIndex];
            currentText += part;
            codeElement.innerHTML = currentText + '<span class="animate-pulse border-r-2 border-white h-5 inline-block"></span>';
            currentIndex++;
            
            // If it's an HTML tag, don't delay, immediately type the next char
            // This creates the effect of only text being typed, not the HTML tags
            if (part.startsWith('<') && part.endsWith('>')) {
              setTimeout(typeNextChar, 0);
            } else {
              // Random typing speed between 30-70ms for more natural effect
              const typingSpeed = Math.random() * 70 + 80;
              setTimeout(typeNextChar, typingSpeed);
            }
          }
        };
        
        // Start typing animation after the code editor appears
        mainTl.call(typeNextChar, [], 1.2);
      }
    }
    
    // Floating blocks animation
    if (floatingBlock1Ref.current) {
      gsap.to(floatingBlock1Ref.current, {
        y: 15,
        rotate: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (floatingBlock2Ref.current) {
      gsap.to(floatingBlock2Ref.current, {
        y: -20,
        x: 15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Background patterns staggered reveal
    if (sectionRef.current) {
      const patterns = sectionRef.current.querySelectorAll('.pattern-element');
      gsap.fromTo(patterns, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.03,
          ease: "power1.out" 
        }
      );
    }
    
    return () => {
      // Cleanup animations when component unmounts
      if (floatingBlock1Ref.current) gsap.killTweensOf(floatingBlock1Ref.current);
      if (floatingBlock2Ref.current) gsap.killTweensOf(floatingBlock2Ref.current);
      if (scrollIndicatorRef.current) gsap.killTweensOf(scrollIndicatorRef.current);
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen relative flex flex-col justify-center px-8 py-20 overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 z-0">
        {Array.from({ length: 144 }).map((_, i) => (
          <div 
            key={i}
            className={`pattern-element border border-black/10 ${getPatternColor(i)}`}
          />
        ))}
      </div>

      {/* Larger Grid Elements */}
      <div className="absolute top-0 right-0 w-full h-full grid grid-cols-6 grid-rows-6 z-0">
        {Array.from({ length: 36 }).map((_, i) => (
          <div 
            key={i}
            className={`pattern-element border-2 border-black/20 ${i % 4 === 0 ? getPatternColor(i) : ''}`}
          />
        ))}
      </div>

      {/* Background elements */}
      <div className="pattern-element absolute top-0 right-0 w-1/3 h-1/3 diagonal-stripes z-0" />
      <div className="pattern-element absolute bottom-20 left-0 w-1/4 h-1/4 dotted-pattern z-0" />
      <div className="pattern-element absolute top-1/4 left-10 w-20 h-20 zigzag-pattern z-0 rounded-full" />
      <div className="pattern-element absolute bottom-40 right-10 w-32 h-32 wavy-pattern z-0" />
      
      {/* Floating color blocks */}
      <div 
        ref={floatingBlock1Ref}
        className="absolute top-20 right-1/4 w-16 h-16 bg-[var(--tertiary)] border-4 border-black z-0"
      />
      
      <div 
        ref={floatingBlock2Ref}
        className="absolute bottom-40 left-1/3 w-12 h-12 bg-[var(--quaternary)] border-4 border-black rounded-full z-0"
      />
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              ref={introRef}
              className="space-y-6"
            >
              <div className="inline-block neo-box px-4 py-2 bg-[var(--accent)] mb-4">
                <span className="font-statement greeting-text text-black" style={{ fontWeight: 'bold' }}>👋 Hi there, I am</span>
              </div>
              
              <h1 ref={titleRef} className="neo-title tracking-wider ensure-visible">
                <span className="text-white block" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>FULLSTACK</span>
                <span className="text-[var(--primary)] block" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>WEB DEVELOPER</span>
              </h1>
              
              <p className="neo-statement text-2xl max-w-md">
                Crafting <span className="text-[var(--quaternary)] px-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '2px' }}>beautiful</span>, 
                <span className="text-[var(--tertiary)] px-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '2px' }}> functional</span> websites with 
                <span className="text-[var(--secondary)] px-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '2px' }}> modern</span> technologies.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#projects" 
                  className="neo-button bg-[var(--tertiary)] text-black cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#projects');
                  }}
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="neo-button bg-[var(--quaternary)] text-black cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div 
              ref={codeEditorRef}
              className="neo-box bg-[var(--accent)] p-1 relative"
            >
              {/* Code Editor Box */}
              <div className="neo-box bg-white p-0 m-3 relative overflow-hidden">
                {/* Title Bar */}
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="text-white text-xs font-mono">Developer.js</div>
                  <div className="flex space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full bg-[var(--primary)] hover:brightness-110 cursor-pointer transition-all"
                      onClick={() => {
                        // Close animation
                        const codeEditor = codeEditorRef.current;
                        if (codeEditor) {
                          // Shake effect
                          gsap.to(codeEditor, {
                            x: (i) => [-5, 5, -3, 3, 0][i % 5],
                            y: (i) => [5, -5, 3, -3, 0][i % 5],
                            duration: 0.5,
                            ease: "power2.out"
                          });
                          
                          // Pretend to close with scale then revert
                          gsap.to(codeEditor.querySelector('.neo-box.bg-white'), {
                            scale: 0.95,
                            opacity: 0.5,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1
                          });
                        }
                      }}
                      title="Close (Demo)"
                    ></div>
                    <div 
                      className="w-3 h-3 rounded-full bg-[var(--accent)] hover:brightness-110 cursor-pointer transition-all"
                      onClick={() => {
                        // Minimize animation
                        const codeContent = document.querySelector('.font-mono.bg-gray-900');
                        if (codeContent) {
                          // Toggle height
                          const isMinimized = codeContent.getAttribute('data-minimized') === 'true';
                          
                          if (!isMinimized) {
                            // Save current height before minimizing
                            codeContent.setAttribute('data-original-height', codeContent.scrollHeight + 'px');
                            gsap.to(codeContent, {
                              height: 0,
                              duration: 0.3,
                              ease: "power2.out",
                              onComplete: () => {
                                codeContent.setAttribute('data-minimized', 'true');
                              }
                            });
                          } else {
                            // Restore height
                            const originalHeight = codeContent.getAttribute('data-original-height') || 'auto';
                            gsap.to(codeContent, {
                              height: originalHeight,
                              duration: 0.3,
                              ease: "power2.out",
                              onComplete: () => {
                                codeContent.setAttribute('data-minimized', 'false');
                              }
                            });
                          }
                        }
                      }}
                      title="Minimize"
                    ></div>
                    <div 
                      className="w-3 h-3 rounded-full bg-[var(--secondary)] hover:brightness-110 cursor-pointer transition-all"
                      onClick={() => {
                        // Maximize animation
                        const codeBox = codeEditorRef.current?.querySelector('.neo-box.bg-white');
                        if (codeBox) {
                          // Toggle maximized state
                          const isMaximized = codeBox.getAttribute('data-maximized') === 'true';
                          
                          if (!isMaximized) {
                            // Save original transform for later
                            const currentTransform = window.getComputedStyle(codeBox).transform;
                            codeBox.setAttribute('data-original-transform', currentTransform !== 'none' ? currentTransform : '');
                            
                            // Maximize effect
                            gsap.to(codeBox, {
                              scale: 1.05,
                              duration: 0.3,
                              ease: "power2.out",
                              onComplete: () => {
                                codeBox.setAttribute('data-maximized', 'true');
                              }
                            });
                          } else {
                            // Restore original size
                            gsap.to(codeBox, {
                              scale: 1,
                              duration: 0.3,
                              ease: "power2.out",
                              onComplete: () => {
                                codeBox.setAttribute('data-maximized', 'false');
                              }
                            });
                          }
                        }
                      }}
                      title="Maximize"
                    ></div>
                  </div>
                </div>
                
                {/* Code Editor */}
                <div className="flex text-sm font-mono bg-gray-900">
                  {/* Line Numbers */}
                  <div className="py-4 px-2 text-right bg-gray-800 text-gray-500 select-none" style={{ minWidth: '2rem' }}>
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="leading-5">{i + 1}</div>
                    ))}
                  </div>
                  
                  {/* Code Content */}
                  <pre 
                    className="text-sm font-mono overflow-x-auto p-4 m-0 text-white flex-1 relative"
                    onClick={(e) => {
                      // Create flash effect
                      const pre = e.currentTarget;
                      const flash = document.createElement('div');
                      flash.className = 'absolute inset-0 bg-white/20 z-10 pointer-events-none';
                      pre.appendChild(flash);
                      
                      // Create and show message
                      const message = document.createElement('div');
                      message.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] text-black px-4 py-2 font-bold rounded-md border-2 border-black shadow-neo z-20 pointer-events-none';
                      message.textContent = 'Code Activated!';
                      message.style.opacity = '0';
                      message.style.scale = '0.8';
                      pre.appendChild(message);
                      
                      // Animate message
                      gsap.to(message, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                      });
                      
                      // Fade out flash and message
                      setTimeout(() => {
                        gsap.to(flash, {
                          opacity: 0,
                          duration: 0.5,
                          onComplete: () => {
                            pre.removeChild(flash);
                          }
                        });
                        
                        gsap.to(message, {
                          opacity: 0,
                          scale: 1.2,
                          y: -20,
                          duration: 0.5,
                          delay: 0.5,
                          onComplete: () => {
                            pre.removeChild(message);
                          }
                        });
                      }, 100);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <code id="code-text"></code>
                  </pre>
                </div>
                
                {/* Status Bar */}
                <div className="bg-blue-600 text-white text-xs px-4 py-1 flex justify-between">
                  <div>JavaScript</div>
                  <div>UTF-8</div>
                  <div>Ln 16, Col 1</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="decor-element absolute -bottom-5 -right-5 w-12 h-12 bg-[var(--tertiary)] border-4 border-black transform rotate-12"></div>
              <div 
                className="decor-element absolute -top-7 right-10 w-8 h-8 rounded-full bg-[var(--quaternary)] border-4 border-black cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  // Create confetti effect
                  const element = e.currentTarget;
                  const originalColor = element.style.backgroundColor;
                  
                  // Flash effect
                  element.style.backgroundColor = 'white';
                  
                  // Create 20 confetti particles
                  for (let i = 0; i < 20; i++) {
                    const confetti = document.createElement('div');
                    const size = Math.random() * 8 + 4; // 4-12px
                    
                    // Random colors from our theme
                    const colors = [
                      'var(--primary)',
                      'var(--secondary)',
                      'var(--tertiary)',
                      'var(--quaternary)',
                      'var(--accent)'
                    ];
                    
                    confetti.style.position = 'absolute';
                    confetti.style.width = `${size}px`;
                    confetti.style.height = `${size}px`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '100';
                    
                    // Position at center of the element
                    confetti.style.top = `${element.offsetTop + element.offsetHeight/2}px`;
                    confetti.style.left = `${element.offsetLeft + element.offsetWidth/2}px`;
                    
                    document.body.appendChild(confetti);
                    
                    // Animate
                    gsap.to(confetti, {
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      rotation: Math.random() * 720 - 360,
                      opacity: 0,
                      duration: 1 + Math.random(),
                      ease: "power2.out",
                      onComplete: () => {
                        document.body.removeChild(confetti);
                      }
                    });
                  }
                  
                  // Return to original color
                  setTimeout(() => {
                    element.style.backgroundColor = originalColor;
                  }, 100);
                  
                  // Bounce the element
                  gsap.to(element, {
                    scale: 1.3,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                      gsap.to(element, {
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                      });
                    }
                  });
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <a 
          href="#projects" 
          className="flex flex-col items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#projects');
          }}
        >
          <span className="mb-2 font-statement">SCROLL DOWN</span>
          <FiArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero; 