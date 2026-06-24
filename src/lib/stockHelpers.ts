export const STOCK_CRITICO = 5
export const STOCK_BAJO = 15

export type StockLevel = 'critico' | 'bajo' | 'normal' | 'sin_stock'

export function getStockLevel(stock: number): StockLevel {
  if (stock <= 0) return 'sin_stock'
  if (stock <= STOCK_CRITICO) return 'critico'
  if (stock <= STOCK_BAJO) return 'bajo'
  return 'normal'
}

export function getStockColor(stock: number): { bg: string; text: string } {
  const level = getStockLevel(stock)
  switch (level) {
    case 'sin_stock': return { bg: 'bg-gray-100', text: 'text-gray-500' }
    case 'critico': return { bg: 'bg-red-100', text: 'text-red-600' }
    case 'bajo': return { bg: 'bg-yellow-100', text: 'text-yellow-700' }
    case 'normal': return { bg: 'bg-green-100', text: 'text-green-600' }
  }
}
