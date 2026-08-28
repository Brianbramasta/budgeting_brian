<?php

namespace Database\Seeders;

use App\Models\AssetSource;
use App\Models\BudgetPlan;
use App\Models\ExpenseTransaction;
use App\Models\InvestmentAsset;
use App\Models\MonthlyAssetSnapshot;
use App\Models\SavingsPocket;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AssetSourceSeeder::class,
            BudgetPlanSeeder::class,
            ExpenseTransactionSeeder::class,
            InvestmentAssetSeeder::class,
            MonthlyAssetSnapshotSeeder::class,
            SavingsPocketSeeder::class,
        ]);
    }
}