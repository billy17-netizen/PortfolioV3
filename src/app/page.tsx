import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Subtle gradient overlay for the entire page */}
      <div className="absolute inset-0 gradient-overlay pointer-events-none"></div>
      
      {/* Subtle dot grid for the entire page */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--neutral) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
      <ChatBot />
      </main>
  );
}
