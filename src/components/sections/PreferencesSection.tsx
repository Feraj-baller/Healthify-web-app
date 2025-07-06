"use client"

import { useState } from "react"
import { Moon, Sun, Globe, Download, Trash2, RefreshCw } from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

export default function PreferencesSection() {
  const { preferences, updatePreferences, t } = usePreferences()
  const [showDataExport, setShowDataExport] = useState(false)

  const handleThemeToggle = () => {
    updatePreferences({
      theme: preferences.theme === "light" ? "dark" : "light",
    })
  }

  const handleLanguageChange = (language: string) => {
    updatePreferences({ language })
  }

  const handleAccessibilityChange = (key: keyof typeof preferences.accessibility, value: any) => {
    updatePreferences({
      accessibility: {
        ...preferences.accessibility,
        [key]: value,
      },
    })
  }

  const handleUnitsChange = (key: keyof typeof preferences.units, value: any) => {
    updatePreferences({
      units: {
        ...preferences.units,
        [key]: value,
      },
    })
  }

  const handleDataExport = () => {
    setShowDataExport(true)
    // Simulate data export
    setTimeout(() => {
      alert("Your data has been exported and will be sent to your email!")
      setShowDataExport(false)
    }, 2000)
  }

  const handleAccountDeletion = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion request submitted. You will receive a confirmation email.")
    }
  }

  const handleClearCache = () => {
    alert("App cache cleared successfully!")
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
          {t("preferences.title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t("preferences.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Appearance & Theme */}
        <div className="glass-card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {preferences.theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {t("preferences.appearance")}
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{t("preferences.theme")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("preferences.themeDesc")}</p>
              </div>
              <button
                onClick={handleThemeToggle}
                className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300 ${
                  preferences.theme === "dark" ? "bg-gray-800" : "bg-emerald-500"
                }`}
              >
                <span
                  className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform duration-300 ${
                    preferences.theme === "dark" ? "translate-x-12" : "translate-x-1"
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center">
                    {preferences.theme === "light" ? (
                      <Sun className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-800" />
                    )}
                  </span>
                </span>
              </button>
            </div>

            {/* Language Selection */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t("preferences.language")}
              </h4>
              <select
                value={preferences.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t("preferences.fontSize")}</h4>
              <div className="flex gap-2">
                {["small", "medium", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAccessibilityChange("fontSize", size)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      preferences.accessibility.fontSize === size
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {t(`preferences.${size}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Units & Measurements */}
        <div className="glass-card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("preferences.units")}</h3>
          </div>
          <div className="p-6 space-y-6">
            {Object.entries(preferences.units).map(([key, value]) => (
              <div key={key}>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">{t(`common.${key}`)}</h4>
                <div className="flex gap-2">
                  {key === "weight" &&
                    ["kg", "lbs"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => handleUnitsChange("weight", unit)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          value === unit
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {t(`units.${unit}`)}
                      </button>
                    ))}
                  {key === "height" &&
                    ["cm", "ft"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => handleUnitsChange("height", unit)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          value === unit
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {t(`units.${unit}`)}
                      </button>
                    ))}
                  {key === "temperature" &&
                    ["celsius", "fahrenheit"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => handleUnitsChange("temperature", unit)}
                        className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                          value === unit
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {unit === "celsius" ? t("units.celsius") : t("units.fahrenheit")}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div className="glass-card xl:col-span-2">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("preferences.accessibility")}</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{t("preferences.reducedMotion")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("preferences.reducedMotionDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.accessibility.reducedMotion}
                    onChange={(e) => handleAccessibilityChange("reducedMotion", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{t("preferences.highContrast")}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("preferences.highContrastDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.accessibility.highContrast}
                    onChange={(e) => handleAccessibilityChange("highContrast", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card xl:col-span-2">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {t("preferences.dataManagement")}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleDataExport}
                disabled={showDataExport}
                className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {showDataExport ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {showDataExport ? t("preferences.exporting") : t("preferences.exportData")}
              </button>
              <button onClick={handleClearCache} className="btn-secondary flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" />
                {t("preferences.clearCache")}
              </button>
              <button
                onClick={handleAccountDeletion}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                {t("preferences.deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
