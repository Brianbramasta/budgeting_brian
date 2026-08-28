import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { snapshotRepository } from '../repositories/dataRepository'

export const useSnapshots = () => {
  const queryClient = useQueryClient()

  const historyQuery = useQuery({
    queryKey: ['snapshots', 'history'],
    queryFn: () => snapshotRepository.getHistory(),
    staleTime: 60 * 60 * 1000,
  })

  const generateMutation = useMutation({
    mutationFn: (snapshotDate?: string) => snapshotRepository.generate(snapshotDate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['snapshots'] }),
  })

  return {
    snapshots: historyQuery.data,
    isLoading: historyQuery.isLoading,
    isError: historyQuery.isError,
    error: historyQuery.error,
    generateSnapshot: generateMutation.mutate,
    isGenerating: generateMutation.isPending,
    refetch: historyQuery.refetch,
  }
}