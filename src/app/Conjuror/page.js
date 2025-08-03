"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showMainPage, setShowMainPage] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
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
          {/* Logo Section */}
          <div className="mb-16">
            <div className="relative">             
                <Image
                  src="/Models/conjuror.png"
                  alt="Conjuror Model"
                  width={750}
                  height={163}
                  priority
                  className="object-contain"
                />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto animate-[fadeIn_1s_ease-out_0.5s_both]">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-5 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              About The Conjuror Model
            </h1>
            <div className="mb-12">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Syncdicator is a powerfull model trained to forecast insights of movies produced by DC Studios. After tracking and analysing all the movies of the new era, DCEU and the other Else World movies by the studio Syndicator is capable of predicting the Box Office hunt of the movies under trademark of DC. 
              </p>
            </div>

            {/* Call to Action 
            <div className="space-y-6">
              <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] focus:outline-none focus:ring-4 focus:ring-purple-500/50">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
            </div>*/}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-400 via-yellow-950 to-orange-800 flex items-center justify-center p-4 relative overflow-hidden">
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
                src="/Models/conjuror.png"
                alt="conjuror"
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