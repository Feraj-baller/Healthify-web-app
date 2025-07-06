"use client"

import { useState, useEffect } from "react"
import { Search, X, Loader2, Star, TrendingUp, Sparkles, Heart } from "lucide-react"
import { openRouterService } from "@/lib/openrouter"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

interface SearchResult {
  type: "product" | "brand" | "category" | "health_tip"
  title: string
  description: string
  relevance: number
  data?: any
}

export default function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const { t } = usePreferences()

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("healthify-recent-searches")
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved))
        } catch (error) {
          console.error("Failed to load recent searches:", error)
        }
      }
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() && query.length > 1) {
      const timeoutId = setTimeout(() => {
        handleSearch()
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = async () => {
    if (!query.trim() || query.length < 2) return

    setIsLoading(true)

    try {
      const searchResults = await openRouterService.searchProducts(query)
      setResults(searchResults)

      if (searchResults.length > 0) {
        const updatedRecent = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
        setRecentSearches(updatedRecent)
        localStorage.setItem("healthify-recent-searches", JSON.stringify(updatedRecent))
      }
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "product":
        return "🥗"
      case "brand":
        return "🏢"
      case "category":
        return "📂"
      case "health_tip":
        return "💡"
      default:
        return "🔍"
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-emerald-500 text-white"
      case "B+":
      case "B":
        return "bg-blue-500 text-white"
      case "C":
        return "bg-yellow-500 text-white"
      default:
        return "bg-red-500 text-white"
    }
  }

  const popularSuggestions = [
    "Greek yogurt",
    "Protein bars",
    "Quinoa",
    "Avocado",
    "Salmon",
    "Spinach",
    "Blueberries",
    "Oatmeal",
  ]

  if (!isOpen) return null

  return (
    <div className="search-modal-backdrop flex items-start justify-center p-4 pt-20">
      <div className="bg-white/98 dark:bg-slate-800/98 backdrop-blur-xl border border-gray-200/50 dark:border-slate-600/50 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl animate-in slide-in-from-top-4 duration-300">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 sm:p-6 border-b border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("header.search")}
            className="flex-1 text-base sm:text-lg bg-transparent border-none outline-none text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 min-w-0"
            autoFocus
          />
          {isLoading && <Loader2 className="w-5 h-5 animate-spin text-emerald-500 flex-shrink-0" />}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300 flex-shrink-0 hover:scale-110"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Result Details Modal */}
          {selectedResult && (
            <div className="p-6 border-b border-gray-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">{selectedResult.title}</h3>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-slate-300">{selectedResult.description}</p>

                {selectedResult.data && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedResult.data.grade && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-slate-400">Health Grade:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(selectedResult.data.grade)}`}
                        >
                          {selectedResult.data.grade}
                        </span>
                      </div>
                    )}

                    {selectedResult.data.calories && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-slate-400">Calories:</span>
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {selectedResult.data.calories}
                        </span>
                      </div>
                    )}

                    {selectedResult.data.protein && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-slate-400">Protein:</span>
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {selectedResult.data.protein}
                        </span>
                      </div>
                    )}

                    {selectedResult.data.sugar && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-slate-400">Sugar:</span>
                        <span className="font-semibold text-gray-900 dark:text-slate-100">
                          {selectedResult.data.sugar}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {selectedResult.data?.ingredients && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedResult.data.ingredients.map((ingredient: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-full text-xs transition-all duration-300 hover:scale-105"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedResult.data?.benefits && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Benefits:</h4>
                    <div className="space-y-1">
                      {selectedResult.data.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Heart className="w-3 h-3 text-emerald-500" />
                          <span className="text-sm text-gray-700 dark:text-slate-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && !selectedResult && recentSearches.length > 0 && (
            <div className="p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 group hover:scale-105"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400 dark:text-slate-400 group-hover:text-emerald-500 flex-shrink-0 transition-colors duration-300" />
                    <span className="text-gray-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate transition-colors duration-300">
                      {search}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && !selectedResult && (
            <div className="p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Search Results
              </h3>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg"
                  >
                    <div className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 truncate">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-slate-400 truncate">{result.description}</p>
                      {result.data && (
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {result.data.grade && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 hover:scale-110 ${getGradeColor(result.data.grade)}`}
                            >
                              {result.data.grade}
                            </span>
                          )}
                          {result.data.calories && (
                            <span className="text-xs text-gray-500 dark:text-slate-400">
                              {result.data.calories} cal
                            </span>
                          )}
                          {result.data.protein && (
                            <span className="text-xs text-gray-500 dark:text-slate-400">
                              {result.data.protein} protein
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        {Math.round(result.relevance * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length > 1 && !isLoading && results.length === 0 && !selectedResult && (
            <div className="p-8 sm:p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                Try searching for products, brands, or health topics
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularSuggestions.slice(0, 4).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!query && recentSearches.length === 0 && !selectedResult && (
            <div className="p-8 sm:p-12 text-center">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Search Healthify</h3>
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                Find products, brands, nutrition info, and health tips
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-300 font-medium hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
