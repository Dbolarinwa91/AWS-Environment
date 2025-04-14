"use client";
import { BsCloudCheck } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Shield, 
  Database, 
  ArrowRight,
  CheckCircle,
  FileCode,
  Cpu,
  DollarSign,
  BarChart3
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

// Import cloud provider icons from react-icons
import { 
  SiAmazonwebservices, 
  SiMicrosoftazure,
  SiGooglecloud 
} from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

const CloudServicePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [activeTab, setActiveTab] = useState('aws');
  const [hoveredCard, setHoveredCard] = useState(null);
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

  // Cloud providers data with updated icons
  const cloudProviders = {
    aws: {
      name: "Amazon Web Services",
      icon: <SiAmazonwebservices className="h-12 w-12" />,
      color: "from-orange-400 to-orange-600",
      documentationUrl: "https://docs.aws.amazon.com/",
      services: [
        { 
          name: "EC2", 
          description: "Scalable virtual servers in the cloud",
          tools: ["Terraform", "CloudFormation", "AWS CLI"]
        },
        { 
          name: "S3", 
          description: "Object storage built to store and retrieve any amount of data",
          tools: ["AWS SDK", "S3cmd", "Storage Gateway"]
        },
        { 
          name: "IAM", 
          description: "Identity and access management for secure resource control",
          tools: ["IAM Policy Simulator", "AWS Organizations", "Security Hub"]
        },
        { 
          name: "CloudFront", 
          description: "Fast content delivery network (CDN) service",
          tools: ["Lambda@Edge", "Origin Shield", "AWS WAF"]
        },
        { 
          name: "RDS", 
          description: "Managed relational database service for MySQL, PostgreSQL, and more",
          tools: ["DMS", "Performance Insights", "Database Proxy"]
        },
        { 
          name: "EKS", 
          description: "Managed Kubernetes service to run containerized applications",
          tools: ["eksctl", "Helm", "Kubernetes Dashboard"]
        }
      ]
    },
    azure: {
      name: "Microsoft Azure",
      icon: <FaMicrosoft className="h-12 w-12" />,
      color: "from-blue-400 to-blue-600",
      documentationUrl: "https://docs.microsoft.com/azure/",
      services: [
        { 
          name: "Virtual Machines", 
          description: "Highly available, scalable virtualized infrastructure",
          tools: ["ARM Templates", "Azure CLI", "Azure PowerShell"]
        },
        { 
          name: "App Service", 
          description: "Quickly create powerful cloud apps for web and mobile",
          tools: ["Visual Studio integration", "Deployment slots", "App Insights"]
        },
        { 
          name: "Azure Functions", 
          description: "Process events with serverless code architecture",
          tools: ["Durable Functions", "Azure Logic Apps", "Event Grid"]
        },
        { 
          name: "Azure Kubernetes Service", 
          description: "Simplified container deployment and management",
          tools: ["Azure DevOps", "Helm", "Draft"]
        },
        { 
          name: "Azure DevOps", 
          description: "Development collaboration tools including pipelines, boards",
          tools: ["Azure Boards", "Azure Pipelines", "Azure Repos"]
        }
      ]
    },
    gcp: {
      name: "Google Cloud Platform",
      icon: <SiGooglecloud className="h-12 w-12" />,
      color: "from-red-400 to-red-600",
      documentationUrl: "https://cloud.google.com/docs",
      services: [
        { 
          name: "Compute Engine", 
          description: "Secure and customizable compute service",
          tools: ["gcloud CLI", "Deployment Manager", "VM Manager"]
        },
        { 
          name: "Cloud Storage", 
          description: "Object storage for companies of all sizes",
          tools: ["gsutil", "Storage Transfer Service", "Cloud CDN"]
        },
        { 
          name: "Cloud Run", 
          description: "Fully managed compute platform for containerized applications",
          tools: ["Cloud Build", "Container Registry", "Cloud Code"]
        },
        { 
          name: "Google Kubernetes Engine (GKE)", 
          description: "Managed, production-ready environment for running containerized applications",
          tools: ["kubectl", "Cloud Build", "Anthos"]
        },
        { 
          name: "BigQuery", 
          description: "Serverless, highly scalable, and cost-effective cloud data warehouse",
          tools: ["Data Studio", "Looker", "Cloud Dataflow"]
        },
        { 
          name: "Cloud IAM", 
          description: "Fine-grained identity and access management",
          tools: ["Policy Analyzer", "Security Key Enforcement", "Cloud Identity"]
        }
      ]
    },
    hybrid: {
      name: "Hybrid Cloud",
      icon: <BsCloudCheck className="h-12 w-12" />,
      color: "from-purple-400 to-purple-600",
      documentationUrl: "https://azure.microsoft.com/solutions/hybrid-cloud/",
      services: [
        { 
          name: "VPN Connectivity", 
          description: "Secure connections between cloud and on-premises",
          tools: ["AWS Direct Connect", "Azure ExpressRoute", "Google Cloud Interconnect"]
        },
        { 
          name: "Hybrid Storage", 
          description: "Integrated storage solutions across environments",
          tools: ["AWS Storage Gateway", "Azure StorSimple", "Google Anthos"]
        },
        { 
          name: "Multi-Cloud Management", 
          description: "Unified control of resources across providers",
          tools: ["Terraform", "Kubernetes", "Pulumi"]
        },
        { 
          name: "Disaster Recovery", 
          description: "Cross-environment backup and recovery solutions",
          tools: ["AWS Backup", "Azure Site Recovery", "GCP Backup & DR"]
        },
        { 
          name: "Identity Federation", 
          description: "Single authentication across hybrid environments",
          tools: ["AWS IAM", "Azure AD", "Google Cloud Identity"]
        }
      ]
    }
  };

  // Certifications data with updated icons
  const certifications = [
    {
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      validUntil: "Nov 2026",
      credentialId: "QS1ZPZ0C8JF4QNCZ",
      skills: ["Multi-Account Architecture", "Hybrid Connectivity", "Distributed Systems Design", "Cost Optimization", "Serverless Architecture"],
      icon: <SiAmazonwebservices className="h-6 w-6" />,
      color: "bg-orange-500",
      level: "Professional"
    },
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      validUntil: "Nov 2026",
      credentialId: "AWS-ASA-1234567",
      skills: ["Amazon S3", "Amazon RDS", "Cloud Architecture", "EC2", "VPC"],
      icon: <SiAmazonwebservices className="h-6 w-6" />,
      color: "bg-orange-400",
      level: "Associate"
    },
    {
      name: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      validUntil: "Issued: July 2023",
      credentialId: "MSFT-AZ305-12345",
      skills: ["Authentication & Authorization", "Governance", "Migration", "Infrastructure Design", "Networking"],
      icon: <FaMicrosoft className="h-6 w-6" />,
      color: "bg-blue-500",
      level: "Professional"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      validUntil: "Issued: July 2023",
      credentialId: "1A542F723591121B",
      skills: ["DevOps", "Linux", "Azure Fundamentals", "Cloud Concepts", "Security"],
      icon: <FaMicrosoft className="h-6 w-6" />,
      color: "bg-blue-400",
      level: "Fundamentals"
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      validUntil: "Issued: March 2024",
      credentialId: "GCP-PCA-98765",
      skills: ["System Design", "Security", "Compliance", "GKE", "BigQuery"],
      icon: <SiGooglecloud className="h-6 w-6" />,
      color: "bg-red-500",
      level: "Professional"
    }
  ];

  // Cloud strategies data with updated documentation links
  const cloudStrategies = [
    {
      title: "Cost Optimization",
      description: "Implement right-sizing, scheduled scaling, and reserved instances to reduce cloud costs by 30-50%",
      icon: <DollarSign className="h-8 w-8" />,
      color: "bg-emerald-500"
    },
    {
      title: "Multi-Cloud Architecture",
      description: "Design resilient systems across multiple cloud providers to eliminate vendor lock-in and enhance availability",
      icon: <BsCloudCheck className="h-8 w-8" />,
      color: "bg-blue-500"
    },
    {
      title: "Security & Compliance",
      description: "Build security through IAM, encryption, network policies, and automated compliance monitoring",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-red-500"
    },
    {
      title: "Performance Optimization",
      description: "Architect for optimal performance using caching, CDNs, and right-sized compute resources",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-purple-500"
    },
    {
      title: "Infrastructure as Code",
      description: "Manage cloud resources with Terraform and other IaC tools for consistent, version-controlled deployments",
      icon: <FileCode className="h-8 w-8" />,
      color: "bg-indigo-500"
    },
    {
      title: "Cloud-Native Development",
      description: "Leverage containers, microservices, and serverless architectures for scalable, resilient applications",
      icon: <Cpu className="h-8 w-8" />,
      color: "bg-amber-500"
    }
  ];

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
              ENTERPRISE CLOUD SOLUTIONS
            </div>

            <h1
              className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 relative z-10"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 animate-gradient">
                Cloud
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 animate-gradient animation-delay-2000">
                Architecture
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl"
              style={getParallaxStyle(5)}
            >
              Optimize your cloud infrastructure for performance, security, and cost efficiency with proven expertise across AWS, Azure, and hybrid environments.
            </p>

            <div className="group relative inline-block" style={getParallaxStyle(8)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <button 
                className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center"
                onClick={() => navigateToPath('/Consultation')}
              >
                <span className="text-gray-100 group-hover:text-white transition duration-200">Book Your Cloud Strategy Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Cloud Providers Section */}
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
                Cloud Expertise
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive knowledge across leading cloud platforms to power your digital transformation
              </p>
            </div>

            {/* Tabs for Cloud Providers */}
            <div className="flex flex-wrap justify-center mb-12 gap-4">
              {Object.entries(cloudProviders).map(([key, provider]) => (
                <button
                  key={key}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTab === key 
                      ? `bg-gradient-to-r ${provider.color} text-white shadow-lg` 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {provider.name}
                </button>
              ))}
            </div>

            {/* Active Cloud Provider Details */}
            {Object.entries(cloudProviders).map(([key, provider]) => (
              <div
                key={key}
                className={`transition-all duration-500 ${
                  activeTab === key ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 absolute pointer-events-none'
                }`}
                style={{ display: activeTab === key ? 'block' : 'none' }}
              >
                <div className="flex flex-col items-center mb-12">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${provider.color} mb-6 relative group overflow-hidden`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white transition-opacity duration-300"></div>
                    {React.cloneElement(provider.icon, { className: "h-16 w-16 text-white relative z-10" })}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{provider.name}</h3>
                  <a 
                    href={provider.documentationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center mb-8 group border border-blue-500/30 rounded-full px-4 py-2 transition-all duration-300 hover:bg-blue-900/20"
                  >
                    <span>Official Documentation</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.services.map((service, index) => (
                    <div 
                      key={index}
                      className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
                      onMouseEnter={() => setHoveredCard(service.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative">
                        <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${provider.color} opacity-0 group-hover:opacity-30 blur transition duration-300`}></div>
                        <div className="relative">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{service.name}</h4>
                          <p className="text-gray-300 mb-4">{service.description}</p>
                          
                          <div className="border-t border-gray-700 pt-4 mt-4">
                            <h5 className="text-sm font-semibold text-gray-400 mb-2">Tools & Resources:</h5>
                            <div className="flex flex-wrap gap-2">
                              {service.tools.map((tool, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
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
                Professional <span className="text-blue-400">Certifications</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Industry-recognized credentials validating cloud expertise
              </p>
            </div>

            {/* Filter controls for certifications */}
            <div className="flex flex-wrap justify-center mb-8 gap-3">
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-400 to-orange-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                onClick={() => {}}
              >
                AWS Certifications
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                onClick={() => {}}
              >
                Azure Certifications
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-red-400 to-red-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                onClick={() => {}}
              >
                GCP Certifications
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-400 to-gray-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20"
                onClick={() => {}}
              >
                All Certifications
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out backdrop-blur-xl bg-white/5 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-blue-900/10"
                  style={{
                    opacity: scrollY > 900 ? 1 : 0,
                    transform: scrollY > 900 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className={`h-2 ${cert.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-50 bg-white transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${cert.color} bg-opacity-90`}>
                        {cert.level}
                      </span>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className={`${cert.color} rounded-lg p-3 mr-4 transform group-hover:scale-110 transition-transform duration-300`}>
                        {cert.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{cert.name}</h3>
                        <p className="text-gray-400">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-gray-300 mb-4 text-sm">
                      <p><span className="text-gray-400">Valid Until:</span> {cert.validUntil}</p>
                      <p><span className="text-gray-400">Credential ID:</span> {cert.credentialId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-2 text-sm">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-xs text-gray-300 transition-colors duration-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Strategies Section */}
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
                Cloud Strategies
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Industry-leading approaches to maximize the value of your cloud investment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cloudStrategies.map((strategy, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 1500 ? 1 : 0,
                    transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="bg-gray-800 rounded-xl p-8 h-full border border-gray-700 hover:border-blue-500 transition-all duration-300 group relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-md rounded-xl transition-all duration-500"></div>
                    
                    {/* Content with relative positioning */}
                    <div className="relative z-10">
                      <div className={`${strategy.color} rounded-2xl p-4 mb-6 w-16 h-16 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                        {strategy.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">{strategy.title}</h3>
                      <p className="text-gray-300 mb-6">{strategy.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-700">
                        <a 
                          href="/Documentation" 
                          className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors duration-300"
                        >
                          <span>View documentation</span>
                          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div className="relative z-10 py-24 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 2000 ? 1 : 0,
                transform: scrollY > 2000 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
                <div className="px-8 py-12 md:p-12 lg:p-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="inline-block bg-blue-600/20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-6">
                        CASE STUDY
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-6">TechCorp's Cloud Migration Success</h2>
                      <p className="text-lg text-gray-300 mb-6">
                        TechCorp needed to migrate their legacy infrastructure to a modern cloud environment while reducing costs and improving reliability. Our comprehensive cloud strategy delivered remarkable results.
                      </p>
                      <ul className="space-y-3 mb-8">
                        {[
                          "Reduced AWS costs by 42% through right-sizing and reserved instances",
                          "Improved system performance by 3x through architecture optimization",
                          "Zero downtime during migration with blue-green deployment",
                          "Enhanced security posture with comprehensive IAM policies",
                          "Implemented auto-scaling to handle 10x traffic spikes"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-1" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white flex items-center transition duration-300"
                        onClick={() => navigateToPath('/Case-studies')}
                      >
                        <span>View More Case Studies</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="relative h-full w-full min-h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="relative">
                          <div className="w-48 h-48 rounded-full bg-blue-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Server className="h-10 w-10 text-blue-400" />
                          </div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <SiAmazonwebservices className="h-10 w-10 text-orange-400" />
                          </div>
                          <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2">
                            <Database className="h-10 w-10 text-purple-400" />
                          </div>
                          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                            <Shield className="h-10 w-10 text-green-400" />
                          </div>
                          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-float">
                            <span className="text-white text-2xl font-bold">42%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden p-0.5 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 2500 ? 1 : 0,
                transform: scrollY > 2500 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-xy"></div>
              <div className="relative bg-gray-900 rounded-2xl p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Optimize Your Cloud Infrastructure?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Schedule a consultation to discover how our cloud expertise can help you reduce costs, enhance security, and improve performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white overflow-hidden"
                    onClick={() => navigateToPath('/Consultation')}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Book Your Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </button>
                  <button 
                    className="px-8 py-4 bg-transparent border border-blue-500 rounded-lg font-medium text-blue-400 hover:bg-blue-900/20 transition duration-300"
                    onClick={() => navigateToPath('/Services')}
                  >
                    Explore Other Services
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

        {/* CSS for animations */}
        <style jsx>{`
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-gradient { animation: gradient 8s linear infinite; }
          .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
          .animate-blob { animation: blob 7s infinite; }
          .animate-bounce-slow { animation: bounce 2s infinite; }
          .animate-pulse-slow { animation: pulse 3s infinite; }
          .animate-spin-slow { animation: spin 30s linear infinite; }
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
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default CloudServicePage;