import React from 'react';
import { ShoppingCart, Shirt, Coffee, Dumbbell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { categoryCards } from '../mockData';

export default function CategorySpendingGrid({ onSelectCategory }) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'shopping-cart':
        return <ShoppingCart className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />;
      case 'shirt':
        return <Shirt className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />;
      case 'activity':
      default:
        return <Dumbbell className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {categoryCards.map((cat) => {
        const isUp = cat.trendDirection === 'up';

        return (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className="group bg-white rounded-[24px] p-5 sm:p-6 border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Top row: Category title & Icon (Exact layout from reference image) */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                {cat.title}
              </h4>
              <div className="p-1">
                {getCategoryIcon(cat.icon)}
              </div>
            </div>

            {/* Bottom: Big Amount & Trend indicator */}
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {cat.amount}
              </p>

              <div className="mt-1.5 flex items-center gap-1 text-xs font-semibold">
                {isUp ? (
                  <span className="flex items-center gap-0.5 text-rose-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{cat.trend.replace('+', '')}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-emerald-600">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    <span>{cat.trend.replace('-', '')}</span>
                  </span>
                )}
                <span className="text-neutral-400 font-normal">
                  {cat.trendSubtitle}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
