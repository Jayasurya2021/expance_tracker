import React from 'react';
import HeroHeader from '../components/HeroHeader';
import OverviewCard from '../components/OverviewCard';
import CreditCardsCard from '../components/CreditCardsCard';
import RecentTransactionsCard from '../components/RecentTransactionsCard';
import CategorySpendingGrid from '../components/CategorySpendingGrid';
import { Sparkles } from 'lucide-react';

export default function DashboardView({
  onOpenCreateReport,
  onOpenAddTransaction,
  onViewAllTransactions,
  onSelectCategory,
  onSelectTransaction,
  onDepositClick,
  onWithdrawClick
}) {
  return (
    <div className="w-full pb-16">
      
      {/* Hero Welcome Header (As in reference image) */}
      <HeroHeader
        userName="Emma"
        onOpenCreateReport={onOpenCreateReport}
        onOpenAddTransaction={onOpenAddTransaction}
      />

      {/* Main Grid Container matching reference layout */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Top Hero Cards Row: Overview Card (Left) & Credit Cards Card (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Overview Card with Sunset Gradient and Needle Histogram */}
          <div className="lg:col-span-7 flex flex-col">
            <OverviewCard currency="$" />
          </div>

          {/* Credit Cards Card with Sunset Gradient and VISA Stack */}
          <div className="lg:col-span-5 flex flex-col">
            <CreditCardsCard 
              currency="$" 
              onDepositClick={onDepositClick}
              onWithdrawClick={onWithdrawClick}
            />
          </div>

        </section>

        {/* Bottom Row: Recent Transactions (Left) & Spending by Category (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Recent Transactions Card (Adobe, Stripe, Swiggy, etc.) */}
          <div className="lg:col-span-7 flex flex-col">
            <RecentTransactionsCard
              onViewAll={onViewAllTransactions}
              onSelectTransaction={onSelectTransaction}
            />
          </div>

          {/* Category Spending 2x2 Cards Grid (Groceries, Clothes, Cafes, Sport) */}
          <div className="lg:col-span-5 flex flex-col">
            <CategorySpendingGrid
              onSelectCategory={onSelectCategory}
            />
          </div>

        </section>

      </main>

    </div>
  );
}
