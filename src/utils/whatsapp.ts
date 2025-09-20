import { User, TrustedContact, LocationData } from '@/types';
import { generateGoogleMapsLink } from './location';

export const generateSOSMessage = (
  user: User,
  location: LocationData,
  contacts: TrustedContact[]
): string => {
  const mapsLink = generateGoogleMapsLink(location.latitude, location.longitude);
  const locationText = location.address || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  
  return `🚨 EMERGENCY ALERT - ${user.name} 🚨

I need immediate help! Please contact me or the authorities.

📍 Location: ${locationText}
🗺️ Maps: ${mapsLink}

👤 My Details:
• Name: ${user.name}
• Phone: ${user.phone}
• Blood Group: ${user.bloodGroup}
• DOB: ${user.dateOfBirth}

⏰ Time: ${new Date().toLocaleString()}

Please share this with emergency contacts and authorities if needed.

#Emergency #Safety #NirbhayaApp`;
};

export const shareToWhatsApp = (message: string, phoneNumbers: string[] = []): void => {
  const encodedMessage = encodeURIComponent(message);
  
  if (phoneNumbers.length > 0) {
    // Send to specific contacts
    phoneNumbers.forEach(phone => {
      const cleanPhone = phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    });
  } else {
    // Open WhatsApp with message ready to send
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
};

export const shareToAllContacts = (
  user: User,
  location: LocationData,
  contacts: TrustedContact[]
): void => {
  const message = generateSOSMessage(user, location, contacts);
  const phoneNumbers = contacts
    .filter(contact => contact.isEmergency)
    .map(contact => contact.phone);
  
  shareToWhatsApp(message, phoneNumbers);
};

