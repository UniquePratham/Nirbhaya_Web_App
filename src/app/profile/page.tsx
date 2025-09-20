'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import AppLayout from '@/components/AppLayout';
import { TabType } from '@/types';
import { 
  User, 
  Mail, 
  Phone, 
  Droplets, 
  Calendar, 
  Settings, 
  LogOut,
  Shield,
  Users,
  AlertTriangle,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    dateOfBirth: '',
  });
  
  const { user, updateUser, logout, isAuthenticated, isLoading } = useAuth();
  const { contacts, getEmergencyContacts } = useContacts();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const emergencyContacts = getEmergencyContacts();

  React.useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user]);

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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <div className="card text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Profile Information */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{user.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{user.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Droplets className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                {isEditing ? (
                  <select
                    value={editData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="input-field"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{user.bloodGroup}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* App Statistics */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">App Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              <p className="text-sm text-gray-600">Total Contacts</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{emergencyContacts.length}</p>
              <p className="text-sm text-gray-600">Emergency Contacts</p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">App Version</span>
              <span className="text-gray-900 font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="text-gray-900 font-medium">Today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Storage</span>
              <span className="text-gray-900 font-medium">Local</span>
            </div>
          </div>
        </div>

        {/* Safety Reminder */}
        <div className="card bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Safety Reminder</h4>
              <p className="text-sm text-red-700 mb-3">
                Your personal information is stored locally on your device and will only be shared during emergency situations with your trusted contacts.
              </p>
              <div className="text-xs text-red-600">
                <p>• Keep your emergency contacts updated</p>
                <p>• Test the SOS feature regularly</p>
                <p>• Keep your phone charged and accessible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full btn-primary bg-red-600 hover:bg-red-700 flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </AppLayout>
  );
}
