"use client";

import { useState, useEffect } from 'react';
import { Film, Camera, Code, Sparkles, Play } from 'lucide-react';

export default function WelcomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Show welcome message for 3 seconds, then fade out
    const timer = setTimeout(() => {
      setShowWelcome(false);
      // Show question after welcome fades out
      setTimeout(() => {
        setShowQuestion(true);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Here you would typically navigate to the next page or update user preferences
    setTimeout(() => {
      alert(`You selected: ${option}`);
    }, 500);
  };

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
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .ticket-shape {
          position: relative;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%);
          border-radius: 8px;
          overflow: visible;
        }

        .ticket-shape::before,
        .ticket-shape::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 25px;
          height: 25px;
          background: #5a0d6dff;
          border-radius: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .ticket-shape::before {
          left: -10px;
        }

        .ticket-shape::after {
          right: -10px;
        }

        .ticket-perforation {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 4px,
            rgba(255, 255, 255, 0.3) 4px,
            rgba(255, 255, 255, 0.3) 8px
          );
        }

        .ticket-shape-blue {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 197, 253, 0.9) 100%);
        }

        .ticket-stub {
          position: absolute;
          right: 25%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(255, 255, 255, 0.4) 3px,
            rgba(255, 255, 255, 0.4) 6px
          );
        }
      `}</style>
      
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-[rotateHue_20s_linear_infinite]"></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-[sparkle_3s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white rounded-full animate-[sparkle_3s_ease-in-out_infinite_0.5s]"></div>
      </div>

      <div className="relative w-full max-w-4xl z-10">
        {/* Welcome Message */}
        {showWelcome && (
          <div className={`text-center ${showWelcome ? 'animate-[fadeIn_1s_ease-out]' : 'animate-[fadeOut_0.5s_ease-out]'}`}>
            <div className="flex items-center justify-center mb-8 animate-[float_3s_ease-in-out_infinite]">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-3xl animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_40px_rgba(147,51,234,0.6)]">
                  <Film className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-7 h-7 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-[float_4s_ease-in-out_infinite]">
                Welcome to
              </h1>
              <div className="relative">
                <h2 className="text-9xl text-white mb-8 tracking-wider font-mono"> 
                    REELEVO
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent opacity-80"></div>
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-gray-300 text-lg font-medium">Your journey through the depths of Cinema begins here.</p>
          </div>
        )}

        
        {/* Question Section */}
        {showQuestion && (
          <div className="text-center animate-[slideInUp_0.8s_ease-out]">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Play className="w-14 h-14 text-purple-400 mr-4 animate-pulse rotate-45" />
                <h1 className="text-6xl font-bold text-white leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  What's your story?
                </h1>
                <Play className="w-14 h-14 text-blue-400 ml-3 animate-pulse transform rotate-135" />
              </div>
              <p className="text-lg text-gray-300 max-w-xl mx-auto font-light">
                Choose your path and let us craft the perfect experience for you
              </p>
            </div>

            {/* Movie Ticket Options */}
            <div className="relative max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8">
                {/* Filmmaker Ticket */}
                <button
                  onClick={() => handleOptionSelect('Im a filmmaker')}
                  className={`group relative ticket-shape h-40 transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] focus:outline-none focus:ring-4 focus:ring-purple-500/50 ${
                    selectedOption === 'Im a filmmaker' ? 'scale-105 shadow-[0_0_40px_rgba(147,51,234,0.8)]' : ''
                  }`}
                >
                  <div className="ticket-stub"></div>
                  <div className="relative z-10 h-full flex items-center justify-center px-8">
                    <div className="flex items-center space-x-6">
                      <div className="relative flex-shrink-0">
                        <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                          <Camera className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-1 tracking-wide text-white">I'm a Filmer</h3>
                        <p className="text-purple-100 text-sm leading-relaxed">
                          Get analics and insights.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ticket number on the right */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-center">
                    <div className="text-white text-xs font-mono mb-1 transform -rotate-90">ADMIT ONE</div>
                  </div>
                </button>

                {/* Geek Ticket */}
                <button
                  onClick={() => handleOptionSelect('Im a geek')}
                  className={`group relative ticket-shape ticket-shape-blue h-40 transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                    selectedOption === 'Im a geek' ? 'scale-105 shadow-[0_0_40px_rgba(59,130,246,0.8)]' : ''
                  }`}
                >
                  <div className="ticket-stub"></div>
                  <div className="relative z-10 h-full flex items-center justify-center px-8">
                    <div className="flex items-center space-x-6">
                      <div className="relative flex-shrink-0">
                        <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                          <Code className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-1 tracking-wide text-white">I'm a Geek</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          Plan your month.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ticket number on the right */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-center">
                    <div className="text-white text-xs font-mono mb-1 transform -rotate-90">ADMIT ONE</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {showQuestion && (
          <div className="mt-24 text-center text-base text-gray-400 animate-[fadeIn_0.8s_ease-out_1s_both]">
            <p>© 2025 <span className="text-white">REELEVO. </span> All rights reserved.</p>
          </div>
        )}
      </div>
    </div>
  );
}
