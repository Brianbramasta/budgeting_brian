<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestmentAsset extends Model
{
    use HasFactory;

    protected $table = 'investment_assets';

    protected $fillable = [
        'symbol',
        'asset_class',
        'holdings_qty',
        'avg_buy_price',
        'current_price',
        'recommendation_action',
        'category',
    ];

    protected $casts = [
        'holdings_qty' => 'decimal:8',
        'avg_buy_price' => 'decimal:2',
        'current_price' => 'decimal:2',
    ];

    public function getCurrentValueAttribute(): float
    {
        return (float) ($this->holdings_qty * $this->current_price);
    }

    public function getUnrealizedPlAttribute(): float
    {
        return (float) (($this->current_price - $this->avg_buy_price) * $this->holdings_qty);
    }
}