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
        Schema::create('investment_assets', function (Blueprint $table) {
            $table->id();
            $table->string('symbol', 20)->unique();
            $table->enum('asset_class', ['CRYPTO', 'SAHAM', 'EMAS']);
            $table->decimal('holdings_qty', 24, 8)->default(0.00000000); // Presisi tinggi untuk kripto
            $table->decimal('avg_buy_price', 15, 2)->default(0.00);
            $table->decimal('current_price', 15, 2)->default(0.00);
            $table->string('recommendation_action', 50)->nullable();
            $table->enum('category', ['Core', 'Growth', 'Spekulatif'])->default('Core');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investment_assets');
    }
};
