// Mock Data Store for Spendly AI — Phase 1 Frontend UI Only
// Designed for seamless REST / GraphQL API hookup in Phase 2

export const currentUser = {
  id: "usr_01",
  name: "Emma",
  fullName: "Emma Richardson",
  email: "emma.richardson@fintech.io",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  currency: "$",
  accountNumber: "•••• 9286",
  creditLimit: 10000.00,
  availableCredit: 8961.53,
  balance: 1842.56,
  cardBalance: 1038.47,
  monthlySavings: 3240.00,
  monthlyIncome: 6500.00,
  monthlyExpense: 3260.00
};

export const overviewChartBars = [
  // 60 fine needle bars simulating granular daily/weekly financial volume Jan - Dec
  { month: "Jan", height: 42, active: false },
  { month: "Jan", height: 58, active: false },
  { month: "Jan", height: 35, active: false },
  { month: "Jan", height: 65, active: false },
  { month: "Jan", height: 48, active: false },

  { month: "Feb", height: 50, active: false },
  { month: "Feb", height: 72, active: false },
  { month: "Feb", height: 40, active: false },
  { month: "Feb", height: 60, active: false },
  { month: "Feb", height: 55, active: false },

  { month: "Mar", height: 45, active: false },
  { month: "Mar", height: 68, active: false },
  { month: "Mar", height: 82, active: false },
  { month: "Mar", height: 52, active: false },
  { month: "Mar", height: 63, active: false },

  { month: "Apr", height: 59, active: false },
  { month: "Apr", height: 48, active: false },
  { month: "Apr", height: 75, active: false },
  { month: "Apr", height: 66, active: false },
  { month: "Apr", height: 80, active: false },

  { month: "May", height: 70, active: false },
  { month: "May", height: 52, active: false },
  { month: "May", height: 64, active: false },
  { month: "May", height: 78, active: false },
  { month: "May", height: 55, active: false },

  { month: "Jun", height: 62, active: false },
  { month: "Jun", height: 85, active: false },
  { month: "Jun", height: 58, active: false },
  { month: "Jun", height: 74, active: false },
  { month: "Jun", height: 68, active: false },

  // July highlighted peak with tooltip anchor
  { month: "Jul", height: 75, active: false },
  { month: "Jul", height: 62, active: false },
  { month: "Jul", height: 95, active: true, value: "$1,548.24", label: "for April 2026", growth: "+2.46%" },
  { month: "Jul", height: 82, active: false },
  { month: "Jul", height: 70, active: false },

  { month: "Aug", height: 58, active: false },
  { month: "Aug", height: 74, active: false },
  { month: "Aug", height: 63, active: false },
  { month: "Aug", height: 80, active: false },
  { month: "Aug", height: 50, active: false },

  { month: "Sep", height: 65, active: false },
  { month: "Sep", height: 82, active: false },
  { month: "Sep", height: 60, active: false },
  { month: "Sep", height: 78, active: false },
  { month: "Sep", height: 55, active: false },

  { month: "Oct", height: 70, active: false },
  { month: "Oct", height: 62, active: false },
  { month: "Oct", height: 88, active: false },
  { month: "Oct", height: 52, active: false },
  { month: "Oct", height: 75, active: false },

  { month: "Nov", height: 58, active: false },
  { month: "Nov", height: 82, active: false },
  { month: "Nov", height: 66, active: false },
  { month: "Nov", height: 90, active: false },
  { month: "Nov", height: 60, active: false },

  { month: "Dec", height: 72, active: false },
  { month: "Dec", height: 84, active: false },
  { month: "Dec", height: 68, active: false },
  { month: "Dec", height: 92, active: false },
  { month: "Dec", height: 76, active: false }
];

