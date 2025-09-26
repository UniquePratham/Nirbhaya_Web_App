'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AlertTriangle, MapPin, Loader2, Zap, Phone, Heart, Volume2, Shield, Smartphone, Laptop, X, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AlarmIcon from '@/components/ui/AlarmIcon';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateSOS: () => Promise<void>;
  isLoading: boolean;
  countdown: number | null;
  onCancelCountdown: () => void;
}

const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  onActivateSOS,
  isLoading,
  countdown,
  onCancelCountdown
}) => {
  const { user } = useAuth();
  const { getEmergencyContacts } = useContacts();
  const emergencyContacts = getEmergencyContacts();

  const detectPlatform = () => {
    if (typeof window === 'undefined') return 'web';
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    return 'web';
  };

  const platform = detectPlatform();
  
  const getPlatformCapabilities = () => {
    if (platform === 'android' || platform === 'ios') {
      return ['SMS', 'WhatsApp', 'Location', 'Vibration', 'Sound'];
    }
    return ['WhatsApp', 'Location', 'Sound'];
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'android':
      case 'ios':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Laptop className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-2" style={{ borderColor: 'var(--primary)' }}>
        <DialogHeader className="text-center space-y-4">
          {/* Header with Alarm Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-full blur-xl scale-150 animate-pulse" style={{ background: 'var(--primary)' }} />
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                <AlarmIcon size={48} isActive={countdown !== null || isLoading} className="drop-shadow-2xl" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ background: 'linear-gradient(135deg, var(--accent), var(--secondary-dark))' }}>
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <DialogTitle className="text-2xl font-black text-center" style={{ color: 'var(--text-primary)' }}>
            Emergency SOS Alert
          </DialogTitle>
          
          <DialogDescription className="text-center space-y-2">
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              Instantly alert your trusted contacts in case of emergency
            </p>
            
            {/* User Info */}
            {user && (
              <div className="flex items-center justify-center space-x-3 p-3 rounded-2xl" style={{ background: 'var(--surface-light)' }}>
                <div className="relative">
                  <Image
                    src={user?.profileImage || '/demo-user.png'} 
                    alt="User Profile" 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 shadow-lg object-cover"
                    style={{ borderColor: 'var(--primary)' }}
                    unoptimized={true}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <div className="flex items-center space-x-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {getPlatformIcon()}
                    <span className="capitalize font-medium">{platform} Device</span>
                  </div>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Main Content */}
        <div className="space-y-6 py-4">
          {/* Emergency Contacts Summary */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {emergencyContacts.length} Emergency Contacts Ready
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {emergencyContacts.slice(0, 3).map((contact, index) => (
                <div key={index} className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border" style={{ background: 'var(--surface)', borderColor: 'var(--border-light)', color: 'var(--text-secondary)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                  <span>{contact.name}</span>
                </div>
              ))}
              {emergencyContacts.length > 3 && (
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border" style={{ background: 'var(--surface)', borderColor: 'var(--border-light)', color: 'var(--text-muted)' }}>
                  <span>+{emergencyContacts.length - 3} more</span>
                </div>
              )}
            </div>
          </div>

          {/* Platform Capabilities */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-center uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Available Features
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {getPlatformCapabilities().map((capability) => (
                <div 
                  key={capability}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold border"
                  style={{ background: 'var(--surface-light)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  {capability === 'SMS' && <Phone className="w-3 h-3" />}
                  {capability === 'WhatsApp' && <Heart className="w-3 h-3" />}
                  {capability === 'Location' && <MapPin className="w-3 h-3" />}
                  {capability === 'Vibration' && <Zap className="w-3 h-3" />}
                  {capability === 'Sound' && <Volume2 className="w-3 h-3" />}
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Countdown Display */}
          {countdown !== null && (
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-2xl animate-pulse" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                <span className="text-3xl font-black text-white">{countdown}</span>
              </div>
              <p className="text-sm font-bold animate-pulse" style={{ color: 'var(--primary)' }}>
                Emergency alert sending in {countdown} seconds...
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary)' }} />
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                Sending emergency alerts...
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="flex-col space-y-2">
          {countdown !== null ? (
            <Button
              onClick={onCancelCountdown}
              variant="destructive"
              className="w-full font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Emergency Alert
            </Button>
          ) : isLoading ? (
            <Button disabled className="w-full" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Alerts...
            </Button>
          ) : (
            <div className="space-y-2 w-full">
              <Button
                onClick={onActivateSOS}
                className="w-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                disabled={emergencyContacts.length === 0}
              >
                <AlarmIcon size={20} className="mr-2" />
                Activate Emergency SOS
              </Button>
              
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full font-medium"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                Close
              </Button>
            </div>
          )}

          {/* Warning for no contacts */}
          {emergencyContacts.length === 0 && (
            <div className="flex items-center justify-center space-x-2 p-2 rounded-lg" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <AlertTriangle className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Add emergency contacts first to use SOS
              </p>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SOSModal;