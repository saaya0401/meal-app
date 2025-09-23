import { useCallback, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useProfile } from "../providers/ProfileContext";

export const useAddMealLog = () => {
    const [loading, setLoading] = useState(false);
    const { profile } = useProfile();
    const createMealLog = useCallback(async (payload: any) => {
        setLoading(true);
        try {
            await axiosInstance.post(`/api/meal-logs?profile_id=${profile?.id}`, payload,);
            return { ok: true as const };
        } catch (e) {
            return { ok: false as const, error: e };
        } finally {
            setLoading(false);
        }
    }, [profile?.id]);
    return {createMealLog}
}