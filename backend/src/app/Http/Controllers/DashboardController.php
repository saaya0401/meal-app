<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\MealLog;

class DashboardController extends Controller
{
    public function index(){
        $profileData = Profile::select('id','name', 'image', 'gender', 'birthdate', 'weight_kg', 'is_multiple_dogs')->first();
        $profile = $profileData->only(['id', 'name', 'image', 'gender', 'birthdate', 'weight_kg', 'is_multiple_dogs']);
        $mealLog = MealLog::where('profile_id', $profile['id'])
                            ->orderBy('date', 'desc')
                            ->orderBy('created_at', 'desc')
                            ->first();
        return response()->json([
            'profile'=>$profile,
            'meal_log'=>$mealLog
        ]);
    }
}
