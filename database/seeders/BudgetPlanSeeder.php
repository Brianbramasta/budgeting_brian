<?php

namespace Database\Seeders;

use App\Models\BudgetPlan;
use Illuminate\Database\Seeder;

class BudgetPlanSeeder extends Seeder
{
    public function run(): void
    {
        $budgetPlans = [
            [
                'month_year' => '2024-01-01',
                'category_name' => 'Food',
                'unit_price' => 500000,
                'planned_qty' => 4,
            ],
            [
                'month_year' => '2024-01-01',
                'category_name' => 'Transportation',
                'unit_price' => 300000,
                'planned_qty' => 4,
            ],
            [
                'month_year' => '2024-01-01',
                'category_name' => 'Entertainment',
                'unit_price' => 150000,
                'planned_qty' => 4,
            ],
            [
                'month_year' => '2024-01-01',
                'category_name' => 'Shopping',
                'unit_price' => 500000,
                'planned_qty' => 2,
            ],
            [
                'month_year' => '2024-01-01',
                'category_name' => 'Utilities',
                'unit_price' => 200000,
                'planned_qty' => 1,
            ],
        ];

        foreach ($budgetPlans as $data) {
            BudgetPlan::create($data);
        }
    }
}