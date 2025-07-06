"use client"

import { useState } from "react"
import { Calendar, TrendingUp, TrendingDown, Activity, Heart, Scale, Target } from "lucide-react"

interface HealthMetric {
  name: string
  value: number
  unit: string
  change: number
  trend: "up" | "down" | "stable"
  icon: any
  color: string
}

const healthMetrics: HealthMetric[] = [
  {
    name: "Health Score",
    value: 94,
    unit: "pts",
    change: 8,
    trend: "up",
    icon: Activity,
    color: "emerald",
  },
  {
    name: "Average Calories",
    value: 1850,
    unit: "cal/day",
    change: -120,
    trend: "down",
    icon: Target,
    color: "blue",
  },
  {
    name: "Weight",
    value: 175,
    unit: "lbs",
    change: -3.2,
    trend: "down",
    icon: Scale,
    color: "purple",
  },
  {
    name: "Heart Rate",
    value: 68,
    unit: "bpm",
    change: 2,
    trend: "stable",
    icon: Heart,
    color: "red",
  },
]

export default function HealthReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("Health Score")

  const periods = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ]

  // Sample chart data for the selected metric
  const chartData = {
    "Health Score": [88, 90, 89, 92, 91, 93, 94],
    "Average Calories": [1950, 1920, 1880, 1850, 1870, 1840, 1850],
    Weight: [178.2, 177.8, 177.1, 176.5, 175.8, 175.3, 175.0],
    "Heart Rate": [70, 69, 68, 67, 68, 69, 68],
  }

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-500 text-emerald-600 bg-emerald-50",
      blue: "bg-blue-500 text-blue-600 bg-blue-50",
      purple: "bg-purple-500 text-purple-600 bg-purple-50",
      red: "bg-red-500 text-red-600 bg-red-50",
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  const renderChart = () => {
    const data = chartData[selectedMetric as keyof typeof chartData] || chartData["Health Score"]
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    return (
      <div className="relative h-64 flex items-end justify-between px-4">
        {data.map((value, index) => {
          const height = ((value - minValue) / range) * 200 + 20
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-8 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500 hover:from-emerald-600 hover:to-emerald-500"
                style={{ height: `${height}px` }}
              />
              <span className="text-xs text-gray-500 mt-2">
                {index === 0 ? "6d ago" : index === 6 ? "Today" : `${6 - index}d`}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Health Reports
          </h1>
          <p className="text-xl text-gray-600">Track your health metrics and progress over time</p>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon
          const colorClasses = getColorClasses(metric.color).split(" ")

          return (
            <div
              key={metric.name}
              onClick={() => setSelectedMetric(metric.name)}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                selectedMetric === metric.name ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[2]} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${colorClasses[1]}`} />
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      metric.trend === "up"
                        ? "text-emerald-600"
                        : metric.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}
                  </span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Chart */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 bg-white/50">
          <h3 className="text-xl font-semibold text-gray-900">{selectedMetric} Trend</h3>
          <p className="text-sm text-gray-600">Last {periods.find((p) => p.value === selectedPeriod)?.label}</p>
        </div>
        <div className="p-6">{renderChart()}</div>
      </div>

      {/* Health Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* AI Insights */}
        <div className="glass-card">
          <div className="p-6 border-b border-gray-200 bg-white/50">
            <h3 className="text-xl font-semibold text-gray-900">🤖 AI Health Insights</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="font-semibold text-emerald-600 mb-2">🎯 Great Progress!</h4>
              <p className="text-sm text-gray-700">
                Your health score has improved by 8 points this week. Keep up the excellent work with your nutrition
                choices!
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-600 mb-2">💡 Recommendation</h4>
              <p className="text-sm text-gray-700">
                Consider increasing your protein intake by 10g daily to support your weight loss goals.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h4 className="font-semibold text-yellow-600 mb-2">⚠️ Watch Out</h4>
              <p className="text-sm text-gray-700">
                Your average sleep duration has decreased. Aim for 7-8 hours for optimal health benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="glass-card">
          <div className="p-6 border-b border-gray-200 bg-white/50">
            <h3 className="text-xl font-semibold text-gray-900">Goals Progress</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Weight Loss</span>
                <span className="text-sm text-gray-600">3.2 / 10 lbs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: "32%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Daily Steps</span>
                <span className="text-sm text-gray-600">8,500 / 10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: "85%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Water Intake</span>
                <span className="text-sm text-gray-600">6 / 8 glasses</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: "75%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Healthy Meals</span>
                <span className="text-sm text-gray-600">18 / 21 this week</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: "86%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
