import { useState } from 'react'
import { useBudgetPlans } from '../Hooks/useBudgetPlans'
import { formatCurrency } from '../Utils/formatter'
import { Plus } from 'lucide-react'

export const BudgetPlansPage = () => {
  const { budgetPlans, isLoading, isError, createBudgetPlan } = useBudgetPlans()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      month_year: formData.get('monthYear') as string,
      category_name: formData.get('categoryName') as string,
      unit_price: parseFloat(formData.get('unitPrice') as string),
      planned_qty: parseInt(formData.get('plannedQty') as string),
    }
    createBudgetPlan(payload)
    setShowForm(false)
  }

  if (isLoading) return <div className="p-6">Loading budget plans...</div>
  if (isError) return <div className="p-6">Error loading budget plans</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budget Plans</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          <Plus className="w-5 h-5" /> Add Budget Plan
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Unit Price</th>
              <th className="p-3 text-right">Qty</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {budgetPlans?.map((plan) => (
              <tr key={plan.id} className="border-t">
                <td className="p-3">{plan.monthYear.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</td>
                <td className="p-3">{plan.categoryName}</td>
                <td className="p-3 text-right">{formatCurrency(plan.unitPrice)}</td>
                <td className="p-3 text-right">{plan.plannedQty}</td>
                <td className="p-3 text-right font-medium">{formatCurrency(plan.estimatedTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Budget Plan</h2>
            <div className="space-y-4">
              <input name="monthYear" type="month" required className="w-full p-2 border rounded" />
              <input name="categoryName" required className="w-full p-2 border rounded" placeholder="Category Name" />
              <input name="unitPrice" type="number" step="0.01" required className="w-full p-2 border rounded" placeholder="Unit Price" />
              <input name="plannedQty" type="number" min="1" required className="w-full p-2 border rounded" placeholder="Planned Quantity" />
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}