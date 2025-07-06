"use client"

import { useEffect, useRef } from "react"

export default function HealthChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        // Simple chart implementation
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw chart background
        ctx.fillStyle = "#f8fafc"
        ctx.fillRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw sample line chart
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 3
        ctx.beginPath()

        const points = [
          { x: 50, y: 200 },
          { x: 150, y: 150 },
          { x: 250, y: 100 },
          { x: 350, y: 120 },
          { x: 450, y: 80 },
          { x: 550, y: 60 },
          { x: 650, y: 40 },
        ]

        points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })

        ctx.stroke()

        // Draw points
        ctx.fillStyle = "#10b981"
        points.forEach((point) => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
          ctx.fill()
        })

        // Add title
        ctx.fillStyle = "#374151"
        ctx.font = "16px Inter"
        ctx.fillText("Weekly Health Score Trend", 50, 30)
      }
    }
  }, [])

  return (
    <div className="glass-card">
      <div className="p-6 border-b border-gray-200 bg-white/50">
        <h2 className="text-xl font-semibold text-gray-900">Health Analytics</h2>
      </div>
      <div className="p-6">
        <canvas ref={chartRef} width={700} height={250} className="w-full h-auto" />
      </div>
    </div>
  )
}
