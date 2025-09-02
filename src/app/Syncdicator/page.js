"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register( ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showMainPage, setShowMainPage] = useState(false);

  const [form, setForm] = useState({ Budget: '', Runtime: '', Rating: '' });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const averageBoxOffice = 506250000;
  const maxBoxOffice = 1152000000;
  const minBoxOffice = 134000000;

  const getWeeklyBreakdown = (total) => {
  const percentages = [0.35, 0.25, 0.15, 0.10, 0.08, 0.07];
    return percentages.map(p => total * p);
  };

  const weekly = getWeeklyBreakdown(Number(prediction));

  const bep = Number(form.Budget) * 2.5
  const difference = Number(prediction) - bep;

  let status = '';
  let color = '';
  let icon = '';

  if (difference >= 0) {
    status = 'Predicted to be profitable.';
    color = 'text-green-400';
    icon = '✅';
  } else if (Math.abs(difference) <= 15) {
    status = 'Near success.';
    color = 'text-orange-400';
    icon = '🍂';
  } else {
    status = 'Unlikely to be profitable.';
    color = 'text-red-500';
    icon = '❌';
  }

  const isSuccessful = Number(prediction) >= bep;

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

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
  setError(null);
  try {
    const response = await fetch("http://localhost:8000/predictDC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Budget: parseFloat(form.Budget),
        Runtime: parseFloat(form.Runtime),
        Rating: parseFloat(form.Rating)
      })
    });
    const data = await response.json();
    if (response.ok) {
      setPrediction(data.predicted_box_office);
    } else {
      setError("Prediction failed.");
    }
  } catch (err) {
    setError("API call error.");
  }
};

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
                    src="/Models/sync.png"
                    alt="Company Logo"
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
              About Syncdicator Model
            </h1>
            <div className="mb-12">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Syncdicator is a powerfull model trained to forecast insights of movies produced by DC Studios. After tracking and analysing all the movies of the new era, DCEU and the other Else World movies by the studio Syndicator is capable of predicting the Box Office hunt of the movies under trademark of DC. 
              </p>
            </div>
            <div className="bg-white/3 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <label>Budget :
                  <input
                    name="Budget"
                    type="number"
                    placeholder="Budget (USD)"
                    value={form.Budget}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </label>
                <label>Runtime :
                  <input
                    name="Runtime"
                    type="number"
                    placeholder="Runtime (min)"
                    value={form.Runtime}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
                </label>
                <label>Rating : 
                  <input
                    name="Rating"
                    type="number"
                    placeholder="Rating (%)"
                    value={form.Rating}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 text-white font-semibold py-3 px-15 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:from-cyan-300 hover:via-blue-300 hover:to-white hover:text-blue-700 hover:shadow-[0_0_12px_rgba(0,191,255,0.9),0_0_24px_rgba(30,144,255,0.7),0_0_36px_rgba(0,102,204,0.5)] animate-[slideInLeft_0.6s_ease-out_0.5s_both]"
              >
                View Insight
              </button>

              {error && <p className="text-red-500">{error}</p>}


              {prediction && (
                <div className="w-full mt-6">
                  <div className="text-center mb-8">

                    {/* separater */}
                    <div className="col-span-full mt-8">
                      <hr className="border-gray-400 mb-4" />
                      <h2 className="text-2xl font-semibold text-blue-400 mb-6">Box Office Report</h2>
                    </div>

                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      ${Number(prediction).toFixed(1)}M
                    </div>
                    <p className="text-gray-300">Estimated Global Box Office</p>
                  </div>

                  <div className="text-center mb-8">
                    <p className={`text-xl font-semibold ${color} mb-2`}>
                      {icon} {status}
                    </p>
                    <p className="text-gray-300">
                      🎯 Break Even Point: ${bep.toFixed(1)}M | 
                      Difference: {difference >= 0 ? '+' : ''}${difference.toFixed(1)}M
                    </p>
                  </div>

                  {/* Market Comparison & Movie Summary */}
                  <div className="grid md:grid-cols-2 gap-8 mb-18">
                    <div className="bg-gray-800/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 text-center">Market Comparison</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Predicted Box Office</span>
                          <span className="text-purple-400 font-semibold">${Number(prediction).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">DC Average</span>
                          <span className="text-white font-semibold">${(averageBoxOffice / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">DC Maximum</span>
                          <span className="text-white font-semibold">${(maxBoxOffice / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Break Even Point</span>
                          <span className="text-yellow-400 font-semibold">${bep.toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 text-center">Movie Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Budget:</span>
                          <span className="text-white">${form.Budget}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Runtime:</span>
                          <span className="text-white">{form.Runtime} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Rating:</span>
                          <span className="text-white">{form.Rating}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Profit Margin:</span>
                          <span className={`${difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {((difference / Number(form.Budget)) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">ROF Scale:</span>
                          <span className="text-white">{(Number(prediction) / Number(form.Budget)).toFixed(1)}x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className= "h-96 mb-18">
                    <div className="col-span-full mt-8">
                      <hr className="border-gray-400 mb-4" />
                    </div>
                    <Bar
                      data={{
                        labels: ['Max BO', 'Minimum BO', 'Average', 'Predicted'],
                        datasets: [
                          {
                            label: 'Box Office',
                            data: [maxBoxOffice, minBoxOffice, averageBoxOffice, (Number(prediction) * 1000000)],
                            backgroundColor: [
                              'rgba(59, 130, 246, 0.8)',   // Blue-500
                              'rgba(59, 130, 246, 0.6)',   // Blue-500 lighter
                              'rgba(59, 130, 246, 0.4)',   // Blue-500 lightest
                              'rgba(96, 165, 250, 1)'       //Predicted BO
                            ],
                            borderColor: [
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 0.8)',
                              'rgba(59, 130, 246, 0.6)',
                              'rgba(96, 165, 250, 1)'
                            ],
                            borderWidth: 2,
                            borderRadius: 8,
                            borderSkipped: false,
                            barThickness: 80,
                            hoverBackgroundColor: [
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 0.9)',
                              'rgba(59, 130, 246, 0.7)',
                              'rgba(96, 165, 250, 1)'
                            ],
                            hoverBorderColor: 'rgba(255, 255, 255, 0.8)',
                            hoverBorderWidth: 3
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { 
                            display: false 
                          },
                          title: { 
                            display: true, 
                            text: 'Box Office Comparison (Domestic + Global)',
                            color: '#FFFFFF',
                            font: {
                              size: 18,
                              weight: 'bold'
                            },
                            padding: 20
                          },
                          tooltip: {
                            backgroundColor: 'rgba(59, 130, 246, 0.95)',
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            borderColor: 'rgba(96, 165, 250, 1)',
                            borderWidth: 2,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                              label: function(context) {
                                return '$' + (context.parsed.y / 1000000).toFixed(1) + 'M';
                              }
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              color: '#E5E7EB',
                              font: {
                                size: 12,
                                weight: '500'
                              },
                              stepSize: 75000000,
                              callback: function(value) {
                                return '$' + (value / 1000000) + 'M';
                              }
                            },
                            grid: {
                              color: 'rgba(59, 130, 246, 0.2)',
                              lineWidth: 1,
                              drawBorder: false
                            },
                            border: {
                              display: false
                            },
                            suggestedMax: Math.max(1000000000, Math.max(averageBoxOffice, Number(prediction)) * 1.1)
                          },
                          x: {
                            ticks: {
                              color: '#FFFFFF',
                              font: {
                                size: 12,
                                weight: '600'
                              }
                            },
                            grid: {
                              display: false
                            },
                            border: {
                              color: 'rgba(147, 51, 234, 0.3)',
                              width: 2
                            }
                          }
                        },
                        interaction: {
                          intersect: false,
                          mode: 'index'
                        },
                        animation: {
                          duration: 1500,
                          easing: 'easeOutQuart'
                        }
                      }}
                    />
                  </div>

                  
                  <div className="h-98 mb-16">
                    <div className="col-span-full mt-8">
                      <hr className="border-gray-400 mb-4" />
                    </div>
                    <Bar
                      data={{
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                        datasets: [
                          {
                            label: 'Weekly Revenue',
                            data: weekly.map(v => v * 1_000_000),
                            backgroundColor: [
                              'rgba(147, 197, 253, 1)',    // Lightest blue - week1
                              'rgba(96, 165, 250, 0.9)',   // Light blue - week2
                              'rgba(59, 130, 246, 0.7)',   // Medium blue - week3
                              'rgba(37, 99, 235, 0.5)',    // Deep blue - week4
                              'rgba(30, 64, 175, 0.3)',    // Deeper blue - week5
                              'rgba(23, 37, 84, 0.1)'      // Darkest blue -week6
                            ],
                            borderColor: [
                              'rgba(96, 165, 250, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(59, 130, 246, 1)'
                            ],
                            borderWidth: 2,
                            borderRadius: 10,
                            borderSkipped: false,
                            barThickness: 70,
                            hoverBackgroundColor: [
                              'rgba(96, 165, 250, 1)',     // Week 1 - brightest on hover
                              'rgba(59, 130, 246, 1)',     // Week 2 - full opacity on hover
                              'rgba(59, 130, 246, 0.9)',   // Week 3 
                              'rgba(59, 130, 246, 0.7)',   // Week 4
                              'rgba(59, 130, 246, 0.5)',   // Week 5
                              'rgba(59, 130, 246, 0.3)'    // Week 6
                            ],
                            hoverBorderColor: 'rgba(255, 255, 255, 0.9)',
                            hoverBorderWidth: 3
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          title: {
                            display: true,
                            text: 'Weekly Box Office Distribution (Domestic + Global)',
                            color: '#FFFFFF',
                            font: {
                              size: 18,
                              weight: 'bold'
                            },
                            padding: 20
                          },
                          legend: { 
                            display: false 
                          },
                          tooltip: {
                            backgroundColor: 'rgba(59, 130, 246, 0.95)',
                            titleColor: '#FFFFFF',
                            bodyColor: '#FFFFFF',
                            borderColor: 'rgba(96, 165, 250, 1)',
                            borderWidth: 2,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                              label: function(context) {
                                return '$' + (context.parsed.y / 1_000_000).toFixed(1) + 'M';
                              }
                            }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              color: '#E5E7EB',
                              font: {
                                size: 12,
                                weight: '500'
                              },
                              callback: (value) => '$' + (value / 1_000_000).toFixed(0) + 'M'
                            },
                            grid: { 
                              color: 'rgba(147, 51, 234, 0.2)',
                              lineWidth: 1,
                              drawBorder: false
                            },
                            border: {
                              display: false
                            }
                          },
                          x: {
                            ticks: { 
                              color: '#FFFFFF',
                              font: {
                                size: 12,
                                weight: '600'
                              }
                            },
                            grid: { 
                              display: false
                            },
                            border: {
                              color: 'rgba(147, 51, 234, 0.3)',
                              width: 2
                            }
                          }
                        },
                        interaction: {
                          intersect: false,
                          mode: 'index'
                        },
                        animation: {
                          duration: 1800,
                          easing: 'easeOutQuart',
                          delay: (context) => context.dataIndex * 100
                        }
                      }}
                    />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
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
                src="/Models/sync.png"
                alt="Syncdicator"
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