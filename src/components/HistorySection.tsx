export default function HistorySection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Scan History
        </h1>
        <p className="text-xl text-gray-600">Review your past product scans and health insights</p>
      </div>

      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 bg-white/50">
          <h2 className="text-xl font-semibold text-gray-900">Recent Scans</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scans yet</h3>
            <p className="text-gray-600 mb-6">Start scanning products to see your history here</p>
            <button className="btn-primary">Start Scanning</button>
          </div>
        </div>
      </div>
    </div>
  )
}
