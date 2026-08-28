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
        'holdings_qty' => 'decimal:8', // Presisi 8 digit desimal untuk Kripto (e.g. BTC)
        'avg_buy_price' => 'decimal:2',
        'current_price' => 'decimal:2',
    ];

    /**
     * Accessor dinamis untuk menghitung total nilai pasar aset (Current Value dalam Rp).
     * Bisa dipanggil langsung via: $asset->current_value
     */
    public function getCurrentValueAttribute(): float
    {
        return (float) ($this->holdings_qty * $this->current_price);
    }

    /**
     * Accessor dinamis untuk menghitung Profit/Loss dalam Rupiah.
     * Bisa dipanggil langsung via: $asset->unrealized_pl
     */
    public function getUnrealizedPlAttribute(): float
    {
        return (float) (($this->current_price - $this->avg_buy_price) * $this->holdings_qty);
    }
}