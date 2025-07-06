export default function HistorySection() {
  const scanHistory = [
    {
      date: "Today, 2:30 PM",
      product: "Organic Almond Milk",
      brand: "Blue Diamond",
      grade: "A+",
      gradeColor: "bg-emerald-500",
    },
    {
      date: "Today, 10:15 AM",
      product: "Greek Yogurt",
      brand: "Chobani",
      grade: "A",
      gradeColor: "bg-emerald-500",
    },
    {
      date: "Yesterday, 6:45 PM",
      product: "Whole Grain Bread",
      brand: "Dave's Killer Bread",
      grade: "B+",
      gradeColor: "bg-blue-500",
    },
    {
      date: "Yesterday, 3:20 PM",
      product: "Mixed Nuts",
      brand: "Wonderful",
      grade: "A",
      gradeColor: "bg-emerald-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Scan History
        </h1>
        <p className="text-xl text-gray-600">Review your previous AI product analyses</p>
      </div>

      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 bg-white/50">
          <h2 className="text-xl font-semibold text-gray-900">Recent Scans</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {scanHistory.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-emerald-300 transition-all cursor-pointer group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">{scan.product}</h3>
                  <p className="text-sm text-gray-600">{scan.brand}</p>
                  <p className="text-xs text-gray-500 mt-1">{scan.date}</p>
                </div>

                <div
                  className={`${scan.gradeColor} text-white px-3 py-1 text-lg font-bold rounded-xl group-hover:scale-110 transition-transform`}
                >
                  {scan.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
