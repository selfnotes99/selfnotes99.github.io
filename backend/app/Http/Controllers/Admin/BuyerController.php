<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BuyerNotification;
use App\Models\Product;
use Illuminate\Http\Request;

class BuyerController extends Controller
{
    public function index()
    {
        $buyers = BuyerNotification::latest()->paginate(20);
        $products = Product::where('is_active', true)->get();

        return view('admin.buyers.index', compact('buyers', 'products'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'time_ago' => 'nullable|string|max:100',
            'product_name' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        BuyerNotification::create([
            'name' => $validated['name'],
            'location' => $validated['location'],
            'time_ago' => $validated['time_ago'] ?: 'A few minutes ago',
            'product_name' => $validated['product_name'],
            'image' => $validated['image'] ?? null,
            'is_active' => $request->has('is_active'),
        ]);

        return back()->with('success', 'Social proof buyer notification added!');
    }

    public function update(Request $request, BuyerNotification $buyer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'time_ago' => 'nullable|string|max:100',
            'product_name' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $buyer->update([
            'name' => $validated['name'],
            'location' => $validated['location'],
            'time_ago' => $validated['time_ago'] ?: 'A few minutes ago',
            'product_name' => $validated['product_name'],
            'image' => $validated['image'] ?? null,
            'is_active' => $request->has('is_active'),
        ]);

        return back()->with('success', 'Buyer notification updated!');
    }

    public function destroy(BuyerNotification $buyer)
    {
        $buyer->delete();
        return back()->with('success', 'Buyer notification deleted!');
    }
}
