import { useDashboard } from '../Hooks/useDashboard'
import { formatCurrency } from '../Utils/formatter'

export const DashboardPage = () => {
  const { summary, isLoading, isError } = useDashboard()

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError) return <div className="p-6">Error loading dashboard</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Net Worth</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(summary?.netWorth || 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Assets</h3>
          <p className="text-2xl font-bold">{formatCurrency(summary?.totalAssets || 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Investments</h3>
          <p className="text-2xl font-bold">{formatCurrency(summary?.totalInvestments || 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Current Month Expense</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(summary?.currentMonthExpense || 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Budget Planned</h3>
          <p className="text-2xl font-bold">{formatCurrency(summary?.budgetPlanned || 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Budget Remaining</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary?.budgetRemaining || 0)}</p>
        </div>
      </div>
    </div>
  )
}