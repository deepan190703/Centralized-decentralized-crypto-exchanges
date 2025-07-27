"use client"
import { useEffect, useState } from "react"

interface PriceData {
  timestamp: number
  price: number
  volume: number
}

interface ChartProps {
  symbol: string
  timeRange: '1h' | '1d' | '1w' | '1m'
}

export function PriceChart({ symbol = "SOL/USDC", timeRange = "1d" }: ChartProps) {
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [currentPrice, setCurrentPrice] = useState(142.75)
  const [priceChange, setPriceChange] = useState(2.45)
  const [priceChangePercent, setPriceChangePercent] = useState(1.75)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateMockData = () => {
      const now = Date.now()
      const points = timeRange === '1h' ? 60 : timeRange === '1d' ? 24 : timeRange === '1w' ? 7 : 30
      const interval = timeRange === '1h' ? 60000 : timeRange === '1d' ? 3600000 : timeRange === '1w' ? 86400000 : 86400000
      
      const data: PriceData[] = []
      let price = 140 + Math.random() * 10
      
      for (let i = points; i >= 0; i--) {
        const timestamp = now - (i * interval)
        price += (Math.random() - 0.5) * 2
        price = Math.max(130, Math.min(155, price))
        
        data.push({
          timestamp,
          price: parseFloat(price.toFixed(2)),
          volume: Math.random() * 1000000
        })
      }
      
      return data
    }

    setLoading(true)
    setTimeout(() => {
      const data = generateMockData()
      setPriceData(data)
      setCurrentPrice(data[data.length - 1].price)
      
      // Calculate 24h change
      const oldPrice = data[0].price
      const newPrice = data[data.length - 1].price
      const change = newPrice - oldPrice
      const changePercent = (change / oldPrice) * 100
      
      setPriceChange(parseFloat(change.toFixed(2)))
      setPriceChangePercent(parseFloat(changePercent.toFixed(2)))
      setLoading(false)
    }, 1000)

    // Update price every 3 seconds
    const interval = setInterval(() => {
      setPriceData(prev => {
        const newData = [...prev]
        const lastPrice = newData[newData.length - 1].price
        const newPrice = lastPrice + (Math.random() - 0.5) * 0.5
        
        newData.push({
          timestamp: Date.now(),
          price: parseFloat(Math.max(130, Math.min(155, newPrice)).toFixed(2)),
          volume: Math.random() * 1000000
        })
        
        // Keep only last 100 points
        if (newData.length > 100) {
          newData.shift()
        }
        
        setCurrentPrice(newData[newData.length - 1].price)
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [timeRange])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const minPrice = Math.min(...priceData.map(d => d.price))
  const maxPrice = Math.max(...priceData.map(d => d.price))
  const priceRange = maxPrice - minPrice

  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * 200 + 20
  }

  const getX = (index: number) => {
    return (index / (priceData.length - 1)) * 600 + 40
  }

  const pathData = priceData
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point.price)}`)
    .join(' ')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{symbol}</h2>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
            <span className={`flex items-center px-2 py-1 rounded text-sm font-medium ${
              priceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {priceChange >= 0 ? '+' : ''}{priceChange} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent}%)
            </span>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex space-x-2">
          {(['1h', '1d', '1w', '1m'] as const).map((range) => (
            <button
              key={range}
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

      {/* Chart */}
      <div className="relative">
        <svg width="680" height="240" className="w-full">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price line */}
          <path
            d={pathData}
            fill="none"
            stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Fill area under curve */}
          <path
            d={`${pathData} L ${getX(priceData.length - 1)} 220 L ${getX(0)} 220 Z`}
            fill={priceChange >= 0 ? "url(#greenGradient)" : "url(#redGradient)"}
            fillOpacity="0.1"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: "#10b981", stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: "#10b981", stopOpacity: 0}} />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: "#ef4444", stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: "#ef4444", stopOpacity: 0}} />
            </linearGradient>
          </defs>
          
          {/* Price labels */}
          <text x="10" y="30" fontSize="12" fill="#6b7280">${maxPrice.toFixed(2)}</text>
          <text x="10" y="220" fontSize="12" fill="#6b7280">${minPrice.toFixed(2)}</text>
        </svg>
      </div>

      {/* Chart Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatItem label="24h High" value={`$${maxPrice.toFixed(2)}`} />
        <StatItem label="24h Low" value={`$${minPrice.toFixed(2)}`} />
        <StatItem label="24h Volume" value="$2.5M" />
        <StatItem label="Market Cap" value="$68.2B" />
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}