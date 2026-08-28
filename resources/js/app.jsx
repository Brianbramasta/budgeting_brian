import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Sidebar } from './Components/Sidebar'
import { DashboardPage } from './Pages/Dashboard'
import { AssetsPage } from './Pages/Assets'
import { ExpensesPage } from './Pages/Expenses'
import { InvestmentsPage } from './Pages/Investments'
import { BudgetPlansPage } from './Pages/BudgetPlans'
import { SnapshotsPage } from './Pages/Snapshots'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/investments" element={<InvestmentsPage />} />
              <Route path="/budget-plans" element={<BudgetPlansPage />} />
              <Route path="/snapshots" element={<SnapshotsPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

createRoot(document.getElementById('app')).render(<App />)