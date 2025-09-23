import { useCallback, useState } from "react"
import { axiosInstance } from "../api/axios";
import { useLoginUser } from "../providers/LoginUserProvider";

export type User = {
    id: number;
    name: string;
    email: string;
}
export const useAuth = () => {
    const { setLoginUser } = useLoginUser();
    const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async(email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post<{ token: string; user: User }>("/api/login", { email, password });
            const t = res.data.token;
            localStorage.setItem("auth_token", t);
            setToken(t);
            setLoginUser(res.data.user);
            return { ok: true as const };
        } catch (e) {
            setError("メールアドレスまたはパスワードが正しくありません");
            return { ok: false as const };
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post<{ token: string; user: User }>("/api/register", { name, email, password });
            const t = res.data.token;
            localStorage.setItem("auth_token", t);
            setToken(t);
            setLoginUser(res.data.user);
            return { ok: true as const };
        } catch (e:any) {
            if (e.response?.status === 422) {
                if (e.response.data?.errors?.email?.[0]?.includes("taken")) {
                    setError("このメールアドレスは既に登録されています");
                }
            } else {
                setError("登録に失敗しました");
            }
            return { ok: false as const };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await axiosInstance.post("/api/logout");
        } catch (e) {
            console.warn("サーバーログアウト失敗", e);
        } finally {
            localStorage.removeItem("auth_token");
            delete axiosInstance.defaults.headers.common.Authorization;
            setToken(null);
            setLoginUser(null);
        }
    }, []);
    return { login, register, logout, token, error, loading };
}