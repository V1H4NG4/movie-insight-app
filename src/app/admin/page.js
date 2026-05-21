'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronRight, Users, UserCog, Clapperboard, CalendarDays, Search, ShieldCheck, Film, Upload, CheckCircle2, XCircle, Image as ImageIcon,} from 'lucide-react';


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('admins');
  const [query, setQuery] = useState('');

  const geeksAdmin = useAdminGeeks();
    useEffect(() => { geeksAdmin.fetchGeeks({ page: 1 }); }, []); // initial load


  {/*----------------admin data loading block-----------------------------------------------------------------------------------------------*/}
  
  //Admins data
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [adminsError, setAdminsError] = useState(null);

  const loadAdmins = useCallback(async () => {
    setLoadingAdmins(true);
    setAdminsError(null);
    try {
      // Same-origin call to your Next.js route: src/app/api/admin/list/route.js
      const res = await fetch('/api/admin/list', { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed with status ${res.status}`);
      }
      setAdmins(Array.isArray(data.admins) ? data.admins : []);
    } catch (err) {
      setAdminsError(err.message || 'Failed to load admins');
      setAdmins([]);
    } finally {
      setLoadingAdmins(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'admins') {
      loadAdmins();
    }
  }, [activeTab, loadAdmins]);

  //filter
  const filteredAdmins = admins.filter(a => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      String(a.username ?? '').toLowerCase().includes(q) ||
      String(a.email ?? '').toLowerCase().includes(q) ||
      String(a.level ?? '').toLowerCase().includes(q)
    );
  });



  {/*----movie data upload section---------------------------------------------------------------------------------------------------------*/}
  
  // Release types (multi-select)
  const RELEASE_TYPE_OPTIONS = [
    { key: '2D', label: '2D only' },
    { key: '3D', label: '3D' },
    { key: 'IMAX', label: 'IMAX' },
    { key: 'DOLBY_ATMOS', label: 'Dolby Atmos' },
    { key: 'DOLBY_DIGITAL', label: 'Dolby Digital' },
    { key: '4DX', label: '4DX' },
  ];

  // ===== Upload Movie form state =====
  const [mvForm, setMvForm] = useState({
    title: '',
    release_date: '',
    release_types: [], // array of keys from RELEASE_TYPE_OPTIONS
    poster: null,      // File object
  });

  const [mvSubmitting, setMvSubmitting] = useState(false);
  const [mvMsg, setMvMsg] = useState({ type: '', text: '' }); // { type: 'success'|'error', text: string }
  const [posterPreview, setPosterPreview] = useState(null);

  // Toggle multi-select release types
  const toggleReleaseType = (key) => {
    setMvForm((prev) => {
      const exists = prev.release_types.includes(key);
      return {
        ...prev,
        release_types: exists
          ? prev.release_types.filter((k) => k !== key)
          : [...prev.release_types, key],
      };
    });
  };

  // File input (jpeg/png)
  const handlePosterChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const valid = ['image/jpeg', 'image/png'];
    if (!valid.includes(file.type)) {
      setMvMsg({ type: 'error', text: 'Poster must be a JPEG or PNG image.' });
      return;
    }

    setMvForm((prev) => ({ ...prev, poster: file }));
    const reader = new FileReader();
    reader.onload = () => setPosterPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Submit form as multipart/form-data
  const submitMovie = async (e) => {
    e.preventDefault();
    setMvMsg({ type: '', text: '' });

    if (!mvForm.title.trim()) {
      setMvMsg({ type: 'error', text: 'Please enter a movie title.' });
      return;
    }
    if (!mvForm.release_date) {
      setMvMsg({ type: 'error', text: 'Please select a release date.' });
      return;
    }
    if (!mvForm.poster) {
      setMvMsg({ type: 'error', text: 'Please choose a poster image (JPEG/PNG).' });
      return;
    }

    try {
      setMvSubmitting(true);

      const fd = new FormData();
      fd.append('title', mvForm.title);
      fd.append('release_date', mvForm.release_date);
      fd.append('release_types', JSON.stringify(mvForm.release_types)); // send as JSON array
      fd.append('poster', mvForm.poster); // file

      const res = await fetch('/api/movies/new', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Upload failed with status ${res.status}`);
      }

      setMvMsg({ type: 'success', text: 'Movie uploaded successfully!' });
      // Reset
      setMvForm({ title: '', release_date: '', release_types: [], poster: null });
      setPosterPreview(null);
    } catch (err) {
      setMvMsg({ type: 'error', text: err.message || 'Failed to upload movie.' });
    } finally {
      setMvSubmitting(false);
    }
  };


  {/*-----movie data view section-----------------------------------------------------------------------------------------------------*/}

  // ===== Movies panel state (inline) =====
  const [mvItems, setMvItems] = useState([]);
  const [mvQ, setMvQ] = useState('');
  const [mvLoading, setMvLoading] = useState(false);
  const [mvErr, setMvErr] = useState('');

  // Optional labels for chips
  const MV_TYPE_LABELS = {
    '2D': '2D only',
    '3D': '3D',
    'IMAX': 'IMAX',
    'DOLBY_ATMOS': 'Dolby Atmos',
    'DOLBY_DIGITAL': 'Dolby Digital',
    '4DX': '4DX',
  };

  const mvLoad = useCallback(async () => {
    setMvLoading(true);
    setMvErr('');
    try {
      const qs = mvQ.trim() ? `?q=${encodeURIComponent(mvQ.trim())}` : '';
      const res = await fetch(`/api/movies/list${qs}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setMvItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setMvErr(e.message || 'Failed to load');
      setMvItems([]);
    } finally {
      setMvLoading(false);
    }
  }, [mvQ]);

  // Load when switching to Movies tab
  useEffect(() => {
    if (activeTab === 'movies') mvLoad();
  }, [activeTab, mvLoad]);

  
  {/*------filmers load/edit-------------------------------------------------------------------------------------------------------------- */}
  // === FILMERS: state + loader + mutator ===
  const [flRows, setFlRows] = useState([]);
  const [flPage, setFlPage] = useState(1);
  const [flLimit, setFlLimit] = useState(10);
  const [flQ, setFlQ] = useState('');
  const [flSort, setFlSort] = useState('created_at'); // server column
  const [flOrder, setFlOrder] = useState('desc');

  const [flLoading, setFlLoading] = useState(false);
  const [flErr, setFlErr] = useState('');
  const [flTotal, setFlTotal] = useState(0);
  const [flTotalPages, setFlTotalPages] = useState(1);

  const flSortOptions = useMemo(
    () => [
      { label: 'Created (newest)', sort: 'created_at', order: 'desc' },
      { label: 'Created (oldest)', sort: 'created_at', order: 'asc' },
      { label: 'First name (A→Z)', sort: 'first_name', order: 'asc' },
      { label: 'First name (Z→A)', sort: 'first_name', order: 'desc' },
      { label: 'Last name (A→Z)',  sort: 'last_name',  order: 'asc' },
      { label: 'Last name (Z→A)',  sort: 'last_name',  order: 'desc' },
      { label: 'Email (A→Z)',      sort: 'email',      order: 'asc' },
      { label: 'Email (Z→A)',      sort: 'email',      order: 'desc' },
      { label: 'Status (A→Z)',     sort: 'status',     order: 'asc' },
      { label: 'Status (Z→A)',     sort: 'status',     order: 'desc' },
    ],
    []
  );

  const flFetchFilmers = useCallback(async () => {
    setFlLoading(true);
    setFlErr('');
    try {
      const params = new URLSearchParams({
        page: String(flPage),
        limit: String(flLimit),
        sort: flSort,
        order: flOrder,
      });
      if (flQ.trim()) params.set('q', flQ.trim());

      const res = await fetch(`/api/admin/filmers?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to load filmers');

      setFlRows(data.data || []);
      setFlTotal(data.pagination?.total || 0);
      setFlTotalPages(data.pagination?.totalPages || 1);
    } catch (e) {
      setFlErr(e.message || 'Error loading filmers');
    } finally {
      setFlLoading(false);
    }
  }, [flPage, flLimit, flSort, flOrder, flQ]);

  useEffect(() => {
    flFetchFilmers();
  }, [flFetchFilmers]);

  {/*---------geeks------------------------------------------------------------------------------------------------------------------------*/}
  function useAdminGeeks() {
    const { useState, useCallback } = require('react');

    const [items, setItems] = useState([]);
    const [q, setQ] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    const fetchGeeks = useCallback(async (opts = {}) => {
      setLoading(true); setErr('');
      try {
        const u = new URL('/api/admin/geeks', window.location.origin);
        u.searchParams.set('page', String(opts.page ?? page));
        u.searchParams.set('limit', String(opts.limit ?? limit));
        const _q = opts.q ?? q; if (_q) u.searchParams.set('q', _q.trim());
        const _s = opts.status ?? status; if (_s) u.searchParams.set('status', _s);

        const res = await fetch(u.toString(), { credentials: 'include' });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data?.message || 'Load failed');
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
      } catch (e) {
        setErr(e.message || 'Load failed');
        setItems([]); setTotal(0);
      } finally {
        setLoading(false);
      }
    }, [page, limit, q, status]);

    const toggleStatus = useCallback(async (id, next) => {
      const prev = items;
      setItems(xs => xs.map(x => x.id === id ? { ...x, status: next } : x));
      try {
        const res = await fetch('/api/admin/geeks', {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status: next }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data?.message || 'Toggle failed');
      } catch (e) {
        setItems(prev); // revert on error
        throw e;
      }
    }, [items]);

    return { items, q, setQ, status, setStatus, page, setPage, limit, total, loading, err, fetchGeeks, toggleStatus };
  }
  {/*---------geeks ends------------------------------------------------------------------------------------------------------------------------*/}

  const flToggleStatus = async (row) => {
    try {
      const next = row.status === 'active' ? 'suspended' : 'active';
      const res = await fetch('/api/admin/filmers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Update failed');

      // Optimistic update
      setFlRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)));
    } catch (e) {
      setFlErr(e.message || 'Error updating status');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 text-slate-100">
      <div className="flex">
        {/* Fixed Sidebar */}
        <aside className="w-64 h-screen min-h-screen border-r border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="p-4">
            <div className="text-lg font-semibold">Reelevo Admin</div>
            <div className="text-xs text-slate-400">Dashboard</div>
          </div>

          <nav className="mt-2">
            <SidebarItem
              active={activeTab === 'admins'}
              icon={<ShieldCheck size={18} />}
              label="Admin Management"
              onClick={() => setActiveTab('admins')}
            />
            <SidebarItem
              active={activeTab === 'geeks'}
              icon={<Users size={18} />}
              label="Geeks"
              onClick={() => setActiveTab('geeks')}
            />
            <SidebarItem
              active={activeTab === 'filmers'}
              icon={<Clapperboard size={18} />}
              label="Filmers"
              onClick={() => setActiveTab('filmers')}
            />
            <SidebarItem
              active={activeTab === 'releases'}
              icon={<CalendarDays size={18} />}
              label="Monthly Releases"
              onClick={() => setActiveTab('releases')}
            />
            <SidebarItem
              active={activeTab === 'movies'}
              icon={<Film size={18} />}
              label="Movies"
              onClick={() => setActiveTab('movies')}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 backdrop-blur bg-slate-900/40 border-b border-slate-800">
            <div className="px-6 py-4 flex items-center gap-3">
              <h1 className="text-xl font-semibold">
                {activeTab === 'admins' && 'Admin Management'}
                {activeTab === 'geeks' && 'Geeks Management'}
                {activeTab === 'filmers' && 'Filmers Management'}
                {activeTab === 'releases' && 'Add a Release'}
                {activeTab === 'movies' && 'Movie List'}
              </h1>
              <ChevronRight size={16} className="text-slate-500" />
              <span className="text-sm text-slate-400">Dashboard</span>

              <div className="ml-auto flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                  <input
                    className="pl-9 pr-3 py-2 rounded-xl bg-slate-800/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-6">
            {activeTab === 'admins' && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-200 font-semibold">Admin Management</h3>
                  <span className="text-slate-400 text-sm">Full List</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-300">
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">ID</th>
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">Username</th>
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">Email</th>
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">Level</th>
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">Created</th>
                        <th className="py-3 px-3 border-b border-slate-800 font-medium">Updated</th>
                        <th className="py-3 px-3 border-b border-slate-800 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="divide-y divide-slate-800/60">
                      {loadingAdmins && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-400">
                            Loading admins…
                          </td>
                        </tr>
                      )}

                      {adminsError && !loadingAdmins && (
                        <tr>
                          <td colSpan={5} className="p-6 text-left text-rose-400">
                            {adminsError}
                          </td>
                        </tr>
                      )}

                      {!loadingAdmins && !adminsError && filteredAdmins.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-400">
                            No admins found.
                          </td>
                        </tr>
                      )}

                      {!loadingAdmins && !adminsError && filteredAdmins.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3 text-slate-200">{row.id}</td>
                          <td className="px-4 py-3">{row.username}</td>
                          <td className="px-4 py-3">{row.email}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-slate-800 border border-slate-700">
                              {row.level}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {new Date(row.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {activeTab === 'geeks' && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Geeks</h2>

              <div className="flex gap-2">
                <input
                  value={geeksAdmin.q}
                  onChange={(e) => geeksAdmin.setQ(e.target.value)}
                  placeholder="Search name/email/phone"
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2"
                />
                <select
                  value={geeksAdmin.status}
                  onChange={(e) => geeksAdmin.setStatus(e.target.value)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="suspend">Suspend</option>
                </select>
                <button
                  onClick={() => geeksAdmin.fetchGeeks({ page: 1, q: geeksAdmin.q, status: geeksAdmin.status })}
                  className="px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800"
                >
                  Filter
                </button>
              </div>

              {geeksAdmin.loading && <div className="text-sm text-zinc-400">Loading…</div>}
              {geeksAdmin.err && <div className="text-sm text-rose-400">{geeksAdmin.err}</div>}

              <div className="overflow-x-auto border border-zinc-800 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-900/50">
                    <tr>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Phone</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-right p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geeksAdmin.items.map(g => (
                      <tr key={g.id} className="border-t border-zinc-800">
                        <td className="p-2">{g.firstname} {g.lastname}</td>
                        <td className="p-2">{g.email}</td>
                        <td className="p-2">{g.phone || '—'}</td>
                        <td className="p-2">{g.status}</td>
                        <td className="p-2 text-right">
                          <button
                            onClick={async () => {
                              const next = g.status === 'active' ? 'suspend' : 'active';
                              try { await geeksAdmin.toggleStatus(g.id, next); } catch (e) { alert(e.message); }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-xs"
                          >
                            {g.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!geeksAdmin.loading && geeksAdmin.items.length === 0 && (
                      <tr><td className="p-3 text-center text-zinc-400" colSpan={5}>No results</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}


            {activeTab === 'filmers' && (
              <Card>
                {/* === FILMERS: table + controls === */}
                <div className="p-6">
                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-4">
                    <div className="relative flex-1">
                      <svg className="absolute left-3 top-2.5 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21l-4.3-4.3m-2.7 1.3a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <input
                        value={flQ}
                        onChange={(e) => { setFlPage(1); setFlQ(e.target.value); }}
                        placeholder="Search filmers by name or email…"
                        className="w-full pl-9 pr-3 py-2 rounded-md bg-slate-900/50 border border-slate-700 text-slate-100"
                      />
                    </div>

                    <select
                      value={`${flSort}:${flOrder}`}
                      onChange={(e) => {
                        const [s, o] = e.target.value.split(':');
                        setFlSort(s); setFlOrder(o); setFlPage(1);
                      }}
                      className="px-3 py-2 rounded-md bg-slate-900/50 border border-slate-700 text-slate-100"
                    >
                      {flSortOptions.map(opt => (
                        <option key={`${opt.sort}:${opt.order}`} value={`${opt.sort}:${opt.order}`}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <select
                      value={flLimit}
                      onChange={(e) => { setFlLimit(Number(e.target.value)); setFlPage(1); }}
                      className="px-3 py-2 rounded-md bg-slate-900/50 border border-slate-700 text-slate-100"
                    >
                      {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n} / page</option>)}
                    </select>
                  </div>

                  {/* Table */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-900/60 border-b border-slate-800">
                        <tr className="text-left text-slate-300">
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Company</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Created</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {flLoading && (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-slate-400">Loading…</td>
                          </tr>
                        )}
                        {!flLoading && flRows.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No filmers found.</td>
                          </tr>
                        )}
                        {!flLoading && flRows.map((r) => (
                          <tr key={r.id} className="text-slate-200">
                            <td className="px-4 py-3">
                              <div className="font-medium">{r.firstName} {r.lastName}</div>
                            </td>
                            <td className="px-4 py-3">{r.email}</td>
                            <td className="px-4 py-3">{r.company || '—'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs ${
                                r.status === 'active'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => flToggleStatus(r)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-700 bg-slate-900/40 hover:bg-slate-800/60"
                                title={r.status === 'active' ? 'Suspend' : 'Activate'}
                              >
                                <span className="inline-block w-4 h-4 rounded-full"
                                  style={{ background: r.status === 'active' ? 'rgba(16,185,129,.6)' : 'rgba(245,158,11,.6)' }}
                                />
                                <span>{r.status === 'active' ? 'Suspend' : 'Activate'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer / Pagination */}
                  <div className="mt-3 flex items-center justify-between text-slate-400 text-sm">
                    <div>{flTotal} result{flTotal === 1 ? '' : 's'}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFlPage((p) => Math.max(1, p - 1))}
                        disabled={flPage <= 1}
                        className="p-2 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
                        aria-label="Previous page"
                      >‹</button>
                      <div className="px-2">Page {flPage} / {flTotalPages}</div>
                      <button
                        onClick={() => setFlPage((p) => Math.min(flTotalPages, p + 1))}
                        disabled={flPage >= flTotalPages}
                        className="p-2 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-50"
                        aria-label="Next page"
                      >›</button>
                    </div>
                  </div>

                  {flErr && (
                    <div className="mt-3 rounded-md border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2">
                      {flErr}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeTab === 'releases' && (
            <div className="p-6">
              <div className="max-w-3xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg">
                <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
                  <Film size={18} className="text-slate-300" />
                  <h2 className="text-lg font-semibold">Upload Movie</h2>
                </div>

                <form onSubmit={submitMovie} className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Movie Title</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={mvForm.title}
                        onChange={(e) => setMvForm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="e.g., Star Odyssey"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                      />
                      <Film size={16} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Release Date */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Release Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={mvForm.release_date}
                        onChange={(e) => setMvForm((p) => ({ ...p, release_date: e.target.value }))}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                      />
                      <CalendarDays size={16} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Poster */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Poster (JPEG/PNG)</label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 hover:bg-slate-900/70">
                        <Upload size={16} className="text-slate-300" />
                        <span className="text-slate-200">Choose file</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={handlePosterChange}
                        />
                      </label>

                      {mvForm.poster ? (
                        <span className="text-sm text-slate-400">{mvForm.poster.name}</span>
                      ) : (
                        <span className="text-sm text-slate-500">No file selected</span>
                      )}
                    </div>

                    {/* Preview */}
                    {posterPreview && (
                      <div className="mt-4">
                        <div className="text-xs text-slate-400 mb-2">Preview</div>
                        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={posterPreview} alt="Poster preview" className="max-h-64 object-contain w-full" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Release Types (multi-select) */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Release Types</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {RELEASE_TYPE_OPTIONS.map((opt) => {
                        const checked = mvForm.release_types.includes(opt.key);
                        return (
                          <label
                            key={opt.key}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition
                              ${checked ? 'bg-indigo-950/40 border-indigo-700/50' : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60'}`}
                          >
                            <input
                              type="checkbox"
                              className="accent-indigo-600"
                              checked={checked}
                              onChange={() => toggleReleaseType(opt.key)}
                            />
                            <span className="text-sm text-slate-200">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={mvSubmitting}
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white px-4 py-2.5 rounded-xl"
                    >
                      <Upload size={16} />
                      {mvSubmitting ? 'Uploading...' : 'Upload Movie'}
                    </button>

                    {mvMsg.text && (
                      <div className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border
                        ${mvMsg.type === 'success'
                          ? 'text-emerald-300 border-emerald-700/40 bg-emerald-900/20'
                          : 'text-rose-300 border-rose-700/40 bg-rose-900/20'}`}>
                        {mvMsg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{mvMsg.text}</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'movies' && (
            <div className="p-6">
              {/* Header */}
              <div className="sticky top-0 z-10 -mt-6 mb-6 backdrop-blur bg-slate-900/40 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
                <Film size={18} className="text-slate-300" />
                <h2 className="text-lg font-semibold">Movies</h2>

                <div className="ml-auto flex items-center gap-2">
                  <div className="relative">
                    <input
                      value={mvQ}
                      onChange={(e) => setMvQ(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && mvLoad()}
                      placeholder="Search title…"
                      className="w-56 bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/40"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                  </div>
                  <button
                    onClick={mvLoad}
                    className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-sm"
                  >
                    Refresh
                  </button>
              </div>
              </div>

              {/* Debug mini status */}
              <div className="mb-4 text-xs text-slate-400">
                status: {mvLoading ? 'loading' : 'idle'} · count: {mvItems.length}
                {mvItems[0] ? ` · first: ${mvItems[0].title}` : ''}
                {mvErr ? ` · error: ${mvErr}` : ''}
              </div>

              {/* Loading skeleton */}
              {mvLoading && (
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
              {!mvLoading && mvErr && (
                <div className="p-6 text-center text-rose-300 bg-rose-900/10 border border-rose-700/30 rounded-xl">
                  {mvErr}
                </div>
              )}

              {/* Empty */}
              {!mvLoading && !mvErr && mvItems.length === 0 && (
                <div className="p-10 text-center text-slate-400">
                  No movies found. Try uploading one from “Releases → Upload Movie”.
                </div>
              )}

              {/* Grid */}
              {!mvLoading && !mvErr && mvItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
                  {mvItems.map((m) => (
                    <div key={m.id} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:bg-slate-900/70 transition">
                      {/* Poster */}
                      <div className="aspect-[2/3] bg-slate-950/40 border-b border-slate-800 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.poster_path || '/placeholder.svg'}
                          alt={m.title || 'Poster'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Caption */}
                      <div className="p-4">
                        <div className="text-slate-100 font-medium leading-snug line-clamp-2">{m.title || 'Untitled'}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {m.release_date ? new Date(m.release_date).toLocaleDateString() : '—'}
                        </div>

                        {Array.isArray(m.release_types) && m.release_types.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {m.release_types.map((t) => (
                              <span
                                key={`${m.id}-${t}`}
                                className="text-[11px] px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                              >
                                {MV_TYPE_LABELS[t] || t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* Reusable Components */

function SidebarItem({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-start gap-3 px-4 py-2.5 text-sm transition-all
      ${active 
        ? 'bg-indigo-600/20 text-indigo-300 border-r-2 border-indigo-400' 
        : 'text-slate-300 hover:bg-slate-800/60'
      }`}
    >
      <span className="p-2 bg-slate-800 rounded-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 shadow-lg p-6">
      {children}
    </div>
  );
}