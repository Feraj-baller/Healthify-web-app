export default function FastingSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Intermittent Fasting Hub
        </h1>
        <p className="text-xl text-gray-600">Track your fasting journey with AI-powered insights</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Fasting Timer Card */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">🔥 16:8 Fast Active</h3>
              <div className="text-6xl font-bold text-center my-8">14:32:15</div>
              <p className="text-center opacity-90 mb-6">Time remaining: 1h 28m</p>

              <div className="bg-white/20 rounded-full h-2 mb-6">
                <div className="bg-white rounded-full h-2 w-3/4 shadow-lg"></div>
              </div>

              <div className="flex justify-between text-sm">
                <span>Started: 6:00 PM</span>
                <span>Goal: 10:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fasting Programs */}
        <div className="xl:col-span-1">
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-xl font-semibold text-gray-900">Fasting Programs</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50">
                <h4 className="font-semibold text-emerald-600">16:8 Method</h4>
                <p className="text-sm text-gray-600 my-2">Most popular • Currently active</p>
                <button className="btn-primary w-full">Continue</button>
              </div>

              <div className="p-4 border border-gray-300 rounded-xl">
                <h4 className="font-semibold">14:10 Method</h4>
                <p className="text-sm text-gray-600 my-2">Beginner friendly</p>
                <button className="btn-secondary w-full">Try This</button>
              </div>

              <div className="p-4 border border-gray-300 rounded-xl">
                <h4 className="font-semibold">20:4 Method</h4>
                <p className="text-sm text-gray-600 my-2">Advanced level</p>
                <button className="btn-secondary w-full">Advanced</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
