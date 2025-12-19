const getApiConfig = () => {
    const isServer = typeof window === 'undefined';
    return {
        baseUrl: isServer
            ? process.env.API_BASE_URL
            : process.env.NEXT_PUBLIC_API_BASE_URL,
        token: isServer
            ? process.env.ACCESS_TOKEN
            : process.env.NEXT_PUBLIC_ACCESS_TOKEN
    };
};

// Generic fetch function
async function fetchFromApi<T>(endpoint: string): Promise<T> {
    const { baseUrl, token } = getApiConfig();

    const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    return res.json();
}

// Trending
export async function getTrending() {
    const data = await fetchFromApi<{ results: any[] }>('/trending/all/week?language=en-US');
    return data.results || [];
}

// Types for Details
interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    runtime?: number;
    genres?: Array<{ id: number; name: string }>;
    credits?: any;
    reviews?: any;
    [key: string]: any;
}

interface ShowDetails {
    id: number;
    name: string;
    overview: string;
    backdrop_path?: string;
    poster_path?: string;
    first_air_date?: string;
    vote_average?: number;
    number_of_seasons?: number;
    number_of_episodes?: number;
    genres?: Array<{ id: number; name: string }>;
    credits?: any;
    reviews?: any;
    seasons?: any[];
    [key: string]: any;
}

// Genres
export async function getGenres(type: 'movie' | 'tv') {
    const data = await fetchFromApi<{ genres: any[] }>(`/genre/${type}/list?language=en`);
    return data.genres || [];
}

export const getMovieGenres = () => getGenres('movie');
export const getShowsGenres = () => getGenres('tv');

// Discover by genre with pagination
interface PaginatedResponse {
    results: any[];
    page: number;
    total_pages: number;
    total_results: number;
}

export async function getByGenre(type: 'movie' | 'tv', genreId: number, page: number = 1) {
    const data = await fetchFromApi<PaginatedResponse>(
        `/discover/${type}?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
    );

    return {
        results: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0
    };
}

export const getMoviesByGenre = (genreId: number, page?: number) => getByGenre('movie', genreId, page);
export const getShowsByGenre = (genreId: number, page?: number) => getByGenre('tv', genreId, page);

// Popular content
export async function getPopular(type: 'movie' | 'tv') {
    const data = await fetchFromApi<{ results: any[] }>(`/${type}/popular?language=en-US`);
    return data.results || [];
}

export const getPopularMovies = () => getPopular('movie');
export const getPopularShows = () => getPopular('tv');

// Top rated content
export async function getTopRated(type: 'movie' | 'tv') {
    const data = await fetchFromApi<{ results: any[] }>(`/${type}/top_rated?language=en-US`);
    return data.results || [];
}

export const getTopRatedMovies = () => getTopRated('movie');
export const getTopRatedShows = () => getTopRated('tv');

// Details
export async function getDetails(type: 'movie', id: number): Promise<MovieDetails>;
export async function getDetails(type: 'tv', id: number): Promise<ShowDetails>;
export async function getDetails(type: 'movie' | 'tv', id: number): Promise<MovieDetails | ShowDetails> {
    return fetchFromApi(`/${type}/${id}?append_to_response=credits%2Creviews&language=en-US`);
}

export const getMovieDetails = (movieId: number): Promise<MovieDetails> => getDetails('movie', movieId);
export const getShowDetails = (showId: number): Promise<ShowDetails> => getDetails('tv', showId);

// Show episodes (specific to TV shows)
export async function getShowEpisodes(showId: number, seasonId: number) {
    return fetchFromApi(`/tv/${showId}/season/${seasonId}`);
}

// Search
export async function searchMedia(type: 'movie' | 'tv', query: string, page: number = 1) {
    if (!query || query.trim().length === 0) {
        return {
            results: [],
            page: 1,
            totalPages: 0,
            totalResults: 0
        };
    }

    const data = await fetchFromApi<PaginatedResponse>(
        `/search/${type}?query=${encodeURIComponent(query)}&page=${page}&language=en-US&include_adult=false`
    );

    return {
        results: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0
    };
}