<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealLog;
use App\Models\Profile;
use App\Services\AdviceGenerator;

class AdviceController extends Controller
{
    public function generate(Request $request){
        $request->validate([
            'profile_id'=>['required', 'integer'],
        ]);
        $profile = Profile::where('id', $request->input('profile_id'))->where('user_id', $request->user()->id)->first();

if (!$profile) {
    return response()->json(['message' => 'プロフィールが見つかりませんでした'], 404);
}
        $logs = MealLog::where('profile_id', $profile->id)->latest()->take(20)->get();
        $generator = AdviceGenerator::makeFromConfig();
        $content = $generator->generate($profile, $logs);

        return response()->json([
            'content'=>$content,
            'created_at'=>now()->format('Y/m/d H:i'),
        ], 200);
    }
}
