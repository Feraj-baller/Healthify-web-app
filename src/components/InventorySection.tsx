export default function InventorySection() {
  const inventoryItems = [
    { name: "Almond Milk", status: "expiring", statusText: "Expires in 2 days" },
    { name: "Greek Yogurt", status: "good", statusText: "Fresh" },
    { name: "Organic Eggs", status: "low", statusText: "Low stock" },
    { name: "Quinoa", status: "good", statusText: "Stocked" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-emerald-500 text-white"
      case "expiring":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Smart Pantry Manager
        </h1>
        <p className="text-xl text-gray-600">AI-powered inventory tracking and meal planning</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Inventory Status */}
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">📦 Inventory Status</h3>
            <div className="space-y-4">
              {inventoryItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.statusText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Meal Suggestions */}
        <div className="xl:col-span-1">
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-xl font-semibold text-gray-900">AI Meal Suggestions</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 border border-emerald-500 rounded-xl bg-emerald-50">
                <h4 className="font-semibold text-emerald-600">🥗 Greek Bowl</h4>
                <p className="text-sm text-gray-600 my-2">Uses: Greek Yogurt, Quinoa</p>
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Health Score: A+
                </span>
              </div>

              <div className="p-4 border border-gray-300 rounded-xl">
                <h4 className="font-semibold">🍳 Protein Scramble</h4>
                <p className="text-sm text-gray-600 my-2">Uses: Organic Eggs</p>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Health Score: A
                </span>
              </div>

              <button className="btn-primary w-full mt-4">Generate Shopping List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
