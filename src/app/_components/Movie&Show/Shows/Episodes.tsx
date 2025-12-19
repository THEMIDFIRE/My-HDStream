'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getShowEpisodes } from '@/lib/api';
import { EpisodesProps } from '@/types/types';
import { ClockIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';


export default function Episodes({ seasons, showId }: EpisodesProps) {
    const params = useSearchParams();

    const currentSeason = params.get('season');
    const currentEpisode = params.get('episode');


    const { data: seasonsWithEpisodes, isLoading, isError } = useQuery({
        queryKey: ['show-episodes', showId, seasons.map(s => s.season_number)],
        queryFn: async () => {
            const results = await Promise.all(
                seasons.map(async (season) => {
                    try {
                        const episodeData = await getShowEpisodes(showId, season.season_number);
                        return {
                            ...season,
                            episodes: episodeData.episodes || []
                        };
                    } catch (error) {
                        console.error(`Failed to fetch episodes for season ${season.season_number}:`, error);
                        return {
                            ...season,
                            episodes: []
                        };
                    }
                })
            );
            return results;
        },
        staleTime: 1000 * 60 * 10,
    });

    const airedEpisodes = useMemo(() => {
        if (!seasonsWithEpisodes) return [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return seasonsWithEpisodes.map(season => ({
            ...season,
            episodes: season.episodes.filter((episode: any) => {
                if (!episode.air_date) return false;
                const airDate = new Date(episode.air_date);
                airDate.setHours(0, 0, 0, 0);
                return airDate <= today;
            })
        }))
            .filter(season => season.episodes.length > 0);
    }, [seasonsWithEpisodes]);

    if (isLoading) {
        return (
            <section className="mb-20 md:mb-28 2xl:mb-32">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                    <h4 className="text-xl 2xl:text-2xl font-medium">Seasons & Episodes</h4>
                    <div className="space-y-4">
                        {seasons.map((_, index) => (
                            <div key={index} className="bg-black p-5 rounded-md animate-pulse">
                                <div className="h-8 bg-gray-800 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mb-20 md:mb-28 2xl:mb-32">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                    <h4 className="text-xl 2xl:text-2xl font-medium">Seasons & Episodes</h4>
                    <p className="text-red-500">Failed to load episodes. Please try again later.</p>
                </div>
            </section>
        );
    }

    if (airedEpisodes.length === 0) {
        return null;
    }

    const isEpisodeActive = (seasonNum: number, episodeNum: number) => {
        return currentSeason === String(seasonNum) && currentEpisode === String(episodeNum);
    };


    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                <h4 className="text-xl 2xl:text-2xl font-medium">Seasons & Episodes</h4>
                <Accordion type="single" collapsible defaultValue={`season-${currentSeason}`} className='space-y-4'>
                    {airedEpisodes.map((season, index) => {
                        const airedCount = season.episodes.length;
                        const totalCount = season.episode_count;
                        return (
                            <AccordionItem
                                value={`season-${season.season_number}`}
                                className="bg-black p-5 rounded-md"
                                key={season.id || index}
                            >
                                <AccordionTrigger className='hover:no-underline'>
                                    <div className='flex items-center gap-2'>
                                        <span className="text-lg md:text-xl 2xl:text-2xl">
                                            Season {season.season_number}
                                        </span>
                                        <span className='text-gray-500'>
                                            {airedCount} {airedCount === totalCount ? 'episodes' : `of ${totalCount} episodes`}
                                        </span>
                                    </div>
                                    <ArrowDownIcon className="text-gray-500 pointer-events-none size-4 translate-y-0.5 transition-transform duration-200" />
                                </AccordionTrigger>
                                <AccordionContent className="space-y-6 pt-4">
                                    <div className="space-y-3">
                                        {season.episodes.map((episode: any) => {
                                            const isActive = isEpisodeActive(season.season_number, episode.episode_number);
                                            return (
                                                <Link
                                                    key={episode.id}
                                                    href={`?watch=true&season=${season.season_number}&episode=${episode.episode_number}`}
                                                >
                                                    <div
                                                        className='border-t-2 pt-4'
                                                        id={`season-${season.season_number} episode-${episode.episode_number}`}
                                                    >
                                                        <div className={`
                                                            flex items-center gap-3 max-md:flex-col 
                                                            px-4 py-5 rounded-md max-md:space-y-3
                                                            transition-all duration-200
                                                            ${isActive
                                                                ? 'bg-blue-900/40 border border-blue-500'
                                                                : 'hover:bg-gray-900/70 border-2 border-transparent'
                                                            }
                                                        `}>
                                                            <div className="flex w-full md:w-1/3 items-start md:items-center gap-2">
                                                                <span className={`
                                                                    text-lg font-semibold max-md:order-1 max-md:self-center
                                                                    ${isActive ? 'text-blue-400' : 'text-gray-500'}
                                                                `}>
                                                                    {episode.episode_number < 10 ? `0${episode.episode_number}` : episode.episode_number}
                                                                </span>
                                                                <div className="relative aspect-video w-full md:w-full">
                                                                    <Image
                                                                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                                                        fill
                                                                        className={`
                                                                            object-cover rounded transition-all
                                                                            ${isActive ? 'ring ring-blue-500' : ''}
                                                                        `}
                                                                        alt={episode.name}
                                                                        sizes="128px"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='w-full space-y-3'>
                                                                <div className="flex max-md:flex-col justify-between items-start md:items-center gap-3">
                                                                    <h5 className={`
                                                                        max-md:order-1
                                                                        ${isActive ? 'text-blue-300' : ''}
                                                                    `}>
                                                                        {episode.name}
                                                                    </h5>
                                                                    <div className='flex gap-1 items-center text-gray-500 border rounded px-1 bg-muted/50 shadow'>
                                                                        <ClockIcon className='size-3' />
                                                                        <span>{episode.runtime}m</span>
                                                                    </div>
                                                                </div>
                                                                <p className='text-gray-500 max-md:hidden'>{episode.overview}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {airedCount < totalCount && (
                                        <div className="mt-4 p-3 bg-gray-500/10 border border-blue-500/30 rounded-lg">
                                            <p className="text-sm text-gray-400 text-center">
                                                {totalCount - airedCount} episode{totalCount - airedCount > 1 ? 's' : ''} not yet aired
                                            </p>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}