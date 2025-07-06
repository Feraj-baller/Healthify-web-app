"use client"
import StatsGrid from "./StatsGrid"
import ProductCard from "./ProductCard"
import QuickActions from "./QuickActions"

const recentProducts = [
  {
    id: 1,
    name: "Organic Almond Milk",
    brand: "Blue Diamond • Unsweetened",
    grade: "A+",
    calories: 60,
    sugar: "0g",
    protein: "2g",
    image: "🥛",
  },
  {
    id: 2,
    name: "Greek Yogurt",
    brand: "Chobani • Plain",
    grade: "A",
    calories: 130,
    sugar: "6g",
    protein: "20g",
    image: "🥗",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Good morning, John! ☀️
        </h1>
        <p className="text-xl text-gray-600">Here's your comprehensive health overview for today</p>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent AI Analysis */}
        <div className="xl:col-span-2">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-white/50 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent AI Analysis</h2>
              <a
                href="#"
                className="text-emerald-500 hover:text-emerald-600 font-medium hover:translate-x-1 transition-all"
              >
                View all scans →
              </a>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="xl:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
