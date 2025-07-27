"use client"
import { useEffect, useState } from "react"

interface Portfolio {
  totalValue: number
  totalPnl: number
  totalPnlPercentage: number
  assets: PortfolioAsset[]
}

interface PortfolioAsset {
  symbol: string
  name: string
  balance: number
  value: number
  price: number
  change24h: number
  allocation: number
}

export function PortfolioOverview({ publicKey }: { publicKey: string }) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('24h')

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true)
      
      // Mock portfolio data - in production, fetch from your API
      const mockPortfolio: Portfolio = {
        totalValue: 12847.52,
        totalPnl: 1247.32,
        totalPnlPercentage: 10.75,
        assets: [
          {
            symbol: 'SOL',
            name: 'Solana',
            balance: 45.32,
            value: 6789.45,
            price: 149.78,
            change24h: 5.23,
            allocation: 52.8
          },
          {
            symbol: 'USDC',
            name: 'USD Coin',
            balance: 3456.78,
            value: 3456.78,
            price: 1.00,
            change24h: 0.01,
            allocation: 26.9
          },
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            balance: 0.08942,
            value: 2601.29,
            price: 29087.34,
            change24h: -2.15,
            allocation: 20.3
          }
        ]
      }
      
      setPortfolio(mockPortfolio)
      setLoading(false)
    }

    fetchPortfolio()
    
    // Update every 30 seconds
    const interval = setInterval(fetchPortfolio, 30000)
    return () => clearInterval(interval)
  }, [publicKey])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500 py-8">
          Failed to load portfolio data
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              ${portfolio.totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Portfolio Value</div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              portfolio.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolio.totalPnl >= 0 ? '+' : ''}${portfolio.totalPnl.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total P&L</div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              portfolio.totalPnlPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolio.totalPnlPercentage >= 0 ? '+' : ''}{portfolio.totalPnlPercentage.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-500">Total Return</div>
          </div>
        </div>

        {/* Asset Allocation Chart (Simple Bar Chart) */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Asset Allocation</h3>
          <div className="space-y-3">
            {portfolio.assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center">
                <div className="w-12 text-sm font-medium">{asset.symbol}</div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${asset.allocation}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-16 text-right">
                  {asset.allocation.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Asset Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Asset</th>
                <th className="text-right py-3 px-4 font-semibold">Balance</th>
                <th className="text-right py-3 px-4 font-semibold">Price</th>
                <th className="text-right py-3 px-4 font-semibold">Value</th>
                <th className="text-right py-3 px-4 font-semibold">24h Change</th>
                <th className="text-right py-3 px-4 font-semibold">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.assets.map((asset) => (
                <tr key={asset.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{asset.symbol}</div>
                      <div className="text-sm text-gray-500">{asset.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-medium">{asset.balance.toFixed(4)}</div>
                    <div className="text-sm text-gray-500">{asset.symbol}</div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">
                    ${asset.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-semibold">
                    ${asset.value.toLocaleString()}
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${
                    asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-medium">{asset.allocation.toFixed(1)}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Best Performer</div>
          <div className="text-lg font-bold text-green-600">SOL +5.23%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Worst Performer</div>
          <div className="text-lg font-bold text-red-600">BTC -2.15%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Assets</div>
          <div className="text-lg font-bold text-gray-900">{portfolio.assets.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Rebalance Score</div>
          <div className="text-lg font-bold text-blue-600">Good</div>
        </div>
      </div>
    </div>
  )
}