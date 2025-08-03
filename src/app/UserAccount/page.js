"use client";

import { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Heart, 
  BookOpen, 
  Settings, 
  LogOut, 
  User, 
  Film, 
  Clock, 
  Star,
  Plus,
  Search,
  Filter,
  Play,
  Eye,
  Bookmark,
  TrendingUp,
  Award,
  Popcorn
} from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  // Sample data
  const [watchlist, setWatchlist] = useState([
    { id: 1, title: "Dune: Part Two", genre: "Sci-Fi", year: 2024, rating: 8.5, image: "🌌" },
    { id: 2, title: "Oppenheimer", genre: "Biography", year: 2023, rating: 8.3, image: "💥" },
    { id: 3, title: "The Batman", genre: "Action", year: 2022, rating: 7.8, image: "🦇" }
  ]);

  const [calendar, setCalendar] = useState([
    { id: 1, title: "Avatar 3", date: "2025-12-19", type: "release", genre: "Sci-Fi" },
    { id: 2, title: "Marvel Movie Night", date: "2025-01-25", type: "personal", genre: "Action" },
    { id: 3, title: "Sundance Film Festival", date: "2025-01-23", type: "event", genre: "Various" }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Watched", title: "Inception", time: "2 hours ago", rating: 9 },
    { id: 2, action: "Added to Wishlist", title: "Interstellar", time: "1 day ago" },
    { id: 3, action: "Reviewed", title: "The Dark Knight", time: "3 days ago", rating: 10 }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const addToWatchlist = () => {
    // Placeholder function
    alert("Add to Watchlist functionality would be implemented here");
  };

  const renderHomeContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-900/50 p-8 border border-purple-500/20">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome back, John!</h2>
              <p className="text-purple-200">Ready for your next cinematic adventure?</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Film className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Movies Watched</p>
              <p className="text-2xl font-bold text-white">247</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Hours Watched</p>
              <p className="text-2xl font-bold text-white">1,243</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/40 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Rating</p>
              <p className="text-2xl font-bold text-white">8.4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-600/20 rounded-lg">
              <Heart className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Wishlist Items</p>
              <p className="text-2xl font-bold text-white">{watchlist.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                {activity.action === 'Watched' && <Play className="w-5 h-5 text-white" />}
                {activity.action === 'Added to Wishlist' && <Heart className="w-5 h-5 text-white" />}
                {activity.action === 'Reviewed' && <Star className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="text-purple-300">{activity.action}</span> {activity.title}
                  {activity.rating && (
                    <span className="ml-2 text-yellow-400">★ {activity.rating}/10</span>
                  )}
                </p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalendarContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Movie Calendar</h2>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Event
        </button>
      </div>
      
      <div className="grid gap-4">
        {calendar.map((event) => (
          <div key={event.id} className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${
                  event.type === 'release' ? 'bg-green-500' : 
                  event.type === 'personal' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-400">{event.genre} • {event.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.type === 'release' ? 'bg-green-500/20 text-green-400' :
                  event.type === 'personal' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlistContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Wishlist</h2>
        <div className="flex space-x-3">
          <button className="bg-gray-800/50 border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-lg text-white transition-all duration-200">
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </button>
          <button onClick={addToWatchlist} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Movie
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.map((movie) => (
          <div key={movie.id} className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition-all duration-300 group">
            <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-6xl">
              {movie.image}
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2">{movie.title}</h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-purple-300 text-sm">{movie.genre} • {movie.year}</span>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm">{movie.rating}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200">
                  <Eye className="w-4 h-4 inline mr-1" />
                  Watch
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-all duration-200">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlannerContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Movie Planner</h2>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200">
          <Plus className="w-4 h-4 inline mr-2" />
          Create Plan
        </button>
      </div>
      
      {/* Monthly Goals */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-400" />
          Monthly Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Film className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Movies to Watch</p>
            <p className="text-2xl font-bold text-white">12 / 15</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Reviews to Write</p>
            <p className="text-2xl font-bold text-white">8 / 10</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full flex items-center justify-center">
              <Popcorn className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Cinema Visits</p>
            <p className="text-2xl font-bold text-white">3 / 5</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Plan */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">This Week's Plan</h3>
        <div className="space-y-3">
          {[
            { day: "Monday", movie: "The Shawshank Redemption", time: "8:00 PM", duration: "2h 22m" },
            { day: "Wednesday", movie: "Pulp Fiction", time: "7:30 PM", duration: "2h 34m" },
            { day: "Friday", movie: "The Dark Knight", time: "9:00 PM", duration: "2h 32m" },
            { day: "Sunday", movie: "Inception", time: "6:00 PM", duration: "2h 28m" }
          ].map((plan, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{plan.movie}</p>
                  <p className="text-gray-400 text-sm">{plan.day} • {plan.time}</p>
                </div>
              </div>
              <span className="text-purple-300 text-sm">{plan.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Display Name</label>
              <input 
                type="text" 
                defaultValue="John Doe" 
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com" 
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Email Notifications</span>
              <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Dark Mode</span>
              <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Auto-add to Calendar</span>
              <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'calendar': return renderCalendarContent();
      case 'wishlist': return renderWishlistContent();
      case 'planner': return renderPlannerContent();
      case 'settings': return renderSettingsContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex overflow-hidden">
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .nav-item {
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          transform: translateX(8px);
        }

        .nav-item.active {
          background: linear-gradient(90deg, rgba(147, 51, 234, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
          border-left: 4px solid #9333ea;
        }
      `}</style>
      
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse"></div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-purple-500/20 p-6 flex flex-col relative z-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl animate-pulse">
              <Film className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">REELEVO</h1>
          <p className="text-purple-300 text-sm">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'planner', label: 'Planner', icon: BookOpen },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === item.id 
                    ? 'active text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <Link href="/" passHref>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 transition-all duration-300 group">
            <LogOut className="w-5 h-5 group-hover:text-red-400" />
            <span className="font-medium">Logout</span>
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto relative z-10">
        {renderContent()}
      </div>
    </div>
  );
}
