import { openRouterService } from "./openrouter"

// Centralized AI service that uses OpenRouter for all AI operations
export class AIService {
  // Dashboard AI Insights
  static async generateDashboardInsights(healthData: any) {
    return await openRouterService.generateDashboardInsights(healthData)
  }

  // Product Analysis
  static async analyzeProduct(productName: string, ingredients?: string, barcode?: string) {
    return await openRouterService.analyzeProduct(productName, ingredients, barcode)
  }

  // Meal Planning
  static async generateMealSuggestions(pantryItems: string[]) {
    return await openRouterService.generateMealSuggestions(pantryItems)
  }

  // Search Functionality
  static async searchProducts(query: string) {
    return await openRouterService.searchProducts(query)
  }

  // Health Insights
  static async generateHealthInsights(healthData: any) {
    return await openRouterService.generateHealthInsights(healthData)
  }

  // Voice Transcription
  static async transcribeAudio(audioBlob: Blob) {
    return await openRouterService.transcribeAudio(audioBlob)
  }

  // Nutrition Planning
  static async generateNutritionPlan(userProfile: any) {
    return await openRouterService.generateNutritionPlan(userProfile)
  }

  // Fasting Recommendations
  static async getFastingRecommendations(userProfile: any, currentFast: any) {
    const prompt = {
      userProfile,
      currentFast,
      requestType: "fasting_recommendations",
    }

    return await openRouterService.generateHealthInsights(prompt)
  }

  // Inventory Management
  static async analyzeInventory(items: any[]) {
    const prompt = {
      items,
      requestType: "inventory_analysis",
    }

    return await openRouterService.generateHealthInsights(prompt)
  }

  // Content Creation (for Creator Hub)
  static async generateContentIdeas(userProfile: any, healthData: any) {
    const prompt = {
      userProfile,
      healthData,
      requestType: "content_ideas",
    }

    return await openRouterService.generateHealthInsights(prompt)
  }
}

export default AIService
