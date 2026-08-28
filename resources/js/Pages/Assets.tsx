import { useState } from 'react'
import { useAssets } from '../Hooks/useAssets'
import { formatCurrency } from '../Utils/formatter'
import { PencilIcon, Trash2, Plus } from 'lucide-react'

const assetTypes = [
  { value: 'BANK', label: 'Bank' },
  { value: 'SAHAM', label: 'Saham' },
  { value: 'REKSADANA', label: 'Reksa Dana' },
  { value: 'EMAS', label: 'Emas' },
  { value: 'OBLIGASI', label: 'Obligasi' },
  { value: 'INVESTASI_LAIN', label: 'Investasi Lain' },
]

export const AssetsPage = () => {
  const { assets, isLoading, isError, createAsset, updateAsset, deleteAsset } = useAssets()
  const [showForm, setShowForm] = useState(false)
  const [editingAsset, setEditingAsset] = useState<null | (typeof assets)[0]>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const payload = {
      source_name: formData.get('name') as string,
      asset_type: formData.get('type') as string,
      balance: parseFloat(formData.get('balance') as string),
    }

    if (editingAsset) {
      updateAsset({ id: editingAsset.id, payload })
    } else {
      createAsset(payload)
    }
    
    setShowForm(false)
    setEditingAsset(null)
  }

  if (isLoading) return <div className="p-6">Loading assets...</div>
  if (isError) return <div className="p-6">Error loading assets</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Asset
        </button>
      </div>

      <div className="grid gap-4">
        {assets?.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{asset.name}</h3>
              <p className="text-gray-500 text-sm">{asset.type} • {formatCurrency(asset.balance)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditingAsset(asset); setShowForm(true); }}
                className="p-2 text-blue-600 hover:bg-gray-100 rounded"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteAsset(asset.id)}
                className="p-2 text-red-600 hover:bg-gray-100 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingAsset ? 'Edit Asset' : 'Add Asset'}</h2>
            <div className="space-y-4">
              <input
                name="name"
                defaultValue={editingAsset?.name}
                required
                className="w-full p-2 border rounded"
                placeholder="Asset Name"
              />
              <select name="type" defaultValue={editingAsset?.type} required className="w-full p-2 border rounded">
                <option value="">Select Type</option>
                {assetTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <input
                name="balance"
                type="number"
                defaultValue={editingAsset?.balance || 0}
                required
                className="w-full p-2 border rounded"
                placeholder="Balance"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingAsset(null); }}
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