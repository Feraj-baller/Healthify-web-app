"use client"

import { useState, useEffect } from "react"
import StatsGrid from "@/components/StatsGrid"
import RecentScans from "@/components/RecentScans"
import QuickActions from "@/components/QuickActions"
import HealthChart from "@/components/HealthChart"
import { usePreferences } from "@/lib/contexts/PreferencesContext"
import { AIService } from "@/lib/ai-service"
import { Sparkles, Loader2 } from "lucide-react"

interface DashboardProps {
  onScanClick: () => void
  onVoiceClick: () => void
  onNavigate: (section: string) => void
}

interface DashboardInsight {
  id: string
  type: "health_tip" | "achievement" | "recommendation" | "warning"
  title: string
  description: string
  icon: string
  priority: "high" | "medium" | "low"
  actionable: boolean
}

export default function Dashboard({ onScanClick, onVoiceClick, onNavigate }: DashboardProps) {
  const { t } = usePreferences()
  const [aiInsights, setAiInsights] = useState<DashboardInsight[]>([])
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)

  // Mock health data for AI analysis
  const healthData = {
    weeklyScans: 12,
    healthScore: 78,
    caloriesAvg: 1850,
    proteinAvg: 85,
    sugarAvg: 45,
    waterIntake: 6.5,
    sleepHours: 7.2,
    exerciseMinutes: 180,
    goals: {
      weightLoss: true,
      muscleGain: false,
      healthyEating: true,
    },
    recentTrends: {
      healthScoreChange: +8,
      proteinChange: +12,
      sugarChange: -15,
    },
  }

  useEffect(() => {
    loadAIInsights()
  }, [])

  const loadAIInsights = async () => {
    setIsLoadingInsights(true)
    try {
      const insights = await AIService.generateDashboardInsights(healthData)
      setAiInsights(insights)
    } catch (error) {
      console.error("Failed to load AI insights:", error)
    } finally {
      setIsLoadingInsights(false)
    }
  }

  const getInsightIcon = (type: string, iconEmoji: string) => {
    if (iconEmoji) return iconEmoji

    switch (type) {
      case "achievement":
        return "🏆"
      case "recommendation":
        return "💡"
      case "health_tip":
        return "🎯"
      case "warning":
        return "⚠️"
      default:
        return "📊"
    }
  }

  const getInsightColor = (type: string, priority: string) => {
    switch (type) {
      case "achievement":
        return "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700"
      case "warning":
        return "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700"
      case "recommendation":
        return priority === "high"
          ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    }
  }

  const handleInsightAction = (insight: DashboardInsight) => {
    if (insight.actionable) {
      // Navigate to relevant section based on insight type
      switch (insight.type) {
        case "recommendation":
          if (insight.title.toLowerCase().includes("protein")) {
            onNavigate("inventory")
          } else if (insight.title.toLowerCase().includes("scan")) {
            onScanClick()
          } else {
            onNavigate("health-reports")
          }
          break
        case "warning":
          onNavigate("health-reports")
          break
        default:
          onNavigate("health-reports")
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
          {t("dashboard.greeting")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t("dashboard.subtitle")}</p>
      </div>

      {/* AI Insights Section */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">AI Health Insights</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Personalized recommendations powered by OpenRouter AI
                </p>
              </div>
            </div>
            <button
              onClick={loadAIInsights}
              disabled={isLoadingInsights}
              className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isLoadingInsights ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isLoadingInsights ? "Analyzing..." : "Refresh Insights"}
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoadingInsights ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">AI is analyzing your health data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  onClick={() => handleInsightAction(insight)}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    insight.actionable ? "cursor-pointer" : ""
                  } ${getInsightColor(insight.type, insight.priority)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{getInsightIcon(insight.type, insight.icon)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{insight.description}</p>
                      {insight.actionable && (
                        <div className="mt-2">
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            Click to take action →
                          </span>
                        </div>
                      )}
                    </div>
                    {insight.priority === "high" && (
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RecentScans />
        </div>
        <div className="xl:col-span-1">
          <QuickActions onScanClick={onScanClick} onVoiceClick={onVoiceClick} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Health Chart */}
      <HealthChart />
    </div>
  )
}
