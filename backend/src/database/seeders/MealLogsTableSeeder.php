<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MealLog;
use Carbon\Carbon;

class MealLogsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profileId = 1;
        $daysBack = 60;

        $today = Carbon::today();

        for($i = 0; $i < $daysBack; $i++){
            $date = $today->copy()->subDays($i)->format('Y-m-d');

            MealLog::create([
                'profile_id' => $profileId,
                'date' => $date,
                'menu' => [
                    ['name' => 'ドライフード', 'amount' => '20g'],
                    ['name' => 'にんじん', 'amount' => '5g'],
                    ['name' => 'ヤギミルク', 'amount' => '1g']
                ],
                'amount_percent' => rand(2, 10) . '割',
                'meal_time' => 'morning',
                'memo' => '手で最初の一粒をあげると食べ出した'
            ]);
            MealLog::create([
                'profile_id' => $profileId,
                'date' => $date,
                'menu' => [
                    ['name' => 'ドライフード', 'amount' => '20g'],
                    ['name' => 'ささみ', 'amount' => '5g'],
                    ['name' => 'ヤギミルク', 'amount' => '1g']
                ],
                'amount_percent' => rand(6, 10) . '割',
                'meal_time' => 'evening',
                'memo' => 'こはるのごはんと同じかチェックしてから自分のごはんを食べ始めた'
            ]);
        }
    }
}
