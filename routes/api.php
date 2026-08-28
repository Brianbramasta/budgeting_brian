<?php

use App\Http\Controllers\Api\V1\AssetSourceController;
use App\Http\Controllers\Api\V1\BudgetPlanController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\ExpenseTransactionController;
use App\Http\Controllers\Api\V1\InvestmentAssetController;
use App\Http\Controllers\Api\V1\MonthlySnapshotController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
    Route::apiResource('assets', AssetSourceController::class);
    Route::apiResource('budget-plans', BudgetPlanController::class);
    Route::apiResource('expenses', ExpenseTransactionController::class);
    Route::apiResource('investments', InvestmentAssetController::class);
    Route::post('snapshots/generate', [MonthlySnapshotController::class, 'generate']);
    Route::get('snapshots/history', [MonthlySnapshotController::class, 'history']);
});