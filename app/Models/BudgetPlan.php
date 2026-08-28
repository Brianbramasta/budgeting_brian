<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BudgetPlan extends Model
{
    use HasFactory;

    /**
     * Nama tabel di database (opsional jika mengikuti konvensi penamaan standar).
     */
    protected $table = 'budget_plans';

    /**
     * Kolom yang diizinkan untuk diisi secara massal (Mass Assignment).
     */
    protected $fillable = [
        'month_year',
        'category_name',
        'unit_price',
        'planned_qty',
        // 'estimated_total' tidak perlu dimasukkan karena nilai ini dihitung otomatis oleh MySQL (Stored Generated Column)
    ];

    /**
     * Casting tipe data kolom agar sesuai format saat dibaca di Laravel.
     */
    protected $casts = [
        'month_year' => 'date',
        'unit_price' => 'decimal:2',
        'planned_qty' => 'integer',
        'estimated_total' => 'decimal:2',
    ];

    /**
     * Relasi ke model ExpenseTransaction.
     * Satu BudgetPlan bisa memiliki BANYAK ExpenseTransaction (1 to N).
     */
    public function expenseTransactions(): HasMany
    {
        return $this->hasMany(ExpenseTransaction::class, 'budget_plan_id');
    }
}