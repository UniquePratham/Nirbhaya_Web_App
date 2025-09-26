'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import AppLayout from '@/components/AppLayout';
import { TabType } from '@/types';
import {
  User,
  Phone,
  Droplets,
  Calendar,
  Users,
  AlertTriangle,
  Edit3,
  Check,
  X,
  Shield,
  Heart,
  Crown,
  Sparkles,
  Zap,
  Star,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Globe,
  Lock,
  Smartphone,
  MapPin,
  MessageSquare,
  Clock,
  UserCheck,
  Play,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import dynamic from 'next/dynamic';

// Dynamically import the Spline component to avoid SSR errors; provide a small wrapper named SplineScene
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

const SplineScene: React.FC<{ scene: string; className?: string }> = ({ scene, className }) => {
  // react-spline may not have perfect TypeScript types in this project; using the dynamic import without forcing a TS suppression
  return <Spline scene={scene} className={className} />;
};

// Landing Page Component for Non-Authenticated Users
const LandingPage = () => {
  const router = useRouter();
  // removed hoveredFeature hover state (replaced with CSS-only hover effects)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Array of praising messages for Nirbhaya
  const praisingMessages = [
    "Nirbhaya gives me the confidence to go anywhere! 💪✨",
    "Thank you Nirbhaya for keeping me safe every day! 🛡️💕",
    "I feel so empowered with Nirbhaya by my side! 🌟",
    "Nirbhaya is my guardian angel - always protecting me! 👼💖",
    "Thanks to Nirbhaya, I never feel alone or unsafe! 🤗🔒"
  ];

  // Function to get random message
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * praisingMessages.length);
    return praisingMessages[randomIndex];
  };

  // Handle speech bubble hover
  const handleMouthHover = () => {
    setCurrentMessage(getRandomMessage());
    setShowSpeechBubble(true);
  };

  const handleMouthLeave = () => {
    setShowSpeechBubble(false);
  };

  const features = [
    {
      icon: Shield,
      title: "Emergency SOS",
      description: "One-tap emergency alerts to your trusted contacts with real-time location sharing",
      gradient: "from-[var(--primary)] to-[var(--accent)]",
      bgGradient: "from-[var(--surface)] to-[var(--surface-light)]"
    },
    {
      icon: Users,
      title: "Trusted Network",
      description: "Build your safety network with family and friends who can respond instantly",
      gradient: "from-[var(--secondary)] to-[var(--accent)]",
      bgGradient: "from-[var(--surface-light)] to-[var(--surface)]"
    },
    {
      icon: MapPin,
      title: "Live Location",
      description: "Share your real-time location with precision and automatic location updates",
      gradient: "from-[var(--accent)] to-[var(--primary)]",
      bgGradient: "from-[var(--surface)] to-[var(--surface-elevated)]"
    },
    {
      icon: MessageSquare,
      title: "Smart Alerts",
      description: "AI-powered safety alerts and automatic notifications to emergency contacts",
      gradient: "from-[var(--primary)] to-[var(--secondary-dark)]",
      bgGradient: "from-[var(--surface-light)] to-[var(--surface)]"
    },
    {
      icon: Clock,
      title: "24/7 Protection",
      description: "Round-the-clock safety monitoring and instant response capabilities",
      gradient: "from-[var(--accent)] to-[var(--tertiary)]",
      bgGradient: "from-[var(--surface)] to-[var(--surface-elevated)]"
    },
    {
      icon: Smartphone,
      title: "Cross Platform",
      description: "Works seamlessly across all devices with offline emergency features",
      gradient: "from-[var(--tertiary)] to-[var(--secondary-dark)]",
      bgGradient: "from-[var(--surface)] to-[var(--surface-elevated)]"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Safety Advocate",
      content: "Nirbhaya has given me the confidence to travel alone. The instant alerts and location sharing features are incredibly reliable.",
      avatar: "SJ"
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Healthcare Professional",
      content: "As a healthcare worker working late shifts, this app provides essential peace of mind for me and my family.",
      avatar: "MR"
    },
    {
      name: "Priya Sharma",
      role: "College Student",
      content: "The emergency network feature helped me during a critical situation. My contacts were alerted immediately.",
      avatar: "PS"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => router.push('/')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg scale-110 animate-pulse" />
                <Image
                  src="/only_logo.png"
                  alt="Nirbhaya Logo"
                  width={45}
                  height={45}
                  className="relative z-10 drop-shadow-lg"
                />
              </div>
              <span className="text-2xl font-black text-primary drop-shadow-sm">Nirbhaya</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="relative font-medium transition-colors duration-300 group" style={{ color: 'var(--text-secondary)' }}>
                Features
                <span className="absolute -bottom-1 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}></span>
              </a>
              <a href="#how-it-works" className="relative font-medium transition-colors duration-300 group" style={{ color: 'var(--text-secondary)' }}>
                How it Works
                <span className="absolute -bottom-1 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}></span>
              </a>
              <a href="#testimonials" className="relative font-medium transition-colors duration-300 group" style={{ color: 'var(--text-secondary)' }}>
                Testimonials
                <span className="absolute -bottom-1 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}></span>
              </a>
              <a href="#pricing" className="relative font-medium transition-colors duration-300 group" style={{ color: 'var(--text-secondary)' }}>
                Pricing
                <span className="absolute -bottom-1 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}></span>
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => router.push('/auth?mode=signin')}
                variant="ghost"
                className="text-secondary hover:text-primary font-semibold cursor-pointer hover:bg-surface-light transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/auth?mode=signup')}
                className="btn-modern-primary text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent hover:bg-surface-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" style={{ background: 'var(--surface-elevated)', borderTop: '1px solid var(--border-light)' }}>
            {/* Mobile Navigation Links */}
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-surface-light transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-surface-light transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-surface-light transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-surface-light transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border-light space-y-3">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/auth?mode=signin');
                }}
                variant="ghost"
                className="w-full text-secondary hover:text-primary font-semibold cursor-pointer hover:bg-surface-light transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/auth?mode=signup');
                }}
                className="w-full btn-modern-primary text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen" style={{ background: 'var(--background)', backgroundImage: 'radial-gradient(ellipse at top left, rgba(212, 199, 216, 0.12) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(232, 145, 199, 0.08) 0%, transparent 50%)' }}>
        <div className="absolute inset-0 bg-grid-light opacity-20" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse bg-primary-light" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl animate-pulse bg-secondary-light" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full blur-xl animate-pulse bg-accent-light" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* Left Content */}
            <div className="text-left lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-8 bg-glass-light" style={{ color: 'var(--primary)' }}>
                <Sparkles className="w-4 h-4 mr-2" />
                Your Safety, Our Priority
                <Badge className="ml-2 text-white btn-modern-primary">New</Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-black mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
                <span className="gradient-text">
                  Empower
                </span>{' '}
                Your Safety
                <br />
                <span className="text-secondary">Connect with</span>{' '}
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                  Confidence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl leading-relaxed">
                The most advanced personal safety platform that connects you with your trusted network
                instantly during emergencies. Stay protected, stay connected, stay strong.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <Button
                  onClick={() => router.push('/auth?mode=signup')}
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer btn-primary-gradient text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:-translate-y-1"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Start Protecting Yourself
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer border-2 font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 bg-glass-light"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                    '--hover-bg': 'var(--surface-elevated)',
                    '--hover-color': 'var(--primary)'
                  } as React.CSSProperties}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <span>Global Coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Scene */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-glass-medium" style={{ border: '1px solid var(--border-light)' }}>
                {/* Background decoration */}
                <div className="absolute inset-0 bg-primary-gradient opacity-10" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-primary-light rounded-full blur-lg animate-pulse" />
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-accent-light rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />

                {/* 3D Scene Container */}
                <div className="relative w-full h-full">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />

                  {/* Interactive Mouth Hover Area - Positioned above robot's mouth */}
                  <div
                    className="opacity-0 hover-area absolute top-2/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 rounded-full z-10"
                    onMouseEnter={handleMouthHover}
                    onMouseLeave={handleMouthLeave}
                  />

                  {/* Comic Book Style Speech Bubble - Top Right Corner */}
                  {showSpeechBubble && (
                    <div className="absolute top-58 right-0 z-20">
                      <div className="speech-bubble-container">
                        <div className="speech-bubble max-w-xs">
                          <p className="text-sm">
                            {currentMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlay content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl" style={{ border: '2px solid var(--primary)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full animate-pulse shadow-lg" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}></div>
                      <span className="text-sm font-bold text-gray-800 drop-shadow-sm">Strong & Confident</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 font-medium">Your safety companion, always ready</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
              Powerful Features for
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}> Complete Safety</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Every feature is designed with your safety in mind, providing comprehensive protection
              through smart technology and human connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl overflow-hidden cursor-pointer bg-glass-light shadow-sm transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl min-h-[220px] card-modern"
              >
                {/* Hover glow behind full card */}
                <div
                  aria-hidden
                  className="absolute -inset-0.5 rounded-3xl bg-primary-gradient opacity-25 group-hover:opacity-100 blur-xl transition"
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 btn-primary-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg drop-shadow-primary">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24" style={{ background: 'linear-gradient(135deg, var(--surface-light) 0%, var(--surface) 50%, var(--surface-light) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
              How It
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}> Works</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Get started in minutes and stay protected in seconds. Our simple 3-step process ensures your safety network is always ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Lines - Only between steps */}
            <div className="hidden md:block absolute top-16 left-1/3 w-1/3 h-0.5 transform -translate-x-1/2" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)' }}>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-6 border-t-3 border-b-3 border-l-current border-t-transparent border-b-transparent" style={{ color: 'var(--accent)' }}></div>
            </div>
            <div className="hidden md:block absolute top-16 left-2/3 w-1/3 h-0.5 transform -translate-x-1/2" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)' }}>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-6 border-t-3 border-b-3 border-l-current border-t-transparent border-b-transparent" style={{ color: 'var(--accent)' }}></div>
            </div>

            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 btn-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center bg-glass-light" style={{ border: '2px solid var(--primary)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Sign Up & Setup</h3>
              <p className="text-muted leading-relaxed">
                Create your account in under 2 minutes. Add your personal details and emergency information securely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 btn-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center bg-glass-light" style={{ border: '2px solid var(--primary)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Add Trusted Contacts</h3>
              <p className="text-muted leading-relaxed">
                Build your safety network by adding family and friends who can respond to emergency alerts instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 btn-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center bg-glass-light" style={{ border: '2px solid var(--primary)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Stay Protected</h3>
              <p className="text-muted leading-relaxed">
                You&apos;re all set! One tap sends instant alerts with your location to your trusted network. 24/7 protection activated.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-surface-light rounded-full">
              <Clock className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
              <span className="font-semibold" style={{ color: 'var(--primary)' }}>Setup takes less than 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--tertiary) 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-surface-light/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-surface/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-surface-light/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Trusted by Thousands
              <span className="block text-lg font-normal opacity-80 mt-2">Real impact, real protection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="group relative">
              <div className="bg-glass-light backdrop-blur-lg rounded-3xl p-8 border-light hover:bg-glass-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-pulse">
                  50K+
                </div>
                <div className="text-xl font-bold mb-2">
                  Lives Protected
                </div>
                <div className="text-sm opacity-80">
                  Users trusting our platform worldwide
                </div>
                <div className="absolute inset-0 rounded-3xl bg-surface-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="bg-glass-light backdrop-blur-lg rounded-3xl p-8 border-light hover:bg-glass-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '0.5s' }}>
                  99.9%
                </div>
                <div className="text-xl font-bold mb-2">
                  Uptime Reliability
                </div>
                <div className="text-sm opacity-80">
                  Always there when you need us most
                </div>
                <div className="absolute inset-0 rounded-3xl bg-surface-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="bg-glass-light backdrop-blur-lg rounded-3xl p-8 border-light hover:bg-glass-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '1s' }}>
                  &lt;2s
                </div>
                <div className="text-xl font-bold mb-2">
                  Response Time
                </div>
                <div className="text-sm opacity-80">
                  Lightning-fast emergency alerts
                </div>
                <div className="absolute inset-0 rounded-3xl bg-surface-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
              Simple
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}> Pricing</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Your safety shouldn&apos;t have a price tag. Start free and upgrade when you&apos;re ready for premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="relative bg-surface rounded-3xl p-8 shadow-lg border-light hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Free</h3>
                <div className="text-4xl font-black text-primary mb-6">
                  $0
                  <span className="text-lg font-normal text-muted">/month</span>
                </div>
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Up to 3 emergency contacts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Basic SOS alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Location sharing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">24/7 support</span>
                  </li>
                </ul>
                <Button className="mt-10 xs:mt-0 w-full btn-secondary cursor-pointer text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-secondary/25 transition-all duration-500 hover:-translate-y-1">
                  Get Started Free
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-surface-elevated rounded-3xl p-8 shadow-xl border-2 border-primary hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="btn-primary-gradient text-white px-6 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Pro</h3>
                <div className="text-4xl font-black text-primary mb-6">
                  $9.99
                  <span className="text-lg font-normal text-muted">/month</span>
                </div>
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Unlimited emergency contacts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Advanced SOS with audio/video</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Real-time location tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Smart alerts & notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary-gradient text-white cursor-pointer font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-primary/25 transition-all duration-500 hover:-translate-y-1">
                  Start Pro Trial
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative bg-surface rounded-3xl p-8 shadow-lg border-light hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">Enterprise</h3>
                <div className="text-4xl font-black text-primary mb-6">
                  Custom
                  <span className="text-lg font-normal text-muted">/pricing</span>
                </div>
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Team management dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">API integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    <span className="text-muted">Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-2 border-primary hover:border-accent text-secondary hover:text-primary hover:bg-surface-light cursor-pointer font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:-translate-y-1" style={{ '--hover-bg': 'var(--surface-light)', '--hover-color': 'var(--primary)' } as React.CSSProperties}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-6 lg:space-x-8 space-y-4 sm:space-y-0 bg-surface-light rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-secondary font-semibold text-sm sm:text-base">30-day money back guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Lock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-primary font-semibold text-sm sm:text-base">No setup fees</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-primary font-semibold text-sm sm:text-base">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
              Trusted by
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary), var(--accent))' }}> Thousands</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Real stories from people who trust Nirbhaya to keep them safe every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface-light backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-light">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 btn-primary-gradient rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-secondary leading-relaxed mb-4">&ldquo;{testimonial.content}&rdquo;</p>

                <div className="flex status-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Download Section */}
      <section className="py-24 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--secondary-dark) 0%, var(--tertiary) 50%, var(--primary) 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-semibold mb-8">
                <Smartphone className="w-4 h-4 mr-2" />
                Download Our Mobile App
                <Badge className="ml-2 bg-white" style={{ color: 'var(--primary)' }}>Free</Badge>
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Take Your Safety
                <br />
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Everywhere You Go
                </span>
              </h2>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Get instant access to all safety features right from your phone. Available on iOS and Android with offline emergency capabilities.
              </p>

              {/* App Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Instant Alerts</div>
                    <div className="text-sm text-white/70">One-tap emergency SOS</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Live Tracking</div>
                    <div className="text-sm text-white/70">Real-time location sharing</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Trusted Network</div>
                    <div className="text-sm text-white/70">Connect with loved ones</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">24/7 Protection</div>
                    <div className="text-sm text-white/70">Always-on safety monitoring</div>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-white border-2 border-black cursor-pointer hover:border-white text-black hover:bg-black hover:text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  Download for iOS
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 cursor-pointer border-white bg-black text-white hover:bg-white hover:border-black hover:text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Download for Android
                </Button>
              </div>

              {/* App Store Stats */}
              <div className="flex items-center space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="flex status-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-white/70 text-sm">4.9/5 rating</span>
                </div>
                <div className="text-white/70 text-sm">
                  <span className="font-semibold text-white">50K+</span> downloads
                </div>
              </div>
            </div>

            {/* Right Content - Phone Mockups */}
            <div className="relative">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Phone mockup background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-[3rem] backdrop-blur-lg border border-white/20 shadow-2xl"></div>

                {/* App interface mockup */}
                <div className="absolute inset-4 btn-primary-gradient rounded-[2.5rem] p-6 overflow-hidden">
                  <div className="text-center text-white mb-6">
                    <div className="text-2xl font-bold mb-2">Nirbhaya</div>
                    <div className="text-sm opacity-80">Your Safety Companion</div>
                  </div>

                  {/* Mock SOS button */}
                  <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <div className="text-primary font-black text-lg">SOS</div>
                    </div>
                  </div>

                  {/* Mock contact list */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/20 rounded-xl p-3 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/40 rounded mb-1"></div>
                          <div className="h-2 bg-white/30 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA + Footer Section */}
      <footer className="relative text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--tertiary) 0%, var(--primary) 50%, var(--secondary-dark) 100%)' }}>
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Compact CTA */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-semibold mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Our Safety Community
                <Badge className="ml-2 bg-white" style={{ color: 'var(--primary)' }}>Free</Badge>
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                Ready to Feel
                <span className="block bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Completely Safe?
                </span>
              </h2>

              <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">
                Join 50,000+ people who trust Nirbhaya. Your safety journey starts now.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-5">
                <Button
                  onClick={() => router.push('/auth?mode=signup')}
                  size="lg"
                  className="bg-white font-bold px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer text-primary flex items-center"
                  style={{ color: 'var(--primary)' }}
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Start Your Safety Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className=" text-white bg-white/10 cursor-pointer shadow-md hover:shadow-lg font-bold  px-8 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex items-center"
                  style={{ '--hover-color': 'var(--primary)' } as React.CSSProperties}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>End-to-end Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current status-warning" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Compact Footer */}
            <div className="border-t border-white/10 pt-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-3">
                {/* Brand Section */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg scale-110 animate-pulse" />
                      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                        <Image
                          src="/only_logo.png"
                          alt="Nirbhaya Logo"
                          width={32}
                          height={32}
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                    </div>
                    <span className="text-2xl font-black">Nirbhaya</span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Empowering personal safety through innovative technology.
                  </p>

                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                      <span className="text-xs font-bold">f</span>
                    </div>
                    <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                      <span className="text-xs font-bold">t</span>
                    </div>
                    <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                      <span className="text-xs font-bold">in</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-bold text-white mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                    <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-bold text-white mb-3">Contact</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Safety Resources</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 text-white/70 text-sm">
                  <span>&copy; 2025 Nirbhaya. All rights reserved.</span>
                  <span className="flex items-center">
                    Made with <Heart className="w-3 h-3 mx-1 text-primary fill-current" /> for your safety
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Dashboard Component for Authenticated Users (existing dashboard)
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    dateOfBirth: '',
  });

  const { user, updateUser } = useAuth();
  const { contacts, getEmergencyContacts } = useContacts();

  const emergencyContacts = getEmergencyContacts();

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      updateUser(editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
      });
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!user) {
    return null;
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-8 animate-fade-in-up">
        {/* Revolutionary Welcome Dashboard with Girl Hero */}
        <div className="relative overflow-hidden">
          {/* Epic background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-500/5 to-purple-500/5 rounded-3xl" />

          {/* Advanced floating elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
            <div className="absolute top-8 left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-16 right-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-12 left-1/3 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
            <div className="absolute top-32 left-2/3 w-16 h-16 bg-pink-500/10 rounded-full blur-lg animate-float" style={{ animationDelay: '6s' }} />
          </div>

          <div className="relative backdrop-blur-2xl bg-white/90 border-2 border-white/40 rounded-3xl p-6 md:p-8 lg:p-12 shadow-3xl">
            {/* Magical particles */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full animate-ping opacity-60" />
            <div className="absolute top-12 left-12 w-2 h-2 bg-accent rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-8 right-16 w-1.5 h-1.5 bg-secondary rounded-full animate-ping opacity-70" style={{ animationDelay: '2s' }} />
            <div className="absolute top-20 right-20 w-1 h-1 bg-pink-500 rounded-full animate-ping opacity-80" style={{ animationDelay: '3s' }} />

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side - User Welcome */}
                <div className="text-left">
                  {/* Brand Logo Section */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-110 animate-pulse" />
                      <Image
                        src="/only_logo.png"
                        alt="Nirbhaya Logo"
                        width={60}
                        height={60}
                        className="relative z-10 drop-shadow-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-primary">Nirbhaya</h3>
                      <p className="text-sm text-gray-600 font-semibold">Safety Dashboard</p>
                    </div>
                  </div>

                  {/* User Profile Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-full blur-2xl animate-pulse" />
                        <Avatar className="relative w-16 h-16 ring-4 ring-white shadow-2xl">
                          <AvatarImage
                            src={user?.profileImage || '/demo-user.png'}
                            alt={user.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-secondary text-white font-black text-xl">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {/* Status indicators */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white flex items-center justify-center animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="text-lg text-gray-500 font-semibold">Welcome back,</div>
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-primary to-accent bg-clip-text text-transparent leading-tight">
                          {user.name.split(' ')[0]}! ✨
                        </h1>
                      </div>
                    </div>

                    {/* Welcome message */}
                    <p className="text-lg text-gray-600 font-medium max-w-lg leading-relaxed">
                      Your safety dashboard is ready and all systems are active. Stay protected & connected with confidence.
                    </p>

                    {/* Quick status */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-full px-4 py-2 border border-green-200/50">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-green-700">System Active</span>
                      </div>

                      <div className="flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/30">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-primary">Protected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Girl Hero Image */}
                <div className="relative flex items-center justify-center">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-full blur-3xl scale-150 animate-pulse opacity-60" />

                  {/* Girl image container */}
                  <div className="relative">
                    <div className="relative z-10">
                      <Image
                        src="/girl.png"
                        alt="Empowered Safety Hero"
                        width={350}
                        height={350}
                        className="object-contain drop-shadow-2xl hover:scale-105 transition-all duration-700"
                        priority
                      />
                    </div>

                    {/* Floating safety badges */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                      <Shield className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-4 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-1/4 -right-8 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md animate-ping opacity-80">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute top-3/4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDelay: '1s' }}>
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Inspiring quote bubble */}
                  <div className="absolute -top-4 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl max-w-xs border-2 border-primary/20 transform -rotate-2">
                    <p className="text-sm font-bold text-gray-800">
                      &ldquo;Strong, Safe, Empowered! 💪✨&rdquo;
                    </p>
                    <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white/95"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards with Professional Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trusted Contacts Card */}
          <div className="group relative">
            {/* Gradient background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-primary/30">
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-lg scale-110" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">{contacts.length}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-green-600 mb-1 font-display">
                    {contacts.length}
                  </div>
                  <div className="text-sm font-medium text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    Active
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  Trusted Contacts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Emergency contacts ready to help you when you need them most
                </p>

                {/* Progress bar */}
                <div className="relative">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse" style={{ width: `${Math.min(contacts.length * 20, 100)}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-gray-500 font-medium">
                    {contacts.length}/5 contacts configured
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Card */}
          <div className="group relative">
            {/* Gradient background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-red-400/30">
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-lg scale-110" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-bounce">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-red-600 mb-1 font-display">
                    {emergencyContacts.length}
                  </div>
                  <div className="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full">
                    Ready
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                  Emergency Contacts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant alert system ready for critical situations
                </p>

                {/* Status indicators */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-600">Police</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-600">Medical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-gray-600">Fire</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Score Card */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            {/* Gradient background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-primary/30">
              {/* Header with icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-110" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin-slow">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-primary mb-1 font-display">
                    100%
                  </div>
                  <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Excellent
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  Safety Score
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Fully protected with comprehensive safety features
                </p>

                {/* Circular progress */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e891c7" />
                          <stop offset="50%" stopColor="#db9fc7" />
                          <stop offset="100%" stopColor="#d4c7d8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-primary">100%</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-primary">Maximum protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Personal Information Card */}
        <div className="group relative">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />

          <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Floating decorative particles */}
            <div className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full animate-ping opacity-40" />
            <div className="absolute top-12 left-12 w-2 h-2 bg-accent rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-secondary rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }} />

            <div className="relative z-10">
              {/* Enhanced User Profile Header with Avatar */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 pb-8 border-b border-gray-100 mb-8">
                <div className="flex items-center space-x-6">
                  {/* User Avatar with Demo Fallback */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-full blur-lg animate-pulse" />
                    <Avatar className="relative w-20 h-20 lg:w-24 lg:h-24 ring-4 ring-white shadow-2xl">
                      <AvatarImage
                        src={user?.profileImage || '/demo-user.png'}
                        alt={user.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-secondary text-white font-black text-3xl lg:text-4xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Status indicators */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>

                    {/* VIP Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <Crown className="w-4 h-4 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-110" />
                        <div className="relative w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-gray-900">
                          Personal Information
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                          <span className="text-gray-500 font-medium">Manage your profile details</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </div>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="group/btn relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span>Save Changes</span>
                      </div>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="group/btn bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-2">
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Enhanced Form Fields Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Full Name Field */}
                <div className="group/field space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Full Name
                    </label>
                  </div>

                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 text-lg font-medium text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="group/display relative backdrop-blur-sm bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                      <p className="text-lg font-bold text-gray-900">{user.name}</p>
                      <div className="absolute right-4 top-4 opacity-0 group-hover/display:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="group/field space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Phone Number
                    </label>
                  </div>

                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 text-lg font-medium text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="group/display relative backdrop-blur-sm bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                      <p className="text-lg font-bold text-gray-900">{user.phone}</p>
                      <div className="absolute right-4 top-4 opacity-0 group-hover/display:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Blood Group Field */}
                <div className="group/field space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                      <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Blood Group
                    </label>
                  </div>

                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={editData.bloodGroup}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 text-lg font-medium text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                        placeholder="e.g., A+"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="group/display relative backdrop-blur-sm bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                      <p className="text-lg font-bold text-gray-900">{user.bloodGroup}</p>
                      <div className="absolute right-4 top-4 opacity-0 group-hover/display:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div className="group/field space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Date of Birth
                    </label>
                  </div>

                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 text-lg font-medium text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="group/display relative backdrop-blur-sm bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                      <p className="text-lg font-bold text-gray-900">{user.dateOfBirth}</p>
                      <div className="absolute right-4 top-4 opacity-0 group-hover/display:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Spectacular Quick Actions */}
        <div className="group relative">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-red-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />

          <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Header with animated icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-lg scale-110 animate-pulse" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin-slow">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                Quick Actions
              </h3>
              <p className="text-gray-600 font-medium">
                Access your most important safety features instantly
              </p>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveTab('contacts')}
                className="group/btn relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg scale-110" />
                    <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-black mb-2">Manage Contacts</h4>
                    <p className="text-sm opacity-90 font-medium">Add & organize trusted people</p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className="group/btn relative overflow-hidden bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-red-500 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg scale-110" />
                    <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-black mb-2">Safety Articles</h4>
                    <p className="text-sm opacity-90 font-medium">Learn safety tips & advice</p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Emergency Information */}
        <div className="group relative">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/5 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" />

          <div className="relative backdrop-blur-xl bg-white/90 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Emergency pulse indicator */}
            <div className="absolute top-6 right-6 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-8 right-8 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-80" />

            {/* Header with animated icons */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl scale-150 animate-pulse" />

                <div className="relative flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                    <Heart className="w-7 h-7 text-white" />
                  </div>

                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 animate-pulse" />
              </div>

              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                Emergency Information
              </h3>
              <p className="text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Critical information for emergency responders and trusted contacts
              </p>
            </div>

            {/* Enhanced Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Details Card */}
              <div className="group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/20 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-xl" />

                <div className="relative backdrop-blur-sm bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-100/50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Personal Details</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-bold text-gray-700">Full Name</span>
                      </div>
                      <span className="font-black text-gray-900">{user.name}</span>
                    </div>

                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-700">Phone Number</span>
                      </div>
                      <span className="font-black text-gray-900">{user.phone}</span>
                    </div>

                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-bold text-gray-700">Date of Birth</span>
                      </div>
                      <span className="font-black text-gray-900">{user.dateOfBirth}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Data Card */}
              <div className="group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-pink-500/20 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-all duration-500 blur-xl" />

                <div className="relative backdrop-blur-sm bg-gradient-to-br from-red-50/80 to-orange-50/80 border border-red-100/50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Emergency Data</h4>
                    <div className="flex-1" />
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-bold text-gray-700">Blood Group</span>
                      </div>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black px-4 py-2 rounded-full shadow-md">
                        <span>{user.bloodGroup}</span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>

                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-bold text-gray-700">Emergency Contacts</span>
                      </div>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-black px-4 py-2 rounded-full shadow-md">
                        <span>{emergencyContacts.length} Active</span>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="group/item flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                          <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-700">Safety Status</span>
                      </div>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black px-4 py-2 rounded-full shadow-md animate-pulse">
                        <span>Protected</span>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Main HomePage Component
export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-glass-medium backdrop-blur-md rounded-3xl p-8 shadow-2xl border-light">
          <div className="relative mb-6">
            <div className="spinner-modern mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 style={{ color: 'var(--primary)' }} animate-pulse" />
            </div>
          </div>
          <p className="text-primary font-semibold text-lg">Loading...</p>
          <p className="text-muted text-sm mt-2">Preparing your experience</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Show dashboard for authenticated users
  return <DashboardPage />;
}
