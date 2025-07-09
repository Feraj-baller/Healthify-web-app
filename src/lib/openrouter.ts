interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

interface SearchResult {
  type: "product" | "brand" | "category" | "health_tip"
  title: string
  description: string
  relevance: number
  data?: any
}

interface MealSuggestion {
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

interface ProductAnalysis {
  grade: string
  score: number
  calories: number
  nutrients: {
    protein: string
    sugar: string
    fiber: string
    fat: string
  }
  highlights: string[]
  concerns: string[]
  recommendations: string
  ingredients?: string[]
  allergens?: string[]
  benefits?: string[]
}

interface DashboardInsight {
  id: string
  type: "health_tip" | "achievement" | "recommendation" | "warning"
  title: string
  description: string
  icon: string
  priority: "high" | "medium" | "low"
  actionable: boolean
}

class OpenRouterService {
  private apiKey: string
  private baseUrl: string
  private defaultModel: string
  private fastModel: string
  private smartModel: string

  constructor() {
    // Get API key from environment variables
    this.apiKey = process.env.OPENROUTER_API_KEY || ""
    this.baseUrl = "https://openrouter.ai/api/v1"

    // Specify different models for different use cases
    this.defaultModel = "meta-llama/llama-3.1-8b-instruct:free" // General purpose
    this.fastModel = "meta-llama/llama-3.1-8b-instruct:free" // Quick responses
    this.smartModel = "anthropic/claude-3.5-sonnet" // Complex analysis (premium)

    if (!this.apiKey) {
      console.warn("OpenRouter API key not found in environment variables. Using fallback mode.")
    }
  }

