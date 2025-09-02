<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class MealLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'profile_id',
        'date',
        'menu',
        'amount_percent',
        'meal_time',
        'meal_time_note',
        'memo'
    ];

    protected $casts = [
        'menu'=>'array',
    ];


    protected function mealTime(): Attribute{
        return Attribute::make(
            get: fn ($value) => [
                'morning'=> '朝ごはん',
                'noon' => '昼ごはん',
                'evening' => '夜ごはん',
                'other' => 'その他'
            ][$value] ?? $value
        );
    }

    public function profile() {
        return $this->belongsTo(Profile::class);
    }
}
