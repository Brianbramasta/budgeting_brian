import { assetService, budgetPlanService, expenseService, investmentService, dashboardService, snapshotService, savingsPocketService } from '../services/apiService'
import { mapAsset, mapAssets, mapBudgetPlan, mapBudgetPlans, mapExpense, mapExpenses, mapInvestment, mapInvestments, mapSummary, mapSnapshot, mapSnapshots } from '../models/dataMapper'

export const assetRepository = {
  getAll: async () => {
    const res = await assetService.getAll()
    return mapAssets(res.data.data)
  },

  create: async (payload: { source_name: string; asset_type: string; balance: number }) => {
    const res = await assetService.create(payload)
    return mapAsset(res.data.data)
  },

  update: async (id: number, payload: { source_name?: string; asset_type?: string; balance?: number }) => {
    const res = await assetService.update(id, payload)
    return mapAsset(res.data.data)
  },

  delete: async (id: number) => {
    await assetService.delete(id)
  },
}

export const budgetPlanRepository = {
  getAll: async (month?: string) => {
    const res = await budgetPlanService.getAll(month)
    return mapBudgetPlans(res.data.data)
  },

  create: async (payload: { month_year: string; category_name: string; unit_price: number; planned_qty: number }) => {
    const res = await budgetPlanService.create(payload)
    return mapBudgetPlan(res.data.data)
  },
}

export const expenseRepository = {
  getAll: async (dateFrom?: string, dateTo?: string) => {
    const res = await expenseService.getAll(dateFrom, dateTo)
    return mapExpenses(res.data.data)
  },

  create: async (payload: { transaction_date: string; item_name: string; amount: number; budget_plan_id?: number; asset_source_id?: number; week_category?: number }) => {
    const res = await expenseService.create(payload)
    return mapExpense(res.data.data)
  },

  delete: async (id: number) => {
    await expenseService.delete(id)
  },
}

export const investmentRepository = {
  getAll: async () => {
    const res = await investmentService.getAll()
    return mapInvestments(res.data.data)
  },

  create: async (payload: { symbol: string; asset_class: string; holdings_qty: number; avg_buy_price: number; current_price: number; category?: string }) => {
    const res = await investmentService.create(payload)
    return mapInvestment(res.data.data)
  },

  update: async (id: number, payload: { current_price?: number; holdings_qty?: number }) => {
    const res = await investmentService.update(id, payload)
    return mapInvestment(res.data.data)
  },

  delete: async (id: number) => {
    await investmentService.delete(id)
  },
}

export const dashboardRepository = {
  getSummary: async () => {
    const res = await dashboardService.getSummary()
    return mapSummary(res.data.data)
  },
}

export const snapshotRepository = {
  getHistory: async (categoryType?: string) => {
    const res = await snapshotService.getHistory(categoryType)
    return mapSnapshots(res.data.data)
  },

  generate: async (snapshotDate?: string) => {
    const res = await snapshotService.generate(snapshotDate)
    return res.data
  },
}

export const savingsPocketRepository = {
  getAll: async () => {
    const res = await savingsPocketService.getAll()
    return mapSavingsPockets(res.data.data)
  },
}