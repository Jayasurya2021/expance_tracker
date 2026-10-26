import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, ArrowUpRight, Sparkles, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { monthlyReportChartData } from '../mockData';

export default function ReportsView({ onOpenCreateReport }) {
  const [selectedRange, setSelectedRange] = useState('6M');
  const [activeChartType, setActiveChartType] = useState('bar');

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Financial Analytics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Compare multi-month income against expenses and trace wealth accumulation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-neutral-200 p-1 rounded-full text-xs font-semibold shadow-xs">
            {['1M', '3M', '6M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  selectedRange === range ? 'bg-[#111111] text-white shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenCreateReport}
            className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-[28px] p-6 border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Average Monthly Income</span>
          <p className="text-3xl font-extrabold text-neutral-950 mt-1">$6,166.00</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="w-4 h-4" />
            <span>+8.4% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Average Monthly Expense</span>
          <p className="text-3xl font-extrabold text-neutral-950 mt-1">$3,276.00</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-rose-500">
            <TrendingDown className="w-4 h-4" />
            <span>-2.1% lower spending</span>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Net Savings Rate</span>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">46.8%</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight className="w-4 h-4" />
            <span>$3,240 saved this month</span>
          </div>
        </div>
      </div>

      {/* Main Income vs Expense Recharts Visual */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-neutral-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Income vs. Expenses Trend</h3>
            <span className="text-xs text-neutral-400">Monthly breakdown across past 6 recording cycles</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChartType('bar')}
              className={`p-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                activeChartType === 'bar' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-50 text-neutral-600 border-neutral-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Columns
            </button>
            <button
              onClick={() => setActiveChartType('area')}
              className={`p-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                activeChartType === 'area' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-50 text-neutral-600 border-neutral-200'
              }`}
            >
              <PieIcon className="w-4 h-4" /> Area Flow
            </button>
          </div>
        </div>

        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartType === 'bar' ? (
              <BarChart data={monthlyReportChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={12} tickLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', borderRadius: '16px', border: 'none', color: '#fff' }} 
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px' }} />
                <Bar dataKey="income" name="Income" fill="#16A34A" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#EA580C" radius={[8, 8, 0, 0]} />
                <Bar dataKey="savings" name="Net Savings" fill="#0284C7" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={monthlyReportChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EA580C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EA580C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={12} tickLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', borderRadius: '16px', border: 'none', color: '#fff' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px' }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#16A34A" fillOpacity={1} fill="url(#incomeGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#EA580C" fillOpacity={1} fill="url(#expenseGrad)" strokeWidth={2.5} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
