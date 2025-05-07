'use client';

import { useRef, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const square = squareRef.current;
    const circle = circleRef.current;
    const decor = decorRef.current;

    // Title animation with 3D effect
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
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
            trigger: titleRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }

    // Image animation with slide effect
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { 
          opacity: 0, 
          x: -50,
          rotationY: 5,
          transformPerspective: 800
        },
        { 
          opacity: 1, 
          x: 0,
          rotationY: 0, 
          duration: 0.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }

    // Content animation with slide effect
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { 
          opacity: 0, 
          x: 50,
          rotationY: -5,
          transformPerspective: 800 
        },
        { 
          opacity: 1, 
          x: 0,
          rotationY: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }

    // Timeline animation with a better approach
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      // Animate timeline section heading first
      gsap.fromTo(
        timelineRef.current.querySelector('h3'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
      
      // Animate each timeline item individually with alternating directions
      timelineItems.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1; // Alternate left/right
        
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            x: 30 * direction, // Move from alternating sides
            y: 50,
            scale: 0.9,
            rotationY: 5 * direction, // Slight rotation based on side
            transformPerspective: 1000
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=50",
              end: "top center+=100",
              scrub: 0.3,
              toggleActions: "play reverse restart reverse"
            }
          }
        );
      });
    }

    // Decorative elements animations
    if (square) {
      gsap.to(square, {
        rotation: 15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (circle) {
      gsap.to(circle, {
        y: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (decor) {
      gsap.to(decor, {
        rotation: "12deg",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Cleanup function
    return () => {
      if (square) gsap.killTweensOf(square);
      if (circle) gsap.killTweensOf(circle);
      if (decor) gsap.killTweensOf(decor);
      // Cleanup other animations/triggers if necessary
      ScrollTrigger.getAll().forEach(st => st.kill()); // General cleanup
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-8 relative overflow-hidden">
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Stripe group 1 - top left */}
        <div className="absolute top-0 left-0 w-[50%] h-[40%] overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[repeating-linear-gradient(45deg,var(--accent)/3,var(--accent)/3_1px,transparent_1px,transparent_10px)]"></div>
        </div>
        
        {/* Stripe group 2 - bottom right */}
        <div className="absolute bottom-0 right-0 w-[60%] h-[50%] overflow-hidden">
          <div className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] bg-[repeating-linear-gradient(-45deg,var(--tertiary)/3,var(--tertiary)/3_1px,transparent_1px,transparent_12px)]"></div>
        </div>
        
        {/* Stripe group 3 - middle */}
        <div className="absolute top-[30%] left-[20%] w-[70%] h-[50%] overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[repeating-linear-gradient(135deg,var(--quaternary)/3,var(--quaternary)/3_1px,transparent_1px,transparent_15px)]"></div>
        </div>
        
        {/* Stripe group 4 - top right */}
        <div className="absolute top-0 right-0 w-[40%] h-[35%] overflow-hidden">
          <div className="absolute -top-[20%] -right-[20%] w-[140%] h-[140%] bg-[repeating-linear-gradient(-135deg,var(--primary)/3,var(--primary)/3_1px,transparent_1px,transparent_8px)]"></div>
        </div>
        
        {/* Stripe group 5 - bottom left */}
        <div className="absolute bottom-0 left-0 w-[45%] h-[40%] overflow-hidden">
          <div className="absolute -bottom-[20%] -left-[20%] w-[140%] h-[140%] bg-[repeating-linear-gradient(225deg,var(--secondary)/3,var(--secondary)/3_1px,transparent_1px,transparent_10px)]"></div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[var(--background)] opacity-80 z-0"></div>
      <div className="absolute bottom-20 right-0 w-1/4 h-1/4 zigzag-pattern z-0 opacity-30"></div>
      <div className="absolute top-40 left-20 w-40 h-40 dotted-pattern z-0 opacity-40"></div>
      
      {/* Animated elements */}
      <div 
        ref={squareRef}
        className="absolute top-1/4 right-20 w-16 h-16 bg-[var(--tertiary)] border-4 border-black z-0"
      />
      
      <div 
        ref={circleRef}
        className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-[var(--quaternary)] border-4 border-black z-0"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="mb-16 relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 diagonal-stripes z-0" />
          <h2 className="neo-title relative z-10">ABOUT ME</h2>
          <div className="w-40 h-2 bg-[var(--primary)] mt-4"></div>
          
          {/* Decorative element */}
          <div className="absolute -right-5 bottom-0 w-12 h-12 bg-[var(--accent)] border-4 border-black transform rotate-12 z-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative"
          >
            <div className="neo-box p-3 bg-[var(--quaternary)]">
              <div className="neo-box overflow-hidden">
                <img 
                  src="/images/my-photo.JPG" 
                  alt="Developer Portrait" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-5 -right-5 w-14 h-14 bg-[var(--accent)] border-4 border-black transform rotate-12"></div>
            <div className="absolute -top-7 left-10 w-10 h-10 rounded-full bg-[var(--tertiary)] border-4 border-black"></div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="space-y-8"
          >
            <div className="neo-box p-8 bg-white">
              <h3 className="neo-subtitle text-[var(--secondary)] mb-4 font-bold">Who I Am</h3>
              <p className=" neo-body text-lg md:text-xl text-black max-w-3xl mx-auto mb-12 leading-relaxed">
                Hello! I&apos;m Billstein Maelgweyn Lelatobur, a Full-stack Web Developer focused on creating impactful and visually engaging web applications. I thrive on tackling complex challenges and turning ideas into reality through clean code and innovative solutions.
              </p>
              <p className="neo-body mb-6 text-black">
                I started my web development journey with an internship at a tech company, where I worked on Full-stack Web Development applications and learned modern frameworks. This experience sparked my passion for creating web solutions and set the foundation for my software development career.              </p>
              <p className="neo-body text-black">
                I believe in <span className="font-statement text-[var(--tertiary)] font-bold">clean code</span>, thoughtful architecture, and <span className="font-statement text-[var(--quaternary)] font-bold">purposeful design</span>. My goal is to build applications that not only look great but also perform exceptionally well.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neo-box p-6 bg-[var(--tertiary)]">
                <h4 className="font-title text-lg mb-4 text-black font-bold">Skills</h4>
                <ul className="space-y-2 text-black font-ui">
                  <li>• Modern Frontend Frameworks</li>
                  <li>• Responsive Design</li>
                  <li>• Backend Development</li>
                </ul>
              </div>
              <div className="neo-box p-6 bg-[var(--accent)]">
                <h4 className="font-title text-lg mb-4 text-black font-bold">Education</h4>
                <ul className="space-y-2 text-black font-ui">
                  <li>• Faculty of Informatics Engineering (Satya Wacana Christian University)</li>
                  <li>• Natural science (Senior High)</li>
                  <li>• Web Development Certification</li>
                </ul>
              </div>
            </div>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="neo-button inline-flex items-center justify-center gap-2 bg-[var(--secondary)] text-white"
            >
              <FiDownload /> Download Resume
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="mt-24 relative"
        >
          <h3 className="text-center mb-12 text-[#ff6b6b] font-black text-4xl uppercase tracking-wide">Professional Journey</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black z-0"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 gap-24 relative z-10">
              {[
                {
                  company: 'PT. Compro Kotak Inovasi',
                  description: 'I worked in a web development team, utilizing PHP and the Laravel framework. I gained experience in e-commerce application architecture, mastered the CI/CD cycle, and implemented payment gateway features. I collaborated with cross-functional teams and developed RESTful API integrations.',
                  startMonth: 'SEP',
                  startYear: '2020',
                  endMonth: 'DEC', 
                  endYear: '2020',
                  isOdd: true
                },
                {
                  company: 'FTI Satya Wacana Christian University',
                  description: 'I applied my PHP and Laravel expertise to create a faculty borrowing system, implementing monorepo architecture for scalability. I utilized advanced CI/CD tools, integrated design excellence principles, and adopted a user-centric development approach. I also built a robust system architecture and optimized it for efficient performance.',
                  startMonth: 'FEB',
                  startYear: '2021',
                  endMonth: 'JUN', 
                  endYear: '2021',
                  isOdd: false
                },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item relative flex items-center justify-center"
                >
                  <div className="neo-box p-0 max-w-xl bg-white relative border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)]">
                    {/* Title */}
                    <div className={`w-full py-3 px-6 ${item.isOdd ? 'bg-[#fb2576]' : 'bg-[#0ea293]'} border-b-4 border-black`}>
                      <h4 className="text-xl font-extrabold tracking-wider text-center text-white">
                        Full Stack Web Developer Internship
                      </h4>
                    </div>
                    
                    {/* Company and Description */}
                    <div className={`p-6 ${item.isOdd ? 'text-right' : ''}`}>
                      <h5 className="font-statement text-xl mb-4 text-black font-black">
                        {item.company}
                      </h5>
                      <p className="text-black font-ui">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Date Badge - positioned left for even, right for odd */}
                    <div className={`absolute -top-4 ${item.isOdd ? '-right-4' : '-left-4'} z-20`}>
                      <div className="relative">
                        <div className={`${item.isOdd ? 'bg-[#fce700]' : 'bg-[#f86f03]'} border-2 border-black py-2 px-3 text-center w-[70px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                          <div className="text-[10px] font-bold tracking-wider uppercase text-black">
                            {item.startMonth}
                          </div>
                          <div className="text-[13px] font-bold leading-tight text-black">
                            {item.startYear}
                          </div>
                          <div className="h-px bg-black/20 my-1"></div>
                          <div className="text-[10px] font-bold tracking-wider uppercase text-black">
                            {item.endMonth}
                          </div>
                          <div className="text-[13px] font-bold leading-tight text-black">
                            {item.endYear}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative element at the bottom */}
          <div 
            ref={decorRef}
            className="absolute -bottom-10 right-10 w-20 h-20 bg-[var(--accent)] border-4 border-black transform rotate-12 z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default About; 