"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import '@/app/globals.css';

export default function Header() {
  const router = useRouter();
  
  // ===== STATE MANAGEMENT =====
  // Track whether the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  
  // Track mouse position for hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track which navigation link is currently active
  const [activeLink, setActiveLink] = useState("/");

  // ===== EVENT HANDLERS =====
  // Handle navigation to different pages
  const navigateTo = (path: string) => {
    router.push(path);
    setActiveLink(path);
  };

  // ===== EFFECTS =====
  // Effect: Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect: Track mouse position for the glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Effect: Set active link based on current path on initial load
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // ===== NAVIGATION LINKS DATA =====
  // Array of navigation links for the main menu
  const navLinks = [
    { name: "Services", path: "/Services" },
    { name: "Projects", path: "/Projects" },
    { name: "Contact", path: "/Contact" },
    { name: "Docs", path: "/Documentation" },
    { name: "Blog", path: "/Blog" },
    { name: "Podcast", path: "/Podcast" },
  ];

  return (
    <header 
      // Header container with conditional styling based on scroll position
      className={`fixed top-0 left-0 w-full backdrop-blur-md z-30 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 shadow-lg shadow-blue-900/20' : 'bg-gray-900/70'
      }`}
    >
      {/* Background glow effect that follows mouse position */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px 0px, rgba(56, 189, 248, 0.15), transparent 60%)`,
          transition: 'background 0.3s ease'
        }}
      ></div>

      {/* Bottom border with gradient effect */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        {/* Bottom border with gradient effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      {/* Header content container */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-20 relative z-10">
        {/* Logo/Brand button - navigates to home page */}
        <button 
          onClick={() => navigateTo("/")}
          className="relative group bg-transparent border-none outline-none"
        >
          <span className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 relative z-10">
            David Wealth
          </span>
          {/* Glow effect on hover */}
          <div className="absolute -inset-2 bg-blue-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
          {/* Border effect on hover */}
          <div className="absolute -inset-1 rounded-lg border border-transparent group-hover:border-blue-500/30 transition-all duration-300"></div>
        </button>

        {/* Navigation Links - hidden on mobile */}
        <nav className="hidden md:flex space-x-8 text-lg">
          {navLinks.map(({ name, path }) => (
            <span
              key={name}
              onClick={() => navigateTo(path)}
              className={`relative px-2 py-1 cursor-pointer transition-all duration-300 hover:text-blue-400 ${
                activeLink === path ? 'text-blue-400' : 'text-white'
              }`}
            >
              {name}
              {/* Animated underline - expands when active or hovered */}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 
                ${activeLink === path ? 'w-full' : 'w-0 group-hover:w-full'}`}
              ></span>
              {/* Active indicator dot */}
              {activeLink === path && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
              )}
            </span>
          ))}
        </nav>

        {/* "Hire Me" Button with metallic styling */}
        <button
          onClick={() => navigateTo("/Hire-me")}
          className="relative overflow-hidden group"
        >
          {/* Outer glow effect with animation */}
          <div className="absolute -inset-0.5 rounded-xl blur-sm opacity-70 group-hover:opacity-100 group-hover:blur-md transition-all duration-300 button-glow"></div>
          
          {/* Metallic background gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 border border-gray-300/50 shadow-inner"></div>
          
          {/* Button content */}
          <div className="relative px-8 py-3.5 rounded-lg leading-none flex items-center justify-center transition-all duration-300 metallic-button">
            <span className="text-gray-900 transition duration-300 font-medium text-base relative z-10">Hire Me</span>
            {/* Arrow icon with hover animation */}
            <svg 
              className="w-5 h-5 ml-2 text-gray-800 group-hover:translate-x-1 transition-transform duration-300 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 26 26" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
            
            {/* Reflective surface effects */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-gray-200/40 to-gray-400/30"></div>
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent rounded-t-lg"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-400/40 to-transparent rounded-b-lg"></div>
            </div>
          </div>
        </button>

       
      </div>
    </header>
  );
}