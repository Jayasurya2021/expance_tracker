import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { currentUser } from '../mockData';

export default function Navbar({ activeTab, setActiveTab, onOpenAuth, onOpenNotifications, unreadCount = 3 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'import', label: 'Import Statement' },
    { id: 'budgets', label: 'Budgets' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="w-full pt-6 pb-4 px-4 sm:px-8 max-w-[1440px] mx-auto relative z-30">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Stylized Modern Fintech Monogram (as in reference image) */}
          <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-label="Spendly AI">
              <path d="M13.5 2L4 18h5l2.5-5h5l2.5 5h5L14.5 2h-1zm-1 5.5l1.8 3.5h-3.6l1.8-3.5z" />
            </svg>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#111111] flex items-center gap-1">
              Spendly<span className="text-orange-600 font-extrabold text-xs uppercase px-1.5 py-0.5 rounded-md bg-orange-100">AI</span>
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Bar (Exact design from reference image) */}
        <nav className="hidden md:flex items-center bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-full p-1.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Notifications & Profile Avatar */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-11 h-11 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-sm transition-all relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-11 h-11 rounded-full p-0.5 border border-neutral-200 hover:ring-2 hover:ring-neutral-900/10 transition-all cursor-pointer overflow-hidden flex items-center justify-center bg-neutral-100"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {userDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-150 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="p-3 border-b border-neutral-100 flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{currentUser.fullName}</p>
                    <p className="text-xs text-neutral-500 truncate">{currentUser.email}</p>
                  </div>
                </div>

                <div className="py-1 text-xs text-neutral-600">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-neutral-400" /> My Profile & Card
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-50 flex items-center gap-2 cursor-pointer text-orange-600 font-semibold"
                  >
                    <Sparkles className="w-4 h-4 text-orange-500" /> Switch / Register View
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Sign Out (Demo)
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-100 px-3 pb-1 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Spendly AI v1.0</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Frontend Ready
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-3xl p-4 shadow-lg flex flex-col gap-1.5 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-[#111111] text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between px-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="text-xs font-semibold text-orange-600 hover:underline py-1"
            >
              Open Login / Register Page
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
