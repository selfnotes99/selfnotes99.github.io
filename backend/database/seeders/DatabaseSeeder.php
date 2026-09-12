<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\BuyerNotification;
use App\Models\Review;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Super Admin
        User::updateOrCreate(
            ['email' => 'admin@selfnotes99.com'],
            [
                'name' => 'Self Notes Admin',
                'password' => Hash::make('admin123456'),
                'is_admin' => true,
            ]
        );

        // 2. Default Categories
        $categories = [
            ['name' => 'CBSE Notes', 'slug' => 'cbse-notes', 'description' => 'Comprehensive NCERT & Board exam revision notes'],
            ['name' => 'Biology', 'slug' => 'biology', 'description' => 'Detailed diagrams, flowcharts, and high-yield biology notes'],
            ['name' => 'Physics', 'slug' => 'physics', 'description' => 'Derivations, formulas, and solved numerical cheat sheets'],
            ['name' => 'Chemistry', 'slug' => 'chemistry', 'description' => 'Organic reaction mechanisms, name reactions, and periodic trends'],
            ['name' => 'Mathematics', 'slug' => 'mathematics', 'description' => 'Formulas, step-by-step shortcuts, and chapter blueprints'],
            ['name' => 'Bags & Accessories', 'slug' => 'bags-accessories', 'description' => 'Everyday study gear and lifestyle essentials'],
        ];

        $categoryMap = [];
        foreach ($categories as $cat) {
            $created = Category::updateOrCreate(['slug' => $cat['slug']], $cat);
            $categoryMap[$cat['slug']] = $created->id;
        }

        // 3. Default Collections
        $collections = [
            ['name' => 'Trending Collection', 'slug' => 'trending-collection', 'description' => 'Most popular and downloaded guides this month'],
            ['name' => 'Class 10 Specials', 'slug' => 'class-10-specials', 'description' => 'Target 95%+ in Class 10 CBSE Board Exams'],
            ['name' => 'Class 12 Specials', 'slug' => 'class-12-specials', 'description' => 'Comprehensive preparation for Class 12 Boards & Competitive Exams'],
            ['name' => 'Best Sellers', 'slug' => 'best-sellers', 'description' => 'All-time highest rated digital revision materials'],
        ];

        $collectionMap = [];
        foreach ($collections as $col) {
            $created = Collection::updateOrCreate(['slug' => $col['slug']], $col);
            $collectionMap[$col['slug']] = $created->id;
        }

        // 4. Products
        // Product 1: CBSE Class 10 Biology Chapter-wise Notes
        $p1 = Product::updateOrCreate(
            ['slug' => 'cbse-class-10-biology-chapter-wise-notes'],
            [
                'name' => 'CBSE Class 10 Biology Chapter-wise Notes',
                'price' => 49.99,
                'old_price' => 99.99,
                'discount' => '50% OFF',
                'category_id' => $categoryMap['biology'] ?? null,
                'collection_id' => $collectionMap['class-10-specials'] ?? null,
                'description' => 'Master CBSE Class 10 Biology with complete chapter-wise digital notes, high-resolution labeled diagrams, mind maps, and past 10-year recurring board questions with model answers.',
                'features' => [
                    'Complete NCERT Coverage with line-by-line breakdown',
                    '50+ High-Definition color labeled anatomical diagrams',
                    'Summary cheat sheets for last-minute exam revision',
                    'Direct instant access PDF download on any mobile or PC',
                ],
                'table_of_contents' => [
                    'Chapter 01: Life Processes - Nutrition & Respiration (28 Pages)',
                    'Chapter 02: Life Processes - Transportation & Excretion (24 Pages)',
                    'Chapter 03: Control and Coordination in Animals & Plants (32 Pages)',
                    'Chapter 04: How do Organisms Reproduce? - Sexual & Asexual (36 Pages)',
                    'Chapter 05: Heredity and Evolution - Mendel Laws & Speciation (26 Pages)',
                    'Chapter 06: Our Environment & Ecosystem Management (18 Pages)',
                ],
                'sizes' => ['PDF Full Edition'],
                'colors' => [['name' => 'Exam Edition', 'hex' => '#064B35']],
                'badge' => 'Best Seller',
                'badge_type' => 'best',
                'stock' => 100,
                'rating' => 5.0,
                'review_count' => 142,
                'direct_link' => 'https://in.pinterest.com/pin/1095219203164201454/',
                'is_active' => true,
                'is_bestseller' => true,
                'is_sale' => true,
                'is_new' => false,
                'featured_order' => 1,
            ]
        );

        ProductImage::where('product_id', $p1->id)->delete();
        $driveImages1 = [
            'https://lh3.googleusercontent.com/d/1JFnzVsJJdOxjbYOLwgXNLmquvCbP6RXs',
            'https://lh3.googleusercontent.com/d/10EGogaZ8PH7n_8ozc1dTUTvXYyPqx3JS',
            'https://lh3.googleusercontent.com/d/14E-sMO4AMXK0b_39lKUf05HrhDPsvn0C',
            'https://lh3.googleusercontent.com/d/1WH13RbO3scnCF-Bc_Mm2GIa7WmQBVB1_',
        ];
        foreach ($driveImages1 as $idx => $url) {
            ProductImage::create([
                'product_id' => $p1->id,
                'image_url' => $url,
                'is_primary' => $idx === 0,
                'sort_order' => $idx + 1,
            ]);
        }

        // Product 2: Urban Backpack
        $p2 = Product::updateOrCreate(
            ['slug' => 'urban-backpack'],
            [
                'name' => 'Urban Backpack',
                'price' => 49.99,
                'old_price' => 69.99,
                'discount' => '28% OFF',
                'category_id' => $categoryMap['bags-accessories'] ?? null,
                'collection_id' => $collectionMap['trending-collection'] ?? null,
                'description' => 'Engineered for modern students and commuters. Features water-resistant coated canvas, dedicated 16-inch padded laptop sleeve, and ergonomic airflow back padding.',
                'features' => [
                    'Water-resistant recycled poly-canvas exterior',
                    'Dedicated padded compartment fits up to 16" laptop',
                    'Hidden quick-access passport and stationery pocket',
                    'Reinforced heavy-duty YKK zippers & 22L capacity',
                ],
                'table_of_contents' => [
                    'Module 01: Product Specifications & Build Material',
                    'Module 02: Ergonomic Comfort & Airflow Back System',
                    'Module 03: 16-Inch Padded Sleeve Dimensions',
                    'Module 04: Warranty & Lifetime Guarantee Guide',
                ],
                'sizes' => ['One Size'],
                'colors' => [
                    ['name' => 'Olive Green', 'hex' => '#4A5D4E'],
                    ['name' => 'Charcoal Black', 'hex' => '#222222'],
                ],
                'badge' => 'Sale',
                'badge_type' => 'sale',
                'stock' => 24,
                'rating' => 5.0,
                'review_count' => 128,
                'direct_link' => 'https://in.pinterest.com/pin/1095219203164201454/',
                'is_active' => true,
                'is_bestseller' => false,
                'is_sale' => true,
                'is_new' => false,
                'featured_order' => 2,
            ]
        );

        ProductImage::where('product_id', $p2->id)->delete();
        foreach ($driveImages1 as $idx => $url) {
            ProductImage::create([
                'product_id' => $p2->id,
                'image_url' => $url,
                'is_primary' => $idx === 0,
                'sort_order' => $idx + 1,
            ]);
        }

        // 5. Live Buyer Notifications
        $sampleBuyers = [
            ['name' => 'Ananya Sharma', 'location' => 'Delhi, India', 'time_ago' => '2 minutes ago', 'product_name' => 'CBSE Class 10 Biology Chapter-wise Notes'],
            ['name' => 'Rahul Verma', 'location' => 'Mumbai, India', 'time_ago' => '5 minutes ago', 'product_name' => 'CBSE Class 10 Biology Chapter-wise Notes'],
            ['name' => 'Pooja Patel', 'location' => 'Ahmedabad, India', 'time_ago' => '8 minutes ago', 'product_name' => 'CBSE Class 10 Biology Chapter-wise Notes'],
            ['name' => 'Sneha Kulkarni', 'location' => 'Pune, India', 'time_ago' => '12 minutes ago', 'product_name' => 'CBSE Class 10 Biology Chapter-wise Notes'],
            ['name' => 'Aman Gupta', 'location' => 'Jaipur, India', 'time_ago' => '15 minutes ago', 'product_name' => 'Urban Backpack'],
        ];

        foreach ($sampleBuyers as $b) {
            BuyerNotification::updateOrCreate(
                ['name' => $b['name'], 'product_name' => $b['product_name']],
                $b
            );
        }

        // 6. Customer Reviews
        $reviews = [
            [
                'product_id' => $p1->id,
                'username' => 'priya.sharma',
                'user_display_name' => 'Priya Sharma',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                'rating' => 5,
                'comment' => 'Biology ke diagrams aur explanation itne clear hain ki revision bohot easy ho gaya! Highly recommended for all CBSE 10th students. ⭐⭐⭐⭐⭐',
                'reply_author' => 'Self Notes Team',
                'reply_text' => 'Thanks Priya! We are glad the diagrams and cheat sheets helped your preparation ✨',
                'is_verified' => true,
                'likes' => 12,
            ],
            [
                'product_id' => $p1->id,
                'username' => 'rohit.gupta',
                'user_display_name' => 'Rohit Gupta',
                'avatar' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
                'rating' => 5,
                'comment' => 'Price ke hisab se content unbelievable hai! Life processes chapter ke flowcharts se concept bilkul crystal clear ho gaye.',
                'reply_author' => 'Self Notes Team',
                'reply_text' => 'All the best for your board exams, Rohit! Keep shining 🚀',
                'is_verified' => true,
                'likes' => 9,
            ],
        ];

        foreach ($reviews as $rev) {
            Review::updateOrCreate(
                ['username' => $rev['username'], 'product_id' => $rev['product_id']],
                $rev
            );
        }

        // 7. Store Settings
        Setting::set('currency_symbol', 'Rs');
        Setting::set('announcement_bar', 'Free Shipping on Orders Rs 50+');
        Setting::set('free_shipping_threshold', '50');
        Setting::set('support_email', 'support@selfnotes99.com');
        Setting::set('support_phone', '+91 98765 43210');
    }
}