  private async makeRequest(
    prompt: string,
    maxTokens = 2000,
    temperature = 0.7,
    model?: string,
  ): Promise<string | null> {
    if (!this.apiKey) {
      console.warn("No API key available, using fallback response")
      return null
    }

    try {
      const selectedModel = model || this.defaultModel

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://healthify.app",
          "X-Title": "Healthify AI Assistant",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "system",
              content:
                "You are a professional health and nutrition AI assistant for Healthify app. Provide accurate, helpful, and safe health information. Always format responses as requested JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature,
          max_tokens: maxTokens,
        }),
      })

      if (!response.ok) {
        console.warn(`OpenRouter API error: ${response.status} ${response.statusText}`)
        return null
      }

      const data: OpenRouterResponse = await response.json()
      return data.choices[0]?.message?.content || null
    } catch (error) {
      console.error("OpenRouter API request failed:", error)
      return null
    }
  }

  async generateDashboardInsights(healthData: any): Promise<DashboardInsight[]> {
    const prompt = `
    Based on this user's health data, generate 4-6 personalized dashboard insights:
    ${JSON.stringify(healthData)}
    
    Return as JSON array with this structure:
    [
      {
        "id": "unique_id",
        "type": "health_tip|achievement|recommendation|warning",
        "title": "Insight Title",
        "description": "Detailed description with actionable advice",
        "icon": "🏆|💡|⚠️|🎯",
        "priority": "high|medium|low",
        "actionable": true|false
      }
    ]
    
    Focus on:
    - Recent achievements and progress
    - Health recommendations based on data trends
    - Actionable tips for improvement
    - Warnings about concerning patterns
    `

    try {
      const response = await this.makeRequest(prompt, 1500, 0.6, this.smartModel)

      if (response) {
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const insights = JSON.parse(jsonMatch[0])
          return insights.slice(0, 6)
        }
      }
    } catch (error) {
      console.error("Failed to parse dashboard insights:", error)
    }

    return this.getFallbackDashboardInsights()
  }

  async analyzeProduct(productName: string, ingredients?: string, barcode?: string): Promise<ProductAnalysis> {
    const prompt = `
    Analyze this food product for health and nutrition:
    Product: ${productName}
    ${ingredients ? `Ingredients: ${ingredients}` : ""}
    ${barcode ? `Barcode: ${barcode}` : ""}
    
    Provide a comprehensive health analysis in JSON format:
    {
      "grade": "A+|A|B+|B|C|D",
      "score": 0-100,
      "calories": number,
      "nutrients": {
        "protein": "Xg",
        "sugar": "Xg", 
        "fiber": "Xg",
        "fat": "Xg"
      },
      "highlights": ["positive aspect 1", "positive aspect 2"],
      "concerns": ["concern 1", "concern 2"],
      "recommendations": "brief recommendation",
      "ingredients": ["ingredient1", "ingredient2"],
      "allergens": ["allergen1"],
      "benefits": ["benefit1", "benefit2"]
    }
    
    Base the grade on overall nutritional value, processing level, and health impact.
    `

    try {
      const response = await this.makeRequest(prompt, 1500, 0.3, this.smartModel)

      if (response) {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0])
          return analysis
        }
      }
    } catch (error) {
      console.error("Failed to parse product analysis:", error)
    }

    return this.getFallbackProductAnalysis(productName)
  }

  async generateMealSuggestions(pantryItems: string[] = []): Promise<MealSuggestion[]> {
    const prompt = `
    Generate 6 unique, creative meal suggestions using these pantry items: ${pantryItems.join(", ")}
    
    Create diverse, healthy recipes that are different from typical suggestions. Be creative and unique.
    Each recipe should use at least 2-3 of the provided pantry items.
    
    Return as JSON array with this exact structure:
    [
      {
        "id": 1,
        "name": "Creative Recipe Name",
        "emoji": "🍽️",
        "usedItems": ["item1", "item2"],
        "healthScore": "A+",
        "calories": 350,
        "protein": "18g",
        "sugar": "4g",
        "fiber": "8g",
        "prepTime": "25 min",
        "servings": 2,
        "difficulty": "Medium",
        "instructions": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
        "nutritionalBreakdown": {
          "calories": 350,
          "protein": "18g",
          "carbs": "32g",
          "fat": "14g",
          "fiber": "8g",
          "sugar": "4g",
          "sodium": "180mg"
        }
      }
    ]
    
    Make each recipe unique, creative, and healthy. Use varied cooking methods and flavor profiles.
    Ensure nutritional values are realistic and accurate.
    `

    try {
      const response = await this.makeRequest(prompt, 3000, 0.8, this.defaultModel)

      if (response) {
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const results = JSON.parse(jsonMatch[0])
          return results.slice(0, 6)
        }
      }
    } catch (error) {
      console.error("Failed to parse meal suggestions:", error)
    }

    return this.getFallbackMealSuggestions()
  }

  async searchProducts(query: string): Promise<SearchResult[]> {
    const prompt = `
    You are a health and nutrition AI assistant for Healthify app. 
    User searched for: "${query}"
    
    Provide relevant search results in the following categories:
    1. Products (food items, supplements, etc.)
    2. Brands (food manufacturers, health companies)
    3. Categories (food types, dietary preferences)
    4. Health tips (nutrition advice, wellness tips)
    
    Return results as a JSON array with this structure:
    [
      {
        "type": "product|brand|category|health_tip",
        "title": "Result title",
        "description": "Brief description",
        "relevance": 0.0-1.0,
        "data": {
          "calories": number (if product),
          "grade": "A+|A|B+|B|C|D" (if product),
          "protein": "Xg" (if product),
          "sugar": "Xg" (if product),
          "fiber": "Xg" (if product),
          "fat": "Xg" (if product),
          "ingredients": ["ingredient1", "ingredient2"] (if product),
          "benefits": ["benefit1", "benefit2"] (if product),
          "allergens": ["allergen1"] (if product)
        }
      }
    ]
    
    Limit to 8 most relevant results. Focus on health, nutrition, and wellness.
    Prioritize products and actionable health information.
    `

    try {
      const response = await this.makeRequest(prompt, 2000, 0.3, this.fastModel)

      if (response) {
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const results = JSON.parse(jsonMatch[0])
          return results.slice(0, 8)
        }
      }
    } catch (error) {
      console.error("Failed to parse search results:", error)
    }

    return this.getFallbackResults(query)
  }

  async generateHealthInsights(healthData: any): Promise<string[]> {
    const prompt = `
    Based on this health data, generate 3-5 personalized health insights:
    ${JSON.stringify(healthData)}
    
    Return as JSON array of insight strings:
    ["insight 1", "insight 2", "insight 3"]
    
    Focus on actionable advice, trends, and recommendations.
    Make insights specific and personalized based on the data provided.
    `

    try {
      const response = await this.makeRequest(prompt, 1000, 0.5, this.defaultModel)

      if (response) {
        const jsonMatch = response.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
      }
    } catch (error) {
      console.error("Failed to parse health insights:", error)
    }

    return [
      "Your health score has improved by 8 points this week. Keep up the excellent work!",
      "Consider increasing your protein intake by 10g daily to support your goals.",
      "Your sleep quality affects your nutrition choices. Aim for 7-8 hours nightly.",
    ]
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    // Note: OpenRouter doesn't currently support audio transcription
    // This would typically use OpenAI Whisper or similar service
    // For now, we'll simulate the transcription

    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sampleQueries = [
            "Greek yogurt nutrition facts",
            "High protein snack options",
            "Organic vegetable benefits",
            "Keto friendly meal ideas",
            "Low sugar breakfast recipes",
            "Gluten free product recommendations",
            "Healthy meal prep ideas",
            "Vitamin rich superfoods",
          ]
          const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
          resolve(randomQuery)
        }, 2000)
      })
    } catch (error) {
      console.error("Audio transcription error:", error)
      return "healthy food options"
    }
  }

  async generateNutritionPlan(userProfile: any): Promise<any> {
    const prompt = `
    Create a personalized nutrition plan based on this user profile:
    ${JSON.stringify(userProfile)}
    
    Return as JSON with this structure:
    {
      "dailyCalories": number,
      "macros": {
        "protein": "Xg",
        "carbs": "Xg", 
        "fat": "Xg"
      },
      "meals": [
        {
          "name": "Breakfast",
          "suggestions": ["option1", "option2", "option3"]
        }
      ],
      "tips": ["tip1", "tip2", "tip3"]
    }
    `

    try {
      const response = await this.makeRequest(prompt, 2000, 0.4, this.smartModel)

      if (response) {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
      }
    } catch (error) {
      console.error("Failed to parse nutrition plan:", error)
    }

    return {
      dailyCalories: 2000,
      macros: { protein: "150g", carbs: "200g", fat: "65g" },
      meals: [
        { name: "Breakfast", suggestions: ["Greek yogurt with berries", "Oatmeal with nuts", "Protein smoothie"] },
      ],
      tips: ["Stay hydrated", "Eat colorful vegetables", "Control portion sizes"],
    }
  }

  // Fallback methods for when API is unavailable
  private getFallbackDashboardInsights(): DashboardInsight[] {
    return [
      {
        id: "achievement_1",
        type: "achievement",
        title: "Weekly Health Goal Achieved!",
        description: "You've successfully maintained your nutrition goals for 7 consecutive days. Great consistency!",
        icon: "🏆",
        priority: "high",
        actionable: false,
      },
      {
        id: "recommendation_1",
        type: "recommendation",
        title: "Increase Protein Intake",
        description: "Based on your activity level, consider adding 15g more protein daily. Try Greek yogurt or nuts.",
        icon: "💡",
        priority: "medium",
        actionable: true,
      },
      {
        id: "health_tip_1",
        type: "health_tip",
        title: "Hydration Reminder",
        description: "You're averaging 6 glasses of water daily. Aim for 8-10 glasses for optimal hydration.",
        icon: "💧",
        priority: "medium",
        actionable: true,
      },
      {
        id: "warning_1",
        type: "warning",
        title: "Sugar Intake Alert",
        description: "Your sugar consumption has increased by 20% this week. Consider reducing processed foods.",
        icon: "⚠️",
        priority: "high",
        actionable: true,
      },
    ]
  }

  private getFallbackProductAnalysis(productName: string): ProductAnalysis {
    const fallbackProducts: { [key: string]: ProductAnalysis } = {
      "greek yogurt": {
        grade: "A",
        score: 85,
        calories: 130,
        nutrients: { protein: "20g", sugar: "6g", fiber: "0g", fat: "0g" },
        highlights: ["High protein", "Probiotics", "Calcium rich"],
        concerns: ["Added sugars in flavored varieties"],
        recommendations: "Excellent protein source, choose plain varieties",
        ingredients: ["Milk", "Live cultures"],
        allergens: ["Dairy"],
        benefits: ["Supports digestive health", "Builds muscle", "Strengthens bones"],
      },
      "almond milk": {
        grade: "A+",
        score: 90,
        calories: 60,
        nutrients: { protein: "2g", sugar: "0g", fiber: "1g", fat: "3g" },
        highlights: ["Low calorie", "Dairy-free", "Vitamin E"],
        concerns: ["Lower protein than dairy milk"],
        recommendations: "Great dairy alternative, fortified versions preferred",
        ingredients: ["Almonds", "Water", "Sea salt"],
        allergens: ["Tree nuts"],
        benefits: ["Heart healthy", "Weight management", "Lactose-free"],
      },
    }

    const key = productName.toLowerCase()
    return (
      fallbackProducts[key] || {
        grade: "B",
        score: 70,
        calories: 150,
        nutrients: { protein: "8g", sugar: "5g", fiber: "3g", fat: "4g" },
        highlights: ["Natural ingredients"],
        concerns: ["Moderate processing"],
        recommendations: "Good for balanced nutrition",
        ingredients: ["Various natural ingredients"],
        allergens: [],
        benefits: ["Provides energy", "Contains nutrients"],
      }
    )
  }

  private getFallbackMealSuggestions(): MealSuggestion[] {
    return [
      {
        id: 1,
        name: "Mediterranean Quinoa Bowl",
        emoji: "🥗",
        usedItems: ["Quinoa", "Greek Yogurt", "Mixed Nuts"],
        healthScore: "A+",
        calories: 420,
        protein: "24g",
        sugar: "8g",
        fiber: "12g",
        prepTime: "20 min",
        servings: 1,
        difficulty: "Easy",
        instructions: [
          "Cook quinoa according to package directions",
          "Mix Greek yogurt with lemon juice and herbs",
          "Layer quinoa in bowl, top with yogurt mixture",
          "Sprinkle mixed nuts and add fresh vegetables",
          "Drizzle with olive oil and season to taste",
        ],
        nutritionalBreakdown: {
          calories: 420,
          protein: "24g",
          carbs: "45g",
          fat: "18g",
          fiber: "12g",
          sugar: "8g",
          sodium: "180mg",
        },
      },
      {
        id: 2,
        name: "Protein Power Pancakes",
        emoji: "🥞",
        usedItems: ["Organic Eggs", "Almond Milk", "Mixed Nuts"],
        healthScore: "A",
        calories: 320,
        protein: "22g",
        sugar: "4g",
        fiber: "6g",
        prepTime: "15 min",
        servings: 1,
        difficulty: "Medium",
        instructions: [
          "Whisk eggs with almond milk and cinnamon",
          "Crush mixed nuts into fine pieces",
          "Mix nuts into batter for texture",
          "Cook pancakes in non-stick pan over medium heat",
          "Serve with fresh berries and a drizzle of honey",
        ],
        nutritionalBreakdown: {
          calories: 320,
          protein: "22g",
          carbs: "18g",
          fat: "20g",
          fiber: "6g",
          sugar: "4g",
          sodium: "240mg",
        },
      },
      {
        id: 3,
        name: "Asian Fusion Stir-Fry",
        emoji: "🍜",
        usedItems: ["Greek Yogurt", "Quinoa"],
        healthScore: "A+",
        calories: 330,
        protein: "20g",
        sugar: "3g",
        fiber: "9g",
        prepTime: "25 min",
        servings: 1,
        difficulty: "Easy",
        instructions: [
          "Prepare quinoa as base",
          "Create yogurt-based sauce with spices",
          "Stir-fry vegetables with minimal oil",
          "Combine all components",
          "Serve fresh and enjoy",
        ],
        nutritionalBreakdown: {
          calories: 330,
          protein: "20g",
          carbs: "38g",
          fat: "14g",
          fiber: "9g",
          sugar: "3g",
          sodium: "170mg",
        },
      },
    ]
  }

  private getFallbackResults(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim()

    const allFallbackData = [
      {
        type: "product" as const,
        title: "Organic Almond Milk",
        description: "Blue Diamond • Unsweetened plant-based milk alternative",
        relevance: 0.9,
        keywords: ["almond", "milk", "plant", "dairy-free", "organic"],
        data: {
          calories: 60,
          grade: "A+",
          protein: "2g",
          sugar: "0g",
          fiber: "1g",
          fat: "3g",
          ingredients: ["Almonds", "Water", "Sea Salt"],
          benefits: ["Dairy-free", "Low calorie", "Vitamin E"],
          allergens: ["Tree nuts"],
        },
      },
      {
        type: "product" as const,
        title: "Greek Yogurt",
        description: "Chobani • High-protein probiotic dairy product",
        relevance: 0.8,
        keywords: ["greek", "yogurt", "protein", "probiotic", "dairy"],
        data: {
          calories: 130,
          grade: "A",
          protein: "20g",
          sugar: "6g",
          fiber: "0g",
          fat: "0g",
          ingredients: ["Milk", "Live Cultures"],
          benefits: ["High protein", "Probiotics", "Calcium"],
          allergens: ["Dairy"],
        },
      },
      {
        type: "health_tip" as const,
        title: "Stay Hydrated",
        description: "Hydration • Drink 8-10 glasses of water daily",
        relevance: 0.6,
        keywords: ["hydration", "water", "drink", "health"],
      },
    ]

    return allFallbackData
      .filter((item) => {
        const searchText = [item.title, item.description, ...(item.keywords || [])].join(" ").toLowerCase()
        return (
          searchText.includes(normalizedQuery) || normalizedQuery.split(" ").some((word) => searchText.includes(word))
        )
      })
      .slice(0, 8)
  }
}

export const openRouterService = new OpenRouterService()
