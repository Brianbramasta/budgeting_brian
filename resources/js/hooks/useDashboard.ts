import { useQuery } from '@tanstack/react-query'
import { dashboardRepository } from '../repositories/dataRepository'

export const useDashboard = () => {
  const query = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => dashboardRepository.getSummary(),
    staleTime: 5 * 60 * 1000,
  })

  return {
    summary: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}