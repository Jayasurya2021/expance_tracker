import React, { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, ShoppingCart, Shirt, Coffee, Monitor, Activity, Car, Edit2, Trash2 } from 'lucide-react';
import { budgetsList as initialBudgets } from '../mockData';

export default function BudgetsView() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;
  const overallPercentage = Math.round((totalSpent / totalAllocated) * 100);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'shopping-cart': return <ShoppingCart className="w-5 h-5" />;
      case 'shirt': return <Shirt className="w-5 h-5" />;
      case 'coffee': return <Coffee className="w-5 h-5" />;
      case 'monitor': return <Monitor className="w-5 h-5" />;
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'car': default: return <Car className="w-5 h-5" />;
    }
  };

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newCategory || !newLimit) return;
    const item = {
      id: `bgt_${Date.now()}`,
      category: newCategory,
      spent: 0,
      allocated: Number(newLimit),
      color: '#EA580C',
      icon: 'shopping-cart',
      status: 'On Track'
    };
    setBudgets([...budgets, item]);
    setShowAddModal(false);
    setNewCategory('');
    setNewLimit('');
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Budgets & Spending Limits
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Set guardrails across essential and discretionary monthly spending.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Budget Limit</span>
        </button>
      </div>

      {/* Top Overview Summary Card */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-[32px] p-6 sm:p-8 text-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          <div>
            <span className="text-xs text-neutral-400 font-medium">Monthly Budget Pool</span>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              ${totalAllocated.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 font-medium">Total Spent in April</span>
            <p className="text-3xl sm:text-4xl font-extrabold text-orange-400 mt-1">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div>
            <span className="text-xs text-neutral-400 font-medium">Available Remaining</span>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
              ${totalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span>Overall Utilization</span>
              <span className="text-orange-300">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-400 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {budgets.map((bgt) => {
          const percent = Math.round((bgt.spent / bgt.allocated) * 100);
          const isNearLimit = percent >= 85;
          const isExceeded = percent >= 100;

          return (
            <div 
              key={bgt.id}
              className="bg-white rounded-[28px] p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: bgt.color }}
                    >
                      {getIcon(bgt.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{bgt.category}</h3>
                      <span className="text-xs text-neutral-400">Monthly Cap</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteBudget(bgt.id)}
                    aria-label="Delete budget"
                    className="text-neutral-300 hover:text-rose-500 transition cursor-pointer p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-extrabold text-neutral-900">
                    ${bgt.spent.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    of ${bgt.allocated.toFixed(2)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExceeded 
                        ? 'bg-rose-600' 
                        : isNearLimit 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className={`font-bold flex items-center gap-1 ${
                  isExceeded 
                    ? 'text-rose-600' 
                    : isNearLimit 
                    ? 'text-amber-600' 
                    : 'text-neutral-500'
                }`}>
                  {isNearLimit && <AlertTriangle className="w-3.5 h-3.5" />}
                  {percent}% Spent
                </span>

                <span className="text-neutral-400 font-medium">
                  ${Math.max(bgt.allocated - bgt.spent, 0).toFixed(2)} remaining
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-150 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-neutral-900 mb-1">Add Budget Limit</h3>
            <p className="text-xs text-neutral-500 mb-4">Set maximum monthly threshold for a category.</p>

            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Health & Wellness, Travel"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Monthly Limit ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="500.00"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
