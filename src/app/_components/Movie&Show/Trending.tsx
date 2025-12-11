'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import Link from 'next/link';

interface TrendingItem {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    backdrop_path?: string;
    media_type?: 'movie' | 'tv';
}

interface TrendingProps {
    trending: TrendingItem[];
}

export default function Trending({ trending }: TrendingProps) {
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

    const movies = trending.slice(0, 10);

    // Helper to determine the correct route based on media type
    const getMediaRoute = (item: TrendingItem) => {
        const mediaType = item.media_type === 'tv' ? 'tv' : 'movie';
        return `/Movies&Shows/${mediaType}/${item.id}`;
    };

    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <Carousel 
                    opts={{ loop: true }} 
                    plugins={[Autoplay({ delay: 5000 })]} 
                    setApi={setApi}
                >
                    <CarouselContent>
                        {movies.map((movie, index) => {
                            const title = movie.title || movie.name;
                            const detailsRoute = getMediaRoute(movie);

                            return (
                                <CarouselItem key={movie.id} className='relative'>
                                    <div className="relative aspect-video overflow-hidden rounded-lg">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                            fill
                                            className="object-cover"
                                            alt={title || 'Movie poster'}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={index === 0}
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 from-5% via-black/90 via-5% to-70% to-transparent z-10"></div>

                                        {/* Content */}
                                        <div className='absolute bottom-0 md:bottom-1/6 left-0 right-0 z-20 text-center px-10'>
                                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-0.5">
                                                {title}
                                            </h2>
                                            <p className='max-md:hidden text-sm md:text-base text-gray-400 line-clamp-2'>
                                                {movie.overview}
                                            </p>
                                            <div className='space-x-2 mt-5 md:mt-8'>
                                                {/* Play Button - Using Link wrapper for SEO */}
                                                <Link href={detailsRoute}>
                                                    <Button 
                                                        variant='default' 
                                                        className='bg-red-500 text-white hover:bg-red-700 has-[>svg]:px-3.5 has-[>svg]:py-5'
                                                    >
                                                        <PlayIcon />
                                                        Play Now
                                                    </Button>
                                                </Link>
                                                
                                                {/* Info Button - Using Link wrapper for SEO */}
                                                <Link href={detailsRoute}>
                                                    <Button 
                                                        variant='default' 
                                                        size='icon' 
                                                        className='bg-black text-white hover:bg-gray-800 has-[>svg]:px-3.5 has-[>svg]:py-5'
                                                    >
                                                        <InformationCircleIcon/>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    {/* Navigation Controls - Exact original styling */}
                    <div className="max-md:hidden flex justify-between items-center absolute left-0 right-0 bottom-3.5 px-10">
                        <Button 
                            variant='default' 
                            size='icon' 
                            onClick={() => api?.scrollPrev()} 
                            className='pointer-events-auto bg-black hover:bg-gray-900 text-white border rounded'
                        >
                            <ArrowLeftIcon />
                        </Button>
                        
                        <div className='flex items-center justify-center w-full gap-1'>
                            {Array.from({ length: count }).map((_, idx) => (
                                <Button
                                    variant='default' 
                                    size='icon'
                                    key={idx}
                                    onClick={() => api?.scrollTo(idx)}
                                    className={`h-1 transition-all duration-300 ${
                                        idx === current
                                            ? 'w-8 bg-red-500 hover:bg-red-500'
                                            : 'w-6 bg-gray-600 hover:bg-red-500/75'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        
                        <Button 
                            variant='default' 
                            size='icon' 
                            onClick={() => api?.scrollNext()} 
                            className='pointer-events-auto bg-black hover:bg-gray-900 text-white border rounded'
                        >
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </Carousel>
            </div>
        </section>
    );
}