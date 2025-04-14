"use client";
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cloud, 
  GitBranch, 
  Shield, 
  CheckCircle, 
  ChevronRight,
  ArrowRight,
  Code,
  Clock,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

const ModernUIServicePage = () => {
  const [activeService, setActiveService] = useState('infrastructure');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  // Navigation function for buttons
  const navigateToPath = (path: string) => {
    router.push(path);
  };

  // Set window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize(); // Set initial values
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle scroll position with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setScrollY(window.scrollY);
          timeoutId = null;
        }, 100); // Throttle to 100ms
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Handle mouse position with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          timeoutId = null;
        }, 16); // Throttle to ~60fps
      }
    };

    window.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const services = {
    infrastructure: {
      title: "Infrastructure Automation",
      description: "Automate your infrastructure with security and scalability built in.",
      icon: <Server className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-600",
      metrics: ["99.99% uptime", "42% cost reduction", "10x faster deployments"]
    },
    cloud: {
      title: "Cloud Architecture",
      description: "Optimize your cloud infrastructure for performance and cost.",
      icon: <Cloud className="h-8 w-8" />,
      color: "from-cyan-500 to-blue-600",
      metrics: ["$150K annual savings", "Zero downtime migrations", "Multi-cloud strategy"]
    },
    cicd: {
      title: "CI/CD Pipeline Optimization",
      description: "Streamline your development pipeline for maximum efficiency.",
      icon: <GitBranch className="h-8 w-8" />,
      color: "from-violet-500 to-purple-600",
      metrics: ["97% faster releases", "Zero failed deployments", "Automated testing"]
    },
    security: {
      title: "DevSecOps Implementation",
      description: "Secure your infrastructure at every layer with automated protection.",
      icon: <Shield className="h-8 w-8" />,
      color: "from-emerald-500 to-green-600",
      metrics: ["100% compliance", "Breach protection", "Automatic patching"]
    }
  };

  // Calculate parallax effect based on mouse position
  const getParallaxStyle = (strength = 20) => {
    if (windowSize.width === 0 || windowSize.height === 0) {
      return { transform: 'translate(0px, 0px)' };
    }
    const maxMove = strength;
    const x = (mousePosition.x / windowSize.width - 0.5) * maxMove;
    const y = (mousePosition.y / windowSize.height - 0.5) * maxMove;
    return {
      transform: `translate(${x}px, ${y}px)`
    };
  };

  return (
    // Wrapper div with proper structure to prevent fixed footer issues
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      <Header />
      
      {/* Main content area with flex-grow to push footer down */}
      <main className="flex-grow bg-gray-900 text-gray-100 overflow-x-hidden pb-0">
        {/* Animated Particle Background */}
        <div className="fixed inset-0 z-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section with Glassmorphism */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
              transition: 'background 0.3s ease'
            }}
          ></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div
              className="inline-block backdrop-blur-xl bg-white/10 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-xl animate-float"
              style={getParallaxStyle(10)}
            >
              NEXT-GENERATION DEVOPS SOLUTIONS
            </div>

            <h1
              className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 relative z-10"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                Infrastructure
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient animation-delay-2000">
                Reimagined
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl"
              style={getParallaxStyle(5)}
            >
              Elevating enterprise infrastructure with automation, security, and
              scalability that transforms your technology capabilities.
            </p>

            <div className="group relative inline-block" style={getParallaxStyle(8)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              {/* BUTTON 1: Hero CTA Button - Add navigation to consultation page */}
              <button 
                className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center"
                onClick={() => navigateToPath('/Consultation')}
              >
                <span className="text-gray-100 group-hover:text-white transition duration-200">Schedule Your DevOps Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className="text-gray-400 mb-3 text-lg">Scroll to explore</p>
              <div className="w-4 h-7 border-2 border-gray-400 rounded-full flex justify-center p-1">
                <div className="w-2 h-3 bg-blue-400 rounded-full animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section with 3D Cards and Scroll Animations */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-20 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 300 ? 1 : 0,
                transform: scrollY > 300 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Enterprise-Grade Solutions
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Crafted with precision for maximum performance, security, and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(services).map(([key, service], index) => (
                <div
                  key={key}
                  className="group perspective opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 400 ? 1 : 0,
                    transform: scrollY > 400 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                  onClick={() => setActiveService(key)}
                >
                  <div className={`relative preserve-3d group-hover:my-rotate-y-180 w-full h-80 duration-1000 cursor-pointer ${activeService === key ? 'my-rotate-y-180' : ''}`}>
                    <div className="absolute backface-hidden w-full h-full">
                      <div className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${service.color} p-0.5`}>
                        <div className="bg-gray-800 h-full w-full rounded-2xl p-6 flex flex-col">
                          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 mb-4 inline-block">
                            {React.cloneElement(service.icon, { className: `h-10 w-10 text-${service.color.split(' ')[0].split('-')[0]}-400` })}
                          </div>
                          <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                          <p className="text-gray-300 mb-6">{service.description}</p>
                          <div className="mt-auto flex items-center text-sm text-gray-400">
                            <span>View details</span>
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute my-rotate-y-180 backface-hidden w-full h-full">
                      <div className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${service.color} p-0.5`}>
                        <div className="bg-gray-800 h-full w-full rounded-2xl p-6 flex flex-col">
                          <h3 className="text-xl font-bold mb-4 text-white">Key Metrics</h3>
                          <ul className="space-y-3 mb-auto">
                            {service.metrics.map((metric, idx) => (
                              <li key={idx} className="flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                                <span className="text-gray-300">{metric}</span>
                              </li>
                            ))}
                          </ul>
                          {/* BUTTON 2: Service Learn More Button - Add navigation to specific service page */}
                          <button 
                            className={`mt-4 py-2 px-4 rounded-lg bg-gradient-to-r ${service.color} text-white font-medium flex items-center justify-center`}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card flip when clicking the button
                              navigateToPath(`/Services/${key}`);
                            }}
                          >
                            <span>Learn More</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Service with Animated Components */}
        <div className="relative z-10 py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1000 ? 1 : 0,
                transform: scrollY > 1000 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                How We <span className="text-blue-400">Transform</span> Your Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-items-center">
              {/* Animation Container - Fixed for proper alignment */}
              <div
                className="relative h-96 opacity-0 transform translate-x-10 transition duration-1000 ease-out flex items-center justify-center"
                style={{
                  opacity: scrollY > 1100 ? 1 : 0,
                  transform: scrollY > 1100 ? 'translateX(0)' : 'translateX(10px)'
                }}
              >
                {/* Center point container */}
                <div className="flex items-center justify-center h-full w-full">
                  {/* Orbital system container */}
                  <div className="relative" style={{ width: '360px', height: '360px' }}>
                    {/* Background pulsing circle */}
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-pulse-slow"></div>
                    
                    {/* Central server icon */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="h-24 w-24 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg animate-pulse-slow">
                        <Server className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    
                    {/* Spinning orbit container */}
                    <div 
                      className="absolute left-1/2 top-1/2 animate-spin-slow"
                      style={{ 
                        width: '306px',
                        height: '306px',
                        transformOrigin: 'center center',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Top icon */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-14 w-14 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg">
                          <Code className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Bottom icon */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="h-14 w-14 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
                          <Shield className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Left icon */}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-14 w-14 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg">
                          <Clock className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Right icon */}
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                        <div className="h-14 w-14 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
                          <Zap className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {[
                  {
                    title: "Assess",
                    description: "We perform a comprehensive analysis of your current infrastructure, identifying bottlenecks, security risks, and optimization opportunities.",
                    delay: 0
                  },
                  {
                    title: "Design",
                    description: "Our team creates a tailored infrastructure blueprint that addresses your specific needs, incorporating best practices and cutting-edge technologies.",
                    delay: 150
                  },
                  {
                    title: "Implement",
                    description: "We deploy infrastructure as code, automating every aspect of your environment with precision and security built in from the ground up.",
                    delay: 300
                  },
                  {
                    title: "Optimize",
                    description: "Continuous monitoring and improvements ensure your infrastructure scales efficiently, maintains high availability, and optimizes costs.",
                    delay: 450
                  }
                ].map((step, index) => (
                  <div
                    key={index}
                    className="mb-8 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                    style={{
                      opacity: scrollY > 1100 ? 1 : 0,
                      transform: scrollY > 1100 ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${step.delay}ms`
                    }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-900 border border-blue-500 flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-blue-400">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="h-12 ml-6 border-l-2 border-blue-900 my-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section with Glass Cards */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1700 ? 1 : 0,
                transform: scrollY > 1700 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Client Success Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CTO, TechCorp",
                  quote: "David's infrastructure automation reduced our AWS costs by 42% while improving performance 3x. A game-changer for our operations.",
                  color: "from-blue-600 to-indigo-600",
                  delay: 0
                },
                {
                  name: "Michael Chen",
                  role: "VP Engineering, DataFlow",
                  quote: "Our deployment time went from 3 hours to 6 minutes. The reliability improvements alone paid for the entire project in the first quarter.",
                  color: "from-purple-600 to-pink-600",
                  delay: 200
                },
                {
                  name: "Aisha Campbell",
                  role: "Director of Infrastructure, Dominion Systems Inc.",
                  quote: "David's mentorship and standardized Terraform modules completely transformed our infrastructure workflow. His CI/CD optimization using Jenkins and Kubernetes cut release times by over 70% while significantly increasing system uptime.",
                  color: "from-teal-600 to-emerald-600",
                  delay: 400
                },
                {
                  name: "James Peterson",
                  role: "SRE Lead, CloudNexus",
                  quote: "David brought order to chaos during our AWS migration. His mastery of Terraform and IAM security policies ensured zero downtime during cutover and improved our compliance posture overnight.",
                  color: "from-orange-600 to-red-600",
                  delay: 600
                },
                {
                  name: "Linda Okafor",
                  role: "Engineering Manager, FinEdge",
                  quote: "David doesn't just write infrastructure—he architects long-term solutions. His leadership on our DevSecOps pipeline helped us pass audits with zero critical findings.",
                  color: "from-green-600 to-lime-600",
                  delay: 800
                },
                {
                  name: "Carlos Mendes",
                  role: "Cloud Architect, ByteScale",
                  quote: "What impressed me most was David's deep understanding of both the technical stack and business needs. His work improved system resilience and saved our team hundreds of engineering hours.",
                  color: "from-cyan-600 to-sky-600",
                  delay: 1000
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 1800 ? 1 : 0,
                    transform: scrollY > 1800 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${testimonial.delay}ms`
                  }}
                >
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-0.5 shadow-xl">
                    <div className="bg-gray-800/60 rounded-2xl p-8">
                      <div className="flex items-center mb-6">
                        <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                          {testimonial.name[0]}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                          <p className="text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-lg text-gray-300 italic">{testimonial.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section with Animated Border - connect directly to footer */}
        <div className="relative z-10 py-24 bg-black mb-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden p-0.5 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 2300 ? 1 : 0,
                transform: scrollY > 2300 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy"></div>
              <div className="relative bg-gray-900 rounded-2xl p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Infrastructure?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Schedule a consultation to discover how we can optimize your systems for performance, security, and cost-efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* BUTTON 3: Bottom CTA Schedule Button - Add navigation to consultation page */}
                  <button 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white overflow-hidden"
                    onClick={() => navigateToPath('Consultation')}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </button>
                  {/* BUTTON 4: Bottom CTA Case Studies Button - Add navigation to case studies page */}
                  <button 
                    className="px-8 py-4 bg-transparent border border-blue-500 rounded-lg font-medium text-blue-400 hover:bg-blue-900/20 transition duration-300"
                    onClick={() => navigateToPath('/Case-studies')}
                  >
                    View Case Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom cursor effect */}
        <div
          className="fixed w-12 h-12 rounded-full pointer-events-none z-50 border-2 border-blue-500 opacity-50 hidden lg:block"
          style={{
            transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`,
            transition: 'transform 0.1s ease-out',
            mixBlendMode: 'difference'
          }}
        ></div>
      </main>

      {/* Footer with specific styling to ensure it's not fixed - no extra spacing div needed */}
      <footer className="relative w-full bg-gray-900 z-10 mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">© 2025 David wealth™. All Rights Reserved.</p>
            <div className="mt-4 space-x-4">
              <a href="/about" className="text-gray-400 hover:text-blue-400 text-sm">  About </a> 
              <span className="mx-3 text-gray-500">|</span>
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">  Privacy Policy </a> 
              <span className="mx-3 text-gray-500">|</span>
              <a href="/licensing" className="text-gray-400 hover:text-blue-400 text-sm"> Licensing  </a> 
              <span className="mx-3 text-gray-500">|</span>
              <a href="/contact" className="text-gray-400 hover:text-blue-400 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style jsx>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { animation: gradient 8s linear infinite; }
        .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-bounce-slow { animation: bounce 2s infinite; }
        .animate-pulse-slow { animation: pulse 3s infinite; }
        .animate-spin-slow { animation: spin 30s linear infinite; }
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .my-rotate-y-180 { transform: rotateY(180deg); }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ModernUIServicePage;