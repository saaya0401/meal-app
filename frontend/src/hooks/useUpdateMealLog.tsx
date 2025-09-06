import { MenuItem } from "../types/form";
import { MealTime } from "../types/homeData";
import { axiosInstance } from "../api/axios";
import { useCallback } from "react";
import { useMessage } from "./useMessage";

type UpdatePayload = {
    date: string |null | undefined;
    meal_time: MealTime | null;
    meal_time_note: string | null;
    menu: MenuItem[];
    amount_percent: string;
    memo: string | null;
}

export const useUpdateMealLog = () => {
    const { showMessage } = useMessage();
    const updateMealLog = useCallback(async (id: number, payload: UpdatePayload) => {
        try {
            await axiosInstance.patch(`/api/meal-logs/${id}`, payload);
            showMessage({ title: "記録を更新しました", type: "success" });
            return { ok: true as const };
        } catch (e) {
            showMessage({ title: "更新に失敗しました", type: "error" });
            return { ok: false as const, error: e };
        }
    }, []);
    return { updateMealLog }
}