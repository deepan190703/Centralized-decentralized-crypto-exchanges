export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
        <div className="bg-gray-200 h-4 w-4/6 rounded"></div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}