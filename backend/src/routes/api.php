<?php
use App\Http\Controllers\MealLogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdviceController;


Route::apiResource('meal-logs', MealLogController::class);
Route::apiResource('profiles', ProfileController::class);
Route::post('advices/generate', [AdviceController::class, 'generate']);