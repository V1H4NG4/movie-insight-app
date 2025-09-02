'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Film, Search } from 'lucide-react';

// Map keys -> nice labels (optional chips)
const TYPE_LABELS = {
  '2D': '2D only',
  '3D': '3D',
  'IMAX': 'IMAX',
  'DOLBY_ATMOS': 'Dolby Atmos',
  'DOLBY_DIGITAL': 'Dolby Digital',
  '4DX': '4DX',
};

export default function TestMoviesPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setErr('');
    try {
      const qs = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
      const res = await fetch(`/api/movies/list${qs}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setErr(e.message || 'Failed to load');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Film size={18} className="text-slate-300" />
          <h1 className="text-lg font-semibold">Movies (Test)</h1>
          <span className="text-xs text-slate-500">Posters + captions</span>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && load()}
                placeholder="Search title…"
                className="w-64 bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            </div>
            <button
              onClick={load}
              className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Debug mini status */}
      <div className="max-w-7xl mx-auto px-6 pt-4 text-xs text-slate-400">
        status: {loading ? 'loading' : 'idle'} · count: {items.length}
        {items[0] ? ` · first: ${items[0].title}` : ''}
        {err ? ` · error: ${err}` : ''}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50">
                <div className="aspect-[2/3] bg-slate-800/40 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-800/60 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-slate-800/60 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && err && (
          <div className="p-6 text-center text-rose-300 bg-rose-900/10 border border-rose-700/30 rounded-xl">
            {err}
          </div>
        )}

        {/* Empty */}
        {!loading && !err && items.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No movies found. Try uploading one first.
          </div>
        )}

        {/* Grid */}
        {!loading && !err && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const { title, poster_path, release_date, release_types } = movie || {};
  const prettyDate = release_date ? new Date(release_date).toLocaleDateString() : '—';
  const types = Array.isArray(release_types) ? release_types : [];

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:bg-slate-900/70 transition">
      {/* Poster */}
      <div className="aspect-[2/3] bg-slate-950/40 border-b border-slate-800 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster_path || '/placeholder.svg'}
          alt={title || 'Poster'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Caption */}
      <div className="p-4">
        <div className="text-slate-100 font-medium leading-snug line-clamp-2">{title || 'Untitled'}</div>
        <div className="text-xs text-slate-400 mt-1">{prettyDate}</div>

        {types.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {types.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
              >
                {TYPE_LABELS[t] || t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
