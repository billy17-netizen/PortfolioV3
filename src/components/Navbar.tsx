'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { scrollTo } from '@/utils/smoothScroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(`#${target}`, { offset: 0 });
    if (isOpen) {
      toggleMenu();
    }
  };
  
  // Close the menu when scrolling or clicking outside
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      // Check if click was outside menu and toggle button
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const navItems = [
    { name: 'Home', target: 'home' },
    { name: 'Projects', target: 'projects' },
    { name: 'Skills', target: 'skills' },
    { name: 'About', target: 'about' },
    { name: 'Contact', target: 'contact' }
  ];

  return (
    <nav className="w-full py-4 bg-[#222222] relative z-50 border-b-4 border-black">
      {/* Decorative stripe */}
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-[var(--primary)]"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
        {/* Logo with enhanced styling */}
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-full h-full bg-black"></div>
          <Link href="/" className="relative block border-[3px] border-black bg-[var(--accent)] transform hover:translate-y-[-2px] transition-transform duration-200">
            <Image 
              src="/logo/logo.png" 
              alt="DEVFOLIO" 
              width={80} 
              height={80} 
              className="h-auto w-auto"
            />
          </Link>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--primary)]"></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <a 
              href={`#${item.target}`} 
              key={item.name}
              className="font-statement text-white font-bold hover:underline decoration-[var(--primary)] decoration-4 underline-offset-8 transition-all cursor-pointer"
              onClick={(e) => handleNavClick(e, item.target)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neo-button font-statement bg-[var(--primary)] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden block p-2 bg-[var(--accent)] border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-50 menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{ position: 'relative', zIndex: 100 }}
        >
          {isOpen ? 
            <FiX size={28} className="text-black" /> : 
            <FiMenu size={28} className="text-black" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed left-0 right-0 top-[80px] bg-white mt-2 mx-4 p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-40 mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            style={{
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto"
            }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.a 
                  href={`#${item.target}`} 
                  key={item.name}
                  className="block bg-gray-100 text-black border-2 border-black py-3 px-4 font-bold text-lg hover:bg-[var(--accent)] hover:translate-y-[-2px] transition-all"
                  style={{ 
                    fontFamily: "var(--font-bebas-neue)", 
                    transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
                    boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)'
                  }}
                  onClick={(e) => handleNavClick(e, item.target)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name.toUpperCase()}
                </motion.a>
              ))}
              <motion.a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 block bg-[var(--primary)] text-white text-center border-4 border-black py-3 font-bold hover:translate-y-[-2px] transition-all"
                style={{ 
                  fontFamily: "var(--font-bebas-neue)",
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                  fontSize: "1.2rem",
                  letterSpacing: "1px"
                }}
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                RESUME
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 