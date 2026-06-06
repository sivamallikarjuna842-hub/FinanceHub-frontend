import { useState, useEffect } from 'react';
import { ExpenseTracker } from './modules/expense-tracker/ExpenseTracker';
import { FinanceManager } from './modules/finance-manager/FinanceManager';
import { StockPortfolio } from './modules/stock-portfolio/StockPortfolio';
import { CryptoDashboard } from './modules/crypto-dashboard/CryptoDashboard';
import { LoanManagement } from './modules/loan-management/LoanManagement';
import { LoginPage } from './modules/auth/LoginPage';
import { RegisterPage } from './modules/auth/RegisterPage';
import { isAuthenticated, clearAuth, getStoredUser } from './utils/auth';

type Module = 'expense' | 'finance' | 'stock' | 'crypto' | 'loan';
type AuthPage = 'login' | 'register';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [activeModule, setActiveModule] = useState<Module>('expense');
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
    setUser(getStoredUser());
  };

  const handleLogout = () => {
    clearAuth();
    setAuthenticated(false);
    setUser(null);
  };

  const modules = [
    { id: 'expense' as Module, label: 'Expense Tracker', icon: '💰' },
    { id: 'finance' as Module, label: 'Finance Manager', icon: '📊' },
    { id: 'stock' as Module, label: 'Stock Portfolio', icon: '📈' },
    { id: 'crypto' as Module, label: 'Crypto Dashboard', icon: '₿' },
    { id: 'loan' as Module, label: 'Loan Management', icon: '🏦' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'expense':
        return <ExpenseTracker />;
      case 'finance':
        return <FinanceManager />;
      case 'stock':
        return <StockPortfolio />;
      case 'crypto':
        return <CryptoDashboard />;
      case 'loan':
        return <LoanManagement />;
      default:
        return <ExpenseTracker />;
    }
  };

  // --- AUTH PAGES ---
  if (!authenticated) {
    if (authPage === 'login') {
      return (
        <LoginPage
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setAuthPage('register')}
        />
      );
    }
    return (
      <RegisterPage
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => setAuthPage('login')}
      />
    );
  }

  // --- DASHBOARD (authenticated) ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">FinanceHub</h1>
            </div>

            {/* User info + Logout */}
            <div className="flex items-center gap-4">
              {user && (
                <span className="hidden sm:block text-sm text-slate-300">
                  {user.firstName} {user.lastName}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-red-500/20 hover:text-red-400"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Module Navigation */}
          <div className="flex flex-wrap gap-2 pb-4">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{module.icon}</span>
                {module.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {renderModule()}
      </main>
    </div>
  );
}