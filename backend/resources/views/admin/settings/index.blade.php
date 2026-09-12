@extends('admin.layouts.app')

@section('title', 'Store Settings')
@section('header', 'Store Configuration')

@section('content')
<div class="max-w-3xl mx-auto space-y-6">
    <div>
        <h2 class="text-xl font-bold text-slate-900">Store & Announcement Settings</h2>
        <p class="text-xs text-slate-500 mt-0.5">Control global store configurations, header announcement bars, contact numbers, and currency format</p>
    </div>

    <form method="POST" action="{{ route('admin.settings.update') }}" class="space-y-6">
        @csrf

        <!-- Store Identity -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-store text-brand-600"></i> Store Identity
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Store Name</label>
                    <input type="text" name="store_name" value="{{ $settings['store_name'] ?? 'SelfNotes99' }}" required
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Currency Symbol</label>
                    <input type="text" name="currency_symbol" value="{{ $settings['currency_symbol'] ?? 'Rs ' }}" required
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-brand-500">
                </div>
            </div>
        </div>

        <!-- Announcement Bar -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-bullhorn text-brand-600"></i> Header Announcement Bar
            </h3>

            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Announcement Banner Message</label>
                <input type="text" name="announcement_text" value="{{ $settings['announcement_text'] ?? '' }}"
                    placeholder="🔥 CBSE Exam 2026 Special: Use Code TOPPER20 for Extra 20% OFF! Fast Instant Digital Delivery!"
                    class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
            </div>

            <label class="flex items-center gap-2 cursor-pointer pt-1">
                <input type="checkbox" name="announcement_enabled" value="1" {{ ($settings['announcement_enabled'] ?? '1') == '1' ? 'checked' : '' }} class="w-4 h-4 text-brand-600 rounded">
                <span class="text-xs font-bold text-slate-800">Display announcement ticker on storefront</span>
            </label>
        </div>

        <!-- Contact & Support -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <i class="fa-solid fa-headset text-brand-600"></i> Support & Social Channels
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Support Email</label>
                    <input type="email" name="support_email" value="{{ $settings['support_email'] ?? 'support@selfnotes99.com' }}"
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Support Phone</label>
                    <input type="text" name="support_phone" value="{{ $settings['support_phone'] ?? '+91 98765 43210' }}"
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">WhatsApp Help Number</label>
                    <input type="text" name="whatsapp_number" value="{{ $settings['whatsapp_number'] ?? '+91 98765 43210' }}"
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Free Shipping Threshold (Rs)</label>
                    <input type="number" step="1" name="free_shipping_threshold" value="{{ $settings['free_shipping_threshold'] ?? '499' }}"
                        class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
                </div>
            </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 transition-all">
                <i class="fa-solid fa-save mr-1.5"></i> Save Settings
            </button>
        </div>
    </form>
</div>
@endsection
