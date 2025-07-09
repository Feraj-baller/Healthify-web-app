"use client"

import { useState } from "react"

interface MealCard {
  id: number
  name: string
  emoji: string
  usedItems: string[]
  healthScore: string
  calories: number
  protein: string
  sugar: string
  fiber: string
  prepTime: string
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  instructions: string[]
  nutritionalBreakdown: {
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
    sugar: string
    sodium: string
  }
}

export default function InventorySection() {
  const [selectedMeal, setSelectedMeal] = useState<MealCard | null>(null)
  const [currentSuggestions, setCurrentSuggestions] = useState<MealCard[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const pantryItems = [
    "Greek Yogurt", "Quinoa", "Mixed Nuts", "Almond Milk",
    "Organic Eggs", "Spinach", "Blueberries", "Oats"
  ]

  const getHealthScoreColor = (score: string) => {
    switch (score) {
      case "A+":
      case "A":
        return "bg-emerald-500 text-white"
      case "B+":
      case "B":
        return "bg-blue-500 text-white"
      case "C":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-300 text-gray-800"
    }
  }

  const dummyMeals: MealCard[] = [
    {
      id: 1,
      name: "Protein Power Bowl",
      emoji: "🥗",
      usedItems: ["Quinoa", "Greek Yogurt", "Spinach"],
      healthScore: "A+",
      calories: 420,
      protein: "28g",
      sugar: "6g",
      fiber: "8g",
      prepTime: "15 min",
      servings: 2,
      difficulty: "Easy",
      instructions: [
        "Cook quinoa and let cool.",
        "Mix with Greek yogurt and chopped spinach.",
        "Serve chilled with olive oil."
      ],
      nutritionalBreakdown: {
        calories: 420,
        protein: "28g",
        carbs: "38g",
        fat: "15g",
        fiber: "8g",
        sugar: "6g",
        sodium: "200mg"
      }
    },
    // Add more meal objects as needed
  ]

  const refreshSuggestions = () => {
    setIsRefreshing(true)
    // Simulate loading delay
    setTimeout(() => {
      setCurrentSuggestions(dummyMeals)
      setIsRefreshing(false)
      setSelectedMeal(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Smart Pantry</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-generated meal suggestions based on your pantry</p>
        </div>
        <button
          onClick={refreshSuggestions}
          className="btn-primary px-5 py-2.5"
        >
          {isRefreshing ? "Refreshing..." : "Generate Suggestions"}
        </button>
      </div>

      {/* Pantry Items */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Pantry Items</h2>
        <div className="flex flex-wrap gap-2">
          {pantryItems.map((item, i) => (
            <span key={i} className="bg-slate-200 dark:bg-slate-700 text-sm px-3 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Meal Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentSuggestions.map((meal) => (
          <div
            key={meal.id}
            className="glass-card p-4 border cursor-pointer hover:shadow-md"
            onClick={() => setSelectedMeal(meal)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{meal.emoji} {meal.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${getHealthScoreColor(meal.healthScore)}`}>
                {meal.healthScore}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Uses: {meal.usedItems.join(", ")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {meal.calories} kcal • {meal.protein} protein
            </p>
          </div>
        ))}
      </div>

      {/* Selected Meal Details */}
      {selectedMeal && (
        <div className="glass-card p-6 space-y-4 mt-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {selectedMeal.emoji} {selectedMeal.name}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Prep Time: <strong>{selectedMeal.prepTime}</strong> • Servings: <strong>{selectedMeal.servings}</strong> • Difficulty: <strong>{selectedMeal.difficulty}</strong>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Instructions</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedMeal.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Nutritional Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700 dark:text-gray-300">
              {Object.entries(selectedMeal.nutritionalBreakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="btn-secondary" onClick={() => setSelectedMeal(null)}>Back</button>
            <button className="btn-primary">Add to Meal Plan</button>
            <button className="btn-outline">Save Recipe</button>
          </div>
        </div>
      )}
    </div>
  )
}
