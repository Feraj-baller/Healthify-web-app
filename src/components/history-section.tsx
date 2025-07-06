import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HistorySection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Scan History
        </h1>
        <p className="text-gray-600 text-lg">Review your product scanning history and health insights</p>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No scan history yet</h3>
            <p className="text-gray-500">Start scanning products to see your history here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
