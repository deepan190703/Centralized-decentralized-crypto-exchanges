"use client"
import { useEffect, useState } from "react"
import { SUPPORTED_TOKENS } from "../lib/tokens"

interface MarketPrice {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

export function MarketData() {
  const [marketData, setMarketData] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        // Simulate market data - in production, this would connect to real APIs
        const mockData: MarketPrice[] = SUPPORTED_TOKENS.map(token => ({
          symbol: token.name,
          price: Math.random() * 1000 + 10,
          change24h: (Math.random() - 0.5) * 20,
          volume24h: Math.random() * 10000000,
          high24h: Math.random() * 1100 + 10,
          low24h: Math.random() * 900 + 10,
        }))
        setMarketData(mockData)
        setError(null)
      } catch (err) {
        setError("Failed to fetch market data")
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    
    // Update market data every 5 seconds
    const interval = setInterval(fetchMarketData, 5000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">Token</th>
              <th className="text-right py-3 px-4 font-semibold">Price</th>
              <th className="text-right py-3 px-4 font-semibold">24h Change</th>
              <th className="text-right py-3 px-4 font-semibold">24h Volume</th>
              <th className="text-right py-3 px-4 font-semibold">24h High</th>
              <th className="text-right py-3 px-4 font-semibold">24h Low</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((token) => (
              <tr key={token.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="font-semibold text-gray-900">{token.symbol}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-semibold">
                  ${token.price.toFixed(2)}
                </td>
                <td className={`py-4 px-4 text-right font-semibold ${
                  token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </td>
                <td className="py-4 px-4 text-right text-gray-600">
                  ${token.volume24h.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right text-gray-600">
                  ${token.high24h.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-right text-gray-600">
                  ${token.low24h.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        Market data updates every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}