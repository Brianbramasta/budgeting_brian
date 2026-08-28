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
        Schema::create('expense_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->string('item_name');
            $table->foreignId('budget_plan_id')->nullable()->constrained('budget_plans')->nullOnDelete();
            $table->foreignId('asset_source_id')->nullable()->constrained('asset_sources')->nullOnDelete();
            $table->decimal('amount', 15, 2)->default(0.00);
            $table->integer('week_category')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_transactions');
    }
};
