"use client"

import { X, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanModalProps {
  onClose: () => void
}

export function ScanModal({ onClose }: ScanModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-gray-200 bg-white/50">
          <h2 className="text-2xl font-bold text-gray-900">AI Product Scanner</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 text-gray-600 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Camera className="h-16 w-16 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Scan or Upload Product</h3>
            <p className="text-gray-600">Get instant AI-powered health analysis and nutrition insights</p>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
              <Camera className="h-6 w-6 mr-3" />
              Open Camera Scanner
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white text-gray-700 border-gray-300 py-4 text-lg font-semibold hover:bg-gray-50"
            >
              <Upload className="h-6 w-6 mr-3" />
              Upload Product Image
            </Button>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200">
            <h4 className="font-semibold text-gray-900 mb-2">✨ AI Analysis Includes:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Comprehensive health score (A+ to D)</li>
              <li>• Detailed nutrition breakdown</li>
              <li>• Ingredient analysis and warnings</li>
              <li>• Personalized recommendations</li>
              <li>• Alternative product suggestions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
