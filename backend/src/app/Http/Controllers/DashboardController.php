<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\MealLog;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(){
        Carbon:: setlocale('ja');
        $profileData = Profile::select('id','name', 'image', 'gender', 'birthdate', 'weight_kg', 'is_multiple_dogs')->first();
        if(!$profileData){
            return response()->json([
                'profile' => null,
                'meal_log' => null
            ], 200);
        }
        $profile = $profileData->only(['id', 'name', 'image', 'gender', 'birthdate', 'weight_kg', 'is_multiple_dogs']);
        $mealLog = MealLog::where('profile_id', $profile['id'])
                            ->orderBy('date', 'desc')
                            ->orderBy('created_at', 'desc')
                            ->first();
        $mealLog['formattedDate'] = Carbon::parse($mealLog->date)->isoFormat('YYYY/MM/DD(ddd)');
        return response()->json([
            'profile'=>$profile,
            'meal_log'=>$mealLog,
        ]);
    }
}
