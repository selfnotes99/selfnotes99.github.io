<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add is_admin to users if not already present
        if (Schema::hasTable('users') && !Schema::hasColumn('users', 'is_admin')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_admin')->default(false)->after('password');
            });
        }

        // 2. Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Collections
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->decimal('price', 10, 2)->default(49.99);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->string('discount')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('collection_id')->nullable()->constrained('collections')->nullOnDelete();
            $table->longText('description')->nullable();
            $table->json('features')->nullable();
            $table->json('table_of_contents')->nullable();
            $table->json('sizes')->nullable();
            $table->json('colors')->nullable();
            $table->string('badge')->nullable();
            $table->string('badge_type')->nullable(); // 'sale', 'best', 'new'
            $table->integer('stock')->default(50);
            $table->decimal('rating', 3, 1)->default(5.0);
            $table->integer('review_count')->default(88);
            $table->text('direct_link')->nullable(); // Instant download / checkout URL
            $table->boolean('is_active')->default(true);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_sale')->default(false);
            $table->boolean('is_new')->default(false);
            $table->integer('featured_order')->default(0);
            $table->timestamps();
        });

        // 5. Product Images (Multiple images per product)
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->text('image_url');
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 6. Recent Buyers / Live Social Proof
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->default('India');
            $table->string('time_ago')->default('A few minutes ago');
            $table->string('product_name')->nullable();
            $table->text('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->constrained('products')->cascadeOnDelete();
            $table->string('username');
            $table->string('user_display_name')->nullable();
            $table->text('avatar')->nullable();
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->string('reply_author')->nullable();
            $table->text('reply_text')->nullable();
            $table->boolean('is_verified')->default(true);
            $table->integer('likes')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 8. Orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('shipping_address');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('grand_total', 10, 2);
            $table->string('payment_method')->default('cod');
            $table->string('status')->default('pending'); // 'pending', 'processing', 'completed', 'cancelled'
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 9. Order Items
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();
            $table->string('product_name');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table->string('selected_size')->nullable();
            $table->string('selected_color')->nullable();
            $table->decimal('total', 10, 2);
            $table->timestamps();
        });

        // 10. Site Settings (Announcement, Currency, Delivery threshold)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('buyers');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('products');
        Schema::dropIfExists('collections');
        Schema::dropIfExists('categories');

        if (Schema::hasTable('users') && Schema::hasColumn('users', 'is_admin')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_admin');
            });
        }
    }
};
