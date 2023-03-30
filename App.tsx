import MovieList from "./src/screens/MovieList";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGuestSession } from "./src/api";
import { GuestSessionProvider } from "./src/providers/GuestSessionProvider";

export default function App() {
    return (
        <GuestSessionProvider>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </GuestSessionProvider>
    );
}
