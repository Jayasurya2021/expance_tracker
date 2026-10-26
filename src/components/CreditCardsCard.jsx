import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowDownRight, ArrowLeftRight, Plus, CreditCard, Shield } from 'lucide-react';
import { currentUser } from '../mockData';

export default function CreditCardsCard({ currency = "$", onDepositClick, onWithdrawClick }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <div 
      className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-orange-950/10 border border-white/10 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(145deg, #7A1208 0%, #A21D0D 25%, #C9320E 52%, #E85713 78%, #FA751B 100%)'
      }}
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-medium text-white/95 tracking-tight">
            Credit Cards
          </h2>

          <div className="flex items-center gap-2">
            <button className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/95 hover:bg-white/20 transition cursor-pointer">
              All Cards
            </button>
            <button 
              aria-label="Add new card"
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/90 hover:bg-white/25 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Balance Display */}
        <div className="mt-4 mb-4">
          <div className="flex items-baseline">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {currency}1,038
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-white/85">
              .47
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-full text-xs font-semibold text-white/95">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
              <span>2.46% this month</span>
            </div>

            <div className="glass-pill px-3 py-1 rounded-full text-xs font-medium text-white/90">
              Credit Limit: {currency}10,000.00
            </div>
          </div>
        </div>

        {/* Action Buttons: Deposit, Swap, Withdraw (Directly from reference image) */}
        <div className="mt-6 flex items-center gap-2.5">
          <button 
            onClick={onDepositClick}
            className="flex-1 bg-white hover:bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ArrowUpRight className="w-4 h-4 text-orange-600" />
            <span>Deposit</span>
          </button>

          <button 
            aria-label="Transfer / Swap"
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <button 
            onClick={onWithdrawClick}
            className="flex-1 bg-white hover:bg-neutral-100 text-neutral-900 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <ArrowDownRight className="w-4 h-4 text-neutral-600" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Layered Credit Card Stack Visual (As in reference image) */}
      <div className="relative mt-8 pt-6">
        
        {/* Layer 3 - Bottom shadow card */}
        <div className="absolute inset-x-8 -top-3 h-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transform scale-90" />
        
        {/* Layer 2 - Middle card */}
        <div className="absolute inset-x-4 -top-1 h-20 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md transform scale-95" />

        {/* Layer 1 - Active Front Card */}
        <div className="relative bg-gradient-to-tr from-white/20 to-white/10 rounded-2xl p-5 border border-white/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            {/* Contactless wave & EMV Chip icon */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-5 rounded-md bg-amber-400/80 border border-amber-300/60 shadow-inner flex items-center justify-center">
                <div className="w-4 h-3 border border-amber-600/40 rounded-sm" />
              </div>
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>

            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80">Spendly Platinum</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* Card Digits & Expiry (Matching •••• 9286 08 / 32 from reference) */}
            <div className="flex items-center gap-5">
              <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-white drop-shadow">
                •••• 9286
              </span>
              <span className="font-mono text-xs sm:text-sm text-white/80 font-medium">
                08 / 32
              </span>
            </div>

            {/* Embossed VISA Logo */}
            <div className="italic font-black text-xl sm:text-2xl tracking-tighter text-white drop-shadow select-none">
              VISA
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
