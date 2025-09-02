import { createContext, ReactNode, useContext } from "react";
import { useAllLogs } from "../hooks/useAllLogs";

type AllLogsValue = ReturnType<typeof useAllLogs>;

const AllLogsContext = createContext<AllLogsValue | undefined>(undefined);

export const AllLogsProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const value = useAllLogs();
    return (
        <AllLogsContext.Provider value={value}>
            {children}
        </AllLogsContext.Provider>
    );
}
export const useAllLogsContext = (): AllLogsValue => {
    const ctx = useContext(AllLogsContext);
    if (!ctx) {
        throw new Error("useLogsContext must be used within <LogsProvider>");
    }
    return ctx;
}