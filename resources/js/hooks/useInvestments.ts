import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { investmentRepository } from '../repositories/dataRepository'

export const useInvestments = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['investments'],
    queryFn: () => investmentRepository.getAll(),
    staleTime: 30 * 60 * 1000,
  })

  const createMutation = useMutation({
    mutationFn: (payload: { symbol: string; asset_class: string; holdings_qty: number; avg_buy_price: number; current_price: number; category?: string }) => investmentRepository.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['investments'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { current_price?: number; holdings_qty?: number } }) => investmentRepository.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['investments'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => investmentRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['investments'] }),
  })

  return {
    investments: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createInvestment: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateInvestment: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteInvestment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    refetch: query.refetch,
  }
}