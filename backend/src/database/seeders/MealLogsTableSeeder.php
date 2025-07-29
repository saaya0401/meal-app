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
                'time'=>'06:40',
                'menu'=>[
                    'にんじん'=> '5g',
                    'ドライフード'=>'20g'
                ],
                'amount_percent'=>'80%',
                'meal_time'=>'morning',
                'memo'=>'最初に手であげると少しずつ食べ始めた'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now(),
                'time'=>'19:40',
                'menu'=>[
                    'ささみ'=> '5g',
                    'ドライフード'=>'20g'
                ],
                'amount_percent'=>'50%',
                'meal_time'=>'evening',
                'memo'=>'あまり脱線しなかった'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'time'=>'06:40',
                'menu'=>[
                    'かぼちゃ'=> '5g',
                    'ドライフード'=>'20g'
                ],
                'amount_percent'=>'80%',
                'meal_time'=>'morning',
                'memo'=>'最初に手であげると少しずつ食べ始めた'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'time'=>'14:40',
                'menu'=>[
                    '栗'=>'一粒'
                ],
                'amount_percent'=>'100%',
                'meal_time'=>'other',
                'meal_time_note'=>'おやつ',
                'memo'=>'大喜び'
            ],
            [
                'profile_id'=>1,
                'date'=>Carbon::now()->addDay(),
                'time'=>'19:40',
                'menu'=>[
                    '鶏むねミンチ'=> '5g',
                    'ドライフード'=>'20g'
                ],
                'amount_percent'=>'70%',
                'meal_time'=>'evening',
                'memo'=>'ちょいちょい脱線した'
            ],
        ];

        foreach($meal_logs as $log){
            MealLog::create($log);
        }
    }
}
