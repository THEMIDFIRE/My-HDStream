import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getShowEpisodes } from '@/lib/api';
import { ClockIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

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
                            <AccordionItem value={`item-${index}`} defaultValue={"item-0"} className="bg-black p-5 rounded-md" key={season.id || index}>
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
                                        {season.episodes.map((episode: any) => (
                                            <div key={episode.id} className='border-t-2 pt-4'>
                                                <div className='flex items-center gap-3 max-md:flex-col hover:bg-gray-900/70 px-4 py-5 rounded-md max-md:space-y-3'>
                                                    <div className="flex w-full md:w-1/3 items-start md:items-center gap-2">
                                                        <span className='text-gray-500 text-lg font-semibold max-md:order-1 max-md:self-center'>{episode.episode_number < 10 ? `0${episode.episode_number}` : episode.episode_number}</span>
                                                        <div className="relative aspect-video w-full md:w-full">
                                                            <Image
                                                                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                                                fill
                                                                className="object-cover rounded"
                                                                alt={episode.name}
                                                                sizes="128px"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='w-full space-y-3'>
                                                        <div className="flex max-md:flex-col justify-between items-start md:items-center gap-3">
                                                            <h5 className='max-md:order-1'>{episode.name}</h5>
                                                            <div className='flex gap-1 items-center text-gray-500 border rounded px-1 bg-muted/50 shadow'>
                                                                <ClockIcon className='size-3' />
                                                                <span>{episode.runtime}m</span>
                                                            </div>
                                                        </div>
                                                        <p className='text-gray-500 max-md:hidden'>{episode.overview}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
    )
}