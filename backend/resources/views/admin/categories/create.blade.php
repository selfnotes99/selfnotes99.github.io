@extends('admin.layouts.app')

@section('title', 'Add Category')
@section('header', 'New Category')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="mb-6 flex items-center justify-between">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Create New Category</h2>
            <p class="text-xs text-slate-500 mt-0.5">Add a new subject or grade category for products</p>
        </div>
        <a href="{{ route('admin.categories.index') }}" class="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">
            &larr; Back
        </a>
    </div>

    <form method="POST" action="{{ route('admin.categories.store') }}" class="space-y-6">
        @csrf
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div>
                <label for="name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category Name <span class="text-rose-500">*</span>
                </label>
                <input type="text" id="name" name="name" value="{{ old('name') }}" required placeholder="e.g. Class 10 Science"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white"
                    onkeyup="document.getElementById('slug').value = this.value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')">
            </div>

            <div>
                <label for="slug" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                </label>
                <input type="text" id="slug" name="slug" value="{{ old('slug') }}" placeholder="class-10-science"
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-brand-500 focus:bg-white">
            </div>

            <div>
                <label for="description" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Description
                </label>
                <textarea id="description" name="description" rows="3" placeholder="Category summary or syllabus notes..."
                    class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">{{ old('description') }}</textarea>
            </div>

            <label class="flex items-center gap-2.5 pt-2 cursor-pointer">
                <input type="checkbox" name="is_active" value="1" checked class="w-4 h-4 text-brand-600 rounded">
                <span class="text-xs font-bold text-slate-800">Active and visible in store</span>
            </label>
        </div>

        <div class="flex items-center justify-end gap-3">
            <a href="{{ route('admin.categories.index') }}" class="px-5 py-2.5 text-xs font-bold text-slate-600">Cancel</a>
            <button type="submit" class="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-md transition-all">
                Create Category
            </button>
        </div>
    </form>
</div>
@endsection
