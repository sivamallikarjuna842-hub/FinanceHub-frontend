import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
}

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'yearly';
}

export function FinanceManager() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Checking Account', type: 'checking', balance: 5000, currency: 'USD' },
    { id: '2', name: 'Savings Account', type: 'savings', balance: 25000, currency: 'USD' },
    { id: '3', name: 'Credit Card', type: 'credit', balance: -3500, currency: 'USD' },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', limit: 500, spent: 320, period: 'monthly' },
    { id: '2', category: 'Transportation', limit: 300, spent: 180, period: 'monthly' },
    { id: '3', category: 'Entertainment', limit: 200, spent: 95, period: 'monthly' },
    { id: '4', category: 'Utilities', limit: 400, spent: 380, period: 'monthly' },
  ]);

  const [newAccount, setNewAccount] = useState({ name: '', type: 'checking' as const, balance: '', currency: 'USD' });
  const [newBudget, setNewBudget] = useState({ category: '', limit: '', spent: '' });

  const totalAssets = accounts.filter(a => a.balance > 0).reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts.filter(a => a.balance < 0).reduce((sum, a) => sum + Math.abs(a.balance), 0);
  const netWorth = totalAssets - totalLiabilities;

  const addAccount = () => {
    if (newAccount.name && newAccount.balance) {
      const account: Account = {
        id: Date.now().toString(),
        name: newAccount.name,
        type: newAccount.type,
        balance: parseFloat(newAccount.balance),
        currency: newAccount.currency,
      };
      setAccounts([...accounts, account]);
      setNewAccount({ name: '', type: 'checking', balance: '', currency: 'USD' });
    }
  };

  const addBudget = () => {
    if (newBudget.category && newBudget.limit && newBudget.spent !== '') {
      const budget: Budget = {
        id: Date.now().toString(),
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: parseFloat(newBudget.spent),
        period: 'monthly',
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', limit: '', spent: '' });
    }
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const budgetChartData = budgets.map(b => ({
    category: b.category,
    spent: b.spent,
    limit: b.limit,
  }));

  const netWorthData = [
    { month: 'Jan', value: 22000 },
    { month: 'Feb', value: 24500 },
    { month: 'Mar', value: 23800 },
    { month: 'Apr', value: 26200 },
    { month: 'May', value: 25500 },
    { month: 'Jun', value: netWorth },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-white">📊 Personal Finance Manager</h2>
        <p className="mt-2 text-blue-200">Manage accounts, budgets, and financial goals</p>
      </div>

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Assets</p>
          <p className="mt-2 text-3xl font-bold text-green-400">${totalAssets.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">+ Positive balances</p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Liabilities</p>
          <p className="mt-2 text-3xl font-bold text-red-400">${totalLiabilities.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">- Debts & loans</p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Net Worth</p>
          <p className={`mt-2 text-3xl font-bold ${netWorth >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
            ${netWorth.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Assets - Liabilities</p>
        </div>
      </div>

      {/* Net Worth Trend */}
      <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Net Worth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={netWorthData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Accounts Section */}
      <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add Account</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <input
            type="text"
            placeholder="Account Name"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <select
            value={newAccount.type}
            onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as any })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit Card</option>
          </select>
          <input
            type="number"
            placeholder="Balance"
            value={newAccount.balance}
            onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <select
            value={newAccount.currency}
            onChange={(e) => setNewAccount({ ...newAccount, currency: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
          <button
            onClick={addAccount}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Add Account
          </button>
        </div>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map(account => (
          <div key={account.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-6 hover:bg-slate-700/50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">{account.type}</p>
                <p className="mt-1 text-lg font-semibold text-white">{account.name}</p>
              </div>
              <button
                onClick={() => deleteAccount(account.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className={`mt-4 text-2xl font-bold ${account.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {account.currency} {account.balance.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Budget Management */}
      <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add Budget</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <input
            type="text"
            placeholder="Category"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Budget Limit"
            value={newBudget.limit}
            onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount Spent"
            value={newBudget.spent}
            onChange={(e) => setNewBudget({ ...newBudget, spent: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={addBudget}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Add Budget
          </button>
        </div>
      </div>

      {/* Budget Chart */}
      <div className="rounded-lg border border-blue-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Budget Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
            <Legend />
            <Bar dataKey="spent" fill="#ec4899" name="Spent" />
            <Bar dataKey="limit" fill="#3b82f6" name="Limit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {budgets.map(budget => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = budget.spent > budget.limit;
          return (
            <div key={budget.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{budget.category}</p>
                  <p className="mt-1 text-sm text-slate-300">${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => deleteBudget(budget.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-600">
                <div
                  className={`h-full transition-all ${isOverBudget ? 'bg-red-500' : percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className={`mt-2 text-xs font-semibold ${isOverBudget ? 'text-red-400' : percentage > 75 ? 'text-yellow-400' : 'text-green-400'}`}>
                {isOverBudget ? `Over by $${(budget.spent - budget.limit).toFixed(2)}` : `${(100 - percentage).toFixed(0)}% remaining`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
