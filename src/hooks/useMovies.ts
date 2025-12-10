'use client'

import { getMovieDetails, getMovieGenres, getMoviesByGenre, getShowDetails, getShowsByGenre, getShowsGenres, getTrending, searchMulti } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// Trending content
export function useTrending() {
    return useQuery({
        queryKey: ['trending'],
        queryFn: getTrending,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

// Movie genres
export function useMovieGenres() {
    return useQuery({
        queryKey: ['genres', 'movies'],
        queryFn: getMovieGenres,
        staleTime: 60 * 60 * 1000, // 1 hour - genres don't change often
    })
}

// TV show genres
export function useShowsGenres() {
    return useQuery({
        queryKey: ['genres', 'shows'],
        queryFn: getShowsGenres,
        staleTime: 60 * 60 * 1000, // 1 hour
    })
}

// Movies by genre with pagination
export function useMoviesByGenre(genreId: number, page: number) {
    return useQuery({
        queryKey: ['movies', 'genre', genreId, page],
        queryFn: () => getMoviesByGenre(genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000, // 10 minutes
    })
}

// Shows by genre with pagination
export function useShowsByGenre(genreId: number, page: number) {
    return useQuery({
        queryKey: ['shows', 'genre', genreId, page],
        queryFn: () => getShowsByGenre(genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
}

// Movie details
export function useMovieDetails(movieId: number) {
    return useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetails(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000, // 30 minutes
    })
}

// Show details
export function useShowDetails(showId: number) {
    return useQuery({
        queryKey: ['show', showId],
        queryFn: () => getShowDetails(showId),
        enabled: !!showId,
        staleTime: 30 * 60 * 1000,
    })
}

// Search
export function useSearch(query: string, page: number = 1) {
    return useQuery({
        queryKey: ['search', query, page],
        queryFn: () => searchMulti(query, page),
        enabled: query.length > 2, // Only search if query is 3+ characters
        staleTime: 5 * 60 * 1000,
    })
}

// Hook to prefetch movie/show details on hover
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