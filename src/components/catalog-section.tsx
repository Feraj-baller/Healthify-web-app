import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CatalogSection() {
  const products = [
    {
      name: "Organic Almond Milk",
      brand: "Blue Diamond • Unsweetened",
      grade: "A+",
      calories: 60,
      sugar: "0g",
      protein: "2g",
      emoji: "🥛",
    },
    {
      name: "Greek Yogurt",
      brand: "Chobani • Plain",
      grade: "A",
      calories: 130,
      sugar: "6g",
      protein: "20g",
      emoji: "🥗",
    },
    {
      name: "Whole Grain Bread",
      brand: "Dave's Killer Bread",
      grade: "B+",
      calories: 110,
      sugar: "3g",
      protein: "5g",
      emoji: "🍞",
    },
    {
      name: "Mixed Nuts",
      brand: "Wonderful • Unsalted",
      grade: "A",
      calories: 170,
      sugar: "1g",
      protein: "6g",
      emoji: "🥜",
    },
  ]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-emerald-100 text-emerald-600 border-emerald-200"
      case "B+":
      case "B":
        return "bg-blue-100 text-blue-600 border-blue-200"
      case "C":
        return "bg-yellow-100 text-yellow-600 border-yellow-200"
      default:
        return "bg-red-100 text-red-600 border-red-200"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Product Catalog
        </h1>
        <p className="text-gray-600 text-lg">Explore AI-analyzed products with health scores</p>
      </div>

      {/* Filter Section */}
      <Card className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Filter Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button className="bg-emerald-500 hover:bg-emerald-600">All Products</Button>
            <Button variant="outline" className="bg-white text-gray-700">
              Grade A+
            </Button>
            <Button variant="outline" className="bg-white text-gray-700">
              Organic
            </Button>
            <Button variant="outline" className="bg-white text-gray-700">
              Low Sugar
            </Button>
            <Button variant="outline" className="bg-white text-gray-700">
              High Protein
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className="bg-white/95 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
          >
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {product.emoji}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-lg ${getGradeColor(product.grade)}`}
                  >
                    {product.grade}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold text-gray-700">{product.calories}</div>
                      <div>Cal</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-700">{product.sugar}</div>
                      <div>Sugar</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-700">{product.protein}</div>
                      <div>Protein</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
