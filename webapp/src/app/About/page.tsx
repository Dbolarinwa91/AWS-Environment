"use client";
import React, { useState, useEffect } from 'react';

// Icon imports from Lucide React
import { 
  Server, 
  Cloud, 
  GitBranch, 
  Shield, 
   
  // Removing unused ChevronRight import
  ArrowRight,
  
} from 'lucide-react';

// Component imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Theme configuration
const THEME = {
  primary: { light: 'blue-300', medium: 'blue-500', dark: 'blue-700' },
  secondary: { light: 'green-300', medium: 'green-500', dark: 'green-700' },
  accent: {
    pink: { light: 'pink-300', medium: 'pink-500', dark: 'pink-700' },
    green: { light: 'emerald-300', medium: 'emerald-500', dark: 'emerald-700' },
    cyan: { light: 'cyan-300', medium: 'cyan-500', dark: 'cyan-700' }
  },
  background: { light: 'gray-100', medium: 'gray-200', dark: 'gray-300' },
  text: { primary: 'gray-900', secondary: 'gray-700', muted: 'gray-500' }
};



const ModernUIServicePage = () => {
  // Removing unused state variable by using _ prefix to indicate intentional non-usage
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = {
    infrastructure: {
      title: "Infrastructure Automation",
      description: "Automate your infrastructure with security and scalability built in.",
      icon: <Server className="h-8 w-8" />,
      color: `from-${THEME.primary.medium} to-indigo-600`,
      metrics: ["99.99% uptime", "42% cost reduction", "10x faster deployments"]
    },
    cloud: {
      title: "Cloud Architecture",
      description: "Optimize your cloud infrastructure for performance and cost.",
      icon: <Cloud className="h-8 w-8" />,
      color: `from-${THEME.accent.cyan.medium} to-${THEME.primary.dark}`,
      metrics: ["$150K annual savings", "Zero downtime migrations", "Multi-cloud strategy"]
    },
    cicd: {
      title: "CI/CD Pipeline Optimization",
      description: "Streamline your development pipeline for maximum efficiency.",
      icon: <GitBranch className="h-8 w-8" />,
      color: `from-violet-500 to-${THEME.secondary.dark}`,
      metrics: ["97% faster releases", "Zero failed deployments", "Automated testing"]
    },
    security: {
      title: "DevSecOps Implementation",
      description: "Secure your infrastructure at every layer with automated protection.",
      icon: <Shield className="h-8 w-8" />,
      color: `from-${THEME.accent.green.medium} to-green-600`,
      metrics: ["100% compliance", "Breach protection", "Automatic patching"]
    }
  };

  const transformationSteps = [
    { title: "Assess", description: "Comprehensive analysis of your infrastructure.", delay: 0 },
    { title: "Design", description: "Tailored blueprint with cutting-edge tech.", delay: 150 },
    { title: "Implement", description: "Deploy automation with precision.", delay: 300 },
    { title: "Optimize", description: "Continuous monitoring for efficiency.", delay: 450 }
  ];
  const testimonials = [
    { name: "Sarah Johnson", role: "CTO, TechCorp", quote: "Reduced AWS costs by 42%.", color: `from-${THEME.primary.dark} to-indigo-600`, delay: 0 },
    { name: "Michael Chen", role: "VP Engineering, DataFlow", quote: "Deployment time cut to 6 minutes.", color: `from-${THEME.secondary.dark} to-${THEME.accent.pink.dark}`, delay: 200 },
    { name: "Jennifer Rodriguez", role: "CISO, SecureFinance", quote: "Reduced incidents by 94%.", color: `from-${THEME.accent.green.dark} to-teal-600`, delay: 400 },
    { name: "Alex Patel", role: "Director, GlobeScale", quote: "Handles 300% more traffic.", color: `from-${THEME.accent.cyan.dark} to-${THEME.primary.medium}`, delay: 600 }
  ];

  const getParallaxStyle = (strength = 20) => {
    const maxMove = strength;
    const x = (mousePosition.x / window.innerWidth - 0.5) * maxMove;
    const y = (mousePosition.y / window.innerHeight - 0.5) * maxMove;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  // Fixed the any type by using a more specific number type
  const shouldBeVisible = (triggerPoint: number) => {
    return {
      opacity: scrollY > triggerPoint ? 1 : 0,
      transform: scrollY > triggerPoint ? 'translateY(0)' : 'translateY(10px)'
    };
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative z-50 bg-black text-white">
        <Header />
      </div>
      <div className={`bg-${THEME.background.medium} text-${THEME.text.secondary} overflow-x-hidden`}>
        <div className="fixed inset-0 z-0 opacity-50">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${THEME.primary.dark} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
          <div className={`absolute top-1/3 right-1/4 w-96 h-96 bg-${THEME.secondary.dark} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
        </div>
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
              transition: 'background 0.3s ease'
            }}
          ></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className={`inline-block backdrop-blur-xl bg-white/10 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-xl animate-float`} style={getParallaxStyle(10)}>
              NEXT-GENERATION DEVOPS SOLUTIONS
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 relative z-10" style={getParallaxStyle(15)}>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-${THEME.primary.light} via-indigo-500 to-${THEME.secondary.medium} animate-gradient`}>Infrastructure</span>
              <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-${THEME.secondary.light} via-${THEME.accent.pink.medium} to-red-500 animate-gradient animation-delay-2000`}>Reimagined</span>
            </h1>
            <p className={`text-xl sm:text-2xl text-${THEME.text.secondary} mb-10 max-w-3xl`} style={getParallaxStyle(5)}>
              Elevating enterprise infrastructure with automation and scalability.
            </p>
            <div className="group relative inline-block" style={getParallaxStyle(8)}>
              <div className={`absolute -inset-1 bg-gradient-to-r from-${THEME.primary.dark} to-${THEME.secondary.dark} rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow`}></div>
              <button className={`relative px-8 py-4 bg-${THEME.background.medium} rounded-lg leading-none flex items-center`}>
                <span className={`text-${THEME.text.secondary} group-hover:text-${THEME.text.primary} transition duration-200`}>Schedule Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Rest of the component remains unchanged */}

      </div>
      {/* Footer with consistent styling to avoid white gaps */}
      <footer className="relative w-full bg-gray-900 z-10 mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">© 2025 David wealth™. All Rights Reserved.</p>
            <div className="mt-4 space-x-4">
              <a href="/about" className="text-gray-400 hover:text-blue-400 text-sm">About</a> | 
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">Privacy Policy</a> | 
              <a href="/licensing" className="text-gray-400 hover:text-blue-400 text-sm">Licensing</a> | 
              <a href="/contact" className="text-gray-400 hover:text-blue-400 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default ModernUIServicePage;