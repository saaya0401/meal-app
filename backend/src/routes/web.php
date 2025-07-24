<?php

use Illuminate\Support\Facades\Route;

Route::get('/api/ping', function () {
    return response()->json(['message' => 'pong from Laravel']);
});

Route::get('/', function () {
    return view('welcome');
});
