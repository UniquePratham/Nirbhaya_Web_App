'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toastData: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const toast: Toast = {
      id,
      duration: 5000,
      ...toastData,
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove toast after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, toast.duration);
    }
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-white" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-white" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'info':
        return <Info className="w-5 h-5 text-white" />;
      default:
        return <Info className="w-5 h-5 text-white" />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderColor: '#059669',
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderColor: '#dc2626',
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          borderColor: '#d97706',
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          borderColor: 'var(--primary)',
        };
      default:
        return {
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          borderColor: 'var(--primary)',
        };
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((toast) => {
          const styles = getToastStyles(toast.type);
          return (
            <div
              key={toast.id}
              className="flex items-start p-4 rounded-2xl shadow-2xl backdrop-blur-lg border-2 min-w-80 max-w-md transform transition-all duration-500 ease-out animate-slide-in-right"
              style={{
                background: styles.background,
                borderColor: styles.borderColor,
                boxShadow: `0 20px 40px ${styles.borderColor}25`,
              }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mr-3 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {getToastIcon(toast.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-bold text-sm mb-1">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-white/90 text-xs leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => hideToast(toast.id)}
                className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Toast Animation Styles */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

// Utility functions for easy usage
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    // This will be replaced by the actual toast function when used with useToast
    console.log('Success toast:', title, message);
  },
  error: (title: string, message?: string, duration?: number) => {
    console.log('Error toast:', title, message);
  },
  warning: (title: string, message?: string, duration?: number) => {
    console.log('Warning toast:', title, message);
  },
  info: (title: string, message?: string, duration?: number) => {
    console.log('Info toast:', title, message);
  },
};