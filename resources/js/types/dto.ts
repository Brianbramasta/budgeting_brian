export type ApiSuccessResponse<T> = {
  meta: {
    status: number
    message: string
  }
  data: T
}

export type AssetDto = {
  id: number
  source_name: string
  asset_type: 'BANK' | 'SAHAM' | 'REKSADANA' | 'EMAS' | 'OBLIGASI' | 'INVESTASI_LAIN'
  balance: number
  created_at: string
  updated_at: string
}

export type BudgetPlanDto = {
  id: number
  month_year: string
  category_name: string
  unit_price: number
  planned_qty: number
  estimated_total: number
  created_at: string
  updated_at: string
}

export type ExpenseDto = {
  id: number
  transaction_date: string
  item_name: string
  budget_plan_id: number | null
  asset_source_id: number | null
  amount: number
  week_category: number | null
  created_at: string
  updated_at: string
}

export type InvestmentDto = {
  id: number
  symbol: string
  asset_class: 'CRYPTO' | 'SAHAM' | 'EMAS'
  holdings_qty: number
  avg_buy_price: number
  current_price: number
  current_value: number
  unrealized_pl: number
  recommendation_action: string | null
  category: 'Core' | 'Growth' | 'Spekulatif'
  created_at: string
  updated_at: string
}

export type SnapshotDto = {
  id: number
  snapshot_date: string
  source_or_symbol: string
  category_type: 'BANK_ASSET' | 'INVESTMENT'
  total_value: number
  created_at: string
  updated_at: string
}

export type SavingsPocketDto = {
  id: number
  pocket_name: string
  allocation_percentage: number
  created_at: string
  updated_at: string
}

export type SummaryDto = {
  net_worth: number
  total_assets: number
  total_investments: number
  current_month_expense: number
  budget_planned: number
  budget_remaining: number
}