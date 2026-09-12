@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('header', 'Overview Dashboard')

@section('content')
<div class="space-y-8">
    <!-- Top Greeting & Quick Action Banner -->
    <div class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div class="relative z-10 max-w-2xl">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-3">
                <i class="fa-solid fa-sparkles"></i> Store Online & Live
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome to SelfNotes99 CMS!</h2>
            <p class="mt-2 text-sm text-slate-300">
                Manage your notes catalog, CBSE PDFs, digital products, orders, live social proof notifications, and store settings from one centralized control center.
            </p>
            <div class="mt-5 flex flex-wrap gap-3">
                <a href="{{ route('admin.products.create') }}" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all">
                    <i class="fa-solid fa-plus"></i> Add New Product / Note
                </a>
                <a href="{{ route('admin.orders.index') }}" class="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-all">
                    <i class="fa-solid fa-bag-shopping"></i> View Orders
                </a>
                <a href="{{ route('admin.buyers.index') }}" class="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/80 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-all">
                    <i class="fa-solid fa-bell"></i> Social Proof
                </a>
            </div>
        </div>
        <div class="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none hidden md:block">
            <i class="fa-solid fa-graduation-cap text-[14rem]"></i>
        </div>
    </div>

    <!-- Analytics Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Revenue Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base">
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                </div>
            </div>
            <div class="mt-3">
                <div class="text-2xl font-black text-slate-900">Rs {{ number_format($stats['total_revenue'], 2) }}</div>
                <span class="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                    <i class="fa-solid fa-arrow-trend-up"></i> All successful orders
                </span>
            </div>
        </div>

        <!-- Orders Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
            <div class="mt-3">
                <div class="text-2xl font-black text-slate-900">{{ $stats['total_orders'] }}</div>
                <span class="text-xs font-semibold text-amber-600 flex items-center gap-1 mt-1">
                    <i class="fa-solid fa-clock"></i> {{ $stats['pending_orders'] }} Pending
                </span>
            </div>
        </div>

        <!-- Products Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Products & Notes</span>
                <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-base">
                    <i class="fa-solid fa-book"></i>
                </div>
            </div>
            <div class="mt-3">
                <div class="text-2xl font-black text-slate-900">{{ $stats['total_products'] }}</div>
                <span class="text-xs font-semibold text-teal-600 flex items-center gap-1 mt-1">
                    <i class="fa-solid fa-check-circle"></i> {{ $stats['active_products'] }} Active in Store
                </span>
            </div>
        </div>

        <!-- Social Proof / Reviews Card -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Engagement</span>
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <div class="mt-3">
                <div class="text-2xl font-black text-slate-900">{{ $stats['total_reviews'] }} Reviews</div>
                <span class="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1">
                    <i class="fa-solid fa-bell"></i> {{ $stats['total_buyers'] }} Social Proof alerts
                </span>
            </div>
        </div>
    </div>

    <!-- Two Column Grid: Recent Orders & Recent Products -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Orders (2 Columns) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-brand-500"></div>
                    <h3 class="font-bold text-slate-900">Recent Customer Orders</h3>
                </div>
                <a href="{{ route('admin.orders.index') }}" class="text-xs font-bold text-brand-600 hover:text-brand-700">
                    View All Orders <i class="fa-solid fa-arrow-right ml-1"></i>
                </a>
            </div>

            @if($recentOrders->isEmpty())
                <div class="p-12 text-center text-slate-400">
                    <i class="fa-solid fa-basket-shopping text-4xl mb-3 text-slate-300"></i>
                    <p class="text-sm">No orders received yet.</p>
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th class="px-5 py-3">Order</th>
                                <th class="px-5 py-3">Customer</th>
                                <th class="px-5 py-3">Amount</th>
                                <th class="px-5 py-3">Status</th>
                                <th class="px-5 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            @foreach($recentOrders as $order)
                                <tr class="hover:bg-slate-50/80 transition-colors">
                                    <td class="px-5 py-4 font-mono font-bold text-slate-800 text-xs">
                                        #{{ $order->order_number }}
                                        <div class="text-[11px] font-sans font-normal text-slate-400">{{ $order->created_at->diffForHumans() }}</div>
                                    </td>
                                    <td class="px-5 py-4">
                                        <div class="font-medium text-slate-800">{{ $order->customer_name }}</div>
                                        <div class="text-xs text-slate-400">{{ $order->customer_phone ?? $order->customer_email }}</div>
                                    </td>
                                    <td class="px-5 py-4 font-bold text-slate-900">
                                        Rs {{ number_format($order->grand_total, 2) }}
                                    </td>
                                    <td class="px-5 py-4">
                                        @if($order->status === 'completed')
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                Completed
                                            </span>
                                        @elseif($order->status === 'processing')
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                                                Processing
                                            </span>
                                        @elseif($order->status === 'cancelled')
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                                                Cancelled
                                            </span>
                                        @else
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                                Pending
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-5 py-4 text-right">
                                        <a href="{{ route('admin.orders.show', $order) }}" class="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors">
                                            <span>Manage</span>
                                            <i class="fa-solid fa-chevron-right text-[10px]"></i>
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </div>

        <!-- Recent Products (1 Column) -->
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                    <h3 class="font-bold text-slate-900">Latest Products</h3>
                </div>
                <a href="{{ route('admin.products.create') }}" class="text-xs font-bold text-brand-600 hover:text-brand-700">
                    <i class="fa-solid fa-plus mr-0.5"></i> Add
                </a>
            </div>

            <div class="divide-y divide-slate-100 flex-1">
                @forelse($recentProducts as $product)
                    <div class="p-4 flex items-center gap-3 hover:bg-slate-50/80 transition-colors">
                        @php
                            $thumb = $product->images->first()->image_url ?? 'https://placehold.co/100x100?text=Note';
                        @endphp
                        <img src="{{ $thumb }}" alt="{{ $product->name }}" class="w-12 h-12 rounded-xl object-contain bg-slate-100 border border-slate-200 flex-shrink-0" onerror="this.src='https://placehold.co/100x100?text=Note'">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-slate-800 text-sm truncate">{{ $product->name }}</h4>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="text-xs font-bold text-brand-600">Rs {{ number_format($product->price, 2) }}</span>
                                <span class="text-slate-300">•</span>
                                <span class="text-xs text-slate-400 truncate">{{ $product->category->name ?? 'CBSE' }}</span>
                            </div>
                        </div>
                        <a href="{{ route('admin.products.edit', $product) }}" class="p-2 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100" title="Edit">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                    </div>
                @empty
                    <div class="p-8 text-center text-slate-400 text-sm">
                        No products added yet.
                    </div>
                @endforelse
            </div>

            <div class="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <a href="{{ route('admin.products.index') }}" class="text-xs font-bold text-slate-600 hover:text-brand-600">
                    View All {{ $stats['total_products'] }} Products &rarr;
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
