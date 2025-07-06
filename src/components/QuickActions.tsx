"use client"

import { QrCode, Mic, Clock, Package } from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

interface QuickActionsProps {
  onScanClick: () => void
  onVoiceClick: () => void
  onNavigate: (section: string) => void
}

export default function QuickActions({ onScanClick, onVoiceClick, onNavigate }: QuickActionsProps) {
  const { t } = usePreferences()

  return (
    <div className="glass-card">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("dashboard.quickActions")}</h2>
      </div>
      <div className="p-6 space-y-4">
        <button onClick={onScanClick} className="btn-primary w-full flex items-center justify-center gap-2">
          <QrCode className="w-5 h-5" />
          {t("dashboard.aiScanner")}
        </button>

        <button onClick={onVoiceClick} className="btn-secondary w-full flex items-center justify-center gap-2">
          <Mic className="w-5 h-5" />
          {t("dashboard.voiceCommand")}
        </button>

        <button
          onClick={() => onNavigate("fasting")}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <Clock className="w-5 h-5" />
          {t("dashboard.startFast")}
        </button>

        <button
          onClick={() => onNavigate("inventory")}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" />
          {t("dashboard.checkPantry")}
        </button>

        {/* Upgrade Card */}
        <div className="mt-8 p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white">
          <h4 className="font-semibold mb-2">{t("dashboard.upgrade")}</h4>
          <p className="text-sm opacity-90 mb-4">{t("dashboard.upgradeDesc")}</p>
          <button className="w-full bg-white text-emerald-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
            {t("dashboard.upgradeButton")}
          </button>
        </div>
      </div>
    </div>
  )
}
