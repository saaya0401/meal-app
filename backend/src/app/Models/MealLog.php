<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'profile_id',
        'date',
        'time',
        'menu',
        'amount_percent',
        'meal_time',
        'meal_time_note',
        'memo'
    ];

    protected $casts = [
        'menu'=>'array',
        'time'=>'datetime:H:i'
    ];

    public function profile() {
        return $this->belongsTo(Profile::class);
    }
}
