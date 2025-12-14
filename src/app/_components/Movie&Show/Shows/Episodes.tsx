import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Accordion } from '@/components/ui/accordion'
import { getShowEpisodes } from '@/lib/api';
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface EpisodesProps {
    seasons: any[];
    showId: number;
}

export default async function Episodes({ seasons, showId }: EpisodesProps) {

    const seasonsWithEpisodes = await Promise.all(
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const airedEpisodes = seasonsWithEpisodes.map(season => ({
        ...season,
        episodes: season.episodes.filter((episode: any) => {
            if (!episode.air_date) return false;
            const airDate = new Date(episode.air_date);
            airDate.setHours(0, 0, 0, 0);
            return airDate <= today;
        })
    })).filter(season => season.episodes.length > 0);

    if (airedEpisodes.length === 0) {
        return null;
    }

    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                <h4 className="text-xl 2xl:text-2xl font-medium">Seasons & Episodes</h4>
                <Accordion type="single" collapsible defaultValue='item-0' className='space-y-4'>
                    {airedEpisodes.map((season, index) => {
                        const airedCount = season.episodes.length;
                        const totalCount = season.episode_count;

                        return (
                            <AccordionItem value={`item-${index}`} className="bg-black p-5 rounded-md" key={season.id || index}>
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
                                <AccordionContent className="space-y-4 pt-4">
                                    <div className="space-y-3">
                                        {season.episodes.map((episode: any) => (
                                            <Card key={episode.id} className="p-4 bg-transparent border shadow hover:bg-gray-900/50">
                                                <div className="flex gap-4">
                                                    {episode.still_path && (
                                                        <div className="relative w-32 h-20 shrink-0 rounded overflow-hidden">
                                                            <Image
                                                                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                                                fill
                                                                className="object-cover"
                                                                alt={episode.name}
                                                                sizes="128px"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h5 className="font-semibold text-white">
                                                                {episode.episode_number}. {episode.name}
                                                            </h5>
                                                            {episode.runtime && (
                                                                <span className="text-sm text-gray-500 shrink-0">
                                                                    {episode.runtime}m
                                                                </span>
                                                            )}
                                                        </div>

                                                        {episode.overview && (
                                                            <p className="text-sm text-gray-400 line-clamp-2">
                                                                {episode.overview}
                                                            </p>
                                                        )}

                                                        {episode.air_date && (
                                                            <p className="text-xs text-gray-500">
                                                                Aired: {new Date(episode.air_date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    {airedCount < totalCount && (
                                        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                            <p className="text-sm text-blue-400 text-center">
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
    )
}