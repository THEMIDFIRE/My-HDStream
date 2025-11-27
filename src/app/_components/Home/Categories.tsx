"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useState } from "react"


const categories: { title: string }[] = [
    {
        title: "Action",
    },
    {
        title: "Comedy",
    },
    {
        title: "Drama",
    },
    {
        title: "Documentary",
    },
    {
        title: "Drama",
    },
    {
        title: "Documentary",
    },
]
export default function Categories() {
    const [api, setApi] = useState<CarouselApi>()
    return (
        <section className="mb-20">
            <div className="container max-w-11/12 md:max-w-4/5 mx-auto">
                <div className="space-y-2.5">
                    <h2 className="text-xl md:text-2xl 2xl:text-4xl font-bold">Explore our wide variety of categories</h2>
                    <p className="text-sm md:text-base 2xl:text-lg font-normal text-gray-500">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button onClick={() => api?.scrollPrev()}>Previous</Button>
                        <Button onClick={() => api?.scrollNext()}>Next</Button>
                    </div>
                </div>
                <div className="">
                    <Carousel setApi={setApi} opts={{ align: "start", }}>
                        <CarouselContent>
                            {categories.map((category, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{category.title}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
