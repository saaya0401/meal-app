<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MealLogController;
use App\Http\Controllers\DashboardController;

Route::apiResource('/api/profiles', ProfileController::class);
Route::apiResource('/api/meal-logs', MealLogController::class);
Route::get('/api/dashboard', [DashboardController::class, 'index']);

Route::get('/api/ping', function () {
    return response()->json(['message' => 'pong from Laravel']);
});

Route::get('/', function () {
    return view('welcome');
});
