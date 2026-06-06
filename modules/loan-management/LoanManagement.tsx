import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface Loan {
  id: string;
  name: string;
  lender: string;
  amount: number;
  loanAmount: number;
  interestRate: number;
  monthlyPayment: number;
  remainingMonths: number;
  startDate: string;
  type: 'mortgage' | 'personal' | 'auto' | 'student' | 'credit';
}

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export function LoanManagement() {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Home Mortgage',
      lender: 'Bank of America',
      amount: 350000,
      loanAmount: 350000,
      interestRate: 6.5,
      monthlyPayment: 2218,
      remainingMonths: 236,
      startDate: '2021-01-15',
      type: 'mortgage',
    },
    {
      id: '2',
      name: 'Car Loan',
      lender: 'Wells Fargo',
      amount: 35000,
      loanAmount: 35000,
      interestRate: 5.2,
      monthlyPayment: 640,
      remainingMonths: 60,
      startDate: '2022-06-01',
      type: 'auto',
    },
    {
      id: '3',
      name: 'Student Loan',
      lender: 'Federal Student Aid',
      amount: 45000,
      loanAmount: 45000,
      interestRate: 4.5,
      monthlyPayment: 450,
      remainingMonths: 120,
      startDate: '2020-08-15',
      type: 'student',
    },
    {
      id: '4',
      name: 'Personal Loan',
      lender: 'LendingClub',
      amount: 10000,
      loanAmount: 10000,
      interestRate: 8.5,
      monthlyPayment: 250,
      remainingMonths: 48,
      startDate: '2023-01-01',
      type: 'personal',
    },
  ]);

  const [newLoan, setNewLoan] = useState({
    name: '',
    lender: '',
    amount: '',
    interestRate: '',
    monthlyPayment: '',
    remainingMonths: '',
    startDate: new Date().toISOString().split('T')[0],
    type: 'personal' as const,
  });

  const addLoan = () => {
    if (newLoan.name && newLoan.lender && newLoan.amount && newLoan.interestRate && newLoan.monthlyPayment) {
      const loan: Loan = {
        id: Date.now().toString(),
        name: newLoan.name,
        lender: newLoan.lender,
        amount: parseFloat(newLoan.amount),
        loanAmount: parseFloat(newLoan.amount),
        interestRate: parseFloat(newLoan.interestRate),
        monthlyPayment: parseFloat(newLoan.monthlyPayment),
        remainingMonths: parseInt(newLoan.remainingMonths) || 60,
        startDate: newLoan.startDate,
        type: newLoan.type,
      };
      setLoans([...loans, loan]);
      setNewLoan({
        name: '',
        lender: '',
        amount: '',
        interestRate: '',
        monthlyPayment: '',
        remainingMonths: '',
        startDate: new Date().toISOString().split('T')[0],
        type: 'personal',
      });
    }
  };

  const deleteLoan = (id: string) => {
    setLoans(loans.filter(l => l.id !== id));
  };

  const makeLoanPayment = (id: string) => {
    setLoans(
      loans.map(loan =>
        loan.id === id && loan.remainingMonths > 0
          ? { ...loan, remainingMonths: loan.remainingMonths - 1, amount: Math.max(0, loan.amount - loan.monthlyPayment) }
          : loan
      )
    );
  };

  // Calculate loan metrics
  const totalLoanAmount = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalMonthlyPayment = loans.reduce((sum, l) => sum + l.monthlyPayment, 0);
  const totalInterestRate = loans.length > 0 ? loans.reduce((sum, l) => sum + l.interestRate, 0) / loans.length : 0;
  const totalRemainingMonths = loans.reduce((sum, l) => sum + l.remainingMonths, 0);

  const loansByType = [
    { name: 'Mortgage', value: loans.filter(l => l.type === 'mortgage').reduce((s, l) => s + l.amount, 0) },
    { name: 'Auto', value: loans.filter(l => l.type === 'auto').reduce((s, l) => s + l.amount, 0) },
    { name: 'Student', value: loans.filter(l => l.type === 'student').reduce((s, l) => s + l.amount, 0) },
    { name: 'Personal', value: loans.filter(l => l.type === 'personal').reduce((s, l) => s + l.amount, 0) },
  ].filter(l => l.value > 0);

  const paymentScheduleData = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    payment: totalMonthlyPayment,
    remaining: Math.max(0, totalLoanAmount - totalMonthlyPayment * (i + 1)),
  }));

  const typeEmojis: Record<string, string> = {
    mortgage: '🏠',
    auto: '🚗',
    student: '📚',
    personal: '💼',
    credit: '💳',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-white">🏦 Loan Management System</h2>
        <p className="mt-2 text-indigo-200">Track and manage all your loans and debts</p>
      </div>

      {/* Loan Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Loan Balance</p>
          <p className="mt-2 text-3xl font-bold text-red-400">${totalLoanAmount.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">{loans.length} active loans</p>
        </div>
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Monthly Payment</p>
          <p className="mt-2 text-3xl font-bold text-blue-400">${totalMonthlyPayment.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">All loans combined</p>
        </div>
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Avg Interest Rate</p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">{totalInterestRate.toFixed(2)}%</p>
          <p className="mt-1 text-xs text-slate-400">Weighted average</p>
        </div>
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Months Remaining</p>
          <p className="mt-2 text-3xl font-bold text-green-400">{totalRemainingMonths}</p>
          <p className="mt-1 text-xs text-slate-400">~{(totalRemainingMonths / 12).toFixed(1)} years</p>
        </div>
      </div>

      {/* Loan Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Loan Types */}
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">Loan Distribution by Type</h3>
          {loansByType.length > 0 ? (
            <div className="space-y-3">
              {loansByType.map((type, index) => (
                <div key={type.name} className="flex items-center gap-3">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-600">
                    <div
                      className="h-full"
                      style={{
                        width: `${(type.value / totalLoanAmount) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                  <div className="w-32 text-right">
                    <p className="text-sm font-semibold text-white">{type.name}</p>
                    <p className="text-xs text-slate-400">${type.value.toFixed(0)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No loans to display</p>
          )}
        </div>

        {/* Payment Schedule */}
        <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">12-Month Payment Schedule</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentScheduleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
              <Legend />
              <Bar dataKey="payment" fill="#8b5cf6" name="Payment" />
              <Bar dataKey="remaining" fill="#ec4899" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Loan Form */}
      <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add New Loan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Loan Name"
            value={newLoan.name}
            onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Lender Name"
            value={newLoan.lender}
            onChange={(e) => setNewLoan({ ...newLoan, lender: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Loan Amount"
            value={newLoan.amount}
            onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <select
            value={newLoan.type}
            onChange={(e) => setNewLoan({ ...newLoan, type: e.target.value as any })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="mortgage">Mortgage</option>
            <option value="auto">Auto</option>
            <option value="student">Student</option>
            <option value="personal">Personal</option>
            <option value="credit">Credit Card</option>
          </select>
          <input
            type="number"
            placeholder="Interest Rate %"
            step="0.01"
            value={newLoan.interestRate}
            onChange={(e) => setNewLoan({ ...newLoan, interestRate: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Monthly Payment"
            value={newLoan.monthlyPayment}
            onChange={(e) => setNewLoan({ ...newLoan, monthlyPayment: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Remaining Months"
            value={newLoan.remainingMonths}
            onChange={(e) => setNewLoan({ ...newLoan, remainingMonths: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={addLoan}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            Add Loan
          </button>
        </div>
      </div>

      {/* Loans List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Active Loans</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {loans.length === 0 ? (
            <p className="text-slate-400">No loans added yet. Add one to get started!</p>
          ) : (
            loans.map(loan => {
              const payoffPercentage = ((loan.loanAmount - loan.amount) / loan.loanAmount) * 100;
              return (
                <div key={loan.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-6 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{typeEmojis[loan.type]}</span>
                        <div>
                          <p className="text-lg font-semibold text-white">{loan.name}</p>
                          <p className="text-sm text-slate-400">{loan.lender}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-400">Balance</p>
                          <p className="mt-1 text-lg font-semibold text-white">${loan.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Monthly Payment</p>
                          <p className="mt-1 text-lg font-semibold text-white">${loan.monthlyPayment.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Interest Rate</p>
                          <p className="mt-1 text-lg font-semibold text-yellow-400">{loan.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Months Left</p>
                          <p className="mt-1 text-lg font-semibold text-blue-400">{loan.remainingMonths}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-slate-400">Payoff Progress</p>
                          <p className="text-xs text-slate-300">{payoffPercentage.toFixed(1)}%</p>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-600">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all"
                            style={{ width: `${payoffPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() => makeLoanPayment(loan.id)}
                        className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
                        disabled={loan.remainingMonths === 0}
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => deleteLoan(loan.id)}
                        className="text-red-400 hover:text-red-300 transition-colors text-sm"
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Payoff Strategy */}
      <div className="rounded-lg border border-indigo-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">💡 Payoff Strategies</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-700/30 p-4">
            <p className="font-semibold text-white">Debt Snowball</p>
            <p className="mt-2 text-sm text-slate-300">Pay off smallest loans first for quick wins and motivation</p>
          </div>
          <div className="rounded-lg bg-slate-700/30 p-4">
            <p className="font-semibold text-white">Debt Avalanche</p>
            <p className="mt-2 text-sm text-slate-300">Pay off highest interest rate loans first to save money</p>
          </div>
        </div>
      </div>
    </div>
  );
}
