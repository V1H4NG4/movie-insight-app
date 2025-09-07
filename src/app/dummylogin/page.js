'use client';
import { useState } from 'react';

export default function NemesisDummyPage() {
  // --- form states ---
  const [budget, setBudget] = useState('');
  const [runtime, setRuntime] = useState('');
  const [rating, setRating] = useState('');
  const [popularity, setPopularity] = useState('');
  const [genre1, setGenre1] = useState('Action');
  const [genre2, setGenre2] = useState('');

  // --- prediction states ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);

  // helper
  function fmtAsMillions(n) {
    if (n == null || isNaN(n)) return '—';
    return `$${(Number(n) / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 })} M`;
  }

  async function onPredict(e) {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      // pretend we called the backend
      await new Promise(r => setTimeout(r, 1000));
      const fakeValue = Math.random() * 500_000_000; // random up to $500M
      setPrediction(fakeValue);
    } catch (err) {
      setError('Dummy prediction failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-900 text-slate-100 p-6">
      <h1 className="text-xl font-semibold mb-4">Nemesis Dummy Page</h1>

      <form
        onSubmit={onPredict}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl"
      >
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget (millions)"
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        />
        <input
          type="number"
          value={runtime}
          onChange={(e) => setRuntime(e.target.value)}
          placeholder="Runtime (minutes)"
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (0–100)"
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        />
        <input
          type="number"
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          placeholder="Popularity"
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        />

        <select
          value={genre1}
          onChange={(e) => setGenre1(e.target.value)}
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        >
          <option>Action</option><option>Drama</option><option>Comedy</option>
        </select>
        <select
          value={genre2}
          onChange={(e) => setGenre2(e.target.value)}
          className="bg-slate-800 rounded-lg px-3 py-2 outline-none"
        >
          <option value="">None</option>
          <option>Action</option><option>Drama</option><option>Comedy</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-500 rounded-lg py-2 font-medium"
        >
          {loading ? 'Predicting…' : 'Predict'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-sm px-3 py-2 rounded-md border border-red-700 bg-red-900/30 text-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="text-xs uppercase tracking-wider text-slate-400">Predicted Box Office</div>
        <div className="mt-2 text-3xl font-bold">
          {prediction == null ? '—' : fmtAsMillions(prediction)}
        </div>
        <div className="mt-1 text-xs text-slate-500">Model: Nemesis (Dummy)</div>
      </div>
    </div>
  );
}
