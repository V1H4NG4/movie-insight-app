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
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = () => setCurrentStep(2);
  const handleBack = () => setCurrentStep(1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    setApiError('');
    setSuccessMsg('');
  };

  {/*------------register ends---------------------------------------------------------------------------------------------------------*/}
  const sanitizeLetters = (v) => (v || '').replace(/[^A-Za-z]/g, '');

  async function registerGeek() {
    setApiError?.('');
    setSuccessMsg?.('');

    const firstname = (formData.firstName || '').trim();
    const lastname = (formData.lastName || '').trim();
    const email = (formData.email || '').trim().toLowerCase();
    const dateofbirth = (formData.birthDate || '').trim(); // YYYY-MM-DD
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';

    // quick client checks (server validates again)
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    const dobOk = /^\d{4}-\d{2}-\d{2}$/.test(dateofbirth);
    const pwOk = password.length >= 8;
    const match = password === confirmPassword;

    if (!firstname || !lastname) {
        setApiError?.('Please enter your first and last name.');
        return;
    }
    if (!emailOk) {
        setApiError?.('Please enter a valid email.');
        return;
    }
    if (!dobOk) {
        setApiError?.('Please select your date of birth.');
        return;
    }
    if (!pwOk) {
        setApiError?.('Password must be at least 8 characters.');
        return;
    }
    if (!match) {
        setApiError?.('Passwords do not match.');
        return;
    }
    if (!formData.agreedToTerms) {
        setApiError?.('Please accept the terms.');
        return;
    }

    const payload = {
        firstname,
        lastname,
        email,
        dateofbirth,
        password,
        // optional extras (if you have those fields on the page)
        phone: formData.phone?.trim() || null,
        profile_image_path: formData.profileImagePath?.trim() || null,
        // helps API give nicer message if you pass it
        confirmPassword,
    };

    setIsLoading(true);
    try {
        const res = await fetch('/api/geek/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
        const fieldErr =
            (data && data.errors && Object.values(data.errors)[0]) ||
            data?.message ||
            'Registration failed.';
        setApiError?.(fieldErr);
        return;
        }

        setSuccessMsg?.('Registration successful! You can sign in now.');
        // Optional redirect:
        // setTimeout(() => { window.location.href = '/Login'; }, 800);
    } catch (e) {
        console.error('registerGeek error', e);
        setApiError?.('Network error. Please try again.');
    } finally {
        setIsLoading(false);
    }
    }

    // Keep your button using onClick={handleSubmit}
    const handleSubmit = () => {
    return registerGeek();
    };
    
    {/*------------register ends---------------------------------------------------------------------------------------------------------*/}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.birthDate;

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
      
      {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_1s]"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite_0.5s]"></div>
        </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-[fadeInDown_0.8s_ease-out]">
          <h1 className="text-3xl font-bold text-white mb-2">Join <span className='text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text'>REELEVO</span> for free</h1>
          <p className="text-gray-300">
            {currentStep === 1 ? 'Create your account to get started' : 'Complete your account setup'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 animate-[fadeInDown_0.8s_ease-out_0.2s_both]">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 transition-all duration-300 ${
              currentStep === 2 ? 'bg-blue-600' : 'bg-white/20'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-400'
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
                      pattern="[A-Za-z]+"
                      required
                      value={formData.firstName}
                      onChange={(e)=>{ e.target.value = sanitizeLetters(e.target.value); handleInputChange(e); }}
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
                      pattern="[A-Za-z]+"
                      required
                      value={formData.lastName}
                      onChange={(e)=>{ e.target.value = sanitizeLetters(e.target.value); handleInputChange(e); }}
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
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    value={formData.birthDate}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().slice(0,10)}
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
                className="w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.5s_both] flex items-center justify-center"
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
              {/* Feedback messages */}
                <div aria-live="polite" className="mt-4 space-y-3">
                {apiError ? (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 text-sm p-3">
                    {apiError}
                    </div>
                ) : null}

                {successMsg ? (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm p-3">
                    {successMsg}
                    </div>
                ) : null}
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
              className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text hover:text-orange-300 font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}