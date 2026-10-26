import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';
import { recentTransactions } from '../mockData';

export default function RecentTransactionsCard({ onViewAll, onSelectTransaction }) {
  // Brand icon helper to match reference image (Adobe red logo, Stripe violet logo, etc.)
  const renderBrandIcon = (tx) => {
    if (tx.iconBrand === 'adobe') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-[#FA0F00] flex items-center justify-center text-white font-black text-lg shadow-sm">
          A
        </div>
      );
    }
    if (tx.iconBrand === 'stripe') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-[#635BFF] flex items-center justify-center text-white font-extrabold text-xs tracking-tight shadow-sm">
          stripe
        </div>
      );
    }
    if (tx.iconBrand === 'swiggy') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-[#FC8019] flex items-center justify-center text-white shadow-sm font-bold text-sm">
          🍔
        </div>
      );
    }
    if (tx.iconBrand === 'amazon') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-[#232F3E] flex items-center justify-center text-amber-400 font-bold text-xs shadow-sm">
          a
        </div>
      );
    }
    return (
      <div className={`w-10 h-10 rounded-2xl ${tx.brandBg} flex items-center justify-center ${tx.brandColor} shadow-sm font-bold text-xs`}>
        {tx.type === 'income' ? '↓' : '↑'}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-neutral-200/80 shadow-sm flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
          Recent Transactions
        </h3>
        <button
          onClick={onViewAll}
          className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Transaction List Rows */}
      <div className="divide-y divide-neutral-100 space-y-3">
        {recentTransactions.slice(0, 4).map((tx) => {
          const isExpense = tx.type === 'expense' || tx.amount < 0;
          const isPending = tx.status === 'In progress';

          return (
            <div
              key={tx.id}
              onClick={() => onSelectTransaction && onSelectTransaction(tx)}
              className="pt-3 first:pt-0 flex items-center justify-between gap-3 hover:bg-neutral-50/70 p-2 rounded-2xl transition-all cursor-pointer group"
            >
              {/* Left: Brand Icon & Merchant Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="shrink-0 transition-transform group-hover:scale-105">
                  {renderBrandIcon(tx)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                    {tx.merchant}
                  </p>
                  <p className="text-xs text-neutral-400 font-medium truncate">
                    {tx.subtitle}
                  </p>
                </div>
              </div>

              {/* Center: Status Badge Pill & Card Digits (as in reference image) */}
              <div className="hidden sm:flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    isPending
                      ? 'bg-amber-50/80 text-amber-700 border-amber-200/60'
                      : 'bg-emerald-50/80 text-emerald-700 border-emerald-200/60'
                  }`}
                >
                  {tx.status}
                </span>

                <span className="font-mono text-xs text-neutral-400 tracking-wider">
                  {tx.card}
                </span>
              </div>

              {/* Right: Amount */}
              <div className="text-right shrink-0">
                <p
                  className={`text-sm sm:text-base font-bold tracking-tight ${
                    isExpense ? 'text-rose-600' : 'text-neutral-950 font-extrabold'
                  }`}
                >
                  {isExpense ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${Math.abs(tx.amount).toFixed(2)}`}
                </p>
                <span className="sm:hidden text-[10px] text-neutral-400 font-medium">
                  {tx.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
