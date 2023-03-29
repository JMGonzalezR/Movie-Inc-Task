import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { fetchMovieDetails } from "../../api";
import { RootStackParamList } from "../../navigation";

interface MovieDetailsProps {
    navigation: StackNavigationProp<any>;
    route: RouteProp<RootStackParamList, "MovieDetails">;
}

interface MovieDetails {
    title: string;
    release_date: string;
    overview: string;
    genres: {
        id: number;
        name: string;
    }[];
    vote_average: number;
    poster_path: string;
    credits: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string;
        }[];
    };
}

const MovieDetails = ({ route }: MovieDetailsProps) => {
    const { id } = route.params;
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const movie = await fetchMovieDetails(id);
            setMovieDetails(movie);
        };
        fetchMovie();
    }, []);

    if (!movieDetails) {
        return null; // or a loading indicator
    }

    const {
        title,
        release_date,
        overview,
        genres,
        vote_average,
        poster_path,
        credits,
    } = movieDetails;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                    }}
                    style={styles.poster}
                    resizeMode="cover"
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.info}>{release_date.slice(0, 4)}</Text>
                    <Text style={styles.info}>
                        {genres.map((genre) => genre.name).join(", ")}
                    </Text>
                    <Text style={styles.info}>{vote_average} / 10</Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>{overview}</Text>
            </View>
            <View style={styles.cast}>
                <Text style={styles.castTitle}>Cast</Text>
                {credits.cast.slice(0, 10).map((castMember) => (
                    <View key={castMember.id} style={styles.castMember}>
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`,
                            }}
                            style={styles.castMemberImage}
                            resizeMode="cover"
                        />
                        <View style={styles.castMemberInfo}>
                            <Text style={styles.castMemberName}>
                                {castMember.name}
                            </Text>
                            <Text style={styles.castMemberCharacter}>
                                {castMember.character}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    poster: {
        width: 100,
        height: 150,
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    info: {
        fontSize: 14,
        color: "#888",
        marginBottom: 2,
    },
    description: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
    cast: {
        padding: 16,
    },
    castTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    castMember: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    castMemberImage: {
        width: 60,
        height: 90,
        marginRight: 16,
    },
    castMemberInfo: {
        flex: 1,
    },
    castMemberName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    castMemberCharacter: {
        fontSize: 14,
        color: "#888",
    },
});

export default MovieDetails;
