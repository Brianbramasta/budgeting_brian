<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    protected function success($data, int $status = 200, string $message = 'Success')
    {
        return response()->json([
            'meta' => [
                'status' => $status,
                'message' => $message,
            ],
            'data' => $data,
        ], $status);
    }

    protected function error($message, int $status = 400, $data = null)
    {
        return response()->json([
            'meta' => [
                'status' => $status,
                'message' => $message,
            ],
            'data' => $data,
        ], $status);
    }
}