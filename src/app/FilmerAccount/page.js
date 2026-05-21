"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Bot,
  HelpCircle,
  MessageCircle,
  LogOut,
  Camera,
  Target,
  Lightbulb,
  Brain,
  Sparkles,
  Mail,
  Send,
  Heart,
  Film,
  ChevronRight,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

/* ─── Animation Variants ─────────────────────────────────────────── */
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Stagger wrapper ─────────────────────────────────────────────── */
const StaggerContainer = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
);

/* ─── Ambient background blobs ────────────────────────────────────── */
const AmbientBlobs = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-orange-900/15 blur-[140px]" />
    <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-yellow-900/10 blur-[100px]" />
    {/* Film grain overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
      }}
    />
  </div>
);

/* ─── Sidebar nav item ────────────────────────────────────────────── */
const NavItem = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${active
      ? 'text-amber-300'
      : 'text-zinc-400 hover:text-zinc-100'
      }`}
  >
    {active && (
      <motion.div
        layoutId="nav-pill"
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <div className={`relative transition-transform duration-200 ${active ? '' : 'group-hover:translate-x-0.5'}`}>
      <Icon className={`w-5 h-5 transition-colors duration-200 ${active ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-200'}`} />
    </div>
    <span className="relative font-medium text-sm tracking-wide">{label}</span>
    {active && (
      <ChevronRight className="relative ml-auto w-4 h-4 text-amber-500/60" />
    )}
  </button>
);

/* ─── Section card ────────────────────────────────────────────────── */
const GlassCard = ({ children, className = '', gold = false }) => (
  <motion.div
    variants={cardVariants}
    className={`relative rounded-2xl border backdrop-blur-md ${gold
      ? 'bg-gradient-to-br from-amber-950/40 to-zinc-900/60 border-amber-500/20'
      : 'bg-zinc-900/50 border-zinc-700/40'
      } ${className}`}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════
   TAB CONTENTS
══════════════════════════════════════════════════════════════════ */

/* ─── HOME ────────────────────────────────────────────────────────── */
const HomeContent = ({ setActiveTab }) => (
  <StaggerContainer className="space-y-8">
    {/* Hero */}
    <motion.div
      variants={cardVariants}
      className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 p-10"
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-xl shadow-amber-900/40">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-amber-500/20 blur-md -z-10 animate-pulse" />
        </div>
        <div>
          <p className="text-amber-400/80 text-sm font-mono tracking-widest uppercase mb-1">Welcome Back</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-1">Director's Suite</h2>
          <p className="text-zinc-400">Your cinematic vision, powered by intelligence.</p>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 left-1/3 w-40 h-40 bg-orange-700/10 rounded-full blur-2xl" />
    </motion.div>

    {/* Vision / Mission */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassCard gold className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Vision</h3>
        </div>
        <p className="text-zinc-400 leading-relaxed text-sm">
          To revolutionize filmmaking by providing cutting-edge AI tools that empower creators to predict audience engagement,
          optimize production decisions, and bring extraordinary stories to life with unprecedented precision and creativity.
        </p>
      </GlassCard>

      <GlassCard className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-orange-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Mission</h3>
        </div>
        <p className="text-zinc-400 leading-relaxed text-sm">
          We bridge the gap between artistic vision and commercial success by leveraging advanced analytics and AI-driven insights,
          enabling filmmakers to make informed decisions while preserving their creative integrity.
        </p>
      </GlassCard>
    </div>

    {/* Feature Quick Actions */}
    <GlassCard className="p-7">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-bold text-white">Features</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'forecastor', icon: TrendingUp, label: 'Explore Forecast', desc: "Predict your film's success", color: 'amber' },
          { id: 'assistant', icon: Bot, label: 'Assistant', desc: 'Estimate marketing budgets', color: 'orange' },
          { id: 'contact', icon: MessageCircle, label: 'Get Support', desc: 'Contact our team', color: 'yellow' },
        ].map(({ id, icon: Icon, label, desc, color }) => (
          <motion.button
            key={id}
            onClick={() => setActiveTab(id)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative text-left p-5 rounded-xl border bg-zinc-900/60 hover:bg-zinc-800/60 transition-all duration-300 ${color === 'amber' ? 'border-amber-500/20  hover:border-amber-400/40' :
              color === 'orange' ? 'border-orange-500/20 hover:border-orange-400/40' :
                'border-yellow-500/20 hover:border-yellow-400/40'
              }`}
          >
            <Icon className={`w-7 h-7 mb-3 ${color === 'amber' ? 'text-amber-400' : color === 'orange' ? 'text-orange-400' : 'text-yellow-400'
              }`} />
            <h4 className="text-white font-semibold mb-1">{label}</h4>
            <p className="text-zinc-500 text-xs">{desc}</p>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-all group-hover:translate-x-0.5 duration-200" />
          </motion.button>
        ))}
      </div>
    </GlassCard>
  </StaggerContainer>
);

/* ─── FORECASTOR ──────────────────────────────────────────────────── */
const ForecastorContent = ({ selectedModel, setSelectedModel }) => {
  const models = [
    { id: 'SYNCDCATOR', href: '/Syncdicator', img: '/Models/sync.png', name: 'SYNCDCATOR', desc: 'Well trained for DC related movies.' },
    { id: 'MARVELORE', href: '/Marvellore', img: '/Models/MARVELORE.png', name: 'MARVEL-LORE', desc: 'Specially trained for Marvel movies.' },
    { id: 'jurassic Ark', href: '/JurassicArk', img: '/Models/JurassicArk.png', name: 'Jurassic Ark', desc: 'Predicts Jurassic Park franchise films.' },
    { id: 'TraceFormer', href: '/TraceFormer', img: '/Models/TraceFormer.png', name: 'TraceFormer', desc: 'Trained for Transformers franchise.' },
    { id: 'StarHack', href: '/StarHacks', img: '/Models/starhack.png', name: 'STAR-HACK', desc: 'Predicts Star Wars movie outcomes.' },
    { id: 'Nemesis', href: '/Nemesis', img: '/Models/nemesis.png', name: 'Nemesis', desc: 'Most powerful all-purpose model.' },
    { id: 'The Conjuror', href: '/Conjuror', img: '/Models/conjuror.png', name: 'The Conjuror', desc: 'Highly accurate for Horror movies.' },
  ];

  return (
    <StaggerContainer className="space-y-8">
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center">
        <p className="text-amber-400/70 font-mono text-xs tracking-[0.3em] uppercase mb-3">AI-Powered Analysis</p>
        <h2 className="text-4xl font-black text-white tracking-tight">Select Your Model</h2>
        <p className="text-zinc-500 mt-2 text-sm">Each model is purpose-trained for maximum accuracy in its domain.</p>
      </motion.div>

      {/* Model Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {models.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <Link href={m.href} passHref className="block w-full">
              <motion.button
                onClick={() => setSelectedModel(m.id)}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`relative w-full h-28 rounded-2xl bg-zinc-900/70 border transition-all duration-300 overflow-hidden group ${selectedModel === m.id
                  ? 'border-amber-400/70 shadow-lg shadow-amber-900/30'
                  : 'border-zinc-700/50 hover:border-amber-500/40'
                  }`}
              >
                {selectedModel === m.id && (
                  <motion.div
                    layoutId="model-glow"
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image src={m.img} alt={m.name} fill className="object-contain" />
                  </div>
                </div>
                {/* Shine on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/3 to-transparent" />
              </motion.button>
            </Link>
            <div className="mt-3">
              <h3 className="text-sm font-bold text-white mb-0.5">{m.name}</h3>
              <p className="text-zinc-500 text-xs">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Selection CTA */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <GlassCard gold className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{selectedModel} Selected</h3>
              <p className="text-zinc-400 text-sm mb-6">Ready to analyse your project with advanced AI insights.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 transition-all duration-200"
              >
                Start Analysis
              </motion.button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </StaggerContainer>
  );
};

/* ─── ASSISTANT ───────────────────────────────────────────────────── */
const AssistantContent = () => {
  const [budget, setBudget] = useState('');
  const [boxOffice, setBoxOffice] = useState('');
  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');
  const [marketingResult, setMarketingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];

  const handleMarketingPredict = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/predictMarketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: parseFloat(budget),
          box_office: parseFloat(boxOffice),
          genre_1: genre1,
          genre_2: genre2 || null,
        }),
      });
      const data = await res.json();
      if (res.ok) setMarketingResult(data.predicted_marketing);
      else alert(data.detail || 'Prediction failed');
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full py-3 px-4 rounded-xl bg-zinc-900/70 border border-zinc-700/60
    focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/15 focus:outline-none
    text-white placeholder-zinc-600 transition-all duration-200 hover:border-zinc-600
    text-sm backdrop-blur-sm`;

  return (
    <StaggerContainer className="space-y-8 max-w-3xl mx-auto">
      {/* Marketor logo — kept identical to original */}
      <motion.div
        variants={cardVariants}
        className="flex justify-center"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image
          src="/Models/marketor.png"
          alt="Marketor"
          width={750}
          height={312}
          className="object-contain filter drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Header */}
      <motion.div variants={cardVariants} className="text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-900/30">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Marketing Predictor</h2>
        </div>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Estimate optimal marketing budgets based on production details and genre analysis.
        </p>
      </motion.div>

      {/* Inputs */}
      <GlassCard className="p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Budget */}
          <motion.div variants={cardVariants} className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Production Budget</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
                placeholder="0.00" className={`${inputClass} pl-8 pr-10`} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">M</span>
            </div>
          </motion.div>

          {/* Box Office */}
          <motion.div variants={cardVariants} className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Expected Box Office</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
              <input type="number" value={boxOffice} onChange={e => setBoxOffice(e.target.value)}
                placeholder="0.00" className={`${inputClass} pl-8 pr-10`} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">M</span>
            </div>
          </motion.div>

          {/* Primary Genre */}
          <motion.div variants={cardVariants} className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Primary Genre</label>
            <div className="relative">
              <select value={genre1} onChange={e => setGenre1(e.target.value)} className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                <option value="" className="bg-zinc-900">— Select Primary Genre —</option>
                {genres.map(g => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </motion.div>

          {/* Secondary Genre */}
          <motion.div variants={cardVariants} className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Secondary Genre</label>
            <div className="relative">
              <select value={genre2} onChange={e => setGenre2(e.target.value)} className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                <option value="" className="bg-zinc-900">— None —</option>
                {genres.map(g => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div variants={cardVariants} className="flex justify-center mt-6">
          <motion.button
            onClick={handleMarketingPredict}
            disabled={loading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm shadow-lg shadow-amber-900/30 hover:shadow-amber-800/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed min-w-[200px]"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              ) : (
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
              {loading ? 'Analysing…' : 'Generate Prediction'}
            </span>
          </motion.button>
        </motion.div>
      </GlassCard>

      {/* Result */}
      <AnimatePresence>
        {marketingResult !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <GlassCard gold className="p-7">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/40 flex-shrink-0">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Predicted Marketing Budget</p>
                  <motion.p
                    className="text-4xl font-black text-amber-400"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    ${marketingResult.toFixed(2)}<span className="text-xl text-amber-600 font-bold ml-1">M</span>
                  </motion.p>
                </div>
                <motion.svg
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-8 h-8 text-amber-500 flex-shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-700/40 flex items-center justify-between">
                <span className="text-xs text-zinc-600 font-mono">Confidence: High</span>
                <span className="text-xs text-zinc-600">Based on genre & budget analysis</span>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </StaggerContainer>
  );
};

/* ─── HOW TO USE ──────────────────────────────────────────────────── */
const HowToUseContent = ({ setActiveTab }) => {
  const steps = [
    { n: '01', title: 'Start with Your Project', desc: 'Upload your script, treatment, or project details to begin the analysis process.', icon: Film, color: 'amber' },
    { n: '02', title: 'Choose Your Model', desc: 'Select from our suite of AI models based on what insights you need most.', icon: TrendingUp, color: 'orange' },
    { n: '03', title: 'Get AI Insights', desc: 'Receive detailed predictions and recommendations powered by advanced algorithms.', icon: Brain, color: 'yellow' },
    { n: '04', title: 'Refine & Optimise', desc: 'Use our AI assistant to iterate and improve your project based on the insights.', icon: Sparkles, color: 'amber' },
  ];

  return (
    <StaggerContainer className="space-y-8">
      <motion.div variants={cardVariants} className="text-center">
        <p className="text-amber-400/70 font-mono text-xs tracking-[0.3em] uppercase mb-3">Getting Started</p>
        <h2 className="text-4xl font-black text-white tracking-tight">How to Use</h2>
        <p className="text-zinc-500 mt-2 text-sm">Master the tools that will transform your filmmaking journey.</p>
      </motion.div>

      <div className="space-y-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              className="relative group"
            >
              <div className="flex items-start gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-700/40 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm">
                {/* Step number */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-400 font-black text-sm font-mono">{s.n}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <h3 className="text-white font-bold text-lg">{s.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[46px] top-[5.5rem] w-px h-4 bg-gradient-to-b from-amber-500/30 to-transparent" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <GlassCard gold className="p-8 text-center">
        <h3 className="text-2xl font-black text-white mb-2">Ready to Get Started?</h3>
        <p className="text-zinc-400 text-sm mb-6">Join filmmakers who are already using AI to create better films.</p>
        <motion.button
          onClick={() => setActiveTab('forecastor')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm shadow-lg shadow-amber-900/30"
        >
          Start Your First Prediction
        </motion.button>
      </GlassCard>
    </StaggerContainer>
  );
};

/* ─── CONTACT ─────────────────────────────────────────────────────── */
const ContactContent = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [category, setCategory] = useState('General Feedback');

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      alert("Thank you for your feedback! We'll review it shortly.");
      setFeedbackText('');
    }
  };

  const faqs = [
    'How accurate are the predictions?',
    'Can I use this for short films?',
    'What data do you need from me?',
    'How much does it cost?',
  ];

  return (
    <StaggerContainer className="space-y-8">
      <motion.div variants={cardVariants} className="text-center">
        <p className="text-amber-400/70 font-mono text-xs tracking-[0.3em] uppercase mb-3">We're Here to Help</p>
        <h2 className="text-4xl font-black text-white tracking-tight">Contact & Support</h2>
        <p className="text-zinc-500 mt-2 text-sm">Reach out anytime — we respond within 24 hours.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-5">
          <GlassCard gold className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Get in Touch</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Support Email', val: 'support@filmmakerAI.com' },
                { label: 'Business Inquiries', val: 'business@filmmakerAI.com' },
                { label: 'Response Time', val: 'Within 24 hours' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-amber-300 text-sm">{val}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7">
            <h3 className="text-lg font-bold text-white mb-4">FAQ</h3>
            <div className="space-y-2">
              {faqs.map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  className="w-full text-left px-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/40 hover:border-amber-500/30 transition-all duration-200 flex items-center justify-between group"
                >
                  <span className="text-zinc-300 text-sm">{q}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Feedback form */}
        <GlassCard className="p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Send Feedback</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full appearance-none py-3 px-4 pr-10 rounded-xl bg-zinc-900/70 border border-zinc-700/60 focus:border-amber-500/50 focus:outline-none text-white text-sm transition-all hover:border-zinc-600 cursor-pointer"
                >
                  {['General Feedback', 'Bug Report', 'Feature Request', 'Support Question'].map(c => (
                    <option key={c} value={c} className="bg-zinc-900">{c}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">Your Message</label>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Tell us about your experience, suggestions, or report any issues…"
                rows={6}
                className="w-full bg-zinc-900/70 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 focus:outline-none resize-none text-sm transition-all hover:border-zinc-600"
              />
            </div>
            <motion.button
              onClick={handleFeedbackSubmit}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 hover:shadow-amber-800/30 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              Send Feedback
            </motion.button>
          </div>
        </GlassCard>
      </div>
    </StaggerContainer>
  );
};

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function FilmmakerDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'forecastor', label: 'Forecastor', icon: TrendingUp },
    { id: 'assistant', label: 'Assistant', icon: Bot },
    { id: 'howto', label: 'How to Use', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeContent setActiveTab={setActiveTab} />;
      case 'forecastor': return <ForecastorContent selectedModel={selectedModel} setSelectedModel={setSelectedModel} />;
      case 'assistant': return <AssistantContent />;
      case 'howto': return <HowToUseContent setActiveTab={setActiveTab} />;
      case 'contact': return <ContactContent />;
      default: return <HomeContent setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden font-sans">
      <AmbientBlobs />

      {/* ── Sidebar ── */}
      <aside className="relative z-20 w-60 flex-shrink-0 flex flex-col border-r border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl overflow-hidden" style={{ height: '100vh' }}>
        {/* Logo image slot */}
        <div className="px-4 pt-4 pb-3 border-b border-zinc-800/60 flex-shrink-0">
          <div className="relative w-full" style={{ height: '100px' }}>
            <Image
              src="/Images/reelevo.png"
              alt="REELEVO"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        {/* Filmstrip decoration */}
        <div className="px-6 py-3 flex-shrink-0">
          <div className="flex gap-1 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-sm bg-amber-500" />
            ))}
          </div>
        </div>

        {/* Nav — no overflow, fixed height fills remaining space */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map(item => (
            <NavItem key={item.id} {...item} active={activeTab === item.id} onClick={setActiveTab} />
          ))}
        </nav>

        {/* Logout — always pinned at bottom */}
        <div className="p-3 border-t border-zinc-800/60 flex-shrink-0">
          <Link href="/" passHref>
            <motion.button
              whileHover={{ x: 2 }}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/30 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold capitalize text-lg">
              {navItems.find(n => n.id === activeTab)?.label || 'Home'}
            </h2>
            <p className="text-zinc-600 text-xs font-mono">REELEVO · AI Film Intelligence</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500/50">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
