<?php

namespace Database\Seeders;

use App\Models\AssetSource;
use App\Models\InvestmentAsset;
use App\Models\MonthlyAssetSnapshot;
use Illuminate\Database\Seeder;

class MonthlyAssetSnapshotSeeder extends Seeder
{
    public function run(): void
    {
        $snapshots = [
            [
                'snapshot_date' => '2024-01-31',
                'source_or_symbol' => 'BRI Checking',
                'category_type' => 'BANK_ASSET',
                'total_value' => 14500000,
            ],
            [
                'snapshot_date' => '2024-01-31',
                'source_or_symbol' => 'BCA Savings',
                'category_type' => 'BANK_ASSET',
                'total_value' => 8000000,
            ],
            [
                'snapshot_date' => '2024-01-31',
                'source_or_symbol' => 'OVO Wallet',
                'category_type' => 'BANK_ASSET',
                'total_value' => 350000,
            ],
            [
                'snapshot_date' => '2024-01-31',
                'source_or_symbol' => 'BTC-USDT',
                'category_type' => 'INVESTMENT',
                'total_value' => 25000000,
            ],
            [
                'snapshot_date' => '2024-01-31',
                'source_or_symbol' => 'ETH-USDT',
                'category_type' => 'INVESTMENT',
                'total_value' => 7000000,
            ],
        ];

        foreach ($snapshots as $data) {
            MonthlyAssetSnapshot::create($data);
        }
    }
}