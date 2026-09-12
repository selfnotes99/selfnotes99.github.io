@extends('admin.layouts.app')

@section('title', 'Customer Reviews')
@section('header', 'Customer Reviews & Feedback')

@section('content')
<div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h2 class="text-xl font-bold text-slate-900">Store & Product Reviews</h2>
            <p class="text-xs text-slate-500 mt-0.5">Moderate customer reviews, toggle visibility, and post official store replies</p>
        </div>
    </div>

    <!-- Reviews Table -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if($reviews->isEmpty())
            <div class="p-16 text-center text-slate-400">
                <i class="fa-solid fa-star-half-stroke text-5xl mb-3 text-slate-300"></i>
                <h3 class="text-base font-bold text-slate-700">No reviews yet</h3>
                <p class="text-xs text-slate-500 mt-1">Customer reviews submitted on product pages will appear here for moderation.</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <tr>
                            <th class="px-5 py-3.5">Reviewer</th>
                            <th class="px-5 py-3.5">Rating & Feedback</th>
                            <th class="px-5 py-3.5">Product</th>
                            <th class="px-5 py-3.5">Admin Reply</th>
                            <th class="px-5 py-3.5">Status</th>
                            <th class="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach($reviews as $review)
                            <tr class="hover:bg-slate-50/70 transition-colors">
                                <td class="px-5 py-4">
                                    <div class="font-bold text-slate-900">{{ $review->author_name }}</div>
                                    <div class="text-xs text-slate-400">{{ $review->author_role ?? 'Verified Student' }}</div>
                                </td>

                                <td class="px-5 py-4 max-w-xs">
                                    <div class="flex items-center text-amber-400 text-xs mb-1">
                                        @for($i = 1; $i <= 5; $i++)
                                            <i class="fa-solid fa-star {{ $i <= $review->rating ? '' : 'text-slate-200' }}"></i>
                                        @endfor
                                        <span class="text-slate-500 font-bold ml-1.5 text-xs">({{ $review->rating }}/5)</span>
                                    </div>
                                    <p class="text-xs text-slate-700 italic">"{{ $review->comment }}"</p>
                                </td>

                                <td class="px-5 py-4">
                                    <div class="text-xs font-semibold text-slate-800 line-clamp-1">
                                        {{ $review->product->name ?? 'General Store' }}
                                    </div>
                                </td>

                                <td class="px-5 py-4">
                                    @if($review->reply_text)
                                        <div class="text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-xl">
                                            <div class="font-bold text-[10px] text-emerald-700 uppercase">{{ $review->reply_author ?? 'Self Notes Team' }}</div>
                                            <p class="mt-0.5">{{ $review->reply_text }}</p>
                                        </div>
                                    @else
                                        <span class="text-xs text-slate-400 italic">No reply yet</span>
                                    @endif
                                </td>

                                <td class="px-5 py-4">
                                    <form method="POST" action="{{ route('admin.reviews.toggle', $review) }}">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit" class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full {{ $review->is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500' }}">
                                            <span class="w-1.5 h-1.5 rounded-full {{ $review->is_active ? 'bg-emerald-500' : 'bg-slate-400' }}"></span>
                                            {{ $review->is_active ? 'Visible' : 'Hidden' }}
                                        </button>
                                    </form>
                                </td>

                                <td class="px-5 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <!-- Reply Modal Trigger -->
                                        <button onclick="openReplyModal({{ $review->id }}, '{{ addslashes($review->author_name) }}', '{{ addslashes($review->reply_text ?? '') }}')" class="p-2 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100" title="Reply to review">
                                            <i class="fa-solid fa-reply"></i>
                                        </button>

                                        <form method="POST" action="{{ route('admin.reviews.destroy', $review) }}" onsubmit="return confirm('Delete this review permanently?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50" title="Delete">
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

            @if($reviews->hasPages())
                <div class="p-4 border-t border-slate-100">
                    {{ $reviews->links() }}
                </div>
            @endif
        @endif
    </div>
</div>

<!-- Reply Modal -->
<div id="reply-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 hidden">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-base" id="reply-modal-title">Reply to Review</h3>
            <button onclick="document.getElementById('reply-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <form id="reply-form" method="POST" action="" class="space-y-4">
            @csrf
            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Reply Author Name</label>
                <input type="text" name="reply_author" value="Self Notes Official Team" class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Reply Message</label>
                <textarea id="reply-text" name="reply_text" rows="4" required placeholder="Thank you so much! We are glad the handwritten notes helped you in your board exam preparations..." class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"></textarea>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onclick="document.getElementById('reply-modal').classList.add('hidden')" class="px-4 py-2 text-xs font-semibold text-slate-500">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md">Post Reply</button>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function openReplyModal(reviewId, authorName, existingReply) {
        const modal = document.getElementById('reply-modal');
        const form = document.getElementById('reply-form');
        const title = document.getElementById('reply-modal-title');
        const text = document.getElementById('reply-text');

        title.innerText = 'Reply to ' + authorName;
        text.value = existingReply;
        form.action = '/admin/reviews/' + reviewId + '/reply';
        modal.classList.remove('hidden');
    }
</script>
@endpush
