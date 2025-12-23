"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MediaDetailsProps, WatchHistoryItem } from '@/types/types';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';


export default function Hero({ details, type }: MediaDetailsProps) {
    const [isWatching, setIsWatching] = useState(false);
    const [showId] = useState(details.id);
    const [currentSeason, setCurrentSeason] = useState('1');
    const [currentEpisode, setCurrentEpisode] = useState('1');

    const router = useRouter();
    const params = useSearchParams();

    const mediaTitle = type === 'movie' ? details.title : details.name;

    useEffect(() => {
        if (type === 'tv') {
            const watchList = localStorage.getItem('watchList');
            if (watchList) {
                const watchHistory = JSON.parse(watchList);
                const existingHistory = watchHistory.find((item: any) => item.id === details.id);
                if (existingHistory) {
                    setCurrentSeason(existingHistory.season);
                    setCurrentEpisode(existingHistory.episode);
                }
            }
        }
    }, [details.id, type]);

    useEffect(() => {
        const season = params.get('season');
        const episode = params.get('episode');
        const watching = params.get('watch') === 'true';

        if (watching && season && episode && type === 'tv') {
            setCurrentSeason(season);
            setCurrentEpisode(episode);

            saveWatchHistory(season, episode);
            setIsWatching(true);

        }
    }, [params, type, details.id]);
    

    const saveWatchHistory = (season: string, episode: string) => {
        const watchList = localStorage.getItem('watchList') || '[]';
        const watchHistory = JSON.parse(watchList);
        const existingHistoryIndex = watchHistory.findIndex((item: any) => item.id === showId);

        const updateItem: WatchHistoryItem = {
            id: details.id,
            season,
            episode
        };

        if (existingHistoryIndex !== -1) {
            watchHistory[existingHistoryIndex] = updateItem;
        } else {
            watchHistory.push(updateItem);
        }

        localStorage.setItem('watchList', JSON.stringify(watchHistory));
    }

    const handleWatch = () => {
        if (type === 'movie') {
            router.push(`?watch=true`);
        } else {
            router.push(`?watch=true&season=${currentSeason}&episode=${currentEpisode}`);
            saveWatchHistory(currentSeason, currentEpisode);
        }
        setIsWatching(true);
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            {isWatching ? (
                <VideoPlayer type={type} details={details} onBack={() => { router.push(window.location.pathname); setIsWatching(false) }} />
            ) : (
                <section className='mb-20 md:mb-28 2xl:mb-32'>

                    <div className="relative w-full">
                        <div
                            className={`relative w-full h-[60dvh] md:h-[70dvh] ${details.backdrop_path
                                ? 'bg-center bg-cover bg-no-repeat md:bg-center bg-fixed'
                                : 'bg-gray-800'
                                }`}
                            style={{
                                backgroundImage: details.backdrop_path
                                    ? `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`
                                    : undefined
                            }}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

                            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                                <Button onClick={() => router.push('/Movies&Shows')} variant="outline" className="bg-black/50 backdrop-blur border-white/20">
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </div>
                        </div>
                        <div className="container max-w-11/12 md:max-w-4/5 mx-auto -mt-32 relative z-10 space-y-12">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="shrink-0 w-full md:w-80">
                                    {details.poster_path ? (
                                        <Card className="overflow-hidden">
                                            <div className="relative aspect-2/3 w-full">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                                    fill
                                                    className="object-cover"
                                                    alt={`${mediaTitle} poster`}
                                                    sizes="(max-width: 768px) 100vw, 320px"
                                                />
                                            </div>
                                        </Card>
                                    ) : (
                                        <Card className="aspect-2/3 bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-500">No Poster</span>
                                        </Card>
                                    )}
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                            {mediaTitle}
                                        </h1>
                                        {details.tagline && (
                                            <p className="text-lg text-gray-400 italic mb-4">
                                                "{details.tagline}"
                                            </p>
                                        )}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                                            {details.vote_average > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-semibold">
                                                        {details.vote_average.toFixed(1)}
                                                    </span>
                                                    <span className="text-gray-500">/ 10</span>
                                                </div>
                                            )}
                                            {details.release_date && (
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-5 h-5" />
                                                    {formatDate(details.release_date)}
                                                </div>
                                            )}
                                            {details.runtime && (
                                                <div className="flex items-center gap-1">
                                                    <ClockIcon className="w-5 h-5" />
                                                    {formatRuntime(details.runtime)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {details.genres && details.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {details.genres.map((genre: any) => (
                                                <Badge
                                                    key={genre.id}
                                                    variant="secondary"
                                                    className="bg-red-500/20 text-red-500 border-red-500/50"
                                                >
                                                    {genre.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white mb-3">Overview</h2>
                                        <p className="text-gray-400 leading-relaxed">
                                            {details.overview || 'No overview available.'}
                                        </p>
                                    </div>
                                    {type === 'tv' && (currentSeason !== '1' || currentEpisode !== '1') && (
                                        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                                            <p className="text-blue-400 text-sm">
                                                Continue watching: Season {currentSeason}, Episode {currentEpisode}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleWatch}
                                            className="bg-red-500 hover:bg-red-600 text-white gap-2"
                                            {...details.status === "Planned" && { disabled: true }}
                                        >
                                            <PlayIcon className="w-5 h-5" />
                                            {type === 'tv' && (currentSeason !== '1' || currentEpisode !== '1')
                                                ? 'Continue Watching'
                                                : 'Play Now'}
                                        </Button>
                                        <Button variant="outline">
                                            Add to Watchlist
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-800">
                                        {details.status && (
                                            <div>
                                                <span className="text-gray-400">Status:</span>
                                                <span className="ml-2 text-white">{details.status}</span>
                                            </div>
                                        )}
                                        {details.original_language && (
                                            <div>
                                                <span className="text-gray-400">Original Language:</span>
                                                <span className="ml-2 text-white uppercase">
                                                    {details.original_language}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}