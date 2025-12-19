import { Button } from "@/components/ui/button";
import { VideoPlayerProps } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function VideoPlayer({ type, id, onBack }: VideoPlayerProps) {
    const [seasonNum, setSeasonNum] = useState(1);
    const [episodeNum, setEpisodeNum] = useState(1);

    const params = useSearchParams();

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
                {type === 'tv' ? <p className="text-center *:text-red-500">Season <span className="font-bold">{seasonNum}</span> Episode <span className="font-bold">{episodeNum}</span></p> : ''}
            </div>
        </section>
    )
}