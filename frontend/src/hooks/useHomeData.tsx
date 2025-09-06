import { useCallback, useState } from "react"
import { DashboardResponse } from "../types/homeData";
import { axiosInstance } from "../api/axios";

export const useHomeData = () => {
    const [data, setData] = useState<DashboardResponse>();
    const getData = useCallback(() => {
        axiosInstance.get<DashboardResponse>("/api/dashboard")
            .then((res) => setData(res.data))
    }, [])
    return {getData, data}
}