"use client"

import {
  LayoutDashboard,
  QrCode,
  Clock,
  Package,
  Zap,
  FileText,
  History,
  User,
  Settings,
  BarChart3,
  X,
} from "lucide-react"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onScanClick: () => void
}

export default function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen, onScanClick }: SidebarProps) {
  const { t } = usePreferences()

  const navigationItems = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
        { id: "scan", label: t("nav.scan"), icon: QrCode, isAction: true },
        { id: "fasting", label: t("nav.fasting"), icon: Clock },
        { id: "inventory", label: t("nav.inventory"), icon: Package },
        { id: "blogger", label: t("nav.blogger"), icon: Zap },
        { id: "catalog", label: t("nav.catalog"), icon: FileText },
        { id: "history", label: t("nav.history"), icon: History },
      ],
    },
    {
      title: "Personal",
      items: [
        { id: "profile", label: t("nav.profile"), icon: User },
        { id: "preferences", label: t("nav.preferences"), icon: Settings },
      ],
    },
    {
      title: "Insights",
      items: [{ id: "reports", label: t("nav.reports"), icon: BarChart3 }],
    },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-20 bottom-0 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-8">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.isAction && item.id === "scan") {
                          onScanClick()
                        } else {
                          setActiveSection(item.id)
                        }
                        setIsOpen(false)
                      }}
                      className={`sidebar-link w-full ${isActive ? "active" : ""}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
