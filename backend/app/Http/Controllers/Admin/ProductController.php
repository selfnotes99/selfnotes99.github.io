<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'collection', 'images'])->latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        $products = $query->paginate(15)->withQueryString();
        $categories = Category::where('is_active', true)->get();

        return view('admin.products.index', compact('products', 'categories'));
    }

    public function create()
    {
        $categories = Category::where('is_active', true)->get();
        $collections = Collection::where('is_active', true)->get();

        return view('admin.products.create', compact('categories', 'collections'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'price' => 'required|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'table_of_contents' => 'nullable|string',
            'badge' => 'nullable|string|max:50',
            'badge_type' => 'nullable|string|in:sale,best,new',
            'stock' => 'nullable|integer|min:0',
            'direct_link' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'is_bestseller' => 'nullable|boolean',
            'is_sale' => 'nullable|boolean',
            'is_new' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['name']);

        // Check if slug exists
        if (Product::where('slug', $slug)->exists()) {
            $slug .= '-' . rand(100, 999);
        }

        // Process features lines
        $features = [];
        if (!empty($validated['features'])) {
            $features = array_values(array_filter(array_map('trim', preg_split('/[\r\n]+/', $validated['features']))));
        }

        // Process Table of Contents lines
        $toc = [];
        if (!empty($validated['table_of_contents'])) {
            $toc = array_values(array_filter(array_map('trim', preg_split('/[\r\n]+/', $validated['table_of_contents']))));
        }

        $discount = null;
        if (!empty($validated['old_price']) && $validated['old_price'] > $validated['price']) {
            $discount = round((($validated['old_price'] - $validated['price']) / $validated['old_price']) * 100) . '% OFF';
        }

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'price' => $validated['price'],
            'old_price' => $validated['old_price'] ?? null,
            'discount' => $discount,
            'category_id' => $validated['category_id'] ?? null,
            'collection_id' => $validated['collection_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'features' => !empty($features) ? $features : null,
            'table_of_contents' => !empty($toc) ? $toc : null,
            'badge' => $validated['badge'] ?? null,
            'badge_type' => $validated['badge_type'] ?? null,
            'stock' => $validated['stock'] ?? 50,
            'direct_link' => $validated['direct_link'] ?? null,
            'is_active' => $request->has('is_active'),
            'is_bestseller' => $request->has('is_bestseller'),
            'is_sale' => $request->has('is_sale') || !empty($validated['old_price']),
            'is_new' => $request->has('is_new'),
        ]);

        // Process Image URLs
        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $idx => $url) {
                $trimmed = trim($url);
                if (!empty($trimmed)) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $this->normalizeImageUrl($trimmed),
                        'is_primary' => $idx === 0,
                        'sort_order' => $idx + 1,
                    ]);
                }
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully!');
    }

    public function edit(Product $product)
    {
        $categories = Category::where('is_active', true)->get();
        $collections = Collection::where('is_active', true)->get();
        $product->load('images');

        return view('admin.products.edit', compact('product', 'categories', 'collections'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'price' => 'required|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'table_of_contents' => 'nullable|string',
            'badge' => 'nullable|string|max:50',
            'badge_type' => 'nullable|string|in:sale,best,new',
            'stock' => 'nullable|integer|min:0',
            'direct_link' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'is_bestseller' => 'nullable|boolean',
            'is_sale' => 'nullable|boolean',
            'is_new' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
        ]);

        $features = [];
        if (!empty($validated['features'])) {
            $features = array_values(array_filter(array_map('trim', preg_split('/[\r\n]+/', $validated['features']))));
        }

        $toc = [];
        if (!empty($validated['table_of_contents'])) {
            $toc = array_values(array_filter(array_map('trim', preg_split('/[\r\n]+/', $validated['table_of_contents']))));
        }

        $discount = null;
        if (!empty($validated['old_price']) && $validated['old_price'] > $validated['price']) {
            $discount = round((($validated['old_price'] - $validated['price']) / $validated['old_price']) * 100) . '% OFF';
        }

        $product->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['slug']),
            'price' => $validated['price'],
            'old_price' => $validated['old_price'] ?? null,
            'discount' => $discount,
            'category_id' => $validated['category_id'] ?? null,
            'collection_id' => $validated['collection_id'] ?? null,
            'description' => $validated['description'] ?? null,
            'features' => !empty($features) ? $features : null,
            'table_of_contents' => !empty($toc) ? $toc : null,
            'badge' => $validated['badge'] ?? null,
            'badge_type' => $validated['badge_type'] ?? null,
            'stock' => $validated['stock'] ?? 50,
            'direct_link' => $validated['direct_link'] ?? null,
            'is_active' => $request->has('is_active'),
            'is_bestseller' => $request->has('is_bestseller'),
            'is_sale' => $request->has('is_sale') || !empty($validated['old_price']),
            'is_new' => $request->has('is_new'),
        ]);

        // Replace images if provided
        if ($request->has('images')) {
            ProductImage::where('product_id', $product->id)->delete();
            $order = 1;
            foreach ($validated['images'] as $idx => $url) {
                $trimmed = trim($url);
                if (!empty($trimmed)) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $this->normalizeImageUrl($trimmed),
                        'is_primary' => $order === 1,
                        'sort_order' => $order++,
                    ]);
                }
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
    }

    /**
     * Convert Google Drive and cloud links to direct displayable image links
     */
    private function normalizeImageUrl(string $url): string
    {
        $clean = trim($url);

        // Google Drive file link: drive.google.com/file/d/ID/view
        if (preg_match('/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i', $clean, $matches)) {
            return "https://lh3.googleusercontent.com/d/{$matches[1]}";
        }

        // Google Drive open?id=ID or uc?id=ID
        if (preg_match('/drive\.google\.com\/[^\s?#]*[?&]id=([a-zA-Z0-9_-]+)/i', $clean, $matches)) {
            return "https://lh3.googleusercontent.com/d/{$matches[1]}";
        }

        return $clean;
    }
}
