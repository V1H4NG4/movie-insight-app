'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon, Film, CalendarDays, List, Star, MessageSquare, Heart, Search,
  Loader2, ChevronLeft, ChevronRight
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// CONFIG – set your existing “this month” API endpoint here
// ─────────────────────────────────────────────────────────────
const MOVIES_API =
  process.env.NEXT_PUBLIC_MOVIES_API_URL || 'http://localhost:3001/api/v1/movies/month';

// Client-only Movie Finder (movies only) that we created earlier:
const MovieFinderOnly = dynamic(() => import('@/components/MovieFinderOnly'), { ssr: false });

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const classNames = (...xs) => xs.filter(Boolean).join(' ');
const posterUrl = (m) => {
  const p = m?.poster_path || m?.poster || '';
  if (!p) return '';
  return p.startsWith('http') ? p : `https://image.tmdb.org/t/p/w342${p}`;
};

// If you store the name somewhere else, adjust `guessName()` to read it (e.g., AuthContext)
const guessName = () => {
  if (typeof window === 'undefined') return 'User';
  return (
    localStorage.getItem('reelevo_user_name') ||
    localStorage.getItem('fullName') ||
    localStorage.getItem('displayName') ||
    'User'
  );
};

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function TMDbStyleDashboard() {
  // Tabs: TMDb-like
  const tabs = [
    { key: 'overview', label: 'Overview', icon: <UserIcon size={16} /> },
    { key: 'movies', label: 'Movies', icon: <Film size={16} /> },
    { key: 'lists', label: 'Lists', icon: <List size={16} /> },
    { key: 'ratings', label: 'Ratings', icon: <Star size={16} /> },
    { key: 'watchlist', label: 'Watchlist', icon: <Heart size={16} /> },
    { key: 'discussions', label: 'Discussions', icon: <MessageSquare size={16} /> },
  ];
  const [active, setActive] = useState('overview');

  // User name & avatar initial
  const [displayName, setDisplayName] = useState('User');
  useEffect(() => setDisplayName(guessName()), []);
  const initial = (displayName || 'U').slice(0, 1).toUpperCase();

  // Movies (existing function behavior preserved)
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setErr('');
      const res = await fetch(MOVIES_API, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Movies API error ${res.status}`);
      const json = await res.json();
      const arr = Array.isArray(json) ? json : (json?.results || json?.items || []);
      setMovies(arr);
    } catch (e) {
      setErr(e.message || 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Search/filter within “This Month”
  const filtered = useMemo(() => {
    if (!q.trim()) return movies;
    const qq = q.toLowerCase();
    return movies.filter(
      (m) =>
        (m.title || m.name || '').toLowerCase().includes(qq) ||
        (m.release_date || '').toLowerCase().includes(qq)
    );
  }, [q, movies]);

  // Calendar bits (same month nav you had)
  const [monthOffset, setMonthOffset] = useState(0);
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth(); // 0-based
  const viewMonthName = viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun..6=Sat
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const moviesByDay = useMemo(() => {
    const map = new Map();
    for (const m of movies) {
      const rd = m.release_date || m.releaseDate || m.date;
      if (!rd) continue;
      const d = new Date(rd);
      if (isNaN(d)) continue;
      if (d.getMonth() !== viewMonth || d.getFullYear() !== viewYear) continue;
      const day = d.getDate();
      const arr = map.get(day) || [];
      arr.push(m);
      map.set(day, arr);
    }
    return map;
  }, [movies, viewMonth, viewYear]);

  // ─────────────────────────────────────────────────────────────
  // UI Components
  // ─────────────────────────────────────────────────────────────

  const HeroHeader = (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-r from-sky-900 via-cyan-900 to-teal-900">
      {/* decorative slanted bars */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-4 h-40 w-80 rotate-12 bg-cyan-500/10 blur-xl" />
        <div className="absolute -right-20 top-12 h-40 w-96 -rotate-12 bg-teal-400/10 blur-xl" />
        <div className="absolute left-1/4 -bottom-8 h-36 w-72 rotate-6 bg-sky-400/10 blur-xl" />
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          {/* Avatar circle with initial */}
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-cyan-700/40 border border-cyan-300/20 grid place-items-center text-white text-2xl font-bold">
            {initial}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white/90">
              <h1 className="text-xl sm:text-2xl font-semibold">{displayName}</h1>
              <span className="text-white/60 text-sm">Member</span>
            </div>

            {/* mini stat pills like TMDb (you can compute your real averages later) */}
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/90 text-xs border border-white/10">
                <span className="font-semibold">0%</span> Average Movie Score
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/70 text-xs border border-white/10">
                <span className="font-semibold">0%</span> Average TV Score
              </div>
            </div>
          </div>
        </div>

        {/* Tabs (TMDb-like) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={classNames(
                'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border',
                active === t.key
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              )}
              aria-pressed={active === t.key}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const StatsRow = (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
        <div className="text-xs text-zinc-400">Total Edits</div>
        <div className="text-lg">0</div>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
        <div className="text-xs text-zinc-400">Total Ratings</div>
        <div className="text-lg">0</div>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
        <div className="text-xs text-zinc-400">This Month Releases</div>
        <div className="text-lg">{movies.length}</div>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
        <div className="text-xs text-zinc-400">Watchlist Upcoming</div>
        <div className="text-lg">0</div>
      </div>
    </div>
  );

  const CalendarNav = (
    <div className="flex items-center justify-between">
      <div className="text-sm text-zinc-400">Release Calendar</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMonthOffset((o) => o - 1)}
          className="rounded-lg border border-zinc-800 px-2 py-1 hover:bg-zinc-800"
          title="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="min-w-[160px] text-center text-sm">{viewMonthName}</div>
        <button
          onClick={() => setMonthOffset((o) => o + 1)}
          className="rounded-lg border border-zinc-800 px-2 py-1 hover:bg-zinc-800"
          title="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  const CalendarGrid = () => {
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="mt-3">
        <div className="grid grid-cols-7 text-center text-[11px] text-zinc-400 mb-1">
          {weekDays.map((w) => (
            <div key={w} className="py-1">
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, idx) => {
            const dayMovies = day ? moviesByDay.get(day) || [] : [];
            const isToday =
              day &&
              viewMonth === today.getMonth() &&
              viewYear === today.getFullYear() &&
              day === today.getDate();

            return (
              <div
                key={idx}
                className={classNames(
                  'min-h-[110px] rounded-xl border p-2 flex flex-col gap-1 overflow-hidden',
                  isToday ? 'border-cyan-700 bg-cyan-900/10' : 'border-zinc-800 bg-zinc-900/40'
                )}
              >
                <div className="text-[11px] text-zinc-400">{day || ''}</div>
                <div className="flex-1 space-y-1 overflow-auto pr-1">
                  {dayMovies.map((m, i) => (
                    <div
                      key={(m.id ?? i) + (m.title || m.name || '')}
                      className="flex items-center gap-2"
                      title={m.title || m.name}
                    >
                      {posterUrl(m) ? (
                        <img
                          src={posterUrl(m)}
                          alt={m.title || m.name}
                          className="h-8 w-6 rounded border border-zinc-700 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-6 rounded bg-zinc-800 grid place-items-center text-zinc-500">
                          <Film size={12} />
                        </div>
                      )}
                      <span className="truncate text-[11px]">{m.title || m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const MonthGrid = () => (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence>
        {filtered.map((m, idx) => {
          const poster = posterUrl(m);
          const dateLabel = m.release_date ? new Date(m.release_date).toLocaleDateString() : 'TBA';
          return (
            <motion.div
              key={(m.id ?? idx) + (m.title || m.name || '')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div className="aspect-[3/4] bg-zinc-950 relative">
                {poster ? (
                  <img src={poster} alt={m.title || m.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-zinc-600">
                    <Film size={32} />
                  </div>
                )}
                <div className="absolute left-0 right-0 bottom-0 bg-black/65 backdrop-blur-sm px-3 py-2">
                  <div className="text-sm font-medium truncate">{m.title || m.name}</div>
                  <div className="text-[11px] text-zinc-400">{dateLabel}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // Renders per tab
  // ─────────────────────────────────────────────────────────────
  const Overview = (
    <div className="space-y-6">
      {StatsRow}

      {/* Quick actions & Search TMDb */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">This Month (quick view)</div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchMovies}
                className="rounded-lg border border-zinc-800 px-2 py-1 hover:bg-zinc-800 text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="relative mb-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search within this month…"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-10 py-2 text-sm outline-none focus:border-zinc-600"
              />
              <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
            </div>
            {loading ? (
              <div className="text-zinc-400 text-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Loading movies…
              </div>
            ) : err ? (
              <div className="text-rose-400 text-sm">⚠️ {err}</div>
            ) : (
              <MonthGrid />
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-sm font-medium mb-2">Movie Finder</div>
          <MovieFinderOnly onSelect={(movie) => console.log('Use this movie:', movie)} />
        </div>
      </div>

      {/* Calendar block */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        {CalendarNav}
        <CalendarGrid />
      </div>
    </div>
  );

  const MoviesTab = (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">This month’s releases</div>
        <button
          onClick={fetchMovies}
          className="rounded-lg border border-zinc-800 px-2 py-1 hover:bg-zinc-800 text-sm"
        >
          Refresh
        </button>
      </div>
      <div className="relative mt-3 mb-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search within this month…"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-10 py-2 text-sm outline-none focus:border-zinc-600"
        />
        <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
      </div>
      {loading ? (
        <div className="text-zinc-400 text-sm flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" /> Loading movies…
        </div>
      ) : err ? (
        <div className="text-rose-400 text-sm">⚠️ {err}</div>
      ) : (
        <>
          <MonthGrid />
          <div className="mt-6">{CalendarNav}</div>
          <CalendarGrid />
        </>
      )}
    </div>
  );

  const Placeholder = (title) => (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-zinc-400">
      {title} — coming soon.
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // Page layout
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-930 to-black text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {HeroHeader}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {active === 'overview' && Overview}
            {active === 'movies' && MoviesTab}
            {active === 'lists' && Placeholder('Lists')}
            {active === 'ratings' && Placeholder('Ratings')}
            {active === 'watchlist' && Placeholder('Watchlist')}
            {active === 'discussions' && Placeholder('Discussions')}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
