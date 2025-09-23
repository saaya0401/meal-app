<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\MealLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        Carbon:: setlocale('ja');
        $userId = Auth::id();
        $profileData = Profile::where('user_id', $userId)->select('id','name', 'image', 'gender', 'birthdate', 'weight_kg', 'is_multiple_dogs')->first();
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
        if($mealLog){$mealLog['formattedDate'] = Carbon::parse($mealLog->date)->isoFormat('YYYY/MM/DD(ddd)');};
        return response()->json([
            'profile'=>$profile,
            'meal_log'=>$mealLog,
        ]);
    }
}
