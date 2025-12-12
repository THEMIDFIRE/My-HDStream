"use client"
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MediaCard } from "../../Cards/Cards";

export default function Popular({ popular }: any) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const movies = popular

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white">All time Popular</h2>
                <div className="hidden md:flex items-center justify-center h-fit gap-3 p-3 bg-black rounded-lg border">
                    <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} className="p-2.5">
                        <ArrowLeftIcon />
                    </Button>
                    <div className="flex gap-2">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-3 h-1 rounded transition-all ${current === index ? 'bg-red-500 w-4' : 'bg-white'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => api?.scrollNext()} className="p-2.5">
                        <ArrowRightIcon />
                    </Button>
                </div>
            </div>
            <Carousel setApi={setApi} opts={{ slidesToScroll: "auto" }} className="md:mt-10 2xl:mt-12">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {movies.map((movie: any) => (
                        <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Link href={`/Movies&Shows/movie/${movie.id}`} key={movie.id}>
                                <MediaCard item={movie} type="movie" />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    )
}