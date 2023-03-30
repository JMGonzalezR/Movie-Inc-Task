import MovieList from "./src/screens/MovieList";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation";

export default function App() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}
