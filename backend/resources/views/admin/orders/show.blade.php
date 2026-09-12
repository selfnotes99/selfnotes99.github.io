@extends('admin.layouts.app')

@section('title', 'Order #' . $order->order_number)
@section('header', 'Order Details')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Header with Back & Status Controller -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <div class="flex items-center gap-2">
                <a href="{{ route('admin.orders.index') }}" class="text-slate-400 hover:text-slate-600">
                    <i class="fa-solid fa-arrow-left"></i>
                </a>
                <h2 class="text-xl font-bold text-slate-900">Order #{{ $order->order_number }}</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">Placed on {{ $order->created_at->format('F d, Y \a\t h:i A') }}</p>
        </div>

        <div class="flex items-center gap-3">
            <!-- Status update form -->
            <form method="POST" action="{{ route('admin.orders.status', $order) }}" class="flex items-center gap-2">
                @csrf
                @method('PATCH')
                <select name="status" class="py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500">
                    <option value="pending" {{ $order->status === 'pending' ? 'selected' : '' }}>Pending</option>
                    <option value="processing" {{ $order->status === 'processing' ? 'selected' : '' }}>Processing</option>
                    <option value="completed" {{ $order->status === 'completed' ? 'selected' : '' }}>Completed</option>
                    <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                </select>
                <button type="submit" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors">
                    Update
                </button>
            </form>

            <form method="POST" action="{{ route('admin.orders.destroy', $order) }}" onsubmit="return confirm('Delete this order?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl" title="Delete Order">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </form>
        </div>
    </div>

    <!-- Details Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Customer Info -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-user text-brand-600"></i> Customer
            </h3>
            <div>
                <p class="font-bold text-slate-900">{{ $order->customer_name }}</p>
                <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-envelope mr-1.5 text-slate-400"></i>{{ $order->customer_email }}</p>
                @if($order->customer_phone)
                    <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-phone mr-1.5 text-slate-400"></i>{{ $order->customer_phone }}</p>
                @endif
            </div>
        </div>

        <!-- Payment Info -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-credit-card text-brand-600"></i> Payment & Delivery
            </h3>
            <div>
                <p class="text-sm font-semibold text-slate-800">Method: <span class="uppercase font-mono">{{ $order->payment_method ?? 'Online UPI' }}</span></p>
                <p class="text-xs text-slate-500 mt-1">Payment Status: <span class="font-semibold text-emerald-600 uppercase">{{ $order->payment_status ?? 'Paid' }}</span></p>
                @if($order->notes)
                    <p class="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <strong class="text-slate-700">Note:</strong> {{ $order->notes }}
                    </p>
                @endif
            </div>
        </div>

        <!-- Address -->
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <i class="fa-solid fa-location-dot text-brand-600"></i> Delivery Address
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">
                {{ $order->shipping_address ?? 'Digital Delivery via Email / Drive Link' }}
            </p>
        </div>
    </div>

    <!-- Items Table -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">Order Items ({{ $order->items->count() }})</h3>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                        <th class="px-5 py-3.5">Item</th>
                        <th class="px-5 py-3.5">Unit Price</th>
                        <th class="px-5 py-3.5">Quantity</th>
                        <th class="px-5 py-3.5 text-right">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach($order->items as $item)
                        <tr>
                            <td class="px-5 py-4">
                                <div class="font-bold text-slate-800">{{ $item->product_name }}</div>
                                @if($item->product && $item->product->direct_link)
                                    <div class="mt-1">
                                        <a href="{{ $item->product->direct_link }}" target="_blank" class="text-[11px] font-semibold text-brand-600 hover:underline inline-flex items-center gap-1">
                                            <i class="fa-solid fa-cloud-arrow-down"></i> Open Delivery Link
                                        </a>
                                    </div>
                                @endif
                            </td>
                            <td class="px-5 py-4 text-slate-600">Rs {{ number_format($item->unit_price, 2) }}</td>
                            <td class="px-5 py-4 text-slate-600">{{ $item->quantity }}</td>
                            <td class="px-5 py-4 font-bold text-slate-900 text-right">Rs {{ number_format($item->total_price, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="p-5 bg-slate-50 border-t border-slate-100 flex flex-col items-end gap-1.5 text-sm">
            <div class="flex justify-between w-64 text-slate-600 text-xs">
                <span>Subtotal:</span>
                <span class="font-semibold text-slate-800">Rs {{ number_format($order->subtotal, 2) }}</span>
            </div>
            @if($order->discount > 0)
                <div class="flex justify-between w-64 text-emerald-600 text-xs">
                    <span>Discount:</span>
                    <span class="font-semibold">- Rs {{ number_format($order->discount, 2) }}</span>
                </div>
            @endif
            @if($order->shipping_fee > 0)
                <div class="flex justify-between w-64 text-slate-600 text-xs">
                    <span>Shipping:</span>
                    <span class="font-semibold text-slate-800">Rs {{ number_format($order->shipping_fee, 2) }}</span>
                </div>
            @endif
            <div class="flex justify-between w-64 border-t border-slate-200 pt-2 text-base font-black text-slate-900 mt-1">
                <span>Grand Total:</span>
                <span class="text-brand-700">Rs {{ number_format($order->grand_total, 2) }}</span>
            </div>
        </div>
    </div>
</div>
@endsection
