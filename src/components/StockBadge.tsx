import { getStockColor } from '@/lib/stockHelpers'

export default function StockBadge({ stock }: { stock: number }) {
  const colors = getStockColor(stock)
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.bg} ${colors.text}`}>
      Stock: {stock}
    </span>
  )
}
