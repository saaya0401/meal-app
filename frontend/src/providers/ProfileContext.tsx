import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Profile } from "../types/homeData";

type ProfileContextType = {
    profile: Profile  | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    useEffect(() => {
        if (profile) {
            localStorage.setItem("profile", JSON.stringify(profile));
        }
    }, [profile]);
    return (
        <ProfileContext.Provider value={{setProfile, profile}}>
            {children}
        </ProfileContext.Provider>
    );
}
export const useProfile = () => {
    const ctx = useContext(ProfileContext);
    if (!ctx) {
        throw new Error("useProfile must be used within <LogsProvider>");
    }
    return ctx;
}