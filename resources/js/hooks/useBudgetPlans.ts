import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetPlanRepository } from '../repositories/dataRepository'

export const useBudgetPlans = (month?: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['budget-plans', month],
    queryFn: () => budgetPlanRepository.getAll(month),
  })

  const createMutation = useMutation({
    mutationFn: (payload: { month_year: string; category_name: string; unit_price: number; planned_qty: number }) => budgetPlanRepository.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budget-plans'] }),
  })

  return {
    budgetPlans: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createBudgetPlan: createMutation.mutate,
    isCreating: createMutation.isPending,
    refetch: query.refetch,
  }
}