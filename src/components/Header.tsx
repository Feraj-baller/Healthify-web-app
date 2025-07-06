"use client"

import { Search, Bell, QrCode, Menu, Mic } from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"
import { useState } from "react"
import SearchModal from "@/components/SearchModal"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
  onScanClick: () => void
  onVoiceClick: () => void
  onNavigate?: (section: string) => void
}

export default function Header({ setSidebarOpen, onScanClick, onVoiceClick, onNavigate }: HeaderProps) {
  const { t } = usePreferences()
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [voiceQuery, setVoiceQuery] = useState("")

  const handleVoiceTranscription = (transcription: string) => {
    setVoiceQuery(transcription)
    setSearchModalOpen(true)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 h-20 shadow-sm">
      <div className="w-full px-4 sm:px-6 h-full flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Mobile Menu + Logo */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition-transform flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-lg sm:text-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:rotate-6">
              🥗
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent hidden xs:block">
              Healthify
            </span>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-md lg:max-w-2xl relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
          <input
            type="text"
            placeholder={t("header.search")}
            onClick={() => setSearchModalOpen(true)}
            readOnly
            className="w-full pl-10 lg:pl-12 pr-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 dark:border-gray-600 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100 cursor-pointer"
          />
        </div>

        {/* Right Section: Navigation + Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {[
              { label: t("nav.catalog"), section: "catalog" },
              { label: t("nav.history"), section: "history" },
              { label: t("nav.reports"), section: "reports" },
              { label: t("nav.fasting"), section: "fasting" },
              { label: t("nav.inventory"), section: "inventory" },
              { label: t("nav.blogger"), section: "blogger" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate?.(item.section)}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all duration-200 text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Voice Command Button - Mobile/Tablet */}
          <button
            onClick={onVoiceClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            title="Voice Command"
          >
            <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400" />
          </button>

          {/* Scan Button */}
          <button
            onClick={onScanClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/30 flex items-center gap-1 sm:gap-2 text-sm lg:text-base flex-shrink-0"
          >
            <QrCode className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">{t("header.scan")}</span>
          </button>

          {/* Voice Command Button - Desktop */}
          <button
            onClick={onVoiceClick}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            title="Voice Command"
          >
            <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400" />
          </button>

          {/* Notifications */}
          <div className="relative flex-shrink-0">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse-custom font-semibold">
              5
            </span>
          </div>

          {/* User Avatar */}
          <button
            onClick={() => onNavigate?.("profile")}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform shadow-lg text-sm lg:text-base flex-shrink-0"
          >
            JD
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t("header.search")}
            onClick={() => setSearchModalOpen(true)}
            readOnly
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100 cursor-pointer"
          />
        </div>
      </div>

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => {
          setSearchModalOpen(false)
          setVoiceQuery("")
        }}
        initialQuery={voiceQuery}
      />
    </header>
  )
}
