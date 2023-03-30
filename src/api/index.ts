import axios from "axios";

const API_KEY = "b74975159aa4eddfe0321cda55fd4d11";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
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

interface Rating {
    movieId: number;
    value: number;
}

export const fetchMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
};

export const fetchMovieDetails = async (movieId: number) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
        );
        const data = await response.json();

        const {
            title,
            release_date,
            overview,
            genres,
            vote_average,
            poster_path,
            credits,
        } = data;

        // Extract the first 10 cast members
        const cast = credits.cast.slice(0, 10).map((castMember: any) => ({
            id: castMember.id,
            name: castMember.name,
            character: castMember.character,
            profile_path: castMember.profile_path,
        }));

        const movieDetails: MovieDetails = {
            title,
            release_date,
            overview,
            genres,
            vote_average,
            poster_path,
            credits: {
                cast,
            },
        };

        return movieDetails;
    } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
        throw error;
    }
};

export const rateMovie = async (rating: Rating) => {
    try {
        const response = await axios.post(
            `https://api.themoviedb.org/3/movie/${rating.movieId}/rating?api_key=${API_KEY}`,
            {
                value: rating.value,
            }
        );
        const data = response.data;
        return data;
    } catch (error) {
        console.error(`Error rating movie: ${error}`);
        throw error;
    }
};
