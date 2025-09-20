'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Mail, Lock, Eye, EyeOff, Sparkles, Crown, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simple validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // For demo purposes, we'll create a user from email
      // In a real app, you'd validate credentials with a backend
      const user = {
        id: email.split('@')[0],
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        phone: '+1234567890',
        bloodGroup: 'O+',
        dateOfBirth: '1990-01-01',
      };

      login(user);
      router.push('/');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse floating" />
          <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse floating-delayed" />
          <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full blur-3xl animate-pulse floating" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-2xl animate-pulse floating-delayed" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white drop-shadow-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-black mb-1 font-display">
              <span className="gradient-text">Welcome Back</span>
              <Sparkles className="inline w-8 h-8 ml-2 text-yellow-500 animate-pulse" />
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Sign in to your Nirbhaya account
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4 text-red-500 animate-pulse mb-2" />
              <span>Your safety is our priority</span>
              <Shield className="w-4 h-4 text-green-500" />
            </p>
          </div>

          {/* Login Card */}
          <div className="card-modern">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold gradient-text flex items-center justify-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span>Sign In</span>
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium text-lg">
                Enter your credentials to access your safety dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-medium shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-md font-bold text-gray-700 flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>Email Address</span>
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 pr-4 py-4 h-16 text-lg w-full"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-md font-bold text-gray-700 flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-purple-500" />
                    <span>Password</span>
                  </Label>
                  <div className="relative group mt-6">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 py-4 h-16 text-lg w-full"
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>



                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:via-purple-700 hover:to-cyan-600 text-white rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:-translate-y-1 border-0 relative overflow-hidden group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="spinner-modern" />
                      <span>Signing You In...</span>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Shield className="w-6 h-6" />
                      <span>Sign In to Your Safety Hub</span>
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 font-medium">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="gradient-text font-bold hover:underline transition-all duration-300 hover:scale-105 inline-flex items-center space-x-1"
                  >
                    <span>Sign up here</span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </Link>
                </p>
              </div>
            </CardContent>
          </div>

          {/* Demo Note */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 backdrop-blur-md rounded-2xl p-6 border border-blue-200/50 shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Demo Mode Active</span>
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-blue-700 font-medium">
                Enter any email and password to experience the platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

