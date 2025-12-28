import type {
    Genre,
    MovieDetails,
    ShowDetails,
    SeasonEpisodes,
    PaginatedResponse,
    Movie,
    TVShow,
    TrendingItem
} from '@/types/types';

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
export async function getTrending(): Promise<TrendingItem[]> {
    const data = await fetchFromApi<{ results: TrendingItem[] }>('/trending/all/week?language=en-US');
    return data.results || [];
}

// Genres
export async function getGenres(type: 'movie' | 'tv'): Promise<Genre[]> {
    const data = await fetchFromApi<{ genres: Genre[] }>(`/genre/${type}/list?language=en`);
    return data.genres || [];
}

export const getMovieGenres = (): Promise<Genre[]> => getGenres('movie');
export const getShowsGenres = (): Promise<Genre[]> => getGenres('tv');

// Discover by genre with pagination
export async function getByGenre(
    type: 'movie',
    genreId: number,
    page?: number
): Promise<PaginatedResponse<Movie>>;
export async function getByGenre(
    type: 'tv',
    genreId: number,
    page?: number
): Promise<PaginatedResponse<TVShow>>;
export async function getByGenre(
    type: 'movie' | 'tv',
    genreId: number,
    page: number = 1
): Promise<PaginatedResponse<Movie | TVShow>> {
    const data = await fetchFromApi<PaginatedResponse<Movie | TVShow>>(
        `/discover/${type}?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
    );

    return {
        results: data.results || [],
        page: data.page || 1,
        total_pages: data.total_pages || 1,
        total_results: data.total_results || 0
    };
}

export const getMoviesByGenre = (genreId: number, page?: number): Promise<PaginatedResponse<Movie>> =>
    getByGenre('movie', genreId, page);
export const getShowsByGenre = (genreId: number, page?: number): Promise<PaginatedResponse<TVShow>> =>
    getByGenre('tv', genreId, page);

// Popular content
export async function getPopular(type: 'movie'): Promise<Movie[]>;
export async function getPopular(type: 'tv'): Promise<TVShow[]>;
export async function getPopular(type: 'movie' | 'tv'): Promise<(Movie | TVShow)[]> {
    const data = await fetchFromApi<{ results: (Movie | TVShow)[] }>(`/${type}/popular?language=en-US`);
    return data.results || [];
}

export const getPopularMovies = (): Promise<Movie[]> => getPopular('movie');
export const getPopularShows = (): Promise<TVShow[]> => getPopular('tv');

// Top rated content
export async function getTopRated(type: 'movie'): Promise<Movie[]>;
export async function getTopRated(type: 'tv'): Promise<TVShow[]>;
export async function getTopRated(type: 'movie' | 'tv'): Promise<(Movie | TVShow)[]> {
    const data = await fetchFromApi<{ results: (Movie | TVShow)[] }>(`/${type}/top_rated?language=en-US`);
    return data.results || [];
}

export const getTopRatedMovies = (): Promise<Movie[]> => getTopRated('movie');
export const getTopRatedShows = (): Promise<TVShow[]> => getTopRated('tv');

// Details
export async function getDetails(type: 'movie', id: number): Promise<MovieDetails>;
export async function getDetails(type: 'tv', id: number): Promise<ShowDetails>;
export async function getDetails(type: 'movie' | 'tv', id: number): Promise<MovieDetails | ShowDetails> {
    return fetchFromApi(`/${type}/${id}?append_to_response=credits%2Creviews&language=en-US`);
}

export const getMovieDetails = (movieId: number): Promise<MovieDetails> => getDetails('movie', movieId);
export const getShowDetails = (showId: number): Promise<ShowDetails> => getDetails('tv', showId);

// Show episodes (specific to TV shows)
export async function getShowEpisodes(showId: number, seasonId: number): Promise<SeasonEpisodes> {
    return fetchFromApi(`/tv/${showId}/season/${seasonId}`);
}

// Search
export async function searchMedia(type: 'movie', query: string, page?: number): Promise<PaginatedResponse<Movie>>;
export async function searchMedia(type: 'tv', query: string, page?: number): Promise<PaginatedResponse<TVShow>>;
export async function searchMedia(
    type: 'movie' | 'tv',
    query: string,
    page: number = 1
): Promise<PaginatedResponse<Movie | TVShow>> {
    if (!query || query.trim().length === 0) {
        return {
            results: [],
            page: 1,
            total_pages: 0,
            total_results: 0
        };
    }

    const data = await fetchFromApi<PaginatedResponse<Movie | TVShow>>(
        `/search/${type}?query=${encodeURIComponent(query)}&page=${page}&language=en-US&include_adult=false`
    );

    return {
        results: data.results || [],
        page: data.page || 1,
        total_pages: data.total_pages || 1,
        total_results: data.total_results || 0
    };
}