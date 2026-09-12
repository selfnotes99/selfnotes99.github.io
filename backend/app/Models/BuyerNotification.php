<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyerNotification extends Model
{
    use HasFactory;

    protected $table = 'buyers';

    protected $fillable = [
        'name',
        'location',
        'time_ago',
        'product_name',
        'image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function toFrontendArray(): array
    {
        return [
            'name' => $this->name,
            'location' => $this->location,
            'timeAgo' => $this->time_ago,
            'productName' => $this->product_name,
            'image' => $this->image,
        ];
    }
}
