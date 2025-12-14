import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CastCard } from "../../Cards/Cards"

export default function Cast({ cast }: any) {

    return (
        <>
            <section className="mb-20 md:mb-28 2xl:mb-32">
                <div className="container max-w-11/12 md:max-w-4/5 mx-auto space-y-10 bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14">
                    <h4 className="text-lg 2xl:text-xl font-medium text-gray-500">Cast</h4>
                    <Carousel opts={{ align: "start", slidesToScroll: 'auto' }}>
                        <CarouselContent>
                            {cast.map((cast: any) => (
                                <CarouselItem key={cast.id} className="basis-1/2 md:basis-1/4 2xl:basis-1/6">
                                    <CastCard cast={cast} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-12 max-md:hidden" />
                        <CarouselNext className="-right-12 max-md:hidden" />
                    </Carousel>
                </div>
            </section>
        </>
    )
}
