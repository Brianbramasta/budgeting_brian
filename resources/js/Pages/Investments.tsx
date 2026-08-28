import { useState } from 'react'
import { useInvestments } from '../Hooks/useInvestments'
import { formatCurrency } from '../Utils/formatter'
import { Trash2, Plus, ArrowUpRight } from 'lucide-react'

const assetTypes = [
  { value: 'CRYPTO', label: 'Crypto' },
  { value: 'SAHAM', label: 'Saham' },
  { value: 'EMAS', label: 'Emas' },
]

const categories = [
  { value: 'Core', label: 'Core' },
  { value: 'Growth', label: 'Growth' },
  { value: 'Spekulatif', label: 'Spekulatif' },
]

export const InvestmentsPage = () => {
  const { investments, isLoading, isError, createInvestment, updateInvestment, deleteInvestment } = useInvestments()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      symbol: formData.get('symbol') as string,
      asset_class: formData.get('assetClass') as string,
      holdings_qty: parseFloat(formData.get('holdingsQty') as string),
      avg_buy_price: parseFloat(formData.get('avgBuyPrice') as string),
      current_price: parseFloat(formData.get('currentPrice') as string),
      category: formData.get('category') as string,
    }
    createInvestment(payload)
    setShowForm(false)
  }

  if (isLoading) return <div className="p-6">Loading investments...</div>
  if (isError) return <div className="p-6">Error loading investments</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Investments</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          <Plus className="w-5 h-5" /> Add Investment
        </button>
      </div>
      <div className="grid gap-4">
        {investments?.map((investment) => (
          <div key={investment.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{investment.symbol}</h3>
              <p className="text-gray-500 text-sm">{investment.assetClass} • {investment.category}</p>
              <div className="flex gap-6 mt-2 text-sm">
                <span>Qty: {investment.holdingsQty}</span>
                <span>Value: {formatCurrency(investment.currentValue)}</span>
                <span className={investment.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600'}>
                  P/L: {formatCurrency(investment.unrealizedPL)}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateInvestment({ id: investment.id, payload: { current_price: investment.currentPrice + 1000, holdings_qty: investment.holdingsQty } })} className="p-2 text-blue-600 hover:bg-gray-100 rounded">
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <button onClick={() => deleteInvestment(investment.id)} className="p-2 text-red-600 hover:bg-gray-100 rounded">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Investment</h2>
            <div className="space-y-4">
              <input name="symbol" required className="w-full p-2 border rounded" placeholder="Symbol (e.g., BTC-USDT)" />
              <select name="assetClass" required className="w-full p-2 border rounded">
                <option value="">Select Asset Class</option>
                {assetTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input name="holdingsQty" type="number" step="0.00000001" required className="w-full p-2 border rounded" placeholder="Holdings Qty" />
                <input name="avgBuyPrice" type="number" step="0.01" required className="w-full p-2 border rounded" placeholder="Avg Buy Price" />
              </div>
              <input name="currentPrice" type="number" step="0.01" required className="w-full p-2 border rounded" placeholder="Current Price" />
              <select name="category" className="w-full p-2 border rounded">{categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}