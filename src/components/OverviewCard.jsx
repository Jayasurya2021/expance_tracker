import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Upload, TrendingUp } from 'lucide-react';
import { overviewChartBars } from '../mockData';

export default function OverviewCard({ currency = "$" }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState(32); // Default July peak index from reference image

  const activeBar = overviewChartBars[activeBarIndex] || overviewChartBars[32];

  // Tooltip dynamic values based on active bar
  const tooltipValue = activeBar.value || `$${(1200 + activeBar.height * 10.5).toFixed(2)}`;
  const tooltipLabel = activeBar.label || `for ${activeBar.month} ${selectedYear}`;
  const tooltipGrowth = activeBar.growth || `${activeBar.height > 60 ? '+' : '-'}${(activeBar.height / 25).toFixed(2)}%`;

  return (
    <div className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 text-white shadow-xl shadow-orange-950/10 border border-white/10 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, #741007 0%, #9F1B0B 22%, #C52B0C 48%, #E55212 75%, #F76B15 100%)'
      }}
    >
      {/* Subtle organic light reflections to give depth like fintech dashboards */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between relative z-10">
        <h2 className="text-lg sm:text-xl font-medium text-white/95 tracking-tight">
          Overview
        </h2>

        <div className="flex items-center gap-2">
          {/* Year Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/95 flex items-center gap-1.5 hover:bg-white/20 transition-all cursor-pointer"
            >
              <span>Year {selectedYear}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/80" />
            </button>

            {showYearDropdown && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#8B120A] border border-white/20 rounded-2xl shadow-2xl p-1 z-30 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setShowYearDropdown(false)}
              >
                {['2026', '2025', '2024'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setSelectedYear(yr);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer ${
                      selectedYear === yr ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action icon (as seen in reference image) */}
          <button 
            aria-label="Export or maximize"
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/90 hover:bg-white/25 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 rotate-45" />
          </button>
        </div>
      </div>

      {/* Main Balance Display */}
      <div className="mt-4 mb-6 relative z-10">
        <div className="flex items-baseline">
          <span className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white drop-shadow-sm">
            {currency}1,842
          </span>
          <span className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white/85">
            .56
          </span>
        </div>

        {/* Growth badge pill */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full text-xs font-semibold text-white/95 shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
          <span>2.46% this month</span>
        </div>
      </div>

      {/* Histogram Needle Chart Section (Faithful recreation from reference image) */}
      <div className="relative mt-2 pt-16 z-10 select-none">
        
        {/* Y-Axis Labels along left side */}
        <div className="absolute left-0 top-16 bottom-10 flex flex-col justify-between text-[11px] font-medium text-white/50 pointer-events-none">
          <span>2.0k</span>
          <span>1.5k</span>
          <span>1.0k</span>
          <span>0.5k</span>
        </div>

        {/* Floating Tooltip Card over the active bar */}
        <div 
          className="absolute z-20 transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: `${Math.min(Math.max((activeBarIndex / overviewChartBars.length) * 100, 15), 75)}%`,
            top: '0px',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="relative bg-white text-neutral-900 px-4 py-2.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] border border-neutral-100 min-w-[150px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-base sm:text-lg font-extrabold text-neutral-950 tracking-tight">
                {tooltipValue}
              </span>
              <span className="inline-flex items-center gap-0.5 bg-[#111111] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                {tooltipGrowth}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
              {tooltipLabel}
            </p>

            {/* Tooltip downward triangle pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white" />
          </div>
        </div>

        {/* Dense Needle Bar Histogram Grid */}
        <div className="ml-10 h-36 flex items-end justify-between gap-[2px] sm:gap-[3px]">
          {overviewChartBars.map((bar, idx) => {
            const isActive = idx === activeBarIndex;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveBarIndex(idx)}
                className="group relative flex-1 h-full flex items-end justify-center cursor-pointer py-1"
              >
                {/* Needle Bar */}
                <div
                  className={`w-full max-w-[4px] rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] opacity-100 scale-y-105'
                      : 'bg-white/40 hover:bg-white/80'
                  }`}
                  style={{
                    height: `${bar.height}%`,
                    minHeight: '8px'
                  }}
                />

                {/* Dot at the tip of the active bar */}
                {isActive && (
                  <div className="absolute w-2 h-2 rounded-full bg-white ring-4 ring-white/30 top-auto shadow-md"
                    style={{ bottom: `calc(${bar.height}% - 4px)` }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* X-Axis Month Labels Jan - Dec */}
        <div className="ml-10 mt-3 pt-3 border-t border-white/15 flex justify-between text-[11px] font-medium text-white/60">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
            <span key={m} className="hover:text-white transition-colors cursor-pointer">{m}</span>
          ))}
        </div>

      </div>
    </div>
  );
}
