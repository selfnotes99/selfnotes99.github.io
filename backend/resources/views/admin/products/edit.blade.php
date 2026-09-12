@extends('admin.layouts.app')

@section('title', 'Edit ' . $product->name)
@section('header', 'Edit Product')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Edit Note / Product</h2>
            <p class="text-xs text-slate-500 mt-0.5">Editing: <strong class="text-slate-800">{{ $product->name }}</strong></p>
        </div>
        <div class="flex items-center gap-2">
            <a href="{{ route('admin.products.index') }}" class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <i class="fa-solid fa-arrow-left"></i>
                <span>Back</span>
            </a>
            <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Delete this product permanently?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="px-3.5 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </form>
        </div>
    </div>

    <form method="POST" action="{{ route('admin.products.update', $product) }}" class="space-y-6">
        @csrf
        @method('PUT')

        <!-- General Information Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-info-circle text-brand-600"></i> General Information
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="sm:col-span-2">
                    <label for="name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Product / Note Title <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name', $product->name) }}" required
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                </div>

                <div>
                    <label for="slug" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        URL Slug <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" id="slug" name="slug" value="{{ old('slug', $product->slug) }}" required
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white font-mono text-xs transition-colors">
                </div>

                <div>
                    <label for="stock" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Stock / Inventory Units
                    </label>
                    <input type="number" id="stock" name="stock" value="{{ old('stock', $product->stock) }}" min="0"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                </div>

                <div class="sm:col-span-2">
                    <label for="description" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Detailed Description
                    </label>
                    <textarea id="description" name="description" rows="4"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">{{ old('description', $product->description) }}</textarea>
                </div>
            </div>
        </div>

        <!-- Pricing & Organization Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-indian-rupee-sign text-brand-600"></i> Pricing & Classification
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="price" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Sale Price (Rs) <span class="text-rose-500">*</span>
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-bold text-slate-400">Rs</span>
                        <input type="number" step="0.01" id="price" name="price" value="{{ old('price', $product->price) }}" required
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                    </div>
                </div>

                <div>
                    <label for="old_price" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Original / Old Price (Rs)
                    </label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-bold text-slate-400">Rs</span>
                        <input type="number" step="0.01" id="old_price" name="old_price" value="{{ old('old_price', $product->old_price) }}"
                            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                    </div>
                </div>

                <div>
                    <label for="category_id" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Category
                    </label>
                    <select id="category_id" name="category_id" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">
                        <option value="">-- Select Category --</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="collection_id" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Collection / Group
                    </label>
                    <select id="collection_id" name="collection_id" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">
                        <option value="">-- None / General --</option>
                        @foreach($collections as $collection)
                            <option value="{{ $collection->id }}" {{ old('collection_id', $product->collection_id) == $collection->id ? 'selected' : '' }}>
                                {{ $collection->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="badge" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Badge Text
                    </label>
                    <input type="text" id="badge" name="badge" value="{{ old('badge', $product->badge) }}"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                </div>

                <div>
                    <label for="badge_type" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Badge Style Color
                    </label>
                    <select id="badge_type" name="badge_type" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">
                        <option value="best" {{ old('badge_type', $product->badge_type) == 'best' ? 'selected' : '' }}>Amber / Gold (Best Seller)</option>
                        <option value="sale" {{ old('badge_type', $product->badge_type) == 'sale' ? 'selected' : '' }}>Rose / Red (Sale / Discount)</option>
                        <option value="new" {{ old('badge_type', $product->badge_type) == 'new' ? 'selected' : '' }}>Emerald / Green (New Arrival)</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Product Images Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <i class="fa-solid fa-images text-brand-600"></i> Product Photos & Drive Links
                </h3>
                <button type="button" onclick="addImageField()" class="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <i class="fa-solid fa-plus-circle"></i> Add Image
                </button>
            </div>

            <div id="image-inputs-container" class="space-y-3">
                @if($product->images->isEmpty())
                    <div class="image-input-row flex items-center gap-3">
                        <div class="flex-1">
                            <input type="text" name="images[]" placeholder="https://... or Google Drive link"
                                class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                                onchange="previewImage(this)">
                        </div>
                        <div class="image-preview w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <i class="fa-regular fa-image text-slate-400 text-xs"></i>
                        </div>
                    </div>
                @else
                    @foreach($product->images as $img)
                        <div class="image-input-row flex items-center gap-3">
                            <div class="flex-1">
                                <input type="text" name="images[]" value="{{ $img->image_url }}"
                                    class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                                    onchange="previewImage(this)">
                            </div>
                            <div class="image-preview w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <img src="{{ $img->image_url }}" class="w-full h-full object-contain" onerror="this.parentElement.innerHTML='<span class=\'text-[9px] text-rose-500\'>Error</span>'">
                            </div>
                            <button type="button" onclick="this.parentElement.remove()" class="text-slate-400 hover:text-rose-500 p-1">
                                <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>

        <!-- Digital Delivery & TOC Card -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-brand-600"></i> Features & Table of Contents
            </h3>

            @php
                $featuresText = is_array($product->features) ? implode("\n", $product->features) : $product->features;
                $tocText = is_array($product->table_of_contents) ? implode("\n", $product->table_of_contents) : $product->table_of_contents;
            @endphp

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label for="features" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Features <span class="text-slate-400">(Enter 1 per line)</span>
                    </label>
                    <textarea id="features" name="features" rows="5"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white font-mono transition-colors">{{ old('features', $featuresText) }}</textarea>
                </div>

                <div>
                    <label for="table_of_contents" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Table of Contents / Chapters <span class="text-slate-400">(Enter 1 per line)</span>
                    </label>
                    <textarea id="table_of_contents" name="table_of_contents" rows="5"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white font-mono transition-colors">{{ old('table_of_contents', $tocText) }}</textarea>
                </div>

                <div class="sm:col-span-2">
                    <label for="direct_link" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Direct Download / PDF Drive Link
                    </label>
                    <input type="text" id="direct_link" name="direct_link" value="{{ old('direct_link', $product->direct_link) }}"
                        class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
                </div>
            </div>
        </div>

        <!-- Visibility Flags -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-toggle-on text-brand-600"></i> Store Visibility
            </h3>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label class="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/60">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', $product->is_active) ? 'checked' : '' }} class="w-4 h-4 text-brand-600 rounded">
                    <span class="text-xs font-bold text-slate-800">Active in Store</span>
                </label>

                <label class="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/60">
                    <input type="checkbox" name="is_bestseller" value="1" {{ old('is_bestseller', $product->is_bestseller) ? 'checked' : '' }} class="w-4 h-4 text-brand-600 rounded">
                    <span class="text-xs font-bold text-slate-800">Bestseller</span>
                </label>

                <label class="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/60">
                    <input type="checkbox" name="is_sale" value="1" {{ old('is_sale', $product->is_sale) ? 'checked' : '' }} class="w-4 h-4 text-brand-600 rounded">
                    <span class="text-xs font-bold text-slate-800">On Sale</span>
                </label>

                <label class="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/60">
                    <input type="checkbox" name="is_new" value="1" {{ old('is_new', $product->is_new) ? 'checked' : '' }} class="w-4 h-4 text-brand-600 rounded">
                    <span class="text-xs font-bold text-slate-800">New Arrival</span>
                </label>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end gap-3 pt-2">
            <a href="{{ route('admin.products.index') }}" class="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800">
                Cancel
            </a>
            <button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 transition-all">
                <i class="fa-solid fa-save"></i>
                <span>Save Changes</span>
            </button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    function addImageField() {
        const container = document.getElementById('image-inputs-container');
        const row = document.createElement('div');
        row.className = 'image-input-row flex items-center gap-3';
        row.innerHTML = `
            <div class="flex-1">
                <input type="text" name="images[]" placeholder="https://example.com/photo.jpg or Google Drive link"
                    class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    onchange="previewImage(this)">
            </div>
            <div class="image-preview w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <i class="fa-regular fa-image text-slate-400 text-xs"></i>
            </div>
            <button type="button" onclick="this.parentElement.remove()" class="text-slate-400 hover:text-rose-500 p-1">
                <i class="fa-solid fa-trash-can text-xs"></i>
            </button>
        `;
        container.appendChild(row);
    }

    function previewImage(input) {
        let val = input.value.trim();
        const preview = input.closest('.image-input-row').querySelector('.image-preview');
        
        const driveMatch = val.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i) ||
                           val.match(/drive\.google\.com\/[^\s?#]*[?&]id=([a-zA-Z0-9_-]+)/i);
        if (driveMatch) {
            val = `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
        }

        if (val) {
            preview.innerHTML = `<img src="${val}" class="w-full h-full object-contain" onerror="this.parentElement.innerHTML='<span class=\\'text-[9px] text-rose-500\\'>Error</span>'">`;
        } else {
            preview.innerHTML = `<i class="fa-regular fa-image text-slate-400 text-xs"></i>`;
        }
    }
</script>
@endpush
