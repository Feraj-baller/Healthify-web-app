"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Dashboard from "@/components/sections/Dashboard"
import FastingSection from "@/components/sections/FastingSection"
import InventorySection from "@/components/sections/InventorySection"
import BloggerSection from "@/components/sections/BloggerSection"
import CatalogSection from "@/components/sections/CatalogSection"
import HistorySection from "@/components/sections/HistorySection"
import ProfileSection from "@/components/sections/ProfileSection"
import PreferencesSection from "@/components/sections/PreferencesSection"
import HealthReportsSection from "@/components/sections/HealthReportsSection"
import ScanModal from "@/components/modals/ScanModal"
import VoiceIndicator from "@/components/VoiceIndicator"
import SearchModal from "@/components/SearchModal"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scanModalOpen, setScanModalOpen] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [voiceQuery, setVoiceQuery] = useState("")

  const handleVoiceTranscription = (transcription: string) => {
    setVoiceQuery(transcription)
    setSearchModalOpen(true)
    setVoiceActive(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            onScanClick={() => setScanModalOpen(true)}
            onVoiceClick={() => setVoiceActive(true)}
            onNavigate={setActiveSection}
          />
        )
      case "fasting":
        return <FastingSection />
      case "inventory":
        return <InventorySection />
      case "blogger":
        return <BloggerSection />
      case "catalog":
        return <CatalogSection />
      case "history":
        return <HistorySection />
      case "profile":
        return <ProfileSection />
      case "preferences":
        return <PreferencesSection />
      case "reports":
        return <HealthReportsSection />
      default:
        return (
          <Dashboard
            onScanClick={() => setScanModalOpen(true)}
            onVoiceClick={() => setVoiceActive(true)}
            onNavigate={setActiveSection}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        setSidebarOpen={setSidebarOpen}
        onScanClick={() => setScanModalOpen(true)}
        onVoiceClick={() => setVoiceActive(true)}
        onNavigate={setActiveSection}
      />

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onScanClick={() => setScanModalOpen(true)}
      />

      <main className="lg:ml-64 pt-20 p-6 min-h-screen">{renderSection()}</main>

      {scanModalOpen && <ScanModal onClose={() => setScanModalOpen(false)} />}

      {voiceActive && (
        <VoiceIndicator onClose={() => setVoiceActive(false)} onTranscription={handleVoiceTranscription} />
      )}

      {searchModalOpen && (
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => {
            setSearchModalOpen(false)
            setVoiceQuery("")
          }}
          initialQuery={voiceQuery}
        />
      )}
    </div>
  )
}
