interface SearchResult {
  type: "product" | "brand" | "category" | "health_tip"
  title: string
  description: string
  relevance: number
  data?: any
}

interface ProductData {
  calories: number
  grade: string
  protein: string
  sugar: string
  fiber?: string
  fat?: string
}

class LocalSearchService {
  private products: Array<{
    name: string
    brand: string
    description: string
    keywords: string[]
    data: ProductData
  }> = [
    {
      name: "Organic Almond Milk",
      brand: "Blue Diamond",
      description: "Unsweetened plant-based milk alternative rich in vitamin E",
      keywords: ["almond", "milk", "plant-based", "dairy-free", "organic", "unsweetened"],
      data: { calories: 60, grade: "A+", protein: "2g", sugar: "0g", fiber: "1g", fat: "3g" },
    },
    {
      name: "Greek Yogurt",
      brand: "Chobani",
      description: "High-protein probiotic dairy product with live cultures",
      keywords: ["yogurt", "greek", "protein", "probiotic", "dairy", "cultures"],
      data: { calories: 130, grade: "A", protein: "20g", sugar: "6g", fiber: "0g", fat: "0g" },
    },
    {
      name: "Quinoa",
      brand: "Ancient Harvest",
      description: "Complete protein ancient grain, gluten-free superfood",
      keywords: ["quinoa", "grain", "protein", "gluten-free", "superfood", "ancient"],
      data: { calories: 222, grade: "A+", protein: "8g", sugar: "0g", fiber: "5g", fat: "4g" },
    },
    {
      name: "Avocado",
      brand: "Fresh Produce",
      description: "Nutrient-dense fruit rich in healthy monounsaturated fats",
      keywords: ["avocado", "fruit", "healthy fats", "monounsaturated", "potassium"],
      data: { calories: 234, grade: "A", protein: "3g", sugar: "1g", fiber: "10g", fat: "21g" },
    },
    {
      name: "Wild Salmon",
      brand: "Alaska Seafood",
      description: "Omega-3 rich fish, excellent source of high-quality protein",
      keywords: ["salmon", "fish", "omega-3", "protein", "wild", "seafood"],
      data: { calories: 206, grade: "A+", protein: "28g", sugar: "0g", fiber: "0g", fat: "12g" },
    },
    {
      name: "Organic Spinach",
      brand: "Earthbound Farm",
      description: "Iron-rich leafy green vegetable packed with vitamins",
      keywords: ["spinach", "leafy greens", "iron", "vitamins", "organic", "vegetables"],
      data: { calories: 23, grade: "A+", protein: "3g", sugar: "0g", fiber: "2g", fat: "0g" },
    },
    {
      name: "Protein Bar",
      brand: "Quest Nutrition",
      description: "Low-carb, high-protein snack bar with natural ingredients",
      keywords: ["protein bar", "snack", "low-carb", "quest", "nutrition", "bar"],
      data: { calories: 190, grade: "B+", protein: "21g", sugar: "1g", fiber: "14g", fat: "8g" },
    },
    {
      name: "Oatmeal",
      brand: "Quaker",
      description: "Whole grain breakfast cereal rich in beta-glucan fiber",
      keywords: ["oatmeal", "oats", "whole grain", "fiber", "breakfast", "beta-glucan"],
      data: { calories: 150, grade: "A", protein: "5g", sugar: "1g", fiber: "4g", fat: "3g" },
    },
    {
      name: "Blueberries",
      brand: "Fresh Produce",
      description: "Antioxidant-rich superfruit with natural sweetness",
      keywords: ["blueberries", "berries", "antioxidants", "superfruit", "vitamin C"],
      data: { calories: 84, grade: "A+", protein: "1g", sugar: "15g", fiber: "4g", fat: "0g" },
    },
    {
      name: "Sweet Potato",
      brand: "Fresh Produce",
      description: "Beta-carotene rich root vegetable with complex carbohydrates",
      keywords: ["sweet potato", "potato", "beta-carotene", "vitamin A", "complex carbs"],
      data: { calories: 112, grade: "A", protein: "2g", sugar: "7g", fiber: "4g", fat: "0g" },
    },
  ]

