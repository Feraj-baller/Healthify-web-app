// Global store for products generated from smart pantry
interface PantryProduct {
  id: number
  name: string
  brand: string
  grade: string
  calories: number
  sugar: string
  protein: string
  image: string
  category: string
  isLowSugar: boolean
  isHighProtein: boolean
  source: "pantry_ai" | "catalog"
  usedInRecipes?: string[]
}

class PantryProductsStore {
  private products: PantryProduct[] = []
  private listeners: Array<(products: PantryProduct[]) => void> = []

  addProduct(product: Omit<PantryProduct, "id" | "source">) {
    const newProduct: PantryProduct = {
      ...product,
      id: Date.now() + Math.random(),
      source: "pantry_ai",
    }

    // Check if product already exists
    const exists = this.products.find(
      (p) =>
        p.name.toLowerCase() === product.name.toLowerCase() && p.brand.toLowerCase() === product.brand.toLowerCase(),
    )

    if (!exists) {
      this.products.push(newProduct)
      this.notifyListeners()
    }
  }

  addMultipleProducts(products: Array<Omit<PantryProduct, "id" | "source">>) {
    products.forEach((product) => this.addProduct(product))
  }

  getProducts(): PantryProduct[] {
    return [...this.products]
  }

  getPantryGeneratedProducts(): PantryProduct[] {
    return this.products.filter((p) => p.source === "pantry_ai")
  }

  subscribe(listener: (products: PantryProduct[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.products))
  }

  clear() {
    this.products = []
    this.notifyListeners()
  }
}

export const pantryProductsStore = new PantryProductsStore()
export type { PantryProduct }