export const recentTransactions = [
  {
    id: "tx_101",
    merchant: "Adobe Creative Cloud",
    subtitle: "Today, 09:42",
    date: "2026-04-26",
    time: "09:42",
    category: "Subscriptions",
    card: "•••• 2841",
    paymentMethod: "Visa Debit",
    status: "In progress",
    statusColor: "amber",
    amount: -59.99,
    type: "expense",
    iconBrand: "adobe",
    brandBg: "bg-red-500",
    brandColor: "text-white"
  },
  {
    id: "tx_102",
    merchant: "Stripe Payout",
    subtitle: "Today, 08:15",
    date: "2026-04-26",
    time: "08:15",
    category: "Income",
    card: "•••• 9286",
    paymentMethod: "Direct Bank Transfer",
    status: "Completed",
    statusColor: "emerald",
    amount: 187.50,
    type: "income",
    iconBrand: "stripe",
    brandBg: "bg-indigo-600",
    brandColor: "text-white"
  },
  {
    id: "tx_103",
    merchant: "Swiggy Gourmet",
    subtitle: "Yesterday, 20:34",
    date: "2026-04-25",
    time: "20:34",
    category: "Food & Dining",
    card: "•••• 4412",
    paymentMethod: "Apple Pay",
    status: "Completed",
    statusColor: "emerald",
    amount: -34.20,
    type: "expense",
    iconBrand: "swiggy",
    brandBg: "bg-orange-500",
    brandColor: "text-white"
  },
  {
    id: "tx_104",
    merchant: "Uber Premium",
    subtitle: "24 Apr, 18:22",
    date: "2026-04-24",
    time: "18:22",
    category: "Transport",
    card: "•••• 9286",
    paymentMethod: "Credit Card",
    status: "Completed",
    statusColor: "emerald",
    amount: -22.50,
    type: "expense",
    iconBrand: "uber",
    brandBg: "bg-black",
    brandColor: "text-white"
  },
  {
    id: "tx_105",
    merchant: "Amazon Marketplace",
    subtitle: "23 Apr, 14:10",
    date: "2026-04-23",
    time: "14:10",
    category: "Shopping",
    card: "•••• 2841",
    paymentMethod: "Visa Debit",
    status: "Completed",
    statusColor: "emerald",
    amount: -129.00,
    type: "expense",
    iconBrand: "amazon",
    brandBg: "bg-amber-600",
    brandColor: "text-white"
  },
  {
    id: "tx_106",
    merchant: "Salary Deposit - Acme Corp",
    subtitle: "20 Apr, 10:00",
    date: "2026-04-20",
    time: "10:00",
    category: "Salary",
    card: "•••• 9286",
    paymentMethod: "Wire Transfer",
    status: "Completed",
    statusColor: "emerald",
    amount: 4500.00,
    type: "income",
    iconBrand: "bank",
    brandBg: "bg-emerald-600",
    brandColor: "text-white"
  },
  {
    id: "tx_107",
    merchant: "Electricity & Utilities",
    subtitle: "18 Apr, 11:45",
    date: "2026-04-18",
    time: "11:45",
    category: "Utilities",
    card: "•••• 2841",
    paymentMethod: "Auto Debit",
    status: "Completed",
    statusColor: "emerald",
    amount: -85.00,
    type: "expense",
    iconBrand: "power",
    brandBg: "bg-blue-600",
    brandColor: "text-white"
  }
];

export const categoryCards = [
  {
    id: "cat_1",
    title: "Groceries",
    amount: "$604.36",
    rawAmount: 604.36,
    trend: "+2.46%",
    trendDirection: "up",
    trendSubtitle: "from last month",
    icon: "shopping-cart"
  },
  {
    id: "cat_2",
    title: "Clothes and Shoes",
    amount: "$296.65",
    rawAmount: 296.65,
    trend: "-1.84%",
    trendDirection: "down",
    trendSubtitle: "from last month",
    icon: "shirt"
  },
  {
    id: "cat_3",
    title: "Cafes and Restaurants",
    amount: "$182.10",
    rawAmount: 182.10,
    trend: "+3.20%",
    trendDirection: "up",
    trendSubtitle: "from last month",
    icon: "coffee"
  },
  {
    id: "cat_4",
    title: "Sport & Wellness",
    amount: "$95.00",
    rawAmount: 95.00,
    trend: "-0.50%",
    trendDirection: "down",
    trendSubtitle: "from last month",
    icon: "activity"
  }
];

