import React, { useState } from 'react';
import { Search, Filter, Plus, Download, ArrowUpRight, ArrowDownLeft, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { recentTransactions as initialTransactions } from '../mockData';

export default function TransactionsView({ onOpenAddTransaction }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesType = selectedType === 'All' || 
                        (selectedType === 'Expense' && (tx.type === 'expense' || tx.amount < 0)) ||
                        (selectedType === 'Income' && (tx.type === 'income' || tx.amount > 0));
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setDeleteConfirmId(null);
  };

  const handleExportCSV = () => {
    const headers = "ID,Merchant,Category,PaymentMethod,Card,Date,Amount,Status\n";
    const rows = filteredTransactions.map(t => 
      `"${t.id}","${t.merchant}","${t.category}","${t.paymentMethod}","${t.card}","${t.date}",${t.amount},"${t.status}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Spendly_Transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage, filter, and export all personal incoming and outgoing cash flows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddTransaction}
            className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3 justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search merchant or category..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type Filter */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-full text-xs font-semibold">
            {['All', 'Expense', 'Income'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-full transition cursor-pointer ${
                  selectedType === t
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Utilities">Utilities</option>
            <option value="Salary">Salary</option>
          </select>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[28px] border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                <th className="py-4 px-6">Merchant & Payee</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Payment Method</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 text-sm">
                    No transactions match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isExpense = tx.type === 'expense' || tx.amount < 0;
                  const isPending = tx.status === 'In progress';

                  return (
                    <tr key={tx.id} className="hover:bg-neutral-50/60 transition group">
                      
                      {/* Merchant */}
                      <td className="py-4 px-6 font-bold text-neutral-900 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${tx.brandBg || 'bg-neutral-800'} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                          {tx.merchant[0]}
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                            {tx.merchant}
                          </p>
                          <span className="text-[11px] text-neutral-400 font-normal">{tx.id}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                          {tx.category}
                        </span>
                      </td>

                      {/* Payment Method / Card */}
                      <td className="py-4 px-4">
                        <div className="text-xs">
                          <p className="font-medium text-neutral-800">{tx.paymentMethod}</p>
                          <span className="font-mono text-neutral-400">{tx.card}</span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4 text-xs text-neutral-500 font-medium whitespace-nowrap">
                        <p>{tx.date}</p>
                        <span className="text-neutral-400">{tx.time || '12:00'}</span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          isPending 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {tx.status}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6 text-right font-bold whitespace-nowrap">
                        <span className={isExpense ? 'text-rose-600' : 'text-emerald-700 font-extrabold'}>
                          {isExpense ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${Math.abs(tx.amount).toFixed(2)}`}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        {deleteConfirmId === tx.id ? (
                          <div className="inline-flex items-center gap-1.5 bg-rose-50 p-1 rounded-xl">
                            <button
                              onClick={() => handleDelete(tx.id)}
                              className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-0.5 rounded-lg bg-neutral-200 text-neutral-700 text-[11px] font-medium cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition">
                            <button
                              onClick={() => setDeleteConfirmId(tx.id)}
                              aria-label="Delete transaction"
                              className="w-8 h-8 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <span>Showing {filteredTransactions.length} of {transactions.length} records</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Frontend State Active (Phase 2 API ready)
          </span>
        </div>
      </div>

    </div>
  );
}
