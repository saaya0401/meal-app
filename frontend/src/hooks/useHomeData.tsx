import { useCallback, useState } from "react"
import axios from "axios";
import { DashboardResponse } from "../types/homeData";

export const useHomeData = () => {
    const [data, setData] = useState<DashboardResponse>();
    const getData = useCallback(() => {
        axios.get<DashboardResponse>("http://localhost/api/dashboard")
            .then((res) => setData(res.data))
    }, [])
    return {getData, data}
}