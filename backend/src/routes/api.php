<?php
use App\Http\Controllers\MealLogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdviceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function (){
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('meal-logs', MealLogController::class);
    Route::apiResource('profiles', ProfileController::class);
    Route::post('advices/generate', [AdviceController::class, 'generate']);
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
});