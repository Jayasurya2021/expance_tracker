import React from 'react';
import { X, Bell, CheckCheck, Sparkles, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "AI Budget Warning: Cafes & Dining",
      message: "You've spent 91% of your dining budget for April.",
      time: "10m ago",
      type: "warning",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50"
    },
    {
      id: 2,
      title: "Salary Credited",
      message: "Your monthly salary of $4,500.00 was credited to •••• 9286.",
      time: "2h ago",
      type: "success",
      icon: ArrowUpRight,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      id: 3,
      title: "AI Subscription Detected",
      message: "Adobe Creative Cloud renewal for $59.99 processed.",
      time: "5h ago",
      type: "ai",
      icon: Sparkles,
      color: "text-orange-600 bg-orange-50"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-250">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-neutral-900 text-lg">Notifications</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {notifications.map((n) => {
                const IconComponent = n.icon;
                return (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-100 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${n.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-neutral-900">{n.title}</p>
                        <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-neutral-400 font-medium mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCheck className="w-4 h-4 text-neutral-500" />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
