import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function HeroHeader({ userName = "Emma", onOpenCreateReport, onOpenAddTransaction }) {
  return (
    <div className="w-full pt-4 pb-6 px-4 sm:px-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        
        {/* Left: Titles from Reference Image */}
        <div>
          <p className="text-neutral-500 text-sm md:text-base font-medium tracking-tight mb-1">
            Take control of your finances with real-time insights
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-[-0.03em] leading-tight">
            Welcome Back, {userName}!
          </h1>
        </div>

        {/* Right: Actions (Matching "Create Report" pill button in the image + Quick Add) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateReport}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer select-none active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Create Report</span>
          </button>

          <button
            onClick={onOpenAddTransaction}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer select-none active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>

      </div>
    </div>
  );
}
