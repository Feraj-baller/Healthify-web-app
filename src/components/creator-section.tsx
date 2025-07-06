import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, MessageCircle, BarChart3 } from "lucide-react"

export function CreatorSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Creator Hub
        </h1>
        <p className="text-gray-600 text-lg">Monetize your health journey and inspire others</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Creator Dashboard */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">⭐ Creator Dashboard</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">12.5K</div>
                <div className="text-sm opacity-80">Monthly Reach</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">$547</div>
                <div className="text-sm opacity-80">Earnings</div>
              </div>
            </div>
            <div className="text-center">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">🚀 Elite Tier • 4.8% Commission Rate</span>
            </div>
          </CardContent>
        </Card>

        {/* Content Tools */}
        <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle>Content Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 justify-start">
              <Monitor className="h-5 w-5 mr-2" />
              Create Health Post
            </Button>
            <Button variant="outline" className="w-full bg-white text-gray-700 justify-start">
              <MessageCircle className="h-5 w-5 mr-2" />
              Share Story
            </Button>
            <Button variant="outline" className="w-full bg-white text-gray-700 justify-start">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </Button>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-sm font-semibold mb-2">💡 Growth Tip</h4>
              <p className="text-xs text-gray-600">Share your fasting journey to increase engagement by 40%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
