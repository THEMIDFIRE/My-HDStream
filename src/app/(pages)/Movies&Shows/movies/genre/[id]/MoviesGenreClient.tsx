'use client'

import { MediaCard } from '@/app/_components/Cards/Cards';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useMoviesByGenre } from '@/hooks/useMovies';
import { MoviesGenreClientProps } from '@/types/types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function MoviesGenreClient({ genreId, genreName, initialPage, initialData }: MoviesGenreClientProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const router = useRouter();

    const { data: moviesData, isLoading, isError, error } = useMoviesByGenre(genreId, currentPage);

    const { results: movies, totalPages, totalResults } = moviesData || initialData;

    const generatePageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('ellipsis');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/Movies&Shows/movies/genre/${genreId}?page=${page}`, { scroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg">Error loading movies: {error.message}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen py-10">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                    <div className="mb-8">
                        <Button onClick={() => router.back()} variant="outline" className="mb-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {genreName} Movies
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {isLoading ? (
                                'Loading...'
                            ) : (
                                `Showing ${movies?.length || 0} of ${totalResults?.toLocaleString() || 0} movies (Page ${currentPage} of ${totalPages})`
                            )}
                        </p>
                    </div>

                    {isLoading && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="aspect-2/3 bg-gray-800 animate-pulse rounded-lg" />
                            ))}
                        </div>
                    )}

                    {!isLoading && movies && movies.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
                                {movies.map((movie: any) => (
                                    <Link href={`/Movies&Shows/movie/${movie.id}`} key={movie.id}>
                                        <MediaCard item={movie} type="movie" />
                                    </Link>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            {currentPage > 1 ? (
                                                <PaginationPrevious
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    className="cursor-pointer"
                                                />
                                            ) : (
                                                <PaginationPrevious
                                                    className="pointer-events-none opacity-50"
                                                />
                                            )}
                                        </PaginationItem>

                                        {pageNumbers.map((pageNum, index) => (
                                            <PaginationItem key={index}>
                                                {pageNum === 'ellipsis' ? (
                                                    <PaginationEllipsis />
                                                ) : (
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(pageNum)}
                                                        isActive={currentPage === pageNum}
                                                        className="cursor-pointer"
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            {currentPage < totalPages ? (
                                                <PaginationNext
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    className="cursor-pointer"
                                                />
                                            ) : (
                                                <PaginationNext
                                                    className="pointer-events-none opacity-50"
                                                />
                                            )}
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </>
                    ) : !isLoading && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No movies found for this genre.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}