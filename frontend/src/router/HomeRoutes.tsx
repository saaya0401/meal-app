import { AllLogs } from "../components/pages/AllLogs";
import { Home } from "../components/pages/Home";

export const homeRoutes = [
    {
        path: "",
        element: <Home />
    },
    {
        path: "all-logs",
        element: <AllLogs />
    }
];