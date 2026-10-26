import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './pages/DashboardView';
import TransactionsView from './pages/TransactionsView';
import ImportStatementView from './pages/ImportStatementView';
import BudgetsView from './pages/BudgetsView';
import ReportsView from './pages/ReportsView';
import AuthView from './pages/AuthView';
import AddTransactionModal from './components/AddTransactionModal';
import CreateReportModal from './components/CreateReportModal';
import NotificationDrawer from './components/NotificationDrawer';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleDepositClick = () => {
    setIsAddModalOpen(true);
  };

  const handleWithdrawClick = () => {
    setIsAddModalOpen(true);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#111111] flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      
      {/* Top Floating Pill Navigation */}
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuth={() => handleOpenAuth('login')}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          unreadCount={3}
        />

        {/* Dynamic Page Views */}
        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenCreateReport={() => setIsReportModalOpen(true)}
            onOpenAddTransaction={() => setIsAddModalOpen(true)}
            onViewAllTransactions={() => setActiveTab('transactions')}
            onSelectCategory={() => setActiveTab('budgets')}
            onSelectTransaction={() => setActiveTab('transactions')}
            onDepositClick={handleDepositClick}
            onWithdrawClick={handleWithdrawClick}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsView
            onOpenAddTransaction={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'import' && (
          <ImportStatementView
            onImportComplete={() => setActiveTab('transactions')}
          />
        )}

        {activeTab === 'budgets' && (
          <BudgetsView />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            onOpenCreateReport={() => setIsReportModalOpen(true)}
          />
        )}
      </div>

      {/* Global Modals & Drawers */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <CreateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {isAuthOpen && (
        <AuthView
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={() => {
            setIsAuthOpen(false);
            setActiveTab('dashboard');
          }}
        />
      )}

      {/* Minimal Sleek Footer */}
      <footer className="w-full py-6 px-4 sm:px-8 border-t border-neutral-200/60 bg-white/40 mt-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-700">Spendly AI</span>
            <span>•</span>
            <span>Premium Fintech Expense Tracker</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenAuth('login')}
              className="hover:text-neutral-900 transition font-medium cursor-pointer"
            >
              Sign In Demo
            </button>
            <button
              onClick={() => handleOpenAuth('register')}
              className="hover:text-neutral-900 transition font-medium cursor-pointer"
            >
              Register Demo
            </button>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Frontend UI Ready for API Phase 2
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
