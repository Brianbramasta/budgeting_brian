<?php

namespace Database\Seeders;

use App\Models\SavingsPocket;
use Illuminate\Database\Seeder;

class SavingsPocketSeeder extends Seeder
{
    public function run(): void
    {
        $savingsPockets = [
            [
                'pocket_name' => 'Emergency Fund',
                'allocation_percentage' => 0.4000,
            ],
            [
                'pocket_name' => 'Retirement',
                'allocation_percentage' => 0.3000,
            ],
            [
                'pocket_name' => 'Travel Fund',
                'allocation_percentage' => 0.1500,
            ],
            [
                'pocket_name' => 'Education',
                'allocation_percentage' => 0.1000,
            ],
            [
                'pocket_name' => 'Investment Reserve',
                'allocation_percentage' => 0.0500,
            ],
        ];

        foreach ($savingsPockets as $data) {
            SavingsPocket::create($data);
        }
    }
}