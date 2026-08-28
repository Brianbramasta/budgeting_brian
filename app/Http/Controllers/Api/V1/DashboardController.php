<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AssetSource;
use App\Models\BudgetPlan;
use App\Models\ExpenseTransaction;
use App\Models\InvestmentAsset;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
    public function summary()
    {
        $assetsTotal = AssetSource::sum('balance');

        $investmentsValue = InvestmentAsset::sum(DB::raw('holdings_qty * current_price'));

        $netWorth = $assetsTotal + $investmentsValue;

        $currentMonth = now()->format('Y-m');
        $monthExpenses = ExpenseTransaction::whereYear('transaction_date', now()->year)
            ->whereMonth('transaction_date', now()->month)
            ->sum('amount');

        $budgetPlanned = BudgetPlan::where('month_year', $currentMonth)->sum('estimated_total');
        $budgetRemaining = $budgetPlanned - $monthExpenses;

        return $this->success([
            'net_worth' => round($netWorth, 2),
            'total_assets' => round($assetsTotal, 2),
            'total_investments' => round($investmentsValue, 2),
            'current_month_expense' => round($monthExpenses, 2),
            'budget_planned' => round($budgetPlanned, 2),
            'budget_remaining' => round($budgetRemaining, 2),
        ]);
    }
}