<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealLog;
use Carbon\Carbon;

class MealLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Carbon:: setlocale('ja');
        $rows = MealLog::query()->where('profile_id', 1)
                            ->selectRaw("
                                `date`,
                                ROUND(AVG(CAST(REPLACE(amount_percent, '割', '') AS DECIMAL(4,1)))) AS avg_rate
                            ")
                            ->groupBy('date')
                            ->orderBy('date', 'asc')
                            ->get()
                            ->map(fn ($r) => [
                                'date'=> $r->date,
                                'formattedDate' => Carbon::parse($r->date)->isoFormat('YYYY/MM/DD(ddd)'),
                                'avg_percent' => (int) $r->avg_rate
                            ]);
        return response()->json($rows, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $log = MealLog::create($request->all());
        return response()->json($log,201);
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
