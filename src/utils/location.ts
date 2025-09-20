export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates using reverse geocoding
          const address = await getAddressFromCoordinates(latitude, longitude);
          resolve({
            latitude,
            longitude,
            address,
          });
        } catch (error) {
          // If address lookup fails, still return coordinates
          resolve({
            latitude,
            longitude,
          });
        }
      },
      (error) => {
        reject(new Error(`Location access denied: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Address lookup failed');
    }
    
    const data = await response.json();
    return `${data.locality}, ${data.principalSubdivision}, ${data.countryName}`;
  } catch (error) {
    console.error('Error getting address:', error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};

export const generateGoogleMapsLink = (latitude: number, longitude: number): string => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

