"use client";
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  GithubIcon, 
  Linkedin, 
  TwitterIcon, 
  Globe,
  Calendar,
  Send,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Terminal,
  Server
} from 'lucide-react';
import Header from '@/components/Header';

const ContactPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  // Social media profiles
  const socialProfiles = [
    {
      name: "GitHub",
      icon: <GithubIcon className="h-8 w-8" />,
      url: "https://github.com/yourusername",
      color: "from-gray-700 to-gray-900",
      hoverColor: "group-hover:from-gray-600 group-hover:to-gray-800",
      description: "Check out my open source contributions and personal projects"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-8 w-8" />,
      url: "https://linkedin.com/in/yourusername",
      color: "from-blue-600 to-blue-800",
      hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
      description: "Connect with me professionally and view my experience"
    },
    {
      name: "Twitter",
      icon: <TwitterIcon className="h-8 w-8" />,
      url: "https://twitter.com/yourusername",
      color: "from-sky-400 to-sky-600",
      hoverColor: "group-hover:from-sky-300 group-hover:to-sky-500",
      description: "Follow me for tech insights and industry updates"
    },
    {
      name: "Dev.to",
      icon: <Terminal className="h-8 w-8" />,
      url: "https://dev.to/yourusername",
      color: "from-indigo-600 to-indigo-800",
      hoverColor: "group-hover:from-indigo-500 group-hover:to-indigo-700",
      description: "Read my technical articles and tutorials"
    },
    {
      name: "Stack Overflow",
      icon: <Server className="h-8 w-8" />,
      url: "https://stackoverflow.com/users/youruserid",
      color: "from-orange-500 to-orange-700",
      hoverColor: "group-hover:from-orange-400 group-hover:to-orange-600",
      description: "View my contributions to the developer community"
    }
  ];

  // Availability status
  const availability = {
    status: "Available",
    response: "Within 24 hours",
    timezone: "UTC-6 (Central Time)",
    preferred: "Email or LinkedIn"
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      <Header />
      <main className="flex-grow bg-gray-900 text-gray-100 overflow-x-hidden pb-0">
        {/* Animated Particle Background */}
        <div className="fixed inset-0 z-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Interactive background glow that follows mouse */}
        <div
          className="fixed inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
            transition: 'background 0.1s'
          }}
        ></div>

        {/* Hero Section with Glassmorphism - adjusted to match other pages */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
              transition: 'background 0.3s ease'
            }}
          ></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12">
            <div
              className="inline-block backdrop-blur-xl bg-white/10 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-xl animate-float group relative"
              style={getParallaxStyle(10)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <span className="relative z-10">LET'S CONNECT</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 relative z-10"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                Get in Touch
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl"
              style={getParallaxStyle(5)}
            >
              Have a project in mind? Looking for infrastructure expertise? Or just want to connect? I'm here to help.
            </p>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className="text-gray-400 mb-3 text-lg">Scroll to explore</p>
              <div className="w-4 h-7 border-2 border-gray-400 rounded-full flex justify-center p-1">
                <div className="w-2 h-3 bg-blue-400 rounded-full animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left Column: Contact Form */}
              <div 
                className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                style={{
                  opacity: scrollY > 100 ? 1 : 0,
                  transform: scrollY > 100 ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                <div className="relative group h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-full backdrop-blur-sm bg-gray-800/90 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                      <MessageSquare className="mr-3 h-6 w-6 text-blue-400" />
                      Send Me a Message
                    </h2>
                    
                    {formStatus === 'success' ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                          <CheckCircle className="h-10 w-10 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                        <p className="text-gray-300 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                        <button 
                          onClick={() => setFormStatus('idle')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-300"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.subject ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                            placeholder="Project Inquiry"
                          />
                          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm`}
                            placeholder="Tell me about your project or inquiry..."
                          />
                          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                        </div>
                        
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white overflow-hidden group relative hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {formStatus === 'submitting' ? (
                              <>
                                <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Availability Card */}
                <div 
                  className="mt-8 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 200 ? 1 : 0,
                    transform: scrollY > 200 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '150ms'
                  }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative backdrop-blur-sm bg-gray-800/90 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-green-400" />
                        Availability Status
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Current Status</p>
                            <p className="text-gray-200">{availability.status}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                            <Mail className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Response Time</p>
                            <p className="text-gray-200">{availability.response}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                            <Globe className="h-4 w-4 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Timezone</p>
                            <p className="text-gray-200">{availability.timezone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                            <Calendar className="h-4 w-4 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Preferred Contact</p>
                            <p className="text-gray-200">{availability.preferred}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Social Media & Direct Contact */}
              <div className="space-y-8">
                {/* Direct Contact Card */}
                <div 
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 150 ? 1 : 0,
                    transform: scrollY > 150 ? 'translateY(0)' : 'translateY(10px)'
                  }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative backdrop-blur-sm bg-gray-800/90 rounded-xl p-8">
                      <h2 className="text-3xl font-bold text-white mb-6">Direct Contact</h2>
                      
                      <div className="flex items-center mb-6 group">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Email</p>
                          <a href="mailto:bolarinwa29@gmail.com" className="text-lg text-white hover:text-blue-400 transition-colors duration-300">bolarinwa29@gmail.com</a>
                        </div>
                      </div>
                      
                      <div className="flex items-center group">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Phone</p>
                          <a href="tel:+14312771311" className="text-lg text-white hover:text-purple-400 transition-colors duration-300">(431) 277-1311</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social Profiles */}
                <div 
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 200 ? 1 : 0,
                    transform: scrollY > 200 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: '100ms'
                  }}
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Connect With Me</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialProfiles.map((profile, index) => (
                      <div 
                        key={profile.name}
                        className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                        style={{
                          opacity: scrollY > 250 ? 1 : 0,
                          transform: scrollY > 250 ? 'translateY(0)' : 'translateY(10px)',
                          transitionDelay: `${index * 100}ms`
                        }}
                        onMouseEnter={() => setHoveredCard(profile.name)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <a 
                          href={profile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block relative group h-full"
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                          <div className={`relative h-full rounded-xl p-6 flex items-center overflow-hidden bg-gradient-to-br ${profile.color} transition-colors duration-300 ${profile.hoverColor}`}>
                            <div className={`p-3 rounded-lg bg-white/10 mr-4 transition-transform duration-300 group-hover:scale-110 ${hoveredCard === profile.name ? 'scale-110' : 'scale-100'}`}>
                              {profile.icon}
                            </div>
                            <div className={`transition-opacity duration-300 ${hoveredCard === profile.name ? 'opacity-100' : 'opacity-80'}`}>
                              <p className="font-bold text-white text-lg">{profile.name}</p>
                              <p className="text-white/70 text-sm">{profile.description}</p>
                            </div>
                            <ArrowRight className={`absolute right-4 h-5 w-5 text-white/70 transition-all duration-300 ${hoveredCard === profile.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section (Optional) */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 600 ? 1 : 0,
                transform: scrollY > 600 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Common questions about working with me
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What types of projects do you specialize in?",
                  answer: "I specialize in cloud infrastructure, DevOps automation, and implementing CI/CD pipelines. My expertise is particularly strong in AWS environments, Kubernetes orchestration, and infrastructure-as-code using Terraform."
                },
                {
                  question: "How do you typically structure your consulting work?",
                  answer: "After an initial discovery call to understand your needs, I'll propose a structured approach that might include assessment, planning, implementation, and knowledge transfer phases. Each project is custom-tailored to address your specific infrastructure challenges."
                },
                {
                  question: "What is your availability for new projects?",
                  answer: "I'm currently available for new projects and consulting engagements. Depending on the scope, I can work on a project basis or provide ongoing support. I typically respond to inquiries within 24 hours."
                },
                {
                  question: "Do you work remotely or on-site?",
                  answer: "I primarily work remotely, which allows for flexibility and efficiency. However, for certain projects or workshops, I'm open to on-site work when necessary."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out backdrop-blur-sm bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  style={{
                    opacity: scrollY > 650 ? 1 : 0,
                    transform: scrollY > 650 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
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

      {/* CSS for animations */}
      <style jsx>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { animation: gradient 8s linear infinite; }
        .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-bounce-slow { animation: bounce 2s infinite; }
        .animate-pulse-slow { animation: pulse 3s infinite; }
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
      `}</style>
    </div>
  );
};

// Phone component definition
const Phone = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
};

export default ContactPage;