<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealLog;
use Carbon\Carbon;
use Illuminate\Support\Arr;

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
    public function show(string $date)
    {
        if(!$date) {
            return response()->json(['message' => 'date query is required'], 422);
        }

        $logs = MealLog::query()
            ->where('profile_id', 1)
            ->whereDate('date', $date)
            ->orderByRaw("FIELD(meal_time, 'morning', 'noon', 'evening', 'other')")
            ->orderBy('created_at')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'meal_time' => $r->meal_time,
                'meal_time_note' => $r->meal_time_note,
                'menu' => $r->menu,
                'amount_percent' => $r->amount_percent,
                'memo' => $r->memo,
            ]);

            return response()->json($logs, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MealLog $meal_log)
    {
        $updatable = ['meal_time', 'meal_time_note', 'menu', 'amount_percent', 'memo'];
        $data = Arr::only($request->all(), $updatable);
        if(array_key_exists('meal_time', $data) && ($data['meal_time'] ?? null) !== 'other'){
            $data['meal_time_note'] = null;
        }
        $meal_log->update($data);
        return response()->json($meal_log->fresh(), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MealLog $meal_log)
    {
        $meal_log->delete();
        return response()->json(['message'=>'削除しました', 'id' => $meal_log->id], 200);
    }

}
