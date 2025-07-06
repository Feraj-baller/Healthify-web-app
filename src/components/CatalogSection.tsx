import ProductCard from "./ProductCard"

const products = [
  {
    id: 1,
    name: "Organic Almond Milk",
    brand: "Blue Diamond • Unsweetened",
    grade: "A+",
    calories: 60,
    sugar: "0g",
    protein: "2g",
    image: "🥛",
  },
  {
    id: 2,
    name: "Greek Yogurt",
    brand: "Chobani • Plain",
    grade: "A",
    calories: 130,
    sugar: "6g",
    protein: "20g",
    image: "🥗",
  },
  {
    id: 3,
    name: "Whole Grain Bread",
    brand: "Dave's Killer Bread",
    grade: "B+",
    calories: 110,
    sugar: "3g",
    protein: "5g",
    image: "🍞",
  },
  {
    id: 4,
    name: "Mixed Nuts",
    brand: "Wonderful • Unsalted",
    grade: "A",
    calories: 170,
    sugar: "1g",
    protein: "6g",
    image: "🥜",
  },
]

export default function CatalogSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Product Catalog
        </h1>
        <p className="text-xl text-gray-600">Explore AI-analyzed products with health scores</p>
      </div>

      {/* Filter Section */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 bg-white/50">
          <h2 className="text-xl font-semibold text-gray-900">Filter Products</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary">All Products</button>
            <button className="btn-secondary">Grade A+</button>
            <button className="btn-secondary">Organic</button>
            <button className="btn-secondary">Low Sugar</button>
            <button className="btn-secondary">High Protein</button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
