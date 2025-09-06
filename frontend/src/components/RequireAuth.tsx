import { useEffect, useState } from "react"
import { Navigate, Outlet} from "react-router-dom";
import { axiosInstance } from "../api/axios";

export const RequireAuth = () =>{
    const [status, setStatus] = useState<"checking" | "ok" | "ng">("checking");

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setStatus("ng");
            return;
        }
        axiosInstance.get("/api/me").then(() => setStatus("ok")).catch(() => {
            localStorage.removeItem("auth_token");
            setStatus("ng");
        });
    }, []);

    if (status === "checking") return null;
    if (status === "ng") {
        return <Navigate to="/login" replace  />;
    }

    return <Outlet />
}