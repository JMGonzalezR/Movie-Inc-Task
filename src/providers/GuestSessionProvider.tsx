import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGuestSession } from "../api";

type GuestSessionContextType = {
    guestSessionId: string | null;
};

export const GuestSessionContext = createContext<GuestSessionContextType>({
    guestSessionId: null,
});

type GuestSessionProviderProps = {
    children: React.ReactNode;
};

export const GuestSessionProvider = ({
    children,
}: GuestSessionProviderProps) => {
    const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

    useEffect(() => {
        const getGuestSessionId = async () => {
            const storedGuestSessionId = await AsyncStorage.getItem(
                "guestSessionId"
            );

            if (storedGuestSessionId) {
                setGuestSessionId(storedGuestSessionId);
            } else {
                const newGuestSessionId = await createGuestSession();
                setGuestSessionId(newGuestSessionId);
                await AsyncStorage.setItem("guestSessionId", newGuestSessionId);
            }
        };

        getGuestSessionId();
    }, []);

    return (
        <GuestSessionContext.Provider value={{ guestSessionId }}>
            {children}
        </GuestSessionContext.Provider>
    );
};
