"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp,
  Bot,
  HelpCircle,
  MessageCircle,
  LogOut, 
  User, 
  Film, 
  Camera,
  Star,
  Play,
  Eye,
  Target,
  Lightbulb,
  Award,
  BarChart3,
  Brain,
  Sparkles,
  Mail,
  Send,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function FilmmakerDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModelSelect = (modelName) => {
    setSelectedModel(modelName);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      alert("Thank you for your feedback! We'll review it shortly.");
      setFeedbackText('');
    }
  };

  // Assistant (Marketing Predictor) state
  const [budget, setBudget] = useState("");
  const [boxOffice, setBoxOffice] = useState("");
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [marketingResult, setMarketingResult] = useState(null);

  const handleMarketingPredict = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predictMarketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: parseFloat(budget),
          box_office: parseFloat(boxOffice),
          genre_1: genre1,
          genre_2: genre2 || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMarketingResult(data.predicted_marketing);
      } else {
        alert(data.detail || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };


  const renderHomeContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-900/50 p-8 border border-purple-500/20">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome back, Director!</h2>
              <p className="text-purple-200">Ready to bring your cinematic vision to life?</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      

      {/* Vision & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Our Vision</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            To revolutionize filmmaking by providing cutting-edge AI tools that empower creators to predict audience engagement, 
            optimize production decisions, and bring extraordinary stories to life with unprecedented precision and creativity.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Our Mission</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            We bridge the gap between artistic vision and commercial success by leveraging advanced analytics and AI-driven insights, 
            enabling filmmakers to make informed decisions while preserving their creative integrity.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('forecastor')}
            className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all duration-300 text-left"
          >
            <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white font-semibold">Explore Forecast</h4>
            <p className="text-gray-400 text-sm">Predict your film's success</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('assistant')}
            className="p-4 bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/30 rounded-lg hover:border-blue-400/50 transition-all duration-300 text-left"
          >
            <Bot className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white font-semibold">Assistant</h4>
            <p className="text-gray-400 text-sm">Get creative guidance</p>
          </button>
          
          <button 
            onClick={() => setActiveTab('contact')}
            className="p-4 bg-gradient-to-r from-green-600/20 to-yellow-600/20 border border-green-500/30 rounded-lg hover:border-green-400/50 transition-all duration-300 text-left"
          >
            <MessageCircle className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white font-semibold">Get Support</h4>
            <p className="text-gray-400 text-sm">Contact our team</p>
          </button>
        </div>
      </div>
    </div>
  );

  
const renderForecastorContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Select the Preferred Model</h2>
      </div>

      <motion.div
            className="mt-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* SYNCDCATOR */}
              <div className="text-center">
              <Link href="/Syncdicator" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("SYNCDCATOR")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "SYNCDCATOR" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                      <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/sync.png"
                        alt="MARVELORE"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">SYNCDCATOR</h3>
                  <p className="text-gray-400 text-sm">Well trained for DC related movies.</p>
                </div>
              </div>

              {/* MARVEL-LORE */}
              <div className="text-center">
                <Link href="/Marvellore" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("MARVELORE")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "MARVELORE" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/MARVELORE.png"
                        alt="MARVELORE"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">MARVEL-LORE</h3>
                  <p className="text-gray-400 text-sm">Marvel-lore is a model specialy trained for Marvel movies</p>
                </div>
              </div>

              {/* Jurassic Ark */}
              <div className="text-center">
                <Link href="/JurassicArk" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("jurassic Ark")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "jurassic Ark" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/JurassicArk.png"
                        alt="Jurassic Ark"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">Jurassic Ark</h3>
                  <p className="text-gray-400 text-sm">Jurassic Ark model is capable of predicting Jurassic Park franchise</p>
                </div>
              </div>

              {/* TraceFormer */}
              <div className="text-center">
                <Link href="/TraceFormer" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("TraceFormer")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "TraceFormer" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/TraceFormer.png"
                        alt="TraceFormer"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">TraceFormer</h3>
                  <p className="text-gray-400 text-sm">TraceFormer is a model trained for Transformers.</p>
                </div>
              </div>

              {/* StarHack */}
              <div className="text-center">
                <Link href="/StarHacks" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("StarHack")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "StarHack" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/starhack.png"
                        alt="StarHack"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">STAR-HACK</h3>
                  <p className="text-gray-400 text-sm">StarHack is a model predicts about Star Wars movies.</p>
                </div>
              </div>

              {/* Nemesis */}
              <div className="text-center">
                <Link href="/Nemesis" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("Nemesis")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "Nemesis" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/nemesis.png"
                        alt="The Nemesis"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">Nemesis</h3>
                  <p className="text-gray-400 text-sm">Most powefull and all purpose model</p>
                </div>
              </div>

              {/* The Conjuror */}
              <div className="text-center">
                <Link href="/Conjuror" passHref className="block w-full">
                  <button
                    onClick={() => handleModelSelect("The Conjuror")}
                    className={`relative w-full h-24 bg-transparent border border-gray-600 rounded-xl hover:border-gray-400 transition-all duration-300 group ${
                      selectedModel === "The Conjuror" ? 'ring-2 ring-white border-white' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <Image 
                        src="/Models/conjuror.png"
                        alt="The Nemesis"
                        fill
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </button>
                </Link>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-white mb-1">The Conjuror</h3>
                  <p className="text-gray-400 text-sm">A model highly accurate for Horror movies.</p>
                </div>
              </div>

            </div>
      </motion.div>

      {selectedModel && (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 animate-fade-in">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedModel} Selected
            </h3>
            <p className="text-gray-300 mb-6">
              Ready to analyze your project with advanced AI insights
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-lg text-white font-medium transition-all duration-200">
              Start Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAssistantContent = () => (
  <motion.div 
    className="p-6 max-w-4xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Logo Section - Place this right after the opening motion.div */}
    <motion.div 
      className="flex justify-center mb-1"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src="/Models/marketor.png"
          alt="Marketor"
          width={750} d
          height={312} 
          className="object-contain filter drop-shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>

    {/* Header Section */}
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <div className="inline-flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
          Marketing Predictor
        </h2>
      </div>
      <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
        Leverage AI to estimate optimal marketing budgets based on production details and genre analysis.
      </p>
    </motion.div>

    {/* Input Fields */}
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Budget Input */}
      <motion.div 
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <label className="block text-sm font-medium text-zinc-300 mb-2 group-hover:text-white transition-colors">
          Production Budget
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-sm">$</span>
          </div>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="0.00"
            className="w-full pl-8 pr-12 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     text-white placeholder-zinc-500 transition-all duration-200
                     hover:border-zinc-600 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-sm">M</span>
          </div>
        </div>
      </motion.div>

      {/* Box Office Input */}
      <motion.div 
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <label className="block text-sm font-medium text-zinc-300 mb-2 group-hover:text-white transition-colors">
          Expected Box Office
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-sm">$</span>
          </div>
          <input
            type="number"
            value={boxOffice}
            onChange={(e) => setBoxOffice(e.target.value)}
            placeholder="0.00"
            className="w-full pl-8 pr-12 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     text-white placeholder-zinc-500 transition-all duration-200
                     hover:border-zinc-600 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-zinc-400 text-sm">M</span>
          </div>
        </div>
      </motion.div>

      {/* Primary Genre */}
      <motion.div 
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <label className="block text-sm font-medium text-zinc-300 mb-2 group-hover:text-white transition-colors">
          Primary Genre
        </label>
        <div className="relative">
          <select
            value={genre1}
            onChange={(e) => setGenre1(e.target.value)}
            className="w-full appearance-none py-3 px-4 pr-10 rounded-xl bg-zinc-900/50 border border-zinc-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     text-white transition-all duration-200
                     hover:border-zinc-600 backdrop-blur-sm cursor-pointer"
          >
            <option value="" className="bg-zinc-800">-- Select Primary Genre --</option>
            <option value="Action" className="bg-zinc-800">Action</option>
            <option value="Adventure" className="bg-zinc-800">Adventure</option>
            <option value="Animation" className="bg-zinc-800">Animation</option>
            <option value="Comedy" className="bg-zinc-800">Comedy</option>
            <option value="Crime" className="bg-zinc-800">Crime</option>
            <option value="Drama" className="bg-zinc-800">Drama</option>
            <option value="Fantasy" className="bg-zinc-800">Fantasy</option>
            <option value="Horror" className="bg-zinc-800">Horror</option>
            <option value="Mystery" className="bg-zinc-800">Mystery</option>
            <option value="Romance" className="bg-zinc-800">Romance</option>
            <option value="Sci-Fi" className="bg-zinc-800">Sci-Fi</option>
            <option value="Thriller" className="bg-zinc-800">Thriller</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Secondary Genre */}
      <motion.div 
        className="group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <label className="block text-sm font-medium text-zinc-300 mb-2 group-hover:text-white transition-colors">
          Secondary Genre
        </label>
        <div className="relative">
          <select
            value={genre2}
            onChange={(e) => setGenre2(e.target.value)}
            className="w-full appearance-none py-3 px-4 pr-10 rounded-xl bg-zinc-900/50 border border-zinc-700 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
                     text-white transition-all duration-200
                     hover:border-zinc-600 backdrop-blur-sm cursor-pointer"
          >
            <option value="" className="bg-zinc-800">-- None --</option>
            <option value="Action" className="bg-zinc-800">Action</option>
            <option value="Adventure" className="bg-zinc-800">Adventure</option>
            <option value="Animation" className="bg-zinc-800">Animation</option>
            <option value="Comedy" className="bg-zinc-800">Comedy</option>
            <option value="Crime" className="bg-zinc-800">Crime</option>
            <option value="Drama" className="bg-zinc-800">Drama</option>
            <option value="Fantasy" className="bg-zinc-800">Fantasy</option>
            <option value="Horror" className="bg-zinc-800">Horror</option>
            <option value="Mystery" className="bg-zinc-800">Mystery</option>
            <option value="Romance" className="bg-zinc-800">Romance</option>
            <option value="Sci-Fi" className="bg-zinc-800">Sci-Fi</option>
            <option value="Thriller" className="bg-zinc-800">Thriller</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* Predict Button */}
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <motion.button
        onClick={handleMarketingPredict}
        className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                 hover:from-indigo-700 hover:to-purple-700 text-white font-medium 
                 shadow-lg hover:shadow-xl transition-all duration-200
                 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none
                 min-w-[200px]"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Generate Prediction</span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 
                      group-hover:opacity-20 transition-opacity duration-200 blur"></div>
      </motion.button>
    </motion.div>

    {/* Result Card */}
    {marketingResult !== null && (
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
        <div className="relative p-6 rounded-2xl bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-300 mb-1">Predicted Marketing Budget</p>
              <div className="flex items-baseline gap-2">
                <motion.p 
                  className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                >
                  ${marketingResult.toFixed(2)}M
                </motion.p>
                <span className="text-sm text-zinc-400">USD</span>
              </div>
            </div>
            <motion.div 
              className="text-green-400"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
          </div>
          
          {/* Additional Info */}
          <motion.div 
            className="mt-4 pt-4 border-t border-zinc-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Confidence: High</span>
              <span>Based on genre and budget analysis</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </motion.div>
);


  const renderHowToUseContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">How to Use Our Platform</h2>
        <p className="text-gray-400 text-lg">Master the tools that will transform your filmmaking journey</p>
      </div>

      <div className="space-y-6">
        {[
          {
            step: "01",
            title: "Start with Your Project",
            description: "Upload your script, treatment, or project details to begin the analysis process.",
            icon: <Film className="w-8 h-8" />,
            color: "purple"
          },
          {
            step: "02",
            title: "Choose Your Model",
            description: "Select from our suite of AI models based on what insights you need most.",
            icon: <TrendingUp className="w-8 h-8" />,
            color: "blue"
          },
          {
            step: "03",
            title: "Get AI Insights",
            description: "Receive detailed predictions and recommendations powered by advanced algorithms.",
            icon: <Brain className="w-8 h-8" />,
            color: "green"
          },
          {
            step: "04",
            title: "Refine & Optimize",
            description: "Use our AI assistant to iterate and improve your project based on the insights.",
            icon: <Sparkles className="w-8 h-8" />,
            color: "yellow"
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-start space-x-6">
              <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-${item.color}-600 to-${item.color}-700 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className={`text-${item.color}-400 mr-3`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
        <p className="text-gray-300 mb-6">Join thousands of filmmakers who are already using AI to create better films.</p>
        <button 
          onClick={() => setActiveTab('forecastor')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-lg text-white font-medium transition-all duration-200"
        >
          Start Your First Prediction
        </button>
      </div>
    </div>
  );

  const renderContactContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Contact & Support</h2>
        <p className="text-gray-400 text-lg">We're here to help you succeed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-purple-400" />
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">Support Email</h4>
                <p className="text-purple-300">support@filmmakerAI.com</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Business Inquiries</h4>
                <p className="text-purple-300">business@filmmakerAI.com</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Response Time</h4>
                <p className="text-gray-300">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">FAQ</h3>
            <div className="space-y-3">
              {[
                "How accurate are the predictions?",
                "Can I use this for short films?",
                "What data do you need from me?",
                "How much does it cost?"
              ].map((question, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200"
                >
                  <p className="text-gray-300 text-sm">{question}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-400" />
            Send Feedback
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Your Message</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us about your experience, suggestions, or report any issues..."
                rows={6}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
                <option>General Feedback</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Support Question</option>
              </select>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'forecastor': return renderForecastorContent();
      case 'assistant': return renderAssistantContent();
      case 'howto': return renderHowToUseContent();
      case 'contact': return renderContactContent();
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

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
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
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">REELEVO</h1>
          <p className="text-purple-300 text-sm">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'forecastor', label: 'Forecastor', icon: TrendingUp },
            { id: 'assistant', label: 'Assistant', icon: Bot },
            { id: 'howto', label: 'How to Use', icon: HelpCircle },
            { id: 'contact', label: 'Contact', icon: MessageCircle }
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