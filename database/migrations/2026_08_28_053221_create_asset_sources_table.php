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
        Schema::create('asset_sources', function (Blueprint $table) {
           $table->id();
            $table->string('source_name', 100)->unique();
            $table->enum('asset_type', ['OBLIGASI', 'SAHAM', 'REKSADANA', 'EMAS', 'BANK', 'INVESTASI_LAIN']);
            $table->decimal('balance', 15, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_sources');
    }
};
