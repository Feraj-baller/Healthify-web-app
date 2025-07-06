"use client"

import { useState } from "react"
import { Clock, Users, ChefHat, Plus, X, RefreshCw } from "lucide-react"
import { openRouterService } from "@/lib/openrouter"

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
  const [mealPlan, setMealPlan] = useState<MealCard[]>([])
  const [savedRecipes, setSavedRecipes] = useState<MealCard[]>([])

  const pantryItems = ["Greek Yogurt", "Quinoa", "Mixed Nuts", "Almond Milk", "Organic Eggs"]

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
        return "bg-red-500 text-white"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 bg-emerald-50"
      case "Medium":
        return "text-blue-600 bg-blue-50"
      case "Hard":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleRefreshSuggestions = async () => {
    setIsRefreshing(true)
    setSelectedMeal(null)

    try {
      const newSuggestions = await openRouterService.generateMealSuggestions(pantryItems)
      setCurrentSuggestions(newSuggestions)
    } catch (error) {
      console.error("Failed to refresh suggestions:", error)
      // Fallback to default suggestions if API fails
      setCurrentSuggestions([])
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleAddToMealPlan = (meal: MealCard) => {
    if (!mealPlan.find((m) => m.id === meal.id)) {
      setMealPlan([...mealPlan, meal])
      alert(`${meal.name} added to your meal plan!`)
    } else {
      alert(`${meal.name} is already in your meal plan!`)
    }
  }

  const handleSaveRecipe = (meal: MealCard) => {
    if (!savedRecipes.find((m) => m.id === meal.id)) {
      setSavedRecipes([...savedRecipes, meal])
      alert(`${meal.name} saved to your recipe collection!`)
    } else {
      alert(`${meal.name} is already saved!`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-2">
          Smart Pantry Manager
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">AI-powered inventory tracking and meal planning</p>
      </div>

      {/* AI Meal Suggestions Section */}
      <div className="glass-card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">🤖 AI Meal Suggestions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Personalized recipes based on your current pantry items
            </p>
          </div>
          <button
            onClick={handleRefreshSuggestions}
            disabled={isRefreshing}
            className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Generating..." : "Refresh Suggestions"}
          </button>
        </div>

        <div className="p-6">
          {/* Loading State */}
          {isRefreshing && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-lg font-semibold">AI is generating new meal suggestions...</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Creating unique recipes based on your pantry items
              </p>
            </div>
          )}

          {/* Meal Cards Grid */}
          {!isRefreshing && currentSuggestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentSuggestions.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal)}
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                >
                  {/* Meal Image/Emoji */}
                  <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                    {meal.emoji}
                  </div>

                  {/* Meal Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {meal.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300 group-hover:scale-110 ${getHealthScoreColor(meal.healthScore)}`}
                      >
                        {meal.healthScore}
                      </span>
                    </div>

                    {/* Used Items */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Uses from pantry:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {meal.usedItems.join(", ")}
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meal.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {meal.servings} serving{meal.servings > 1 ? "s" : ""}
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-700 dark:text-gray-300">{meal.calories}</div>
                        <div>Cal</div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-semibold py-2 px-4 rounded-xl transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isRefreshing && currentSuggestions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No meal suggestions yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Click "Refresh Suggestions" to get AI-powered meal ideas based on your pantry items
              </p>
              <button onClick={handleRefreshSuggestions} className="btn-primary flex items-center gap-2 mx-auto">
                <ChefHat className="w-5 h-5" />
                Get AI Meal Suggestions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Detailed Meal Panel */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-6 border-b border-emerald-200 dark:border-emerald-700 flex justify-between items-start sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedMeal.emoji}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{selectedMeal.name}</h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getHealthScoreColor(selectedMeal.healthScore)}`}
                    >
                      Health Score: {selectedMeal.healthScore}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedMeal.difficulty)}`}
                    >
                      {selectedMeal.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMeal(null)}
                className="p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <ChefHat className="w-5 h-5" />
                      Ingredients from Pantry
                    </h4>
                    <div className="space-y-2">
                      {selectedMeal.usedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prep Instructions */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Preparation Steps</h4>
                    <div className="space-y-3">
                      {selectedMeal.instructions.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedMeal.prepTime}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Prep Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Users className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedMeal.servings}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Servings</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedMeal.calories}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Calories</div>
                    </div>
                  </div>

                  {/* Nutritional Breakdown */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Nutritional Information
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedMeal.nutritionalBreakdown).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAddToMealPlan(selectedMeal)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add to Meal Plan
                    </button>
                    <button onClick={() => handleSaveRecipe(selectedMeal)} className="w-full btn-secondary">
                      Save Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
