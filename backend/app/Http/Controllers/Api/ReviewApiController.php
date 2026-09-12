<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Review::with('product')->where('is_active', true);

        if ($request->filled('product_slug')) {
            $slug = $request->input('product_slug');
            $query->whereHas('product', function ($q) use ($slug) {
                $q->where('slug', $slug);
            });
        }

        $reviews = $query->latest()->get()->map(function ($r) {
            return $r->toFrontendArray();
        });

        $avgRating = $reviews->avg('rating') ?: 5.0;
        $satisfactionRate = $avgRating >= 4.8 ? '98.4%' : round(($avgRating / 5) * 100) . '%';

        return response()->json([
            'success' => true,
            'satisfactionRate' => $satisfactionRate,
            'satisfactionHeadline' => 'Exceptional feedback from our readers 🚀',
            'totalReviews' => $reviews->count(),
            'averageRating' => round($avgRating, 1),
            'reviews' => $reviews,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_slug' => 'nullable|string',
            'username' => 'required|string|max:100',
            'user_display_name' => 'nullable|string|max:100',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $productId = null;
        if (!empty($validated['product_slug'])) {
            $product = Product::where('slug', $validated['product_slug'])->first();
            $productId = $product ? $product->id : null;
        }

        $review = Review::create([
            'product_id' => $productId,
            'username' => $validated['username'],
            'user_display_name' => $validated['user_display_name'] ?? $validated['username'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_verified' => true,
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully',
            'review' => $review->toFrontendArray(),
        ], 201);
    }
}
