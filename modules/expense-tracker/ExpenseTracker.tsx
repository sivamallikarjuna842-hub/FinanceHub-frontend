import { useState } from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health'];

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Groceries', amount: 45.50, category: 'Food', date: '2024-01-15' },
    { id: '2', description: 'Gas', amount: 60, category: 'Transport', date: '2024-01-14' },
    { id: '3', description: 'Movie', amount: 15, category: 'Entertainment', date: '2024-01-13' },
    { id: '4', description: 'Electricity Bill', amount: 120, category: 'Utilities', date: '2024-01-12' },
  ]);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });

  const addExpense = () => {
    if (formData.description && formData.amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
      };
      setExpenses([newExpense, ...expenses]);
      setFormData({ description: '', amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const categoryData = CATEGORIES.map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  })).filter(d => d.value > 0);

  const monthlyData = [
    { month: 'Week 1', total: expenses.filter(e => parseInt(e.date.split('-')[2]) <= 7).reduce((s, e) => s + e.amount, 0) },
    { month: 'Week 2', total: expenses.filter(e => parseInt(e.date.split('-')[2]) > 7 && parseInt(e.date.split('-')[2]) <= 14).reduce((s, e) => s + e.amount, 0) },
    { month: 'Week 3', total: expenses.filter(e => parseInt(e.date.split('-')[2]) > 14 && parseInt(e.date.split('-')[2]) <= 21).reduce((s, e) => s + e.amount, 0) },
    { month: 'Week 4', total: expenses.filter(e => parseInt(e.date.split('-')[2]) > 21).reduce((s, e) => s + e.amount, 0) },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-white">💰 Expense Tracker</h2>
        <p className="mt-2 text-purple-200">Track and manage your daily expenses</p>
      </div>

      {/* Add Expense Form */}
      <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add New Expense</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={addExpense}
            className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Expenses</p>
          <p className="mt-2 text-3xl font-bold text-purple-400">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Number of Expenses</p>
          <p className="mt-2 text-3xl font-bold text-indigo-400">{expenses.length}</p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Average Expense</p>
          <p className="mt-2 text-3xl font-bold text-pink-400">${(totalExpenses / expenses.length).toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Breakdown */}
        <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">Expenses by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: $${entry.value}`}
                  outerRadius={80}
                  fill="#8b5cf6"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400">No expenses to display</p>
          )}
        </div>

        {/* Weekly Trend */}
        <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">Weekly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Spending"
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense List */}
      <div className="rounded-lg border border-purple-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Recent Expenses</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {expenses.length === 0 ? (
            <p className="text-slate-400">No expenses yet. Add one to get started!</p>
          ) : (
            expenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-700/30 p-4 hover:bg-slate-700/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">{expense.description}</p>
                  <p className="text-sm text-slate-400">{expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold text-purple-400">${expense.amount.toFixed(2)}</p>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
