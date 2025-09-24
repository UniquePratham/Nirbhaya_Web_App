"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Heart, Users, Phone, Mail, Lock, User, Sparkles, Crown, Zap, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const NirbhayaAuthContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  
  // Set initial state based on URL parameter, default to signup if no parameter
  const [isSignUp, setIsSignUp] = useState(mode !== 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update state when URL parameter changes
  useEffect(() => {
    if (mode === 'signin') {
      setIsSignUp(false);
    } else {
      setIsSignUp(true); // Default to signup for any other case
    }
  }, [mode]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    if (isSignUp) {
      alert('Account created successfully! Welcome to Nirbhaya 💖');
    } else {
      alert('Welcome back! You are now signed in 🌟');
    }
  };

  const switchMode = () => {
    const newMode = !isSignUp;
    setIsSignUp(newMode);
    
    // Update URL parameter
    const newUrl = `/auth?mode=${newMode ? 'signup' : 'signin'}`;
    router.replace(newUrl);
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const FloatingIcon = ({ children, delay = 0, className = '', size = 'medium' }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    size?: 'small' | 'medium' | 'large';
  }) => {
    const sizeClasses = {
      small: 'w-8 h-8',
      medium: 'w-12 h-12',
      large: 'w-16 h-16'
    };
    
    return (
      <div 
        className={`absolute animate-float ${className} ${sizeClasses[size]} opacity-60 hover:opacity-80 transition-opacity duration-300`}
        style={{ 
          animationDelay: `${delay}s`,
          animationDuration: '4s'
        }}
      >
        {children}
      </div>
    );
  };

  return (
  <div className="h-screen w-full flex overflow-hidden relative" style={{ background: 'var(--background)', backgroundImage: 'radial-gradient(ellipse at top left, rgba(199, 186, 204, 0.15) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(197, 108, 161, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(192, 110, 153, 0.1) 0%, transparent 50%)' }}>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse floating" style={{ background: 'linear-gradient(135deg, rgba(197, 108, 161, 0.3) 0%, rgba(192, 110, 153, 0.25) 100%)' }} />
        <div className="absolute top-40 right-32 w-80 h-80 rounded-full blur-3xl animate-pulse floating-delayed" style={{ background: 'linear-gradient(135deg, rgba(199, 186, 204, 0.25) 0%, rgba(156, 96, 129, 0.2) 100%)' }} />
        <div className="absolute bottom-32 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse floating" style={{ background: 'linear-gradient(135deg, rgba(192, 110, 153, 0.2) 0%, rgba(108, 99, 108, 0.15) 100%)', animationDelay: '2s' }} />
        
        {/* Primary floating icons */}
        <FloatingIcon delay={0} className="top-16 left-12 text-pink-400" size="large">
          <Shield size={64} className="drop-shadow-lg" />
        </FloatingIcon>
        <FloatingIcon delay={1} className="top-24 right-16 text-rose-400" size="medium">
          <Heart size={48} className="drop-shadow-md" />
        </FloatingIcon>
        <FloatingIcon delay={2} className="bottom-32 left-16 text-purple-400" size="large">
          <Users size={64} className="drop-shadow-lg" />
        </FloatingIcon>
        <FloatingIcon delay={0.5} className="bottom-16 right-12 text-pink-500" size="medium">
          <Sparkles size={48} className="drop-shadow-md" />
        </FloatingIcon>
        
        {/* Secondary floating icons */}
        <FloatingIcon delay={1.5} className="top-1/3 left-8 text-rose-300" size="small">
          <Star size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        <FloatingIcon delay={2.5} className="top-1/2 right-8 text-purple-300" size="small">
          <Crown size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        <FloatingIcon delay={3} className="bottom-1/3 left-1/4 text-pink-300" size="medium">
          <Zap size={48} className="drop-shadow-md" />
        </FloatingIcon>
        <FloatingIcon delay={1.8} className="top-1/4 right-1/3 text-rose-200" size="small">
          <Phone size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        <FloatingIcon delay={2.2} className="bottom-1/4 right-1/4 text-purple-200" size="small">
          <Mail size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        
        {/* Tertiary decorative elements */}
        <FloatingIcon delay={0.8} className="top-1/2 left-1/3 text-pink-200" size="small">
          <Lock size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        <FloatingIcon delay={3.2} className="bottom-1/2 right-1/2 text-rose-300" size="small">
          <User size={32} className="drop-shadow-sm" />
        </FloatingIcon>
        
        {/* Enhanced floating particles */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 rounded-full animate-bounce opacity-70 shadow-lg" style={{background: 'linear-gradient(135deg, #c56ca1, #c06e99)', animationDelay: '0.5s'}}></div>
        <div className="absolute top-2/3 right-1/5 w-5 h-5 rounded-full animate-bounce opacity-60 shadow-lg" style={{background: 'linear-gradient(135deg, #c06e99, #9c6081)', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 rounded-full animate-bounce opacity-80 shadow-lg" style={{background: 'linear-gradient(135deg, #9c6081, #c56ca1)', animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/6 w-4 h-4 rounded-full animate-bounce opacity-50 shadow-lg" style={{background: 'linear-gradient(135deg, #c7bacc, #c06e99)', animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full animate-bounce opacity-60 shadow-lg" style={{background: 'linear-gradient(135deg, #c06e99, #6c636c)', animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/5 right-2/5 w-4 h-4 rounded-full animate-bounce opacity-70 shadow-lg" style={{background: 'linear-gradient(135deg, #b16a91, #c56ca1)', animationDelay: '3s'}}></div>
      </div>

      {/* Left Side - Branding & Features (Hidden on mobile, shown on tablet+) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center items-center p-10 relative z-10">
        <div className="max-w-lg text-center animate-fade-in-up">
          {/* Enhanced Logo Section */}
          <div className="mb-2">
            <div 
              className="flex justify-center cursor-pointer hover:scale-105 transition-all duration-300" 
              onClick={() => router.push('/')}
            >
                <Image src="/only_logo.png" alt="Nirbhaya Logo" width={200} height={200} />
            </div>
            <p className="text-lg xl:text-xl text-gray-600 font-bold flex items-center justify-center gap-3 animate-fade-in-delay">
              <Heart className="w-6 h-6 text-red-500 animate-heartbeat" />
              Your Safety, Our Priority
              <Sparkles className="w-6 h-6 text-yellow-500 animate-twinkle" />
            </p>
          </div>

          {/* Enhanced Features Preview */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="text-center mb-6">
              <h2 className="text-2xl xl:text-3xl font-black text-gray-800 mb-3">🚀 Why Choose Nirbhaya?</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-4 p-5 bg-glass-medium rounded-2xl shadow-xl hover:scale-105 transition-all duration-500" style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                  <Shield className="text-white" size={28} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-lg" style={{ color: 'var(--text)' }}>🆘 Emergency SOS</h3>
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Instant help at your fingertips</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-glass-medium rounded-2xl shadow-xl hover:scale-105 transition-all duration-500" style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))' }}>
                  <Users className="text-white" size={28} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-lg" style={{ color: 'var(--text)' }}>👥 Trusted Network</h3>
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Connect with verified contacts</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-glass-medium rounded-2xl shadow-xl hover:scale-105 transition-all duration-500" style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--secondary-dark), var(--tertiary))' }}>
                  <Heart className="text-white" size={28} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-lg" style={{ color: 'var(--text)' }}>💖 Safety Resources</h3>
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Access help and support 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 relative z-10">
        {/* Mobile Logo (shown only on small screens) */}
        <div 
          className="lg:hidden absolute top-8 left-1/2 transform -translate-x-1/2 text-center animate-fade-in-up cursor-pointer hover:scale-110 transition-all duration-300" 
          onClick={() => router.push('/')}
        >
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 via-rose-600 to-purple-600 rounded-3xl mb-3 shadow-2xl transform hover:scale-110 transition-all duration-500 group animate-glow">
            <Shield className="text-white" size={28} />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Crown className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-rose-700 to-purple-700 bg-clip-text text-transparent">
            Nirbhaya
          </h1>
        </div>

  {/* Enhanced Auth Card with Premium Glass Morphism */}
  <div className="h-[92vh] max-h-[92vh] w-full max-w-md mx-auto relative rounded-3xl shadow-2xl px-6 pt-8 pb-6 transform transition-all duration-1000 animate-slide-up flex flex-col overflow-visible" style={{ background: 'var(--surface-elevated)', backdropFilter: 'blur(16px)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}>
          {/* Animated background gradient overlay */}
          <div className="absolute inset-0 rounded-3xl animate-gradient-shift" style={{ background: 'linear-gradient(135deg, rgba(197, 108, 161, 0.1) 0%, rgba(199, 186, 204, 0.05) 50%, rgba(192, 110, 153, 0.08) 100%)', backgroundSize: '200% 200%' }}></div>
          
          {/* Floating mini particles inside card */}
          <div className="absolute top-4 right-6 w-2 h-2 rounded-full animate-float-slow opacity-60" style={{ background: 'var(--primary)' }}></div>
          <div className="absolute top-12 left-8 w-1.5 h-1.5 rounded-full animate-float-slow opacity-70" style={{ background: 'var(--secondary-dark)', animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 right-4 w-2 h-2 rounded-full animate-float-slow opacity-50" style={{ background: 'var(--accent)', animationDelay: '2s' }}></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Enhanced Mode Switch Header - Fixed outside scroll */}
            <div className="text-center mb-4 animate-fade-in-scale flex-none">
              <div className="flex items-center justify-center mb-4">
                <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-full p-1 flex shadow-inner w-full max-w-sm">
                  <button
                    onClick={() => isSignUp && switchMode()}
                    className={`flex-1 py-2.5 cursor-pointer rounded-full font-bold transition-colors duration-300 flex items-center justify-center gap-2 text-sm ${
                      !isSignUp 
                        ? 'text-white shadow-2xl animate-glow-pulse z-20' 
                        : 'hover:bg-white/50'
                    }`}
                    style={!isSignUp ? {
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      color: 'white'
                    } : {
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <ArrowLeft size={16} className={!isSignUp ? 'animate-bounce-x' : ''} />
                    <span className="tracking-wide">Sign In</span>
                    {!isSignUp && <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse ml-1"></div>}
                  </button>
                  <button
                    onClick={() => !isSignUp && switchMode()}
                    className={`flex-1 py-2.5 cursor-pointer rounded-full font-bold transition-colors duration-300 flex items-center justify-center gap-2 text-sm ${
                      isSignUp 
                        ? 'text-white shadow-2xl animate-glow-pulse' 
                        : 'hover:bg-white/50 hover:z-10'
                    }`}
                    style={isSignUp ? {
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      color: 'white'
                    } : {
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span className="tracking-wide">Sign Up</span>
                    <ArrowRight size={16} className={isSignUp ? 'animate-bounce-x' : ''} />
                    {isSignUp && <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse ml-1"></div>}
                  </button>
                </div>
              </div>
              
              <div className={`transition-all duration-700 transform ${isSignUp ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
                <h2 className="text-2xl lg:text-3xl font-black mb-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                  {isSignUp ? '🚀 Join Our Community' : '👋 Welcome Back'}
                </h2>
                <p className="text-gray-600 font-medium text-sm lg:text-base">
                  {isSignUp ? 'Create your account and stay protected ✨' : 'Sign in to your safety dashboard 🛡️'}
                </p>
              </div>
            </div>

            {/* Scroll container with explicit height - THIS should scroll */}
            <div className="auth-scroll flex-1 min-h-0 overscroll-contain px-3 pt-1 pb-4" style={{ height: 'calc(100% - 200px)', minHeight: '400px' }}>
            {/* Enhanced Form Content with staggered animations */}
            <div className={`space-y-4 transition-all duration-700 ${isSignUp ? 'animate-expand' : 'animate-contract'}`}>
              {/* Name Field (Sign Up Only) with enhanced animation */}
              {isSignUp && (
                <div className="group animate-slide-in-up opacity-0" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                  <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 transition-all duration-300 group-focus-within:text-pink-600">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg transform group-focus-within:scale-110 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span>Full Name</span>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 outline-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:border-pink-300 text-base font-medium placeholder-gray-400 shadow-inner group-hover:shadow-lg"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 group-focus-within:scale-110 transition-all duration-300">
                      <User size={20} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Email Field with enhanced styling */}
              <div className="group animate-slide-in-up opacity-0" style={{animationDelay: isSignUp ? '0.2s' : '0.1s', animationFillMode: 'forwards'}}>
                <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 transition-all duration-300 group-focus-within:text-pink-600">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg transform group-focus-within:scale-110 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))' }}>
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  <span>Email Address</span>
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 outline-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:border-pink-300 text-base font-medium placeholder-gray-400 shadow-inner group-hover:shadow-lg"
                    placeholder="Enter your email"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 group-focus-within:scale-110 transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Phone Field (Sign Up Only) */}
              {isSignUp && (
                <div className="group animate-slide-in-up opacity-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                  <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 transition-all duration-300 group-focus-within:text-pink-600">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg transform group-focus-within:scale-110 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--secondary-dark), var(--tertiary))' }}>
                      <Phone className="w-3 h-3 text-white" />
                    </div>
                    <span>Phone Number</span>
                  </div>
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 outline-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:border-pink-300 text-base font-medium placeholder-gray-400 shadow-inner group-hover:shadow-lg"
                      placeholder="Enter your phone number"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 group-focus-within:scale-110 transition-all duration-300">
                      <Phone size={20} />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Password Field with enhanced security visual */}
              <div className="group animate-slide-in-up opacity-0" style={{animationDelay: isSignUp ? '0.4s' : '0.2s', animationFillMode: 'forwards'}}>
                <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 transition-all duration-300 group-focus-within:text-pink-600">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg transform group-focus-within:scale-110 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <span>Password</span>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 outline-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:border-pink-300 text-base font-medium placeholder-gray-400 shadow-inner group-hover:shadow-lg"
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 group-focus-within:scale-110 transition-all duration-300">
                    <Lock size={20} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-pink-100"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <div className="group animate-slide-in-up opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                  <div className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2 transition-all duration-300 group-focus-within:text-pink-600">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-lg transform group-focus-within:scale-110 transition-all duration-300" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}>
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span>Confirm Password</span>
                  </div>
                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-14 py-3 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 outline-none transition-colors duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:border-pink-300 text-base font-medium placeholder-gray-400 shadow-inner group-hover:shadow-lg"
                      placeholder="Confirm your password"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:scale-110 transition-all duration-300" style={{ color: 'var(--primary)' }}>
                      <Lock size={20} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-pink-100"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Enhanced Submit Button with Premium Styling */}
              <div className="animate-slide-in-up opacity-0" style={{animationDelay: isSignUp ? '0.6s' : '0.3s', animationFillMode: 'forwards'}}>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full cursor-pointer text-white font-bold py-3 px-5 rounded-2xl focus:ring-4 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl relative overflow-hidden group animate-glow-pulse btn-modern-primary"
                >
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Floating particles inside button */}
                  <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-60"></div>
                  <div className="absolute bottom-2 right-6 w-1 h-1 bg-pink-200 rounded-full animate-ping opacity-70" style={{animationDelay: '0.5s'}}></div>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin shadow-lg"></div>
                      <span className="text-lg font-black tracking-wide">{isSignUp ? '🚀 Creating Your Account...' : '🔐 Signing You In...'}</span>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <Shield className="w-6 h-6 animate-bounce" />
                      <span className="text-lg font-black tracking-wide">{isSignUp ? '🎯 Join Nirbhaya Community' : '🛡️ Access Safety Hub'}</span>
                      <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                  )}
                </button>
              </div>

              {/* Enhanced Switch Mode Link */}
              <div className="text-center mt-3 animate-slide-in-up opacity-0" style={{animationDelay: isSignUp ? '0.7s' : '0.4s', animationFillMode: 'forwards'}}>
                <p className="text-gray-600 font-medium">
                  {isSignUp ? 'Already part of our community? 🤝' : "Ready to join our family? 👨‍👩‍👧‍👦"}{' '}
                  <button
                    onClick={switchMode}
                    className="font-bold cursor-pointer transition-colors duration-300 inline-flex items-center gap-2 px-4 py-2 rounded-full hover:shadow-lg"
                    style={{
                      color: 'var(--primary)',
                      background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)'
                    }}
                  >
                    <span>{isSignUp ? '🚪 Sign In' : '✨ Sign Up'}</span>
                    <ArrowRight className="w-4 h-4 animate-bounce-x" />
                  </button>
                </p>
              </div>
            </div>
            {/* Demo Login Info (Sign In Only) - Outside scroll area */}
            {!isSignUp && (
              <div className="mt-3 rounded-2xl p-3 shadow-lg animate-fade-in-up flex-none bg-glass-light" style={{ borderColor: 'var(--border)' }}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    <span className="font-bold text-sm" style={{ color: 'var(--primary)' }}>⚡ Demo Login</span>
                    <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    🎮 Enter any email and password to explore
                  </p>
                </div>
              </div>
            )}
            </div>

          </div>
        </div>
      </div>

      {/* CSS Animations and Custom Styles */}
      <style jsx>{`
        /* Auth card scrollbar styling */
        .auth-scroll::-webkit-scrollbar {
          width: 8px !important;
        }
        .auth-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(236,72,153,0.6), rgba(168,85,247,0.6)) !important;
          border-radius: 9999px !important;
        }
        .auth-scroll::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .auth-scroll {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          scrollbar-gutter: stable both-edges !important;
          scrollbar-width: thin !important;
          scrollbar-color: rgba(236,72,153,0.6) transparent !important;
          max-height: 100% !important;
          height: 100% !important;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(1deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 10px 40px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 15px 60px rgba(236, 72, 153, 0.6); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: rotate(0deg); }
          25% { opacity: 0.5; transform: rotate(90deg); }
          50% { opacity: 1; transform: rotate(180deg); }
          75% { opacity: 0.5; transform: rotate(270deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes expand {
          from { max-height: 300px; opacity: 0.7; }
          to { max-height: 800px; opacity: 1; }
        }

        @keyframes contract {
          from { max-height: 800px; opacity: 0.7; }
          to { max-height: 300px; opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.5s both;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.7s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #db2777, #e11d48, #be185d, #db2777);
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-expand {
          animation: expand 0.7s ease-out;
        }

        .animate-contract {
          animation: contract 0.7s ease-out;
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .floating-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

// Loading component for Suspense fallback
const AuthPageLoading = () => (
  <div className="h-screen w-full flex items-center justify-center" style={{ background: 'var(--background)' }}>
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-primary font-semibold">Loading...</p>
    </div>
  </div>
);

// Main component wrapped with Suspense
const NirbhayaAuth = () => (
  <Suspense fallback={<AuthPageLoading />}>
    <NirbhayaAuthContent />
  </Suspense>
);

export default NirbhayaAuth;