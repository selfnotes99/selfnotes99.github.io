<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'price',
        'old_price',
        'discount',
        'category_id',
        'collection_id',
        'description',
        'features',
        'table_of_contents',
        'sizes',
        'colors',
        'badge',
        'badge_type',
        'stock',
        'rating',
        'review_count',
        'direct_link',
        'is_active',
        'is_bestseller',
        'is_sale',
        'is_new',
        'featured_order',
    ];

    protected $casts = [
        'price' => 'float',
        'old_price' => 'float',
        'features' => 'array',
        'table_of_contents' => 'array',
        'sizes' => 'array',
        'colors' => 'array',
        'stock' => 'integer',
        'rating' => 'float',
        'review_count' => 'integer',
        'is_active' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_sale' => 'boolean',
        'is_new' => 'boolean',
        'featured_order' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order')->orderBy('id');
    }

    public function primaryImage()
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class)->where('is_active', true)->latest();
    }

    /**
     * Convert model to format matching Next.js Product schema
     */
    public function toFrontendArray(): array
    {
        $allImages = $this->images->pluck('image_url')->toArray();
        $primary = $this->images->where('is_primary', true)->first();
        $mainImage = $primary ? $primary->image_url : ($allImages[0] ?? '/images/logo.png');

        return [
            'id' => (string)$this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'price' => $this->price,
            'oldPrice' => $this->old_price,
            'discount' => $this->discount ?: ($this->old_price && $this->old_price > $this->price ? round((($this->old_price - $this->price) / $this->old_price) * 100) . '% OFF' : null),
            'category' => $this->category ? $this->category->name : 'Notes',
            'categorySlug' => $this->category ? $this->category->slug : 'notes',
            'collection' => $this->collection ? $this->collection->name : 'Trending Collection',
            'collectionSlug' => $this->collection ? $this->collection->slug : 'trending',
            'description' => $this->description,
            'features' => $this->features ?: [
                'Instant digital PDF access after download',
                'Comprehensive chapter-wise concepts & formulas',
                '50+ solved examples and exam questions',
                'High-yield visual cheat sheets included',
            ],
            'tableOfContents' => $this->table_of_contents,
            'sizes' => $this->sizes ?: ['PDF Digital Download'],
            'colors' => $this->colors ?: [
                ['name' => 'Complete Edition', 'hex' => '#064B35'],
            ],
            'badge' => $this->badge,
            'badgeType' => $this->badge_type,
            'stock' => $this->stock,
            'rating' => $this->rating,
            'reviewCount' => $this->review_count,
            'link' => $this->direct_link,
            'isSale' => $this->is_sale,
            'isBestSeller' => $this->is_bestseller,
            'isNew' => $this->is_new,
            'featuredOrder' => $this->featured_order,
            'image' => $mainImage,
            'images' => !empty($allImages) ? $allImages : [$mainImage],
        ];
    }
}
