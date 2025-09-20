'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Newspaper, User, AlertTriangle } from 'lucide-react';
import { TabType } from '@/types';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'home' as TabType,
      label: 'Home',
      icon: Home,
      href: '/',
    },
    {
      id: 'contacts' as TabType,
      label: 'Contacts',
      icon: Users,
      href: '/contacts',
    },
    {
      id: 'articles' as TabType,
      label: 'Articles',
      icon: Newspaper,
      href: '/articles',
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: User,
      href: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border/40 shadow-lg">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300 group relative",
                isActive
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <div className={cn(
                "relative transition-all duration-300",
                isActive ? "scale-110" : "group-hover:scale-105"
              )}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-xs mt-1 font-medium transition-all duration-300",
                isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-primary"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;

