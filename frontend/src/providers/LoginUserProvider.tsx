import { User } from "../hooks/useAuth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type LoginUserContextType = {
    loginUser: User | null;
    setLoginUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

export const LoginUserProvider = ({ children }: { children: ReactNode }) => {
    const [loginUser, setLoginUser] = useState<User | null>(null);
    useEffect(() => {
        const stored = localStorage.getItem("loginUser");
        if (stored) {
            setLoginUser(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (loginUser) {
            localStorage.setItem("loginUser", JSON.stringify(loginUser));
        } else {
            localStorage.removeItem("loginUser");
        }
    });
    return (
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    )
}

export const useLoginUser = () => {
    const context = useContext(LoginUserContext);
    if (!context) {
        throw new Error("useLoginUser must be used within a LoginUserProvider");
    }
    return context;
}