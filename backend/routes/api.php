<?php

use App\Http\Controllers\Api\BuyerApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\CollectionApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Api\SettingApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| SelfNotes99 REST API Routes for Next.js Frontend
|--------------------------------------------------------------------------
*/

// Products
Route::get('/products', [ProductApiController::class, 'index']);
Route::get('/products/{slug}', [ProductApiController::class, 'show']);

// Categories & Collections
Route::get('/categories', [CategoryApiController::class, 'index']);
Route::get('/collections', [CollectionApiController::class, 'index']);

// Buyers Social Proof
Route::get('/buyers/recent', [BuyerApiController::class, 'index']);

// Reviews
Route::get('/reviews', [ReviewApiController::class, 'index']);
Route::post('/reviews', [ReviewApiController::class, 'store']);

// Orders Checkout
Route::post('/orders', [OrderApiController::class, 'store']);

// Store Settings
Route::get('/settings', [SettingApiController::class, 'index']);

// Authenticated User
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
