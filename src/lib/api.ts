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
export async function getDetails(type: 'movie' | 'tv', id: number) {
    return fetchFromApi(`/${type}/${id}?append_to_response=credits%2Creviews&language=en-US`);
}

export const getMovieDetails = (movieId: number) => getDetails('movie', movieId);
export const getShowDetails = (showId: number) => getDetails('tv', showId);

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