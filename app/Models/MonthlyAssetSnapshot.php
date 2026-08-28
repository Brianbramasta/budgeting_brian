<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyAssetSnapshot extends Model
{
    use HasFactory;

    protected $table = 'monthly_asset_snapshots';

    protected $fillable = [
        'snapshot_date',
        'source_or_symbol',
        'category_type',
        'total_value',
    ];

    protected $casts = [
        'snapshot_date' => 'date',
        'total_value' => 'decimal:2',
    ];
}