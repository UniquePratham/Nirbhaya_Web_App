'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import AppLayout from '@/components/AppLayout';
import { TabType } from '@/types';
import { 
  User, 
  Phone, 
  Droplets, 
  Calendar, 
  Users, 
  AlertTriangle, 
  Edit3,
  Check,
  X,
  Shield,
  Heart,
  Crown,
  Sparkles,
  Zap,
  Star,
  Award,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    dateOfBirth: '',
  });
  
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();
  const { contacts, getEmergencyContacts } = useContacts();
  const router = useRouter();

  const emergencyContacts = getEmergencyContacts();

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      updateUser(editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
      });
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="relative mb-6">
            <div className="spinner-modern mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Loading your safety dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your personalized experience</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-8">
        {/* Hero Welcome Section */}
        <div className="relative text-center py-12 px-6 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-white/20 backdrop-blur-sm overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-8 right-8 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4 font-display">
              <span className="gradient-text">
                Welcome back, {user.name.split(' ')[0]}!
              </span>
              <span className="ml-3 text-3xl">👋</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 font-medium">
              Your safety dashboard is ready • Stay protected & connected
            </p>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">System Active</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600">Protected Mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6 border border-pink-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-pink-300/20 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-4xl font-black gradient-text">{contacts.length}</p>
                <Star className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-semibold">Trusted Contacts</p>
              <p className="text-xs text-gray-500 mt-1">Ready to help you anytime</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-6 border border-red-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <AlertTriangle className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-4xl font-black gradient-text">{emergencyContacts.length}</p>
                <Zap className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-semibold">Emergency Contacts</p>
              <p className="text-xs text-gray-500 mt-1">Instant alert system ready</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-6 border border-emerald-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-emerald-300/20 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-4xl font-black gradient-text">100%</p>
                <Award className="w-5 h-5 text-yellow-500 fill-current animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-semibold">Safety Score</p>
              <p className="text-xs text-gray-500 mt-1">Fully protected & secure</p>
            </div>
          </div>
        </div>

        {/* Modern Personal Information Card */}
        <div className="card-modern">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-2xl font-bold gradient-text flex items-center space-x-2">
                <User className="w-6 h-6 text-pink-500" />
                <span>Personal Information</span>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 font-medium">
                Manage your personal details and emergency information
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                onClick={handleEdit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-3">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-2 border-gray-200 hover:bg-gray-50 rounded-2xl px-6 py-3 transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-pink-500" />
                  <span>Full Name</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-modern text-lg"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>Phone Number</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-modern text-lg"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <p className="text-lg font-semibold text-gray-800">{user.phone}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="bloodGroup" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Droplets className="w-4 h-4 text-red-500" />
                  <span>Blood Group</span>
                </Label>
                {isEditing ? (
                  <Select
                    value={editData.bloodGroup}
                    onValueChange={(value) => handleInputChange('bloodGroup', value)}
                  >
                    <SelectTrigger className="input-modern text-lg">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-lg font-semibold">
                      {user.bloodGroup}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="dateOfBirth" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Date of Birth</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="input-modern text-lg"
                  />
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </div>

        {/* Spectacular Quick Actions */}
        <div className="card-modern">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span>Quick Actions</span>
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium text-lg">
              Access your most important safety features instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                onClick={() => setActiveTab('contacts')}
                className="group h-24 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <Users className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                  <span className="font-bold text-lg">Manage Contacts</span>
                  <span className="text-sm opacity-90">Add & organize trusted people</span>
                </div>
              </Button>
              
              <Button
                onClick={() => setActiveTab('articles')}
                className="group h-24 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <AlertTriangle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                  <span className="font-bold text-lg">Safety Articles</span>
                  <span className="text-sm opacity-90">Learn safety tips & advice</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </div>

        {/* Enhanced Emergency Information */}
        <div className="card-modern border-red-200/50 bg-gradient-to-br from-red-50/50 to-pink-50/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-800 flex items-center space-x-2">
              <Heart className="w-6 h-6 animate-pulse" />
              <span>Emergency Information</span>
              <Shield className="w-5 h-5 text-red-600" />
            </CardTitle>
            <CardDescription className="text-red-700 font-medium text-lg">
              Critical information for emergency responders and trusted contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-red-200/30 space-y-4">
                <h3 className="font-bold text-red-800 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Details</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                    <span className="text-sm font-semibold text-red-800">Name:</span>
                    <span className="text-sm text-red-700 font-medium">{user.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                    <span className="text-sm font-semibold text-red-800">Phone:</span>
                    <span className="text-sm text-red-700 font-medium">{user.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-red-200/30 space-y-4">
                <h3 className="font-bold text-red-800 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Emergency Data</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                    <span className="text-sm font-semibold text-red-800">Blood Group:</span>
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">{user.bloodGroup}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                    <span className="text-sm font-semibold text-red-800">Emergency Contacts:</span>
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">{emergencyContacts.length} Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </AppLayout>
  );
}