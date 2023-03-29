import { createStackNavigator } from "@react-navigation/stack";
import MovieList from "../screens/MovieList";
import MovieDetails from "../screens/MovieDetails";

export type RootStackParamList = {
    MovieList: undefined;
    MovieDetails: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="MovieList">
            <Stack.Screen name="MovieList" component={MovieList} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
    );
};
