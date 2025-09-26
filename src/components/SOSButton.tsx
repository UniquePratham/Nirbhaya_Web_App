'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { getCurrentLocation } from '@/utils/location';
import { shareToAllContacts } from '@/utils/whatsapp';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { AlertTriangle, Zap } from 'lucide-react';
import SOSModal from '@/components/ui/SOSModal';

// Platform detection
const detectPlatform = () => {
  if (typeof window === 'undefined') return 'web';
  const win = window as Window & { opera?: string; MSStream?: unknown };
  const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : (win.opera ?? '');
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua) && !win.MSStream) return 'ios';
  if (/Windows Phone/.test(ua)) return 'windows-mobile';
  return 'web';
};

const sendSMS = async (phoneNumber: string, message: string): Promise<boolean> => {
  const platform = detectPlatform();
  if (platform === 'android' || platform === 'ios') {
    try {
      if (navigator.share) {
        await navigator.share({ text: message, title: 'Emergency SOS Alert' });
        return true;
      }
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      window.open(smsUrl, '_blank');
      return true;
    } catch (e) {
      console.error('SMS send failed', e);
      return false;
    }
  }
  return false;
};

const playNotificationSound = () => {
  try {
    const AudioCtx = (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🚨 Emergency SOS Activated!', {
        body: 'Emergency alert is being sent to your trusted contacts.',
        tag: 'sos-alert',
      });
    }
    if ('vibrate' in navigator) navigator.vibrate?.([200, 100, 200]);
  } catch (e) {
    console.error('playNotificationSound error', e);
  }
};

interface SOSButtonProps {
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const countdownRef = useRef<number | null>(null);

  const { user } = useAuth();
  const { getEmergencyContacts } = useContacts();
  const { showToast } = useToast();

