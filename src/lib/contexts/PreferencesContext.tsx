"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface PreferencesState {
  theme: "light" | "dark"
  language: string
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
    fontSize: "small" | "medium" | "large"
  }
  units: {
    weight: "kg" | "lbs"
    height: "cm" | "ft"
    temperature: "celsius" | "fahrenheit"
  }
}

interface PreferencesContextType {
  preferences: PreferencesState
  updatePreferences: (updates: Partial<PreferencesState>) => void
  t: (key: string) => string
}

const defaultPreferences: PreferencesState = {
  theme: "light",
  language: "en",
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: "medium",
  },
  units: {
    weight: "lbs",
    height: "ft",
    temperature: "fahrenheit",
  },
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Header
    "header.search": "Search products, brands...",
    "header.scan": "Scan",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.scan": "Scan Products",
    "nav.fasting": "Intermittent Fasting",
    "nav.inventory": "Smart Pantry",
    "nav.blogger": "Creator Hub",
    "nav.catalog": "Product Catalog",
    "nav.history": "Scan History",
    "nav.profile": "Profile",
    "nav.preferences": "Preferences",
    "nav.reports": "Health Reports",
    "nav.trends": "Trends",

    // Dashboard
    "dashboard.greeting": "Good morning, John! ☀️",
    "dashboard.subtitle": "Here's your comprehensive health overview for today",
    "dashboard.healthScore": "AI Health Score",
    "dashboard.fastingActive": "Fasting Active",
    "dashboard.pantryItems": "Pantry Items",
    "dashboard.creatorReach": "Creator Reach",
    "dashboard.recentAnalysis": "Recent AI Analysis",
    "dashboard.viewAllScans": "View all scans →",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.aiScanner": "AI Product Scanner",
    "dashboard.voiceCommand": "Voice Command",
    "dashboard.startFast": "Start Fast",
    "dashboard.checkPantry": "Check Pantry",
    "dashboard.upgrade": "🚀 Upgrade to AI Pro",
    "dashboard.upgradeDesc": "Unlimited scans, advanced AI insights, family health tracking",
    "dashboard.upgradeButton": "Upgrade Now • $9.99/mo →",

    // Units
    "units.kg": "kg",
    "units.lbs": "lbs",
    "units.cm": "cm",
    "units.ft": "ft",
    "units.celsius": "°C",
    "units.fahrenheit": "°F",

    // Common
    "common.calories": "Cal",
    "common.sugar": "Sugar",
    "common.protein": "Protein",
    "common.weight": "Weight",
    "common.height": "Height",
    "common.temperature": "Temperature",

    // Preferences
    "preferences.title": "Preferences",
    "preferences.subtitle": "Customize your Healthify experience",
    "preferences.appearance": "Appearance & Theme",
    "preferences.theme": "Theme",
    "preferences.themeDesc": "Choose your preferred color scheme",
    "preferences.language": "Language",
    "preferences.fontSize": "Font Size",
    "preferences.small": "small",
    "preferences.medium": "medium",
    "preferences.large": "large",
    "preferences.units": "Units & Measurements",
    "preferences.accessibility": "Accessibility",
    "preferences.reducedMotion": "Reduced Motion",
    "preferences.reducedMotionDesc": "Minimize animations and transitions",
    "preferences.highContrast": "High Contrast",
    "preferences.highContrastDesc": "Increase color contrast for better visibility",
    "preferences.dataManagement": "Data Management",
    "preferences.exportData": "Export Data",
    "preferences.clearCache": "Clear Cache",
    "preferences.deleteAccount": "Delete Account",
    "preferences.exporting": "Exporting...",
  },
  es: {
    // Header
    "header.search": "Buscar productos, marcas...",
    "header.scan": "Escanear",

    // Navigation
    "nav.dashboard": "Panel",
    "nav.scan": "Escanear Productos",
    "nav.fasting": "Ayuno Intermitente",
    "nav.inventory": "Despensa Inteligente",
    "nav.blogger": "Centro Creador",
    "nav.catalog": "Catálogo de Productos",
    "nav.history": "Historial de Escaneos",
    "nav.profile": "Perfil",
    "nav.preferences": "Preferencias",
    "nav.reports": "Informes de Salud",
    "nav.trends": "Tendencias",

    // Dashboard
    "dashboard.greeting": "¡Buenos días, John! ☀️",
    "dashboard.subtitle": "Aquí está tu resumen completo de salud para hoy",
    "dashboard.healthScore": "Puntuación de Salud IA",
    "dashboard.fastingActive": "Ayuno Activo",
    "dashboard.pantryItems": "Artículos de Despensa",
    "dashboard.creatorReach": "Alcance del Creador",
    "dashboard.recentAnalysis": "Análisis IA Reciente",
    "dashboard.viewAllScans": "Ver todos los escaneos →",
    "dashboard.quickActions": "Acciones Rápidas",
    "dashboard.aiScanner": "Escáner IA de Productos",
    "dashboard.voiceCommand": "Comando de Voz",
    "dashboard.startFast": "Iniciar Ayuno",
    "dashboard.checkPantry": "Revisar Despensa",
    "dashboard.upgrade": "🚀 Actualizar a IA Pro",
    "dashboard.upgradeDesc": "Escaneos ilimitados, insights avanzados de IA, seguimiento familiar",
    "dashboard.upgradeButton": "Actualizar Ahora • $9.99/mes →",

    // Units
    "units.kg": "kg",
    "units.lbs": "lbs",
    "units.cm": "cm",
    "units.ft": "pies",
    "units.celsius": "°C",
    "units.fahrenheit": "°F",

    // Common
    "common.calories": "Cal",
    "common.sugar": "Azúcar",
    "common.protein": "Proteína",
    "common.weight": "Peso",
    "common.height": "Altura",
    "common.temperature": "Temperatura",

    // Preferences
    "preferences.title": "Preferencias",
    "preferences.subtitle": "Personaliza tu experiencia Healthify",
    "preferences.appearance": "Apariencia y Tema",
    "preferences.theme": "Tema",
    "preferences.themeDesc": "Elige tu esquema de colores preferido",
    "preferences.language": "Idioma",
    "preferences.fontSize": "Tamaño de Fuente",
    "preferences.small": "pequeño",
    "preferences.medium": "mediano",
    "preferences.large": "grande",
    "preferences.units": "Unidades y Medidas",
    "preferences.accessibility": "Accesibilidad",
    "preferences.reducedMotion": "Movimiento Reducido",
    "preferences.reducedMotionDesc": "Minimizar animaciones y transiciones",
    "preferences.highContrast": "Alto Contraste",
    "preferences.highContrastDesc": "Aumentar contraste de color para mejor visibilidad",
    "preferences.dataManagement": "Gestión de Datos",
    "preferences.exportData": "Exportar Datos",
    "preferences.clearCache": "Limpiar Caché",
    "preferences.deleteAccount": "Eliminar Cuenta",
    "preferences.exporting": "Exportando...",
  },
  fr: {
    // Header
    "header.search": "Rechercher produits, marques...",
    "header.scan": "Scanner",

    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.scan": "Scanner Produits",
    "nav.fasting": "Jeûne Intermittent",
    "nav.inventory": "Garde-manger Intelligent",
    "nav.blogger": "Centre Créateur",
    "nav.catalog": "Catalogue de Produits",
    "nav.history": "Historique des Scans",
    "nav.profile": "Profil",
    "nav.preferences": "Préférences",
    "nav.reports": "Rapports de Santé",
    "nav.trends": "Tendances",

    // Dashboard
    "dashboard.greeting": "Bonjour, John! ☀️",
    "dashboard.subtitle": "Voici votre aperçu complet de santé pour aujourd'hui",
    "dashboard.healthScore": "Score de Santé IA",
    "dashboard.fastingActive": "Jeûne Actif",
    "dashboard.pantryItems": "Articles du Garde-manger",
    "dashboard.creatorReach": "Portée du Créateur",
    "dashboard.recentAnalysis": "Analyse IA Récente",
    "dashboard.viewAllScans": "Voir tous les scans →",
    "dashboard.quickActions": "Actions Rapides",
    "dashboard.aiScanner": "Scanner IA de Produits",
    "dashboard.voiceCommand": "Commande Vocale",
    "dashboard.startFast": "Commencer le Jeûne",
    "dashboard.checkPantry": "Vérifier le Garde-manger",
    "dashboard.upgrade": "🚀 Passer à IA Pro",
    "dashboard.upgradeDesc": "Scans illimités, insights IA avancés, suivi familial",
    "dashboard.upgradeButton": "Mettre à niveau maintenant • 9,99$/mois →",

    // Units
    "units.kg": "kg",
    "units.lbs": "lbs",
    "units.cm": "cm",
    "units.ft": "pieds",
    "units.celsius": "°C",
    "units.fahrenheit": "°F",

    // Common
    "common.calories": "Cal",
    "common.sugar": "Sucre",
    "common.protein": "Protéine",
    "common.weight": "Poids",
    "common.height": "Taille",
    "common.temperature": "Température",

    // Preferences
    "preferences.title": "Préférences",
    "preferences.subtitle": "Personnalisez votre expérience Healthify",
    "preferences.appearance": "Apparence et Thème",
    "preferences.theme": "Thème",
    "preferences.themeDesc": "Choisissez votre schéma de couleurs préféré",
    "preferences.language": "Langue",
    "preferences.fontSize": "Taille de Police",
    "preferences.small": "petit",
    "preferences.medium": "moyen",
    "preferences.large": "grand",
    "preferences.units": "Unités et Mesures",
    "preferences.accessibility": "Accessibilité",
    "preferences.reducedMotion": "Mouvement Réduit",
    "preferences.reducedMotionDesc": "Minimiser les animations et transitions",
    "preferences.highContrast": "Contraste Élevé",
    "preferences.highContrastDesc": "Augmenter le contraste des couleurs pour une meilleure visibilité",
    "preferences.dataManagement": "Gestion des Données",
    "preferences.exportData": "Exporter les Données",
    "preferences.clearCache": "Vider le Cache",
    "preferences.deleteAccount": "Supprimer le Compte",
    "preferences.exporting": "Exportation...",
  },
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<PreferencesState>(defaultPreferences)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("healthify-preferences")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPreferences({ ...defaultPreferences, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved preferences:", error)
      }
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    if (preferences.theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [preferences.theme])

  // Apply font size changes
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("text-small", "text-medium", "text-large")
    root.classList.add(`text-${preferences.accessibility.fontSize}`)
  }, [preferences.accessibility.fontSize])

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement
    if (preferences.accessibility.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
  }, [preferences.accessibility.highContrast])

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement
    if (preferences.accessibility.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }
  }, [preferences.accessibility.reducedMotion])

  const updatePreferences = (updates: Partial<PreferencesState>) => {
    const newPreferences = { ...preferences, ...updates }
    setPreferences(newPreferences)
    localStorage.setItem("healthify-preferences", JSON.stringify(newPreferences))
  }

  const t = (key: string): string => {
    const dict = translations[preferences.language as keyof typeof translations] || translations.en
    return dict[key as keyof typeof dict] || key
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, t }}>{children}</PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
