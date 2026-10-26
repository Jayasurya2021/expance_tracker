import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [type, setType] = useState('expense');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [paymentMethod, setPaymentMethod] = useState('Visa Debit (•••• 2841)');
  const [date, setDate] = useState('2026-04-26');
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!merchant || !amount) return;

    const newTx = {
      id: `tx_${Date.now()}`,
      merchant,
      subtitle: 'Just now',
      date,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category,
      card: paymentMethod.includes('••••') ? paymentMethod.split('(')[1]?.replace(')', '') : '•••• 9286',
      paymentMethod,
      status: 'Completed',
      statusColor: 'emerald',
      amount: type === 'expense' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      type,
      brandBg: type === 'expense' ? 'bg-orange-500' : 'bg-emerald-600',
      brandColor: 'text-white'
    };

    if (onAddTransaction) {
      onAddTransaction(newTx);
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setMerchant('');
      setAmount('');
      setNote('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl border border-neutral-150 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Quick Entry</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Add Transaction
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Record a new expense or income item. Ready for Phase 2 API synchronization.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-neutral-900">Transaction Added!</h4>
            <p className="text-xs text-neutral-500 mt-1">Updated in dashboard view.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Type Switcher: Expense vs Income */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-neutral-100 rounded-full">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  type === 'expense'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Expense (-)
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  type === 'income'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Income (+)
              </button>
            </div>

            {/* Merchant / Payee */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Merchant / Payee Name
              </label>
              <input
                type="text"
                required
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. Swiggy, Netflix, Salary, Uber"
                className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Amount & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Category & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transport">Transport</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Salary">Salary</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="Visa Debit (•••• 2841)">Visa Debit (•••• 2841)</option>
                  <option value="Spendly Platinum (•••• 9286)">Spendly Platinum (•••• 9286)</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="UPI / GPay">UPI / GPay</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            {/* Note / Tag */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Dinner with team, monthly software license..."
                className="w-full px-4 py-2 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save Transaction</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
