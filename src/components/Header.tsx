"use client"

import { useState } from "react"
import { Search, Mic, Sun, Moon, Settings, Bell } from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"
import SearchModal from "./SearchModal"
import VoiceIndicator from "./VoiceIndicator"

interface HeaderProps {
  onVoiceClick: () => void
  isListening: boolean
}

export default function Header({ onVoiceClick, isListening }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, toggleTheme, t } = usePreferences()

  return (
    <>
      <header className="glass-card mb-8 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4 lg:p-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              H
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Healthify</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Health Assistant</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-text hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{ cursor: "text" }}
            >
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-500 dark:text-gray-400 flex-1 text-left">{t("header.search")}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onVoiceClick()
                  }}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                    isListening
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs font-mono">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Voice Indicator */}
        {isListening && <VoiceIndicator />}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
