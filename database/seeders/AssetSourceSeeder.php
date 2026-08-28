<?php

namespace Database\Seeders;

use App\Models\AssetSource;
use Illuminate\Database\Seeder;

class AssetSourceSeeder extends Seeder
{
    public function run(): void
    {
        $assetSources = [
            [
                'source_name' => 'BRI Checking',
                'asset_type' => 'BANK',
                'balance' => 15000000,
            ],
            [
                'source_name' => 'BCA Savings',
                'asset_type' => 'BANK',
                'balance' => 8000000,
            ],
            [
                'source_name' => 'OVO Wallet',
                'asset_type' => 'INVESTASI_LAIN',
                'balance' => 500000,
            ],
            [
                'source_name' => 'Mandiri Emergency Fund',
                'asset_type' => 'BANK',
                'balance' => 10000000,
            ],
            [
                'source_name' => 'Stock Brokerage',
                'asset_type' => 'REKSADANA',
                'balance' => 2500000,
            ],
        ];

        foreach ($assetSources as $data) {
            AssetSource::create($data);
        }
    }
}