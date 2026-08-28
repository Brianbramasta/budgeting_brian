<?php

namespace Database\Seeders;

use App\Models\AssetSource;
use App\Models\BudgetPlan;
use App\Models\ExpenseTransaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseTransactionSeeder extends Seeder
{
    public function run(): void
    {
        $expenseTransactions = [
            [
                'transaction_date' => '2024-01-15',
                'item_name' => 'Groceries',
                'budget_plan_id' => BudgetPlan::where('category_name', 'Food')->first()->id,
                'asset_source_id' => AssetSource::where('source_name', 'BRI Checking')->first()->id,
                'amount' => 500000,
                'week_category' => 3,
            ],
            [
                'transaction_date' => '2024-01-18',
                'item_name' => 'Gas Station',
                'budget_plan_id' => BudgetPlan::where('category_name', 'Transportation')->first()->id,
                'asset_source_id' => AssetSource::where('source_name', 'BRI Checking')->first()->id,
                'amount' => 350000,
                'week_category' => 3,
            ],
            [
                'transaction_date' => '2024-01-20',
                'item_name' => 'Netflix Subscription',
                'budget_plan_id' => BudgetPlan::where('category_name', 'Entertainment')->first()->id,
                'asset_source_id' => AssetSource::where('source_name', 'OVO Wallet')->first()->id,
                'amount' => 150000,
                'week_category' => 4,
            ],
            [
                'transaction_date' => '2024-01-22',
                'item_name' => 'Coffee & Desserts',
                'budget_plan_id' => BudgetPlan::where('category_name', 'Food')->first()->id,
                'asset_source_id' => AssetSource::where('source_name', 'OVO Wallet')->first()->id,
                'amount' => 200000,
                'week_category' => 4,
            ],
            [
                'transaction_date' => '2024-01-25',
                'item_name' => 'Shopping Mall',
                'budget_plan_id' => BudgetPlan::where('category_name', 'Shopping')->first()->id,
                'asset_source_id' => AssetSource::where('source_name', 'BRI Checking')->first()->id,
                'amount' => 2500000,
                'week_category' => 4,
            ],
        ];

        foreach ($expenseTransactions as $data) {
            $expense = ExpenseTransaction::create($data);
            if (!empty($data['asset_source_id'])) {
                AssetSource::where('id', $data['asset_source_id'])
                    ->decrement('balance', $data['amount']);
            }
        }
    }
}