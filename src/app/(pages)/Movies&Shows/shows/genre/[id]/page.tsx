import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getShowsByGenre, getShowsGenres } from '@/lib/api';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const genres = await getShowsGenres();
    const genre = genres.find((g: any) => g.id === parseInt(id));

    return {
        title: `${genre?.name || 'Genre'} TV Shows`,
        description: `Browse all ${genre?.name || ''} TV shows`
    };
}

export default async function GenreShowsPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { page: pageParam } = await searchParams;

    const genreId = parseInt(id);
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const [showsData, genres] = await Promise.all([
        getShowsByGenre(genreId, currentPage),
        getShowsGenres()
    ]);

    const genre = genres.find((g: any) => g.id === genreId);
    const { results: shows, totalPages, totalResults } = showsData;

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
                        {genre?.name || 'Genre'} TV Shows
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Showing {shows.length} of {totalResults.toLocaleString()} shows (Page {currentPage} of {totalPages})
                    </p>
                </div>

                {shows.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
                            {shows.map((show: any) => (
                                <Card key={show.id} className="overflow-hidden group cursor-pointer hover:border-red-500 transition-all">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-2/3 overflow-hidden">
                                            {show.poster_path ? (
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                                    alt={show.name || 'Show poster'}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    <span className="text-gray-500">No Image</span>
                                                </div>
                                            )}
                                            {show.vote_average > 0 && (
                                                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                                                    ⭐ {show.vote_average.toFixed(1)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-white">
                                                {show.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        {currentPage > 1 ? (
                                            <PaginationPrevious
                                                href={`/Movies&Shows/shows/genre/${genreId}?page=${currentPage - 1}`}
                                            />
                                        ) : (
                                            <PaginationPrevious
                                                href="#"
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
                                                    href={`/Movies&Shows/shows/genre/${genreId}?page=${pageNum}`}
                                                    isActive={currentPage === pageNum}
                                                >
                                                    {pageNum}
                                                </PaginationLink>
                                            )}
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        {currentPage < totalPages ? (
                                            <PaginationNext
                                                href={`/Movies&Shows/shows/genre/${genreId}?page=${currentPage + 1}`}
                                            />
                                        ) : (
                                            <PaginationNext
                                                href="#"
                                                className="pointer-events-none opacity-50"
                                            />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No shows found for this genre.</p>
                    </div>
                )}
            </div>
        </div>
    );
}