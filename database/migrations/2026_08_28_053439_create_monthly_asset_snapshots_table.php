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
        Schema::create('monthly_asset_snapshots', function (Blueprint $table) {
           $table->id();
            $table->date('snapshot_date');
            $table->string('source_or_symbol', 100);
            $table->enum('category_type', ['BANK_ASSET', 'INVESTMENT']);
            $table->decimal('total_value', 15, 2)->default(0.00);
            $table->timestamps();

            $table->unique(['snapshot_date', 'source_or_symbol'], 'uq_snapshot_item');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_asset_snapshots');
    }
};
