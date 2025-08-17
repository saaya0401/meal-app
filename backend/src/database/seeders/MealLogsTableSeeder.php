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
        $meal_logs=[
            [
                'profile_id'=>1,
                'date'=>Carbon::now(),
                'menu'=>[
                    ['name'=>'にんじん', 'amount'=>'5g'],
                    ['name'=>'ドライフード', 'amount'=>'20g']
                ],
                'amount_percent'=>'8割',
                'meal_time'=>'morning',
                'memo'=>'最初に手であげると少しずつ食べ始めた'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now(),
                'menu'=>[
                    ['name'=>'ささみ', 'amount'=>'5g'],
                    ['name'=>'ドライフード', 'amount'=>'20g']
                ],
                'amount_percent'=>'5割',
                'meal_time'=>'evening',
                'memo'=>'あまり脱線しなかった'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'menu'=>[
                    ['name'=>'かぼちゃ', 'amount'=>'5g'],
                    ['name'=>'ドライフード', 'amount'=>'20g']
                ],
                'amount_percent'=>'8割',
                'meal_time'=>'morning',
                'memo'=>'最初に手であげると少しずつ食べ始めた'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'menu'=>[
                    ['name'=>'栗', 'amount'=>'１粒'],
                ],
                'amount_percent'=>'10割',
                'meal_time'=>'other',
                'meal_time_note'=>'おやつ',
                'memo'=>'大喜び'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'menu'=>[
                    ['name'=>'鳥胸みんち', 'amount'=>'5g'],
                    ['name'=>'ドライフード', 'amount'=>'20g']
                ],
                'amount_percent'=>'7割',
                'meal_time'=>'evening',
                'memo'=>'ちょいちょい脱線した'
            ],
        ];

        foreach($meal_logs as $log){
            MealLog::create($log);
        }
    }
}
