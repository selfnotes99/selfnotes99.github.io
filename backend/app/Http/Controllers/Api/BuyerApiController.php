<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BuyerNotification;
use Illuminate\Http\JsonResponse;

class BuyerApiController extends Controller
{
    public function index(): JsonResponse
    {
        $buyers = BuyerNotification::where('is_active', true)
            ->latest()
            ->take(15)
            ->get()
            ->map(function ($b) {
                return $b->toFrontendArray();
            });

        return response()->json([
            'success' => true,
            'buyers' => $buyers,
        ]);
    }
}
