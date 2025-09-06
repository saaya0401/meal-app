import { useCallback, useState } from "react";
import { axiosInstance } from "../api/axios";

export const useAddMealLog = () => {
    const [loading, setLoading] = useState(false);
    const createMealLog = useCallback(async (payload: any) => {
        setLoading(true);
        try {
            await axiosInstance.post("/api/meal-logs", payload,);
            return { ok: true as const };
        } catch (e) {
            return { ok: false as const, error: e };
        } finally {
            setLoading(false);
        }
    }, []);
    return {createMealLog}
}