<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AssetSource;
use Illuminate\Http\Request;

class AssetSourceController extends BaseController
{
    public function index()
    {
        $assets = AssetSource::orderBy('source_name')->get();
        return $this->success($assets);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'source_name' => 'required|string|max:255',
            'asset_type'  => 'required|in:OBLIGASI,SAHAM,REKSADANA,EMAS,BANK,INVESTASI_LAIN',
            'balance' => 'required|numeric|min:0',
        ]);

        $asset = AssetSource::create($validated);
        return $this->success($asset, 201, 'Asset created successfully');
    }

    public function update(Request $request, string $id)
    {
        $asset = AssetSource::findOrFail($id);

        $validated = $request->validate([
            'source_name' => 'sometimes|required|string|max:255',
            'asset_type' => 'sometimes|required|in:OBLIGASI,SAHAM,REKSADANA,EMAS,BANK,INVESTASI_LAIN',
            'balance' => 'sometimes|required|numeric|min:0',
        ]);

        $asset->update($validated);

        return $this->success($asset);
    }

    public function destroy(string $id)
    {
        $asset = AssetSource::findOrFail($id);
        $asset->delete();
        return $this->success(null, 204, 'Asset deleted successfully');
    }
}