  const startCountdown = () => {
    setCountdown(5);
    const id = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }
          executeSOS().catch(() => {});
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    countdownRef.current = id;
  };

  const cancelCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setCountdown(null);
    showToast({ 
      type: 'info', 
      title: 'SOS Cancelled', 
      message: 'Emergency alert has been cancelled.', 
      duration: 3000 
    });
  };

  const executeSOS = async () => {
    if (!user) {
      showToast({ 
        type: 'warning', 
        title: 'Authentication Required', 
        message: 'Please log in to use the SOS feature.', 
        duration: 4000 
      });
      return;
    }

    setIsLoading(true);
    try {
      playNotificationSound();
      const location = await getCurrentLocation().catch(() => null);
      const emergencyContacts = getEmergencyContacts ? getEmergencyContacts() : [];

      if (!emergencyContacts || emergencyContacts.length === 0) {
        showToast({ 
          type: 'warning', 
          title: 'No Emergency Contacts', 
          message: 'Please add trusted contacts first to use the SOS feature.', 
          duration: 5000 
        });
        setIsLoading(false);
        return;
      }

      const emergencyMessage = `🚨 EMERGENCY SOS ALERT 🚨
${user.name} needs immediate help!

Location: ${location ? `https://maps.google.com/maps?q=${location.latitude},${location.longitude}` : 'Location unavailable'}
Time: ${new Date().toLocaleString()}
Blood Group: ${user.bloodGroup || 'Unknown'}

This is an automated emergency alert from Nirbhaya Safety App. Please contact ${user.name} immediately or call emergency services.
#Emergency #SOS #NirbhayaApp`;

      const platform = detectPlatform();
      let smsSuccessCount = 0;
      let whatsappSuccessCount = 0;

      for (const contact of emergencyContacts) {
        try {
          if (platform === 'android' || platform === 'ios') {
            const smsSuccess = await sendSMS(contact.phone, emergencyMessage);
            if (smsSuccess) smsSuccessCount++;
          }
          whatsappSuccessCount++;
        } catch (e) {
          console.error(`Failed to send to ${contact.name}`, e);
        }
      }

      if (location) {
        shareToAllContacts(user, location, emergencyContacts);
      } else {
        shareToAllContacts(user, { latitude: 0, longitude: 0 }, emergencyContacts);
      }

      const platformMessage = platform === 'android' || platform === 'ios'
        ? `SMS sent to ${smsSuccessCount} contacts, WhatsApp alerts sent to ${whatsappSuccessCount} contacts.`
        : `WhatsApp alerts sent to ${whatsappSuccessCount} contacts. SMS not available on desktop.`;

      showToast({ 
        type: 'success', 
        title: '🚨 Emergency SOS Sent!', 
        message: `Emergency alert dispatched! ${platformMessage} Your location has been shared.`, 
        duration: 10000 
      });

      // Close modal after success
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (e) {
      console.error('SOS Error:', e);
      showToast({ 
        type: 'error', 
        title: 'SOS Failed', 
        message: 'Unable to send emergency alert. Please try again or contact emergency services directly.', 
        duration: 8000 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalActivateSOS = async () => {
    startCountdown();
  };

  return (
    <>
      {/* Fixed Position SOS Button - Bottom Right */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 group",
          "sm:bottom-8 sm:right-8",
          "lg:bottom-10 lg:right-10",
          className
        )}
      >
        {/* Outer Glow Rings */}
        <div className="absolute inset-0 rounded-full opacity-30 animate-ping" 
             style={{ 
               background: 'linear-gradient(135deg, var(--primary), var(--accent))',
               animationDuration: '2s' 
             }} 
        />
        <div className="absolute inset-0 rounded-full opacity-20 animate-ping" 
             style={{ 
               background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))',
               animationDuration: '3s',
               animationDelay: '1s' 
             }} 
        />

        {/* Main SOS Button */}
        <button
          onClick={() => setShowModal(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full",
            "border-4 border-white shadow-2xl",
            "focus:outline-none focus:ring-4 transition-all duration-300 ease-out",
            "hover:scale-110 active:scale-105 transform",
            "backdrop-blur-xl"
          )}
          style={{
              background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary-dark) 100%)`,
              boxShadow: `
                0 0 30px rgba(197, 108, 161, 0.6),
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
              outlineColor: 'var(--primary)'
            }}
        >
          {/* Button Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
            {/* Clear SOS Emergency Icon */}
            <div className="relative">
              {/* Main Alert Triangle */}
              <AlertTriangle 
                size={isHovered ? 32 : 28} 
                className="drop-shadow-2xl transition-all duration-300 animate-pulse"
                strokeWidth={3}
                fill="currentColor"
                stroke="white"
              />
              {/* Exclamation point for extra emphasis */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-1 h-3 bg-white rounded-full mb-0.5 animate-pulse" />
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              {/* Flashing danger indicator */}
              <div className="absolute -top-1 -right-1">
                <Zap className="w-3 h-3 text-yellow-300 animate-bounce" fill="currentColor" />
              </div>
            </div>
            {/* Bold SOS Text */}
            <div className="mt-1 text-xs font-black tracking-wider">
              SOS
            </div>
          </div>

          {/* Hover Pulse Effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 rounded-full animate-pulse opacity-40"
              style={{ background: 'var(--primary)' }}
            />
          )}
        </button>

        {/* Floating Label */}
        <div className={cn(
          "absolute -top-12 left-1/2 transform -translate-x-1/2",
          "bg-white/95 backdrop-blur-md rounded-xl px-3 py-1 shadow-lg",
          "border transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )} style={{ borderColor: 'var(--border-light)' }}>
          <p className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
            Emergency SOS
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float opacity-60"
              style={{
                background: 'var(--accent)',
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float 3s ease-in-out infinite ${i * 0.7}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* SOS Modal */}
      <SOSModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onActivateSOS={handleModalActivateSOS}
        isLoading={isLoading}
        countdown={countdown}
        onCancelCountdown={cancelCountdown}
      />
    </>
  );
};

export default SOSButton;

