<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'username',
        'user_display_name',
        'avatar',
        'rating',
        'comment',
        'reply_author',
        'reply_text',
        'is_verified',
        'likes',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_verified' => 'boolean',
        'likes' => 'integer',
        'is_active' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => (string)$this->id,
            'productSlug' => $this->product ? $this->product->slug : 'all',
            'categorySlug' => $this->product && $this->product->category ? $this->product->category->slug : 'all',
            'username' => $this->username,
            'userDisplayName' => $this->user_display_name ?: $this->username,
            'avatar' => $this->avatar ?: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
            'timeAgo' => $this->created_at ? $this->created_at->diffForHumans() : 'Just now',
            'likedByAuthor' => true,
            'likes' => $this->likes,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'reply' => $this->reply_text ? [
                'authorHandle' => 'selfnotes99',
                'authorName' => $this->reply_author ?: 'Self Notes Team',
                'authorAvatar' => '/images/logo.png',
                'timeAgo' => '1d',
                'text' => $this->reply_text,
                'likes' => 1,
            ] : null,
            'verified' => $this->is_verified,
        ];
    }
}
