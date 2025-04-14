"use client";
import React, { useState, useEffect } from 'react';
import { 
  // Removed unused imports: GitBranch, Code, Lock
  GitMerge,
  GitPullRequest,
  Server, 
  CloudCog,
  CheckCircle,
  BarChart3,
  Rocket,
  ChevronRight,
  ArrowRight,
  History,
  Clock, // This is actually used in the component
  Zap,
  GanttChart
} from 'lucide-react';
import Header from '@/components/Header';
// Removed unused import: Footer
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServicePackage {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  cta: string;
  color: string;
  popular: boolean;
}

interface PipelineType {
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  color: string;
  gradientBg: string;
}

interface CICDTool {
  name: string;
  logo: string;
  description: string;
  features: string[];
  experience: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
  delay: number;
}

const CICDPage = () => {
  const [activeTab, setActiveTab] = useState('jenkins');
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

  // Pipeline types with details
  const pipelineTypes: PipelineType[] = [
    {
      title: "Continuous Integration",
      icon: <GitMerge className="h-8 w-8" />,
      description: "Automatically build, test, and validate code changes whenever new code is committed to the repository.",
      benefits: [
        "Early bug detection and prevention",
        "Improved code quality through automated testing",
        "Reduced integration challenges",
        "Faster feedback loops for developers"
      ],
      color: "from-blue-500 to-indigo-600",
      gradientBg: "bg-gradient-to-r from-blue-500/20 to-indigo-600/20"
    },
    {
      title: "Continuous Delivery",
      icon: <GitPullRequest className="h-8 w-8" />,
      description: "Automate the delivery of validated code to a staging environment, ready for deployment at the click of a button.",
      benefits: [
        "Production-ready code at all times",
        "Reduced time-to-market for new features",
        "Lower deployment risk through consistency",
        "Improved release reliability"
      ],
      color: "from-purple-500 to-pink-600",
      gradientBg: "bg-gradient-to-r from-purple-500/20 to-pink-600/20"
    },
    {
      title: "Continuous Deployment",
      icon: <Rocket className="h-8 w-8" />,
      description: "Fully automated pipeline where code changes automatically flow through to production after passing all tests.",
      benefits: [
        "Zero-touch deployments to production",
        "Immediate delivery of value to users",
        "Elimination of manual deployment errors",
        "Continuous feedback from production"
      ],
      color: "from-emerald-500 to-green-600",
      gradientBg: "bg-gradient-to-r from-emerald-500/20 to-green-600/20"
    },
    {
      title: "Infrastructure as Code",
      icon: <CloudCog className="h-8 w-8" />,
      description: "Manage and provision infrastructure through code instead of manual processes, ensuring consistency and repeatability.",
      benefits: [
        "Versioned and auditable infrastructure",
        "Consistent environments across stages",
        "Self-documenting architecture",
        "Rapid disaster recovery capabilities"
      ],
      color: "from-amber-500 to-orange-600",
      gradientBg: "bg-gradient-to-r from-amber-500/20 to-orange-600/20"
    }
  ];

  // CI/CD tools with their features
  const cicdTools: Record<string, CICDTool> = {
    jenkins: {
      name: "Jenkins",
      logo: "/jenkins-logo.svg",
      description: "An open-source automation server that enables developers to build, test, and deploy their software.",
      features: [
        "Extensive plugin ecosystem with over 1,500 plugins",
        "Distributed builds across multiple machines",
        "Pipeline as Code with Jenkinsfile",
        "Easy integration with most development, testing, and deployment tools",
        "Customizable workflow with Groovy scripting"
      ],
      experience: "I've implemented Jenkins pipelines for enterprise clients, reducing deployment times by 70% while significantly improving system uptime. My expertise includes distributed builds, Jenkinsfile configuration, and integration with AWS services."
    },
    github: {
      name: "GitHub Actions",
      logo: "/github-actions-logo.svg",
      description: "GitHub's integrated CI/CD solution that automates workflows directly from your GitHub repository.",
      features: [
        "Native integration with GitHub repositories",
        "Matrix builds for testing across multiple environments",
        "Built-in secret management",
        "Marketplace with thousands of pre-built actions",
        "Workflow automation beyond CI/CD"
      ],
      experience: "I've designed GitHub Actions workflows that streamline development processes, reduce code review cycles, and automate security scans. My implementations have helped teams achieve continuous deployment with zero-touch production releases."
    },
    kubernetes: {
      name: "Kubernetes",
      logo: "/kubernetes-logo.svg",
      description: "An open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.",
      features: [
        "Declarative configuration and automation",
        "Self-healing capabilities with automated rollouts and rollbacks",
        "Horizontal scaling with load balancing",
        "Service discovery and load balancing",
        "Storage orchestration"
      ],
      experience: "I've architected Kubernetes-based deployment strategies that provide high availability and fault tolerance. My expertise includes EKS configuration, Helm charts for package management, and integration with CI/CD pipelines for seamless deployments."
    },
    terraform: {
      name: "Terraform",
      logo: "/terraform-logo.svg",
      description: "An infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure.",
      features: [
        "Declarative configuration language",
        "State management for tracking resource changes",
        "Plan and apply workflow for change verification",
        "Provider ecosystem for multi-cloud support",
        "Module system for reusable components"
      ],
      experience: "I've standardized Terraform modules for enterprise clients, securing state files with AWS S3 and DynamoDB. My implementations have enhanced reliability and security while enabling reproducible infrastructure across environments."
    }
  };

  // Service packages for the sales funnel
  const servicePackages: ServicePackage[] = [
    {
      title: "Pipeline Assessment",
      icon: <BarChart3 className="h-10 w-10 text-blue-400" />,
      description: "Comprehensive analysis of your existing CI/CD processes, identifying bottlenecks, security vulnerabilities, and optimization opportunities.",
      features: [
        "Current state evaluation",
        "Performance analysis",
        "Security assessment",
        "Documentation review",
        "Improvement roadmap"
      ],
      cta: "Schedule Assessment",
      color: "from-blue-600 to-indigo-600",
      popular: false
    },
    {
      title: "Pipeline Optimization",
      icon: <Zap className="h-10 w-10 text-purple-400" />,
      description: "Enhance your existing CI/CD pipeline with advanced automation, parallel processing, and optimized workflows for maximum efficiency.",
      features: [
        "Build time reduction",
        "Test parallelization",
        "Cache optimization",
        "Resource utilization improvements",
        "Developer workflow enhancement"
      ],
      cta: "Boost Your Pipeline",
      color: "from-purple-600 to-pink-600",
      popular: true
    },
    {
      title: "Enterprise CI/CD Implementation",
      icon: <Server className="h-10 w-10 text-emerald-400" />,
      description: "End-to-end design and implementation of a robust CI/CD ecosystem tailored to your organization's specific needs and technology stack.",
      features: [
        "Custom pipeline architecture",
        "Multi-environment setup",
        "Security and compliance integration",
        "Team training and documentation",
        "Ongoing support and maintenance"
      ],
      cta: "Transform Your Delivery",
      color: "from-emerald-600 to-green-600",
      popular: false
    }
  ];

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Michael Chen",
      role: "VP Engineering, DataFlow",
      quote: "Our deployment time went from 3 hours to 6 minutes. The reliability improvements alone paid for the entire project in the first quarter.",
      color: "from-purple-600 to-pink-600",
      delay: 0
    },
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      quote: "David's CI/CD pipeline automation reduced our AWS costs by 42% while improving performance 3x. A game-changer for our operations.",
      color: "from-blue-600 to-indigo-600",
      delay: 200
    },
    {
      name: "Aisha Campbell",
      role: "Director of Infrastructure, Dominion Systems Inc.",
      quote: "The standardized Jenkins pipeline David implemented completely transformed our deployment workflow. We've cut release times by over 70% while significantly increasing system uptime.",
      color: "from-emerald-600 to-green-600",
      delay: 400
    },
    {
      name: "James Peterson",
      role: "SRE Lead, CloudNexus",
      quote: "David&apos;s CI/CD expertise brought order to chaos during our AWS migration. His implementation ensured zero downtime during cutover and improved our compliance posture overnight.",
      color: "from-amber-600 to-orange-600",
      delay: 600
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
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
              ACCELERATE YOUR SOFTWARE DELIVERY
            </div>

            <h1
              className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 relative z-10"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                CI/CD Pipelines
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
              Accelerate your development cycle with automated, scalable, and secure CI/CD pipelines that turn ideas into production-ready code in record time.
            </p>

            <div className="group relative inline-block" style={getParallaxStyle(8)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <button 
                className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center"
                onClick={() => navigateToPath('/Consultation')}
              >
                <span className="text-gray-100 group-hover:text-white transition duration-200">Schedule Your CI/CD Consultation</span>
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

        {/* Pipeline Types Section */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 300 ? 1 : 0,
                transform: scrollY > 300 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                CI/CD Pipeline Types
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the right approach for your software delivery needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pipelineTypes.map((type, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 400 ? 1 : 0,
                    transform: scrollY > 400 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className={`rounded-2xl overflow-hidden border border-gray-700 backdrop-blur-sm ${type.gradientBg}`}>
                    <div className="p-8">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-6`}>
                        {type.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                      <p className="text-gray-300 mb-6">{type.description}</p>
                      
                      <h4 className="font-semibold text-gray-200 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CI/CD Tools Section with Tabs */}
        <div className="relative z-10 py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: scrollY > 800 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Industry-Leading <span className="text-blue-400">CI/CD Tools</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                We specialize in implementing and optimizing the most powerful CI/CD tools available
              </p>
            </div>

            {/* Tool Selection Tabs */}
            <div
              className="flex flex-wrap justify-center mb-12 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 900 ? 1 : 0,
                transform: scrollY > 900 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              {Object.keys(cicdTools).map((toolKey) => (
                <button
                  key={toolKey}
                  className={`px-6 py-3 rounded-full mx-2 mb-4 transition-all duration-300 ${
                    activeTab === toolKey
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-900/30'
                      : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(toolKey)}
                >
                  {cicdTools[toolKey].name}
                </button>
              ))}
            </div>

            {/* Active Tool Content */}
            <div
              className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 950 ? 1 : 0,
                transform: scrollY > 950 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700 p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                  <div className="flex-shrink-0 bg-white rounded-xl p-4 mb-6 md:mb-0 md:mr-8 w-32 h-32 flex items-center justify-center">
                    <Image
                      src={cicdTools[activeTab].logo}
                      alt={`${cicdTools[activeTab].name} Logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">{cicdTools[activeTab].name}</h3>
                    <p className="text-lg text-gray-300">{cicdTools[activeTab].description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <GanttChart className="h-5 w-5 mr-2 text-blue-400" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {cicdTools[activeTab].features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800/50">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <History className="h-5 w-5 mr-2 text-blue-400" />
                      My Experience
                    </h4>
                    <p className="text-gray-300 italic">
                      &ldquo;{cicdTools[activeTab].experience}&rdquo;
                    </p>
                    
                    <div className="mt-6">
                      <button 
                        className="group relative px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium flex items-center"
                        onClick={() => navigateToPath(`/Case-studies?tool=${activeTab}`)}
                      >
                        See Case Study
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pipeline Diagram Section */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1400 ? 1 : 0,
                transform: scrollY > 1400 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Pipeline Architecture
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Visualizing a modern CI/CD pipeline workflow
              </p>
            </div>

            <div 
              className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1500 ? 1 : 0,
                transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              {/* This div will contain the pipeline diagram from the artifact */}
              <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                <div id="pipeline-diagram-container" className="w-full overflow-x-auto">
                  {/* Diagram will be inserted here as an artifact */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Packages Section */}
        <div className="relative z-10 py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1800 ? 1 : 0,
                transform: scrollY > 1800 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Our CI/CD <span className="text-blue-400">Service Packages</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Tailored solutions to meet your CI/CD needs at any stage of your DevOps journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicePackages.map((service, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out relative"
                  style={{
                    opacity: scrollY > 1900 ? 1 : 0,
                    transform: scrollY > 1900 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {service.popular && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-40 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-1 px-4 rounded-full text-center text-sm z-10">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className={`h-full rounded-2xl overflow-hidden border ${service.popular ? 'border-blue-500' : 'border-gray-700'} ${service.popular ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gray-800/50'} backdrop-blur-sm transition-transform duration-300 hover:transform hover:scale-105`}>
                    <div className="p-8 flex flex-col h-full">
                      <div className={`w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        {service.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300 mb-6">{service.description}</p>
                      
                      <h4 className="font-semibold text-gray-200 mb-4">Included:</h4>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto">
                        <button 
                          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                            service.popular
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          }`}
                          onClick={() => navigateToPath('/Consultation')}
                        >
                          {service.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="relative z-10 py-24 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 2400 ? 1 : 0,
                transform: scrollY > 2400 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Client Success Stories
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Real results from our CI/CD pipeline optimization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 2500 ? 1 : 0,
                    transform: scrollY > 2500 ? 'translateY(0)' : 'translateY(10px)',
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

        {/* CTA Section with improved spacing */}
        <div className="relative z-10 py-24 pb-36 md:pb-48 lg:pb-56 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden p-0.5 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 3000 ? 1 : 0,
                transform: scrollY > 3000 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy"></div>
              <div className="relative bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Optimize Your CI/CD Pipeline?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Schedule a consultation to discover how we can accelerate your development cycle, improve release quality, and reduce operational costs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
                  <button 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white overflow-hidden"
                    onClick={() => navigateToPath('/Consultation')}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </button>
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

        {/* Additional spacer div to ensure proper spacing between CTA and footer */}
        <div className="h-1 md:h-1 lg:h-1 bg-black"></div>

        {/* Custom cursor effect */}
        <div
          className="fixed w-10 h-10 rounded-full pointer-events-none z-50 border-2 border-blue-500 opacity-50 hidden lg:block"
          style={{
            transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px)`,
            transition: 'transform 0.1s ease-out',
            mixBlendMode: 'difference'
          }}
        ></div>

        {/* CSS for animations */}
        <style jsx>{`
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-gradient { animation: gradient 8s linear infinite; }
          .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
          .animate-blob { animation: blob 7s infinite; }
          .animate-bounce-slow { animation: bounce 2s infinite; }
          .animate-pulse-slow { animation: pulse 3s infinite; }
          
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
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </div>
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
    </>
  );
};

export default CICDPage;