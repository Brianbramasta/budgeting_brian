import { useSnapshots } from '../Hooks/useSnapshots'
import { useDashboard } from '../Hooks/useDashboard'
import { formatCurrency } from '../Utils/formatter'
import { Plus } from 'lucide-react'

export const SnapshotsPage = () => {
  const { snapshots, isLoading, isError, generateSnapshot } = useSnapshots()
  const { summary } = useDashboard()

  if (isLoading) return <div className="p-6">Loading snapshots...</div>
  if (isError) return <div className="p-6">Error loading snapshots</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Snapshots</h1>
        <button onClick={() => generateSnapshot()} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          <Plus className="w-5 h-5" /> Generate Snapshot
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Current Net Worth</h2>
        <p className="text-3xl font-bold text-green-600">{formatCurrency(summary?.netWorth || 0)}</p>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-bold p-4">Snapshot History</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Asset</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {snapshots?.map((snapshot) => (
              <tr key={snapshot.id} className="border-t">
                <td className="p-3">{snapshot.snapshotDate.toLocaleDateString('id-ID')}</td>
                <td className="p-3">{snapshot.sourceOrSymbol}</td>
                <td className="p-3 text-sm text-gray-500">{snapshot.categoryType}</td>
                <td className="p-3 text-right font-medium">{formatCurrency(snapshot.totalValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}