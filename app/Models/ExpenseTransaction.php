<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseTransaction extends Model
{
    use HasFactory;

    protected $table = 'expense_transactions';

    protected $fillable = [
        'transaction_date',
        'item_name',
        'budget_plan_id',
        'asset_source_id',
        'amount',
        'week_category',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'week_category' => 'integer',
    ];

    /**
     * Relasi balik ke BudgetPlan (kategori anggaran).
     */
    public function budgetPlan(): BelongsTo
    {
        return $this->belongsTo(BudgetPlan::class, 'budget_plan_id');
    }

    /**
     * Relasi balik ke AssetSource (sumber rekening/dompet).
     */
    public function assetSource(): BelongsTo
    {
        return $this->belongsTo(AssetSource::class, 'asset_source_id');
    }
}