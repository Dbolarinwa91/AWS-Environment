"use client";
import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Server, 
  GitBranch, 
  CloudCog, 
  BarChart3, 
  ShieldCheck, 
  Code, 
  Rocket,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Search,
  ExternalLink,
  FileCode,
  Copy,
  CheckCheck,
  Hash,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DocumentationPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [activeSection, setActiveSection] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Set window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
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
          
          // Update active section based on scroll position
          const sections = document.querySelectorAll('[data-section]');
          let currentSection = 'introduction';
          
          sections.forEach((section) => {
            const sectionTop = (section as HTMLElement).offsetTop - 100;
            const sectionHeight = (section as HTMLElement).offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
              currentSection = (section as HTMLElement).dataset.section || 'introduction';
            }
          });
          
          setActiveSection(currentSection);
          
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      window.scrollTo({
        top: (section as HTMLElement).offsetTop - 90,
        behavior: 'smooth'
      });
    }
    if (windowSize.width < 1024) {
      setSidebarOpen(false);
    }
  };

  // Documentation sections
  const sections = [
    {
      id: 'introduction',
      title: 'What is DevOps?',
      icon: <BookOpen className="h-5 w-5" />,
      description: 'An overview of DevOps from real-world experience'
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <Terminal className="h-5 w-5" />,
      description: 'Automate everything: from infrastructure to deployment'
    },
    {
      id: 'ci-cd-pipelines',
      title: 'CI/CD Pipelines',
      icon: <GitBranch className="h-5 w-5" />,
      description: 'Building robust continuous integration and delivery pipelines'
    },
    {
      id: 'infrastructure-as-code',
      title: 'Infrastructure as Code',
      icon: <FileCode className="h-5 w-5" />,
      description: 'Managing infrastructure with code using Terraform and more'
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Observability',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Keeping systems reliable with effective monitoring'
    },
    {
      id: 'security',
      title: 'Security Best Practices',
      icon: <ShieldCheck className="h-5 w-5" />,
      description: 'Implementing DevSecOps for secure infrastructure'
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Architecture',
      icon: <CloudCog className="h-5 w-5" />,
      description: 'Designing scalable systems in AWS, Azure, and more'
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: <Rocket className="h-5 w-5" />,
      description: 'Real-world projects and solutions'
    }
  ];

  // Filter sections based on search query
  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sample code snippets for the documentation
  const codeSnippets = {
    terraform: `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"
  tags = {
    Name = "ExampleAppServerInstance"
  }
}`,
    jenkins: `pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        echo 'Building the application...'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'npm test'
      }
    }
    
    stage('Deploy') {
      steps {
        echo 'Deploying to production...'
        sh './deploy.sh'
      }
    }
  }
}`
  };

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

        {/* Interactive background glow that follows mouse */}
        <div
          className="fixed inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.10), transparent 40%)`,
            transition: 'background 0.1s'
          }}
        ></div>

        {/* Mobile sidebar toggle */}
        <button
          className="fixed lg:hidden top-20 right-4 z-50 p-3 bg-blue-600 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        <div className="relative flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside
            className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen w-72 bg-gray-900 border-r border-gray-800 z-40 transition-all duration-300 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
            style={{ height: 'calc(100vh - 5rem)' }}
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Sidebar header */}
              <div className="px-4 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center mb-2">
                  <BookOpen className="mr-2 h-6 w-6 text-blue-400" />
                  DevOps Docs
                </h2>
                <p className="text-sm text-gray-400">A practical guide to DevOps engineering</p>
                
                {/* Search bar */}
                <div className="mt-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Navigation links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {filteredSections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        <span className="mr-3">{section.icon}</span>
                        <span className="flex-1 text-left">{section.title}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                          activeSection === section.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              {/* Sidebar footer */}
              <div className="px-4 py-4 border-t border-gray-800">
                <a 
                  href="/Contact"
                  className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span>Need help? Contact me</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
              
              {/* Introduction Section */}
              <section data-section="introduction" className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                  DevOps Engineering: Beyond the Buzzwords
                </h1>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-xl">
                    In my 8+ years as a DevOps engineer, I've learned that DevOps isn't just a job title—it's a mindset that transforms how organizations build and deliver software.
                  </p>
                  
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 my-8">
                    <h2 className="text-2xl font-bold text-white mb-4">What Is DevOps Engineering, Really?</h2>
                    <p>
                      Forget the textbook definitions. At its core, DevOps engineering is about removing the barriers between traditionally siloed teams—development and operations—to create more reliable systems and deliver value faster. It's about applying software engineering practices to infrastructure and operations challenges.
                    </p>
                    <p className="mt-4">
                      In my experience, a DevOps engineer is a <strong>multiplier of effectiveness</strong>—someone who creates systems and processes that enable development teams to deploy code with confidence, operations teams to maintain stability, and businesses to move quickly without sacrificing reliability.
                    </p>
                    <p className="mt-4">
                      While tools and technologies constantly evolve, the fundamental DevOps principles remain: automation, measurement, sharing, and continuous improvement. These principles guide everything in this documentation.
                    </p>
                  </div>
                  
                  <p>
                    Throughout my career at companies like Dominion Systems Inc., I've implemented these principles across diverse environments. This documentation shares practical insights from that journey—not theoretical ideals, but battle-tested approaches that actually work in production.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-800/40 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-blue-400" />
                        Philosophy
                      </h3>
                      <p className="text-gray-300">
                        DevOps is a culture first, tools second. Successful implementation requires organizational alignment and a commitment to continuous improvement.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-800/40 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <Rocket className="h-5 w-5 mr-2 text-purple-400" />
                        Results-Driven
                      </h3>
                      <p className="text-gray-300">
                        Every automation, pipeline, or infrastructure decision should deliver measurable business value—whether that's deployment frequency, time to recovery, or cost reduction.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">How to Use This Documentation</h3>
                  <p className="text-gray-300 mb-4">
                    This guide is organized to take you through the key areas of DevOps engineering, from automation fundamentals to advanced cloud architecture. Each section includes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Hash className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-gray-300"><strong className="text-white">Practical principles</strong> distilled from real-world experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Hash className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-gray-300"><strong className="text-white">Code examples</strong> you can adapt for your own projects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Hash className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-gray-300"><strong className="text-white">Case studies</strong> from projects I've worked on</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <Hash className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-gray-300"><strong className="text-white">Best practices</strong> that will save you headaches down the road</span>
                    </li>
                  </ul>
                </div>
              </section>
              
              {/* Automation Section */}
              <section data-section="automation" className="mb-16">
                <div className="flex items-center mb-6">
                  <Terminal className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Automation</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p>
                    Automation is the foundation of effective DevOps. Throughout my career, I've found that the most impactful automations focus on eliminating repetitive tasks, reducing human error, and creating consistent, repeatable processes.
                  </p>
                  
                  <blockquote className="border-l-4 border-blue-500 pl-4 my-6">
                    <p className="italic">
                      "If you're doing something more than twice manually, it's time to automate it. The third time, you script it."
                    </p>
                  </blockquote>
                  
                  <p>
                    At Dominion Systems Inc., I automated infrastructure provisioning using Terraform, securing state files with AWS S3 and implementing DynamoDB for enhanced reliability. This reduced deployment times by 70% and virtually eliminated configuration drift.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Areas for Automation</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <h4 className="text-xl font-bold text-white mb-3">Infrastructure Provisioning</h4>
                      <p className="text-gray-300">
                        Using tools like Terraform, CloudFormation, or Pulumi to define infrastructure as code, enabling consistent environments across development, testing, and production.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <h4 className="text-xl font-bold text-white mb-3">Configuration Management</h4>
                      <p className="text-gray-300">
                        Tools like Ansible, Chef, or Puppet to ensure systems are configured consistently and can be rapidly reproduced if needed.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <h4 className="text-xl font-bold text-white mb-3">Deployment Automation</h4>
                      <p className="text-gray-300">
                        Creating pipelines that automate testing, building, and deploying applications to reduce human error and increase deployment frequency.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <h4 className="text-xl font-bold text-white mb-3">Monitoring & Alerting</h4>
                      <p className="text-gray-300">
                        Automating the detection and response to system issues, ensuring problems are identified before they impact users.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative my-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                    <div className="relative p-6 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-white">Terraform Example</h4>
                        <button 
                          onClick={() => handleCopyCode(codeSnippets.terraform)}
                          className="flex items-center text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <>
                              <CheckCheck className="h-4 w-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-sm text-gray-300 overflow-x-auto p-4 bg-gray-900 rounded-lg">
                        <code>
                          {codeSnippets.terraform}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <p>
                    One of the key principles I follow is to start small with automation. Identify the highest-value, lowest-risk processes to automate first, then build on that success. This approach not only delivers quick wins but also helps build organizational trust in automation.
                  </p>
                  
                  <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-6 my-8">
                    <h4 className="text-xl font-bold text-white mb-3">Practical Tip: Documentation as Code</h4>
                    <p className="text-gray-300">
                      Don't just automate your infrastructure—automate your documentation too. I use tools like Terraform-docs to automatically generate documentation from my infrastructure code, ensuring it's always up-to-date with the actual configuration.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* CI/CD Pipelines Section */}
              <section data-section="ci-cd-pipelines" className="mb-16">
                <div className="flex items-center mb-6">
                  <GitBranch className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">CI/CD Pipelines</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <p>
                    Continuous Integration and Continuous Delivery/Deployment (CI/CD) has been the cornerstone of my work at Dominion Systems Inc., where I optimized pipelines with Jenkins, Kubernetes, and Ansible to improve both deployment speed and system reliability.
                  </p>
                  
                  <p>
                    A well-designed CI/CD pipeline automates the steps between a developer committing code and that code reaching production, including building, testing, and deploying the application. This automation reduces manual errors, provides faster feedback, and enables more frequent, reliable releases.
                  </p>
                  
                  <div className="relative my-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                    <div className="relative p-6 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-white">Jenkins Pipeline Example</h4>
                        <button 
                          onClick={() => handleCopyCode(codeSnippets.jenkins)}
                          className="flex items-center text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <>
                              <CheckCheck className="h-4 w-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-sm text-gray-300 overflow-x-auto p-4 bg-gray-900 rounded-lg">
                        <code>
                          {codeSnippets.jenkins}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">Pipeline Design Principles</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Fast Feedback</h4>
                        <p className="text-gray-300">
                          Structure your pipeline to provide feedback as quickly as possible. Run quick tests first, longer tests later. A developer should know if their commit broke something within minutes, not hours.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Fail Fast</h4>
                        <p className="text-gray-300">
                          Design pipelines to fail immediately when issues are detected. This prevents wasting resources on builds that will ultimately fail and helps developers fix issues more quickly.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Idempotency</h4>
                        <p className="text-gray-300">
                          Ensure your pipeline can be run multiple times with the same result. This is crucial for reliability and for handling failures gracefully.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Quality Gates</h4>
                        <p className="text-gray-300">
                          Implement quality checks at each stage: code linting, unit tests, integration tests, security scans, and performance testing. Code should only proceed if it meets your quality standards.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-800/40 rounded-xl p-6 my-8">
                    <h4 className="text-xl font-bold text-white mb-3">Real-World Success: 97% Faster Releases</h4>
                    <p className="text-gray-300">
                      At Dominion Systems Inc., I implemented a CI/CD pipeline that reduced deployment time from days to hours, resulting in 97% faster releases. This was achieved by parallelizing tests, implementing caching strategies, and automating the approval process where appropriate.
                    </p>
                  </div>
                  
                  <p>
                    The CI/CD pipelines I've built generally follow these stages:
                  </p>
                  
                  <ol className="list-decimal pl-5 space-y-2 mb-6">
                    <li className="text-gray-300"><strong className="text-white">Source</strong>: Code is committed to a repository, triggering the pipeline</li>
                    <li className="text-gray-300"><strong className="text-white">Build</strong>: Application is compiled or packaged</li>
                    <li className="text-gray-300"><strong className="text-white">Test</strong>: Automated tests verify functionality</li>
                    <li className="text-gray-300"><strong className="text-white">Security Scan</strong>: Code and dependencies are scanned for vulnerabilities</li>
                    <li className="text-gray-300"><strong className="text-white">Deploy to Staging</strong>: Application is deployed to a pre-production environment</li>
                    <li className="text-gray-300"><strong className="text-white">Integration Tests</strong>: End-to-end tests verify system behavior</li>
                    <li className="text-gray-300"><strong className="text-white">Approval</strong>: Manual or automated approval for production deployment</li>
                    <li className="text-gray-300"><strong className="text-white">Deploy to Production</strong>: Application is deployed to production</li>
                  </ol>
                  
                  <p>
                    Remember, CI/CD isn't just about tools—it's about creating a culture where continuous improvement is valued and where quality is everyone's responsibility.
                  </p>
                </div>
              </section>
              
              {/* Infrastructure as Code Section Placeholder */}
              <section data-section="infrastructure-as-code" className="mb-16">
                <div className="flex items-center mb-6">
                  <FileCode className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Infrastructure as Code</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <p className="text-gray-300 italic">
                      This section will cover practical approaches to managing infrastructure with code, featuring examples from my experience with Terraform, AWS CloudFormation, and other IaC tools. I'll share best practices for module design, state management, and handling secrets securely.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Monitoring Section Placeholder */}
              <section data-section="monitoring" className="mb-16">
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Monitoring & Observability</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <p className="text-gray-300 italic">
                      Coming soon: In-depth content on implementing effective monitoring solutions, setting up alerting systems that reduce alert fatigue, and building dashboards that provide actionable insights. I'll share my experiences with tools like Prometheus, Grafana, and ELK stack.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Security Section Placeholder */}
              <section data-section="security" className="mb-16">
                <div className="flex items-center mb-6">
                  <ShieldCheck className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Security Best Practices</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <p className="text-gray-300 italic">
                      Coming soon: Practical guidance on implementing DevSecOps, securing cloud infrastructure, managing secrets, implementing least privilege access policies, and automating security testing in your CI/CD pipelines.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Cloud Architecture Section Placeholder */}
              <section data-section="cloud-architecture" className="mb-16">
                <div className="flex items-center mb-6">
                  <CloudCog className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Cloud Architecture</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <p className="text-gray-300 italic">
                      Coming soon: Insights on designing cloud-native architectures that are scalable, resilient, and cost-effective. I'll share patterns I've implemented across AWS, Azure, and multi-cloud environments.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Case Studies Section Placeholder */}
              <section data-section="case-studies" className="mb-16">
                <div className="flex items-center mb-6">
                  <Rocket className="h-8 w-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Case Studies</h2>
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                    <p className="text-gray-300 italic">
                      Coming soon: Detailed case studies from real-world projects I've worked on, including the challenges faced, solutions implemented, and lessons learned. These will provide practical examples of applying DevOps principles in different contexts.
                    </p>
                  </div>
                </div>
              </section>
              
              {/* Documentation Footer */}
              <div className="mt-16 pt-8 border-t border-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-bold text-white">DevOps Documentation</h3>
                    <p className="text-sm text-gray-400">Last updated: April 2025</p>
                  </div>
                  <div className="flex items-center">
                    <a 
                      href="/Contact"
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Have questions? Contact me</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
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

        {/* CSS for animations */}
        <style jsx>{`
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-gradient { animation: gradient 8s linear infinite; }
          .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
          .animate-blob { animation: blob 7s infinite; }
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
          
          /* Custom scrollbar for the sidebar */
          nav::-webkit-scrollbar {
            width: 6px;
          }
          
          nav::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
            border-radius: 10px;
          }
          
          nav::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.3);
            border-radius: 10px;
          }
          
          nav::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
          
          /* Make sure code snippets look good */
          pre {
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.3) rgba(31, 41, 55, 0.5);
          }
          
          pre::-webkit-scrollbar {
            height: 6px;
          }
          
          pre::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
            border-radius: 10px;
          }
          
          pre::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.3);
            border-radius: 10px;
          }
          
          pre::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.5);
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default DocumentationPage;