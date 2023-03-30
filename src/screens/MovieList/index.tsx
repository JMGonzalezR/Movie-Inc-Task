import React, { useState, useEffect } from "react";
import {
    FlatList,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { fetchMovies } from "../../api";
import { StackNavigationProp } from "@react-navigation/stack";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}
interface MovieListProps {
    navigation: StackNavigationProp<any>;
}

const MovieList = ({ navigation }: MovieListProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            const movieList = await fetchMovies();
            setMovies(movieList);
        };
        getMovies();
    }, []);

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetails", { id: item.id })}
        >
            <View style={styles.movieContainer}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    }}
                    style={styles.posterImage}
                />
                <View style={styles.movieDetailsContainer}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.releaseDate}>{item.release_date}</Text>
                    <Text
                        style={styles.voteAverage}
                    >{`Average Rating: ${item.vote_average}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={movies.sort((a, b) => a.title.localeCompare(b.title))}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    movieContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    posterImage: {
        width: 100,
        height: 150,
    },
    movieDetailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    releaseDate: {
        marginVertical: 5,
    },
    voteAverage: {
        fontStyle: "italic",
    },
});

export default MovieList;
