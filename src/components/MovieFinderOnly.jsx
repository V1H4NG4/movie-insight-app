'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Film, Star, X, Loader2, ChevronRight } from 'lucide-react';

/**
 * MovieFinderOnly.jsx
 * - Movie-only TMDb search UI (no TV)
 * - Server routes required (movie-only):
 *    GET /api/tmdb/search?q=...&page=...&year=...
 *    GET /api/tmdb/details?id=...
 *    GET /api/tmdb/genres
 *
 * Env: TMDB_API_KEY in .env.local (server), then restart dev server.
 */

const IMG = (path, w = 342) =>
  path ? (path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w${w}${path}`) : '';

function useDebounced(value, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function MovieFinderOnly({ onSelect }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(null);
  const [details, setDetails] = useState(null);
  const [dLoading, setDLoading] = useState(false);

  const q = useDebounced(query);

  // Fetch movie genres (cached server-side)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/tmdb/genres', { cache: 'no-store' });
        const json = await res.json();
        setGenres(json.genres || []);
      } catch {
        // ignore
      }
    })();
  }, []);

  const fetchSearch = useCallback(
    async (reset = true) => {
      try {
        setLoading(true);
        const url = new URL('/api/tmdb/search', window.location.origin);
        url.searchParams.set('q', q);
        url.searchParams.set('page', String(reset ? 1 : page + 1));
        if (year) url.searchParams.set('year', year);

        const res = await fetch(url, { cache: 'no-store' });
        const json = await res.json();
        const results = json.results || [];
        setTotalPages(json.total_pages || 0);

        if (reset) {
          setItems(results);
          setPage(1);
        } else {
          setItems((prev) => [...prev, ...results]);
          setPage((p) => p + 1);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    [q, year, page]
  );

  // Auto-search when q/year changes
  useEffect(() => {
    if (!q.trim()) {
      setItems([]);
      setTotalPages(0);
      setPage(1);
      return;
    }
    fetchSearch(true);
  }, [q, year]);

  const openDetails = useCallback(async (item) => {
    setOpen(item);
    setDLoading(true);
    try {
      const res = await fetch(`/api/tmdb/details?id=${item.id}`, { cache: 'no-store' });
      const json = await res.json();
      setDetails(json);
    } catch {
      setDetails(null);
    } finally {
      setDLoading(false);
    }
  }, []);

  const namesFromIds = (ids) => {
    if (!Array.isArray(ids)) return [];
    const m = new Map(genres.map((g) => [g.id, g.name]));
    return ids.map((id) => m.get(id)).filter(Boolean);
  };

  const ResultCard = ({ item }) => {
    const title = item.title;
    const date = item.release_date || '';
    const yearLabel = date ? new Date(date).getFullYear() : '';
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700"
        onClick={() => openDetails(item)}
        role="button"
        tabIndex={0}
      >
        <div className="aspect-[3/4] bg-zinc-950 relative">
          {item.poster_path ? (
            <img src={IMG(item.poster_path)} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-zinc-600">
              <Film size={32} />
            </div>
          )}
          <div className="absolute left-0 right-0 bottom-0 bg-black/65 backdrop-blur-sm px-3 py-2">
            <div className="text-sm font-medium truncate">{title}</div>
            <div className="text-[11px] text-zinc-400">{yearLabel}</div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <div className="text-[11px] text-zinc-400 inline-flex items-center gap-1">
            <Star size={12} /> {item.vote_average?.toFixed?.(1) ?? '—'}
          </div>
          <div className="text-[11px] text-zinc-400">Pop {Math.round(item.popularity || 0)}</div>
        </div>
      </motion.div>
    );
  };

  const Drawer = () => {
    if (!open) return null;
    const title = open.title;
    const date = open.release_date || '';
    const yearLabel = date ? new Date(date).getFullYear() : '';
    const backdrop = open.backdrop_path ? IMG(open.backdrop_path, 780) : null;

    const vids = details?.videos?.results || [];
    const trailer = vids.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
    const youTubeUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    const cast = (details?.credits?.cast || []).slice(0, 8);
    const names = namesFromIds(open.genre_ids || []);

    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(null)} />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[520px] bg-zinc-950 border-l border-zinc-800 overflow-auto"
        >
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="font-medium">
              {title} <span className="text-zinc-500">({yearLabel || '—'})</span>
            </div>
            <button
              className="rounded-lg border border-zinc-800 p-1 hover:bg-zinc-900"
              onClick={() => setOpen(null)}
            >
              <X size={16} />
            </button>
          </div>

          {dLoading ? (
            <div className="p-6 text-zinc-400 flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Loading details...
            </div>
          ) : (
            <div>
              {backdrop && (
                <div className="relative">
                  <img src={backdrop} alt="" className="w-full h-40 object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>
              )}

              <div className="p-4 space-y-4">
                <div className="text-sm text-zinc-300">
                  {details?.details?.overview || 'No overview available.'}
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  {names.map((n) => (
                    <span
                      key={n}
                      className="px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-zinc-400">
                  <div className="rounded-lg border border-zinc-800 p-2">
                    <div className="text-[10px]">Rating</div>
                    <div className="text-zinc-200">
                      {details?.details?.vote_average?.toFixed?.(1) ?? '—'}
                    </div>
                  </div>
                  <div className="rounded-lg border border-zinc-800 p-2">
                    <div className="text-[10px]">Popularity</div>
                    <div className="text-zinc-200">
                      {Math.round(details?.details?.popularity || 0)}
                    </div>
                  </div>
                  <div className="rounded-lg border border-zinc-800 p-2">
                    <div className="text-[10px]">Release</div>
                    <div className="text-zinc-200">{date || '—'}</div>
                  </div>
                </div>

                {youTubeUrl && (
                  <a
                    href={youTubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:underline"
                  >
                    Watch trailer <ChevronRight size={16} />
                  </a>
                )}

                {onSelect && (
                  <button
                    className="mt-2 inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-emerald-900/10 px-3 py-2 text-emerald-300 hover:bg-emerald-900/20"
                    onClick={() => onSelect(open)}
                  >
                    Use this movie
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm font-medium mb-2">Search Movies (TMDb)</div>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a movie title…"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-10 py-2 text-sm outline-none focus:border-zinc-600"
            />
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-24 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm"
            inputMode="numeric"
            pattern="\\d{4}"
          />
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-sm text-zinc-400 flex items-center gap-2">
          <Loader2 size={16} className="animate-spin" /> Searching…
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {items.map((it) => (
            <ResultCard key={`movie-${it.id}`} item={it} />
          ))}
        </AnimatePresence>
      </div>

      {!loading && items.length > 0 && page < totalPages && (
        <div className="mt-4 flex justify-center">
          <button
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm hover:bg-zinc-900"
            onClick={() => fetchSearch(false)}
          >
            Load more
          </button>
        </div>
      )}

      <AnimatePresence>{open && <Drawer />}</AnimatePresence>
    </div>
  );
}
