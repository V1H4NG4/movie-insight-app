'use client'

import { useState, useEffect } from 'react'
import { Play, TrendingUp, DollarSign, BarChart3, Moon, Sun, Star, Zap, Film, Target } from 'lucide-react'

export default function RenderHome() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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
    { value: "500M+", label: "Box Office Predicted", icon: <Film className="w-6 h-6" /> },
    { value: "98%", label: "Accuracy Rate", icon: <Target className="w-6 h-6" /> },
    { value: "150+", label: "Movies Analyzed", icon: <Star className="w-6 h-6" /> },
    { value: "25M+", label: "Marketing Optimized", icon: <Zap className="w-6 h-6" /> }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-purple-100 dark:border-purple-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MovieInsight
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">Home</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">About</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">Contact</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">FAQ</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

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
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Start Predicting
              </button>
              <button className="px-8 py-4 border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-2xl font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200">
                Watch Demo
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
              Movie Business?
            </span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join industry leaders who trust MovieInsight for data-driven decision making
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Start Free Trial
            </button>
            <button className="px-10 py-4 border-2 border-white/50 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-200">
              Schedule Demo
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