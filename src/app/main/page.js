'use client'

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, Settings } from "lucide-react"
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // as email OR username
          identifier: formData.email,
          password: formData.password,
        }),
      });

      let data = null;
      try { data = await res.json(); } catch {}

      if (res.ok && data?.ok) {
        router.replace("/admin"); //  success -- to admin page
      } else {
        setErrors({ general: data?.error || "Invalid credentials" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background Gear Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Settings className="absolute top-20 left-20 w-20 h-20 text-white/9 animate-spin" style={{animationDuration: '20s'}} />
        <Settings className="absolute top-32 right-32 w-16 h-16 text-white/5 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}} />
        <Settings className="absolute bottom-40 left-16 w-20 h-20 text-white/4 animate-spin" style={{animationDuration: '30s'}} />
        <Settings className="absolute bottom-20 right-20 w-18 h-18 text-white/9 animate-spin" style={{animationDuration: '35s', animationDirection: 'reverse'}} />
        <Settings className="absolute top-1/2 left-10 w-14 h-14 text-white/9 animate-spin" style={{animationDuration: '40s'}} />
        <Settings className="absolute top-1/4 right-10 w-22 h-22 text-white/5 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
        <Settings className="absolute bottom-1/3 right-1/4 w-12 h-12 text-white/6 animate-spin" style={{animationDuration: '28s'}} />
        <Settings className="absolute top-3/4 left-1/3 w-24 h-24 text-white/8 animate-spin" style={{animationDuration: '45s', animationDirection: 'reverse'}} />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-18 h-18 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white-900 mb-2">REELEVO Control Panel</h1>
          <p className="text-white-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* wrapper*/}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter email or username"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 text-white py-3 px-4 rounded-lg font-semibold shadow-[0_6px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] active:shadow-[0_2px_10px_rgba(79,70,229,0.4)] border border-indigo-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-indigo-600 flex items-center justify-center gap-2 active:translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* ▲▲ only change ends here ▲▲ */}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              For administrative use only.{" "}
              <button className="text-white hover:text-indigo-500 font-semibold transition-colors">
                Click here for user login.
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
