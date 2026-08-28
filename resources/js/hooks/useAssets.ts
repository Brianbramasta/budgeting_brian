import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { assetRepository } from '../repositories/dataRepository'

export const useAssets = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['assets'],
    queryFn: () => assetRepository.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: (payload: { source_name: string; asset_type: string; balance: number }) => assetRepository.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { source_name?: string; asset_type?: string; balance?: number } }) => assetRepository.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => assetRepository.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
  })

  return {
    assets: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createAsset: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateAsset: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAsset: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    refetch: query.refetch,
  }
}