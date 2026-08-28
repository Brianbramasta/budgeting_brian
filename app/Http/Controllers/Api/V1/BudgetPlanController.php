<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\BudgetPlan;
use Illuminate\Http\Request;

class BudgetPlanController extends BaseController
{
    public function index(Request $request)
    {
        $query = BudgetPlan::query();

        if ($request->has('month')) {
            $query->where('month_year', $request->input('month'));
        }

        $plans = $query->orderBy('month_year', 'desc')->get();
        return $this->success($plans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'month_year' => 'required|date',
            'category_name' => 'required|string|max:255',
            'unit_price' => 'required|numeric|min:0',
            'planned_qty' => 'required|integer|min:1',
        ]);

        $budget = BudgetPlan::create($validated);
        return $this->success($budget, 201, 'Budget plan created successfully');
    }

    public function show($id)
    {
        $budget = BudgetPlan::findOrFail($id);
        return $this->success($budget);
    }

    public function update(Request $request, string $id)
    {
        $budget = BudgetPlan::findOrFail($id);

        $validated = $request->validate([
            'month_year' => 'sometimes|required|date',
            'category_name' => 'sometimes|required|string|max:255',
            'unit_price' => 'sometimes|required|numeric|min:0',
            'planned_qty' => 'sometimes|required|integer|min:1',
        ]);

        $budget->update($validated);
        return $this->success($budget);
    }

    public function destroy(string $id)
    {
        $budget = BudgetPlan::findOrFail($id);
        $budget->delete();
        return $this->success(null, 204, 'Budget plan deleted successfully');
    }
}