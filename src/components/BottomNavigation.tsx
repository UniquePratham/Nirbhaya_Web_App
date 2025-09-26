'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Users, Newspaper, User, Sparkles, Heart, Shield } from 'lucide-react';
import { TabType } from '@/types';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
      href: '/',
      color: 'from-primary to-accent',
      bgColor: 'bg-primary/10',
    },
    {
      id: 'contacts' as TabType,
      label: 'Contacts',
      icon: Users,
      href: '/contacts',
      color: 'from-accent to-secondary-dark',
      bgColor: 'bg-accent/10',
    },
    {
      id: 'articles' as TabType,
      label: 'Articles',
      icon: Newspaper,
      href: '/articles',
      color: 'from-secondary to-tertiary',
      bgColor: 'bg-secondary/10',
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: User,
      href: '/profile',
      color: 'from-tertiary to-primary',
      bgColor: 'bg-tertiary/10',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background with ultra-modern glass effect */}
      <div className="bg-white/80 backdrop-blur-2xl border-t border-white/30 shadow-2xl">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 33%, var(--secondary-dark) 66%, var(--tertiary) 100%)' }} />
        
        {/* Navigation container */}
        <div className="relative flex items-center justify-around px-6 py-3 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-500 ease-out group",
                  "transform-gpu will-change-transform",
                  isActive ? "scale-110" : "hover:scale-105"
                )}
              >
                {/* Icon container with spectacular effects */}
                <div className="relative">
                  {/* Background glow for active item */}
                  {isActive && (
                    <div className={cn(
                      "absolute -inset-3 rounded-2xl blur-lg opacity-30 transition-opacity duration-500",
                      `bg-gradient-to-br ${item.color}`
                    )} />
                  )}
                  
                  {/* Icon background */}
                  <div className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500",
                    "shadow-lg transform-gpu will-change-transform",
                    isActive 
                      ? `bg-gradient-to-br ${item.color} text-white shadow-xl` 
                      : `${item.bgColor} text-gray-600 hover:text-gray-800 hover:shadow-md group-hover:bg-white/80`
                  )}>
                    <Icon className={cn(
                      "transition-all duration-300",
                      isActive ? "w-6 h-6" : "w-5 h-5 group-hover:w-5.5 group-hover:h-5.5"
                    )} />
                    
                    {/* Sparkle effect for active item */}
                    {isActive && (
                      <>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                        <Sparkles className="absolute -top-2 -left-2 w-3 h-3 text-yellow-400 animate-pulse" />
                      </>
                    )}
                  </div>
                  
                  {/* Floating particles for active item */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 3 }).map((_, particleIndex) => (
                        <div
                          key={particleIndex}
                          className="absolute w-1 h-1 rounded-full opacity-60"
                          style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            animation: `float 2s ease-in-out infinite ${particleIndex * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Label */}
                <span className={cn(
                  "text-xs font-semibold mt-1.5 transition-all duration-300 tracking-wide",
                  isActive 
                    ? "text-transparent bg-clip-text transform scale-105" 
                    : "text-gray-600 group-hover:text-gray-800"
                )} style={isActive ? { 
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
                  WebkitBackgroundClip: 'text', 
                  backgroundClip: 'text' 
                } : {}}>
                  {item.label}
                </span>
                
                {/* Active indicator line */}
                {isActive && (
                  <div className={cn(
                    "absolute -bottom-3 left-1/2 transform -translate-x-1/2",
                    "w-8 h-1 rounded-full transition-all duration-500",
                    `bg-gradient-to-r ${item.color}`
                  )} />
                )}
                
                {/* Hover indicator */}
                {!isActive && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gray-300 rounded-full transition-all duration-300 group-hover:w-6" />
                )}
                
                {/* Ripple effect on tap */}
                <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-110 transition-transform duration-150" />
              </Link>
            );
          })}
        </div>
        
        {/* Safety indicator */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
          <Shield className="w-3 h-3" style={{ color: 'var(--primary)' }} />
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
          <Heart className="w-3 h-3 animate-pulse" style={{ color: 'var(--accent)' }} />
        </div>
        
        {/* Bottom safe area for newer phones */}
        <div className="h-safe-area-inset-bottom bg-white/50" />
      </div>
      
      {/* Ambient glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 blur-xl pointer-events-none" style={{ background: 'linear-gradient(to top, var(--primary)/20, var(--accent)/10, transparent)' }} />
    </div>
  );
};

export default BottomNavigation;

