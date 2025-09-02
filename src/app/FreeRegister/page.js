"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Film, Mail, Lock, TrendingUp, User, Calendar, ArrowLeft, ArrowRight, Check, Star, Zap } from 'lucide-react';

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    selectedPlan: '', // New field for plan selection
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

  const handlePlanSelect = (planType) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: planType
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Sign up functionality would be implemented here with ${formData.selectedPlan} plan`);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.birthDate;
  const isStep2Valid = formData.selectedPlan;
  const isStep3Valid = formData.password && formData.confirmPassword && formData.agreedToTerms;

  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return 'Create your account to get started';
      case 2: return 'Choose your perfect plan';
      case 3: return 'Complete your account setup';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
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
          <h1 className="text-3xl font-bold text-white mb-2">Join REELEVO</h1>
          <p className="text-gray-300">
            {getStepTitle()}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 animate-[fadeInDown_0.8s_ease-out_0.2s_both]">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 transition-all duration-300 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-white/20'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              2
            </div>
            <div className={`w-12 h-0.5 transition-all duration-300 ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-white/20'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Basic Info</span>
            <span>Plan</span>
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
                className="w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.6s_both] flex items-center justify-center"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          ) : currentStep === 2 ? (
            // Step 2: Plan Selection (COMPACT VERSION)
            <div className="space-y-4">
              <div className="text-center mb-6 animate-[slideInLeft_0.6s_ease-out_0.1s_both]">
                <h2 className="text-1xl font-semibold text-white">Choose Your Plan</h2>
                <p className="text-gray-400 text-sm">Select the plan that works best for you</p>
              </div>

              {/* Plan Options - Compact Grid Layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Plus Plan */}
                <div 
                  onClick={() => handlePlanSelect('plus')}
                  className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 animate-[slideInLeft_0.6s_ease-out_0.2s_both] ${
                    formData.selectedPlan === 'plus' 
                      ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20' 
                      : 'border-white/20 bg-white/5 hover:border-blue-400 hover:bg-blue-400/10'
                  }`}
                >

                  {/* Most Popular Badge - Smaller */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Basic
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-5 h-5 text-blue-400 mr-1" />
                      <h3 className="text-2xl font-semibold text-white">Plus</h3>
                      {formData.selectedPlan === 'plus' && (
                        <Check className="w-4 h-4 text-blue-400 ml-1" />
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-3">For induviduals</p>
                    <div className="text-2xl font-bold text-white">
                      $9.99<span className="text-xs font-normal text-gray-400">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Pro Plan */}
                <div 
                  onClick={() => handlePlanSelect('pro')}
                  className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 animate-[slideInLeft_0.6s_ease-out_0.3s_both] ${
                    formData.selectedPlan === 'pro' 
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20' 
                      : 'border-white/20 bg-white/5 hover:border-purple-400 hover:bg-purple-400/10'
                  }`}
                >
                  {/* Most Popular Badge - Smaller */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Star className="w-5 h-5 text-purple-400 mr-1" />
                      <h3 className="text-2xl font-semibold text-white">Pro</h3>
                      {formData.selectedPlan === 'pro' && (
                        <Check className="w-4 h-4 text-purple-400 ml-1" />
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">For studios</p>
                    <div className="text-2xl font-bold text-white">
                      $19.99<span className="text-xs font-normal text-gray-400">/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent animate-[slideInLeft_0.6s_ease-out_0.4s_both] flex items-center justify-center hover:bg-white/20"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className="flex-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.5s_both] flex items-center justify-center"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ) : (
            // Step 3: Security Information (formerly Step 2)
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

              {/* Selected Plan Summary */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10 animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {formData.selectedPlan === 'pro' ? 
                      <Star className="w-5 h-5 text-purple-400 mr-2" /> : 
                      <Zap className="w-5 h-5 text-blue-400 mr-2" />
                    }
                    <span className="text-white font-medium">
                      {formData.selectedPlan === 'pro' ? 'Pro Plan' : 'Plus Plan'}
                    </span>
                  </div>
                  <span className="text-white font-semibold">
                    {formData.selectedPlan === 'pro' ? '$19.99/mo' : '$9.99/mo'}
                  </span>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start animate-[slideInLeft_0.6s_ease-out_0.5s_both]">
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
                  className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent animate-[slideInLeft_0.6s_ease-out_0.6s_both] flex items-center justify-center hover:bg-white/20"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !isStep3Valid}
                  className="flex-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.7s_both]"
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
            </div>
          )}

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-300 animate-[slideInLeft_0.6s_ease-out_1s_both]">
            Already have an account?{' '}
            <a
              href="/Login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400 animate-[fadeInUp_0.8s_ease-out_1.3s_both]">
        </div>
      </div>
    </div>
  );
}