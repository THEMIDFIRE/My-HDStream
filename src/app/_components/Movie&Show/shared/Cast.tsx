import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CastCard } from "../../Cards/Cards"

export default function Cast({ cast }: any) {

    console.log('cast', cast)
    return (
        <>
            <div className="bg-gray-100/5 rounded-lg px-5 py-7 md:px-16 md:py-14 space-y-10">
                <h4 className="text-sm md:text-base 2xl:text-lg font-medium text-gray-500">Cast</h4>
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
        </>
    )
}
