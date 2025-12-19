'use client'

import { 
    getByGenre, 
    getMovieDetails,
    getShowDetails,
    getMovieGenres, 
    getPopularMovies, 
    getPopularShows, 
    getShowEpisodes, 
    getShowsGenres, 
    getTopRatedMovies, 
    getTopRatedShows, 
    getTrending, 
    searchMedia 
} from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useTrending() {
    return useQuery({
        queryKey: ['trending'],
        queryFn: getTrending,
        staleTime: 5 * 60 * 1000,
    })
}

export function useTopRated(type: 'movie' | 'tv') {
    return useQuery({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'toprated'],
        queryFn: () => (type === 'movie' ? getTopRatedMovies() : getTopRatedShows()),
        staleTime: 10 * 60 * 1000,
    })
}

export const useTopRatedMovies = () => useTopRated('movie');
export const useTopRatedShows = () => useTopRated('tv');

export function usePopular(type: 'movie' | 'tv') {
    return useQuery({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'popular'],
        queryFn: () => (type === 'movie' ? getPopularMovies() : getPopularShows()),
        staleTime: 10 * 60 * 1000,
    })
}

export const usePopularMovies = () => usePopular('movie');
export const usePopularShows = () => usePopular('tv');

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
    return useQuery({
        queryKey: [type === 'movie' ? 'movies' : 'shows', 'genre', genreId, page],
        queryFn: () => getByGenre(type, genreId, page),
        enabled: !!genreId && page > 0,
        staleTime: 10 * 60 * 1000,
    })
}

export const useMoviesByGenre = (genreId: number, page: number) => useByGenre('movie', genreId, page);
export const useShowsByGenre = (genreId: number, page: number) => useByGenre('tv', genreId, page);

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
        queryClient.prefetchQuery({
            queryKey: [type === 'movie' ? 'movies' : 'shows', 'genre', genreId],
            queryFn: () => getByGenre(type, genreId, 1),
            staleTime: 10 * 60 * 1000,
        })
    }

    const prefetchMoviesGenre = (genreId: number) => prefetchByGenre('movie', genreId);
    const prefetchShowsGenre = (genreId: number) => prefetchByGenre('tv', genreId);

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

export function useSearch(type: 'movie' | 'tv', query: string, page: number = 1) {
    return useQuery({
        queryKey: ['search', type, query, page],
        queryFn: () => searchMedia(type, query, page),
        enabled: !!query && query.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    })
}