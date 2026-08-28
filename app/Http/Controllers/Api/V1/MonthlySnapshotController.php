<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AssetSource;
use App\Models\InvestmentAsset;
use App\Models\MonthlyAssetSnapshot;
use Illuminate\Http\Request;

class MonthlySnapshotController extends BaseController
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'snapshot_date' => 'sometimes|required|date',
        ]);

        $date = $validated['snapshot_date'] ?? now()->format('Y-m-d');

        $assets = AssetSource::get();
        $investments = InvestmentAsset::get();

        foreach ($assets as $asset) {
            MonthlyAssetSnapshot::create([
                'snapshot_date' => $date,
                'source_or_symbol' => $asset->source_name,
                'category_type' => 'BANK_ASSET',
                'total_value' => $asset->balance,
            ]);
        }

        foreach ($investments as $investment) {
            MonthlyAssetSnapshot::create([
                'snapshot_date' => $date,
                'source_or_symbol' => $investment->symbol,
                'category_type' => 'INVESTMENT',
                'total_value' => $investment->current_value,
            ]);
        }

        return $this->success(null, 201, 'Snapshot generated successfully');
    }

    public function history(Request $request)
    {
        $query = MonthlyAssetSnapshot::orderBy('snapshot_date', 'desc');

        if ($request->has('category_type')) {
            $query->where('category_type', $request->input('category_type'));
        }

        return $this->success($query->get());
    }
}