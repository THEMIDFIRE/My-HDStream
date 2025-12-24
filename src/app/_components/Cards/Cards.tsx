"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePrefetchDetails } from '@/hooks/useMovies';
import { GenreCardProps, MediaCardProps } from "@/types/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DeviceCard({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <Card className="border p-6 md:p-10 h-full bg-linear-to-tr from-black to-red-900/25 from-35% to-90%">
            <CardHeader className="space-y-5">
                <CardTitle className="flex items-center gap-2.5 text-lg md:text-xl xl:text-2xl font-semibold">
                    <span className="[&>svg]:fill-red-700 [&>svg]:text-accent border rounded-xl p-2.5 md:p-3 xl:p-4 bg-gray-900/40 [&>svg]:size-11 [&>svg]:md:size-12 [&>svg]:xl:size-14">{icon}</span>
                    {title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base lg:text-lg font-normal">{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export function PriceCard({ title, description, price, currency, period }: { title: string, description: string, price: number, currency: string, period: string }) {
    return (
        <Card className="min-w-[30%] 2xl:px-7 2xl:py-12 space-y-2 md:space-y-3 2xl:space-y-7">
            <CardHeader className="space-y-2.5 md:space-y-3 2xl:space-y-4">
                <CardTitle className="text-lg md:text-xl 2xl:text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-sm md:text-base 2xl:text-lg text-gray-300/50">{description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm md:text-base 2xl:text-lg font-medium text-gray-300/50">
                <span className="text-white text-2xl md:text-3xl 2xl:text-4xl font-semibold">{currency}{price}</span> /{period}
            </CardContent>
            <CardFooter className="gap-3 justify-center">
                <Button className="bg-black text-white text-sm 2xl:text-lg font-semibold rounded px-7 py-6 ">Start free trial</Button>
                <Button className="bg-red-500 text-white text-sm 2xl:text-lg font-semibold rounded px-7 py-6 ">Choose Plan</Button>
            </CardFooter>
        </Card>
    )
}

export function GenreCard({ genre, type }: GenreCardProps) {
    const { prefetchByGenre } = usePrefetchDetails();

    const isMovie = type === 'movie';
    const basePath = isMovie ? '/Movies&Shows/movies/genre' : '/Movies&Shows/shows/genre';

    const handleMouseEnter = () => {
        if (isMovie) {
            prefetchByGenre('movie', genre.id);
        } else {
            prefetchByGenre('tv', genre.id);
        }
    };

    return (
        <Link href={`${basePath}/${genre.id}`} className="block transition-transform hover:scale-105">
            <Card
                className="cursor-pointer hover:border-red-500 transition-colors"
                onMouseEnter={handleMouseEnter}
            >
                <CardHeader>
                    <CardTitle className="text-center truncate">{genre.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}

export function MovieGenresCard({ genre }: { genre: GenreCardProps['genre'] }) {
    return <GenreCard genre={genre} type="movie" />;
}

export function ShowsGenresCard({ genre }: { genre: GenreCardProps['genre'] }) {
    return <GenreCard genre={genre} type="tv" />;
}


export function MediaCard({ item, type, showRemoveButton, onRemove }: MediaCardProps & { showRemoveButton?: boolean, onRemove?: (id: number) => void }) {
    const { prefetchMovie, prefetchShow } = usePrefetchDetails();

    const isMovie = type === 'movie' || item.media_type === 'movie' || !!item.title;
    const displayTitle = item.title || item.name || 'Unknown';
    const releaseYear = item.release_date
        ? new Date(item.release_date).getFullYear()
        : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : 'N/A';

    const handleMouseEnter = () => {
        if (isMovie) {
            prefetchMovie(item.id);
        } else {
            prefetchShow(item.id);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRemove) {
            onRemove(item.id);
        }
    };

    return (
        <Card
            className="overflow-hidden group cursor-pointer hover:border-red-500 transition-all py-0 relative"
            onMouseEnter={handleMouseEnter}
        >
            {showRemoveButton && (
                <Button variant={"destructive"} size={"icon"}
                    onClick={handleRemove}
                    className="absolute top-2 left-2 z-10 size-6 text-white rounded-full transition-colors shadow-lg dark:hover:bg-destructive"
                    aria-label="Remove from watch later"
                >
                    <X className="size-4" />
                </Button>
            )}

            <CardContent className="p-0">
                <div className="relative aspect-2/3 overflow-hidden">
                    {item.poster_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                            alt={displayTitle}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                    {item.vote_average && item.vote_average > 0 && (
                        <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold flex -items-center gap-2 justify-between">
                            <StarIcon className="size-4" fill="#f0b100" /> {item.vote_average.toFixed(1)}
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h3 className="font-semibold text-sm md:text-base truncate line-clamp-2 text-white">
                                {displayTitle}
                            </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{displayTitle}</p>
                        </TooltipContent>
                    </Tooltip>
                    <p className="text-xs text-gray-400 mt-1">
                        {releaseYear}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export function MovieCard({ movie }: { movie: MediaCardProps['item'] }) {
    return <MediaCard item={movie} type="movie" />;
}

export function ShowCard({ show }: { show: MediaCardProps['item'] }) {
    return <MediaCard item={show} type="tv" />;
}

export function ReviewCard({ review }: any) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card>
            <CardHeader className="flex items-center">
                <Avatar>
                    <AvatarImage src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`} />
                    <AvatarFallback>
                        {review.author_details.name.split(" ")[0][0]}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="flex flex-col space-y-0.5">
                    <span>{review.author_details.name}</span>
                    <span className="text-xs text-gray-500/50">{formatDate(review.created_at)}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-6 text-balance text-justify">
                    {review.content}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export function CastCard({ cast }: any) {
    return (
        <Tooltip>
            <TooltipTrigger className="w-full aspect-3/4">
                <Card className="rounded-lg relative h-full">
                    <Image src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} fill className="rounded-lg object-cover" />
                </Card>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="flex flex-col items-center">
                <span>{cast.original_name}</span>
                <span className="text-xs text-gray-700">{cast.character}</span>
            </TooltipContent>
        </Tooltip>
    )
}