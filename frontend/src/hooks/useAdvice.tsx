import { useCallback, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios";

export type Advice = {
    id?: number;
    content: string;
    created_at?: string;
}

const STORAGE_KEY = "latest_advice";

export const useAdvice = () => {
    const [advice, setAdvice] = useState<Advice | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setAdvice(JSON.parse(raw));
        } catch { }
    }, []);

    const save = (a: Advice) => {
        setAdvice(a);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
    }

    const generateAdvice = useCallback(
        async (args?: { profileId?: number }) => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosInstance.post<Advice>("/api/advices/generate", { profile_id: args?.profileId });
                save(res.data);
                console.log(res.data);
                return { ok: true as const };
            } catch (e) {
                setError("アドバイスの生成に失敗しました");
                return { ok: false as const };
            } finally {
                setLoading(false);
            }
        }, []);

    const clearAdvice = useCallback(() => {
        setAdvice(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { advice, loading, error, generateAdvice, clearAdvice };
}