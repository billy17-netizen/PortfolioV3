'use client';

import React, { useEffect, useRef } from 'react';

interface RainbowCursorProps {
  element?: HTMLElement;
  length?: number;
  colors?: string[];
  size?: number;
  trailSpeed?: number;
  colorCycleSpeed?: number;
  blur?: number;
  pulseSpeed?: number;
  pulseMin?: number;
  pulseMax?: number;
}

const RainbowCursor: React.FC<RainbowCursorProps> = ({
  element,
  length = 20,
  colors = ['#FE0000', '#FD8C00', '#FFE500', '#119F0B', '#0644B3', '#C22EDC'],
  size = 3,
  trailSpeed = 0.4,
  colorCycleSpeed = 0.002,
  blur = 0,
  pulseSpeed = 0.01,
  pulseMin = 0.8,
  pulseMax = 1.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorRef = useRef({ x: -100, y: -100 }); // Start offscreen
  const particlesRef = useRef<Array<{ position: { x: number; y: number } }>>(
    []
  );
  const animationFrameRef = useRef<number>(0);
  const cursorsInittedRef = useRef(false);
  const timeRef = useRef(0);

  class Particle {
    position: { x: number; y: number };

    constructor(x: number, y: number) {
      this.position = { x, y };
    }
  }

  // Helper function to interpolate between colors
  const interpolateColors = (
    color1: string,
    color2: string,
    factor: number
  ) => {
    const r1 = parseInt(color1.substr(1, 2), 16);
    const g1 = parseInt(color1.substr(3, 2), 16);
    const b1 = parseInt(color1.substr(5, 2), 16);

    const r2 = parseInt(color2.substr(1, 2), 16);
    const g2 = parseInt(color2.substr(3, 2), 16);
    const b2 = parseInt(color2.substr(5, 2), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Function to get dynamic size based on pulse
  const getPulseSize = (baseSize: number, time: number) => {
    const pulse = Math.sin(time * pulseSpeed);
    const scaleFactor = pulseMin + ((pulse + 1) * (pulseMax - pulseMin)) / 2;
    return baseSize * scaleFactor;
  };

  // Initialize particles
  const initializeParticles = (x: number, y: number) => {
    if (cursorsInittedRef.current) return;
    
    cursorsInittedRef.current = true;
    particlesRef.current = [];
    
    for (let i = 0; i < length; i++) {
      particlesRef.current.push(new Particle(x, y));
    }
  };

  useEffect(() => {
    // Always use document.body for consistent behavior
    const targetElement = document.body;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (prefersReducedMotion.matches) {
      console.log('Reduced motion is enabled - cursor animation disabled');
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { alpha: true });

    if (!context) return;

    canvasRef.current = canvas;
    contextRef.current = context;

    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.position = 'fixed'; // Always fixed position
    canvas.style.zIndex = '9999';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles with center position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    initializeParticles(centerX, centerY);

    const onMouseMove = (e: MouseEvent) => {
      // Offset the cursor position slightly to align with the default cursor point
      // Default cursor typically has its point at the top-left of the icon
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      if (!cursorsInittedRef.current) {
        initializeParticles(e.clientX, e.clientY);
      }
    };

    // Add mousemove event to document for full site coverage
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const onWindowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const updateParticles = () => {
      if (!contextRef.current || !canvasRef.current) return;

      const ctx = contextRef.current;
      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineJoin = 'round';

      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      }

      const particleSets: Array<{ x: number; y: number }> = [];
      let x = cursorRef.current.x;
      let y = cursorRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        const nextParticle =
          particlesRef.current[index + 1] || particlesRef.current[0];

        particle.position.x = x;
        particle.position.y = y;

        particleSets.push({ x, y });

        x += (nextParticle.position.x - particle.position.x) * trailSpeed;
        y += (nextParticle.position.y - particle.position.y) * trailSpeed;
      });

      // Time-based color cycling
      timeRef.current += colorCycleSpeed;
      const colorOffset = timeRef.current % 1;

      // Dynamic size based on pulse
      const currentSize = getPulseSize(size, timeRef.current);

      colors.forEach((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];

        ctx.beginPath();
        ctx.strokeStyle = interpolateColors(
          color,
          nextColor,
          (index + colorOffset) / colors.length
        );

        if (particleSets.length) {
          ctx.moveTo(
            particleSets[0].x,
            particleSets[0].y + index * (currentSize - 1)
          );
        }

        particleSets.forEach((set, particleIndex) => {
          if (particleIndex !== 0) {
            ctx.lineTo(set.x, set.y + index * currentSize);
          }
        });

        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.stroke();
      });
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', onWindowResize, { passive: true });
    
    // Trigger an initial mousemove event to position the cursor
    const initialEvent = new MouseEvent('mousemove', {
      clientX: centerX,
      clientY: centerY
    });
    document.dispatchEvent(initialEvent);
    
    loop();

    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [
    element,
    length,
    colors,
    size,
    trailSpeed,
    colorCycleSpeed,
    blur,
    pulseSpeed,
    pulseMin,
    pulseMax,
  ]);

  return null;
};

export default RainbowCursor; 