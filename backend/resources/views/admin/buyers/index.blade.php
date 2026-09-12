@extends('admin.layouts.app')

@section('title', 'Social Proof')
@section('header', 'Live Buyer Notifications (Social Proof)')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Recent Buyer Notifications</h2>
            <p class="text-xs text-slate-500 mt-0.5">Control the high-converting social proof popup alerts displayed on the storefront</p>
        </div>
        <button onclick="document.getElementById('add-buyer-modal').classList.remove('hidden')" class="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all">
            <i class="fa-solid fa-plus"></i> Add Notification
        </button>
    </div>

    <!-- Table of Buyers -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if($buyers->isEmpty())
            <div class="p-16 text-center text-slate-400">
                <i class="fa-solid fa-bell-slash text-5xl mb-3 text-slate-300"></i>
                <h3 class="text-base font-bold text-slate-700">No buyer notifications yet</h3>
                <p class="text-xs text-slate-500 mt-1 mb-4">Add real or promotional purchase alerts to boost customer trust.</p>
                <button onclick="document.getElementById('add-buyer-modal').classList.remove('hidden')" class="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl">
                    Add First Notification
                </button>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th class="px-5 py-3.5">Customer</th>
                            <th class="px-5 py-3.5">Location</th>
                            <th class="px-5 py-3.5">Product Purchased</th>
                            <th class="px-5 py-3.5">Time Ago</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($buyers as $buyer)
                            <tr class="hover:bg-slate-50/70 transition-colors">
                                <td class="px-5 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                                            {{ strtoupper(substr($buyer->name, 0, 1)) }}
                                        </div>
                                        <div class="font-bold text-slate-900">{{ $buyer->name }}</div>
                                    </div>
                                </td>
                                <td class="px-5 py-4 text-xs text-slate-600">
                                    <i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> {{ $buyer->location }}
                                </td>
                                <td class="px-5 py-4">
                                    <div class="text-xs font-semibold text-slate-800 line-clamp-1">{{ $buyer->product_name ?? 'CBSE Notes' }}</div>
                                </td>
                                <td class="px-5 py-4 text-xs text-slate-400">
                                    {{ $buyer->time_ago }}
                                </td>
                                <td class="px-5 py-4">
                                    @if($buyer->is_active)
                                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                            Hidden
                                        </span>
                                    @endif
                                </td>
                                <td class="px-5 py-4 text-right">
                                    <form method="POST" action="{{ route('admin.buyers.destroy', $buyer) }}" onsubmit="return confirm('Delete this notification?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50" title="Delete">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            @if($buyers->hasPages())
                <div class="p-4 border-t border-slate-100">
                    {{ $buyers->links() }}
                </div>
            @endif
        @endif
    </div>
</div>

<!-- Add Buyer Modal -->
<div id="add-buyer-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 hidden">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-base">Add Social Proof Notification</h3>
            <button onclick="document.getElementById('add-buyer-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <form method="POST" action="{{ route('admin.buyers.store') }}" class="space-y-4">
            @csrf
            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Buyer Name</label>
                <input type="text" name="name" required placeholder="e.g. Priyanshu M." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">City / State</label>
                <input type="text" name="location" required placeholder="e.g. New Delhi, India" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Product Purchased</label>
                <input type="text" name="product_name" list="product-list" required placeholder="e.g. Class 10 Handwritten Science Notes" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                <datalist id="product-list">
                    @foreach($products as $prod)
                        <option value="{{ $prod->name }}"></option>
                    @endforeach
                </datalist>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Time Ago Text</label>
                <input type="text" name="time_ago" placeholder="e.g. 5 minutes ago" value="A few minutes ago" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
            </div>

            <label class="flex items-center gap-2 cursor-pointer pt-1">
                <input type="checkbox" name="is_active" value="1" checked class="w-4 h-4 text-brand-600 rounded">
                <span class="text-xs font-bold text-slate-800">Show actively on store popups</span>
            </label>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('add-buyer-modal').classList.add('hidden')" class="px-4 py-2 text-xs font-semibold text-slate-500">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md">Add Notification</button>
            </div>
        </form>
    </div>
</div>
@endsection
