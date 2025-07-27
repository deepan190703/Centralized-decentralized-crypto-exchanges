"use client"
import { useState } from "react"
import { PrimaryButton, SecondaryButton } from "./Button"

interface Order {
  id: string
  type: 'buy' | 'sell'
  orderType: 'market' | 'limit' | 'stop'
  amount: number
  price?: number
  stopPrice?: number
  status: 'pending' | 'filled' | 'cancelled'
  timestamp: Date
}

export function OrderBook({ symbol = "SOL/USDC" }: { symbol?: string }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [orderForm, setOrderForm] = useState({
    type: 'buy' as 'buy' | 'sell',
    orderType: 'market' as 'market' | 'limit' | 'stop',
    amount: '',
    price: '',
    stopPrice: ''
  })

  // Mock order book data
  const buyOrders = [
    { price: 142.50, amount: 1250.30, total: 178187.75 },
    { price: 142.25, amount: 890.50, total: 126648.63 },
    { price: 142.00, amount: 2340.80, total: 332393.60 },
    { price: 141.75, amount: 567.20, total: 80395.40 },
    { price: 141.50, amount: 1890.40, total: 267491.60 },
  ]

  const sellOrders = [
    { price: 143.00, amount: 567.80, total: 81195.40 },
    { price: 143.25, amount: 1230.60, total: 176283.45 },
    { price: 143.50, amount: 890.30, total: 127558.05 },
    { price: 143.75, amount: 2340.70, total: 336625.58 },
    { price: 144.00, amount: 1567.20, total: 225676.80 },
  ]

  const handlePlaceOrder = () => {
    if (!orderForm.amount || (orderForm.orderType !== 'market' && !orderForm.price)) {
      alert('Please fill in all required fields')
      return
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      type: orderForm.type,
      orderType: orderForm.orderType,
      amount: parseFloat(orderForm.amount),
      price: orderForm.price ? parseFloat(orderForm.price) : undefined,
      stopPrice: orderForm.stopPrice ? parseFloat(orderForm.stopPrice) : undefined,
      status: 'pending',
      timestamp: new Date()
    }

    setOrders(prev => [newOrder, ...prev])
    
    // Reset form
    setOrderForm({
      type: 'buy',
      orderType: 'market',
      amount: '',
      price: '',
      stopPrice: ''
    })

    // Simulate order processing
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id 
          ? { ...order, status: Math.random() > 0.1 ? 'filled' : 'cancelled' }
          : order
      ))
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Book Display */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Order Book - {symbol}</h3>
        
        {/* Sell Orders */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-600 mb-2">
            <div>Price (USDC)</div>
            <div className="text-right">Amount (SOL)</div>
            <div className="text-right">Total (USDC)</div>
          </div>
          {sellOrders.reverse().map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 hover:bg-red-50">
              <div className="text-red-600 font-medium">{order.price.toFixed(2)}</div>
              <div className="text-right">{order.amount.toFixed(2)}</div>
              <div className="text-right">{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="border-t border-b border-gray-200 py-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold">142.75</div>
            <div className="text-sm text-gray-500">Spread: 0.50 (0.35%)</div>
          </div>
        </div>

        {/* Buy Orders */}
        <div>
          {buyOrders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 hover:bg-green-50">
              <div className="text-green-600 font-medium">{order.price.toFixed(2)}</div>
              <div className="text-right">{order.amount.toFixed(2)}</div>
              <div className="text-right">{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Placement Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Place Order</h3>
          
          {/* Order Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
            <button
              onClick={() => setOrderForm(prev => ({ ...prev, type: 'buy' }))}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                orderForm.type === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderForm(prev => ({ ...prev, type: 'sell' }))}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                orderForm.type === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Order Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <select
              value={orderForm.orderType}
              onChange={(e) => setOrderForm(prev => ({ ...prev, orderType: e.target.value as any }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="market">Market Order</option>
              <option value="limit">Limit Order</option>
              <option value="stop">Stop Order</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (SOL)</label>
            <input
              type="number"
              value={orderForm.amount}
              onChange={(e) => setOrderForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Input (for limit and stop orders) */}
          {orderForm.orderType !== 'market' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {orderForm.orderType === 'limit' ? 'Limit Price (USDC)' : 'Stop Price (USDC)'}
              </label>
              <input
                type="number"
                value={orderForm.orderType === 'limit' ? orderForm.price : orderForm.stopPrice}
                onChange={(e) => setOrderForm(prev => ({ 
                  ...prev, 
                  [orderForm.orderType === 'limit' ? 'price' : 'stopPrice']: e.target.value 
                }))}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <PrimaryButton onClick={handlePlaceOrder} className="w-full">
            Place {orderForm.type.toUpperCase()} Order
          </PrimaryButton>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No recent orders</div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">{order.orderType}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === 'filled' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Amount: {order.amount} SOL
                    {order.price && ` • Price: $${order.price}`}
                    {order.stopPrice && ` • Stop: $${order.stopPrice}`}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {order.timestamp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}