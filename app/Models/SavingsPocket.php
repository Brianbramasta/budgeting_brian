<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavingsPocket extends Model
{
    use HasFactory;

    protected $table = 'savings_pockets';

    protected $fillable = [
        'pocket_name',
        'allocation_percentage',
    ];

    protected $casts = [
        'allocation_percentage' => 'decimal:4', // Presisi misal 0.5000 = 50%
    ];
}