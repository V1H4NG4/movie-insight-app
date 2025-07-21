"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Film, Mail, Lock, TrendingUp, User, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign up functionality would be implemented here');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.birthDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-[fadeInDown_0.8s_ease-out]">
          {/*<div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
              <Film className="w-8 h-8 text-white" />
            </div>
            <TrendingUp className="w-6 h-6 text-purple-400 ml-2" />
          </div>*/}
          <h1 className="text-3xl font-bold text-white mb-2">Join REELEVO</h1>
          <p className="text-gray-300">
            {currentStep === 1 ? 'Create your account to get started' : 'Complete your account setup'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 animate-[fadeInDown_0.8s_ease-out_0.2s_both]">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep === 1 ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 transition-all duration-300 ${
              currentStep === 2 ? 'bg-purple-600' : 'bg-white/20'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep === 2 ? 'bg-purple-600 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Basic Info</span>
            <span>Security</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 animate-[slideInRight_0.8s_ease-out]">
          {currentStep === 1 ? (
            // Step 1: Basic Information
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.2s_both]">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-200">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.3s_both]">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Birth Date Field */}
              <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.5s_both]">
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-200">
                  Birth Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStep1Valid}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:bg-white hover:from-white hover:to-white hover:text-purple-700 hover:shadow-[0_0_10px_rgba(255,105,180,0.8),0_0_20px_rgba(255,105,180,0.6),0_0_30px_rgba(255,105,180,0.4)] animate-[slideInLeft_0.6s_ease-out_0.6s_both] flex items-center justify-center"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          ) : (
            // Step 2: Security Information
            <div className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.2s_both]">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2 animate-[slideInLeft_0.6s_ease-out_0.3s_both]">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                <input
                  id="agreedToTerms"
                  name="agreedToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded bg-white/10 mt-1"
                />
                <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent animate-[slideInLeft_0.6s_ease-out_0.5s_both] flex items-center justify-center hover:bg-white hover:text-purple-700 hover:shadow-[0_0_10px_rgba(255,105,180,0.8),0_0_20px_rgba(255,105,180,0.6),0_0_30px_rgba(255,105,180,0.4)]"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:bg-white hover:from-white hover:to-white hover:text-purple-700 hover:shadow-[0_0_10px_rgba(255,105,180,0.8),0_0_20px_rgba(255,105,180,0.6),0_0_30px_rgba(255,105,180,0.4)] animate-[slideInLeft_0.6s_ease-out_0.6s_both]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="mt-6 mb-6 animate-[slideInLeft_0.6s_ease-out_0.7s_both]">
                <div className="relative">
                  {/*<div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>*/}
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-400">Or sign up with</span>
                  </div>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3 animate-[slideInLeft_0.6s_ease-out_0.8s_both]">
                <button
                  type="button"
                  className="w-full bg-white hover:bg-gray-50 font-bold py-2 px-4 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                >
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </button>
                <button
                  type="button"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition-all duration-200 border border-yellow-500 hover:border-yellow-600 hover:shadow-md"
                >
                  IMDb
                </button>
              </div>
            </div>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-300 animate-[slideInLeft_0.6s_ease-out_1s_both]">
            Already have an account?{' '}
            <a
              href="/Login"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400 animate-[fadeInUp_0.8s_ease-out_1.3s_both]">
          <p>© 2025 MovieAnalytics. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}