export const budgetsList = [
  {
    id: "bgt_1",
    category: "Groceries & Supermarket",
    spent: 604.36,
    allocated: 800.00,
    color: "#EA580C",
    icon: "shopping-cart",
    status: "On Track"
  },
  {
    id: "bgt_2",
    category: "Clothes and Shoes",
    spent: 296.65,
    allocated: 350.00,
    color: "#F97316",
    icon: "shirt",
    status: "84% Reached"
  },
  {
    id: "bgt_3",
    category: "Cafes & Dining Out",
    spent: 182.10,
    allocated: 200.00,
    color: "#E11D48",
    icon: "coffee",
    status: "Near Limit"
  },
  {
    id: "bgt_4",
    category: "Subscriptions & Tech",
    spent: 124.99,
    allocated: 150.00,
    color: "#6366F1",
    icon: "monitor",
    status: "On Track"
  },
  {
    id: "bgt_5",
    category: "Sport & Health",
    spent: 95.00,
    allocated: 180.00,
    color: "#10B981",
    icon: "activity",
    status: "Under Budget"
  },
  {
    id: "bgt_6",
    category: "Transport & Fuel",
    spent: 145.20,
    allocated: 160.00,
    color: "#0284C7",
    icon: "car",
    status: "90% Reached"
  }
];

export const statementImportDemo = [
  {
    id: "imp_1",
    date: "2026-04-25",
    description: "SWIGGY BANGALORE IN",
    amount: 450.00,
    type: "Debit",
    suggestedCategory: "Food & Dining",
    confidence: "99% AI Match",
    status: "Ready"
  },
  {
    id: "imp_2",
    date: "2026-04-24",
    description: "UBER INDIA RIDES",
    amount: 220.00,
    type: "Debit",
    suggestedCategory: "Transport",
    confidence: "97% AI Match",
    status: "Ready"
  },
  {
    id: "imp_3",
    date: "2026-04-23",
    description: "AMAZON RETAIL MUMBAI",
    amount: 1299.00,
    type: "Debit",
    suggestedCategory: "Shopping",
    confidence: "95% AI Match",
    status: "Ready"
  },
  {
    id: "imp_4",
    date: "2026-04-22",
    description: "BESCOM ELECTRICITY BILL",
    amount: 850.00,
    type: "Debit",
    suggestedCategory: "Utilities",
    confidence: "99% AI Match",
    status: "Ready"
  },
  {
    id: "imp_5",
    date: "2026-04-20",
    description: "TECH SALARY APR2026 NEFT",
    amount: 45000.00,
    type: "Credit",
    suggestedCategory: "Salary",
    confidence: "100% AI Match",
    status: "Ready"
  },
  {
    id: "imp_6",
    date: "2026-04-19",
    description: "NETFLIX ENTERTAINMENT",
    amount: 649.00,
    type: "Debit",
    suggestedCategory: "Subscriptions",
    confidence: "98% AI Match",
    status: "Ready"
  }
];

export const monthlyReportChartData = [
  { month: "Nov", income: 5800, expense: 3100, savings: 2700 },
  { month: "Dec", income: 6400, expense: 3900, savings: 2500 },
  { month: "Jan", income: 5900, expense: 3200, savings: 2700 },
  { month: "Feb", income: 6100, expense: 2800, savings: 3300 },
  { month: "Mar", income: 6300, expense: 3400, savings: 2900 },
  { month: "Apr", income: 6500, expense: 3260, savings: 3240 }
];
