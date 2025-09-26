'use client';

import React from 'react';

interface AlarmIconProps {
  className?: string;
  size?: number;
  isActive?: boolean;
}

const AlarmIcon: React.FC<AlarmIconProps> = ({ 
  className = "", 
  size = 24,
  isActive = false 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(197, 108, 161, 0.6))' : 'none' }}
    >
      {/* Alarm Bell Body */}
      <path
        d="M50 15 C30 15, 15 30, 15 50 C15 70, 30 75, 50 75 C70 75, 85 70, 85 50 C85 30, 70 15, 50 15 Z"
        fill="url(#alarmGradient)"
        stroke="#6c636c"
        strokeWidth="2"
        className={isActive ? 'animate-bounce' : ''}
      />
      
      {/* Bell Clapper */}
      <circle
        cx="50"
        cy="60"
        r="4"
        fill="#6c636c"
        className={isActive ? 'animate-ping' : ''}
      />
      
      {/* Bell Top Handle */}
      <path
        d="M45 15 Q50 10, 55 15"
        fill="none"
        stroke="#6c636c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Sound Waves */}
      {isActive && (
        <>
          <path
            d="M20 35 Q10 50, 20 65"
            fill="none"
            stroke="#c56ca1"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
            opacity="0.7"
          />
          <path
            d="M80 35 Q90 50, 80 65"
            fill="none"
            stroke="#c56ca1"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-pulse"
            opacity="0.7"
            style={{ animationDelay: '0.2s' }}
          />
          <path
            d="M15 30 Q5 50, 15 70"
            fill="none"
            stroke="#c06e99"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse"
            opacity="0.5"
            style={{ animationDelay: '0.4s' }}
          />
          <path
            d="M85 30 Q95 50, 85 70"
            fill="none"
            stroke="#c06e99"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-pulse"
            opacity="0.5"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
      
      {/* Alert Exclamation */}
      <g className={isActive ? 'animate-pulse' : ''}>
        <circle cx="50" cy="45" r="2" fill="white" />
        <rect x="49" y="30" width="2" height="10" fill="white" rx="1" />
      </g>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="alarmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c56ca1" />
          <stop offset="50%" stopColor="#c06e99" />
          <stop offset="100%" stopColor="#b16a91" />
        </linearGradient>
        
        {/* Glow Effect for Active State */}
        {isActive && (
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>
    </svg>
  );
};

export default AlarmIcon;