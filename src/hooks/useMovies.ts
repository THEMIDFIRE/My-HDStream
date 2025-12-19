'use client'

import {
    getMovieDetails,
    getMovieGenres,
    getMoviesByGenre,
    getPopularMovies,
    getPopularShows,
    getShowDetails,
    getShowEpisodes,
    getShowsByGenre,
    getShowsGenres,
    getTopRatedMovies,
    getTopRatedShows,
    getTrending
} from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useTrending() {
    return useQuery({
        queryKey: ['trending'],
        queryFn: getTrending,
        staleTime: 5 * 60 * 1000,
    })
}

export function useTopRatedMovies() {
    return useQuery({
        queryKey: ['movies', 'toprated'],
        queryFn: getTopRatedMovies,
        staleTime: 10 * 60 * 1000,
    })
}

export function useTopRatedShows() {
    return useQuery({
        queryKey: ['shows', 'toprated'],
        queryFn: getTopRatedShows,
        staleTime: 10 * 60 * 1000,
    })
}

export function usePopularMovies() {
    return useQuery({
        queryKey: ['movies', 'popular'],
        queryFn: getPopularMovies,
        staleTime: 10 * 60 * 1000,
    })
}

export function usePopularShows() {
    return useQuery({
        queryKey: ['shows', 'popular'],
        queryFn: getPopularShows,
        staleTime: 10 * 60 * 1000,
    })
}

export function useMovieGenres() {
    return useQuery({
        queryKey: ['genres', 'movies'],
        queryFn: getMovieGenres,
        staleTime: 60 * 60 * 1000,
    })
}

export function useShowsGenres() {
    return useQuery({
        queryKey: ['genres', 'shows'],
        queryFn: getShowsGenres,
        staleTime: 60 * 60 * 1000,
    })
}

export function useMoviesByGenre(genreId: number, page: number) {
    return useQuery({
        queryKey: ['movies', 'genre', genreId, page],
        queryFn: () => getMoviesByGenre(genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
}

export function useShowsByGenre(genreId: number, page: number) {
    return useQuery({
        queryKey: ['shows', 'genre', genreId, page],
        queryFn: () => getShowsByGenre(genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
}

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

    const prefetchMoviesGenre = (genreId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['movies', 'genre', genreId],
            queryFn: () => getMoviesByGenre(genreId, 1),
            staleTime: 10 * 60 * 1000,
        })
    }

    const prefetchShowsGenre = (genreId: number) => {
        queryClient.prefetchQuery({
            queryKey: ['shows', 'genre', genreId],
            queryFn: () => getShowsByGenre(genreId, 1),
            staleTime: 10 * 60 * 1000,
        })
    }

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

    return { prefetchMovie, prefetchShow, prefetchMoviesGenre, prefetchShowsGenre }
}