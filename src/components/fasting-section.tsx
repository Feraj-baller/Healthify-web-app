"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FastingSection() {
  const [timeElapsed, setTimeElapsed] = useState("14:32:15")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const startTime = new Date()
      startTime.setHours(18, 0, 0, 0) // 6:00 PM start
      if (now < startTime) {
        startTime.setDate(startTime.getDate() - 1)
      }

      const elapsed = now.getTime() - startTime.getTime()
      const hours = Math.floor(elapsed / (1000 * 60 * 60))
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)

      setTimeElapsed(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Intermittent Fasting Hub
        </h1>
        <p className="text-gray-600 text-lg">Track your fasting journey with AI-powered insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Fast Card */}
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;%3E%3Ccircle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;2&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/%3E%3Ccircle cx=&quot;80&quot; cy=&quot;40&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/%3E%3Ccircle cx=&quot;40&quot; cy=&quot;80&quot; r=&quot;1.5&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/%3E%3C/svg%3E')] pointer-events-none"></div>
          <CardContent className="p-8 relative z-10">
            <h3 className="text-2xl font-bold mb-4">🔥 16:8 Fast Active</h3>
            <div className="text-5xl font-bold text-center my-6 drop-shadow-lg">{timeElapsed}</div>
            <p className="text-center opacity-90 mb-6">Time remaining: 1h 28m</p>

            {/* Progress Bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-white rounded-full shadow-lg transition-all duration-1000"
                style={{ width: "78%" }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span>Started: 6:00 PM</span>
              <span>Goal: 10:00 AM</span>
            </div>
          </CardContent>
        </Card>

        {/* Fasting Programs */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>Fasting Programs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50">
              <h4 className="font-semibold text-emerald-700">16:8 Method</h4>
              <p className="text-sm text-gray-600 my-2">Most popular • Currently active</p>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Continue</Button>
            </div>

            <div className="p-4 border border-gray-300 rounded-xl">
              <h4 className="font-semibold">14:10 Method</h4>
              <p className="text-sm text-gray-600 my-2">Beginner friendly</p>
              <Button variant="outline" className="w-full bg-white text-gray-700">
                Try This
              </Button>
            </div>

            <div className="p-4 border border-gray-300 rounded-xl">
              <h4 className="font-semibold">20:4 Method</h4>
              <p className="text-sm text-gray-600 my-2">Advanced level</p>
              <Button variant="outline" className="w-full bg-white text-gray-700">
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
