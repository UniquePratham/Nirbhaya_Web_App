'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from './BottomNavigation';
import SOSButton from './SOSButton';
import { TabType } from '@/types';
import { Shield, LogOut, Menu, Sparkles, Crown, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      {/* Header */}
      <header className="z-40 sticky top-0">
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <div className="container">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                    <Shield className="w-7 h-7 text-white drop-shadow-lg" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      Nirbhaya
                    </h1>
                    <Crown className="w-5 h-5 text-yellow-500 animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Women&apos;s Safety Platform</p>
                </div>
              </div>
              
              {/* Desktop User Section */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Greeting */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{greeting.icon}</span>
                    <span className="text-sm font-semibold bg-gradient-to-r {greeting.color} bg-clip-text text-transparent">
                      {greeting.text}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                {/* User Avatar & Info */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/20">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {user.bloodGroup}
                      </Badge>
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <Avatar className="w-10 h-10 ring-2 ring-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg"
                    >
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl border-l border-white/20">
                    <SheetHeader>
                      <SheetTitle className="flex items-center space-x-2 text-xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-black">
                          Nirbhaya
                        </span>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                      </SheetTitle>
                      <SheetDescription className="text-gray-600 font-medium">
                        {greeting.icon} {greeting.text}, {user.name.split(' ')[0]}!
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mt-8 space-y-6">
                      {/* User Profile Card */}
                      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 border border-white/40">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-14 h-14 ring-2 ring-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 text-white font-bold text-xl">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {user.bloodGroup}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Premium
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Navigation Links */}
                      <div className="space-y-2">
                        {[
                          { id: 'home', label: 'Home', icon: '🏠' },
                          { id: 'contacts', label: 'Trusted Contacts', icon: '👥' },
                          { id: 'articles', label: 'Safety Articles', icon: '📚' },
                          { id: 'profile', label: 'My Profile', icon: '👤' },
                        ].map((item) => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className={`w-full justify-start h-12 rounded-xl transition-all duration-300 ${
                              activeTab === item.id 
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                                : 'hover:bg-white/60 hover:shadow-md'
                            }`}
                            onClick={() => {
                              onTabChange(item.id as TabType);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <span className="text-lg mr-3">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                            {activeTab === item.id && (
                              <Star className="w-4 h-4 ml-auto fill-current" />
                            )}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Logout Section */}
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          variant="destructive"
                          className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl shadow-lg font-semibold"
                          onClick={() => {
                            setShowLogoutConfirm(true);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container py-8 pb-28 md:pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Content wrapper with glass effect */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 p-6 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* SOS Button - Enhanced Position */}
      <div className="fixed bottom-28 right-6 z-50 md:bottom-10 md:right-10">
        <SOSButton />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden relative z-40">
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
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

