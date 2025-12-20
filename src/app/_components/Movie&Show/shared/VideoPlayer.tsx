import { Button } from "@/components/ui/button";
import { VideoPlayerProps } from "@/types/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function VideoPlayer({ type, id, onBack }: VideoPlayerProps) {
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
        videoUrl = `https://vidsrc-embed.ru/embed/movie/${id}`;
    } else if (type === 'tv') {
        if (seasonNum && episodeNum) {
            videoUrl = `https://vidsrc-embed.ru/embed/tv/${id}/${seasonNum}-${episodeNum}`;
        } else {
            videoUrl = `https://vidsrc-embed.ru/embed/tv/${id}/1-1`;
        }
    } else {
        return (
            <div className="text-center p-8">
                <p className="text-red-500">Invalid video parameters provided.</p>
            </div>
        );
    }

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
                {type === 'tv' ?
                    <>
                        <div className="flex justify-around items-center max-md:hidden">
                            <Button onClick={prevEpisode} variant={"outline"}>Prev Episode</Button>
                            <p className="text-center *:text-red-500">Season <span className="font-bold">{seasonNum}</span> Episode <span className="font-bold">{episodeNum}</span></p>
                            <Button onClick={nextEpisode} variant={"outline"}>Next Episode</Button>
                        </div>
                        <div className="flex justify-around items-center md:hidden">
                            <Button onClick={prevEpisode} variant={"outline"}>
                                <ArrowLeftIcon />
                            </Button>
                            <p className="text-center *:text-red-500">S <span className="font-bold">{seasonNum}</span> E <span className="font-bold">{episodeNum}</span></p>
                            <Button onClick={nextEpisode} variant={"outline"}>
                                <ArrowRightIcon />
                            </Button>
                        </div>
                    </>
                    : ''
                }
            </div>
        </section>
    )
}