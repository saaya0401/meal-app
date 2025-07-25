<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
