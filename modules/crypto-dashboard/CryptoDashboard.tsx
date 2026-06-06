import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CryptoHolding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
}

export function CryptoDashboard() {
  const [holdings, setHoldings] = useState<CryptoHolding[]>([
    { id: '1', symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, purchasePrice: 42000, currentPrice: 67500, purchaseDate: '2023-01-15' },
    { id: '2', symbol: 'ETH', name: 'Ethereum', quantity: 5, purchasePrice: 1800, currentPrice: 3500, purchaseDate: '2023-02-20' },
    { id: '3', symbol: 'ADA', name: 'Cardano', quantity: 500, purchasePrice: 0.45, currentPrice: 1.2, purchaseDate: '2023-03-10' },
    { id: '4', symbol: 'SOL', name: 'Solana', quantity: 10, purchasePrice: 15, currentPrice: 180, purchaseDate: '2023-04-01' },
  ]);

  const [newHolding, setNewHolding] = useState({
    symbol: '',
    name: '',
    quantity: '',
    purchasePrice: '',
    currentPrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const addHolding = () => {
    if (newHolding.symbol && newHolding.name && newHolding.quantity && newHolding.purchasePrice && newHolding.currentPrice) {
      const holding: CryptoHolding = {
        id: Date.now().toString(),
        symbol: newHolding.symbol.toUpperCase(),
        name: newHolding.name,
        quantity: parseFloat(newHolding.quantity),
        purchasePrice: parseFloat(newHolding.purchasePrice),
        currentPrice: parseFloat(newHolding.currentPrice),
        purchaseDate: newHolding.purchaseDate,
      };
      setHoldings([...holdings, holding]);
      setNewHolding({ symbol: '', name: '', quantity: '', purchasePrice: '', currentPrice: '', purchaseDate: new Date().toISOString().split('T')[0] });
    }
  };

  const deleteHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id));
  };

  // Calculate portfolio metrics
  const portfolioValue = holdings.reduce((sum, h) => sum + (h.quantity * h.currentPrice), 0);
  const totalInvested = holdings.reduce((sum, h) => sum + (h.quantity * h.purchasePrice), 0);
  const totalGain = portfolioValue - totalInvested;
  const gainPercentage = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  const priceHistoryData = [
    { time: '00:00', value: portfolioValue * 0.88 },
    { time: '04:00', value: portfolioValue * 0.92 },
    { time: '08:00', value: portfolioValue * 0.95 },
    { time: '12:00', value: portfolioValue * 1.02 },
    { time: '16:00', value: portfolioValue * 1.08 },
    { time: '20:00', value: portfolioValue * 1.05 },
    { time: '23:59', value: portfolioValue },
  ];

  const marketData = [
    { symbol: 'BTC', price: 67500, change: 12.5, marketCap: 1320000000000 },
    { symbol: 'ETH', price: 3500, change: 8.3, marketCap: 420000000000 },
    { symbol: 'ADA', price: 1.2, change: 5.2, marketCap: 42000000000 },
    { symbol: 'SOL', price: 180, change: 15.7, marketCap: 85000000000 },
    { symbol: 'XRP', price: 2.8, change: -3.1, marketCap: 150000000000 },
    { symbol: 'DOGE', price: 0.42, change: 6.8, marketCap: 62000000000 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border border-orange-500/20 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 p-8 backdrop-blur">
        <h2 className="text-3xl font-bold text-white">₿ Cryptocurrency Dashboard</h2>
        <p className="mt-2 text-orange-200">Track and manage your crypto investments</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Portfolio Value</p>
          <p className="mt-2 text-3xl font-bold text-orange-400">${portfolioValue.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">Current value</p>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Invested</p>
          <p className="mt-2 text-3xl font-bold text-blue-400">${totalInvested.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-400">Cost basis</p>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Total Gain</p>
          <p className={`mt-2 text-3xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${totalGain.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Unrealized P&L</p>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
          <p className="text-sm text-slate-300">Return %</p>
          <p className={`mt-2 text-3xl font-bold ${gainPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {gainPercentage.toFixed(2)}%
          </p>
          <p className="mt-1 text-xs text-slate-400">Overall return</p>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">24H Price History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={priceHistoryData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Add Crypto Form */}
      <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Add Cryptocurrency</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <input
            type="text"
            placeholder="Symbol (e.g., BTC)"
            value={newHolding.symbol}
            onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Name"
            value={newHolding.name}
            onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Quantity"
            step="0.00000001"
            value={newHolding.quantity}
            onChange={(e) => setNewHolding({ ...newHolding, quantity: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Purchase Price"
            value={newHolding.purchasePrice}
            onChange={(e) => setNewHolding({ ...newHolding, purchasePrice: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Current Price"
            value={newHolding.currentPrice}
            onChange={(e) => setNewHolding({ ...newHolding, currentPrice: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
          />
          <input
            type="date"
            value={newHolding.purchaseDate}
            onChange={(e) => setNewHolding({ ...newHolding, purchaseDate: e.target.value })}
            className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none"
          />
          <button
            onClick={addHolding}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-600 px-6 py-2 font-semibold text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          >
            Add Crypto
          </button>
        </div>
      </div>

      {/* Holdings */}
      <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">Your Holdings</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {holdings.length === 0 ? (
            <p className="text-slate-400">No crypto holdings yet. Add one to get started!</p>
          ) : (
            holdings.map(holding => {
              const investedValue = holding.quantity * holding.purchasePrice;
              const currentValue = holding.quantity * holding.currentPrice;
              const gain = currentValue - investedValue;
              const gainPercentage = (gain / investedValue) * 100;

              return (
                <div key={holding.id} className="rounded-lg border border-slate-700 bg-slate-700/30 p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 font-semibold text-white">
                          {holding.symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{holding.symbol}</p>
                          <p className="text-sm text-slate-400">{holding.name}</p>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-slate-400">Holding</p>
                          <p className="text-white">{holding.quantity.toFixed(6)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Buy Price</p>
                          <p className="text-white">${holding.purchasePrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Current Price</p>
                          <p className="text-white">${holding.currentPrice.toFixed(2)}</p>
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
                        onClick={() => deleteHolding(holding.id)}
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

      {/* Market Overview */}
      <div className="rounded-lg border border-orange-500/20 bg-slate-800/50 p-6 backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-white">📊 Market Overview</h3>
        <div className="space-y-2">
          {marketData.map(crypto => (
            <div key={crypto.symbol} className="flex items-center justify-between rounded-lg bg-slate-700/30 p-4 hover:bg-slate-700/50 transition-colors">
              <div>
                <p className="font-semibold text-white">{crypto.symbol}</p>
                <p className="text-xs text-slate-400">Market Cap: ${(crypto.marketCap / 1e9).toFixed(1)}B</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-white">${crypto.price.toFixed(2)}</p>
                <p className={`text-sm font-semibold ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Warning */}
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-900/20 p-4 backdrop-blur">
        <p className="text-sm text-yellow-200">
          ⚠️ <strong>Disclaimer:</strong> Cryptocurrency investments are highly volatile and risky. Past performance does not guarantee future results. Only invest what you can afford to lose.
        </p>
      </div>
    </div>
  );
}
