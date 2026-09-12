<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with('product')->latest();

        if ($request->filled('product_id')) {
            $query->where('product_id', $request->input('product_id'));
        }

        $reviews = $query->paginate(20)->withQueryString();
        $products = Product::where('is_active', true)->get();

        return view('admin.reviews.index', compact('reviews', 'products'));
    }

    public function reply(Request $request, Review $review)
    {
        $validated = $request->validate([
            'reply_author' => 'nullable|string|max:100',
            'reply_text' => 'required|string',
        ]);

        $review->update([
            'reply_author' => $validated['reply_author'] ?: 'Self Notes Team',
            'reply_text' => $validated['reply_text'],
        ]);

        return back()->with('success', 'Admin reply posted to review!');
    }

    public function toggleStatus(Review $review)
    {
        $review->update(['is_active' => !$review->is_active]);
        return back()->with('success', 'Review visibility status updated!');
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return back()->with('success', 'Review deleted!');
    }
}
