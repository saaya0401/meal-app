import { useCallback } from "react";
import { useMessage } from "./useMessage";
import { axiosInstance } from "../api/axios";

export const useDeleteMealLog = () => {
    const { showMessage } = useMessage();
    const deleteMealLog = useCallback(async (id: number) => {
        try {
            await axiosInstance.delete(`http://localhost/api/meal-logs/${id}`);
            showMessage({ title: "記録を削除しました", type: "success" });
            return { ok: true as const };
        } catch (e) {
            showMessage({ title: "削除に失敗しました", type: "error" });
            return {ok: false as const}
        }
    }, [showMessage]);
    return { deleteMealLog };
}