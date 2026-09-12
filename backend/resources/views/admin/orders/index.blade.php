@extends('admin.layouts.app')

@section('title', 'Orders')
@section('header', 'Customer Orders')

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Orders Management</h2>
            <p class="text-xs text-slate-500 mt-0.5">Track and fulfill digital note purchases and orders</p>
        </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <form method="GET" action="{{ route('admin.orders.index') }}" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="relative sm:col-span-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search by Order #, customer name, email, phone..."
                    class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors">
            </div>

            <div class="flex items-center gap-2">
                <select name="status" class="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white">
                    <option value="">All Statuses</option>
                    <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
                    <option value="processing" {{ request('status') === 'processing' ? 'selected' : '' }}>Processing</option>
                    <option value="completed" {{ request('status') === 'completed' ? 'selected' : '' }}>Completed</option>
                    <option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                </select>

                <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors">
                    Filter
                </button>
                @if(request('search') || request('status'))
                    <a href="{{ route('admin.orders.index') }}" class="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                        <i class="fa-solid fa-rotate-left"></i>
                    </a>
                @endif
            </div>
        </form>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if($orders->isEmpty())
            <div class="p-16 text-center text-slate-400">
                <i class="fa-solid fa-cart-arrow-down text-5xl mb-3 text-slate-300"></i>
                <h3 class="text-base font-bold text-slate-700">No orders found</h3>
                <p class="text-xs text-slate-500 mt-1">Orders placed via the store checkout API will appear here automatically.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th class="px-5 py-3.5">Order ID</th>
                            <th class="px-5 py-3.5">Date</th>
                            <th class="px-5 py-3.5">Customer Details</th>
                            <th class="px-5 py-3.5">Items</th>
                            <th class="px-5 py-3.5">Total Amount</th>
                            <th class="px-5 py-3.5">Payment</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($orders as $order)
                            <tr class="hover:bg-slate-50/70 transition-colors">
                                <td class="px-5 py-4 font-mono font-bold text-slate-900 text-xs">
                                    #{{ $order->order_number }}
                                </td>
                                <td class="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                                    {{ $order->created_at->format('M d, Y') }}
                                    <div class="text-[10px] text-slate-400">{{ $order->created_at->format('h:i A') }}</div>
                                </td>
                                <td class="px-5 py-4">
                                    <div class="font-bold text-slate-800">{{ $order->customer_name }}</div>
                                    <div class="text-xs text-slate-400">{{ $order->customer_phone ?? $order->customer_email }}</div>
                                </td>
                                <td class="px-5 py-4 text-xs text-slate-600">
                                    {{ $order->items->sum('quantity') }} items
                                </td>
                                <td class="px-5 py-4 font-black text-slate-900">
                                    Rs {{ number_format($order->grand_total, 2) }}
                                </td>
                                <td class="px-5 py-4">
                                    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase">
                                        {{ $order->payment_method ?? 'UPI / Card' }}
                                    </span>
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
                                        <span>View</span>
                                        <i class="fa-solid fa-chevron-right text-[10px]"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            @if($orders->hasPages())
                <div class="p-4 border-t border-slate-100">
                    {{ $orders->links() }}
                </div>
            @endif
        @endif
    </div>
</div>
@endsection
