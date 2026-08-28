import { useState } from 'react'
import { useExpenses } from '../Hooks/useExpenses'
import { useAssets } from '../Hooks/useAssets'
import { useBudgetPlans } from '../Hooks/useBudgetPlans'
import { formatCurrency } from '../Utils/formatter'
import { Trash2, Plus } from 'lucide-react'

export const ExpensesPage = () => {
  const { expenses, isLoading, isError, createExpense, deleteExpense } = useExpenses()
  const { assets } = useAssets()
  const { budgetPlans } = useBudgetPlans()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const payload = {
      transaction_date: formData.get('date') as string,
      item_name: formData.get('name') as string,
      amount: parseFloat(formData.get('amount') as string),
      budget_plan_id: formData.get('budgetPlan') ? parseInt(formData.get('budgetPlan') as string) : undefined,
      asset_source_id: formData.get('assetSource') ? parseInt(formData.get('assetSource') as string) : undefined,
    }

    createExpense(payload)
    setShowForm(false)
  }

  if (isLoading) return <div className="p-6">Loading expenses...</div>
  if (isError) return <div className="p-6">Error loading expenses</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense) => (
              <tr key={expense.id} className="border-t">
                <td className="p-3">{expense.transactionDate.toLocaleDateString('id-ID')}</td>
                <td className="p-3">{expense.itemName}</td>
                <td className="p-3 text-right font-medium text-red-600">{formatCurrency(expense.amount)}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>
            <div className="space-y-4">
              <input
                name="date"
                type="date"
                required
                className="w-full p-2 border rounded"
              />
              <input
                name="name"
                required
                className="w-full p-2 border rounded"
                placeholder="Item Name"
              />
              <input
                name="amount"
                type="number"
                step="0.01"
                required
                className="w-full p-2 border rounded"
                placeholder="Amount"
              />
              <select name="budgetPlan" className="w-full p-2 border rounded">
                <option value="">Select Budget Plan (optional)</option>
                {budgetPlans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>{plan.categoryName}</option>
                ))}
              </select>
              <select name="assetSource" className="w-full p-2 border rounded">
                <option value="">Select Asset Source (optional)</option>
                {assets?.map((asset) => (
                  <option key={asset.id} value={asset.id}>{asset.name} - {formatCurrency(asset.balance)}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}