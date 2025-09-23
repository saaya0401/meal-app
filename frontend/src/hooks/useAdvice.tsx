import { useCallback, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios";
import { useLoginUser } from "../providers/LoginUserProvider";

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
    const { loginUser } = useLoginUser();
    const getStorageKey = () => loginUser ? `latest_advice_${loginUser.id}` : null;

    useEffect(() => {
        localStorage.removeItem("latest_advice");
        const key = getStorageKey();
        if (!key) return;
        try {
            const raw = localStorage.getItem(key);
            if (raw) setAdvice(JSON.parse(raw));
        } catch {
            console.log("アドバイスの読み込み失敗")
        }
    }, [loginUser?.id]);

    const save = (a: Advice) => {
        setAdvice(a);
        const key = getStorageKey();
        if (key) { localStorage.setItem(key, JSON.stringify(a)) };
    }

    const generateAdvice = useCallback(
        async (args?: { profileId?: number | null | undefined }) => {
            console.log(loginUser);
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
        }, [loginUser]);

    const clearAdvice = useCallback(() => {
        setAdvice(null);
        const key = getStorageKey();
        if (key) {
            localStorage.removeItem(key);
        }
    }, [loginUser]);

    return { advice, loading, error, generateAdvice, clearAdvice };
}