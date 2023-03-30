import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { fetchMovieDetails, rateMovie } from "../../api";
import { RootStackParamList } from "../../navigation";
import { Rating } from "react-native-ratings";
import { GuestSessionContext } from "../../providers/GuestSessionProvider";

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
    const { guestSessionId } = useContext(GuestSessionContext);
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchMovie = async () => {
            const movie = await fetchMovieDetails(id);
            setMovieDetails(movie);
        };
        fetchMovie();
    }, []);

    const handleRateMovie = (rating: number) => {
        rateMovie({ movieId: id, value: rating, guestSessionId }).then(() =>
            setRating(rating)
        );
    };

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

    const castItem = ({
        item,
    }: {
        item: MovieDetails["credits"]["cast"][0];
    }) => (
        <View key={item.id} style={styles.castMember}>
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                }}
                style={styles.castMemberImage}
                resizeMode="cover"
            />
            <View style={styles.castMemberInfo}>
                <Text style={styles.castMemberName}>{item.name}</Text>
                <Text style={styles.castMemberCharacter}>{item.character}</Text>
            </View>
        </View>
    );

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
                    <Rating
                        startingValue={rating}
                        onFinishRating={handleRateMovie}
                    />
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>{overview}</Text>
            </View>
            <View style={styles.cast}>
                <Text style={styles.castTitle}>Cast</Text>
                <ScrollView>
                    {credits.cast.map((item) => castItem({ item }))}
                </ScrollView>
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
        flex: 1,
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
    listContentContainer: {
        paddingBottom: 80,
    },
});

export default MovieDetails;
