import { createContext, ReactNode, useContext } from "react";
import { useLogs } from "../hooks/useLogs";

type LogsValue = ReturnType<typeof useLogs>;

const LogsContext = createContext<LogsValue | undefined>(undefined);

export const LogsProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const value = useLogs();
    return (
        <LogsContext.Provider value={value}>
            {children}
        </LogsContext.Provider>
    );
}
export const useLogsContext = (): LogsValue => {
    const ctx = useContext(LogsContext);
    if (!ctx) {
        throw new Error("useLogsContext must be used within <LogsProvider>");
    }
    return ctx;
}