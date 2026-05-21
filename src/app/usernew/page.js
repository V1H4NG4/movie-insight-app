'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Film, Calendar as CalIcon, Heart, ClipboardList, User, Settings,
  ChevronLeft, ChevronRight, Loader2, AlertTriangle, RefreshCw, Clock, Search, Trash2, ExternalLink
} from 'lucide-react';
import dynamic from 'next/dynamic';

// ---- TMDB search hook (top-level, not exported) ----
function useTmdbSearch(initial = '') {
  const [query, setQuery] = useState(initial);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const debounceRef = useRef();

  const doSearch = useCallback(async (q, p = 1) => {
    const qTrim = (q || '').trim();
    if (!qTrim) {
      setResults([]); setTotalPages(0); setTotalResults(0); setError('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/tmdb/find?query=${encodeURIComponent(qTrim)}&page=${p}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Search failed');

      setResults(Array.isArray(data.results) ? data.results : []);
      setTotalPages(data.total_pages || 0);
      setTotalResults(data.total_results || 0);
    } catch (e) {
      setError(e.message || 'Search failed');
      setResults([]); setTotalPages(0); setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce when query changes
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      doSearch(query, 1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query, doSearch]);

  const next = useCallback(() => {
    if (page < totalPages) {
      const p = page + 1;
      setPage(p);
      doSearch(query, p);
    }
  }, [page, totalPages, query, doSearch]);

  const prev = useCallback(() => {
    if (page > 1) {
      const p = page - 1;
      setPage(p);
      doSearch(query, p);
    }
  }, [page, query, doSearch]);

  return { query, setQuery, page, totalPages, totalResults, results, loading, error, next, prev, setPage, searchNow: () => doSearch(query, page) };
}
// ---- TMDB search hook (top-level, not exported) ends----

const MovieFinderOnly = dynamic(() => import('@/components/MovieFinderOnly'), { ssr: false });

/**
 * User Page (Letterboxd-style) wired to existing API:
 *   GET /api/movies/list?q=<optional>
 * Response shape: { ok: boolean, items: Array<{
 *   id, title, poster_path, release_date, release_types
 * }> }
 *
 * - Sidebar: Movies, Calendar, Wishlist, Planner, Profile, Options
 * - This month's Movies list (with mini list in sidebar)
 * - Big Calendar with movies plotted by release_date
 * - Wishlist/Planner/Profile/Options placeholders
 */

// ------------------------------ Helpers ------------------------------------
function toYearMonth(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function monthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function monthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function buildMonthGrid(currentMonthDate) {
  const start = monthStart(currentMonthDate);
  const end = monthEnd(currentMonthDate);

  const startDay = new Date(start);
  startDay.setDate(start.getDate() - start.getDay()); // Sunday=0

  const endDay = new Date(end);
  endDay.setDate(end.getDate() + (6 - end.getDay()));

  const days = [];
  const cur = new Date(startDay);
  while (cur <= endDay) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

function normalizeMovie(apiItem) {
  // Conform to internal shape used by this UI
  return {
    id: apiItem.id,
    title: apiItem.title || 'Untitled',
    releaseDate: apiItem.release_date ? new Date(apiItem.release_date) : null,
    poster: apiItem.poster_path || null,
    types: Array.isArray(apiItem.release_types) ? apiItem.release_types : []
  };
}

// ----------------------------- Sidebar Items -------------------------------
function SidebarItem({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition
        ${active ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-300 hover:bg-slate-800/50'}`}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
      {badge ? (
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function EmptyCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      {subtitle ? <p className="text-slate-400 text-sm">{subtitle}</p> : null}
    </div>
  );
}

function MovieMiniRow({ movie }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800/50 transition">
      <div className="w-8 h-12 rounded-md bg-slate-800 flex items-center justify-center overflow-hidden">
        {movie.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        ) : (
          <Film className="w-4 h-4 text-slate-500" />
        )}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm text-slate-200">{movie.title}</div>
        <div className="text-[11px] text-slate-400">
          {movie.releaseDate ? movie.releaseDate.toLocaleDateString() : 'TBA'}
        </div>
      </div>
    </div>
  );
}

// ------------------------------ Big Calendar --------------------------------
function BigCalendar({ monthDate, movies, onPrev, onNext, onToday }) {
  const days = useMemo(() => buildMonthGrid(monthDate), [monthDate]);

  const eventsByDay = useMemo(() => {
    const map = {};
    for (const m of movies) {
      if (!m.releaseDate) continue;
      const key = m.releaseDate.toISOString().slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(m);
    }
    return map;
  }, [movies]);

  const monthLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    return fmt.format(monthDate);
  }, [monthDate]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="p-2 rounded-lg border border-slate-800 hover:bg-slate-800/50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={onNext} className="p-2 rounded-lg border border-slate-800 hover:bg-slate-800/50">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={onToday} className="px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-800/50 text-sm">
            Today
          </button>
        </div>
        <div className="text-lg font-semibold">{monthLabel}</div>
        <div />
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, idx) => {
          const isCurrentMonth = d.getMonth() === monthDate.getMonth();
          const key = d.toISOString().slice(0,10);
          const items = eventsByDay[key] || [];
          return (
            <div
              key={idx}
              className={`min-h-[110px] rounded-xl border p-2 flex flex-col gap-1
                ${isCurrentMonth ? 'border-slate-800 bg-slate-900/40' : 'border-slate-900 bg-slate-950/40 opacity-70'}`}
            >
              <div className="text-[11px] text-slate-400 mb-1">{d.getDate()}</div>

              <div className="flex flex-col gap-1 overflow-hidden">
                {items.slice(0, 3).map(m => (
                  <div key={m.id} className="flex items-center gap-2 bg-slate-800/40 rounded-lg px-2 py-1">
                    <div className="w-6 h-8 rounded bg-slate-800 overflow-hidden flex items-center justify-center">
                      {m.poster ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                      ) : (
                        <Film className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                    <span className="truncate text-[11px] text-slate-200">{m.title}</span>
                  </div>
                ))}
                {items.length > 3 ? (
                  <div className="text-[11px] text-slate-400">+{items.length - 3} more</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------- Movies Grid --------------------------------
function MoviesGrid({ movies, wishBusy, wishMsg, onAddToWishlist }) {
  if (!movies.length) {
    return <EmptyCard title="No movies this month" subtitle="Try another month." />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {movies.map(m => (
        <div key={m.id} className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden group">
          <div className="aspect-[2/3] bg-slate-800 relative">
            {m.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.poster} alt={m.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Film className="w-10 h-10 text-slate-600" />
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="font-medium text-slate-100 truncate">{m.title}</div>
            <div className="text-xs text-slate-400">
              {m.releaseDate ? m.releaseDate.toLocaleDateString() : 'TBA'}
            </div>
            {Array.isArray(m.types) && m.types.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1">
                {m.types.slice(0, 3).map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => onAddToWishlist(m.id)}
              disabled={wishBusy === m.id}
              className="rounded-lg px-3 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-50"
            >
              {wishBusy === m.id ? 'Adding…' : 'Add to wishlist'}
            </button>
            {wishMsg ? (
              <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-sm px-3 py-2 inline-block">
                {wishMsg}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------- Page ------------------------------------
export default function UserPage() {
  const [active, setActive] = useState('movies');
  const [monthDate, setMonthDate] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const ym = useMemo(() => toYearMonth(monthDate), [monthDate]);

  // Remote data & UI state
  const [allMoviesRaw, setAllMoviesRaw] = useState([]);   // raw from API (current search query)
  const [movies, setMovies] = useState([]);               // filtered by month
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');  // search box (also sent to API)

  // Auth/session (from cookie via /api/auth/me)
  const [user, setUser] = useState(null);          // { id, role, name }
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState('');

  // Fetch from the known working API
  const loadFromApi = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const qs = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
      const res = await fetch(`/api/movies/list${qs}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      const normalized = (Array.isArray(data.items) ? data.items : []).map(normalizeMovie);
      setAllMoviesRaw(normalized);
    } catch (e) {
      setError(e.message || 'Failed to load movies');
      setAllMoviesRaw([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Whenever API data or month changes, filter to current month
  useEffect(() => {
    const start = monthStart(monthDate);
    const end = monthEnd(monthDate);
    const filtered = allMoviesRaw.filter(m => {
      if (!m.releaseDate) return false;
      return m.releaseDate >= start && m.releaseDate <= end;
    });
    // sort by date ascending
    filtered.sort((a, b) => a.releaseDate - b.releaseDate);
    setMovies(filtered);
  }, [allMoviesRaw, monthDate]);

  useEffect(() => {
    loadFromApi();
  }, [loadFromApi]);

  // Load user from cookie (Option B)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET', cache: 'no-store' });
        if (!res.ok) {
          if (alive) setUserError('Please sign in to continue.');
          return;
        }
        const data = await res.json();
        if (alive && data?.success) {
          setUser(data.user); // { id, role, name }
        }
      } catch (e) {
        if (alive) setUserError('Could not load your session.');
      } finally {
        if (alive) setUserLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  {/*----------wishlist starts---------------------------------------------------------------------------------------*/}
  // Wishlist UI state
  const [wishBusy, setWishBusy] = useState(null);   // holds the movieId while adding
  const [wishMsg, setWishMsg] = useState('');       // feedback message

  // Add to wishlist handler
  async function handleAddToWishlist(movieId) {
    setWishMsg('');
    setWishBusy(movieId);
    try {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setWishMsg(data?.message || 'Could not add to wishlist.');
        return;
      }

      if (data.action === 'exists') {
        setWishMsg('Already in your wishlist.');
      } else if (data.action === 'added') {
        setWishMsg(`Added to wishlist (slot ${data.position}).`);
      } else if (data.action === 'created') {
        setWishMsg('Wishlist created and movie added (slot 1).');
      } else {
        setWishMsg('Updated wishlist.');
      }
    } catch (e) {
      setWishMsg('Network error. Try again.');
    } finally {
      setWishBusy(null);
    }
  }
  {/* ---------------------------------------wishlist ends---------------------------------------------------------------------------------- */}

  {/*---------------------------------------wishlist listing------------------------------------------------------------------------------- */}
  // --- Wishlist (VIEW-ONLY) ---
  const [wlOpen, setWlOpen] = useState(false);
  const [wlItems, setWlItems] = useState([]);
  const [wlLoading, setWlLoading] = useState(false);
  const [wlMsg, setWlMsg] = useState('');
  const wlRef = useRef(null);

  const fetchWishlist = useCallback(async () => {
    setWlLoading(true);
    setWlMsg('');
    try {
      const res = await fetch('/api/wishlist/list', {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to load wishlist');
      const data = await res.json();
      setWlItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      setWlMsg(e.message || 'Failed to load wishlist');
    } finally {
      setWlLoading(false);
    }
  }, []);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  // close dropdown on outside click
  useEffect(() => {
    function onClick(e) {
      if (wlRef.current && !wlRef.current.contains(e.target)) setWlOpen(false);
    }
    if (wlOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [wlOpen]);
  {/*---------------------------------------wishlist listing ends------------------------------------------------------------------------------- */}
  
  {/* ------------tmdb finder child comp----------------------------------------------------------------------------------------------------- */}

  // ---- TMDB search hook (inline, paste into page.js; no export) ----
  // ---- Child component for the Planner tab ----
  function PlannerFindMovie() {
    const {
      query, setQuery,
      results, loading, error,
      page, totalPages, totalResults,
      next, prev
    } = useTmdbSearch('');

    return (
      <div className="space-y-4">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search TMDB for a movie…"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {loading && <div className="text-sm text-zinc-400">Searching…</div>}
        {error && <div className="text-sm text-rose-400 bg-rose-950/30 px-3 py-2 rounded-lg">{error}</div>}
        {!loading && !error && query && (
          <div className="text-xs text-zinc-400">
            {totalResults} result{totalResults === 1 ? '' : 's'} • page {page}/{totalPages || 1}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((m) => (
            <div key={m.id} className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
              <img
                src={m.posterUrl || '/placeholder-poster.png'}
                alt={m.title}
                className="w-full h-48 object-cover bg-zinc-800"
                onError={(e) => { e.currentTarget.src = '/placeholder-poster.png'; }}
              />
              <div className="p-3">
                <div className="text-sm font-medium truncate">{m.title}</div>
                <div className="text-xs text-zinc-400">{m.year || '—'}</div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              disabled={page <= 1 || loading}
              className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 disabled:opacity-50 hover:bg-zinc-800"
            >
              Prev
            </button>
            <button
              onClick={next}
              disabled={page >= totalPages || loading}
              className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 disabled:opacity-50 hover:bg-zinc-800"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  {/* ------------tmdb finder ends----------------------------------------------------------------------------------------------------- */}

  const goPrevMonth = () => setMonthDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () => setMonthDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToday = () => {
    const now = new Date();
    setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const monthLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    return fmt.format(monthDate);
  }, [monthDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen border-r border-slate-800 bg-slate-900/60 backdrop-blur p-4 space-y-4 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Film className="text-indigo-300" size={18} />
            </div>
            <div>
              <div className="text-sm text-slate-300">Reelevo</div>
              <div className="text-xs text-slate-500">User Hub</div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <SidebarItem icon={<Film size={16} />} label="Movies"   active={active === 'movies'}   onClick={() => setActive('movies')}   badge={movies.length || undefined} />
            <SidebarItem icon={<CalIcon size={16} />} label="Calendar" active={active === 'calendar'} onClick={() => setActive('calendar')} />
            <SidebarItem icon={<Heart size={16} />} label="Wishlist" active={active === 'wishlist'} onClick={() => setActive('wishlist')} />
            <SidebarItem icon={<ClipboardList size={16} />} label="Planner"  active={active === 'planner'}  onClick={() => setActive('planner')} />
            <SidebarItem icon={<User size={16} />} label="Profile"  active={active === 'profile'}  onClick={() => setActive('profile')} />
            <SidebarItem icon={<Settings size={16} />} label="Options"  active={active === 'options'}  onClick={() => setActive('options')} />
          </div>

          {/* Month picker + search + mini list */}
          <div className="mt-4 p-3 rounded-2xl border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-2">
              <button onClick={goPrevMonth} className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/50"><ChevronLeft size={14} /></button>
              <div className="text-xs">{monthLabel}</div>
              <button onClick={goNextMonth} className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/50"><ChevronRight size={14} /></button>
            </div>
            <div className="relative mb-2">
              <Search className="absolute left-2 top-2.5 text-slate-500" size={14} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search title…"
                className="w-full pl-8 pr-2 py-2 rounded-lg bg-slate-950/40 border border-slate-800 text-xs outline-none focus:border-indigo-600"
              />
            </div>
            <div className="max-h-64 overflow-auto space-y-1">
              {loading ? (
                <div className="flex items-center justify-center py-6 text-slate-400 text-sm">
                  <Loader2 className="animate-spin mr-2" size={16} /> Loading...
                </div>
              ) : error ? (
                <div className="text-xs text-amber-300 flex items-center gap-1">
                  <AlertTriangle size={14} /> {error}
                </div>
              ) : movies.length ? (
                movies.map(m => <MovieMiniRow key={m.id} movie={m} />)
              ) : (
                <div className="text-xs text-slate-400">No results</div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 px-1">
            Wishlist will allow adding only movies from the selected month.
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          {/* Welcome header */}
          <div className="px-6 pt-6">
            {user ? (
              <div className="text-2xl font-bold">
                Welcome {user.name}!
                <span className="ml-2 text-sm text-white/50 align-middle">({user.role})</span>
              </div>
            ) : userLoading ? (
              <div className="text-white/60">Loading your profile…</div>
            ) : userError ? (
              <div className="rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm px-3 py-2 inline-block">
                {userError}
              </div>
            ) : (
              <div className="text-2xl font-bold">Welcome!</div>
            )}
            {/* Optional: expose ID for debugging / will be used for wishlists */}
            {user?.id ? (
              <div className="text-xs text-white/40 mt-1">User ID: {user.id}</div>
            ) : null}
          </div>
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-xl font-semibold">
              {active === 'movies'   && 'Movies'}
              {active === 'calendar' && 'Calendar'}
              {active === 'wishlist' && 'Wishlist'}
              {active === 'planner'  && 'Planner'}
              {active === 'profile'  && 'Profile'}
              {active === 'options'  && 'Options'}
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={loadFromApi} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/40 text-sm" title="Reload movies">
                <RefreshCw size={14} /> Reload
              </button>
              <button onClick={goToday} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/40 text-sm" title="Jump to current month">
                <Clock size={14} /> This Month
              </button>
            </div>
          </div>

          {/* Content */}
          {active === 'movies' && (
            <section className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-slate-400">
                  <Loader2 className="animate-spin mr-2" /> Loading movies...
                </div>
              ) : error ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 p-4 flex items-center gap-2">
                  <AlertTriangle /> {error}
                </div>
              ) : (
                <MoviesGrid
                  movies={movies}
                  wishBusy={wishBusy}
                  wishMsg={wishMsg}
                  onAddToWishlist={handleAddToWishlist}
                />
                //<MoviesGrid movies={movies} />
              )}
            </section>
          )}

          {active === 'calendar' && (
            <section className="space-y-4">
              <BigCalendar
                monthDate={monthDate}
                movies={movies}
                onPrev={goPrevMonth}
                onNext={goNextMonth}
                onToday={goToday}
              />
            </section>
          )}

          {active === 'wishlist' && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Your Wishlist</h2>

            {wlLoading && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading your wishlist…
              </div>
            )}

            {wlMsg && (
              <div className="text-sm text-rose-400 bg-rose-950/30 px-3 py-2 rounded-lg">
                {wlMsg}
              </div>
            )}

            {!wlLoading && wlItems.length === 0 && (
              <div className="text-sm text-zinc-400">Your wishlist is empty.</div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {wlItems.map((m) => {
                // resolve local posters
                const toAbsolutePoster = (p) => {
                  if (!p) return '';
                  if (/^https?:\/\//i.test(p)) return p; // already absolute
                  const rel = `/${String(p).replace(/^\/+/, '')}`; // ensure leading slash
                  return rel; // served from same origin (public/uploads/…)
                };
                const poster = toAbsolutePoster(m.posterUrl || m.poster_path);

                return (
                  <div
                    key={m.movieId}
                    className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
                  >
                    <img
                      src={poster || '/placeholder-poster.png'}
                      alt={m.title || `Movie #${m.movieId}`}
                      className="w-full h-48 object-cover bg-zinc-800"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-poster.png';
                      }}
                    />
                    <div className="p-3">
                      <div className="text-sm font-medium truncate">
                        {m.title || `Movie #${m.movieId}`}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {m.year || '—'} {m.runtime ? `• ${m.runtime}m` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}


          {active === 'planner' && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Find a Movie</h2>
            <PlannerFindMovie />
          </section>
        )}


          {active === 'profile' && (
            <section className="space-y-4">
              <EmptyCard
                title="Profile (coming soon)"
                subtitle="Your user info and preferences will appear here."
              />
            </section>
          )}

          {active === 'options' && (
            <section className="space-y-4">
              <EmptyCard
                title="Options (coming soon)"
                subtitle="Customize notifications, display, and other preferences."
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
