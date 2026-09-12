@extends('admin.layouts.app')

@section('title', 'Collections')
@section('header', 'Collections')

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Featured Collections</h2>
            <p class="text-xs text-slate-500 mt-0.5">Group related CBSE notes, exam bundles, and study essentials into curated collections</p>
        </div>
        <a href="{{ route('admin.collections.create') }}" class="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all">
            <i class="fa-solid fa-plus"></i> Add Collection
        </a>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if($collections->isEmpty())
            <div class="p-12 text-center text-slate-400">
                <i class="fa-solid fa-layer-group text-4xl mb-3 text-slate-300"></i>
                <p class="text-sm">No collections created yet.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th class="px-5 py-3.5">Collection Name</th>
                            <th class="px-5 py-3.5">Slug</th>
                            <th class="px-5 py-3.5">Products Count</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($collections as $collection)
                            <tr class="hover:bg-slate-50/70 transition-colors">
                                <td class="px-5 py-4">
                                    <div class="font-bold text-slate-900">{{ $collection->name }}</div>
                                    @if($collection->description)
                                        <div class="text-xs text-slate-400 mt-0.5 line-clamp-1">{{ $collection->description }}</div>
                                    @endif
                                </td>
                                <td class="px-5 py-4 font-mono text-xs text-slate-500">{{ $collection->slug }}</td>
                                <td class="px-5 py-4">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                                        {{ $collection->products_count }} {{ Str::plural('product', $collection->products_count) }}
                                    </span>
                                </td>
                                <td class="px-5 py-4">
                                    @if($collection->is_active)
                                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            Active
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                            Hidden
                                        </span>
                                    @endif
                                </td>
                                <td class="px-5 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <a href="{{ route('admin.collections.edit', $collection) }}" class="p-2 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-slate-100" title="Edit">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <form method="POST" action="{{ route('admin.collections.destroy', $collection) }}" onsubmit="return confirm('Delete this collection?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50" title="Delete">
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
        @endif
    </div>
</div>
@endsection
