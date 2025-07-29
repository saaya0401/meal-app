<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\MealLog;

class DashboardController extends Controller
{
    public function index(){
        $profile = Profile::first();
        $mealLog = MealLog::where('profile_id', $profile->id)
                            ->orderBy('date', 'desc')
                            ->orderBy('time', 'desc')
                            ->first();
        return response()->json([
            'profile'=>$profile,
            'meal_log'=>$mealLog
        ]);
    }
}
