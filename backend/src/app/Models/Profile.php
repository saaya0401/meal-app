<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'gender',
        'birthdate',
        'weight_kg',
        'breed',
        'personality',
        'is_multiple_dogs',
        'companion_name'
    ];

    /**
     * @return Attribute
     */
    protected function birthdate(): Attribute{
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('Y/m/d')
        );
    }
}
