"use client"

import { useState } from "react"
import { X, Camera, Upload } from "lucide-react"
import { AIService } from "@/lib/ai-service"

interface ScanModalProps {
  onClose: () => void
}

interface ScanResult {
  grade: string
  score: number
  calories: number
  nutrients: {
    protein: string
    sugar: string
    fiber: string
    fat: string
  }
  highlights: string[]
  concerns: string[]
  recommendations: string
}

export default function ScanModal({ onClose }: ScanModalProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async () => {
    setIsScanning(true)
    setError(null)

    // Simulate scanning process
    setTimeout(async () => {
      setIsScanning(false)
      setIsAnalyzing(true)

      try {
        // Simulate product detection
        const detectedProduct = "Greek Yogurt"
        const detectedIngredients = "Milk, Live Cultures, Natural Flavors"

        // Use AI service for analysis
        const analysis = await AIService.analyzeProduct(detectedProduct, detectedIngredients)

        setScanResult(analysis)
      } catch (error) {
        console.error("Analysis failed:", error)
        setError("Failed to analyze product. Please try again.")
      } finally {
        setIsAnalyzing(false)
      }
    }, 3000)
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Product Scanner</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {!isScanning && !isAnalyzing && !scanResult && !error && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-6xl shadow-lg">
                📱
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Ready to Scan</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Point your camera at a product barcode or upload an image for AI analysis
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={handleScan} className="btn-primary flex items-center gap-2 px-8 py-3">
                  <Camera className="w-5 h-5" />
                  Start Camera
                </button>

                <button className="btn-secondary flex items-center gap-2 px-8 py-3">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-6">
              <div className="relative w-64 h-48 mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-pulse">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
                </div>
                <div className="flex items-center justify-center h-full text-4xl">📦</div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Scanning Product...</h3>
                <p className="text-gray-600 dark:text-gray-400">Detecting barcode and product information</p>
              </div>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-6xl shadow-lg animate-pulse">
                🤖
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  AI Analysis in Progress...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI is analyzing nutritional data and generating health insights
                </p>
              </div>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            </div>
          )}

          {scanResult && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-4xl shadow-lg mb-4">
                  ✅
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Analysis Complete!</h3>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Health Grade</h4>
                  <div className={`px-4 py-2 rounded-xl text-2xl font-bold ${getGradeColor(scanResult.grade)}`}>
                    {scanResult.grade}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{scanResult.calories}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{scanResult.score}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Health Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{scanResult.nutrients.protein}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{scanResult.nutrients.sugar}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sugar</div>
                  </div>
                </div>

                {scanResult.highlights.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✅ Highlights</h5>
                    <ul className="space-y-1">
                      {scanResult.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {scanResult.concerns.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">⚠️ Concerns</h5>
                    <ul className="space-y-1">
                      {scanResult.concerns.map((concern, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                          • {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                  <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">💡 AI Recommendation</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{scanResult.recommendations}</p>
                </div>
              </div>

              <button onClick={onClose} className="btn-primary w-full">
                Save to History
              </button>
            </div>
          )}

          {error && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-6xl shadow-lg">
                ❌
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Analysis Failed</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
              </div>

              <button
                onClick={() => {
                  setError(null)
                  setScanResult(null)
                }}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
