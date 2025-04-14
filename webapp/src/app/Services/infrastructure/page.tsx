"use client";
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Gauge
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

// Import icons from react-icons
import { 
  SiTerraform, 
  SiAmazonwebservices, 
  SiAnsible, 
  SiDocker, 
  SiKubernetes, 
  SiJenkins,
  SiGithubactions 
} from "react-icons/si";

const InfrastructureServicePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  // Navigation function
  const navigateToPath = (path: string) => {
    router.push(path);
  };

  // Set window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
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
        }, 100);
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
        }, 16);
      }
    };

    window.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Infrastructure tools data with proper icons
  const infrastructureTools = [
    {
      name: "Terraform",
      description: "Infrastructure as Code for consistent, repeatable deployments across all environments",
      icon: <SiTerraform className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      name: "AWS CloudFormation",
      description: "Template-based infrastructure management for AWS resources",
      icon: <SiAmazonwebservices className="h-6 w-6" />,
      color: "bg-orange-500"
    },
    {
      name: "Ansible",
      description: "Automation for configuration management, application deployment, and orchestration",
      icon: <SiAnsible className="h-6 w-6" />,
      color: "bg-red-500"
    },
    {
      name: "Docker",
      description: "Containerization for application packaging and consistent deployment",
      icon: <SiDocker className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      name: "Kubernetes",
      description: "Container orchestration for scalable, resilient application deployments",
      icon: <SiKubernetes className="h-6 w-6" />,
      color: "bg-cyan-500"
    },
    {
      name: "Jenkins",
      description: "CI/CD automation server for reliable deployment pipelines",
      icon: <SiJenkins className="h-6 w-6" />,
      color: "bg-indigo-500"
    },
    {
      name: "GitHub Actions",
      description: "CI/CD workflows integrated directly with GitHub repositories",
      icon: <SiGithubactions className="h-6 w-6" />,
      color: "bg-blue-700"
    }
  ];

  // Cloud provider data updated to include GCP
  const cloudProviders = [
    {
      name: "Amazon Web Services (AWS)",
      services: ["EC2", "S3", "IAM", "CloudFront", "RDS", "EKS", "Lambda", "DynamoDB"],
      expertise: "Advanced",
      color: "from-orange-500 to-amber-600"
    },
    {
      name: "Microsoft Azure",
      services: ["Virtual Machines", "Blob Storage", "Azure AD", "App Service", "AKS"],
      expertise: "Intermediate",
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Google Cloud Platform (GCP)",
      services: ["Compute Engine", "Cloud Storage", "Cloud Functions", "BigQuery", "Kubernetes Engine"],
      expertise: "Intermediate",
      color: "from-green-500 to-teal-600"
    }
  ];

  // Infrastructure services
  const services = [
    {
      title: "Infrastructure Automation",
      description: "Implementing infrastructure as code solutions using Terraform to create repeatable, reliable deployments with state management via AWS S3 and DynamoDB.",
      icon: <Server className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Cloud Cost Optimization",
      description: "Analysis and implementation of resource right-sizing, reserved instances, and automated scaling to reduce cloud costs while maintaining performance.",
      icon: <Gauge className="h-6 w-6 text-green-400" />
    },
    {
      title: "High Availability Architecture",
      description: "Designing multi-AZ, fault-tolerant infrastructure with automated failover and disaster recovery capabilities.",
      icon: <Shield className="h-6 w-6 text-purple-400" />
    },
    {
      title: "Infrastructure Security",
      description: "Implementing security best practices with IAM policies, network security groups, encryption, and automated compliance checking.",
      icon: <Shield className="h-6 w-6 text-red-400" />
    },
    {
      title: "Infrastructure Monitoring",
      description: "Setting up comprehensive monitoring and alerting for infrastructure health, performance, and availability.",
      icon: <Gauge className="h-6 w-6 text-amber-400" />
    },
    {
      title: "Deployment Automation",
      description: "Streamlining code deployment through CI/CD pipelines with zero-downtime strategies and automated rollbacks.",
      icon: <Clock className="h-6 w-6 text-cyan-400" />
    }
  ];

  // Case studies
  const caseStudies = [
    {
      title: "Enterprise AWS Migration",
      description: "Migrated a financial services company from on-premises to AWS with zero downtime, reducing infrastructure costs by 42% while improving performance.",
      metrics: ["$150K annual savings", "99.99% uptime", "Zero migration downtime"]
    },
    {
      title: "Multi-Region Kubernetes Deployment",
      description: "Implemented a fault-tolerant Kubernetes architecture across multiple AWS regions with automated failover capabilities for a high-traffic e-commerce platform.",
      metrics: ["10x faster deployments", "99.995% availability", "3x performance improvement"]
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
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section with Glassmorphism */}
        <div className="relative pt-32 pb-20">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
              transition: 'background 0.3s ease'
            }}
          ></div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div
              className="inline-block backdrop-blur-xl bg-white/10 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-xl"
              style={getParallaxStyle(10)}
            >
              INFRASTRUCTURE AUTOMATION
            </div>

            <h1
              className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6"
              style={getParallaxStyle(15)}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 animate-gradient">
                Infrastructure
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500 animate-gradient animation-delay-2000">
                as Code
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl"
              style={getParallaxStyle(5)}
            >
              Automate your infrastructure with security and scalability built in from the ground up. 
              Deploy consistently, reliably, and with confidence.
            </p>

            <div className="group relative inline-block" style={getParallaxStyle(8)}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              <button 
                className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center"
                onClick={() => navigateToPath('/Consultation')}
              >
                <span className="text-gray-100 group-hover:text-white transition duration-200">Book Your Infrastructure Consultation</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Infrastructure Tools Grid */}
        <div className="relative z-10 py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 100 ? 1 : 0,
                transform: scrollY > 100 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Infrastructure Tools
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Expert-level expertise with industry-leading infrastructure automation tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructureTools.map((tool, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  style={{
                    opacity: scrollY > 200 ? 1 : 0,
                    transform: scrollY > 200 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold ml-4">{tool.name}</h3>
                    </div>
                    <p className="text-gray-300">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Certifications Section (updated from Cloud Expertise) */}
        <div className="relative z-10 py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 600 ? 1 : 0,
                transform: scrollY > 600 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Cloud <span className="text-blue-400">Certifications</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Certified experience with leading cloud platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cloudProviders.map((provider, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 700 ? 1 : 0,
                    transform: scrollY > 700 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${provider.color} p-0.5 shadow-xl`}>
                    <div className="bg-gray-800 h-full w-full rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-4 text-white">{provider.name}</h3>
                      <p className="text-gray-300 mb-2">Expertise Level: <span className="text-blue-400 font-semibold">{provider.expertise}</span></p>
                      
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-200">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.services.map((service, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Add certification badge for AWS */}
                      {provider.name.includes("AWS") && (
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-6 w-6 text-orange-400" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-bold text-white">AWS Certified Solutions Architect</h4>
                              <p className="text-sm text-gray-400">Associate Level · Valid until Nov 2026</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Add certification badge for Azure */}
                      {provider.name.includes("Azure") && (
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-bold text-white">Microsoft Certified: Azure Fundamentals</h4>
                              <p className="text-sm text-gray-400">Issued: July 2023</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Add certification badge for GCP */}
                      {provider.name.includes("Google") && (
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-bold text-white">Google Cloud Certified: Associate Cloud Engineer</h4>
                              <p className="text-sm text-gray-400">Issued: March 2024</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Infrastructure Services */}
        <div className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1000 ? 1 : 0,
                transform: scrollY > 1000 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Infrastructure Services
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive solutions for your infrastructure needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 1100 ? 1 : 0,
                    transform: scrollY > 1100 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      {service.icon}
                      <h3 className="text-xl font-bold ml-3 text-white">{service.title}</h3>
                    </div>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="relative z-10 py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center mb-16 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1400 ? 1 : 0,
                transform: scrollY > 1400 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-white">
                Infrastructure <span className="text-blue-400">Success Stories</span>
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Real results from our infrastructure automation solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="opacity-0 transform translate-y-10 transition duration-1000 ease-out"
                  style={{
                    opacity: scrollY > 1500 ? 1 : 0,
                    transform: scrollY > 1500 ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-0.5 shadow-xl">
                    <div className="bg-gray-800/60 h-full w-full rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-4 text-white">{study.title}</h3>
                      <p className="text-lg text-gray-300 mb-6">{study.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="bg-indigo-900/30 rounded-lg p-4 text-center border border-indigo-500/30">
                            <p className="text-indigo-400 font-bold">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="text-center mt-12 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1600 ? 1 : 0,
                transform: scrollY > 1600 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <button 
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium flex items-center mx-auto hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                onClick={() => router.push('/Case-studies')}
              >
                <span>View All Case Studies</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative rounded-2xl overflow-hidden p-0.5 opacity-0 transform translate-y-10 transition duration-1000 ease-out"
              style={{
                opacity: scrollY > 1800 ? 1 : 0,
                transform: scrollY > 1800 ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-xy"></div>
              <div className="relative bg-gray-900 rounded-2xl p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Infrastructure?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Schedule a consultation to discover how we can automate, secure, and optimize your infrastructure for maximum performance and reliability.
                </p>
                <div className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                  <button 
                    className="relative px-8 py-4 bg-gray-900 rounded-lg leading-none flex items-center"
                    onClick={() => navigateToPath('/Consultation')}
                  >
                    <span className="text-gray-100 group-hover:text-white transition duration-200">Book Your Infrastructure Consultation</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
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
          .animate-gradient { animation: gradient 8s linear infinite; }
          .animate-gradient-xy { animation: gradient-xy 15s linear infinite; }
          .animate-blob { animation: blob 7s infinite; }
          .animate-pulse-slow { animation: pulse 3s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          
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
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default InfrastructureServicePage;