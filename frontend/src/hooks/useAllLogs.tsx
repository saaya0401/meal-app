import { useCallback, useState } from "react";
import { axiosInstance } from "../api/axios";

type Type = {
    date: string;
    formattedDate: string;
    avg_percent: number;
}

export const useAllLogs = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<Type[]>([]);
    const getAllLogs = useCallback((profileId: number | null) => {
        setLoading(true);
        axiosInstance.get<Type[]>(`/api/meal-logs?profile_id=${profileId}`)
            .then((res) => setLogs(res.data))
            .finally(() => setLoading(false));
    }, []);
    return { getAllLogs, loading, logs };
}