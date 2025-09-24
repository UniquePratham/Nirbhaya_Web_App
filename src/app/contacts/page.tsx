'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContacts } from '@/contexts/ContactsContext';
import AppLayout from '@/components/AppLayout';
import { TabType, TrustedContact } from '@/types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  User, 
  Heart, 
  AlertTriangle,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('contacts');
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    isEmergency: false,
  });
  const { contacts, addContact, updateContact, deleteContact } = useContacts();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth?mode=signin');
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

  if (!isAuthenticated) {
    return null;
  }

  const handleAddContact = () => {
    setFormData({
      name: '',
      phone: '',
      relationship: '',
      isEmergency: false,
    });
    setEditingContact(null);
    setShowAddForm(true);
  };

  const handleEditContact = (contact: TrustedContact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
      isEmergency: contact.isEmergency,
    });
    setEditingContact(contact);
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.relationship) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingContact) {
      updateContact(editingContact.id, formData);
    } else {
      addContact(formData);
    }

    setShowAddForm(false);
    setEditingContact(null);
    setFormData({
      name: '',
      phone: '',
      relationship: '',
      isEmergency: false,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingContact(null);
    setFormData({
      name: '',
      phone: '',
      relationship: '',
      isEmergency: false,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Trusted Contacts</h2>
            <p className="text-gray-600">Manage your emergency contacts</p>
          </div>
          <button
            onClick={handleAddContact}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Contacts Yet</h3>
            <p className="text-gray-600 mb-4">Add your trusted contacts to get started</p>
            <button
              onClick={handleAddContact}
              className="btn-primary"
            >
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="card card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      contact.isEmergency 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {contact.isEmergency ? (
                        <AlertTriangle className="w-6 h-6" />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {contact.phone}
                      </p>
                      {contact.isEmergency && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                          <Heart className="w-3 h-3 mr-1" />
                          Emergency Contact
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditContact(contact)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Contact Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="Enter contact name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    value={formData.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                    className="input-field"
                    placeholder="e.g., Mother, Father, Friend"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isEmergency"
                    checked={formData.isEmergency}
                    onChange={(e) => handleInputChange('isEmergency', e.target.checked)}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="isEmergency" className="text-sm font-medium text-gray-700">
                    Emergency Contact (will receive SOS alerts)
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    {editingContact ? 'Update' : 'Add'} Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
