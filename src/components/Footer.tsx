'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('');
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <footer className="py-12 px-8 bg-black text-white relative overflow-hidden">
      {/* Simplified background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Diagonal stripes */}
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `
            linear-gradient(135deg, transparent 25%, var(--accent) 25%, var(--accent) 50%, transparent 50%, transparent 75%, var(--accent) 75%)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simplified two-column footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Left column - Logo and links */}
          <div>
            <Link href="/" className="neo-box px-2 py-1 bg-[var(--accent)] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] inline-block mb-6">
              <Image 
                src="/logo/logo.png" 
                alt="NUCLEUS" 
                width={80} 
                height={80} 
                className="h-auto w-auto"
              />
            </Link>
            
            {/* Navigation */}
            <div className="flex flex-wrap gap-4 mt-4">
              {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right column - Social icons */}
          <div className="flex flex-col items-start sm:items-end gap-6">
            <div className="flex gap-3">
              <a 
                href="https://github.com/billy17-netizen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-box p-3 bg-white text-black hover:bg-[var(--accent)] transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-box p-3 bg-white text-black hover:bg-[var(--accent)] transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-box p-3 bg-white text-black hover:bg-[var(--accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <a 
                href="https://www.instagram.com/billy__ll/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-box p-3 bg-white text-black hover:bg-[var(--accent)] transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
            </div>
            
            <div className="text-sm text-gray-400">
              © {currentYear} NUCLEUS
            </div>
          </div>
        </div>
        
        {/* Decorative brutalist element */}
        <div className="w-full h-4 bg-[var(--primary)] mt-8 border-t-4 border-b-4 border-white"></div>
      </div>
    </footer>
  );
};

export default Footer; 