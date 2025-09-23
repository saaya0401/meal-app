import { useCallback, useState } from "react";
import { MealTime } from "../types/homeData";
import { MenuItem } from "../types/form";
import { axiosInstance } from "../api/axios";
import { useProfile } from "../providers/ProfileContext";

export type DailyLogItem = {
    id: number;
    meal_time: MealTime;
    meal_time_note: string | null;
    menu: MenuItem[];
    amount_percent: string;
    memo: string | null;
}

export const useDailyLogs = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<DailyLogItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { profile } = useProfile();
    const getDailyLogs = useCallback(async(date: string | null | undefined) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get<DailyLogItem[]>(`/api/meal-logs/${date}?profile_id=${profile?.id}`, {
                params: { date },
            });
            setLogs(res.data);
        } catch (e) {
            setError("取得に失敗しました");
            setLogs([]);
        } finally {
            setLoading(false);
        }
    }, []);
    return { getDailyLogs, loading, logs, error };
}