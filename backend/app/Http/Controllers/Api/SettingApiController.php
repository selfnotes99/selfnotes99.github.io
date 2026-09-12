<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingApiController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Setting::all()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'settings' => [
                'currency_symbol' => $settings['currency_symbol'] ?? 'Rs',
                'announcement_bar' => $settings['announcement_bar'] ?? 'Free Shipping on Orders Rs 50+',
                'free_shipping_threshold' => (float)($settings['free_shipping_threshold'] ?? 50),
                'support_email' => $settings['support_email'] ?? 'support@selfnotes99.com',
                'support_phone' => $settings['support_phone'] ?? '+91 98765 43210',
            ],
        ]);
    }
}
