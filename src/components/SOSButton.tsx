'use client';

import React, { useState } from 'react';
import { AlertTriangle, MapPin, Share2, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import { getCurrentLocation } from '@/utils/location';
import { shareToAllContacts } from '@/utils/whatsapp';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SOSButtonProps {
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();
  const { getEmergencyContacts } = useContacts();

  const handleSOS = async () => {
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
      
      // Show success message
      setTimeout(() => {
        setShowAlert(false);
        alert('SOS alert sent to your emergency contacts!');
      }, 2000);

    } catch (error) {
      console.error('SOS Error:', error);
      alert('Failed to send SOS alert. Please try again.');
      setShowAlert(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <Button
        onClick={handleSOS}
        disabled={isLoading}
        size="lg"
        className={cn(
          "w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 group-hover:scale-110",
          showAlert && "animate-pulse shadow-red-500/70",
          isLoading && "opacity-75 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <AlertTriangle className="w-8 h-8" />
        )}
      </Button>
      
      {showAlert && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Badge variant="destructive" className="px-4 py-2 text-sm font-medium animate-pulse">
            <MapPin className="w-4 h-4 mr-2" />
            Sending SOS Alert...
          </Badge>
        </div>
      )}
      
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs font-semibold text-foreground mb-1">Emergency SOS</p>
        <p className="text-xs text-muted-foreground">Tap to send alert</p>
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-red-500/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
    </div>
  );
};

export default SOSButton;

