"use client"

import { useState } from "react"
import { X, Camera, Upload } from "lucide-react"

interface ScanModalProps {
  onClose: () => void
}

export default function ScanModal({ onClose }: ScanModalProps) {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200 bg-white/50">
          <h2 className="text-2xl font-bold">AI Product Scanner</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {!isScanning ? (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-6xl shadow-lg">
                📱
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                <p className="text-gray-600">
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
          ) : (
            <div className="text-center space-y-6">
              <div className="relative w-64 h-48 mx-auto bg-gray-100 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-pulse">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
                </div>
                <div className="flex items-center justify-center h-full text-4xl">📦</div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Analyzing Product...</h3>
                <p className="text-gray-600">AI is processing nutritional data and generating health score</p>
              </div>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
