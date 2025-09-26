'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from './BottomNavigation';
import SOSButton from './SOSButton';
import { TabType } from '@/types';
import { Shield, LogOut, Menu, Sparkles, Crown, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/auth?mode=signin');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', icon: '🌅', color: 'from-yellow-400 to-orange-500' };
    if (hour < 17) return { text: 'Good Afternoon', icon: '☀️', color: 'from-blue-400 to-cyan-500' };
    return { text: 'Good Evening', icon: '🌙', color: 'from-purple-400 to-pink-500' };
  };

  const greeting = getGreeting();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--surface-light) 0%, var(--surface) 50%, var(--surface-elevated) 100%)' }} />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full blur-xl animate-pulse" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', opacity: 0.2 }} />
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full blur-xl animate-pulse" style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))', opacity: 0.2, animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-40 h-40 rounded-full blur-xl animate-pulse" style={{ background: 'linear-gradient(135deg, var(--secondary), var(--tertiary))', opacity: 0.15, animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/4 w-28 h-28 rounded-full blur-xl animate-pulse" style={{ background: 'linear-gradient(135deg, var(--tertiary), var(--primary))', opacity: 0.2, animationDelay: '3s' }} />
        </div>
      </div>

      {/* 🚀 LEGENDARY PROFESSIONAL NAVBAR - THE BEST OF ALL TIME 🚀 */}
      <header className="z-50 sticky top-0">
        {/* Multi-layer Glass Morphism Background */}
        <div className="relative">
          {/* Outer glow layer */}
          <div className="absolute inset-0 blur-xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent), var(--secondary-dark))', opacity: 0.1 }} />
          
          {/* Main navbar container */}
          <div className="relative backdrop-blur-2xl bg-white/85 border-b-2 border-white/30 shadow-2xl">
            {/* Animated gradient border */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 animate-pulse" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--secondary-dark) 100%)' }} />
            
            <div className="container mx-auto px-4 lg:px-6">
              <div className="flex items-center justify-between h-20 lg:h-24">
                
                {/* 🎨 LEGENDARY LOGO SECTION */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <div className="group relative">
                    {/* Multiple rotating rings */}
                    <div className="absolute -inset-4 rounded-full animate-spin-slow opacity-30">
                      <div className="w-full h-full border-4 border-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 rounded-full" />
                    </div>
                    <div className="absolute -inset-3 rounded-full animate-spin-slow opacity-40" style={{ animationDirection: 'reverse', animationDelay: '1s' }}>
                      <div className="w-full h-full border-2 border-gradient-to-r from-secondary/40 via-primary/40 to-accent/40 rounded-full" />
                    </div>
                    
                    {/* Main logo container */}
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12" mx-2 my-1>
                      <div className="absolute inset-0 rounded-3xl shadow-2xl blur opacity-50 group-hover:opacity-70 transition-all duration-500" />
                      <div className="relative w-full h-full rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 overflow-hidden">
                        <Image 
                          src="/only_logo.png" 
                          alt="Nirbhaya Logo" 
                          width={40} 
                          height={40} 
                          className="drop-shadow-2xl animate-pulse object-contain"
                        />
                        
                        {/* Status indicators */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-md">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand text with animations */}
                  <div className="hidden sm:block group">
                    <div className="flex items-center space-x-2">
                      <h1
                        onClick={() => router.push('/')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') router.push('/'); }}
                        className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-primary cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      >
                        Nirbhaya
                      </h1>
                      <div className="flex space-x-1">
                        <Crown className="w-5 h-5 text-yellow-500 animate-bounce" />
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <Star className="w-4 h-4 text-accent animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm lg:text-base text-gray-600 font-bold">Women&apos;s Safety Platform</p>
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* 💎 PROFESSIONAL DESKTOP NAVIGATION */}
                <div className="hidden lg:flex items-center space-x-8">
                  {/* Navigation Menu Items */}
                  <nav className="flex items-center space-x-6">
                    {[
                      { id: 'home', label: 'Dashboard', icon: Shield, gradient: 'from-primary to-accent' },
                      { id: 'contacts', label: 'Contacts', icon: Crown, gradient: 'from-accent to-secondary-dark' },
                      { id: 'articles', label: 'Articles', icon: Star, gradient: 'from-secondary-dark to-tertiary' },
                    ].map((item) => (
                        <button
                        key={item.id}
                        onClick={() => onTabChange(item.id as TabType)}
                        className={`group cursor-pointer relative px-4 py-2 rounded-2xl transition-all duration-500 overflow-hidden ${
                          activeTab === item.id 
                          ? 'text-white shadow-lg transform scale-105' 
                          : 'hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5'
                        }`}
                        style={activeTab === item.id ? { 
                          background: 'linear-gradient(135deg, var(--primary), var(--accent))'
                        } : {}}
                        >
                        <div className="flex items-center space-x-2">
                          <item.icon className={`w-4 h-4 transition-all duration-300 ${
                          activeTab === item.id 
                            ? 'text-white' 
                            : 'text-gray-600 group-hover:text-primary'
                          }`} />
                          <span className={`font-bold text-sm relative transition-all duration-300 ${
                          activeTab === item.id 
                            ? 'text-white' 
                            : 'text-gray-700 group-hover:text-primary'
                          }`}>
                          {item.label}
                          </span>
                        </div>
                        
                        {/* Active indicator */}
                        {activeTab === item.id && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                        
                        {/* Hover gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        {/* Animated underline for inactive items on hover */}
                        {activeTab !== item.id && (
                          <div className="absolute left-4 right-4 bottom-2 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        )}
                        </button>
                    ))}
                  </nav>
                </div>

                {/* 🌟 PREMIUM USER SECTION (DESKTOP) */}
                <div className="hidden md:flex items-center space-x-6">
                  {/* Dynamic Greeting with Weather-like Icons */}
                  <div className="text-right group">
                    <div className="flex items-center justify-end space-x-2 mb-1">
                      <span className="text-2xl animate-bounce">{greeting.icon}</span>
                      <span className={`text-sm lg:text-base font-bold bg-gradient-to-r ${greeting.color} bg-clip-text text-transparent`}>
                        {greeting.text}
                      </span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <p className="text-xs lg:text-sm text-gray-500 font-medium">
                        {currentTime.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {currentTime.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium User Avatar Card */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    
                    <div className="relative flex items-center space-x-4 bg-white/70 backdrop-blur-xl rounded-3xl px-6 py-3 shadow-xl border border-white/40 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                      <div className="text-right">
                        <p className="text-sm lg:text-base font-black text-gray-900">{user.name}</p>
                        <div className="flex items-center justify-end space-x-2">
                          <Badge className="text-xs px-3 py-1 text-white font-bold border-0" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                            {user.bloodGroup}
                          </Badge>
                          <Badge className="text-xs px-3 py-1 text-white font-bold border-0" style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))' }}>
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            VIP
                          </Badge>
                        </div>
                      </div>
                      
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full blur animate-pulse" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }} />
                          <Avatar className="relative w-12 h-12 lg:w-14 lg:h-14 ring-4 ring-white shadow-2xl">
                            <AvatarImage 
                              src={user?.profileImage || '/demo-user.png'} 
                              alt={user.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-white font-black text-lg lg:text-xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent), var(--secondary-dark))' }}>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>                        {/* Status dot */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button with Style */}
                  <div className="group relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowLogoutConfirm(true)}
                      className="relative w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-lg hover:bg-red-50 hover:border-red-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group-hover:scale-105"
                    >
                      <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                      Sign Out
                      <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* 📱 REVOLUTIONARY MOBILE MENU */}
                <div className="md:hidden">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <div className="group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="relative w-12 h-12 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                          <Menu className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors duration-300" />
                        </Button>
                      </div>
                    </SheetTrigger>
                    
                    <SheetContent side="right" className="w-80 sm:w-96 bg-white/95 backdrop-blur-2xl border-l border-white/30 shadow-2xl">
                      <SheetHeader className="pb-6">
                        <SheetTitle className="flex items-center space-x-3 text-xl lg:text-2xl">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Crown className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent font-black">
                            Nirbhaya
                          </span>
                          <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                        </SheetTitle>
                        
                        <SheetDescription className="text-gray-600 font-medium text-base">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{greeting.icon}</span>
                            <span>{greeting.text}, {user.name.split(' ')[0]}!</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                      
                      <div className="mt-8 space-y-6">
                        {/* Enhanced User Profile Card */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-3xl blur opacity-50" />
                          <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 backdrop-blur-sm rounded-3xl p-6 border border-white/50">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <Avatar className="w-16 h-16 ring-4 ring-white shadow-2xl">
                                  <AvatarImage 
                                    src={user?.profileImage || '/demo-user.png'} 
                                    alt={user.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="bg-gradient-to-br from-primary via-accent to-secondary text-white font-black text-2xl">
                                    {user.name.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                              </div>
                              <div className="flex-1">
                                <p className="font-black text-gray-900 text-lg">{user.name}</p>
                                <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge className="text-xs px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold">
                                    {user.bloodGroup}
                                  </Badge>
                                  <Badge className="text-xs px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                                    <Crown className="w-3 h-3 mr-1" />
                                    VIP
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Navigation Links */}
                        <div className="space-y-3">
                          {[
                            { id: 'home', label: 'Dashboard', icon: Shield, emoji: '🏠', color: 'from-blue-500 to-cyan-600' },
                            { id: 'contacts', label: 'Trusted Contacts', icon: Crown, emoji: '👥', color: 'from-green-500 to-emerald-600' },
                            { id: 'articles', label: 'Safety Articles', icon: Star, emoji: '📚', color: 'from-purple-500 to-pink-600' },
                            { id: 'profile', label: 'My Profile', icon: Sparkles, emoji: '👤', color: 'from-orange-500 to-red-500' },
                          ].map((item) => (
                            <Button
                              key={item.id}
                              variant="ghost"
                              className={`group w-full h-14 rounded-2xl transition-all duration-500 ${
                                activeTab === item.id 
                                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105` 
                                  : 'hover:bg-white/70 hover:shadow-md hover:scale-102'
                              }`}
                              onClick={() => {
                                onTabChange(item.id as TabType);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              <div className="flex items-center justify-between w-full px-2">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                    activeTab === item.id
                                      ? 'bg-white/20 backdrop-blur-sm'
                                      : `bg-gradient-to-r ${item.color}/10`
                                  }`}>
                                    <span className="text-xl">{item.emoji}</span>
                                  </div>
                                  <span className="font-bold text-base">{item.label}</span>
                                </div>
                                
                                {activeTab === item.id && (
                                  <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 fill-current" />
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                  </div>
                                )}
                              </div>
                            </Button>
                          ))}
                        </div>
                        
                        {/* Enhanced Logout Section */}
                        <div className="pt-6 border-t border-gray-200/50">
                          <Button
                            className="group w-full h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-2xl shadow-lg hover:shadow-xl font-bold text-white transition-all duration-300 hover:scale-105"
                            onClick={() => {
                              setShowLogoutConfirm(true);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <LogOut className="w-5 h-5" />
                              </div>
                              <span className="text-base">Sign Out Safely</span>
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            </div>
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🎯 PREMIUM MAIN CONTENT AREA */}
      <main className="relative z-10 min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-60 left-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 pb-32 md:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Multi-layer Professional Content Wrapper */}
            <div className="group relative">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              
              {/* Main content container */}
              <div className="relative backdrop-blur-2xl bg-white/85 rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Inner content wrapper */}
                <div className="relative backdrop-blur-sm bg-white/70 rounded-3xl border border-white/50 m-2 shadow-xl">
                  <div className="p-6 sm:p-8 lg:p-12">
                    {/* Content goes here */}
                    {children}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse opacity-40" />
                <div className="absolute top-8 left-8 w-2 h-2 bg-accent rounded-full animate-pulse opacity-30" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 🚨 ENHANCED SOS BUTTON - ALWAYS ACCESSIBLE */}
      <div className="fixed bottom-32 right-4 z-[60] md:bottom-8 md:right-8 lg:bottom-10 lg:right-10">
        <div className="group relative">
          <div className="absolute -inset-4 bg-red-500/30 rounded-full blur-xl animate-pulse opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
          <SOSButton />
        </div>
      </div>

      {/* 📱 PREMIUM BOTTOM NAVIGATION - MOBILE ONLY */}
      <div className="md:hidden relative z-40">
        <div className="fixed bottom-0 left-0 right-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-accent/5 to-transparent blur-xl" />
            <div className="relative backdrop-blur-2xl bg-white/90 border-t border-white/30 shadow-2xl">
              <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <LogOut className="w-6 h-6 text-red-500" />
              <span>Sign Out</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Are you sure you want to sign out? You&apos;ll need to sign in again to access your safety features and emergency contacts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirm(false)}
              className="rounded-xl border-2 border-gray-200 hover:bg-gray-50"
            >
              Stay Signed In
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppLayout;

