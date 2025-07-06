import { TrendingUp } from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

export default function StatsGrid() {
  const { t, preferences } = usePreferences()

  // Convert weight based on user preference
  const convertWeight = (weightInLbs: number) => {
    if (preferences.units.weight === "kg") {
      return Math.round(weightInLbs * 0.453592)
    }
    return weightInLbs
  }

  const stats = [
    {
      icon: "📊",
      value: "94",
      label: t("dashboard.healthScore"),
      change: "+8 points this week",
      positive: true,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500",
    },
    {
      icon: "⏰",
      value: "16:8",
      label: t("dashboard.fastingActive"),
      change: "14h 32m elapsed",
      positive: true,
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-500",
    },
    {
      icon: "📦",
      value: "23",
      label: t("dashboard.pantryItems"),
      change: "3 expiring soon",
      positive: true,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500",
    },
    {
      icon: "🎯",
      value: "12.5K",
      label: t("dashboard.creatorReach"),
      change: "+24% growth",
      positive: true,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card group">
          <div
            className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
          >
            {stat.icon}
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
          <div className="text-gray-600 dark:text-gray-400 font-medium mb-2">{stat.label}</div>
          <div
            className={`inline-flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${
              stat.positive
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                : "text-red-600 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  )
}
