import { useCallback, useState } from "react";

export const useAllLogs = () => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState();
    const getAllLogs = useCallback(() => {
        setLoading(true);
    }, []);
    return { getAllLogs, loading, logs };
}