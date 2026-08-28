import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Wallet, Receipt, PieChart, TrendingUp, Calendar } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Assets', href: '/assets', icon: Wallet },
  { name: 'Expenses', href: '/expenses', icon: Receipt },
  { name: 'Budget Plans', href: '/budget-plans', icon: PieChart },
  { name: 'Investments', href: '/investments', icon: TrendingUp },
  { name: 'Snapshots', href: '/snapshots', icon: Calendar },
]

export const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Budgeting API</h1>
      </div>
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}