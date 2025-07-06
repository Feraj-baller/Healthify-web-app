"use client"

import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"

export default function FastingSection() {
  const [currentTime, setCurrentTime] = useState("14:32:15")
  const [isActive, setIsActive] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState("1h 28m")
  const [progress, setProgress] = useState(78)
  const [activeProgram, setActiveProgram] = useState("16:8")
  const [startTime] = useState("6:00 PM")
  const [goalTime, setGoalTime] = useState("10:00 AM")

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        const seconds = String(now.getSeconds()).padStart(2, "0")
        setCurrentTime(`${hours}:${minutes}:${seconds}`)

        // Update progress (simulate progress increase)
        setProgress((prev) => {
          const newProgress = prev + 0.01
          if (newProgress >= 100) {
            setIsActive(false)
            setTimeRemaining("Fast Complete!")
            return 100
          }

          // Calculate remaining time based on progress
          const remainingMinutes = Math.floor((100 - newProgress) * 1.2)
          const hours = Math.floor(remainingMinutes / 60)
          const mins = remainingMinutes % 60
          setTimeRemaining(`${hours}h ${mins}m`)

          return newProgress
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const handlePauseResume = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setProgress(0)
    setTimeRemaining("16h 0m")
    setCurrentTime("00:00:00")
  }

  const handleProgramChange = (program: string) => {
    setActiveProgram(program)
    setIsActive(false)

    // Set different parameters based on program
    switch (program) {
      case "14:10":
        setProgress(0)
        setTimeRemaining("14h 0m")
        setGoalTime("8:00 AM")
        break
      case "20:4":
        setProgress(0)
        setTimeRemaining("20h 0m")
        setGoalTime("2:00 PM")
        break
      default: // 16:8
        setProgress(0)
        setTimeRemaining("16h 0m")
        setGoalTime("10:00 AM")
    }

    setCurrentTime("00:00:00")
  }

  const fastingPrograms = [
    {
      title: "16:8 Method",
      description: "Most popular • 16h fast, 8h eating",
      isActive: activeProgram === "16:8",
      buttonText: activeProgram === "16:8" ? "Continue" : "Switch to 16:8",
      buttonStyle: activeProgram === "16:8" ? "btn-primary" : "btn-secondary",
      programId: "16:8",
    },
    {
      title: "14:10 Method",
      description: "Beginner friendly • 14h fast, 10h eating",
      isActive: activeProgram === "14:10",
      buttonText: activeProgram === "14:10" ? "Continue" : "Try This",
      buttonStyle: activeProgram === "14:10" ? "btn-primary" : "btn-secondary",
      programId: "14:10",
    },
    {
      title: "20:4 Method",
      description: "Advanced level • 20h fast, 4h eating",
      isActive: activeProgram === "20:4",
      buttonText: activeProgram === "20:4" ? "Continue" : "Advanced",
      buttonStyle: activeProgram === "20:4" ? "btn-primary" : "btn-secondary",
      programId: "20:4",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Intermittent Fasting Hub
        </h1>
        <p className="text-xl text-gray-600">Track your fasting journey with AI-powered insights</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Featured Fasting Card */}
        <div className="xl:col-span-2">
          <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-12 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-12 left-16 w-3 h-3 bg-white rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🔥 {activeProgram} Fast {isActive ? "Active" : progress === 100 ? "Complete" : "Paused"}
              </h3>

              {/* Large Timer */}
              <div className="text-center mb-6">
                <div className="text-6xl lg:text-7xl font-bold mb-2 font-mono tracking-tight drop-shadow-lg">
                  {currentTime}
                </div>
                <p className="text-lg opacity-90">
                  {progress === 100 ? (
                    <span className="font-semibold text-green-200">🎉 Fast Complete!</span>
                  ) : (
                    <>
                      Time remaining: <span className="font-semibold">{timeRemaining}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="bg-white rounded-full h-full shadow-lg transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-2 opacity-90">
                  <span>{Math.round(progress)}% Complete</span>
                  <span>{Math.round(100 - progress)}% Remaining</span>
                </div>
              </div>

              {/* Start and Goal Times */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-sm opacity-75">Started</div>
                  <div className="font-semibold">{startTime}</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-px bg-white/30"></div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-75">Goal</div>
                  <div className="font-semibold">{goalTime}</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePauseResume}
                  disabled={progress === 100}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isActive ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fasting Programs */}
        <div className="xl:col-span-1">
          <div className="glass-card h-fit">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h2 className="text-xl font-semibold text-gray-900">Fasting Programs</h2>
            </div>
            <div className="p-6 space-y-4">
              {fastingPrograms.map((program, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                    program.isActive
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : "border-gray-200 hover:border-emerald-300 bg-white"
                  }`}
                >
                  <h4 className={`font-semibold mb-2 ${program.isActive ? "text-emerald-600" : "text-gray-900"}`}>
                    {program.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                  <button
                    onClick={() => handleProgramChange(program.programId)}
                    className={`w-full ${program.buttonStyle} text-sm py-2.5`}
                  >
                    {program.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
