"use client"

import StatsGrid from "@/components/StatsGrid"
import RecentScans from "@/components/RecentScans"
import QuickActions from "@/components/QuickActions"
import HealthChart from "@/components/HealthChart"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

interface DashboardProps {
  onScanClick: () => void
  onVoiceClick: () => void
  onNavigate: (section: string) => void
}

export default function Dashboard({ onScanClick, onVoiceClick, onNavigate }: DashboardProps) {
  const { t } = usePreferences()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
          {t("dashboard.greeting")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t("dashboard.subtitle")}</p>
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
