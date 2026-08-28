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
        Schema::create('savings_pockets', function (Blueprint $table) {
            $table->id();
            $table->string('pocket_name', 100)->unique();
            $table->decimal('allocation_percentage', 5, 4); // contoh: 0.5000 = 50%
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('savings_pockets');
    }
};
