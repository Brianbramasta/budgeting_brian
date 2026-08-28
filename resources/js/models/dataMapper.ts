import type { AssetDto, BudgetPlanDto, ExpenseDto, InvestmentDto, SnapshotDto, SavingsPocketDto, SummaryDto } from './dto'
import type { Asset, BudgetPlan, Expense, Investment, Snapshot, SavingsPocket, Summary } from './entity'

const mapAssetType = (dbType: string): 'cash' | 'card' | 'emergency' | 'brokerage' | 'other' => {
  const map: Record<string, 'cash' | 'card' | 'emergency' | 'brokerage' | 'other'> = {
    BANK: 'cash',
    SAHAM: 'brokerage',
    REKSADANA: 'brokerage',
    EMAS: 'cash',
    OBLIGASI: 'cash',
    INVESTASI_LAIN: 'other',
  }
  return map[dbType] || 'other'
}

export const mapAsset = (dto: AssetDto): Asset => ({
  id: dto.id,
  name: dto.source_name,
  type: mapAssetType(dto.asset_type),
  balance: dto.balance,
})

export const mapAssets = (dtos: AssetDto[]): Asset[] => dtos.map(mapAsset)

export const mapBudgetPlan = (dto: BudgetPlanDto): BudgetPlan => ({
  id: dto.id,
  monthYear: new Date(dto.month_year),
  categoryName: dto.category_name,
  unitPrice: dto.unit_price,
  plannedQty: dto.planned_qty,
  estimatedTotal: dto.estimated_total,
})

export const mapBudgetPlans = (dtos: BudgetPlanDto[]): BudgetPlan[] => dtos.map(mapBudgetPlan)

export const mapExpense = (dto: ExpenseDto): Expense => ({
  id: dto.id,
  transactionDate: new Date(dto.transaction_date),
  itemName: dto.item_name,
  amount: dto.amount,
  budgetPlanId: dto.budget_plan_id,
  assetSourceId: dto.asset_source_id,
})

export const mapExpenses = (dtos: ExpenseDto[]): Expense[] => dtos.map(mapExpense)

export const mapInvestment = (dto: InvestmentDto): Investment => ({
  id: dto.id,
  symbol: dto.symbol,
  assetClass: dto.asset_class,
  holdingsQty: dto.holdings_qty,
  avgBuyPrice: dto.avg_buy_price,
  currentPrice: dto.current_price,
  currentValue: dto.current_value,
  unrealizedPL: dto.unrealized_pl,
  category: dto.category,
})

export const mapInvestments = (dtos: InvestmentDto[]): Investment[] => dtos.map(mapInvestment)

export const mapSnapshot = (dto: SnapshotDto): Snapshot => ({
  id: dto.id,
  snapshotDate: new Date(dto.snapshot_date),
  sourceOrSymbol: dto.source_or_symbol,
  categoryType: dto.category_type === 'BANK_ASSET' ? 'cash' : 'investment',
  totalValue: dto.total_value,
})

export const mapSnapshots = (dtos: SnapshotDto[]): Snapshot[] => dtos.map(mapSnapshot)

export const mapSavingsPocket = (dto: SavingsPocketDto): SavingsPocket => ({
  id: dto.id,
  pocketName: dto.pocket_name,
  allocationPercentage: dto.allocation_percentage,
})

export const mapSavingsPockets = (dtos: SavingsPocketDto[]): SavingsPocket[] => dtos.map(mapSavingsPocket)

export const mapSummary = (dto: SummaryDto): Summary => ({
  netWorth: dto.net_worth,
  totalAssets: dto.total_assets,
  totalInvestments: dto.total_investments,
  currentMonthExpense: dto.current_month_expense,
  budgetPlanned: dto.budget_planned,
  budgetRemaining: dto.budget_remaining,
})