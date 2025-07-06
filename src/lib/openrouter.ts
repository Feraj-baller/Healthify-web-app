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

class OpenRouterService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    // Using a test API key - in production, this should be from environment variables
    this.apiKey = "sk-or-v1-test-key-for-demo"
    this.baseUrl = "https://openrouter.ai/api/v1"
  }

  async generateMealSuggestions(pantryItems: string[] = []): Promise<MealSuggestion[]> {
    try {
      const prompt = `
      Generate 6 unique, creative meal suggestions using these pantry items: ${pantryItems.join(", ")}
      
      Create diverse, healthy recipes that are different from typical suggestions. Be creative and unique.
      
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
    `

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://healthify.app",
          "X-Title": "Healthify Meal Generator",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 3000,
        }),
      })

      if (!response.ok) {
        console.warn(`OpenRouter API error: ${response.status} ${response.statusText}`)
        if (response.status === 401) {
          console.warn("API authentication failed, using fallback meal suggestions")
        }
        return this.getFallbackMealSuggestions()
      }

      const data: OpenRouterResponse = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        return this.getFallbackMealSuggestions()
      }

      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const results = JSON.parse(jsonMatch[0])
          return results.slice(0, 6)
        }
      } catch (parseError) {
        console.error("Failed to parse AI meal suggestions:", parseError)
      }

      return this.getFallbackMealSuggestions()
    } catch (error) {
      console.warn("OpenRouter meal generation error, using fallback:", error)
      return this.getFallbackMealSuggestions()
    }
  }

  async searchProducts(query: string): Promise<SearchResult[]> {
    try {
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
    `

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://healthify.app",
          "X-Title": "Healthify Search",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        console.warn(`OpenRouter API error: ${response.status} ${response.statusText}`)
        if (response.status === 401) {
          console.warn("API authentication failed, using fallback search")
        }
        return this.getFallbackResults(query)
      }

      const data: OpenRouterResponse = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        return this.getFallbackResults(query)
      }

      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const results = JSON.parse(jsonMatch[0])
          return results.slice(0, 8)
        }
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError)
      }

      return this.getFallbackResults(query)
    } catch (error) {
      console.warn("OpenRouter search error, using fallback:", error)
      return this.getFallbackResults(query)
    }
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      // For now, we'll simulate voice transcription since OpenRouter doesn't have audio endpoints
      // In a real implementation, you'd use a service like OpenAI Whisper or Google Speech-to-Text
      return new Promise((resolve) => {
        setTimeout(() => {
          const sampleQueries = [
            "Greek yogurt nutrition",
            "High protein snacks",
            "Organic vegetables",
            "Keto friendly foods",
            "Low sugar options",
            "Gluten free products",
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

  private getFallbackMealSuggestions(): MealSuggestion[] {
    const fallbackMeals = [
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
        difficulty: "Easy" as const,
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
        name: "Spiced Protein Pancakes",
        emoji: "🥞",
        usedItems: ["Organic Eggs", "Almond Milk", "Mixed Nuts"],
        healthScore: "A",
        calories: 320,
        protein: "22g",
        sugar: "4g",
        fiber: "6g",
        prepTime: "15 min",
        servings: 1,
        difficulty: "Medium" as const,
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
    ]

    // Generate more unique variations
    const variations = [
      "Asian Fusion Stir-Fry",
      "Mexican-Inspired Bowl",
      "Italian Herb Salad",
      "Indian Spiced Curry",
      "Thai Coconut Soup",
      "French Herb Omelette",
    ]

    return fallbackMeals.concat(
      variations.slice(0, 4).map((name, index) => ({
        id: index + 3,
        name,
        emoji: ["🍜", "🌮", "🥙", "🍛"][index] || "🍽️",
        usedItems: ["Greek Yogurt", "Quinoa", "Mixed Nuts"].slice(0, 2),
        healthScore: ["A+", "A", "B+"][index % 3] as "A+" | "A" | "B+",
        calories: 300 + index * 30,
        protein: `${18 + index * 2}g`,
        sugar: `${3 + index}g`,
        fiber: `${8 + index}g`,
        prepTime: `${20 + index * 5} min`,
        servings: 1 + (index % 2),
        difficulty: ["Easy", "Medium", "Hard"][index % 3] as "Easy" | "Medium" | "Hard",
        instructions: [
          "Prepare base ingredients",
          "Season with spices and herbs",
          "Cook using preferred method",
          "Combine all components",
          "Serve fresh and enjoy",
        ],
        nutritionalBreakdown: {
          calories: 300 + index * 30,
          protein: `${18 + index * 2}g`,
          carbs: `${35 + index * 3}g`,
          fat: `${12 + index * 2}g`,
          fiber: `${8 + index}g`,
          sugar: `${3 + index}g`,
          sodium: `${150 + index * 20}mg`,
        },
      })),
    )
  }

  private getFallbackResults(query: string): SearchResult[] {
    const normalizedQuery = query.toLowerCase().trim()

    const allFallbackData = [
      // Products
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
        type: "product" as const,
        title: "Quinoa",
        description: "Ancient Harvest • Complete protein ancient grain",
        relevance: 0.85,
        keywords: ["quinoa", "grain", "protein", "gluten-free", "superfood"],
        data: {
          calories: 222,
          grade: "A+",
          protein: "8g",
          sugar: "0g",
          fiber: "5g",
          fat: "4g",
          ingredients: ["Organic Quinoa"],
          benefits: ["Complete protein", "Gluten-free", "High fiber"],
          allergens: [],
        },
      },
      {
        type: "product" as const,
        title: "Wild Salmon",
        description: "Alaska Seafood • Omega-3 rich fish protein",
        relevance: 0.9,
        keywords: ["salmon", "fish", "omega-3", "protein", "wild"],
        data: {
          calories: 206,
          grade: "A+",
          protein: "28g",
          sugar: "0g",
          fiber: "0g",
          fat: "12g",
          ingredients: ["Wild Salmon"],
          benefits: ["Omega-3 fatty acids", "High protein", "Heart healthy"],
          allergens: ["Fish"],
        },
      },
      // Brands
      {
        type: "brand" as const,
        title: "Whole Foods Market",
        description: "Premium • Organic and natural food retailer",
        relevance: 0.7,
        keywords: ["whole foods", "organic", "natural", "premium"],
      },
      {
        type: "brand" as const,
        title: "Trader Joe's",
        description: "Affordable • Specialty grocery with unique products",
        relevance: 0.6,
        keywords: ["trader joes", "affordable", "specialty", "unique"],
      },
      // Categories
      {
        type: "category" as const,
        title: "Plant-Based Proteins",
        description: "Vegetarian and vegan protein sources",
        relevance: 0.8,
        keywords: ["plant", "protein", "vegetarian", "vegan"],
      },
      {
        type: "category" as const,
        title: "Superfoods",
        description: "Nutrient-dense foods with exceptional health benefits",
        relevance: 0.75,
        keywords: ["superfood", "nutrient", "antioxidant", "healthy"],
      },
      // Health Tips
      {
        type: "health_tip" as const,
        title: "Stay Hydrated",
        description: "Hydration • Drink 8-10 glasses of water daily",
        relevance: 0.6,
        keywords: ["hydration", "water", "drink", "health"],
      },
      {
        type: "health_tip" as const,
        title: "Eat the Rainbow",
        description: "Nutrition • Include colorful fruits and vegetables",
        relevance: 0.65,
        keywords: ["colorful", "fruits", "vegetables", "rainbow", "variety"],
      },
    ]

    // Filter and score results based on query
    const filteredResults = allFallbackData
      .map((item) => {
        let score = 0
        const searchText = [item.title, item.description, ...(item.keywords || [])].join(" ").toLowerCase()

        // Exact match bonus
        if (searchText.includes(normalizedQuery)) {
          score += 1.0
        }

        // Word matching
        const queryWords = normalizedQuery.split(/\s+/)
        queryWords.forEach((word) => {
          if (word.length > 1 && searchText.includes(word)) {
            score += 0.3
          }
        })

        return { ...item, relevance: score }
      })
      .filter((item) => item.relevance > 0.1)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8)

    return filteredResults
  }
}

export const openRouterService = new OpenRouterService()
