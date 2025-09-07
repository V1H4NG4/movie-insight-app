"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ML API base (use your env var if set; falls back to local FastAPI)
const ML_API = process.env.NEXT_PUBLIC_ML_API_URL || 'http://127.0.0.1:8000';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showMainPage, setShowMainPage] = useState(false);

  const [nemesisLoading, setNemesisLoading] = useState(false);
  const [nemesisError, setNemesisError] = useState('');
  const [nemesisResult, setNemesisResult] = useState(null);

  const handlePredictNemesis = async () => {
    try {
      setNemesisError('');
      setNemesisLoading(true);

      const payload = {
        budget: Number(form.budget),   // <-- was budgetMillions
        runtime: Number(form.runtime),
        rating: Number(form.rating),            // % value (e.g., 85)
        popularity: Number(form.popularity),
        genre_1: (form.genre_1 || '').trim(),
        genre_2: (form.genre_2 || '').trim() || '',
      };

      if (
        Number.isNaN(payload.budget) ||
        Number.isNaN(payload.runtime) ||
        Number.isNaN(payload.rating) ||
        Number.isNaN(payload.popularity) ||
        !payload.genre_1
      ) throw new Error('Fill budget, runtime, rating, popularity, and primary genre.');

      const res = await fetch(`${ML_API}/predictNemesis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data?.error || 'Prediction failed.');
      setNemesisResult(data.predicted_box_office);
    } catch (e) {
      setNemesisError(e?.message || 'Something went wrong.');
      setNemesisResult(null);
    } finally {
      setNemesisLoading(false);
    }
  };

  {/* ------input fields-------------------------------------------------------------- */}
  // Tweak/extend to match your dataset
  const GENRES = [
    'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary',
    'Drama','Family','Fantasy','History','Horror','Music','Mystery',
    'Romance','Sci-Fi','Sport','Thriller','War','Western'
  ];

  const [form, setForm] = useState({
    title: '',
    year: '',
    budget: '',
    runtime: '',
    popularity: '',
    rating: '',
    genre_1: '',
    genre_2: '',
  });

  // simple setter factory
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // optional: prevent selecting the same genre twice
  const genre2Options = useMemo(
    () => GENRES.filter((g) => g !== form.genre_1),
    [form.genre_1]
);

  useEffect(() => {
    const loadingSteps = [
      { progress: 15, text: 'Loading assets...', delay: 800 },
      { progress: 35, text: 'Connecting to servers...', delay: 1200 },
      { progress: 75, text: 'Optimizing...', delay: 1000 },
      { progress: 90, text: 'Almost ready...', delay: 600 },
      { progress: 100, text: 'Welcome!', delay: 500 }
    ];

    let stepIndex = 0;
    
    const executeStep = () => {
      if (stepIndex < loadingSteps.length) {
        const step = loadingSteps[stepIndex];
        
        setTimeout(() => {
          setProgress(step.progress);
          setLoadingText(step.text);
          
          if (step.progress === 100) {
            setTimeout(() => {
              setShowMainPage(true);
            }, 800);
          } else {
            stepIndex++;
            executeStep();
          }
        }, step.delay);
      }
    };

    executeStep();
  }, []);

  if (showMainPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes rotateHue {
            0% {
              filter: hue-rotate(0deg);
            }
            100% {
              filter: hue-rotate(360deg);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
        
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-[rotateHue_20s_linear_infinite]"></div>
          
          {/* Floating sparkles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_1s]"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite_0.5s]"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute bottom-60 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_2.5s]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <motion.div
            className="mt-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Logo Section */}
            <div className="mb-16">
              <div className="relative">             
                  <Image
                    src="/Models/nemesis.png"
                    alt="Nemesis Model"
                    width={750}
                    height={163}
                    priority
                    className="object-contain"
                  />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >

          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto animate-[fadeIn_1s_ease-out_0.5s_both]">
            <h1 className="text-2xl md:text-4xl font-bold text-blue-400 mb-5 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Nemesis Model
            </h1>
            <div className="mb-12">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                NEMESIS is a powerfull model trained to forecast insights of any industrial movie production. After tracking and analysing all major movies of the era, NEMESIS is capable of predicting the Box Office hunt of the movies under instantly with required inputs. 
              </p>
            </div>
            <div className="bg-white/3 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Movie Name */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Movie Name</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={setField('title')}
                  placeholder="e.g., Guardians of the Galaxy"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Year</label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  value={form.year}
                  onChange={setField('year')}
                  placeholder="e.g., 2023"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Budget</label>
                <input
                  type="number"
                  step="any"
                  value={form.budget}
                  onChange={setField('budget')}
                  placeholder="e.g., 200000000"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Runtime (minutes) */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Runtime (min)</label>
                <input
                  type="number"
                  step="1"
                  value={form.runtime}
                  onChange={setField('runtime')}
                  placeholder="e.g., 148"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Popularity */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Popularity</label>
                <input
                  type="number"
                  step="any"
                  value={form.popularity}
                  onChange={setField('popularity')}
                  placeholder="e.g., 72.5"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Rating (%) */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Rating (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step="0.1"
                  value={form.rating}
                  onChange={setField('rating')}
                  placeholder="e.g., 86"
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Genre 1 */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Genre 1</label>
                <select
                  value={form.genre_1}
                  onChange={setField('genre_1')}
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100"
                >
                  <option value="">Select genre…</option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Genre 2 */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Genre 2 (optional)</label>
                <select
                  value={form.genre_2}
                  onChange={setField('genre_2')}
                  className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-2 text-slate-100"
                >
                  <option value="">None</option>
                  {genre2Options.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <button
                className='bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-15 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.5s_both]'
                onClick={handlePredictNemesis}
                disabled={nemesisLoading}
              >
                {nemesisLoading ? 'Predicting…' : 'Predict (Nemesis RF)'}
              </button>
              {/* Wherever you normally show the prediction output */}
              {nemesisError && (
                <div className="text-red-500 text-sm mt-2">{nemesisError}</div>
              )}

              {typeof nemesisResult === 'number' && (
                <div className="mt-3">
                  {/* Render exactly like your other page’s result block */}
                  <p className="text-sm opacity-80">Predicted Box Office</p>
                  <div className="text-2xl font-semibold">
                    {nemesisResult.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              )}
            </div>


            {/* Call to Action 
            <div className="space-y-6">
              <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] focus:outline-none focus:ring-4 focus:ring-purple-500/50">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
            </div>*/}
          </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes progressFill {
          from {
            width: 0%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Loading Image */}
        <div className="mb-12">
          <div className="relative inline-block">
              <Image
                src="/Models/nemesis.png"
                alt="nemesis"
                width={1500}
                height={625}
                priority
                className="object-contain rounded-2xl"
              />
            
          </div>
        </div>

        {/* Progress Bar Container*/}
        <div className="mb-8 animate-[fadeIn_1s_ease-out_0.3s_both]">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="w-full h-4 bg-gray-800/50 rounded-full border border-white/10 overflow-hidden">
              {/* Progress Bar Fill */}
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"
                  style={{
                    backgroundSize: '200px 100%',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
              </div>
            </div>
            
            {/* Progress Percentage */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full border border-white/20">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6 animate-[fadeIn_1s_ease-out_0.5s_both]">
          <p className="text-white text-lg font-medium mb-2">{loadingText}</p>
        </div>

        {/* Loading Stats */}
        <div className="text-gray-400 text-sm space-y-1 animate-[fadeIn_1s_ease-out_0.7s_both]">
          <p>Loading contents...</p>
          <p className="text-xs opacity-70">This may take a moments</p>
        </div>
      </div>
    </div>
  );
}