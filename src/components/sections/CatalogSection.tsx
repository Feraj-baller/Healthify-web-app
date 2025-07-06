"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"

const allProducts = [
  {
    id: 1,
    name: "Organic Almond Milk",
    brand: "Blue Diamond • Unsweetened",
    grade: "A+",
    calories: 60,
    sugar: "0g",
    protein: "2g",
    image: "🥛",
    category: "organic",
    isLowSugar: true,
    isHighProtein: false,
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
    category: "dairy",
    isLowSugar: false,
    isHighProtein: true,
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
    category: "grains",
    isLowSugar: true,
    isHighProtein: false,
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
    category: "snacks",
    isLowSugar: true,
    isHighProtein: false,
  },
  {
    id: 5,
    name: "Organic Spinach",
    brand: "Earthbound Farm",
    grade: "A+",
    calories: 23,
    sugar: "0g",
    protein: "3g",
    image: "🥬",
    category: "organic",
    isLowSugar: true,
    isHighProtein: false,
  },
  {
    id: 6,
    name: "Wild Salmon",
    brand: "Alaska Seafood",
    grade: "A+",
    calories: 206,
    sugar: "0g",
    protein: "28g",
    image: "🐟",
    category: "protein",
    isLowSugar: true,
    isHighProtein: true,
  },
  {
    id: 7,
    name: "Quinoa",
    brand: "Ancient Harvest",
    grade: "A+",
    calories: 222,
    sugar: "0g",
    protein: "8g",
    image: "🌾",
    category: "organic",
    isLowSugar: true,
    isHighProtein: false,
  },
  {
    id: 8,
    name: "Protein Bar",
    brand: "Quest Nutrition",
    grade: "B+",
    calories: 190,
    sugar: "1g",
    protein: "21g",
    image: "🍫",
    category: "snacks",
    isLowSugar: true,
    isHighProtein: true,
  },
]

export default function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  const filters = [
    { id: "all", label: "All Products", count: allProducts.length },
    {
      id: "gradeA",
      label: "Grade A+",
      count: allProducts.filter((p) => p.grade === "A+").length,
    },
    {
      id: "organic",
      label: "Organic",
      count: allProducts.filter((p) => p.category === "organic").length,
    },
    {
      id: "lowSugar",
      label: "Low Sugar",
      count: allProducts.filter((p) => p.isLowSugar).length,
    },
    {
      id: "highProtein",
      label: "High Protein",
      count: allProducts.filter((p) => p.isHighProtein).length,
    },
  ]

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)

    let filtered = allProducts

    switch (filterId) {
      case "gradeA":
        filtered = allProducts.filter((product) => product.grade === "A+")
        break
      case "organic":
        filtered = allProducts.filter((product) => product.category === "organic")
        break
      case "lowSugar":
        filtered = allProducts.filter((product) => product.isLowSugar)
        break
      case "highProtein":
        filtered = allProducts.filter((product) => product.isHighProtein)
        break
      default:
        filtered = allProducts
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
          Product Catalog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Explore AI-analyzed products with health scores</p>
      </div>

      {/* Filter Section */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Filter Products</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                  activeFilter === filter.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-500 hover:scale-105"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Try selecting a different filter to see more products</p>
          <button onClick={() => handleFilterChange("all")} className="btn-primary">
            Show All Products
          </button>
        </div>
      )}
    </div>
  )
}
