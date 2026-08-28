<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AssetSource;
use App\Models\ExpenseTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpenseTransactionController extends BaseController
{
    public function index(Request $request)
    {
        $query = ExpenseTransaction::with(['budgetPlan', 'assetSource']);

        if ($request->has('date_from')) {
            $query->where('transaction_date', '>=', $request->input('date_from'));
        }

        if ($request->has('date_to')) {
            $query->where('transaction_date', '<=', $request->input('date_to'));
        }

        $expenses = $query->orderBy('transaction_date', 'desc')->get();
        return $this->success($expenses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'item_name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'budget_plan_id' => 'nullable|exists:budget_plans,id',
            'asset_source_id' => 'nullable|exists:asset_sources,id',
            'week_category' => 'nullable|integer|min:1|max:53',
        ]);

        $expense = DB::transaction(function () use ($validated) {
            $expense = ExpenseTransaction::create($validated);

            if (!empty($validated['asset_source_id'])) {
                AssetSource::where('id', $validated['asset_source_id'])
                    ->decrement('balance', $validated['amount']);
            }

            return $expense;
        });

        return $this->success($expense, 201, 'Expense transaction created successfully');
    }

    public function show($id)
    {
        $expense = ExpenseTransaction::with(['budgetPlan', 'assetSource'])->findOrFail($id);
        return $this->success($expense);
    }

    public function update(Request $request, string $id)
    {
        $expense = ExpenseTransaction::findOrFail($id);

        $validated = $request->validate([
            'transaction_date' => 'sometimes|required|date',
            'item_name' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric|min:0.01',
            'budget_plan_id' => 'sometimes|nullable|exists:budget_plans,id',
            'asset_source_id' => 'sometimes|nullable|exists:asset_sources,id',
            'week_category' => 'sometimes|nullable|integer|min:1|max:53',
        ]);

        $expense->update($validated);
        return $this->success($expense);
    }

    public function destroy(string $id)
    {
        $expense = ExpenseTransaction::findOrFail($id);
        $expense->delete();
        return $this->success(null, 204, 'Expense transaction deleted successfully');
    }
}