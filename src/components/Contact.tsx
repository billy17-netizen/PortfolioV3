'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const wavyRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submitted status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const square = squareRef.current;
    const circle = circleRef.current;
    const wavy = wavyRef.current;

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

    // Form animation with slide effect
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { 
          opacity: 0, 
          x: -50,
          rotationY: 3,
          transformPerspective: 800
        },
        { 
          opacity: 1, 
          x: 0,
          rotationY: 0, 
          duration: 0.5,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }

    // Info section animation with slide effect
    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        { 
          opacity: 0, 
          x: 50,
          rotationY: -3,
          transformPerspective: 800 
        },
        { 
          opacity: 1, 
          x: 0,
          rotationY: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
      
      // Animate each contact info item with stagger
      const infoItems = infoRef.current.querySelectorAll('.info-item');
      gsap.fromTo(infoItems,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.4,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top bottom-=80",
            end: "center center",
            scrub: 0.5,
            toggleActions: "play reverse restart reverse"
          }
        }
      );
    }

    // Decorative elements animations
    if (square) {
      gsap.to(square, {
        rotation: 20,
        y: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (circle) {
      gsap.to(circle, {
        scale: 1.1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (wavy) {
      gsap.to(wavy, {
        rotation: 10,
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
      if (wavy) gsap.killTweensOf(wavy);
      // Cleanup other animations/triggers if necessary
      ScrollTrigger.getAll().forEach(st => st.kill()); // General cleanup
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-8 relative overflow-hidden">
      {/* Dotted pattern background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Small dot clusters */}
        <div className="absolute top-[10%] left-[10%] w-[200px] h-[200px]" style={{ 
          backgroundImage: 'radial-gradient(var(--accent)/10 2px, transparent 2px)',
          backgroundSize: '15px 15px'
        }}></div>
        
        <div className="absolute top-[50%] left-[70%] w-[250px] h-[250px]" style={{ 
          backgroundImage: 'radial-gradient(var(--tertiary)/10 3px, transparent 3px)',
          backgroundSize: '25px 25px'
        }}></div>
        
        <div className="absolute top-[70%] left-[20%] w-[180px] h-[180px]" style={{ 
          backgroundImage: 'radial-gradient(var(--quaternary)/10 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px'
        }}></div>
        
        {/* Medium dot clusters */}
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px]" style={{ 
          backgroundImage: 'radial-gradient(var(--primary)/10 2px, transparent 2px)',
          backgroundSize: '18px 18px'
        }}></div>
        
        <div className="absolute top-[5%] left-[60%] w-[220px] h-[220px]" style={{ 
          backgroundImage: 'radial-gradient(var(--secondary)/10 2.5px, transparent 2.5px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Large dot clusters */}
        <div className="absolute top-[60%] left-[5%] w-[350px] h-[350px]" style={{ 
          backgroundImage: 'radial-gradient(var(--accent)/8 4px, transparent 4px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        <div className="absolute top-[20%] left-[75%] w-[280px] h-[280px]" style={{ 
          backgroundImage: 'radial-gradient(var(--tertiary)/8 3.5px, transparent 3.5px)',
          backgroundSize: '25px 25px'
        }}></div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[var(--background)] opacity-80 z-0"></div>
      <div className="absolute top-10 left-10 w-40 h-40 dotted-pattern z-0 opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 zigzag-pattern z-0 opacity-20"></div>
      
      {/* Animated shapes */}
      <div 
        ref={squareRef}
        className="absolute top-40 right-1/4 w-16 h-16 bg-[var(--quaternary)] border-4 border-black transform rotate-12 z-0"
      />
      
      <div 
        ref={circleRef}
        className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-[var(--tertiary)] border-4 border-black z-0"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleRef}
          className="mb-16 relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 diagonal-stripes z-0" />
          <h2 className="neo-title relative z-10">GET IN TOUCH</h2>
          <div className="w-40 h-2 bg-[var(--primary)] mt-4"></div>
          <p className="neo-statement mt-6 max-w-2xl">
            Have a <span className="text-[var(--quaternary)]">project in mind</span> or want to discuss a <span className="text-[var(--tertiary)]">potential collaboration</span>? I&apos;d love to hear from you!
          </p>
          
          {/* Decorative element */}
          <div className="absolute -right-8 top-10 w-14 h-14 bg-[var(--accent)] border-4 border-black transform rotate-12 z-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="relative"
          >
            <div className="neo-box bg-[var(--tertiary)] p-1">
              <div className="neo-box bg-white p-8">
                <h3 className="neo-subtitle mb-6 text-black">Send Me a Message</h3>
                
                {submitted ? (
                  <div className="neo-box bg-[var(--accent)] p-6 text-center">
                    <p className="font-[var(--font-statement)] text-xl font-bold text-black">Message Sent!</p>
                    <p className="neo-body mt-2 text-black">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="neo-box bg-red-400 p-4 text-black">
                        <p className="font-[var(--font-statement)] font-bold">Error</p>
                        <p className="font-[var(--font-ui)]">{error}</p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block font-[var(--font-statement)] mb-2 text-black">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="neo-input w-full font-[var(--font-ui)] text-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block font-[var(--font-statement)] mb-2 text-black">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="neo-input w-full font-[var(--font-ui)] text-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block font-[var(--font-statement)] mb-2 text-black">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="neo-input w-full font-[var(--font-ui)] text-black"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block font-[var(--font-statement)] mb-2 text-black">Message</label>
                      <textarea // Line 297 starts here
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="neo-input w-full resize-none font-[var(--font-ui)] text-black"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`neo-button bg-[var(--quaternary)] text-black w-full flex justify-center items-center ${isSubmitting ? 'opacity-70' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          <FiSend className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-[var(--accent)] border-4 border-black transform rotate-12 z-0"></div>
          </div>
          
          {/* Contact Info */}
          <div
            ref={infoRef}
            className="space-y-8"
          >
            {/* Contact Information Card */}
            <div className="neo-box bg-[var(--primary)] p-1">
              <div className="neo-box bg-white p-8">
                <h3 className="neo-subtitle mb-6 text-black">Contact Information</h3>
                <p className="neo-body mb-8 text-black">
                  Feel free to reach out with any questions. I&apos;m available for freelance work, full-time positions, and collaborations.
                </p>
                
                <div className="space-y-6">
                  <div className="info-item flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--accent)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <FiMail size={28} className="text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-statement)] text-black font-bold">Email</h4>
                      <a href="mailto:billlelatobur@gmail.com" className="font-[var(--font-ui)] hover:text-[var(--primary)] text-black">
                        billlelatobur@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="info-item flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--tertiary)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <FiPhone size={28} className="text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-statement)] text-black font-bold">Phone</h4>
                      <a href="tel:+1234567890" className="font-[var(--font-ui)] hover:text-[var(--primary)] text-black">
                        -
                      </a>
                    </div>
                  </div>
                  
                  <div className="info-item flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--quaternary)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <FiMapPin size={28} className="text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-statement)] text-black font-bold">Location</h4>
                      <p className="font-[var(--font-ui)] text-black">Central Java, Salatiga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Let's Connect Card */}
            <div className="neo-box p-1 bg-[var(--secondary)]">
              <div className="neo-box bg-white p-6">
                <h4 className="font-[var(--font-title)] text-xl mb-4 text-black">Let&apos;s Connect</h4>
                <p className="font-[var(--font-ui)] mb-6 text-black">
                  Also available for consultations, tech talks, and mentoring opportunities.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="neo-button px-4 py-2 bg-[var(--accent)] text-black">Schedule a Call</a>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div 
              ref={wavyRef}
              className="absolute -bottom-10 right-10 w-20 h-20 wavy-pattern border-4 border-black z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 