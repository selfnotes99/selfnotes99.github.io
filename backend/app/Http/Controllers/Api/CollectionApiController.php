<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\JsonResponse;

class CollectionApiController extends Controller
{
    public function index(): JsonResponse
    {
        $collections = Collection::withCount(['products' => function ($q) {
            $q->where('is_active', true);
        }])
        ->where('is_active', true)
        ->get()
        ->map(function ($col) {
            return [
                'id' => $col->id,
                'name' => $col->name,
                'slug' => $col->slug,
                'description' => $col->description,
                'image' => $col->image,
                'count' => $col->products_count,
            ];
        });

        return response()->json([
            'success' => true,
            'collections' => $collections,
        ]);
    }
}
