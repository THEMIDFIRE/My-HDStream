import { Button } from "@/components/ui/button";
import { VideoPlayerProps } from "@/types/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function VideoPlayer({ type, details, onBack }: VideoPlayerProps) {
    const [server, setServer] = useState('vidsrc');
    const [seasonNum, setSeasonNum] = useState(1);
    const [episodeNum, setEpisodeNum] = useState(1);

    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (params.get('season') && params.get('episode')) {
            setSeasonNum(Number(params.get('season')));
            setEpisodeNum(Number(params.get('episode')));
        }
    }, [params]);

    let videoUrl = '';
    if (type === 'movie') {
        if (server === 'vidfast') {
            videoUrl = `https://vidfast.pro/movie/${details.id}`;
        } else {
            videoUrl = `https://vidsrc-embed.ru/embed/movie/${details.id}`;
        }
    } else if (type === 'tv') {
        if (seasonNum && episodeNum) {
            if (server === 'vidfast') {
                videoUrl = `https://vidfast.pro/tv/${details.id}/${seasonNum}/${episodeNum}?sub=en`;
            } else {
                videoUrl = `https://vidsrc-embed.ru/embed/tv/${details.id}/${seasonNum}-${episodeNum}`;
            }
        } else {
            if (server === 'vidfast') {
                videoUrl = `https://vidfast.pro/tv/${details.id}/1/1`;
            } else {
                videoUrl = `https://vidsrc-embed.ru/embed/tv/${details.id}/1-1`;
            }
        }
    } else {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">Invalid video parameters provided.</p>
            </div>
        );
    }
    // Season navigation
    const prevSeason = () => {
        if (seasonNum > 1) {
            const newSeason = seasonNum - 1;
            router.push(`${window.location.pathname}?watch=true&season=${newSeason}&episode=${episodeNum}`);
        }
    }

    const nextSeason = () => {
        const newSeason = seasonNum + 1;
        router.push(`${window.location.pathname}?watch=true&season=${newSeason}&episode=${episodeNum}`);
    }

    // Episode navigation
    const prevEpisode = () => {
        if (episodeNum > 1) {
            const newEpisode = episodeNum - 1;
            router.push(`${window.location.pathname}?watch=true&season=${seasonNum}&episode=${newEpisode}`);
        }
    }

    const nextEpisode = () => {
        const newEpisode = episodeNum + 1;
        router.push(`${window.location.pathname}?watch=true&season=${seasonNum}&episode=${newEpisode}`);
    }

    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-4">
                <Button onClick={onBack} variant={"outline"}>Back</Button>
                <div className="relative aspect-video h-full w-full">
                    <iframe
                        src={videoUrl}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                        allow="encrypted-media"
                        title={`${type} player`}
                    ></iframe>
                </div>
                {type === 'tv' &&
                    <>
                        <div className="flex gap-3 justify-center">
                            <Button onClick={() => setServer('vidsrc')} variant={`${server === 'vidsrc' ? 'destructive' : 'secondary'}`}>Vidsrc</Button>
                            <Button onClick={() => setServer('vidfast')} variant={`${server === 'vidfast' ? 'destructive' : 'secondary'}`}>Vidfast</Button>
                        </div>
                        <div className="flex justify-between items-center max-md:hidden">
                            <Button onClick={prevSeason} variant={"secondary"} className={`${seasonNum !== 1 ? '' : 'invisible'}`}>Prev Season</Button>
                            <Button onClick={prevEpisode} variant={"outline"} className={`${episodeNum !== 1 ? '' : 'invisible'} `}>Prev Episode</Button>
                            <p className="*:text-red-500 justify-self-end">Season <span className="font-bold">{seasonNum}</span> Episode <span className="font-bold">{episodeNum}</span></p>
                            <Button onClick={nextEpisode} variant={"outline"} className={`${Number(episodeNum) < details.seasons[seasonNum - 1]?.episode_count ? '' : 'invisible'}`}>Next Episode</Button>
                            <Button onClick={nextSeason} variant={"secondary"} className={`${Number(seasonNum) < details.seasons.length ? '' : 'invisible'}`}>Next Season</Button>
                        </div>
                        {/* Mobile */}
                        <div className="flex  items-center gap-20 max-w-4/5 mx-auto md:hidden">
                            <Button onClick={prevEpisode} variant={"outline"} className={`${episodeNum !== 1 ? '' : 'invisible'} `}>
                                <ArrowLeftIcon />
                            </Button>
                            <p className="text-center *:text-red-500 place-self-center">S <span className="font-bold">{seasonNum}</span> E <span className="font-bold">{episodeNum}</span></p>
                            <Button onClick={nextEpisode} variant={"outline"} className={`${Number(episodeNum) < details.seasons[seasonNum - 1]?.episode_count ? '' : 'invisible'}`}>
                                <ArrowRightIcon />
                            </Button>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}