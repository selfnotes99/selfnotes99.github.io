<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderApiController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:150',
            'customer_email' => 'required|email|max:150',
            'customer_phone' => 'required|string|max:30',
            'shipping_address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable',
            'items.*.product_name' => 'required|string',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.selected_size' => 'nullable|string',
            'items.*.selected_color' => 'nullable|string',
            'subtotal' => 'required|numeric',
            'shipping_fee' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'grand_total' => 'required|numeric',
            'payment_method' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $orderNumber = 'SN-' . strtoupper(Str::random(6)) . '-' . rand(100, 999);

        $order = Order::create([
            'order_number' => $orderNumber,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'shipping_address' => $validated['shipping_address'],
            'subtotal' => $validated['subtotal'],
            'shipping_fee' => $validated['shipping_fee'] ?? 0,
            'discount' => $validated['discount'] ?? 0,
            'grand_total' => $validated['grand_total'],
            'payment_method' => $validated['payment_method'] ?? 'cod',
            'status' => 'pending',
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            $productId = null;
            if (!empty($item['product_id'])) {
                $p = Product::find($item['product_id']) ?: Product::where('slug', $item['product_id'])->first();
                $productId = $p ? $p->id : null;
            }

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $productId,
                'product_name' => $item['product_name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'selected_size' => $item['selected_size'] ?? null,
                'selected_color' => $item['selected_color'] ?? null,
                'total' => $item['price'] * $item['quantity'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order placed successfully',
            'order_number' => $order->order_number,
            'order' => $order->load('items'),
        ], 201);
    }
}
