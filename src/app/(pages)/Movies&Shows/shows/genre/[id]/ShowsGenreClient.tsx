'use client'

import { useShowsByGenre, usePrefetchDetails } from '@/hooks/useMovies';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaCard, ShowCard } from '@/app/_components/Cards/Cards';

interface ShowsGenreClientProps {
    genreId: number;
    genreName: string;
    initialPage: number;
    initialData: any;
}

export default function ShowsGenreClient({
    genreId,
    genreName,
    initialPage,
    initialData
}: ShowsGenreClientProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const router = useRouter();
    const { prefetchShow } = usePrefetchDetails();

    const { data: showsData, isLoading, isError, error } = useShowsByGenre(genreId, currentPage);
    const { results: shows, totalPages, totalResults } = showsData || initialData;

    const generatePageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('ellipsis');

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('ellipsis');
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/Movies&Shows/shows/genre/${genreId}?page=${page}`, { scroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg">Error loading shows: {error.message}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="mb-8">
                    <Link href="/Movies&Shows">
                        <Button variant="outline" className="mb-4">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        {genreName} TV Shows
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {isLoading ? 'Loading...' :
                            `Showing ${shows?.length || 0} of ${totalResults?.toLocaleString() || 0} shows (Page ${currentPage} of ${totalPages})`
                        }
                    </p>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="aspect-2/3 bg-gray-800 animate-pulse rounded-lg" />
                        ))}
                    </div>
                )}

                {!isLoading && shows && shows.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
                            {shows.map((show: any) => (
                                <Link href={`/Movies&Shows/tv/${show.id}`}>
                                    <MediaCard key={show.id} item={show} type="tv" />
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
                                            <PaginationPrevious className="pointer-events-none opacity-50" />
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
                                            <PaginationNext className="pointer-events-none opacity-50" />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                ) : !isLoading && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No shows found for this genre.</p>
                    </div>
                )}
            </div>
        </div>
    );
}