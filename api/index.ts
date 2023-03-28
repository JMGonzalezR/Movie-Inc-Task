import axios from "axios";

const API_KEY = "b74975159aa4eddfe0321cda55fd4d11";

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

export const fetchMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
};
