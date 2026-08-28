<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\InvestmentAsset;
use Illuminate\Http\Request;

class InvestmentAssetController extends BaseController
{
    public function index()
    {
        return $this->success(InvestmentAsset::get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'symbol' => 'required|string|max:20|unique:investment_assets',
            'asset_class' => 'required|in:CRYPTO,SAHAM,EMAS',
            'holdings_qty' => 'required|numeric|min:0',
            'avg_buy_price' => 'required|numeric|min:0',
            'current_price' => 'required|numeric|min:0',
            'recommendation_action' => 'nullable|string|max:50',
            'category' => 'sometimes|in:Core,Growth,Spekulatif',
        ]);

        $investment = InvestmentAsset::create($validated);
        return $this->success($investment, 201, 'Investment asset created successfully');
    }

    public function update(Request $request, string $id)
    {
        $asset = InvestmentAsset::findOrFail($id);

        $validated = $request->validate([
            'current_price' => 'sometimes|required|numeric|min:0',
            'holdings_qty' => 'sometimes|required|numeric|min:0',
        ]);

        $asset->update($validated);
        return $this->success($asset);
    }

    public function destroy(string $id)
    {
        $asset = InvestmentAsset::findOrFail($id);
        $asset->delete();
        return $this->success(null, 204, 'Investment asset deleted successfully');
    }
}