'use client'

import { getByGenre, getMovieDetails, getMovieGenres, getPopularMovies, getPopularShows, getShowDetails, getShowEpisodes, getShowsGenres, getTopRatedMovies, getTopRatedShows, getTrending, searchMedia } from '@/lib/api'
import type { Movie, PaginatedResponse, TVShow } from '@/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useTrending() {
    return useQuery({
        queryKey: ['trending'],
        queryFn: getTrending,
        staleTime: 5 * 60 * 1000,
    })
}

export function useTopRated(type: 'movie' | 'tv') {
    return useQuery<Movie[] | TVShow[]>({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'toprated'],
        queryFn: () => (type === 'movie' ? getTopRatedMovies() : getTopRatedShows()),
        staleTime: 10 * 60 * 1000,
    })
}

export function usePopular(type: 'movie' | 'tv') {
    return useQuery<Movie[] | TVShow[]>({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'popular'],
        queryFn: () => (type === 'movie' ? getPopularMovies() : getPopularShows()),
        staleTime: 10 * 60 * 1000,
    })
}

export function useGenres(type: 'movie' | 'tv') {
    return useQuery({
        queryKey: ['genres', type === 'movie' ? 'movies' : 'shows'],
        queryFn: () => (type === 'movie' ? getMovieGenres() : getShowsGenres()),
        staleTime: 60 * 60 * 1000,
    })
}

export const useMovieGenres = () => useGenres('movie');
export const useShowsGenres = () => useGenres('tv');

export function useByGenre(type: 'movie' | 'tv', genreId: number, page: number) {
    return useQuery<PaginatedResponse<Movie | TVShow>>({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'genre', genreId, page],
        queryFn: () => {
            if (type === 'movie') {
                return getByGenre('movie', genreId, page);
            } else {
                return getByGenre('tv', genreId, page);
            }
        },
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
}

export const useMoviesByGenre = (genreId: number, page: number) => {
    return useQuery<PaginatedResponse<Movie>>({
        queryKey: ['movies', 'genre', genreId, page],
        queryFn: () => getByGenre('movie', genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
};

export const useShowsByGenre = (genreId: number, page: number) => {
    return useQuery<PaginatedResponse<TVShow>>({
        queryKey: ['shows', 'genre', genreId, page],
        queryFn: () => getByGenre('tv', genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
};

export function useMovieDetails(movieId: number) {
    return useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetails(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000,
    })
}

export function useShowDetails(showId: number) {
    return useQuery({
        queryKey: ['show', showId],
        queryFn: () => getShowDetails(showId),
        enabled: !!showId,
        staleTime: 30 * 60 * 1000,
    })
}

export function useShowEpisodes(showId: number, seasonNumber: number) {
    return useQuery({
        queryKey: ['show', showId, 'season', seasonNumber, 'episodes'],
        queryFn: () => getShowEpisodes(showId, seasonNumber),
        enabled: !!showId && !!seasonNumber,
        staleTime: 30 * 60 * 1000,
    })
}

export function usePrefetchDetails() {
    const queryClient = useQueryClient()

    const prefetchByGenre = (type: 'movie' | 'tv', genreId: number) => {
        if (type === 'movie') {
            queryClient.prefetchQuery({
                queryKey: ['movies', 'genre', genreId],
                queryFn: () => getByGenre('movie', genreId, 1),
                staleTime: 10 * 60 * 1000,
            })
        } else {
            queryClient.prefetchQuery({
                queryKey: ['shows', 'genre', genreId],
                queryFn: () => getByGenre('tv', genreId, 1),
                staleTime: 10 * 60 * 1000,
            })
        }
    }

    const prefetchMoviesGenre = (genreId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['movies', 'genre', genreId],
            queryFn: () => getByGenre('movie', genreId, 1),
            staleTime: 10 * 60 * 1000,
        })
    };

    const prefetchShowsGenre = (genreId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['shows', 'genre', genreId],
            queryFn: () => getByGenre('tv', genreId, 1),
            staleTime: 10 * 60 * 1000,
        })
    };

    const prefetchMovie = (movieId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['movie', movieId],
            queryFn: () => getMovieDetails(movieId),
            staleTime: 30 * 60 * 1000,
        })
    }

    const prefetchShow = (showId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['show', showId],
            queryFn: () => getShowDetails(showId),
            staleTime: 30 * 60 * 1000,
        })
    }

    return { prefetchMovie, prefetchShow, prefetchByGenre }
}

export function useSearch(type: 'movie' | 'tv', query: string, page: number = 1) {
    return useQuery<PaginatedResponse<Movie | TVShow>>({
        queryKey: ['search', type, query, page],
        queryFn: () => {
            if (type === 'movie') {
                return searchMedia('movie', query, page);
            } else {
                return searchMedia('tv', query, page);
            }
        },
        enabled: !!query && query.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    })
}