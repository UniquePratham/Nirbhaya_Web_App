'use client';

import React, { useState } from 'react';
import { AlertTriangle, MapPin, Loader2, Zap, Phone, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { getCurrentLocation } from '@/utils/location';
import { shareToAllContacts } from '@/utils/whatsapp';
import { cn } from '@/lib/utils';

interface SOSButtonProps {
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const { user } = useAuth();
  const { getEmergencyContacts } = useContacts();

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const handleSOS = async (event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    
    if (!user) {
      alert('Please log in to use SOS feature');
      return;
    }

    setIsLoading(true);
    setShowAlert(true);

    try {
      // Get current location
      const location = await getCurrentLocation();
      
      // Get emergency contacts
      const emergencyContacts = getEmergencyContacts();
      
      if (emergencyContacts.length === 0) {
        alert('No emergency contacts found. Please add trusted contacts first.');
        return;
      }

      // Share SOS alert
      shareToAllContacts(user, location, emergencyContacts);
      
      // Show success message with beautiful notification
      setTimeout(() => {
        setShowAlert(false);
        // Custom success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 font-semibold animate-pulse';
        successDiv.innerHTML = `
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span>🚨 SOS alert sent to ${emergencyContacts.length} contacts!</span>
          </div>
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
          document.body.removeChild(successDiv);
        }, 4000);
      }, 2000);

    } catch (error) {
      console.error('SOS Error:', error);
      setShowAlert(false);
      
      // Custom error notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 font-semibold';
      errorDiv.innerHTML = `
        <div class="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Failed to send SOS alert. Please try again.</span>
        </div>
      `;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        document.body.removeChild(errorDiv);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-600 opacity-20 animate-ping" 
           style={{ animationDuration: '2s' }} />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-600 opacity-10 animate-ping" 
           style={{ animationDuration: '3s', animationDelay: '1s' }} />
      
      {/* Main SOS Button */}
      <button
        onClick={handleSOS}
        disabled={isLoading}
        className={cn(
          // Size and shape
          "relative w-24 h-24 rounded-full",
          // Background and styling
          "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
          "border-4 border-white/90 shadow-2xl",
          // Hover and focus states
          "hover:from-red-600 hover:via-red-700 hover:to-red-800",
          "focus:outline-none focus:ring-4 focus:ring-red-500/50",
          // Transitions and animations
          "transition-all duration-300 ease-out transform",
          "hover:scale-110 active:scale-105",
          // Special effects
          "before:absolute before:inset-0 before:rounded-full",
          "before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent",
          "after:absolute after:inset-2 after:rounded-full",
          "after:bg-gradient-to-br after:from-transparent after:via-transparent after:to-black/10",
          // Disabled state
          isLoading && "opacity-75 cursor-not-allowed scale-105",
          // Alert state
          showAlert && "animate-pulse shadow-red-500/70"
        )}
        style={{
          boxShadow: `
            0 0 30px rgba(239, 68, 68, 0.6),
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
          background: isLoading 
            ? 'conic-gradient(from 0deg, #ef4444, #dc2626, #b91c1c, #ef4444)' 
            : undefined
        }}
      >
        {/* Button Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          {isLoading ? (
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" 
                   style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          ) : (
            <>
              <div className="relative">
                <AlertTriangle className="w-8 h-8 drop-shadow-lg" strokeWidth={2.5} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
              </div>
              <span className="text-xs font-black tracking-wider mt-1 drop-shadow-sm">
                SOS
              </span>
            </>
          )}
        </div>
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute inset-0 rounded-full bg-white/30 animate-ping pointer-events-none"
            style={{
              left: ripple.x - 12,
              top: ripple.y - 12,
              width: 24,
              height: 24,
              animationDuration: '1s'
            }}
          />
        ))}
      </button>
      
      {/* Status Alert Popup */}
      {showAlert && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm font-semibold">Sending SOS Alert...</span>
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>
      )}
      
      {/* Button Labels */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
          <p className="text-sm font-bold text-red-600 mb-1">Emergency SOS</p>
          <p className="text-xs text-gray-600">Tap to alert contacts</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-500">Call</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-500">Location</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-xs text-gray-500">Contacts</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-300 rounded-full opacity-60"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `float 3s ease-in-out infinite ${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SOSButton;

