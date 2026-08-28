export type Asset = {
  id: number
  name: string
  type: 'cash' | 'card' | 'emergency' | 'brokerage' | 'other'
  balance: number
}

export type BudgetPlan = {
  id: number
  monthYear: Date
  categoryName: string
  unitPrice: number
  plannedQty: number
  estimatedTotal: number
}

export type Expense = {
  id: number
  transactionDate: Date
  itemName: string
  amount: number
  budgetPlanId: number | null
  assetSourceId: number | null
}

export type Investment = {
  id: number
  symbol: string
  assetClass: 'CRYPTO' | 'SAHAM' | 'EMAS'
  holdingsQty: number
  avgBuyPrice: number
  currentPrice: number
  currentValue: number
  unrealizedPL: number
  category: 'Core' | 'Growth' | 'Spekulatif'
}

export type Snapshot = {
  id: number
  snapshotDate: Date
  sourceOrSymbol: string
  categoryType: 'cash' | 'investment'
  totalValue: number
}

export type SavingsPocket = {
  id: number
  pocketName: string
  allocationPercentage: number
}

export type Summary = {
  netWorth: number
  totalAssets: number
  totalInvestments: number
  currentMonthExpense: number
  budgetPlanned: number
  budgetRemaining: number
}