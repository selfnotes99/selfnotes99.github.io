<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    /**
     * Get all active products with optional search, category, and sorting filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'collection', 'images'])
            ->where('is_active', true);

        // Filter by category slug
        if ($request->filled('category')) {
            $catSlug = $request->input('category');
            if ($catSlug !== 'all') {
                $query->whereHas('category', function ($q) use ($catSlug) {
                    $q->where('slug', $catSlug);
                });
            }
        }

        // Filter by collection slug
        if ($request->filled('collection')) {
            $colSlug = $request->input('collection');
            if ($colSlug !== 'all') {
                $query->whereHas('collection', function ($q) use ($colSlug) {
                    $q->where('slug', $colSlug);
                });
            }
        }

        // Search query
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sort = $request->input('sort', 'featured');
        switch ($sort) {
            case 'price-low':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            case 'bestseller':
                $query->orderBy('is_bestseller', 'desc')->orderBy('rating', 'desc');
                break;
            case 'featured':
            default:
                $query->orderBy('featured_order', 'asc')->latest();
                break;
        }

        $products = $query->get()->map(function (Product $p) {
            return $p->toFrontendArray();
        });

        return response()->json([
            'success' => true,
            'count' => $products->count(),
            'data' => $products,
            'products' => $products,
        ]);
    }

    /**
     * Get single product by slug or id.
     */
    public function show(string $slug): JsonResponse
    {
        $clean = strtolower(trim($slug));
        
        $product = Product::with(['category', 'collection', 'images', 'reviews'])
            ->where('is_active', true)
            ->where(function ($q) use ($clean) {
                $q->where('slug', $clean)
                  ->orWhere('id', $clean);
            })
            ->first();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }

        $arr = $product->toFrontendArray();
        return response()->json([
            'success' => true,
            'data' => $arr,
            'product' => $arr,
        ]);
    }
}
