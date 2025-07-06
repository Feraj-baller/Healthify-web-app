import { Monitor, MessageCircle, BarChart3 } from "lucide-react"

export default function BloggerSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Creator Hub
        </h1>
        <p className="text-xl text-gray-600">Monetize your health journey and inspire others</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Creator Dashboard */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">⭐ Creator Dashboard</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold mb-1">12.5K</div>
                <div className="text-sm opacity-80">Monthly Reach</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-2xl font-bold mb-1">$547</div>
                <div className="text-sm opacity-80">Earnings</div>
              </div>
            </div>

            <div className="text-center">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                🚀 Elite Tier • 4.8% Commission Rate
              </span>
            </div>
          </div>
        </div>

        {/* Content Tools */}
        <div className="xl:col-span-1">
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-xl font-semibold text-gray-900">Content Tools</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Monitor className="w-5 h-5" />
                Create Health Post
              </button>

              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Share Story
              </button>

              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                View Analytics
              </button>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-sm mb-2">💡 Growth Tip</h4>
                <p className="text-xs text-gray-600">Share your fasting journey to increase engagement by 40%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
