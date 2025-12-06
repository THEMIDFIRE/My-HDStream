"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

export default function Categories({ genres }: { genres: { id: number, name: string }[] }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <section className="mb-20 md:mb-28 2xl:mb-32">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 md:space-y-14 2xl:space-y-20">
                <div className="flex justify-between items-center">
                    <div className="space-y-2 md:space-y-2.5 2xl:space-y-3.5">
                        <h2 className="text-[28px] md:text-4xl 2xl:text-5xl font-bold">Explore our wide variety of categories</h2>
                        <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-500">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
                    </div>
                    <div className="hidden md:flex items-center justify-center h-fit gap-3 p-3 bg-black rounded-lg border">
                        <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} className="p-2.5">
                            <ArrowLeftIcon />
                        </Button>
                        <div className="flex gap-2">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`w-3 h-1 rounded transition-all ${current === index + 1 ? 'bg-red-500 w-4' : 'bg-white'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                        <Button variant="outline" size="icon" onClick={() => api?.scrollNext()} className="p-2.5">
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </div>
                <div>
                    <Carousel setApi={setApi} opts={{ align: "start", slidesToScroll: "auto" }} className="max-md:space-y-5">
                        <CarouselContent>
                            {genres.map((genre, index) => (
                                <CarouselItem key={index} className="basis-1/2 lg:basis-1/4 text-center">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{genre.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-2 md:hidden">
                            {Array.from({ length: count }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`w-3 h-1 rounded transition-all ${current === index + 1 ? 'bg-red-500 w-4' : 'bg-white'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
