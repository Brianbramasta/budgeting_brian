import api from '../utils/axiosInstance'
import type { AssetDto, BudgetPlanDto, ExpenseDto, InvestmentDto, SnapshotDto, SummaryDto, ApiSuccessResponse } from '../types/dto'

export const assetService = {
  getAll: async (): Promise<ApiSuccessResponse<AssetDto[]>> => {
    const res = await api.get('/v1/assets')
    return res as any
  },

  create: async (payload: { source_name: string; asset_type: string; balance: number }): Promise<ApiSuccessResponse<AssetDto>> => {
    const res = await api.post('/v1/assets', payload)
    return res as any
  },

  update: async (id: number, payload: { source_name?: string; asset_type?: string; balance?: number }): Promise<ApiSuccessResponse<AssetDto>> => {
    const res = await api.put(`/v1/assets/${id}`, payload)
    return res as any
  },

  delete: async (id: number): Promise<ApiSuccessResponse<null>> => {
    const res = await api.delete(`/v1/assets/${id}`)
    return res as any
  },
}

export const budgetPlanService = {
  getAll: async (month?: string): Promise<ApiSuccessResponse<BudgetPlanDto[]>> => {
    const params = month ? { month } : {}
    const res = await api.get('/v1/budget-plans', { params })
    return res as any
  },

  create: async (payload: { month_year: string; category_name: string; unit_price: number; planned_qty: number }): Promise<ApiSuccessResponse<BudgetPlanDto>> => {
    const res = await api.post('/v1/budget-plans', payload)
    return res as any
  },
}

export const expenseService = {
  getAll: async (dateFrom?: string, dateTo?: string): Promise<ApiSuccessResponse<ExpenseDto[]>> => {
    const params: Record<string, string> = {}
    if (dateFrom) params.date_from = dateFrom
    if (dateTo) params.date_to = dateTo
    const res = await api.get('/v1/expenses', { params })
    return res as any
  },

  create: async (payload: { transaction_date: string; item_name: string; amount: number; budget_plan_id?: number; asset_source_id?: number; week_category?: number }): Promise<ApiSuccessResponse<ExpenseDto>> => {
    const res = await api.post('/v1/expenses', payload)
    return res as any
  },

  delete: async (id: number): Promise<ApiSuccessResponse<null>> => {
    const res = await api.delete(`/v1/expenses/${id}`)
    return res as any
  },
}

export const investmentService = {
  getAll: async (): Promise<ApiSuccessResponse<InvestmentDto[]>> => {
    const res = await api.get('/v1/investments')
    return res as any
  },

  create: async (payload: { symbol: string; asset_class: string; holdings_qty: number; avg_buy_price: number; current_price: number; category?: string }): Promise<ApiSuccessResponse<InvestmentDto>> => {
    const res = await api.post('/v1/investments', payload)
    return res as any
  },

  update: async (id: number, payload: { current_price?: number; holdings_qty?: number }): Promise<ApiSuccessResponse<InvestmentDto>> => {
    const res = await api.put(`/v1/investments/${id}`, payload)
    return res as any
  },

  delete: async (id: number): Promise<ApiSuccessResponse<null>> => {
    const res = await api.delete(`/v1/investments/${id}`)
    return res as any
  },
}

export const dashboardService = {
  getSummary: async (): Promise<ApiSuccessResponse<SummaryDto>> => {
    const res = await api.get('/v1/dashboard/summary')
    return res as any
  },
}

export const snapshotService = {
  generate: async (snapshotDate?: string): Promise<ApiSuccessResponse<null>> => {
    const payload = snapshotDate ? { snapshot_date: snapshotDate } : {}
    const res = await api.post('/v1/snapshots/generate', payload)
    return res as any
  },

  getHistory: async (categoryType?: string): Promise<ApiSuccessResponse<SnapshotDto[]>> => {
    const params = categoryType ? { category_type: categoryType } : {}
    const res = await api.get('/v1/snapshots/history', { params })
    return res as any
  },
}

export const savingsPocketService = {
  getAll: async (): Promise<ApiSuccessResponse<SavingsPocketDto[]>> => {
    const res = await api.get('/v1/savings-pockets')
    return res as any
  },
}