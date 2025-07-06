import ProductCard from "@/components/ProductCard"
import { usePreferences } from "@/lib/contexts/PreferencesContext"

const recentProducts = [
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
]

export default function RecentScans() {
  const { t } = usePreferences()

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t("dashboard.recentAnalysis")}</h2>
        <a href="#" className="text-emerald-500 hover:text-emerald-600 font-medium hover:translate-x-1 transition-all">
          {t("dashboard.viewAllScans")}
        </a>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
