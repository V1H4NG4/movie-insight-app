'use client'

import { useState, useEffect } from 'react'
import { Play, TrendingUp, DollarSign, BarChart3, Star, Zap, Film, Clapperboard, Target, Info, Mail, MessageCircle, Phone, MapPin, MessageSquare, CheckCircle, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link';

export default function RenderHome() {
  const [darkMode, setDarkMode] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null);

  const [activeSection, setActiveSection] = useState('home'); // 'home' | 'about' | 'contact' | 'faq'

  const menu = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' },
    { key: 'faq', label: 'FAQ' },
  ];

  const heroSlides = [
    {
      title: "Predict Box Office Success",
      subtitle: "Advanced AI analytics for movie revenue forecasting",
      gradient: "from-purple-600 to-purple-800"
    },
    {
      title: "Optimize Marketing Spend",
      subtitle: "Data-driven allocation strategies for maximum ROI",
      gradient: "from-purple-700 to-indigo-600"
    },
    {
      title: "Maximize Movie Profits",
      subtitle: "Comprehensive insights for entertainment industry success",
      gradient: "from-indigo-600 to-purple-600"
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "What is REELEVO?",
      answer: "REELEVO is a comprehensive movie analytics platform that helps film enthusiasts track, analyze, and plan their movie experiences. Our platform offers detailed insights into movie trends, personalized recommendations, and powerful planning tools."
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
      answer: "Yes! Filmers can export their movie data in PDF reports. This allows you to backup your data or use it in other applications. Also, it's important to note that we do not keep the prediction data stored in REELEVO due to Privay Policy."
    },
    {
      question: "How accurate are the movie recommendations?",
      answer: "Our recommendation engine uses advanced algorithms that analyze your viewing patterns, ratings, and preferences. The more you use the platform, the more accurate and personalized your recommendations become."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Box Office Prediction",
      description: "AI-powered forecasting with 95% accuracy rate for opening weekend and total revenue predictions."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Marketing Optimization",
      description: "Smart budget allocation across channels to maximize audience reach and engagement."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Real-time tracking and comprehensive reporting on movie performance metrics."
    }
  ]

  const stats = [
    { value: "45K+", label: "Analitics Feeded", icon: <Film className="w-6 h-6" /> },
    { value: "90%", label: "Accuracy Rate", icon: <Target className="w-6 h-6" /> },
    { value: "4K+", label: "Movies Analyzed", icon: <Star className="w-6 h-6" /> },
    { value: "4K+", label: "Marketing Optimized", icon: <Zap className="w-6 h-6" /> }
  ]

  const renderHome = () => (
    <>
      {/* Hero Section */}
        <section className="relative z-10 px-6 pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-8 animate-fade-in">
                <Star className="w-4 h-4 mr-2" />
                AI-Powered Movie Analytics Platform
              </div>
              
              <div className="relative h-32 mb-8">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === currentSlide 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      {slide.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:bg-purple-600 shadow-purple-500/25 transform transition-all duration-300 flex items-center">
                  <Play className="w-5 h-5 mr-2 group-hover:bg-purple-600 transition-transform duration-200" />
                  Start now
                </button>
                <button className="px-8 py-4 border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-2xl font-semibold text-lg hover:bg-purple-600 dark:hover:bg-purple-900/30 transition-all duration-200">
                  Join Community
                </button>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-purple-600 w-8' 
                        : 'bg-purple-300 dark:bg-purple-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-40 left-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-2xl opacity-60 animate-bounce animation-delay-1000"></div>
          <div className="absolute top-60 right-20 w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-xl opacity-60 animate-bounce animation-delay-2000"></div>
          <div className="absolute bottom-40 left-1/4 w-8 h-8 bg-purple-300 dark:bg-purple-700 rounded-lg opacity-60 animate-bounce animation-delay-3000"></div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 px-6 py-16 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4">
                    <div className="text-purple-600 group-hover:scale-110 transition-transform duration-200">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Powerful Features
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Leverage cutting-edge AI and machine learning to make informed decisions about your movie investments
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl border border-purple-100 dark:border-purple-900 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 px-6 py-24 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                Movie Production?
              </span>
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join the best didgtal experts with AI-driven decision making
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <Link href="/Register">
                <button className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
                  JOIN AS FILMER
                </button>
              </Link>
              <button className="px-10 py-4 border-2 border-white/50 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-200">
                JOIN COMMUNITY
              </button>
            </div>
          </div>
          
          {/* Animated elements */}
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white/20 rounded-full animate-spin animation-duration-20000"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-yellow-400/30 rounded-full animate-spin animation-duration-15000"></div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 px-6 py-12 bg-gray-50 dark:bg-gray-900 border-t border-purple-100 dark:border-purple-900">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                MovieInsight
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering the entertainment industry with intelligent analytics
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 MovieInsight. All rights reserved.
            </div>
          </div>
        </footer>
          </>
        
      );

      const renderAbout = () => (
    <div className="min-h-screen relative z-10 px-6 py-20">
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
        <div className="relative z-10 px-6 py-20">
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
      <div className="min-h-screen relative z-10 px-6 py-20">
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
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-100 dark:border-purple-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <Clapperboard className="w-10 h-10 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-400 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              REELEVO
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {menu.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveSection(m.key)}
                className={`text-sm font-medium transition ${
                  activeSection === m.key
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Section switcher */}
      {activeSection === 'home' && renderHome()}
      {activeSection === 'about' && renderAbout()}
      {activeSection === 'contact' && renderContact()}
      {activeSection === 'faq' && renderFAQ()}

      

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-duration-15000 {
          animation-duration: 15s;
        }
        .animation-duration-20000 {
          animation-duration: 20s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}