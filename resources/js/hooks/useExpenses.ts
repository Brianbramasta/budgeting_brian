import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { expenseRepository } from '../repositories/dataRepository'

export const useExpenses = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['expenses'],
    queryFn: () => expenseRepository.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (payload: { transaction_date: string; item_name: string; amount: number; budget_plan_id?: number; asset_source_id?: number; week_category?: number }) => expenseRepository.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => expenseRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] }),
  })

  return {
    expenses: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createExpense: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteExpense: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    refetch: query.refetch,
  }
}