<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('budget_plans', function (Blueprint $table) {
            $table->id();
            $table->date('month_year');
            $table->string('category_name', 100);
            $table->decimal('unit_price', 15, 2)->default(0.00);
            $table->integer('planned_qty')->default(1);
            
            // Ganti bagian rawColumn menjadi ini:
            $table->decimal('estimated_total', 15, 2)->storedAs('unit_price * planned_qty');
            
            $table->timestamps();

            $table->unique(['month_year', 'category_name'], 'uq_month_category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_plans');
    }
};
