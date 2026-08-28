<?php

namespace Database\Seeders;

use App\Models\InvestmentAsset;
use Illuminate\Database\Seeder;

class InvestmentAssetSeeder extends Seeder
{
    public function run(): void
    {
        $investmentAssets = [
            [
                'symbol' => 'BTC-USDT',
                'asset_class' => 'CRYPTO',
                'holdings_qty' => 0.5,
                'avg_buy_price' => 40000000,
                'current_price' => 50000000,
                'recommendation_action' => 'HODL',
                'category' => 'Core',
            ],
            [
                'symbol' => 'ETH-USDT',
                'asset_class' => 'CRYPTO',
                'holdings_qty' => 2.0,
                'avg_buy_price' => 3000000,
                'current_price' => 3500000,
                'recommendation_action' => 'accumulate',
                'category' => 'Core',
            ],
            [
                'symbol' => 'BBRI-JK',
                'asset_class' => 'SAHAM',
                'holdings_qty' => 100,
                'avg_buy_price' => 4500,
                'current_price' => 5200,
                'recommendation_action' => 'buy',
                'category' => 'Growth',
            ],
            [
                'symbol' => 'BMRI-JK',
                'asset_class' => 'SAHAM',
                'holdings_qty' => 50,
                'avg_buy_price' => 6000,
                'current_price' => 6500,
                'recommendation_action' => 'hold',
                'category' => 'Core',
            ],
            [
                'symbol' => 'GOLD-IND',
                'asset_class' => 'EMAS',
                'holdings_qty' => 100,
                'avg_buy_price' => 200000,
                'current_price' => 220000,
                'recommendation_action' => 'hold',
                'category' => 'Core',
            ],
        ];

        foreach ($investmentAssets as $data) {
            InvestmentAsset::create($data);
        }
    }
}