  private brands: Array<{
    name: string
    description: string
    keywords: string[]
    specialty: string
  }> = [
    {
      name: "Whole Foods Market",
      description: "Organic and natural food retailer with high-quality standards",
      keywords: ["whole foods", "organic", "natural", "quality", "grocery"],
      specialty: "Organic & Natural Foods",
    },
    {
      name: "Trader Joe's",
      description: "Affordable specialty grocery chain with unique products",
      keywords: ["trader joes", "affordable", "specialty", "unique", "grocery"],
      specialty: "Specialty & Affordable",
    },
    {
      name: "Thrive Market",
      description: "Online marketplace for healthy, sustainable products",
      keywords: ["thrive market", "online", "healthy", "sustainable", "marketplace"],
      specialty: "Online Health Foods",
    },
  ]

  private categories: Array<{
    name: string
    description: string
    keywords: string[]
  }> = [
    {
      name: "Plant-Based Proteins",
      description: "Vegetarian and vegan protein sources for muscle building",
      keywords: ["plant-based", "protein", "vegetarian", "vegan", "muscle"],
    },
    {
      name: "Superfoods",
      description: "Nutrient-dense foods with exceptional health benefits",
      keywords: ["superfoods", "nutrient-dense", "health benefits", "antioxidants"],
    },
    {
      name: "Gluten-Free",
      description: "Products suitable for celiac disease and gluten sensitivity",
      keywords: ["gluten-free", "celiac", "sensitivity", "wheat-free"],
    },
    {
      name: "Keto-Friendly",
      description: "Low-carb, high-fat foods for ketogenic diet",
      keywords: ["keto", "ketogenic", "low-carb", "high-fat", "diet"],
    },
  ]

  private healthTips: Array<{
    title: string
    description: string
    keywords: string[]
    category: string
  }> = [
    {
      title: "Stay Hydrated",
      description: "Drink 8-10 glasses of water daily for optimal health and energy",
      keywords: ["hydration", "water", "energy", "health"],
      category: "Hydration",
    },
    {
      title: "Eat the Rainbow",
      description: "Include colorful fruits and vegetables for diverse nutrients",
      keywords: ["colorful", "fruits", "vegetables", "nutrients", "variety"],
      category: "Nutrition",
    },
    {
      title: "Portion Control",
      description: "Use smaller plates and mindful eating for better weight management",
      keywords: ["portion", "control", "mindful eating", "weight", "management"],
      category: "Weight Management",
    },
    {
      title: "Meal Prep Success",
      description: "Prepare healthy meals in advance to maintain consistent nutrition",
      keywords: ["meal prep", "preparation", "planning", "consistency"],
      category: "Planning",
    },
  ]

