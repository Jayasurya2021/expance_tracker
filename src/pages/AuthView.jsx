import React, { useState } from 'react';
import { Eye, EyeOff, Check, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';

export default function AuthView({ initialMode = 'login', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('emma.richardson@fintech.io');
  const [password, setPassword] = useState('Password@2026');
  const [fullName, setFullName] = useState('Emma Richardson');
  const [phone, setPhone] = useState('9876543210');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [demoMessage, setDemoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setDemoMessage('');

    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        setDemoMessage('Welcome back, Emma! Redirecting to Dashboard...');
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess();
        }, 800);
      } else {
        setDemoMessage('Demo account registered successfully! Redirecting...');
        setTimeout(() => {
          onLoginSuccess && onLoginSuccess();
        }, 800);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-5xl rounded-[36px] shadow-2xl border border-neutral-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] animate-in zoom-in-95 duration-200">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100/80 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Premium Fintech Illustration & Branding */}
        <div 
          className="lg:col-span-5 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #741007 0%, #9F1B0B 25%, #C52B0C 50%, #E55212 75%, #F76B15 100%)'
          }}
        >
          {/* Subtle glowing orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-300/15 rounded-full blur-3xl" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-neutral-950 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M13.5 2L4 18h5l2.5-5h5l2.5 5h5L14.5 2h-1zm-1 5.5l1.8 3.5h-3.6l1.8-3.5z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">Spendly AI</span>
          </div>

          {/* Middle: Abstract Graphic Shapes & Title */}
          <div className="relative z-10 my-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Personal Finance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
              Take control of your money.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Track expenses across accounts, import bank statements, and receive intelligent spending recommendations.
            </p>

            {/* CSS-based geometric abstract card illustration */}
            <div className="relative w-full max-w-xs h-36 mx-auto">
              <div className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 transform rotate-3 shadow-lg p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>•••• 9286</span>
                  <span className="font-bold text-white">VISA</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/70">April Savings</span>
                  <p className="text-xl font-bold">$3,240.00</p>
                </div>
              </div>
              <div className="absolute inset-x-4 -top-3 h-28 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm transform -rotate-2" />
            </div>
          </div>

          {/* Bottom Security reassurance */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Frontend Prototype (Ready for Phase 2 API hookup)</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Form (Login / Register Switchable) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          
          <div className="max-w-md w-full mx-auto">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-neutral-100 p-1.5 rounded-full mb-6 w-fit">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  mode === 'login' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  mode === 'register' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              {mode === 'login' 
                ? 'Sign in to access your financial dashboard and card balances.' 
                : 'Start tracking your expenses with simulated AI categorization.'}
            </p>

            {demoMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{demoMessage}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Emma Richardson"
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              )}

              {/* Email / Phone */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              {/* Phone with +91 country code (as requested) */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3.5 py-2.5 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 flex items-center">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Password field with show/hide */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-neutral-700">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert("Demo Password reset link sent to registered email.")}
                      className="text-xs text-orange-600 font-semibold hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter (as requested in spec) */}
                {mode === 'register' && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            strength >= step 
                              ? strength === 4 ? 'bg-emerald-500' : strength >= 2 ? 'bg-orange-500' : 'bg-rose-500' 
                              : 'bg-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {strength === 4 ? 'Strong password' : strength >= 2 ? 'Medium strength' : 'Weak password'}
                    </span>
                  </div>
                )}
              </div>

              {/* Terms checkbox */}
              {mode === 'register' && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-orange-600 rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-neutral-600 leading-tight">
                    I agree to the <span className="font-semibold text-neutral-900 underline">Terms of Service</span> and <span className="font-semibold text-neutral-900 underline">Privacy Policy</span>.
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111111] hover:bg-neutral-800 text-white font-bold py-3.5 rounded-2xl text-sm transition shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In to Spendly' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Bottom Toggle */}
            <div className="mt-6 text-center text-xs text-neutral-500">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
