"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Film, 
  TrendingUp, 
  Users, 
  Calendar, 
  BarChart3, 
  Star, 
  Menu, 
  X, 
  Play, 
  Target,
  Heart,
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function MovieAnalyticsHome() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  

  const faqData = [
    {
      question: "What is Reel Rebel?",
      answer: "Reel Rebel is a comprehensive movie analytics platform that helps film enthusiasts track, analyze, and plan their movie experiences. Our platform offers detailed insights into movie trends, personalized recommendations, and powerful planning tools."
    },
    {
      question: "How does the free account work?",
      answer: "Free accounts get access to basic movie planning features, including watchlists, basic analytics, and movie discovery tools. You can track up to 100 movies and get personalized recommendations based on your viewing history."
    },
    {
      question: "What additional features come with premium?",
      answer: "Premium accounts unlock advanced analytics, unlimited movie tracking, detailed statistics, export capabilities, social features, and priority customer support. You also get access to exclusive content and early feature releases."
    },
    {
      question: "Can I export my data?",
      answer: "Yes! Premium users can export their movie data in various formats including CSV, JSON, and PDF reports. This allows you to backup your data or use it in other applications."
    },
    {
      question: "How accurate are the movie recommendations?",
      answer: "Our recommendation engine uses advanced algorithms that analyze your viewing patterns, ratings, and preferences. The more you use the platform, the more accurate and personalized your recommendations become."
    }
  ];

  const renderNavbar = () => (
    <nav className="bg-black/90 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-white">REELEVO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'contact', 'FAQ'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <Link href="/AccountType">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                Sign up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-purple-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Contact', 'FAQ'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === section
                      ? 'text-purple-400 bg-purple-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <Link href="/AccountType">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    Sign up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Unleash your Blockbuster's
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Analytics</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track, analyze, and plan your production environment like never before.<br/>
              Join the hunt with 
              <span className="font-bold"> PRO</span> and 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold"> Rebel</span> for your 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold"> Reel!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/AccountType">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg">
                  Join PRO now
                </button>
              </Link>
              <Link href="https://www.youtube.com/">
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
                  <Play className="w-5 h-5 inline mr-2" />
                  Watch Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Movie Lovers
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to track, analyze, and discover your perfect movie experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
                title: "Advanced Analytics",
                description: "Deep insights into your viewing patterns, genre preferences, and movie trends"
              },
              {
                icon: <Calendar className="w-8 h-8 text-blue-400" />,
                title: "Movie Planner",
                description: "Plan your movie nights, track upcoming releases, and never miss a premiere"
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-400" />,
                title: "Smart Recommendations",
                description: "AI-powered suggestions based on your taste and viewing history"
              },
              {
                icon: <Users className="w-8 h-8 text-green-400" />,
                title: "Social Features",
                description: "Connect with friends, share reviews, and discover what others are watching"
              },
              {
                icon: <Target className="w-8 h-8 text-red-400" />,
                title: "Goal Tracking",
                description: "Set and track your movie-watching goals and achievement milestones"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
                title: "Trend Analysis",
                description: "Stay ahead of movie trends and discover emerging genres"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "2M+", label: "Movies Tracked" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Join the Reelevo's cinematic
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Community</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track, analyze, and plan your entertaining environment like never before.<br/>
              Join the community with 
              <span className="font-bold"> FREE</span> and feel the
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold"> Joy</span> of your preffered 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold"> Cinematography!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg">
                Sign up now
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20">
                <Play className="w-5 h-5 inline mr-2" />
                Learn more
              </button>
            </div>
          </div>
        </div>

      {/* Featured Movies Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "F1: The Movie", 
            year: "2025", 
            rating: "7.9", 
            genre: "Action", 
            image: "/images/f1.jpg"
          },
          { 
            title: "Lilo and Stitch", 
            year: "2025", 
            rating: "6.9", 
            genre: "Family", 
            image: "/images/lilo.jpg"
          },
          { 
            title: "Superman", 
            year: "2025", 
            rating: "7.6", 
            genre: "Action", 
            image: "/images/superman.png"
          },
          { 
            title: "Jurassic World Rebirth", 
            year: "2025", 
            rating: "6.2", 
            genre: "Sci-Fi", 
            image: "/images/jwr.jpg"
          }
        ].map((movie, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className="text-yellow-400 text-sm font-bold">★ {movie.rating}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-300 text-sm">{movie.year} • {movie.genre}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Play className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Letterbox Journal Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Movie Journal
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Track your cinematic journey with our Letterbox-inspired logging system
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "Watched", movie: "Blade Runner 2049", time: "2 hours ago", rating: 5 },
                    { action: "Added to Watchlist", movie: "The Grand Budapest Hotel", time: "5 hours ago", rating: null },
                    { action: "Reviewed", movie: "Parasite", time: "1 day ago", rating: 4 }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{activity.action} <span className="text-purple-400">{activity.movie}</span></p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                      {activity.rating && (
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < activity.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Quick Log</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Search for a movie to log..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rating:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-600 hover:text-yellow-400 cursor-pointer transition-colors" />
                      ))}
                    </div>
                  </div>
                  <textarea 
                    placeholder="Write your review..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    Log Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Releases Section */}
      <div className="bg-black/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay ahead of the curve with upcoming releases and set reminders for your most anticipated films
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Avatar 3", director: "James Cameron", date: "Dec 2025", interest: "92%" },
              { title: "Marvel's Fantastic Four", director: "Matt Shakman", date: "May 2025", interest: "87%" },
              { title: "Mission: Impossible 8", director: "Christopher McQuarrie", date: "Jun 2025", interest: "89%" }
            ].map((movie, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <span className="text-green-400 font-medium">{movie.interest} interested</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                <p className="text-gray-300 mb-1">Directed by {movie.director}</p>
                <p className="text-purple-400 font-medium mb-4">{movie.date}</p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 border border-white/20">
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Community
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Connect with fellow movie enthusiasts, share reviews, and discover new films together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Discussion Forums</h3>
              <p className="text-gray-300 mb-4">Join conversations about your favorite movies, directors, and genres</p>
              <button className="text-purple-400 hover:text-purple-300 font-medium">Join Discussions →</button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <MessageCircle className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Movie Clubs</h3>
              <p className="text-gray-300 mb-4">Create or join movie clubs with shared viewing schedules and discussions</p>
              <button className="text-purple-400 hover:text-purple-300 font-medium">Explore Clubs →</button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <Heart className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Lists & Collections</h3>
              <p className="text-gray-300 mb-4">Create and share curated movie lists with the community</p>
              <button className="text-purple-400 hover:text-purple-300 font-medium">Browse Lists →</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Movie Journey?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of movie lovers who trust Reel Rebel to track, analyze, and enhance their cinematic experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg text-lg">
              Start Free Trial
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Reelevo.io</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're passionate about movies and data, bringing you the ultimate platform for movie analytics and planning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-gray-300 mb-6">
              At Reelevo, we believe every filmmaker deserves deep insights into their productions. 
              We're building the most comprehensive movie analytics platform that helps you understand your preferences, 
              discover new films, and fans to plan their perfect movie experiences.
            </p>
            <div className="space-y-4">
              {[
                { icon: <Heart className="w-5 h-5 text-red-400" />, text: "Passion for Cinema" },
                { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: "Cutting-edge Technology" },
                { icon: <Users className="w-5 h-5 text-green-400" />, text: "Community Driven" }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  {item.icon}
                  <span className="ml-3 text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">What We Offer</h3>
            <div className="space-y-4">
              {[
                "Advanced movie analytics and insights",
                "Personalized recommendation engine",
                "Comprehensive movie planning tools",
                "Social features for movie enthusiasts",
                "Goal tracking and achievement system",
                "Trend analysis and discovery features"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to our team anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              {[
                { icon: <Mail className="w-6 h-6 text-purple-400" />, title: "Email", content: "hello@reelevo.io" },
                { icon: <Phone className="w-6 h-6 text-blue-400" />, title: "Phone", content: "+94 (07) 7478-5740" },
                { icon: <MapPin className="w-6 h-6 text-green-400" />, title: "Address", content: "123 Movie Street, Cinema City, CC 12345" }
              ].map((contact, index) => (
                <div key={index} className="flex items-start">
                  {contact.icon}
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{contact.title}</h4>
                    <p className="text-gray-300">{contact.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your message..."
                />
              </div>
              <button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                onClick={() => alert('Message sent! We\'ll get back to you soon.')}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Reelevo and our movie analytics platform
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">Still have questions?</p>
          <button 
            onClick={() => setActiveSection('contact')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 inline-flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {renderNavbar()}
      {activeSection === 'home' && renderHome()}
      {activeSection === 'about' && renderAbout()}
      {activeSection === 'contact' && renderContact()}
      {activeSection === 'FAQ' && renderFAQ()}
    </div>
  );
}