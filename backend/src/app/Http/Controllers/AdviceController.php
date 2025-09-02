<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealLog;
use App\Models\Profile;
use App\Services\AdviceGenerator;

class AdviceController extends Controller
{
    public function generate(Request $request){
        \Log::info('advice.generate start', [
    'profile_id' => $request->input('profile_id'),
]);

// プロフィール取得後

// ログ取得後

        $request->validate([
            'profile_id'=>['required', 'integer'],
        ]);
        $profileId=$request->input('profile_id');
        $profile = Profile::find($profileId);
        \Log::info('advice.generate profile', ['exists' => (bool)$profile]);
        $logs = MealLog::where('profile_id', $profileId)->latest()->take(20)->get();
\Log::info('advice.generate logs', ['count' => $logs->count()]);
        $generator = AdviceGenerator::makeFromConfig();
        $content = $generator->generate($profile, $logs);

        return response()->json([
            'content'=>$content,
            'created_at'=>now()->format('Y/m/d H:i'),
        ], 200);
    }
}
