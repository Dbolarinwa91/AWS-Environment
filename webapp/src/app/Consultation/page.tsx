"use client"; // This ensures client-side execution

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  User, 
  Building, 
  Mail, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Server, 
  GitBranch, 
  Shield,
  Sparkles,
  Code
} from 'lucide-react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ConsultationPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Contact Information
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    
    // Company Information
    companySize: '',
    industry: '',
    website: '',
    
    // Technical Needs
    currentInfrastructure: [],
    primaryChallenges: [],
    otherChallenges: '',
    
    // Project Details
    projectTimeline: '',
    budgetRange: '',
    decisionMaker: '',
    
    // Additional Information
    previousSolutions: '',
    additionalInfo: '',
    
    // Marketing
    referralSource: '',
    marketingConsent: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize client-side state
  useEffect(() => {
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Track mouse position for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity (movement speed)
      const velocityX = Math.abs(e.clientX - lastMousePosition.x);
      const velocityY = Math.abs(e.clientY - lastMousePosition.y);
      
      setMouseVelocity({ x: velocityX, y: velocityY });
      setLastMousePosition({ x: e.clientX, y: e.clientY });
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastMousePosition]);

  const validate = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.company) newErrors.company = 'Company name is required';
      if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    }
    
    else if (step === 2) {
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    }
    
    else if (step === 3) {
      if (formData.currentInfrastructure.length === 0) {
        newErrors.currentInfrastructure = 'Please select at least one option';
      }
      if (formData.primaryChallenges.length === 0) {
        newErrors.primaryChallenges = 'Please select at least one challenge';
      }
    }
    
    else if (step === 4) {
      if (!formData.projectTimeline) newErrors.projectTimeline = 'Project timeline is required';
      if (!formData.budgetRange) newErrors.budgetRange = 'Budget range is required';
      if (!formData.decisionMaker) newErrors.decisionMaker = 'Please specify your decision-making role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'marketingConsent') {
      setFormData({ ...formData, [name]: checked });
      return;
    }
    
    const arrayFields = ['currentInfrastructure', 'primaryChallenges'];
    
    if (arrayFields.includes(name)) {
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...(formData[name as keyof typeof formData] as string[]), value]
        });
      } else {
        setFormData({
          ...formData,
          [name]: (formData[name as keyof typeof formData] as string[]).filter(item => item !== value)
        });
      }
    }
  };

  const nextStep = () => {
    if (validate(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate(step)) return;
    
    setIsSubmitting(true);
    
    try {
      // Score the lead based on qualification criteria
      const score = calculateLeadScore();
      
      // Submit form data along with lead score
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          leadScore: score,
          submittedAt: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        router.push('/consultation/success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // Handle error (show error message)
    }
  };
  
  // Calculate a lead score based on qualification criteria
  const calculateLeadScore = () => {
    let score = 0;
    
    // Company size scoring
    if (formData.companySize === 'enterprise') score += 30;
    else if (formData.companySize === 'midsize') score += 20;
    else if (formData.companySize === 'startup') score += 10;
    
    // Budget scoring
    if (formData.budgetRange === 'above100k') score += 30;
    else if (formData.budgetRange === '50kto100k') score += 25;
    else if (formData.budgetRange === '25kto50k') score += 15;
    else if (formData.budgetRange === '10kto25k') score += 10;
    else if (formData.budgetRange === 'below10k') score += 5;
    
    // Timeline scoring
    if (formData.projectTimeline === 'immediate') score += 20;
    else if (formData.projectTimeline === '1to3months') score += 15;
    else if (formData.projectTimeline === '3to6months') score += 10;
    else if (formData.projectTimeline === 'over6months') score += 5;
    
    // Decision-maker scoring
    if (formData.decisionMaker === 'final') score += 20;
    else if (formData.decisionMaker === 'significant') score += 15;
    else if (formData.decisionMaker === 'influencer') score += 10;
    else if (formData.decisionMaker === 'researching') score += 5;
    
    // Challenges scoring (more challenges = higher potential value)
    score += formData.primaryChallenges.length * 5;
    
    return score;
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-10 pt-8">
        <div className="flex justify-between items-center relative">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                  step === stepNumber 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-glow-intense' 
                    : step > stepNumber 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-800/80 text-gray-400'
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span className={`text-xs mt-2 ${step >= stepNumber ? 'text-white font-medium' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Contact'}
                {stepNumber === 2 && 'Company'}
                {stepNumber === 3 && 'Technical'}
                {stepNumber === 4 && 'Project'}
                {stepNumber === 5 && 'Final'}
              </span>
            </div>
          ))}
          
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-800/80 -translate-y-1/2 z-0">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-500 animate-pulse-subtle" 
              style={{ width: `${(step - 1) * 25}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              Contact Information
            </h2>
            <p className="text-gray-300 mb-8">Tell us a bit about yourself so we can personalize your experience.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name*</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.fullName ? 'border-red-500' : formData.fullName ? 'border-blue-500/70' : 'border-gray-700'} rounded-lg py-3 px-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-gray-600 form-input-glow`}
                    placeholder="Your name"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Email Address*</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.email ? 'border-red-500' : formData.email ? 'border-blue-500/70' : 'border-gray-700'} rounded-lg py-3 px-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-gray-600 form-input-glow`}
                      placeholder="email@company.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.phone ? 'border-blue-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-gray-600 form-input-glow`}
                    placeholder="(optional)"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Company Name*</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.company ? 'border-red-500' : formData.company ? 'border-blue-500/70' : 'border-gray-700'} rounded-lg py-3 px-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-gray-600 form-input-glow`}
                    placeholder="Your company"
                  />
                </div>
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Job Title*</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.jobTitle ? 'border-red-500' : formData.jobTitle ? 'border-blue-500/70' : 'border-gray-700'} rounded-lg py-3 px-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:border-gray-600 form-input-glow`}
                    placeholder="Your role"
                  />
                </div>
                {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <Building className="h-5 w-5 text-cyan-400" />
              </div>
              Company Information
            </h2>
            <p className="text-gray-300 mb-8">Help us understand your organization better.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Company Size*</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.companySize ? 'border-red-500' : formData.companySize ? 'border-cyan-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:border-gray-600 form-input-glow`}
                >
                  <option value="">Select company size</option>
                  <option value="enterprise">Enterprise (1000+ employees)</option>
                  <option value="midsize">Mid-sized (100-999 employees)</option>
                  <option value="small">Small Business (10-99 employees)</option>
                  <option value="startup">Startup (1-9 employees)</option>
                </select>
                {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Industry*</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.industry ? 'border-red-500' : formData.industry ? 'border-cyan-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:border-gray-600 form-input-glow`}
                >
                  <option value="">Select your industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance/Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail/E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="education">Education</option>
                  <option value="media">Media/Entertainment</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.website ? 'border-cyan-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:border-gray-600 form-input-glow`}
                  placeholder="https://example.com (optional)"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                <Code className="h-5 w-5 text-purple-400" />
              </div>
              Technical Requirements
            </h2>
            <p className="text-gray-300 mb-8">Tell us about your current infrastructure and challenges.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-4">Current Infrastructure*</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'aws', label: 'AWS', icon: <Server size={18} /> },
                    { id: 'azure', label: 'Azure', icon: <Server size={18} /> },
                    { id: 'gcp', label: 'Google Cloud', icon: <Server size={18} /> },
                    { id: 'onprem', label: 'On-premises', icon: <Server size={18} /> },
                    { id: 'hybrid', label: 'Hybrid Cloud', icon: <Server size={18} /> },
                    { id: 'containers', label: 'Containers/Kubernetes', icon: <GitBranch size={18} /> }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`infra-${option.id}`}
                        name="currentInfrastructure"
                        value={option.id}
                        checked={(formData.currentInfrastructure as string[]).includes(option.id)}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <label
                        htmlFor={`infra-${option.id}`}
                        className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all ${
                          (formData.currentInfrastructure as string[]).includes(option.id)
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-blue-intense scale-105'
                            : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-700 hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center">
                          {option.icon}
                          <span className="ml-2">{option.label}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.currentInfrastructure && (
                  <p className="text-red-500 text-sm mt-2">{errors.currentInfrastructure}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-4">Primary Challenges*</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'scalability', label: 'Scalability Issues' },
                    { id: 'costs', label: 'High Infrastructure Costs' },
                    { id: 'security', label: 'Security Concerns' },
                    { id: 'performance', label: 'Performance Problems' },
                    { id: 'deployment', label: 'Slow Deployment Process' },
                    { id: 'monitoring', label: 'Inadequate Monitoring' },
                    { id: 'reliability', label: 'System Reliability' },
                    { id: 'migration', label: 'Cloud Migration Challenges' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`challenge-${option.id}`}
                        name="primaryChallenges"
                        value={option.id}
                        checked={(formData.primaryChallenges as string[]).includes(option.id)}
                        onChange={handleCheckboxChange}
                        className="hidden"
                      />
                      <label
                        htmlFor={`challenge-${option.id}`}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all w-full ${
                          (formData.primaryChallenges as string[]).includes(option.id)
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple-intense scale-105'
                            : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-700 hover:border-purple-500/50'
                        }`}
                      >
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.primaryChallenges && (
                  <p className="text-red-500 text-sm mt-2">{errors.primaryChallenges}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Other Challenges or Requirements</label>
                <textarea
                  name="otherChallenges"
                  value={formData.otherChallenges}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.otherChallenges ? 'border-purple-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all hover:border-gray-600 form-input-glow min-h-[100px]`}
                  placeholder="Please describe any other challenges or specific requirements (optional)"
                ></textarea>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <Calendar className="h-5 w-5 text-emerald-400" />
              </div>
              Project Details
            </h2>
            <p className="text-gray-300 mb-8">Help us understand your timeline and budget expectations.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Project Timeline*</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    name="projectTimeline"
                    value={formData.projectTimeline}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.projectTimeline ? 'border-red-500' : formData.projectTimeline ? 'border-emerald-500/70' : 'border-gray-700'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:border-gray-600 form-input-glow`}
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="1to3months">1-3 months</option>
                    <option value="3to6months">3-6 months</option>
                    <option value="over6months">6+ months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>
                {errors.projectTimeline && <p className="text-red-500 text-sm mt-1">{errors.projectTimeline}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Budget Range*</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.budgetRange ? 'border-red-500' : formData.budgetRange ? 'border-emerald-500/70' : 'border-gray-700'} rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:border-gray-600 form-input-glow`}
                  >
                    <option value="">Select budget range</option>
                    <option value="below10k">Below $10,000</option>
                    <option value="10kto25k">$10,000 - $25,000</option>
                    <option value="25kto50k">$25,000 - $50,000</option>
                    <option value="50kto100k">$50,000 - $100,000</option>
                    <option value="above100k">Above $100,000</option>
                    <option value="undecided">Not yet determined</option>
                  </select>
                </div>
                {errors.budgetRange && <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Decision-Making Role*</label>
                <select
                  name="decisionMaker"
                  value={formData.decisionMaker}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${errors.decisionMaker ? 'border-red-500' : formData.decisionMaker ? 'border-emerald-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:border-gray-600 form-input-glow`}
                >
                  <option value="">Select your role in decision-making</option>
                  <option value="final">Final decision maker</option>
                  <option value="significant">Significant influence on decision</option>
                  <option value="influencer">Part of decision-making team</option>
                  <option value="researching">Researching options</option>
                </select>
                {errors.decisionMaker && <p className="text-red-500 text-sm mt-1">{errors.decisionMaker}</p>}
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Previous Solutions</label>
                <textarea
                  name="previousSolutions"
                  value={formData.previousSolutions}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.previousSolutions ? 'border-emerald-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:border-gray-600 form-input-glow`}
                  placeholder="Have you tried any solutions before? What worked or didn't work? (optional)"
                ></textarea>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              Final Steps
            </h2>
            <p className="text-gray-300 mb-8">Just a few more details before we schedule your consultation.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.additionalInfo ? 'border-amber-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all hover:border-gray-600 form-input-glow min-h-[100px]`}
                  placeholder="Anything else you'd like us to know? (optional)"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">How did you hear about us?</label>
                <select
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800/50 backdrop-blur-sm border ${formData.referralSource ? 'border-amber-500/70' : 'border-gray-700'} rounded-lg py-3 px-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all hover:border-gray-600 form-input-glow`}
                >
                  <option value="">Select an option</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral from a colleague</option>
                  <option value="event">Event or Conference</option>
                  <option value="blog">Blog or Content</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="pt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="marketingConsent" className="text-gray-300">
                    I agree to receive educational content, product updates, and industry insights. 
                    You can unsubscribe at any time. See our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
                  </label>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg border border-blue-700/50 shadow-glow-subtle">
                <div className="flex">
                  <Shield className="flex-shrink-0 h-6 w-6 text-blue-400 mr-3" />
                  <p className="text-blue-100 text-sm">
                    Your information is secure and will only be used to process your consultation request.
                    We&apos;ll be in touch within 1 business day to schedule your consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Calculate dynamic styles for elements that depend on window size or mouse position
  const getGradientPosition = () => {
    if (!isMounted) return 'circle at 50% 50%';
    
    const xPercent = mousePosition.x / windowSize.width * 100 || 50;
    const yPercent = mousePosition.y / windowSize.height * 100 || 50;
    
    return `circle at ${xPercent}% ${yPercent}%`;
  };
  
  const getTransformStyle = () => {
    if (!isMounted) return 'translate(0px, 0px)';
    
    const centerX = windowSize.width / 2 || 0;
    const centerY = windowSize.height / 2 || 0;
    
    // Increased multiplier for more dramatic effect (0.02 -> 0.06)
    const moveX = (mousePosition.x - centerX) * 0.06 || 0;
    const moveY = (mousePosition.y - centerY) * 0.06 || 0;
    
    return `translate(${moveX}px, ${moveY}px)`;
  };
  
  // Calculate spotlight size based on mouse velocity
  const getSpotlightSize = () => {
    if (!isMounted) return 400;
    
    // Base size + size increase based on velocity
    const velocityFactor = Math.max(mouseVelocity.x, mouseVelocity.y);
    const sizeIncrease = Math.min(velocityFactor * 2, 200); // Cap at 200px increase
    
    return 400 + sizeIncrease;
  };

  return (
    <div className="relative">
      <div className="bg-black">
        <Header />
      </div>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        {/* Dynamic particle background */}
        <div className="absolute inset-0 overflow-hidden opacity-70 pointer-events-none">
          <svg className="w-full h-full opacity-25">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(117, 130, 176, 0.1)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="spotlight" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
            <circle 
              cx={mousePosition.x || "50%"} 
              cy={mousePosition.y || "50%"} 
              r={getSpotlightSize()} 
              fill="url(#spotlight)"
              opacity="0.8"
              className="animate-pulse-subtle"
            />
          </svg>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 -left-16 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-1/4 -right-16 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl animate-float-delayed opacity-60"></div>
        
        {/* Moving gradient bg */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/20 animate-gradient-shift opacity-60"
          style={{
            backgroundPosition: `${scrollPosition * 0.1}px ${scrollPosition * -0.1}px`,
            backgroundSize: '200% 200%'
          }}
        ></div>
        
        {/* Reactive gradient that follows mouse */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/5 to-transparent opacity-70"
          style={{
            backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
            backgroundSize: `${windowSize.width}px ${windowSize.height}px`
          }}
        ></div>
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light pointer-events-none"></div>
        
        {/* Main content container */}
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 relative z-10 py-10">
          <div className="text-center pt-12 pb-8 relative">
            {/* Glow effect behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 blur-3xl rounded-full"></div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 leading-tight relative">
              Schedule Your DevOps Consultation
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Tell us about your infrastructure needs, and we&apos;ll show you how our solutions can transform your technology capabilities.
            </p>
          </div>
          
          {renderStepIndicator()}
          
          {/* Main form card with glassmorphism */}
          <div className="relative backdrop-blur-xl rounded-2xl p-0.5 shadow-2xl border border-gray-700 bg-card-glow cursor-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-purple-500/15 rounded-2xl opacity-80"></div>
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div 
                className="absolute -inset-[10px] opacity-60 blur-3xl" 
                style={{
                  background: `radial-gradient(${getGradientPosition()}, rgba(123, 104, 238, 0.25) 0%, transparent 70%)`,
                  transform: getTransformStyle(),
                  transition: 'transform 0.2s ease-out'
                }}
              ></div>
            </div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 overflow-hidden">
              <form onSubmit={handleSubmit}>
                {renderForm()}
                
                <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between pt-4 border-t border-gray-800/80">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 flex items-center justify-center text-gray-300 hover:text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-500 rounded-lg transition-all hover:shadow-sm"
                    >
                      <ChevronLeft className="mr-2 h-5 w-5" />
                      Back
                    </button>
                  )}
                  
                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center transition-all shadow-glow-intense hover:shadow-glow-super hover:scale-105"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center transition-all shadow-glow-intense hover:shadow-glow-super hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* CSS for animations and effects */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
            animation-delay: 1s;
          }
          
          @keyframes gradient-shift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          
          .animate-gradient-shift {
            animation: gradient-shift 15s ease infinite;
          }
          
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float 8s ease-in-out infinite;
            animation-delay: 1s;
          }
          
          .animate-pulse-subtle {
            animation: pulse-subtle 3s infinite;
          }
          
          @keyframes pulse-subtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .shadow-glow {
            box-shadow: 0 0 15px 0 rgba(79, 70, 229, 0.3);
          }
          
          .shadow-glow-intense {
            box-shadow: 0 0 25px 5px rgba(79, 70, 229, 0.4);
          }
          
          .shadow-glow-super {
            box-shadow: 0 0 40px 10px rgba(79, 70, 229, 0.6);
          }
          
          .shadow-glow-subtle {
            box-shadow: 0 0 10px 0 rgba(79, 70, 229, 0.15);
          }
          
          .shadow-glow-blue {
            box-shadow: 0 0 12px 0 rgba(59, 130, 246, 0.35);
          }
          
          .shadow-glow-blue-intense {
            box-shadow: 0 0 25px 5px rgba(59, 130, 246, 0.5);
          }
          
          .shadow-glow-purple {
            box-shadow: 0 0 12px 0 rgba(124, 58, 237, 0.35);
          }
          
          .shadow-glow-purple-intense {
            box-shadow: 0 0 25px 5px rgba(124, 58, 237, 0.5);
          }
          
          .form-input-glow:focus {
            box-shadow: 0 0 15px 0 rgba(59, 130, 246, 0.4);
          }
          
          .bg-card-glow {
            background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15), transparent 70%), 
                        radial-gradient(ellipse at bottom, rgba(124, 58, 237, 0.15), transparent 70%);
          }
          
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          }
          
          .cursor-glow {
            transition: box-shadow 0.3s ease;
          }
          
          .cursor-glow:hover {
            box-shadow: 0 0 30px 5px rgba(79, 70, 229, 0.35);
          }
        `}</style>
      </div>
      
      <div className="bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default ConsultationPage;