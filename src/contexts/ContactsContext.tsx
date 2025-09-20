'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TrustedContact } from '@/types';

interface ContactsContextType {
  contacts: TrustedContact[];
  addContact: (contact: Omit<TrustedContact, 'id'>) => void;
  updateContact: (id: string, contact: Partial<TrustedContact>) => void;
  deleteContact: (id: string) => void;
  getEmergencyContacts: () => TrustedContact[];
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};

interface ContactsProviderProps {
  children: ReactNode;
}

export const ContactsProvider: React.FC<ContactsProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);

  useEffect(() => {
    // Load contacts from localStorage on mount
    const storedContacts = localStorage.getItem('nirbhaya_contacts');
    if (storedContacts) {
      try {
        const parsedContacts = JSON.parse(storedContacts);
        setContacts(parsedContacts);
      } catch (error) {
        console.error('Error parsing stored contacts:', error);
        localStorage.removeItem('nirbhaya_contacts');
      }
    }
  }, []);

  const addContact = (contactData: Omit<TrustedContact, 'id'>) => {
    const newContact: TrustedContact = {
      ...contactData,
      id: Date.now().toString(),
    };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('nirbhaya_contacts', JSON.stringify(updatedContacts));
  };

  const updateContact = (id: string, contactData: Partial<TrustedContact>) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, ...contactData } : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('nirbhaya_contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('nirbhaya_contacts', JSON.stringify(updatedContacts));
  };

  const getEmergencyContacts = () => {
    return contacts.filter(contact => contact.isEmergency);
  };

  const value: ContactsContextType = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    getEmergencyContacts,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

