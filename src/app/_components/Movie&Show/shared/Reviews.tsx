"use client"
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { ReviewCard } from "../../Cards/Cards";

export default function Reviews({ reviews }: any) {
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


    return (
        <>
            <section className="mb-20 md:mb-28 2xl:mb-32">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                    <h4 className="text-lg 2xl:text-xl font-medium text-gray-500">Reviews</h4>
                    <Carousel opts={{ align: "start", slidesToScroll: 'auto' }} setApi={setApi}>
                        <CarouselContent>
                            {reviews.map((review: any) => (
                                <CarouselItem key={review.id} className="md:basis-1/2">
                                    <ReviewCard review={review} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className='flex items-center justify-center w-full gap-1 mt-6'>
                            {Array.from({ length: count }).map((_, idx) => (
                                <Button
                                    variant='default'
                                    size='icon'
                                    key={idx}
                                    onClick={() => api?.scrollTo(idx)}
                                    className={`h-1 transition-all duration-300 ${idx === current
                                        ? 'w-8 bg-red-500 hover:bg-red-500'
                                        : 'w-6 bg-gray-600 hover:bg-red-500/75'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <CarouselPrevious className="-left-12 max-md:hidden" />
                        <CarouselNext className="-right-12 max-md:hidden" />
                    </Carousel>
                </div>
            </section>
        </>
    )
}
