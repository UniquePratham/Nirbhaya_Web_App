export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  bloodGroup: string;
  dateOfBirth: string;
  profileImage?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isEmergency: boolean;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface SOSAlert {
  id: string;
  timestamp: string;
  location: LocationData;
  message: string;
  contacts: TrustedContact[];
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export type TabType = 'home' | 'contacts' | 'articles' | 'profile';

