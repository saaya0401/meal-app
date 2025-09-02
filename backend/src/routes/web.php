<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MealLogController;
use App\Http\Controllers\DashboardController;


Route::get('/api/dashboard', [DashboardController::class, 'index']);