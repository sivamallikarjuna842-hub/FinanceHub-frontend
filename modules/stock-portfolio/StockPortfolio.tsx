import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
}

export function StockPortfolio() {
  const [stocks, setStocks] = useState<Stock[]>([
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, purchasePrice: 145.5, currentPrice: 185.75, purchaseDate: '2023-06-15' },
    { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 5, purchasePrice: 102.3, currentPrice: 140.2, purchaseDate: '2023-08-20' },
    { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 8, purchasePrice: 320.5, currentPrice: 405.9, purchaseDate: '2023-07-10' },
    { id: '4', symbol: 'TSLA', name: 'Tesla Inc.', quantity: 3, purchasePrice: 242.8, currentPrice: 340.5, purchaseDate: '2023-09-01' },
  ]);

  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    quantity: '',
    purchasePrice: '',
    currentPrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const addStock = () => {
    if (newStock.symbol && newStock.name && newStock.quantity && newStock.purchasePrice && newStock.currentPrice) {
      const stock: Stock = {
        id: Date.now().toString(),
        symbol: newStock.symbol.toUpperCase(),
        name: newStock.name,
        quantity: parseInt(newStock.quantity),
        purchasePrice: parseFloat(newStock.purchasePrice),
        currentPrice: parseFloat(newStock.currentPrice),
        purchaseDate: newStock.purchaseDate,
      };
      setStocks([...stocks, stock]);
      setNewStock({ symbol: '', name: '', quantity: '', purchasePrice: '', currentPrice: '', purchaseDate: new Date().toISOString().split('T')[0] });
    }
  };

  const deleteStock = (id: string) => {
    setStocks(stocks.filter(s => s.id !== id));
  };

  // Calculate portfolio metrics
  const portfolioMetrics = stocks.reduce((acc, stock) => {
    const investedValue = stock.purchasePrice * stock.quantity;
    const currentValue = stock.currentPrice * stock.quantity;
    const gain = currentValue - investedValue;
    const gainPercentage = (gain / investedValue) * 100;

    return {
      totalInvested: acc.totalInvested + investedValue,
      totalCurrent: acc.totalCurrent + currentValue,
      totalGain: acc.totalGain + gain,
      gainPercentage: acc.gainPercentage + gainPercentage,
      count: acc.count + 1,
    };
  }, { totalInvested: 0, totalCurrent: 0, totalGain: 0, gainPercentage: 0, count: 0 });

  const portfolioValue = portfolioMetrics.totalCurrent;
  const totalGain = portfolioMetrics.totalGain;
  const gainPercentage = portfolioMetrics.count > 0 ? (totalGain / portfolioMetrics.totalInvested) * 100 : 0;

  const performanceData = [
    { date: 'Mon', value: portfolioValue * 0.92 },
    { date: 'Tue', value: portfolioValue * 0.95 },
    { date: 'Wed', value: portfolioValue * 0.98 },
    { date: 'Thu', value: portfolioValue * 1.02 },
    { date: 'Fri', value: portfolioValue * 1.05 },
    { date: 'Sat', value: portfolioValue },
    { date: 'Sun', value: portfolioValue * 0.99 },
  ];

  const topPerformers = [...stocks]
    .sort((a, b) => ((b.currentPrice - b.purchasePrice) / b.purchasePrice) - ((a.currentPrice - a.purchasePrice) / a.purchasePrice))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-white">📈 Stock Portfolio</h2>
        <p className="mt-2 text-green-200">Track and manage your stock investments</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Portfolio Value</p>
          <p className="mt-2 text-3xl font-bold text-green-400">${portfolioValue.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">Current market value</p>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Invested</p>
          <p className="mt-2 text-3xl font-bold text-blue-400">${portfolioMetrics.totalInvested.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">Cost basis</p>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Gain</p>
          <p className={`mt-2 text-3xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totalGain.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Unrealized P&L</p>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Return %</p>
          <p className={`mt-2 text-3xl font-bold ${gainPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {gainPercentage.toFixed(2)}%
          </p>
          <p className="mt-1 text-xs text-slate-400">Overall return</p>
        </div>
      </div>

      {/* Add Stock Form */}
      <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add Stock</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <input
            type="text"
            placeholder="Symbol (e.g., AAPL)"
            value={newStock.symbol}
            onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={newStock.name}
            onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newStock.quantity}
            onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Purchase Price"
            value={newStock.purchasePrice}
            onChange={(e) => setNewStock({ ...newStock, purchasePrice: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Current Price"
            value={newStock.currentPrice}
            onChange={(e) => setNewStock({ ...newStock, currentPrice: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
          <input
            type="date"
            value={newStock.purchaseDate}
            onChange={(e) => setNewStock({ ...newStock, purchaseDate: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-green-500 focus:outline-none"
          />
          <button
            onClick={addStock}
            className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Add Stock
          </button>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <defs>
              <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Holdings */}
      <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Your Holdings</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {stocks.length === 0 ? (
            <p className="text-slate-400">No stocks in portfolio. Add one to get started!</p>
          ) : (
            stocks.map(stock => {
              const investedValue = stock.purchasePrice * stock.quantity;
              const currentValue = stock.currentPrice * stock.quantity;
              const gain = currentValue - investedValue;
              const gainPercentage = (gain / investedValue) * 100;

              return (
                <div key={stock.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-white">{stock.symbol}</p>
                          <p className="text-sm text-slate-400">{stock.name}</p>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-slate-400">Qty</p>
                          <p className="text-white">{stock.quantity}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Avg Cost</p>
                          <p className="text-white">${stock.purchasePrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Current Price</p>
                          <p className="text-white">${stock.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Value</p>
                          <p className={gainPercentage >= 0 ? 'text-green-400' : 'text-red-400'}>${currentValue.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <p className={`text-lg font-semibold ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {gain >= 0 ? '+' : ''}{gain.toFixed(2)} ({gainPercentage.toFixed(1)}%)
                      </p>
                      <button
                        onClick={() => deleteStock(stock.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <div className="rounded-lg border border-green-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <h3 className="mb-4 text-lg font-semibold text-white">🚀 Top Performers</h3>
          <div className="space-y-2">
            {topPerformers.map((stock, index) => {
              const gainPercentage = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
              return (
                <div key={stock.id} className="flex items-center justify-between rounded-lg bg-slate-700/30 p-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 font-semibold text-white text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{stock.symbol}</p>
                      <p className="text-sm text-slate-400">{stock.name}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-green-400">+{gainPercentage.toFixed(2)}%</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
