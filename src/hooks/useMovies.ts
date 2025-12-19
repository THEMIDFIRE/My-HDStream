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
    getTrending,
    getByGenre,
    getDetails,
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

export function useDetails(type: 'movie' | 'tv', id: number) {
    return useQuery({
        queryKey: [type === 'movie' ? 'movie' : 'show', id],
        queryFn: () => getDetails(type, id),
        enabled: !!id,
        staleTime: 30 * 60 * 1000,
    })
}

export const useMovieDetails = (movieId: number) => useDetails('movie', movieId);
export const useShowDetails = (showId: number) => useDetails('tv', showId);

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

    const prefetchDetails = (type: 'movie' | 'tv', id: number) => {
        queryClient.prefetchQuery({
            queryKey: [type === 'movie' ? 'movie' : 'show', id],
            queryFn: () => getDetails(type, id),
            staleTime: 30 * 60 * 1000,
        })
    }

    const prefetchMovie = (movieId: number) => prefetchDetails('movie', movieId);
    const prefetchShow = (showId: number) => prefetchDetails('tv', showId);

    return { prefetchMovie, prefetchShow, prefetchMoviesGenre, prefetchShowsGenre }
}

export function useSearch(type: 'movie' | 'tv' , query: string, page: number = 1) {
    return useQuery({
        queryKey: ['search', type, query, page],
        queryFn: () => searchMedia(type, query, page),
        enabled: !!query && query.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    })
}