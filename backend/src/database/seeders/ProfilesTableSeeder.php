<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profile=[
            'name'=>'陽和',
            'image'=>'images/hiyori.jpg',
            'gender'=>'female',
            'birthdate'=>'2024-05-11',
            'weight_kg'=>2.7,
            'breed'=>'マルポメ',
            'personality'=>'繊細、怖がり',
            'is_multiple_dogs'=>true,
            'companion_name'=>'心晴'
        ];
        Profile::create($profile);
    }
}
