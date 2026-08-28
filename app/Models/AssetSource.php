<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssetSource extends Model
{
    use HasFactory;

    protected $table = 'asset_sources';

    protected $fillable = [
        'source_name',
        'asset_type',
        'balance',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    /**
     * Relasi ke transaksi pengeluaran.
     */
    public function expenseTransactions(): HasMany
    {
        return $this->hasMany(ExpenseTransaction::class, 'asset_source_id');
    }
}