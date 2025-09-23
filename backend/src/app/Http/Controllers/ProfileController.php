<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Profile;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name'=>'required|string|max:255',
            'gender'=>'required|in:male,female',
            'weight_kg'=>'required|numeric',
            'breed'=>'required|string|max:255',
            'personality'=>'nullable|string|max:100',
            'birth_year'=>'required|integer',
            'birth_month'=>'required|integer',
            'birth_day'=>'required|integer',
            'image'=>'nullable|image|max:2048',
            'is_multiple_dogs'=>'required|in:true,false'
        ]);

        $birthdate = Carbon::createFromDate(
            $validate['birth_year'],
            $validate['birth_month'],
            $validate['birth_day'],
        );

        $path = null;
        if($request->hasFile('image')){
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('images', $filename, 'public');
            $validate['image'] = $path;
        }

        $profile = Profile::create([
            'user_id'=>$request->user()->id,
            'name'=>$validate['name'],
            'image'=>$path ?? null,
            'gender'=>$validate['gender'],
            'birthdate'=>$birthdate->toDateString(),
            'weight_kg'=>$validate['weight_kg'],
            'breed'=>$validate['breed'],
            'personality'=>$validate['personality'] ?? null,
            'is_multiple_dogs'=>filter_var($validate['is_multiple_dogs'], FILTER_VALIDATE_BOOLEAN),
        ]);

        return response()->json([
            'message'=>'ペットの登録が完了しました',
            'data'=>$profile,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
