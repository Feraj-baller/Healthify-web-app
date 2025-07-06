import { usePreferences } from "@/lib/contexts/PreferencesContext"

interface Product {
  id: number
  name: string
  brand: string
  grade: string
  calories: number
  sugar: string
  protein: string
  image: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = usePreferences()

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700"
      case "B+":
      case "B":
        return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700"
      case "C":
        return "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700"
      default:
        return "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
    }
  }

  return (
    <div className="product-card bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group">
      <div className="h-48 bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
        {product.image}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-slate-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">{product.brand}</p>
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-lg ${getGradeColor(product.grade)} group-hover:scale-110 transition-all duration-300`}
          >
            {product.grade}
          </div>
          <div className="flex gap-4 text-xs text-gray-600 dark:text-slate-400">
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-slate-300">{product.calories}</div>
              <div>{t("common.calories")}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-slate-300">{product.sugar}</div>
              <div>{t("common.sugar")}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-slate-300">{product.protein}</div>
              <div>{t("common.protein")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
