"use client";
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cloud, 
  Code, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  GitBranch,
  Database,
  Terminal,
  BarChart3,
  Layers,
  Monitor
} from 'lucide-react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const ProjectsPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const router = useRouter();

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

  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'automation', name: 'Automation' },
    { id: 'security', name: 'Security' },
    { id: 'devops', name: 'DevOps' },
    { id: 'cloud', name: 'Cloud Migration' }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Enterprise CI/CD Pipeline Modernization",
      description: "Led the complete overhaul of the company's CI/CD pipelines, replacing legacy systems with a modern, scalable solution that reduced deployment times by 70% and increased reliability.",
      categories: ['devops', 'automation'],
      technologies: ["Jenkins", "Kubernetes", "Ansible", "Docker", "GitOps"],
      outcomes: [
        "Reduced deployment time from 3 hours to 15 minutes",
        "Decreased pipeline failures by 85%",
        "Implemented automated testing, increasing code coverage by 40%"
      ],
      icon: <GitBranch className="h-10 w-10" />,
      color: "from-purple-500 to-indigo-600",
      year: "2022"
    },
    {
      id: 2,
      title: "Multi-Region AWS Infrastructure",
      description: "Designed and implemented a fault-tolerant, multi-region infrastructure on AWS using Infrastructure as Code principles to ensure high availability and disaster recovery capabilities.",
      categories: ['infrastructure', 'cloud'],
      technologies: ["Terraform", "AWS", "CloudFront", "S3", "EC2", "RDS", "Route53"],
      outcomes: [
        "Achieved 99.99% uptime across all services",
        "Implemented automated disaster recovery with 15-minute RTO",
        "Reduced infrastructure costs by 42% through optimization"
      ],
      icon: <Cloud className="h-10 w-10" />,
      color: "from-blue-500 to-cyan-600",
      year: "2021"
    },
    {
      id: 3,
      title: "Enterprise Security Compliance Framework",
      description: "Architected a comprehensive security framework for cloud resources, implementing IAM policies, network security, and automated compliance monitoring across the organization.",
      categories: ['security', 'infrastructure'],
      technologies: ["AWS IAM", "Security Groups", "WAF", "CloudTrail", "Config", "GuardDuty"],
      outcomes: [
        "Achieved SOC2 and HIPAA compliance certifications",
        "Reduced security vulnerabilities by 95%",
        "Implemented automated security patching and updates"
      ],
      icon: <Shield className="h-10 w-10" />,
      color: "from-red-500 to-orange-600",
      year: "2022"
    },
    {
      id: 4,
      title: "Microservices Migration",
      description: "Led the migration of a monolithic application to a microservices architecture, implementing containerization and orchestration to improve scalability and deployment efficiency.",
      categories: ['devops', 'infrastructure', 'cloud'],
      technologies: ["Kubernetes", "EKS", "Docker", "Istio", "Prometheus", "Grafana"],
      outcomes: [
        "Increased deployment frequency from quarterly to daily",
        "Improved system scalability to handle 10x user load",
        "Reduced system-wide outages by 90%"
      ],
      icon: <Layers className="h-10 w-10" />,
      color: "from-green-500 to-emerald-600",
      year: "2020"
    },
    {
      id: 5,
      title: "Infrastructure Monitoring & Alerting Platform",
      description: "Designed and implemented a comprehensive monitoring and alerting system for the entire infrastructure, providing real-time insights and proactive issue resolution.",
      categories: ['devops', 'automation'],
      technologies: ["Prometheus", "Grafana", "AlertManager", "ELK Stack", "CloudWatch"],
      outcomes: [
        "Reduced mean time to detect (MTTD) from hours to minutes",
        "Decreased mean time to resolve (MTTR) by 65%",
        "Implemented predictive alerting to prevent 40% of outages"
      ],
      icon: <Monitor className="h-10 w-10" />,
      color: "from-amber-500 to-yellow-600",
      year: "2021"
    },
    {
      id: 6,
      title: "Database Performance Optimization",
      description: "Optimized database performance across multiple production systems, implementing caching strategies, query optimization, and automated scaling to handle increasing load.",
      categories: ['infrastructure', 'automation'],
      technologies: ["AWS RDS", "Redis", "ElastiCache", "PostgreSQL", "MySQL", "MongoDB"],
      outcomes: [
        "Reduced database response times by 75%",
        "Implemented auto-scaling for 300% traffic spikes",
        "Decreased database costs by 35% while improving performance"
      ],
      icon: <Database className="h-10 w-10" />,
      color: "from-blue-600 to-indigo-700",
      year: "2019"
    },
    {
      id: 7,
      title: "Automated Infrastructure Testing",
      description: "Developed a comprehensive infrastructure testing framework that allowed for automated validation of infrastructure changes before deployment to production.",
      categories: ['devops', 'automation', 'security'],
      technologies: ["Terraform", "Terratest", "GitHub Actions", "AWS", "Packer"],
      outcomes: [
        "Reduced infrastructure deployment failures by 90%",
        "Implemented automated security testing for all infrastructure changes",
        "Decreased time spent on manual testing by 85%"
      ],
      icon: <CheckCircle className="h-10 w-10" />,
      color: "from-teal-500 to-green-600",
      year: "2020"
    },
    {
      id: 8,
      title: "Cloud Cost Optimization",
      description: "Led a company-wide initiative to optimize cloud spending across AWS and Azure, implementing right-sizing, reserved instances, and automated scaling policies.",
      categories: ['cloud', 'infrastructure'],
      technologies: ["AWS Cost Explorer", "Azure Cost Management", "Terraform", "CloudWatch", "Lambda"],
      outcomes: [
        "Reduced annual cloud spend by $150,000",
        "Implemented automated instance scheduling for dev environments",
        "Created real-time cost monitoring dashboards for all teams"
      ],
      icon: <BarChart3 className="h-10 w-10" />,
      color: "from-indigo-500 to-blue-600",
      year: "2021"
    },
    {
      id: 9,
      title: "Containerization of Legacy Applications",
      description: "Migrated legacy applications to containerized environments, improving deployment consistency, scalability, and resource utilization across the organization.",
      categories: ['devops', 'cloud'],
      technologies: ["Docker", "Kubernetes", "Helm", "Jenkins", "AWS ECS/EKS"],
      outcomes: [
        "Standardized deployment process across 15+ applications",
        "Reduced environment setup time from days to minutes",
        "Improved resource utilization by 60%"
      ],
      icon: <Terminal className="h-10 w-10" />,
      color: "from-purple-600 to-pink-600",
      year: "2019"
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(selectedCategory));

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
              className="inline-block backdrop-blur-xl bg-white/10 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-xl animate-float group relative"
              style={getParallaxStyle(10)}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <span className="relative z-10">ENTERPRISE PROJECTS PORTFOLIO</span>
            </div>

            <h1
              className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 relative z-10"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                Projects &
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient animation-delay-2000">
                Achievements
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl"
              style={getParallaxStyle(5)}
            >
              A showcase of enterprise infrastructure and DevOps projects that delivered measurable business value and technical excellence.
            </p>

            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <p className="text-gray-400 mb-3 text-lg">Scroll to explore</p>
              <div className="w-4 h-7 border-2 border-gray-400 rounded-full flex justify-center p-1">
                <div className="w-2 h-3 bg-blue-400 rounded-full animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="relative z-10 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center mb-12 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 200 ? 1 : 0,
                    transform: scrollY > 200 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${(index % 6) * 100}ms`
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative group h-full">
                    {/* Glow effect on hover */}
                    <div 
                      className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200`}
                    ></div>
                    
                    <div className="relative h-full backdrop-blur-sm bg-gray-800/80 rounded-xl p-6 flex flex-col">
                      <div className="flex items-start mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} mr-4`}>
                          {project.icon}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                            <span className="ml-2 px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                              {project.year}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.categories.map((cat) => (
                              <span 
                                key={cat} 
                                className="px-2 py-0.5 bg-gray-700 rounded-md text-xs text-gray-300"
                              >
                                {categories.find(c => c.id === cat)?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300 hover:bg-gray-600 transition-colors duration-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Outcomes:</h4>
                        <ul className="space-y-1 mb-4">
                          {project.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-start text-xs text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-1 flex-shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button className="mt-2 text-blue-400 text-sm flex items-center group">
                          <span>View project details</span>
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* No results message */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-gray-400 mb-4">No projects found</h3>
                <p className="text-gray-500 mb-6">There are no projects in this category yet.</p>
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-300"
                  onClick={() => setSelectedCategory('all')}
                >
                  View all projects
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Metrics Section */}
        <div className="relative z-10 py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 800 ? 1 : 0,
                transform: scrollY > 800 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-8">
                Project <span className="text-blue-400">Metrics</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Delivering measurable impact through infrastructure optimization and DevOps excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  metric: "42%",
                  description: "Average infrastructure cost reduction",
                  icon: <BarChart3 className="h-8 w-8" />,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  metric: "99.99%",
                  description: "Uptime achieved across systems",
                  icon: <Server className="h-8 w-8" />,
                  color: "from-green-500 to-emerald-500"
                },
                {
                  metric: "85%",
                  description: "Reduction in deployment failures",
                  icon: <GitBranch className="h-8 w-8" />,
                  color: "from-purple-500 to-indigo-500"
                },
                {
                  metric: "10x",
                  description: "Improvement in deployment frequency",
                  icon: <Terminal className="h-8 w-8" />,
                  color: "from-red-500 to-orange-500"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 900 ? 1 : 0,
                    transform: scrollY > 900 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className="group bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{item.metric}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-24 bg-black mb-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden p-0.5 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1200 ? 1 : 0,
                transform: scrollY > 1200 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy"></div>
              <div className="relative bg-gray-900 rounded-2xl p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Infrastructure?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how my expertise can help optimize your cloud infrastructure, automate your workflows, and increase your operational efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white overflow-hidden"
                    onClick={() => navigateToPath('/Consultation')}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </button>
                  <button 
                    className="px-8 py-4 bg-transparent border border-blue-500 rounded-lg font-medium text-blue-400 hover:bg-blue-900/20 transition duration-300"
                    onClick={() => navigateToPath('/Services')}
                  >
                    Explore Services
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

export default ProjectsPage;