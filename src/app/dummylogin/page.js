"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SimpleLogin() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok && data?.ok) {
        // ✅ Just go to admin page directly
        router.push("/admin");
      } else {
        setError(data?.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 bg-slate-800 p-6 rounded-xl">
        <h1 className="text-xl text-white font-semibold">Admin Login</h1>

        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}