  async searchProducts(query: string): Promise<SearchResult[]> {
    const normalizedQuery = query.toLowerCase().trim()
    const queryWords = normalizedQuery.split(/\s+/)
    const results: SearchResult[] = []

    // Search products
    this.products.forEach((product) => {
      const relevance = this.calculateRelevance(normalizedQuery, queryWords, [
        product.name,
        product.brand,
        product.description,
        ...product.keywords,
      ])

      if (relevance > 0.1) {
        results.push({
          type: "product",
          title: product.name,
          description: `${product.brand} • ${product.description}`,
          relevance,
          data: product.data,
        })
      }
    })

    // Search brands
    this.brands.forEach((brand) => {
      const relevance = this.calculateRelevance(normalizedQuery, queryWords, [
        brand.name,
        brand.description,
        brand.specialty,
        ...brand.keywords,
      ])

      if (relevance > 0.1) {
        results.push({
          type: "brand",
          title: brand.name,
          description: `${brand.specialty} • ${brand.description}`,
          relevance,
        })
      }
    })

    // Search categories
    this.categories.forEach((category) => {
      const relevance = this.calculateRelevance(normalizedQuery, queryWords, [
        category.name,
        category.description,
        ...category.keywords,
      ])

      if (relevance > 0.1) {
        results.push({
          type: "category",
          title: category.name,
          description: category.description,
          relevance,
        })
      }
    })

    // Search health tips
    this.healthTips.forEach((tip) => {
      const relevance = this.calculateRelevance(normalizedQuery, queryWords, [
        tip.title,
        tip.description,
        tip.category,
        ...tip.keywords,
      ])

      if (relevance > 0.1) {
        results.push({
          type: "health_tip",
          title: tip.title,
          description: `${tip.category} • ${tip.description}`,
          relevance,
        })
      }
    })

    // Sort by relevance and return top 8 results
    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 8)
  }

  private calculateRelevance(query: string, queryWords: string[], searchFields: string[]): number {
    let relevance = 0
    const searchText = searchFields.join(" ").toLowerCase()

    // Exact match bonus
    if (searchText.includes(query)) {
      relevance += 1.0
    }

    // Word match scoring
    queryWords.forEach((word) => {
      if (word.length < 2) return

      searchFields.forEach((field) => {
        const fieldLower = field.toLowerCase()

        // Exact word match
        if (fieldLower.includes(word)) {
          relevance += 0.3
        }

        // Partial word match
        if (fieldLower.includes(word.substring(0, Math.max(3, word.length - 1)))) {
          relevance += 0.1
        }
      })
    })

    // Normalize relevance score
    return Math.min(relevance / queryWords.length, 1.0)
  }

  async analyzeProduct(productName: string, ingredients?: string): Promise<any> {
    // Find product in our database
    const product = this.products.find(
      (p) =>
        p.name.toLowerCase().includes(productName.toLowerCase()) ||
        productName.toLowerCase().includes(p.name.toLowerCase()),
    )

    if (product) {
      return {
        grade: product.data.grade,
        score: this.gradeToScore(product.data.grade),
        calories: product.data.calories,
        nutrients: {
          protein: product.data.protein,
          sugar: product.data.sugar,
          fiber: product.data.fiber || "0g",
          fat: product.data.fat || "0g",
        },
        highlights: this.generateHighlights(product.data),
        concerns: this.generateConcerns(product.data),
        recommendations: this.generateRecommendations(product.data),
      }
    }

    // Fallback analysis
    return {
      grade: "B",
      score: 70,
      calories: 150,
      nutrients: {
        protein: "8g",
        sugar: "5g",
        fiber: "3g",
        fat: "4g",
      },
      highlights: ["Natural ingredients"],
      concerns: ["Moderate sugar content"],
      recommendations: "Good for balanced nutrition",
    }
  }

  private gradeToScore(grade: string): number {
    switch (grade) {
      case "A+":
        return 95
      case "A":
        return 85
      case "B+":
        return 75
      case "B":
        return 65
      case "C":
        return 55
      default:
        return 45
    }
  }

  private generateHighlights(data: ProductData): string[] {
    const highlights: string[] = []

    if (Number.parseInt(data.protein) >= 15) highlights.push("High protein")
    if (Number.parseInt(data.sugar) <= 3) highlights.push("Low sugar")
    if (data.fiber && Number.parseInt(data.fiber) >= 5) highlights.push("High fiber")
    if (data.calories <= 100) highlights.push("Low calorie")
    if (data.grade === "A+" || data.grade === "A") highlights.push("Excellent nutrition")

    return highlights.length > 0 ? highlights : ["Natural ingredients"]
  }

  private generateConcerns(data: ProductData): string[] {
    const concerns: string[] = []

    if (Number.parseInt(data.sugar) > 15) concerns.push("High sugar content")
    if (data.calories > 300) concerns.push("High calorie")
    if (data.fat && Number.parseInt(data.fat) > 20) concerns.push("High fat content")

    return concerns.length > 0 ? concerns : []
  }

  private generateRecommendations(data: ProductData): string {
    if (data.grade === "A+" || data.grade === "A") {
      return "Excellent choice for a healthy diet"
    } else if (data.grade === "B+" || data.grade === "B") {
      return "Good option when consumed in moderation"
    } else {
      return "Consider healthier alternatives"
    }
  }
}

export const searchService = new LocalSearchService()
