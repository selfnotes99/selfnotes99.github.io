@extends('admin.layouts.app')

@section('title', 'Products & Notes')
@section('header', 'Products & Notes Catalog')

@section('content')
<div class="space-y-6">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-slate-900">All Products & Digital Notes</h2>
            <p class="text-xs text-slate-500 mt-1">Manage CBSE handwritten notes, backpacks, digital guides, and accessories</p>
        </div>
        <a href="{{ route('admin.products.create') }}" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-md shadow-brand-600/20 transition-all">
            <i class="fa-solid fa-plus"></i>
            <span>Add New Product</span>
        </a>
    </div>

    <!-- Search & Filter Bar -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <form method="GET" action="{{ route('admin.products.index') }}" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Search -->
            <div class="relative sm:col-span-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products by title..."
                    class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
            </div>

            <!-- Category Filter -->
            <div class="flex items-center gap-2">
                <select name="category_id" class="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">
                    <option value="">All Categories</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>

                <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors">
                    Filter
                </button>
                @if(request('search') || request('category_id'))
                    <a href="{{ route('admin.products.index') }}" class="p-2 text-slate-400 hover:text-slate-600 rounded-xl" title="Clear Filters">
                        <i class="fa-solid fa-rotate-left"></i>
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if($products->isEmpty())
            <div class="p-16 text-center text-slate-400">
                <i class="fa-solid fa-box-open text-5xl mb-3 text-slate-300"></i>
                <h3 class="text-base font-bold text-slate-700">No products found</h3>
                <p class="text-xs text-slate-500 mt-1 mb-4">Try clearing filters or add your first note/product.</p>
                <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl">
                    <i class="fa-solid fa-plus"></i> Add Product
                </a>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th class="px-5 py-3.5">Product</th>
                            <th class="px-5 py-3.5">Category</th>
                            <th class="px-5 py-3.5">Price</th>
                            <th class="px-5 py-3.5">Stock</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($products as $product)
                            <tr class="hover:bg-slate-50/70 transition-colors">
                                <!-- Product Image & Title -->
                                <td class="px-5 py-4">
                                    <div class="flex items-center gap-3.5">
                                        @php
                                            $primaryImg = $product->images->first()->image_url ?? 'https://placehold.co/100x100?text=No+Image';
                                        @endphp
                                        <div class="relative w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            <img src="{{ $primaryImg }}" alt="{{ $product->name }}" class="w-full h-full object-contain p-1" onerror="this.src='https://placehold.co/100x100?text=Error'">
                                            @if($product->images->count() > 1)
                                                <span class="absolute bottom-0.5 right-0.5 bg-slate-900/80 text-[10px] text-white px-1 rounded font-mono font-bold">
                                                    +{{ $product->images->count() - 1 }}
                                                </span>
                                            @endif
                                        </div>
                                        <div class="min-w-0 max-w-xs sm:max-w-md">
                                            <div class="flex items-center gap-1.5 flex-wrap">
                                                <span class="font-bold text-slate-900 truncate">{{ $product->name }}</span>
                                                @if($product->badge)
                                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider {{ $product->badge_type === 'sale' ? 'bg-rose-100 text-rose-700' : ($product->badge_type === 'best' ? 'bg-amber-100 text-amber-700' : 'bg-brand-100 text-brand-700') }}">
                                                        {{ $product->badge }}
                                                    </span>
                                                @endif
                                            </div>
                                            <div class="text-xs text-slate-400 font-mono mt-0.5 truncate">/product/{{ $product->slug }}</div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Category & Collection -->
                                <td class="px-5 py-4">
                                    <div class="text-sm font-medium text-slate-800">{{ $product->category->name ?? '—' }}</div>
                                    @if($product->collection)
                                        <div class="text-xs text-slate-400 mt-0.5">{{ $product->collection->name }}</div>
                                    @endif
                                </td>

                                <!-- Price -->
                                <td class="px-5 py-4">
                                    <div class="font-black text-slate-900 text-sm">Rs {{ number_format($product->price, 2) }}</div>
                                    @if($product->old_price)
                                        <div class="text-xs text-slate-400 line-through">Rs {{ number_format($product->old_price, 2) }}</div>
                                    @endif
                                </td>

                                <!-- Stock -->
                                <td class="px-5 py-4">
                                    @if($product->stock > 10)
                                        <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                            {{ $product->stock }} in stock
                                        </span>
                                    @elseif($product->stock > 0)
                                        <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                                            {{ $product->stock }} low stock
                                        </span>
                                    @else
                                        <span class="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                                            Out of stock
                                        </span>
                                    @endif
                                </td>

                                <!-- Status -->
                                <td class="px-5 py-4">
                                    @if($product->is_active)
                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                            <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Hidden
                                        </span>
                                    @endif
                                </td>

                                <!-- Actions -->
                                <td class="px-5 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <a href="{{ route('admin.products.edit', $product) }}" class="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors" title="Edit Product">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </a>

                                        <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Are you sure you want to delete this product? This cannot be undone.');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Product">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            @if($products->hasPages())
                <div class="p-4 border-t border-slate-100">
                    {{ $products->links() }}
                </div>
            @endif
        @endif
    </div>
</div>
@endsection
